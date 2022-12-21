import { ChartLoader, ComponentLoader, HelmLoader } from '@package/cdk8s-loader'
import { PartialRecursive } from '@package/common'
import { KubeConfigMap, KubeNamespace } from '@package/k8s-generated'
import { ChartProps } from 'cdk8s'
import { IngressNginx } from '../helm-values/ingress-nginx/ingress-nginx'

export const ingressNginxChart = (
  id: string,
  chartProps: ChartProps,
  props: {
    tcpServices?: {
      data?: {
        [key: number]: string
      }
    }
    helmConfig: {
      releaseName: string
      values?: PartialRecursive<IngressNginx>
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
    .addComponent(
      new ComponentLoader(KubeConfigMap, `${id}-tcp-services`, {
        metadata: {
          name: 'tcp-services'
        },
        data: props.tcpServices?.data ?? {}
      })
    )
    .addHelm(
      (chartProps) =>
        new HelmLoader<PartialRecursive<IngressNginx>>(`${id}-ingress-nginx`, {
          chart: 'ingress-nginx/ingress-nginx',
          releaseName: props.helmConfig.releaseName,
          helmFlags: chartProps.namespace != null ? ['--namespace', chartProps.namespace] : undefined,
          values: {
            ...props.helmConfig.values,
            controller: {
              ...props.helmConfig.values?.controller,
              extraArgs: {
                'tcp-services-configmap': '$(POD_NAMESPACE)/tcp-services',
                ...props.helmConfig.values?.controller?.extraArgs
              }
            }
          }
        })
    )
