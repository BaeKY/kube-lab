import { PartialRecursive, scope } from '@package/common'
import { App } from 'cdk8s'
import * as dotenv from 'dotenv'
import path from 'path'
import { coreDnsChart, etcdClusterChart, externalDnsChart, ingressNginxChart, metallbChart } from './charts'
import {
  CorednsHelmParam,
  ExternalDnsHelmParam,
  IngressNginxHelmParam,
  corednsDefaultValues,
  externalDnsDefaultValues,
  ingressNginxDefaultValues
} from './helm-values'

dotenv.config({
  path: path.resolve(process.cwd(), '.env')
})

const synth = () => {
  const app: App = new App()

  /* -------------------------------------------------------------------------- */
  /*                             Add chart: metallb                             */
  /* -------------------------------------------------------------------------- */

  const metalLb = metallbChart('metallb', {
    chartProps: { namespace: 'metallb-system' },
    helmProps: {
      releaseName: 'l2-lb'
    },
    ipAddressPool: {
      name: 'local-ip',
      addresses: [process.env.MY_IP_ADDRESS_POOL as string]
    }
  }).load(app)

  /* -------------------------------------------------------------------------- */
  /*                          Add chart: ingress-nginx                          */
  /* -------------------------------------------------------------------------- */

  const ingressNginxValues = scope<PartialRecursive<IngressNginxHelmParam>>(ingressNginxDefaultValues).merge({
    controller: {
      service: {
        type: 'LoadBalancer'
      }
    },
    tcp: {
      '8080': 'default/nginx:80'
      // '53': 'host-dns/core-dns-coredns:53'
    },
    udp: {
      // '53': 'host-dns/core-dns-coredns:53'
      '8080': 'default/nginx:80'
    }
  })
  const ingressNginx = ingressNginxChart('ingress-nginx', {
    chartProps: {
      namespace: 'ingress-nginx'
    },
    helmProps: {
      releaseName: 'default',
      values: ingressNginxValues.get()
    }
  }).load(app)
  ingressNginx.addDependency(metalLb)

  /* -------------------------------------------------------------------------- */
  /*                      Add chart: kube-stack-prometheus                      */
  /* -------------------------------------------------------------------------- */

  // 잠시 제외(사실 필요 없을것 같음.)
  // const prometheus = prometheusChart('kube-stack-prometheus', {
  //   chartProps: {
  //     namespace: 'prometheus'
  //   },
  //   helmProps: {
  //     releaseName: 'kube-stack-prometheus',
  //     helmFlags: ['--set', 'prometheus-node-exporter.hostRootFsMount.enabled=false']
  //   }
  // }).load(app)
  // prometheus.addDependency(metalLb, ingressNginx)

  /* -------------------------------------------------------------------------- */
  /*                           Add chart: etcd-cluster                          */
  /* -------------------------------------------------------------------------- */

  const etcdCluster = etcdClusterChart('etcd-dns', {
    chartProps: {
      namespace: 'host-dns'
    },
    etcdProps: {
      name: 'etcd-dns',
      replicas: 3,
      labels: {
        'app.kubernetes.io/name': 'etcd-dns',
        'app.kubernetes.io/component': 'app'
      }
    }
  }).load(app)

  etcdCluster.addDependency(ingressNginx)

  /* -------------------------------------------------------------------------- */
  /*                             Add chart: core-dns                            */
  /* -------------------------------------------------------------------------- */

  const etcdUrl = 'http://etcd-dns.host-dns:2379'
  const coreDns = coreDnsChart('core-dns', {
    chartProps: {
      namespace: 'host-dns'
    },
    helmProps: {
      releaseName: 'core-dns',
      values: {
        isClusterService: false,
        rbac: {
          create: true
        },
        serviceType: 'ClusterIP',
        readinessProbe: {
          enabled: false
        },
        servers: [
          {
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
                configBlock: `endpoint ${etcdUrl}`
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
    }
  }).load(app)
  coreDns.addDependency(etcdCluster)

  /* -------------------------------------------------------------------------- */
  /*                           Add chart: external-dns                          */
  /* -------------------------------------------------------------------------- */

  const externalDnsValuesScope = scope<PartialRecursive<ExternalDnsHelmParam>>(externalDnsDefaultValues)
  externalDnsValuesScope.merge({
    env: [
      {
        name: 'ETCD_URLS',
        value: etcdUrl
      }
    ],
    logLevel: 'info',
    provider: 'coredns'
  })
  const externalDns = externalDnsChart('external-dns', {
    chartProps: {
      namespace: 'external-dns'
    },
    helmProps: {
      releaseName: 'external-dns',
      values: externalDnsValuesScope.get()
    }
  }).load(app)

  externalDns.addDependency(coreDns)

  app.synth()
}

synth()
