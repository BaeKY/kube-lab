import { _ObjectEditor } from '@package/common/src/utils/scope'
import { Container, KubeDeployment, KubeDeploymentProps, LabelSelector, PodTemplateSpec } from '@package/k8s-generated'
import { ComponentLoader } from '../base-loader'
import { IVolume } from '../container-factory'

export class DeployLoader extends ComponentLoader<typeof KubeDeployment> {
  public constructor(id: string, props: KubeDeploymentProps) {
    super(KubeDeployment, id, props)
  }

  public addContainer(container: Container) {
    const containersScope = this.propScope.z('spec').z('template').z('spec').z('containers')
    const idx = containersScope.get().length
    containersScope.z(idx).set(container)
    return this
  }

  public setContainers(containers: Container[]) {
    this.propScope.z('spec').z('template').z('spec').z('containers').set(containers)
    return this
  }

  public addVolume<N extends string>(volume: IVolume<N>) {
    this.propScope.z('spec').z('template').z('spec').z('volumes').merge([volume])
    return this
  }

  public addVolumes(...volumes: IVolume<string>[]) {
    this.propScope.z('spec').z('template').z('spec').z('volumes').merge(volumes)
    return this
  }

  public updateTemplate(modifier: (scope: _ObjectEditor<PodTemplateSpec, KubeDeploymentProps>) => void) {
    modifier(this.propScope.z('spec').z('template'))
    return this
  }

  public updateSelector(modifier: (scope: _ObjectEditor<LabelSelector, KubeDeploymentProps>) => void) {
    modifier(this.propScope.z('spec').z('selector'))
    return this
  }

  public setReplicas(replicas: number) {
    this.propScope.z('spec').z('replicas').set(replicas)
    return this
  }
}
