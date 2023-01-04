import { ChartLoader, ComponentLoader, HelmLoader, HelmProps } from '@package/cdk8s-loader/src'
import { LoadingChart } from '../types'
import { HarborHelmParam } from '../helm-values'
import { scope } from '@package/common/src'
import { KubeNamespace } from '@package/k8s-generated/src'

const helmHarborName = 'harbor/harbor'

export const harborChart: LoadingChart<{ helmProps: Omit<HelmProps<HarborHelmParam>, 'chart'> }> = (id, props) => {
  const { chartProps, helmProps } = props
  const chartLoader = new ChartLoader(id, chartProps)
  const namespace = chartProps.namespace ?? 'default'

  const helmPropsScope = scope<HelmProps<HarborHelmParam>>({
    chart: helmHarborName,
    helmFlags: ['--namespace', namespace, '--create-namespace']
  }).merge(helmProps as HelmProps<HarborHelmParam>)

  if (namespace !== 'default') {
    chartLoader.addComponent(
      new ComponentLoader(KubeNamespace, `${id}-ns`, {
        metadata: {
          name: namespace
        }
      })
    )
  }

  return chartLoader.addHelm(() => new HelmLoader(`${id}-harbor`, helmPropsScope.get()))
}
