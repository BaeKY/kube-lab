import { AbsChart, HelmProps } from '@package/cdk8s-loader/src'
import { PartialRecursive, scope } from '@package/common/src'
import { ClusterIssuer, ClusterIssuerProps, KubeSecret } from '@package/k8s-generated/generated'
import { ChartProps, Helm } from 'cdk8s'
import { CertManagerHelmParam } from '../types'

interface CertManagerChartProps extends ChartProps {
  certManager: Omit<HelmProps<PartialRecursive<CertManagerHelmParam>>, 'chart'>
  clusterIssuers?: ClusterIssuerProps[]
  apiKeySecret?: {
    secretName: string
    apiKey: string
  }
}

export class CertManagerChart extends AbsChart<CertManagerChartProps> {
  protected loadChildren(id: string, props: CertManagerChartProps): void {
    const { apiKeySecret, certManager, namespace, clusterIssuers } = props

    const scopeCertManagerProps = scope<HelmProps<CertManagerHelmParam>>({
      chart: 'jetstack/cert-manager',
      namespace
    }).merge(certManager as any)
    const certManagerHelm = new Helm(this, `${id}-cert-manager`, scopeCertManagerProps.get())

    if (apiKeySecret == null) {
      return
    }

    new KubeSecret(this, `${id}-api-key`, {
      metadata: {
        name: apiKeySecret.secretName
      },
      data: {
        ['api-key']: Buffer.from(apiKeySecret.apiKey).toString('base64')
      }
    }).addDependency(certManagerHelm)
    ;(clusterIssuers ?? []).forEach((clusterIssuerProps, idx) => {
      new ClusterIssuer(this, `cluster-issuer-${idx}`, clusterIssuerProps).addDependency(certManagerHelm)
    })
  }
}
