import { ChartLoader, ComponentLoader, HelmLoader, HelmProps } from '@package/cdk8s-loader/src'
import { PartialRecursive, scope } from '@package/common/src'
import { ExternalDnsHelmParam } from '../helm-values/external-dns/external-dns'
import { LoadingChart } from '../types'
import { KubeNamespace } from '@package/k8s-generated/src'

export const externalDnsChart: LoadingChart<{
  helmProps: Omit<HelmProps<PartialRecursive<ExternalDnsHelmParam>>, 'chart'>
}> = (id, props) => {
  const { chartProps, helmProps } = props

  const namespace = chartProps.namespace ?? 'default'

  const externalDnsValuesScope = scope<HelmProps<PartialRecursive<ExternalDnsHelmParam>>>({
    chart: 'external-dns/external-dns',
    helmFlags: ['--namespace', namespace, '--create-namespace']
  }).merge(helmProps as any)
  const chartLoader = new ChartLoader(id, chartProps)

  if (namespace !== 'default') {
    chartLoader.addComponent(
      new ComponentLoader(KubeNamespace, `${id}-ns`, {
        metadata: {
          name: namespace
        }
      })
    )
  }

  chartLoader.addHelm(
    () => new HelmLoader<PartialRecursive<ExternalDnsHelmParam>>(`${id}-helm`, externalDnsValuesScope.get())
  )
  return chartLoader
}
