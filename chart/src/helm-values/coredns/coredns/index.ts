import * as fs from 'fs'
import * as path from 'path'
import { CorednsHelmParam } from './types'

export * from './types'
const defaultValues: CorednsHelmParam = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'default-values.json')).toString()
)
export default defaultValues
