import { PartialRecursive, scope } from '@package/common'
import { App, AppProps } from 'cdk8s'
import {
  ArgoCdChart,
  CertManagerChart,
  DnsChart,
  HarborChart,
  IngressControllerChart,
  LoadBalancerChart
} from './charts'
import {
  ArgoCdHelmParam,
  ExternalDnsHelmParam,
  HarborHelmParam,
  IngressNginxHelmParam,
  argoCdDefaultValues,
  externalDnsDefaultValues,
  harborDefaultValues,
  ingressNginxDefaultValues
} from './types'

export class KubeOpsApp extends App {
  public constructor(props?: AppProps) {
    super(props)

    /* -------------------------------------------------------------------------- */
    /*                             Add chart: metallb                             */
    /* -------------------------------------------------------------------------- */
    const loadBalancer = new LoadBalancerChart(this, 'metallb', {
      namespace: 'metallb-system',
      ipAddressPool: {
        name: 'local-ip',
        spec: {
          addresses: [process.env.LB_IP_ADDRESS_POOL as string]
        }
      },
      metallb: {
        releaseName: 'l2-lb',
        version: '0.13.7'
      }
    })

    /* -------------------------------------------------------------------------- */
    /*                          Add chart: ingress-nginx                          */
    /* -------------------------------------------------------------------------- */
    const dnsNamespace = 'dns'
    const ingressNginxValues = scope<PartialRecursive<IngressNginxHelmParam>>(ingressNginxDefaultValues).merge({
      controller: {
        service: {
          type: 'LoadBalancer'
        }
      },
      tcp: {
        '53': `${dnsNamespace}/core-dns-coredns:53`
      },
      udp: {
        '53': `${dnsNamespace}/core-dns-coredns:53`
      }
    })

    const ingressController = new IngressControllerChart(this, 'ingress-nginx', {
      namespace: 'ingress-nginx',
      ingressNginxController: {
        releaseName: 'ingress-nginx',
        values: ingressNginxValues.get(),
        version: '4.4.0'
      }
    })
    ingressController.addDependency(loadBalancer)

    const etcdClusterName = 'etcd'
    const etcdClusterPort = 2379
    const etcdUrl = `http://${etcdClusterName}:${etcdClusterPort}`

    const dnsChart = new DnsChart(this, 'dns', {
      namespace: dnsNamespace,
      coreDns: {
        releaseName: 'core-dns',
        version: '1.19.7',
        values: {
          isClusterService: false,
          rbac: {
            create: true
          },
          readinessProbe: {
            enabled: false
          },
          servers: [
            {
              zones: [
                {
                  zone: '.'
                }
              ],
              port: 53,
              plugins: [
                {
                  name: 'errors'
                },
                {
                  name: 'health',
                  configBlock: 'lameduck 5s'
                },
                {
                  name: 'log'
                },
                {
                  name: 'etcd',
                  configBlock: ['path /skydns', `endpoint ${etcdUrl}`, 'fallthrough'].join('\n')
                },
                {
                  name: 'cache',
                  parameters: 30
                },
                {
                  name: 'prometheus',
                  parameters: '0.0.0.0:9153'
                },
                {
                  name: 'reload'
                },
                {
                  name: 'loadbalance'
                }
              ]
            }
          ]
        }
      },
      etcd: {
        name: etcdClusterName,
        replicas: 3,
        labels: {
          'this.kubernetes.io/name': etcdClusterName,
          'this.kubernetes.io/component': 'this'
        }
      },
      externalDns: {
        releaseName: 'external-dns',
        version: '1.12.0',
        values: scope<PartialRecursive<ExternalDnsHelmParam>>(externalDnsDefaultValues)
          .merge({
            env: [
              {
                name: 'ETCD_URLS',
                value: etcdUrl
              }
            ],
            logLevel: 'info',
            provider: 'coredns'
          })
          .get()
      }
    })

    dnsChart.addDependency(ingressController)

    const email = process.env.CERT_MANAGER_EMAIL as string
    const apiKeySecretName = 'cloudflare-api-key'
    const apiKey = process.env.CLOUDFLARE_API_KEY as string
    const certManager = new CertManagerChart(this, 'cert-manager', {
      namespace: 'cert-manager',
      certManager: {
        releaseName: 'cert-manager',
        helmFlags: ['--set', 'installCRDs=true'],
        version: '1.10.1'
      },
      apiKeySecret: {
        secretName: apiKeySecretName,
        apiKey
      },
      clusterIssuers: [
        {
          spec: {
            acme: {
              privateKeySecretRef: {
                name: 'acme-issuer-account-key'
              },
              email,
              server: 'https://acme-v02.api.letsencrypt.org/directory',
              solvers: [
                {
                  dns01: {
                    cloudflare: {
                      email,
                      apiKeySecretRef: {
                        name: 'cloudflare-api-key',
                        key: 'api-key'
                      }
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    })
    certManager.addDependency(dnsChart)

    const argocdHost = 'argocd.lab9.cloud'
    const scopeArgoCdHelmParam = scope<PartialRecursive<ArgoCdHelmParam>>(argoCdDefaultValues)
    {
      scopeArgoCdHelmParam.z('server').z('service').z('type').set('LoadBalancer')
      scopeArgoCdHelmParam
        .z('server')
        .z('ingress')
        .merge({
          enabled: true,
          ingressClassName: 'nginx',
          hosts: [argocdHost]
        })
    }
    const argocd = new ArgoCdChart(this, 'argo', {
      namespace: 'argo',
      argoCd: {
        releaseName: 'argo',
        values: scopeArgoCdHelmParam.get() as any,
        version: '5.16.13'
      }
    })
    argocd.addDependency(dnsChart)

    const harborHost = 'harbor.lab9.cloud'
    const harborNotaryHost = 'harbor-notary.lab9.cloud'
    const scopeHarborHelmParam = scope<PartialRecursive<HarborHelmParam>>(harborDefaultValues)
    {
      scopeHarborHelmParam
        .z('expose')
        .z('ingress')
        .merge({
          className: 'nginx',
          hosts: {
            core: harborHost,
            notary: harborNotaryHost
          }
        })
    }
    const harbor = new HarborChart(this, 'harbor', {
      namespace: 'harbor',
      harbor: {
        releaseName: 'harbor',
        values: scopeHarborHelmParam.get() as any,
        version: '1.11.0'
      }
    })
    harbor.addDependency(argocd)
  }
}
