import { EnvVar, KubeConfigMap, KubeConfigMapProps } from '@package/k8s-generated'
import { ComponentLoader } from '../base-loader'
import { IEnvVarFactory, IVolumeFactory, Volume } from '../container-factory'

export class ConfigMapLoader
  extends ComponentLoader<typeof KubeConfigMap>
  implements IVolumeFactory, IEnvVarFactory<'configMapKeyRef'>
{
  public constructor(id: string, props: KubeConfigMapProps) {
    super(KubeConfigMap, id, props)
  }

  public createEnvVars<T extends { [key: string]: string } = Record<string, string>>(
    params: {
      name: keyof T
      options?: {
        key?: string
        optional?: boolean
      }
    }[]
  ): EnvVar[] {
    return params.map(({ name, options }) => this.createEnvVar(name, options))
  }

  public createVolume<N extends string = string>(name: N): Volume<N, 'configMap'> {
    return Volume.create<'configMap', N>(name, {
      configMap: {
        name: this.propScope.z('metadata').z('name').get()
      }
    })
  }

  public createEnvVar<T extends { [key: string]: string } = Record<string, string>>(
    name: keyof T,
    options?: {
      key?: string
      optional?: boolean
    }
  ): EnvVar {
    return {
      name: name as string,
      valueFrom: {
        configMapKeyRef: {
          name: this.propScope.z('metadata').z('name').get(),
          key: options?.key ?? (name as string),
          optional: options?.optional
        }
      }
    }
  }

  public getData<T extends Record<string, string> = { [key: string]: string }>(): T {
    return this.propScope.z('data').get() as any
  }

  public addData<T extends Record<string, string> = { [key: string]: string }>(key: keyof T, data: string): this {
    this.propScope
      .z('data')
      .z(key as any)
      .set(data)
    return this
  }

  public setData(data: Record<string, string>): this {
    this.propScope.z('data').set(data)
    return this
  }

  public updateData(data: Record<string, string>): this {
    this.propScope.z('data').merge(data)
    return this
  }
}
