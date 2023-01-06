import { config } from 'dotenv'
import path from 'path'
import { KubeOpsApp } from './app'

config({
  path: path.resolve(process.cwd(), '.env')
})

new KubeOpsApp().synth()
