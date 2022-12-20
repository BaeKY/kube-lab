import { ApiObject, GroupVersionKind } from 'cdk8s'
import { Construct } from 'constructs'

export interface KubeIpAddressPoolProps {
  metadata?: {
    name?: string
    namespace?: string
  }
  spec?: {
    addresses: string[]
    autoAssign?: boolean
  }
}

export class KubeIpAddressPool extends ApiObject {
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'metallb.io/v1beta1',
    kind: 'IPAddressPool'
  }

  public constructor(chart: Construct, id: string, props: KubeIpAddressPoolProps) {
    super(chart, id, {
      ...KubeIpAddressPool.GVK,
      ...props
    })
  }
}
