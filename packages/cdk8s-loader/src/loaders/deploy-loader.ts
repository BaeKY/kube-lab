import { Container, EnvVar, KubeDeployment, KubeDeploymentProps } from '@package/k8s-generated'
import { ComponentLoader } from '../base-loader'

export class DeployLoader extends ComponentLoader<typeof KubeDeployment> {
  public constructor(id: string, props: KubeDeploymentProps) {
    super(KubeDeployment, id, props)
  }

  public addContainer(container: Container) {
    const containersScope = this.propScope.z('spec').z('template').z('spec').z('containers')
    const idx = containersScope.get().length
    return containersScope.z(idx).set(container)
  }

  public setContainers() {
    this.propScope.z('spec').z('template').z('spec').z('containers').z(0).z('env')
  }

  public addEnv(containerIndex: number, envVar: EnvVar) {
    this.propScope.z('spec').z('template').z('spec').z('containers').z(containerIndex).z('env').merge([envVar])
  }
}
