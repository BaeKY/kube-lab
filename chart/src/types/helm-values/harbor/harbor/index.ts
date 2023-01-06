import * as fs from 'fs'
import * as path from 'path'
import { HarborHelmParam } from './types'

export * from './types'
const defaultValues: HarborHelmParam = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'default-values.json')).toString()
)
export default defaultValues
