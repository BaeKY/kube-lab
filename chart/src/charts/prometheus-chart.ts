import { ChartLoader, HelmLoader } from '@package/cdk8s-loader/src'
import { ChartProps } from 'cdk8s'
import { KubePrometheusStackHelmParam } from '../helm-values/prometheus-community/kube-prometheus-stack'

export const prometheusChart = (
  id: string,
  chartProps: ChartProps,
  options: { releaseName: string; helmFlags?: string[]; values?: KubePrometheusStackHelmParam }
) => {
  return new ChartLoader(id, chartProps).addHelm(
    (chartProps) =>
      new HelmLoader<KubePrometheusStackHelmParam>(`${id}-helm`, {
        chart: 'prometheus-community/kube-prometheus-stack',
        releaseName: options.releaseName,
        helmFlags:
          chartProps.namespace != null
            ? ['--namespace', chartProps.namespace, '--create-namespace', ...(options.helmFlags ?? [])]
            : undefined,
        values: options.values
      })
  )
}
