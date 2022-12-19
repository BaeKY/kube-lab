import {
  AwsElasticBlockStoreVolumeSource,
  AzureDiskVolumeSource,
  AzureFileVolumeSource,
  CephFsVolumeSource,
  CinderVolumeSource,
  ConfigMapVolumeSource,
  CsiVolumeSource,
  DownwardApiVolumeSource,
  EmptyDirVolumeSource,
  EphemeralVolumeSource,
  FcVolumeSource,
  FlexVolumeSource,
  FlockerVolumeSource,
  GcePersistentDiskVolumeSource,
  GitRepoVolumeSource,
  GlusterfsVolumeSource,
  HostPathVolumeSource,
  IscsiVolumeSource,
  NfsVolumeSource,
  PersistentVolumeClaimVolumeSource,
  PhotonPersistentDiskVolumeSource,
  PortworxVolumeSource,
  ProjectedVolumeSource,
  QuobyteVolumeSource,
  RbdVolumeSource,
  ScaleIoVolumeSource,
  SecretVolumeSource,
  StorageOsVolumeSource,
  VolumeMount,
  Volume as VolumeOrigin,
  VsphereVirtualDiskVolumeSource
} from '@package/k8s-generated'

export interface IVolume<N extends string = string> extends VolumeOrigin {
  name: N
  createMount(options: Omit<VolumeMount, 'name'>): VolumeMount
}

export interface IVolumeFactory {
  createVolume<N extends string = string>(name: N): IVolume<N>
}

export interface IVolumeMountable {
  addVolumeMounts<N extends string>(volume: Volume<N>, volumeMounts: Omit<VolumeMount, 'name'>[]): this
  removeVolumeMounts<N extends string>(volumeName: N, path: string | string[]): this
  clearVolumeMounts(): void
}

export type VolumeOptions<K extends keyof Omit<VolumeOrigin, 'name'>> = {
  [key in K]: NonNullable<Omit<VolumeOrigin, 'name'>>[K]
}

export class Volume<N extends string = string, S extends keyof Omit<VolumeOrigin, 'name'> = any> implements IVolume<N> {
  public static create<S extends keyof Omit<VolumeOrigin, 'name'>, N extends string = string>(
    name: N,
    options: VolumeOptions<S>
  ): Volume<N, S> {
    return new Volume<N, S>(name, options)
  }

  public readonly awsElasticBlockStore?: AwsElasticBlockStoreVolumeSource
  public readonly azureDisk?: AzureDiskVolumeSource
  public readonly azureFile?: AzureFileVolumeSource
  public readonly cephfs?: CephFsVolumeSource
  public readonly cinder?: CinderVolumeSource
  public readonly configMap?: ConfigMapVolumeSource
  public readonly csi?: CsiVolumeSource
  public readonly downwardApi?: DownwardApiVolumeSource
  public readonly emptyDir?: EmptyDirVolumeSource
  public readonly ephemeral?: EphemeralVolumeSource
  public readonly fc?: FcVolumeSource
  public readonly flexVolume?: FlexVolumeSource
  public readonly flocker?: FlockerVolumeSource
  public readonly gcePersistentDisk?: GcePersistentDiskVolumeSource
  public readonly gitRepo?: GitRepoVolumeSource
  public readonly glusterfs?: GlusterfsVolumeSource
  public readonly hostPath?: HostPathVolumeSource
  public readonly iscsi?: IscsiVolumeSource
  public readonly nfs?: NfsVolumeSource
  public readonly persistentVolumeClaim?: PersistentVolumeClaimVolumeSource
  public readonly photonPersistentDisk?: PhotonPersistentDiskVolumeSource
  public readonly portworxVolume?: PortworxVolumeSource
  public readonly projected?: ProjectedVolumeSource
  public readonly quobyte?: QuobyteVolumeSource
  public readonly rbd?: RbdVolumeSource
  public readonly scaleIo?: ScaleIoVolumeSource
  public readonly secret?: SecretVolumeSource
  public readonly storageos?: StorageOsVolumeSource
  public readonly vsphereVolume?: VsphereVirtualDiskVolumeSource

  private constructor(public readonly name: N, options: VolumeOptions<S>) {
    Object.assign(this, options)
  }

  public createMount(options: Omit<VolumeMount, 'name'>): VolumeMount {
    return {
      name: this.name,
      ...options
    }
  }
}
