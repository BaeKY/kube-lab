import { AbsChart, HelmProps } from '@package/cdk8s-loader'
import { PartialRecursive, scope } from '@package/common'
import { ChartProps, Helm } from 'cdk8s'
import { IngressNginxHelmParam } from '../types'

interface IngressControllerChartProps extends ChartProps {
  ingressNginxController: Omit<HelmProps<PartialRecursive<IngressNginxHelmParam>>, 'chart'>
}

export class IngressControllerChart extends AbsChart<IngressControllerChartProps> {
  protected loadChildren(id: string, props: IngressControllerChartProps): void {
    const { ingressNginxController, labels, namespace } = props
    const scopeIngressNginxControllerProps = scope<HelmProps<PartialRecursive<IngressNginxHelmParam>>>({
      chart: 'ingress-nginx/ingress-nginx',
      namespace
    }).merge(ingressNginxController as any)

    new Helm(this, `${id}-ingress-nginx`, scopeIngressNginxControllerProps.get())
  }
}
