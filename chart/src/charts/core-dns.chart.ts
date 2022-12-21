import { ChartLoader, ComponentLoader, HelmLoader, HelmProps } from '@package/cdk8s-loader/src'
import { PartialRecursive, scope } from '@package/common/src'
import { KubeNamespace } from '@package/k8s-generated/src'
import { CorednsHelmParam } from '../helm-values/coredns/coredns'
import { LoadingChart } from '../types'

export const coreDnsChart: LoadingChart<{ helmProps: Omit<HelmProps<PartialRecursive<CorednsHelmParam>>, 'chart'> }> = (
  id,
  props
) => {
  const { chartProps, helmProps } = props
  const namespace = chartProps.namespace ?? 'default'

  const helmPropsScope = scope<HelmProps<CorednsHelmParam>>({
    chart: 'coredns/coredns',
    helmFlags: ['--namespace', namespace, '--create-namespace']
  }).merge(helmProps as any)

  const chartLoader = new ChartLoader(id, chartProps)

  if (namespace !== 'default') {
    chartLoader.addComponent(
      new ComponentLoader(KubeNamespace, `${id}-namespace`, {
        metadata: {
          name: namespace
        }
      })
    )
  }

  return chartLoader.addHelm(() => {
    return new HelmLoader<PartialRecursive<CorednsHelmParam>>(`${id}-helm`, helmPropsScope.get())
  })
}
