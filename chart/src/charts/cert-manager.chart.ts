import { ChartLoader, HelmLoader, HelmProps } from '@package/cdk8s-loader'
import { PartialRecursive, scope } from '@package/common'
import { CertManagerHelmParam } from '../helm-values'
import { LoadingChart } from '../types'

const helmChartName = 'jetstack/cert-manager'

export const certManagerChart: LoadingChart<{
  helmProps: Omit<HelmProps<PartialRecursive<CertManagerHelmParam>>, 'chart' | 'repo'>
}> = (id, props) => {
  const { chartProps, helmProps } = props
  const chartLoader = new ChartLoader(id, chartProps)

  const namespace = chartProps.namespace ?? 'default'

  const scopeHelmProps = scope<HelmProps<CertManagerHelmParam>>({
    chart: helmChartName,
    namespace
  }).merge(helmProps as any)

  return chartLoader.addHelm(() => new HelmLoader(`${id}-helm`, scopeHelmProps.get()))
}
