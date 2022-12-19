import { EnvVar, KubeSecret, KubeSecretProps } from '@package/k8s-generated'
import { ComponentLoader } from '../base-loader'
import { IEnvVarFactory, IVolumeFactory, Volume } from '../container-factory'

export class SecretLoader extends ComponentLoader<typeof KubeSecret> implements IVolumeFactory, IEnvVarFactory {
  public constructor(id: string, props: KubeSecretProps) {
    super(KubeSecret, id, props)
  }

  public createVolume<N extends string = string>(name: N): Volume<N, 'secret'> {
    return Volume.create<'secret', N>(name, {
      secret: {
        secretName: this.propScope.z('metadata').z('name').get()
      }
    })
  }

  public createEnvVar(name: string, path: string, optional?: boolean): EnvVar {
    return {
      name,
      valueFrom: {
        secretKeyRef: {
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
