import { App } from 'cdk8s'
import * as dotenv from 'dotenv'
import path from 'path'
import { coreDnsChart, metallbChart, prometheusChart } from './charts'
import { ingressNginxChart } from './charts/ingress-nginx.chart'
import { PartialRecursive, scope } from '@package/common/src'
import coreDnsDefValues from './helm-values/coredns/coredns'
import ingressNginxDefValues, { IngressNginxHelmParam } from './helm-values/ingress-nginx/ingress-nginx'
import { externalDnsChart } from './charts/external-dns.chart'
import externalDnsDefValues, { ExternalDnsHelmParam } from './helm-values/external-dns/external-dns'

dotenv.config({
  path: path.resolve(process.cwd(), '.env')
})

const synth = () => {
  const app: App = new App()
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

  const ingressNginxValues = scope<PartialRecursive<IngressNginxHelmParam>>(ingressNginxDefValues).merge({
    controller: {
      extraArgs: {
        'tcp-services-configmap': '$(POD_NAMESPACE)/tcp-services'
      }
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

  const coreDnsValuesScope = scope(coreDnsDefValues)
  coreDnsValuesScope
    .z('servers')
    .z(0)
    .z('plugins')
    .merge([
      {
        name: 'etcd',
        parameters: 'kube-ops.org',
        configBlock: ['stubzones', 'path /skydns', 'endpoint http://10.103.132.59:2379'].join('\n')
      }
    ])
  coreDnsValuesScope.z('isClusterService').set(false)
  coreDnsValuesScope.z('rbac').z('create').set(true)

  const coreDns = coreDnsChart('core-dns', {
    chartProps: {
      namespace: 'host-dns'
    },
    helmProps: {
      releaseName: 'core-dns',
      values: coreDnsValuesScope.get()
    }
  }).load(app)
  coreDns.addDependency(metalLb, ingressNginx)

  const externalDnsValuesScope = scope<PartialRecursive<ExternalDnsHelmParam>>(externalDnsDefValues)
  const externalDns = externalDnsChart('external-dns', {
    chartProps: {
      namespace: 'external-dns'
    },
    helmProps: {}
  })

  app.synth()
}

synth()
