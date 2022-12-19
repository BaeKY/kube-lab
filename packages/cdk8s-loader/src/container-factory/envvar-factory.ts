import { EnvVar, EnvVarSource } from '@package/k8s-generated'

export interface IEnvVarFactory<K extends keyof EnvVarSource> {
  createEnvVar<T extends { [key: string]: string } = Record<string, string>>(
    name: keyof T,
    options: EnvVarSource[K]
  ): EnvVar

  createEnvVars<T extends { [key: string]: string } = Record<string, string>>(
    params: {
      name: keyof T
      options?: EnvVarSource[K]
    }[]
  ): EnvVar[]
}
