import { ChartLoader, ComponentLoader, HelmLoader, HelmProps } from '@package/cdk8s-loader'
import { PartialRecursive, scope } from '@package/common'
import { KubeNamespace } from '@package/k8s-generated'
import { IngressNginxHelmParam } from '../helm-values/ingress-nginx/ingress-nginx'
import { LoadingChart } from '../types'

export const ingressNginxChart: LoadingChart<{
  helmProps: Omit<HelmProps<PartialRecursive<IngressNginxHelmParam>>, 'chart'>
}> = (id, props) => {
  const { chartProps, helmProps } = props

  const namespace = chartProps.namespace ?? 'default'
  const helmOptionsScope = scope({
    chart: 'ingress-nginx/ingress-nginx',
    helmFlags: ['--namespace', namespace, '--create-namespace']
  } as HelmProps<PartialRecursive<IngressNginxHelmParam>>)
  helmOptionsScope.merge(helmProps as HelmProps<IngressNginxHelmParam>)

  const chartLoader = new ChartLoader(id, chartProps)
  if (namespace !== 'default') {
    chartLoader.addComponent(
      new ComponentLoader(KubeNamespace, `${id}-namespace`, {
        metadata: {
          name: namespace
        }
      })
    )
  }

  return chartLoader.addHelm(
    () => new HelmLoader<PartialRecursive<IngressNginxHelmParam>>(`${id}-ingress-nginx`, helmOptionsScope.get())
  )
}
