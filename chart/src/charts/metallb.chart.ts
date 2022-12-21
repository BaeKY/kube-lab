import { ChartLoader, ComponentLoader, HelmLoader, HelmProps } from '@package/cdk8s-loader'
import { PartialRecursive, scope } from '@package/common'
import { KubeNamespace } from '@package/k8s-generated'
import { KubeIpAddressPool } from '../custom-component'
import { MetallbHelmParam } from '../helm-values/metallb/metallb'
import { LoadingChart } from '../types'

export const metallbChart: LoadingChart<{
  helmProps: Omit<HelmProps<MetallbHelmParam>, 'chart'>
  ipAddressPool: {
    name: string
    addresses: string[]
    autoAssign?: boolean
  }
}> = (id, props) => {
  const { chartProps, helmProps, ipAddressPool } = props
  const namespace = chartProps.namespace ?? 'default'
  const chartLoader = new ChartLoader(id, chartProps)

  const helmOptionsScope = scope<HelmProps<MetallbHelmParam>>({
    chart: 'metallb/metallb',
    helmFlags: ['--namespace', namespace, '--create-namespace']
  }).merge(helmProps as HelmProps<MetallbHelmParam>)

  if (namespace !== 'default') {
    chartLoader.addComponent(
      new ComponentLoader(KubeNamespace, `${id}-namespace`, {
        metadata: {
          name: chartProps.namespace
        }
      })
    )
  }
  return chartLoader
    .addHelm(() => new HelmLoader<PartialRecursive<MetallbHelmParam>>(`${id}-metallb-helm`, helmOptionsScope.get()))
    .addComponent(
      new ComponentLoader(KubeIpAddressPool, `${id}-ip-address-pool`, {
        metadata: {
          name: ipAddressPool.name
        },
        spec: {
          addresses: ipAddressPool.addresses,
          autoAssign: ipAddressPool.autoAssign
        }
      })
    )
}
