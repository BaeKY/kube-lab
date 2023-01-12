import { AbsChart, HelmProps } from '@package/cdk8s-loader'
import { PartialRecursive, scope } from '@package/common'
import { Certificate, CertificateProps } from '@package/k8s-generated'
import { ChartProps, Helm } from 'cdk8s'
import { JenkinsHelmParam } from '../types'

interface JenkinsChartProps extends ChartProps {
  jenkins: Omit<PartialRecursive<HelmProps<JenkinsHelmParam>>, 'chart'>
  certificate?: CertificateProps
}

export class JenkinsChart extends AbsChart<JenkinsChartProps> {
  protected loadChildren(id: string, props: JenkinsChartProps): void {
    const { jenkins, namespace, certificate: certificateProps } = props

    if (certificateProps != null) {
      new Certificate(this, `${id}-certificate`, certificateProps)
    }
    const scopeJenkinsProps = scope<HelmProps<JenkinsHelmParam>>({
      chart: 'jenkins/jenkins',
      namespace
    }).merge(jenkins as any)
    new Helm(this, `${id}-jenkins`, scopeJenkinsProps.get())
  }
}
