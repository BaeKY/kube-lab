import { EnvVar, KubeConfigMap, KubeConfigMapProps } from '@package/k8s-generated'
import { ComponentLoader } from '../base-loader'
import { IEnvVarFactory, IVolumeFactory, Volume } from '../container-builder'

export class ConfigMapLoader extends ComponentLoader<typeof KubeConfigMap> implements IVolumeFactory, IEnvVarFactory {
  public constructor(id: string, props: KubeConfigMapProps) {
    super(KubeConfigMap, id, props)
  }

  public createVolume<N extends string = string>(name: N): Volume<N, 'configMap'> {
    return Volume.create<'configMap', N>(name, {
      configMap: {
        name: this.propScope.z('metadata').z('name').get()
      }
    })
  }

  public createEnvVar(name: string, path: string, optional?: boolean): EnvVar {
    return {
      name,
      valueFrom: {
        configMapKeyRef: {
          name: this.propScope.z('metadata').z('name').get(),
          key: path,
          optional
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
}

const vol = new ConfigMapLoader('', {}).createVolume('testing')

const volumeName = vol.name
