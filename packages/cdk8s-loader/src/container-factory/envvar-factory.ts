import { EnvVar } from '@package/k8s-generated'

export interface IEnvVarFactory {
  createEnvVar(name: string, path: string): EnvVar
}
