import { AbsChart, HelmProps } from '@package/cdk8s-loader/src'
import { PartialRecursive, scope } from '@package/common/src'
import { ChartProps, Helm } from 'cdk8s'
import { ArgoCdHelmParam } from '../types'

interface ArgoCdChartProps extends ChartProps {
  argoCd: Omit<PartialRecursive<HelmProps<ArgoCdHelmParam>>, 'chart'>
}

export class ArgoCdChart extends AbsChart<ArgoCdChartProps> {
  protected loadChildren(id: string, props: ArgoCdChartProps): void {
    const { argoCd, namespace } = props

    const scopeArgoCdProps = scope<HelmProps<ArgoCdHelmParam>>({
      chart: 'argo/argo-cd',
      namespace
    }).merge(argoCd as any)

    new Helm(this, `${id}-argocd`, scopeArgoCdProps.get())
  }
}
