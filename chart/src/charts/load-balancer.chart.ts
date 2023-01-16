import { AbsChart, HelmProps } from '@package/cdk8s-loader'
import { PartialRecursive, scope } from '@package/common'
import { IpAddressPool, IpAddressPoolSpec } from '@package/k8s-generated'
import { ChartProps, Helm } from 'cdk8s'
import { MetallbHelmParam } from '../types'

interface LoadBalancerChartProps extends ChartProps {
  metallb: Omit<HelmProps<PartialRecursive<MetallbHelmParam>>, 'chart'>
  ipAddressPool: {
    name: string
    spec: IpAddressPoolSpec
  }
}

export class LoadBalancerChart extends AbsChart<LoadBalancerChartProps> {
  protected loadChildren(id: string, props: LoadBalancerChartProps): void {
    const { metallb, ipAddressPool } = props
    const scopeMetallb = scope<HelmProps<PartialRecursive<MetallbHelmParam>>>({
      chart: 'metallb/metallb',
      namespace: this.namespace
    }).merge(metallb as any)

    const metallbHelm = new Helm(this, `${id}-metallb`, scopeMetallb.get())

    new IpAddressPool(this, `${id}-ip-address-pool`, {
      metadata: {
        name: ipAddressPool.name
      },
      spec: ipAddressPool.spec
    }).addDependency(metallbHelm)
  }
}
