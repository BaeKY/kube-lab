import { ChartLoader, ComponentLoader, HelmLoader, HelmProps } from '@package/cdk8s-loader'
import { PartialRecursive, scope } from '@package/common'
import { KubeConfigMap, KubeNamespace } from '@package/k8s-generated'
import { IngressNginxHelmParam } from '../helm-values/ingress-nginx/ingress-nginx'
import { LoadingChart } from '../types'

export const ingressNginxChart: LoadingChart<{
  helmProps: Omit<HelmProps<PartialRecursive<IngressNginxHelmParam>>, 'chart'>
  tcpServices?: {
    data?: {
      [key: number]: string
    }
  }
}> = (id, props) => {
  const { chartProps, helmProps, tcpServices } = props

  const namespace = chartProps.namespace ?? 'default'
  const helmOptionsScope = scope({
    chart: 'ingress-nginx/ingress-nginx',
    helmFlags: ['--namespace', namespace, '--create-namespace']
  } as HelmProps<PartialRecursive<IngressNginxHelmParam>>)
  helmOptionsScope.merge(helmProps as HelmProps<IngressNginxHelmParam>)

  const tcpServicesScope = scope({
    metadata: {
      name: 'tcp-services'
    },
    data: {}
  } as NonNullable<typeof tcpServices>)
  tcpServicesScope.merge(tcpServices ?? {})

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

  return chartLoader
    .addComponent(new ComponentLoader(KubeConfigMap, `${id}-tcp-services`, tcpServicesScope.get()))
    .addHelm(
      () => new HelmLoader<PartialRecursive<IngressNginxHelmParam>>(`${id}-ingress-nginx`, helmOptionsScope.get())
    )
}
