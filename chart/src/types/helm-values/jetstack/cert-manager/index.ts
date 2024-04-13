import * as fs from 'fs'
import * as path from 'path'
import { CertManagerHelmParam } from './types'

export * from './types'
const defaultValues: CertManagerHelmParam = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'default-values.json')).toString()
)
export default defaultValues
