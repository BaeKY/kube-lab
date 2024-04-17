import { EnvVar, KubeSecret, KubeSecretProps } from '@package/k8s-generated'
import { ComponentLoader } from '../base-loader'
import { IEnvVarFactory, IVolumeFactory, Volume } from '../container-factory'

type KubeSecretType =
    | 'Opaque'
    | 'kubernetes.io/service-account-token'
    | 'kubernetes.io/dockercfg'
    | 'kubernetes.io/dockerconfigjson'
    | 'kubernetes.io/basic-auth'
    | 'kubernetes.io/ssh-auth'
    | 'kubernetes.io/tls'
    | 'bootstrap.kubernetes.io/token'

export class SecretLoader
    extends ComponentLoader<typeof KubeSecret>
    implements IVolumeFactory, IEnvVarFactory<'secretKeyRef'>
{
    public constructor(id: string, props: KubeSecretProps & { type?: KubeSecretType }) {
        super(KubeSecret, id, props)
    }

    public createVolume<N extends string = string>(name: N): Volume<N, 'secret'> {
        return Volume.create<'secret', N>(name, {
            secret: {
                secretName: this.propScope.z('metadata').z('name').get()
            }
        })
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
                secretKeyRef: {
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
