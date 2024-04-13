import * as fs from 'fs'
import * as path from 'path'
import { ExternalDnsHelmParam } from './types'

export * from './types'
const defaultValues: ExternalDnsHelmParam = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'default-values.json')).toString()
)
export default defaultValues
