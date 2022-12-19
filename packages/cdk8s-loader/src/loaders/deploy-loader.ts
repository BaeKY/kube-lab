import { Container, EnvVar, KubeDeployment, KubeDeploymentProps } from '@package/k8s-generated'
import { ComponentLoader } from '../base-loader'
import { IVolumeFactory } from '../container-factory'

export class DeployLoader extends ComponentLoader<typeof KubeDeployment> {
  public constructor(id: string, props: KubeDeploymentProps) {
    super(KubeDeployment, id, props)
  }

  public addContainer(container: Container) {
    const containersScope = this.propScope.z('spec').z('template').z('spec').z('containers')
    const idx = containersScope.get().length
    return containersScope.z(idx).set(container)
  }

  public setContainers(containers: Container[]) {
    this.propScope.z('spec').z('template').z('spec').z('containers').set(containers)
  }

  public addEnv(containerIndex: number, envVar: EnvVar) {
    this.propScope.z('spec').z('template').z('spec').z('containers').z(containerIndex).z('env').merge([envVar])
  }

  public addVolume(volumeName: string, volumeFactory: IVolumeFactory) {
    const volume = volumeFactory.createVolume(volumeName)
    this.propScope.z('spec').z('template').z('spec').z('volumes').merge([volume])
  }
}
