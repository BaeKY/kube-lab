import { scope } from '@package/common/src'
import { ObjectEditor } from '@package/common/src/utils/scope'
import { Container, VolumeMount } from '@package/k8s-generated'
import { IVolumeMountable, Volume } from './volume-factory'

export class ContainerFactory implements IVolumeMountable {
  private readonly containerScope!: Omit<ObjectEditor<Container, Container>, 'remove'>
  public constructor(name: string, image?: string) {
    this.containerScope = scope({
      name,
      image
    })
  }

  public getContainerScope() {
    return this.containerScope
  }

  public setProps(container: Container): this {
    this.containerScope.set(container)
    return this
  }

  public updateProps(container: Container): this {
    this.containerScope.merge(container)
    return this
  }

  public setProp<K extends keyof Container>(key: K, value: Container[K]): this {
    this.containerScope.z(key).set(value as any)
    return this
  }

  public updateProp(key: keyof Container, value: Container[typeof key]): this {
    this.containerScope.z(key).merge(value)
    return this
  }

  public addVolumeMounts<N extends string>(volume: Volume<N, any>, volumeMounts: Omit<VolumeMount, 'name'>[]): this {
    this.containerScope.z('volumeMounts').merge(volumeMounts.map((mnt) => volume.createMount(mnt)))
    return this
  }

  public removeVolumeMounts<N extends string>(volumeName: N, path: string | string[]): this {
    const realPath = typeof path === 'string' ? [path] : path
    const survivedVolumeMounts = this.containerScope
      .z('volumeMounts')
      .get()
      .filter((mnt) => mnt.name !== volumeName || !realPath.includes(mnt.mountPath))
    this.containerScope.z('volumeMounts').set(survivedVolumeMounts)
    return this
  }

  public clearVolumeMounts(): void {
    this.containerScope.z('volumeMounts').set([])
  }

  public create(): Container {
    return this.containerScope.get()
  }
}
