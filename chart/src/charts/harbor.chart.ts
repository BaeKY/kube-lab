import { AbsChart, HelmProps } from '@package/cdk8s-loader'
import { PartialRecursive, scope } from '@package/common'
import { ChartProps, Helm } from 'cdk8s'
import { HarborHelmParam } from '../types'
import { Certificate, CertificateProps } from '@package/k8s-generated/generated'

interface HarborChartProps extends ChartProps {
  harbor: Omit<PartialRecursive<HelmProps<HarborHelmParam>>, 'chart'>
  certificate?: CertificateProps
}

export class HarborChart extends AbsChart<HarborChartProps> {
  protected loadChildren(id: string, props: HarborChartProps): void {
    const { harbor, namespace, certificate: certificateProps } = props
    if (certificateProps != null) {
      new Certificate(this, `${id}-certificate`, certificateProps)
    }
    const scopeHarborHelmParam = scope<HelmProps<HarborHelmParam>>({
      chart: 'harbor/harbor',
      namespace
    }).merge(harbor as HelmProps<HarborHelmParam>)
    new Helm(this, `${id}-harbor`, scopeHarborHelmParam.get())
  }
}
