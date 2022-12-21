import { ChartLoader, HelmLoader, HelmProps } from '@package/cdk8s-loader'
import { scope } from '@package/common'
import { KubePrometheusStackHelmParam } from '../helm-values/prometheus-community/kube-prometheus-stack'
import { LoadingChart } from '../types'

export const prometheusChart: LoadingChart<{
  helmProps: Omit<HelmProps<KubePrometheusStackHelmParam>, 'chart'>
}> = (id, props) => {
  const { chartProps, helmProps } = props

  const namespace = chartProps.namespace ?? 'default'

  const helmOptionsScope = scope({
    chart: 'prometheus-community/kube-prometheus-stack',
    helmFlags: ['--namespace', namespace, '--create-namespace']
  } as HelmProps<KubePrometheusStackHelmParam>)

  return new ChartLoader(id, chartProps).addHelm(
    () =>
      new HelmLoader<KubePrometheusStackHelmParam>(
        `${id}-helm`,
        helmOptionsScope.merge(helmProps as HelmProps<KubePrometheusStackHelmParam>).get()
      )
  )
}
