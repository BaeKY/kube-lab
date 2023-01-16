import * as fs from 'fs'
import * as path from 'path'
import { MetallbHelmParam } from './types'

export * from './types'
const defaultValues: MetallbHelmParam = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'default-values.json')).toString()
)
export default defaultValues
