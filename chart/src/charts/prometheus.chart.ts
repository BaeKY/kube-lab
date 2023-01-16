import { AbsChart, HelmProps } from '@package/cdk8s-loader'
import { PartialRecursive, scope } from '@package/common'
import { ChartProps, Helm } from 'cdk8s'
import { KubePrometheusStackHelmParam } from '../types'

interface PrometheusStackChartProps extends ChartProps {
  prometheus: Omit<HelmProps<PartialRecursive<KubePrometheusStackHelmParam>>, 'chart'>
}

export class PrometheusStackChart extends AbsChart<PrometheusStackChartProps> {
  protected loadChildren(id: string, props: PrometheusStackChartProps): void {
    const { prometheus, namespace } = props
    const scopePrometheusHelmProps = scope({
      chart: 'prometheus-community/kube-prometheus-stack',
      namespace
    } as HelmProps<KubePrometheusStackHelmParam>).merge(prometheus as any)

    new Helm(this, `${id}-prometheus`, scopePrometheusHelmProps.get())
  }
}
