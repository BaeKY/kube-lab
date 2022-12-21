import { App } from 'cdk8s'
import * as dotenv from 'dotenv'
import path from 'path'
import { metallbChart, prometheusChart } from './charts'
import { ingressNginxChart } from './charts/ingress-nginx.chart'

dotenv.config({
  path: path.resolve(process.cwd(), '.env')
})

const synth = () => {
  const app: App = new App()
  const metalLb = metallbChart(
    'metallb',
    {
      namespace: 'metallb-system'
    },
    {
      ipAddressPool: {
        name: 'ipaddresspool',
        addresses: [process.env.MY_IP_ADDRESS_POOL as string]
      },
      metallbHelm: {
        releaseName: 'l2-lb'
      }
    }
  ).load(app)

  const ingressNginx = ingressNginxChart(
    'ingress-nginx',
    {
      namespace: 'ingress-nginx'
    },
    {
      helmConfig: {
        releaseName: 'default'
      }
    }
  ).load(app)

  ingressNginx.addDependency(metalLb)

  const prometheus = prometheusChart(
    'kube-stack-prometheus',
    {
      namespace: 'prom-monitoring'
    },
    {
      releaseName: 'kube-stack-prometheus',
      helmFlags: ['--set', 'prometheus-node-exporter.hostRootFsMount.enabled=false']
    }
  ).load(app)

  prometheus.addDependency(metalLb, ingressNginx)

  app.synth()
}

synth()
