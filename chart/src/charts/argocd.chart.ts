import { ChartLoader, ComponentLoader, HelmLoader, HelmProps } from '@package/cdk8s-loader'
import { LoadingChart } from '../types'
import { ArgoCdHelmParam } from '../helm-values/argo/argo-cd'
import { scope } from '@package/common/src'
import { KubeNamespace } from '@package/k8s-generated/src'

export const argocdChart: LoadingChart<{ helmProps: Omit<HelmProps<ArgoCdHelmParam>, 'chart'> }> = (id, props) => {
  const { chartProps, helmProps } = props
  const chartLoader = new ChartLoader(id, chartProps)
  const namespace = chartProps.namespace ?? 'default'

  const helmPropsScope = scope<HelmProps<ArgoCdHelmParam>>({
    chart: 'argo/argo-cd',
    helmFlags: ['--namespace', namespace, '--create-namespace']
  }).merge(helmProps as HelmProps<ArgoCdHelmParam>)

  if (namespace !== 'default') {
    chartLoader.addComponent(
      new ComponentLoader(KubeNamespace, `${id}-ns`, {
        metadata: {
          name: namespace
        }
      })
    )
  }

  return chartLoader.addHelm(() => new HelmLoader(`${id}-argocd`, helmPropsScope.get()))
}
