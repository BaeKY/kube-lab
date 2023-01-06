import { PartialRecursive, scope } from '@package/common'
import { App } from 'cdk8s'
import { argocdChart, certManagerChart, dnsChart, ingressNginxChart, metallbChart } from './charts'
import { harborChart } from './charts/harbor.chart'
import {
  ArgoCdHelmParam,
  ExternalDnsHelmParam,
  HarborHelmParam,
  IngressNginxHelmParam,
  argoCdDefaultValues,
  externalDnsDefaultValues,
  harborDefaultValues,
  ingressNginxDefaultValues
} from './helm-values'

const initApp = () => {
  const app: App = new App()

  /* -------------------------------------------------------------------------- */
  /*                             Add chart: metallb                             */
  /* -------------------------------------------------------------------------- */

  const metalLb = metallbChart('metallb', {
    chartProps: { namespace: 'metallb-system' },
    helmProps: {
      releaseName: 'l2-lb',
      version: '0.13.7'
    },
    ipAddressPool: {
      name: 'local-ip',
      addresses: [process.env.LB_IP_ADDRESS_POOL as string]
    }
  }).load(app)

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
  const ingressNginx = ingressNginxChart('ingress-nginx', {
    chartProps: {
      namespace: 'ingress-nginx'
    },
    helmProps: {
      releaseName: 'default',
      values: ingressNginxValues.get(),
      version: '4.4.0'
    }
  }).load(app)
  ingressNginx.addDependency(metalLb)

  const etcdClusterName = 'etcd'
  const etcdClusterPort = 2379
  const etcdUrl = `http://${etcdClusterName}:${etcdClusterPort}`

  const dns = dnsChart('dns', {
    chartProps: {
      namespace: dnsNamespace
    },
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
        'app.kubernetes.io/name': etcdClusterName,
        'app.kubernetes.io/component': 'app'
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
  }).load(app)
  dns.addDependency(ingressNginx)

  const certManager = certManagerChart('cert-manager', {
    chartProps: {
      namespace: 'cert-manager'
    },
    helmProps: {
      releaseName: 'cert-manager',
      helmFlags: ['--set', 'installCRDs=true'],
      version: '1.10.1'
    }
  }).load(app)
  certManager.addDependency(dns)

  const argocdHost = 'argo.kube-ops.localhost'
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
    scopeArgoCdHelmParam.z('server').z('extraArgs').merge(['--insecure'])
  }
  const argocd = argocdChart('argo', {
    chartProps: {
      namespace: 'argo'
    },
    helmProps: {
      releaseName: 'argo',
      values: scopeArgoCdHelmParam.get() as any,
      version: '5.16.13'
    }
  }).load(app)
  argocd.addDependency(dns)

  const harborHost = 'harbor.kube-ops.localhost'
  const harborNotaryHost = 'harbor-notary.kube-ops.localhost'
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
  const harbor = harborChart('harbor', {
    chartProps: {
      namespace: 'harbor'
    },
    helmProps: {
      releaseName: 'harbor',
      values: scopeHarborHelmParam.get() as any,
      version: '1.11.0'
    }
  }).load(app)
  harbor.addDependency(argocd)
  return app
}

initApp().synth()
