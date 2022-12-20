import { App } from 'cdk8s'
import * as dotenv from 'dotenv'
import { ingressNginxChart } from './ingress-nginx.chart'
import { metallbChart } from './metallb-chart'
import path from 'path'

dotenv.config({
  path: path.resolve(process.cwd(), '.env')
})

const synth = () => {
  const app: App = new App()

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

  ingressNginx.addDependency(metalLb)

  app.synth()
}

synth()
