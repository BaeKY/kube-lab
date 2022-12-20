import { ChartLoader, ComponentLoader, HelmLoader } from '@package/cdk8s-loader/src'
import { PartialRecursive } from '@package/common'
import { KubeIpAddressPool } from './custom-component'
import { Metallb } from './helm-chart-value-types/metallb/metallb'
import { ChartProps } from 'cdk8s'
import { KubeNamespace } from '@package/k8s-generated/src'

export const metallbChart = (
  id: string,
  chartProps: ChartProps,
  options: {
    metallbHelm: {
      releaseName: string
    }
    ipAddressPool: {
      name: string
      addresses: string[]
      autoAssign?: boolean
    }
  }
) =>
  new ChartLoader(id, chartProps)
    .addComponent(
      new ComponentLoader(KubeNamespace, `${id}-namespace`, {
        metadata: {
          name: chartProps.namespace
        }
      })
    )
    .addHelm(
      (chartProps) =>
        new HelmLoader<PartialRecursive<Metallb>>(`${id}-metallb-helm`, {
          chart: 'metallb/metallb',
          releaseName: options.metallbHelm.releaseName,
          helmFlags: chartProps.namespace != null ? ['--namespace', chartProps.namespace] : undefined
        })
    )
    .addComponent(
      new ComponentLoader(KubeIpAddressPool, `${id}-ip-address-pool`, {
        metadata: {
          name: options.ipAddressPool.name
        },
        spec: {
          addresses: options.ipAddressPool.addresses,
          autoAssign: options.ipAddressPool.autoAssign
        }
      })
    )
