// To parse this data:
//
//   import { Convert, IngressNginx } from "./file";
//
//   const ingressNginx = Convert.toIngressNginx(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface IngressNginx {
  commonLabels: CommonLabels
  controller: Controller
  revisionHistoryLimit: number
  defaultBackend: DefaultBackend
  rbac: Rbac
  podSecurityPolicy: PodSecurityPolicy
  serviceAccount: ServiceAccount
  imagePullSecrets: any[]
  tcp: CommonLabels
  udp: CommonLabels
  portNamePrefix: string
  dhParam: null
}

export interface CommonLabels {}

export interface Controller {
  name: string
  image: ControllerImage
  existingPsp: string
  containerName: string
  containerPort: ContainerPort
  config: CommonLabels
  configAnnotations: CommonLabels
  proxySetHeaders: CommonLabels
  addHeaders: CommonLabels
  dnsConfig: CommonLabels
  hostname: CommonLabels
  dnsPolicy: string
  reportNodeInternalIp: boolean
  watchIngressWithoutClass: boolean
  ingressClassByName: boolean
  allowSnippetAnnotations: boolean
  hostNetwork: boolean
  hostPort: HostPort
  electionID: string
  ingressClassResource: IngressClassResource
  ingressClass: string
  podLabels: CommonLabels
  podSecurityContext: CommonLabels
  sysctls: CommonLabels
  publishService: PublishService
  scope: Scope
  configMapNamespace: string
  tcp: TCP
  udp: TCP
  maxmindLicenseKey: string
  extraArgs: CommonLabels
  extraEnvs: any[]
  kind: string
  annotations: CommonLabels
  labels: CommonLabels
  updateStrategy: CommonLabels
  minReadySeconds: number
  tolerations: any[]
  affinity: CommonLabels
  topologySpreadConstraints: any[]
  terminationGracePeriodSeconds: number
  nodeSelector: NodeSelector
  livenessProbe: NessProbe
  readinessProbe: NessProbe
  healthCheckPath: string
  healthCheckHost: string
  podAnnotations: CommonLabels
  replicaCount: number
  minAvailable: number
  resources: Resources
  autoscaling: Autoscaling
  autoscalingTemplate: any[]
  keda: Keda
  enableMimalloc: boolean
  customTemplate: CustomTemplate
  service: ControllerService
  shareProcessNamespace: boolean
  extraContainers: any[]
  extraVolumeMounts: any[]
  extraVolumes: any[]
  extraInitContainers: any[]
  extraModules: any[]
  admissionWebhooks: AdmissionWebhooks
  metrics: Metrics
  lifecycle: Lifecycle
  priorityClassName: string
}

export interface AdmissionWebhooks {
  annotations: CommonLabels
  enabled: boolean
  extraEnvs: any[]
  failurePolicy: string
  port: number
  certificate: string
  key: string
  namespaceSelector: CommonLabels
  objectSelector: CommonLabels
  labels: CommonLabels
  existingPsp: string
  networkPolicyEnabled: boolean
  service: AdmissionWebhooksService
  createSecretJob: Job
  patchWebhookJob: Job
  patch: Patch
}

export interface Job {
  securityContext: CreateSecretJobSecurityContext
  resources: CommonLabels
}

export interface CreateSecretJobSecurityContext {
  allowPrivilegeEscalation: boolean
}

export interface Patch {
  enabled: boolean
  image: PatchImage
  priorityClassName: string
  podAnnotations: CommonLabels
  nodeSelector: NodeSelector
  tolerations: any[]
  labels: CommonLabels
  securityContext: PatchSecurityContext
}

export interface PatchImage {
  registry: string
  image: string
  tag: string
  digest: string
  pullPolicy: string
}

export interface NodeSelector {
  'kubernetes.io/os': string
}

export interface PatchSecurityContext {
  runAsNonRoot: boolean
  runAsUser: number
  fsGroup: number
}

export interface AdmissionWebhooksService {
  annotations: CommonLabels
  externalIPs: any[]
  loadBalancerSourceRanges: any[]
  servicePort: number
  type: string
}

export interface Autoscaling {
  enabled: boolean
  minReplicas: number
  maxReplicas: number
  targetCPUUtilizationPercentage: number
  targetMemoryUtilizationPercentage: number
  behavior?: CommonLabels
  annotations?: CommonLabels
}

export interface ContainerPort {
  http: number
  https: number
}

export interface CustomTemplate {
  configMapName: string
  configMapKey: string
}

export interface HostPort {
  enabled: boolean
  ports: ContainerPort
}

export interface ControllerImage {
  chroot: boolean
  registry: string
  image: string
  tag: string
  digest: string
  digestChroot: string
  pullPolicy: string
  runAsUser: number
  allowPrivilegeEscalation: boolean
}

export interface IngressClassResource {
  name: string
  enabled: boolean
  default: boolean
  controllerValue: string
  parameters: CommonLabels
}

export interface Keda {
  apiVersion: string
  enabled: boolean
  minReplicas: number
  maxReplicas: number
  pollingInterval: number
  cooldownPeriod: number
  restoreToOriginalReplicaCount: boolean
  scaledObject: ScaledObject
  triggers: any[]
  behavior: CommonLabels
}

export interface ScaledObject {
  annotations: CommonLabels
}

export interface Lifecycle {
  preStop: PreStop
}

export interface PreStop {
  exec: Exec
}

export interface Exec {
  command: string[]
}

export interface NessProbe {
  httpGet?: HTTPGet
  initialDelaySeconds: number
  periodSeconds: number
  timeoutSeconds: number
  successThreshold: number
  failureThreshold: number
}

export interface HTTPGet {
  path: string
  port: number
  scheme: string
}

export interface Metrics {
  port: number
  portName: string
  enabled: boolean
  service: AdmissionWebhooksService
  serviceMonitor: ServiceMonitor
  prometheusRule: PrometheusRule
}

export interface PrometheusRule {
  enabled: boolean
  additionalLabels: CommonLabels
  rules: any[]
}

export interface ServiceMonitor {
  enabled: boolean
  additionalLabels: CommonLabels
  namespace: string
  namespaceSelector: CommonLabels
  scrapeInterval: string
  targetLabels: any[]
  relabelings: any[]
  metricRelabelings: any[]
}

export interface PublishService {
  enabled: boolean
  pathOverride: string
}

export interface Resources {
  requests: Requests
}

export interface Requests {
  cpu: string
  memory: string
}

export interface Scope {
  enabled: boolean
  namespace: string
  namespaceSelector: string
}

export interface ControllerService {
  enabled: boolean
  appProtocol: boolean
  annotations: CommonLabels
  labels: CommonLabels
  externalIPs: any[]
  loadBalancerIP: string
  loadBalancerSourceRanges: any[]
  enableHttp: boolean
  enableHttps: boolean
  ipFamilyPolicy: string
  ipFamilies: string[]
  ports: ContainerPort
  targetPorts: TargetPorts
  type: string
  nodePorts: NodePorts
  external: PodSecurityPolicy
  internal: Internal
}

export interface PodSecurityPolicy {
  enabled: boolean
}

export interface Internal {
  enabled: boolean
  annotations: CommonLabels
  loadBalancerSourceRanges: any[]
}

export interface NodePorts {
  http: string
  https: string
  tcp: CommonLabels
  udp: CommonLabels
}

export interface TargetPorts {
  http: string
  https: string
}

export interface TCP {
  configMapNamespace: string
  annotations: CommonLabels
}

export interface DefaultBackend {
  enabled: boolean
  name: string
  image: DefaultBackendImage
  existingPsp: string
  extraArgs: CommonLabels
  serviceAccount: ServiceAccount
  extraEnvs: any[]
  port: number
  livenessProbe: NessProbe
  readinessProbe: NessProbe
  tolerations: any[]
  affinity: CommonLabels
  podSecurityContext: CommonLabels
  containerSecurityContext: CommonLabels
  podLabels: CommonLabels
  nodeSelector: NodeSelector
  podAnnotations: CommonLabels
  replicaCount: number
  minAvailable: number
  resources: CommonLabels
  extraVolumeMounts: any[]
  extraVolumes: any[]
  autoscaling: Autoscaling
  service: AdmissionWebhooksService
  priorityClassName: string
  labels: CommonLabels
}

export interface DefaultBackendImage {
  registry: string
  image: string
  tag: string
  pullPolicy: string
  runAsUser: number
  runAsNonRoot: boolean
  readOnlyRootFilesystem: boolean
  allowPrivilegeEscalation: boolean
}

export interface ServiceAccount {
  create: boolean
  name: string
  automountServiceAccountToken: boolean
  annotations?: CommonLabels
}

export interface Rbac {
  create: boolean
  scope: boolean
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toIngressNginx(json: string): IngressNginx {
    return cast(JSON.parse(json), r('IngressNginx'))
  }

  public static ingressNginxToJson(value: IngressNginx): string {
    return JSON.stringify(uncast(value, r('IngressNginx')), null, 2)
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`)
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`)
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {}
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }))
    typ.jsonToJS = map
  }
  return typ.jsonToJS
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {}
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }))
    typ.jsToJSON = map
  }
  return typ.jsToJSON
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val
    return invalidValue(typ, val, key)
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length
    for (let i = 0; i < l; i++) {
      const typ = typs[i]
      try {
        return transform(val, typ, getProps)
      } catch (_) {}
    }
    return invalidValue(typs, val)
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val
    return invalidValue(cases, val)
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val)
    return val.map((el) => transform(el, typ, getProps))
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null
    }
    const d = new Date(val)
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val)
    }
    return d
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val)
    }
    const result: any = {}
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key]
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined
      result[prop.key] = transform(v, prop.typ, getProps, prop.key)
    })
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key)
      }
    })
    return result
  }

  if (typ === 'any') return val
  if (typ === null) {
    if (val === null) return val
    return invalidValue(typ, val)
  }
  if (typ === false) return invalidValue(typ, val)
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref]
  }
  if (Array.isArray(typ)) return transformEnum(typ, val)
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val)
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val)
  return transformPrimitive(typ, val)
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps)
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps)
}

function a(typ: any) {
  return { arrayItems: typ }
}

function u(...typs: any[]) {
  return { unionMembers: typs }
}

function o(props: any[], additional: any) {
  return { props, additional }
}

function m(additional: any) {
  return { props: [], additional }
}

function r(name: string) {
  return { ref: name }
}

const typeMap: any = {
  IngressNginx: o(
    [
      { json: 'commonLabels', js: 'commonLabels', typ: r('CommonLabels') },
      { json: 'controller', js: 'controller', typ: r('Controller') },
      { json: 'revisionHistoryLimit', js: 'revisionHistoryLimit', typ: 0 },
      { json: 'defaultBackend', js: 'defaultBackend', typ: r('DefaultBackend') },
      { json: 'rbac', js: 'rbac', typ: r('Rbac') },
      { json: 'podSecurityPolicy', js: 'podSecurityPolicy', typ: r('PodSecurityPolicy') },
      { json: 'serviceAccount', js: 'serviceAccount', typ: r('ServiceAccount') },
      { json: 'imagePullSecrets', js: 'imagePullSecrets', typ: a('any') },
      { json: 'tcp', js: 'tcp', typ: r('CommonLabels') },
      { json: 'udp', js: 'udp', typ: r('CommonLabels') },
      { json: 'portNamePrefix', js: 'portNamePrefix', typ: '' },
      { json: 'dhParam', js: 'dhParam', typ: null }
    ],
    false
  ),
  CommonLabels: o([], false),
  Controller: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'image', js: 'image', typ: r('ControllerImage') },
      { json: 'existingPsp', js: 'existingPsp', typ: '' },
      { json: 'containerName', js: 'containerName', typ: '' },
      { json: 'containerPort', js: 'containerPort', typ: r('ContainerPort') },
      { json: 'config', js: 'config', typ: r('CommonLabels') },
      { json: 'configAnnotations', js: 'configAnnotations', typ: r('CommonLabels') },
      { json: 'proxySetHeaders', js: 'proxySetHeaders', typ: r('CommonLabels') },
      { json: 'addHeaders', js: 'addHeaders', typ: r('CommonLabels') },
      { json: 'dnsConfig', js: 'dnsConfig', typ: r('CommonLabels') },
      { json: 'hostname', js: 'hostname', typ: r('CommonLabels') },
      { json: 'dnsPolicy', js: 'dnsPolicy', typ: '' },
      { json: 'reportNodeInternalIp', js: 'reportNodeInternalIp', typ: true },
      { json: 'watchIngressWithoutClass', js: 'watchIngressWithoutClass', typ: true },
      { json: 'ingressClassByName', js: 'ingressClassByName', typ: true },
      { json: 'allowSnippetAnnotations', js: 'allowSnippetAnnotations', typ: true },
      { json: 'hostNetwork', js: 'hostNetwork', typ: true },
      { json: 'hostPort', js: 'hostPort', typ: r('HostPort') },
      { json: 'electionID', js: 'electionID', typ: '' },
      { json: 'ingressClassResource', js: 'ingressClassResource', typ: r('IngressClassResource') },
      { json: 'ingressClass', js: 'ingressClass', typ: '' },
      { json: 'podLabels', js: 'podLabels', typ: r('CommonLabels') },
      { json: 'podSecurityContext', js: 'podSecurityContext', typ: r('CommonLabels') },
      { json: 'sysctls', js: 'sysctls', typ: r('CommonLabels') },
      { json: 'publishService', js: 'publishService', typ: r('PublishService') },
      { json: 'scope', js: 'scope', typ: r('Scope') },
      { json: 'configMapNamespace', js: 'configMapNamespace', typ: '' },
      { json: 'tcp', js: 'tcp', typ: r('TCP') },
      { json: 'udp', js: 'udp', typ: r('TCP') },
      { json: 'maxmindLicenseKey', js: 'maxmindLicenseKey', typ: '' },
      { json: 'extraArgs', js: 'extraArgs', typ: r('CommonLabels') },
      { json: 'extraEnvs', js: 'extraEnvs', typ: a('any') },
      { json: 'kind', js: 'kind', typ: '' },
      { json: 'annotations', js: 'annotations', typ: r('CommonLabels') },
      { json: 'labels', js: 'labels', typ: r('CommonLabels') },
      { json: 'updateStrategy', js: 'updateStrategy', typ: r('CommonLabels') },
      { json: 'minReadySeconds', js: 'minReadySeconds', typ: 0 },
      { json: 'tolerations', js: 'tolerations', typ: a('any') },
      { json: 'affinity', js: 'affinity', typ: r('CommonLabels') },
      { json: 'topologySpreadConstraints', js: 'topologySpreadConstraints', typ: a('any') },
      { json: 'terminationGracePeriodSeconds', js: 'terminationGracePeriodSeconds', typ: 0 },
      { json: 'nodeSelector', js: 'nodeSelector', typ: r('NodeSelector') },
      { json: 'livenessProbe', js: 'livenessProbe', typ: r('NessProbe') },
      { json: 'readinessProbe', js: 'readinessProbe', typ: r('NessProbe') },
      { json: 'healthCheckPath', js: 'healthCheckPath', typ: '' },
      { json: 'healthCheckHost', js: 'healthCheckHost', typ: '' },
      { json: 'podAnnotations', js: 'podAnnotations', typ: r('CommonLabels') },
      { json: 'replicaCount', js: 'replicaCount', typ: 0 },
      { json: 'minAvailable', js: 'minAvailable', typ: 0 },
      { json: 'resources', js: 'resources', typ: r('Resources') },
      { json: 'autoscaling', js: 'autoscaling', typ: r('Autoscaling') },
      { json: 'autoscalingTemplate', js: 'autoscalingTemplate', typ: a('any') },
      { json: 'keda', js: 'keda', typ: r('Keda') },
      { json: 'enableMimalloc', js: 'enableMimalloc', typ: true },
      { json: 'customTemplate', js: 'customTemplate', typ: r('CustomTemplate') },
      { json: 'service', js: 'service', typ: r('ControllerService') },
      { json: 'shareProcessNamespace', js: 'shareProcessNamespace', typ: true },
      { json: 'extraContainers', js: 'extraContainers', typ: a('any') },
      { json: 'extraVolumeMounts', js: 'extraVolumeMounts', typ: a('any') },
      { json: 'extraVolumes', js: 'extraVolumes', typ: a('any') },
      { json: 'extraInitContainers', js: 'extraInitContainers', typ: a('any') },
      { json: 'extraModules', js: 'extraModules', typ: a('any') },
      { json: 'admissionWebhooks', js: 'admissionWebhooks', typ: r('AdmissionWebhooks') },
      { json: 'metrics', js: 'metrics', typ: r('Metrics') },
      { json: 'lifecycle', js: 'lifecycle', typ: r('Lifecycle') },
      { json: 'priorityClassName', js: 'priorityClassName', typ: '' }
    ],
    false
  ),
  AdmissionWebhooks: o(
    [
      { json: 'annotations', js: 'annotations', typ: r('CommonLabels') },
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'extraEnvs', js: 'extraEnvs', typ: a('any') },
      { json: 'failurePolicy', js: 'failurePolicy', typ: '' },
      { json: 'port', js: 'port', typ: 0 },
      { json: 'certificate', js: 'certificate', typ: '' },
      { json: 'key', js: 'key', typ: '' },
      { json: 'namespaceSelector', js: 'namespaceSelector', typ: r('CommonLabels') },
      { json: 'objectSelector', js: 'objectSelector', typ: r('CommonLabels') },
      { json: 'labels', js: 'labels', typ: r('CommonLabels') },
      { json: 'existingPsp', js: 'existingPsp', typ: '' },
      { json: 'networkPolicyEnabled', js: 'networkPolicyEnabled', typ: true },
      { json: 'service', js: 'service', typ: r('AdmissionWebhooksService') },
      { json: 'createSecretJob', js: 'createSecretJob', typ: r('Job') },
      { json: 'patchWebhookJob', js: 'patchWebhookJob', typ: r('Job') },
      { json: 'patch', js: 'patch', typ: r('Patch') }
    ],
    false
  ),
  Job: o(
    [
      { json: 'securityContext', js: 'securityContext', typ: r('CreateSecretJobSecurityContext') },
      { json: 'resources', js: 'resources', typ: r('CommonLabels') }
    ],
    false
  ),
  CreateSecretJobSecurityContext: o(
    [{ json: 'allowPrivilegeEscalation', js: 'allowPrivilegeEscalation', typ: true }],
    false
  ),
  Patch: o(
    [
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'image', js: 'image', typ: r('PatchImage') },
      { json: 'priorityClassName', js: 'priorityClassName', typ: '' },
      { json: 'podAnnotations', js: 'podAnnotations', typ: r('CommonLabels') },
      { json: 'nodeSelector', js: 'nodeSelector', typ: r('NodeSelector') },
      { json: 'tolerations', js: 'tolerations', typ: a('any') },
      { json: 'labels', js: 'labels', typ: r('CommonLabels') },
      { json: 'securityContext', js: 'securityContext', typ: r('PatchSecurityContext') }
    ],
    false
  ),
  PatchImage: o(
    [
      { json: 'registry', js: 'registry', typ: '' },
      { json: 'image', js: 'image', typ: '' },
      { json: 'tag', js: 'tag', typ: '' },
      { json: 'digest', js: 'digest', typ: '' },
      { json: 'pullPolicy', js: 'pullPolicy', typ: '' }
    ],
    false
  ),
  NodeSelector: o([{ json: 'kubernetes.io/os', js: 'kubernetes.io/os', typ: '' }], false),
  PatchSecurityContext: o(
    [
      { json: 'runAsNonRoot', js: 'runAsNonRoot', typ: true },
      { json: 'runAsUser', js: 'runAsUser', typ: 0 },
      { json: 'fsGroup', js: 'fsGroup', typ: 0 }
    ],
    false
  ),
  AdmissionWebhooksService: o(
    [
      { json: 'annotations', js: 'annotations', typ: r('CommonLabels') },
      { json: 'externalIPs', js: 'externalIPs', typ: a('any') },
      { json: 'loadBalancerSourceRanges', js: 'loadBalancerSourceRanges', typ: a('any') },
      { json: 'servicePort', js: 'servicePort', typ: 0 },
      { json: 'type', js: 'type', typ: '' }
    ],
    false
  ),
  Autoscaling: o(
    [
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'minReplicas', js: 'minReplicas', typ: 0 },
      { json: 'maxReplicas', js: 'maxReplicas', typ: 0 },
      { json: 'targetCPUUtilizationPercentage', js: 'targetCPUUtilizationPercentage', typ: 0 },
      { json: 'targetMemoryUtilizationPercentage', js: 'targetMemoryUtilizationPercentage', typ: 0 },
      { json: 'behavior', js: 'behavior', typ: u(undefined, r('CommonLabels')) },
      { json: 'annotations', js: 'annotations', typ: u(undefined, r('CommonLabels')) }
    ],
    false
  ),
  ContainerPort: o(
    [
      { json: 'http', js: 'http', typ: 0 },
      { json: 'https', js: 'https', typ: 0 }
    ],
    false
  ),
  CustomTemplate: o(
    [
      { json: 'configMapName', js: 'configMapName', typ: '' },
      { json: 'configMapKey', js: 'configMapKey', typ: '' }
    ],
    false
  ),
  HostPort: o(
    [
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'ports', js: 'ports', typ: r('ContainerPort') }
    ],
    false
  ),
  ControllerImage: o(
    [
      { json: 'chroot', js: 'chroot', typ: true },
      { json: 'registry', js: 'registry', typ: '' },
      { json: 'image', js: 'image', typ: '' },
      { json: 'tag', js: 'tag', typ: '' },
      { json: 'digest', js: 'digest', typ: '' },
      { json: 'digestChroot', js: 'digestChroot', typ: '' },
      { json: 'pullPolicy', js: 'pullPolicy', typ: '' },
      { json: 'runAsUser', js: 'runAsUser', typ: 0 },
      { json: 'allowPrivilegeEscalation', js: 'allowPrivilegeEscalation', typ: true }
    ],
    false
  ),
  IngressClassResource: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'default', js: 'default', typ: true },
      { json: 'controllerValue', js: 'controllerValue', typ: '' },
      { json: 'parameters', js: 'parameters', typ: r('CommonLabels') }
    ],
    false
  ),
  Keda: o(
    [
      { json: 'apiVersion', js: 'apiVersion', typ: '' },
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'minReplicas', js: 'minReplicas', typ: 0 },
      { json: 'maxReplicas', js: 'maxReplicas', typ: 0 },
      { json: 'pollingInterval', js: 'pollingInterval', typ: 0 },
      { json: 'cooldownPeriod', js: 'cooldownPeriod', typ: 0 },
      { json: 'restoreToOriginalReplicaCount', js: 'restoreToOriginalReplicaCount', typ: true },
      { json: 'scaledObject', js: 'scaledObject', typ: r('ScaledObject') },
      { json: 'triggers', js: 'triggers', typ: a('any') },
      { json: 'behavior', js: 'behavior', typ: r('CommonLabels') }
    ],
    false
  ),
  ScaledObject: o([{ json: 'annotations', js: 'annotations', typ: r('CommonLabels') }], false),
  Lifecycle: o([{ json: 'preStop', js: 'preStop', typ: r('PreStop') }], false),
  PreStop: o([{ json: 'exec', js: 'exec', typ: r('Exec') }], false),
  Exec: o([{ json: 'command', js: 'command', typ: a('') }], false),
  NessProbe: o(
    [
      { json: 'httpGet', js: 'httpGet', typ: u(undefined, r('HTTPGet')) },
      { json: 'initialDelaySeconds', js: 'initialDelaySeconds', typ: 0 },
      { json: 'periodSeconds', js: 'periodSeconds', typ: 0 },
      { json: 'timeoutSeconds', js: 'timeoutSeconds', typ: 0 },
      { json: 'successThreshold', js: 'successThreshold', typ: 0 },
      { json: 'failureThreshold', js: 'failureThreshold', typ: 0 }
    ],
    false
  ),
  HTTPGet: o(
    [
      { json: 'path', js: 'path', typ: '' },
      { json: 'port', js: 'port', typ: 0 },
      { json: 'scheme', js: 'scheme', typ: '' }
    ],
    false
  ),
  Metrics: o(
    [
      { json: 'port', js: 'port', typ: 0 },
      { json: 'portName', js: 'portName', typ: '' },
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'service', js: 'service', typ: r('AdmissionWebhooksService') },
      { json: 'serviceMonitor', js: 'serviceMonitor', typ: r('ServiceMonitor') },
      { json: 'prometheusRule', js: 'prometheusRule', typ: r('PrometheusRule') }
    ],
    false
  ),
  PrometheusRule: o(
    [
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'additionalLabels', js: 'additionalLabels', typ: r('CommonLabels') },
      { json: 'rules', js: 'rules', typ: a('any') }
    ],
    false
  ),
  ServiceMonitor: o(
    [
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'additionalLabels', js: 'additionalLabels', typ: r('CommonLabels') },
      { json: 'namespace', js: 'namespace', typ: '' },
      { json: 'namespaceSelector', js: 'namespaceSelector', typ: r('CommonLabels') },
      { json: 'scrapeInterval', js: 'scrapeInterval', typ: '' },
      { json: 'targetLabels', js: 'targetLabels', typ: a('any') },
      { json: 'relabelings', js: 'relabelings', typ: a('any') },
      { json: 'metricRelabelings', js: 'metricRelabelings', typ: a('any') }
    ],
    false
  ),
  PublishService: o(
    [
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'pathOverride', js: 'pathOverride', typ: '' }
    ],
    false
  ),
  Resources: o([{ json: 'requests', js: 'requests', typ: r('Requests') }], false),
  Requests: o(
    [
      { json: 'cpu', js: 'cpu', typ: '' },
      { json: 'memory', js: 'memory', typ: '' }
    ],
    false
  ),
  Scope: o(
    [
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'namespace', js: 'namespace', typ: '' },
      { json: 'namespaceSelector', js: 'namespaceSelector', typ: '' }
    ],
    false
  ),
  ControllerService: o(
    [
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'appProtocol', js: 'appProtocol', typ: true },
      { json: 'annotations', js: 'annotations', typ: r('CommonLabels') },
      { json: 'labels', js: 'labels', typ: r('CommonLabels') },
      { json: 'externalIPs', js: 'externalIPs', typ: a('any') },
      { json: 'loadBalancerIP', js: 'loadBalancerIP', typ: '' },
      { json: 'loadBalancerSourceRanges', js: 'loadBalancerSourceRanges', typ: a('any') },
      { json: 'enableHttp', js: 'enableHttp', typ: true },
      { json: 'enableHttps', js: 'enableHttps', typ: true },
      { json: 'ipFamilyPolicy', js: 'ipFamilyPolicy', typ: '' },
      { json: 'ipFamilies', js: 'ipFamilies', typ: a('') },
      { json: 'ports', js: 'ports', typ: r('ContainerPort') },
      { json: 'targetPorts', js: 'targetPorts', typ: r('TargetPorts') },
      { json: 'type', js: 'type', typ: '' },
      { json: 'nodePorts', js: 'nodePorts', typ: r('NodePorts') },
      { json: 'external', js: 'external', typ: r('PodSecurityPolicy') },
      { json: 'internal', js: 'internal', typ: r('Internal') }
    ],
    false
  ),
  PodSecurityPolicy: o([{ json: 'enabled', js: 'enabled', typ: true }], false),
  Internal: o(
    [
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'annotations', js: 'annotations', typ: r('CommonLabels') },
      { json: 'loadBalancerSourceRanges', js: 'loadBalancerSourceRanges', typ: a('any') }
    ],
    false
  ),
  NodePorts: o(
    [
      { json: 'http', js: 'http', typ: '' },
      { json: 'https', js: 'https', typ: '' },
      { json: 'tcp', js: 'tcp', typ: r('CommonLabels') },
      { json: 'udp', js: 'udp', typ: r('CommonLabels') }
    ],
    false
  ),
  TargetPorts: o(
    [
      { json: 'http', js: 'http', typ: '' },
      { json: 'https', js: 'https', typ: '' }
    ],
    false
  ),
  TCP: o(
    [
      { json: 'configMapNamespace', js: 'configMapNamespace', typ: '' },
      { json: 'annotations', js: 'annotations', typ: r('CommonLabels') }
    ],
    false
  ),
  DefaultBackend: o(
    [
      { json: 'enabled', js: 'enabled', typ: true },
      { json: 'name', js: 'name', typ: '' },
      { json: 'image', js: 'image', typ: r('DefaultBackendImage') },
      { json: 'existingPsp', js: 'existingPsp', typ: '' },
      { json: 'extraArgs', js: 'extraArgs', typ: r('CommonLabels') },
      { json: 'serviceAccount', js: 'serviceAccount', typ: r('ServiceAccount') },
      { json: 'extraEnvs', js: 'extraEnvs', typ: a('any') },
      { json: 'port', js: 'port', typ: 0 },
      { json: 'livenessProbe', js: 'livenessProbe', typ: r('NessProbe') },
      { json: 'readinessProbe', js: 'readinessProbe', typ: r('NessProbe') },
      { json: 'tolerations', js: 'tolerations', typ: a('any') },
      { json: 'affinity', js: 'affinity', typ: r('CommonLabels') },
      { json: 'podSecurityContext', js: 'podSecurityContext', typ: r('CommonLabels') },
      { json: 'containerSecurityContext', js: 'containerSecurityContext', typ: r('CommonLabels') },
      { json: 'podLabels', js: 'podLabels', typ: r('CommonLabels') },
      { json: 'nodeSelector', js: 'nodeSelector', typ: r('NodeSelector') },
      { json: 'podAnnotations', js: 'podAnnotations', typ: r('CommonLabels') },
      { json: 'replicaCount', js: 'replicaCount', typ: 0 },
      { json: 'minAvailable', js: 'minAvailable', typ: 0 },
      { json: 'resources', js: 'resources', typ: r('CommonLabels') },
      { json: 'extraVolumeMounts', js: 'extraVolumeMounts', typ: a('any') },
      { json: 'extraVolumes', js: 'extraVolumes', typ: a('any') },
      { json: 'autoscaling', js: 'autoscaling', typ: r('Autoscaling') },
      { json: 'service', js: 'service', typ: r('AdmissionWebhooksService') },
      { json: 'priorityClassName', js: 'priorityClassName', typ: '' },
      { json: 'labels', js: 'labels', typ: r('CommonLabels') }
    ],
    false
  ),
  DefaultBackendImage: o(
    [
      { json: 'registry', js: 'registry', typ: '' },
      { json: 'image', js: 'image', typ: '' },
      { json: 'tag', js: 'tag', typ: '' },
      { json: 'pullPolicy', js: 'pullPolicy', typ: '' },
      { json: 'runAsUser', js: 'runAsUser', typ: 0 },
      { json: 'runAsNonRoot', js: 'runAsNonRoot', typ: true },
      { json: 'readOnlyRootFilesystem', js: 'readOnlyRootFilesystem', typ: true },
      { json: 'allowPrivilegeEscalation', js: 'allowPrivilegeEscalation', typ: true }
    ],
    false
  ),
  ServiceAccount: o(
    [
      { json: 'create', js: 'create', typ: true },
      { json: 'name', js: 'name', typ: '' },
      { json: 'automountServiceAccountToken', js: 'automountServiceAccountToken', typ: true },
      { json: 'annotations', js: 'annotations', typ: u(undefined, r('CommonLabels')) }
    ],
    false
  ),
  Rbac: o(
    [
      { json: 'create', js: 'create', typ: true },
      { json: 'scope', js: 'scope', typ: true }
    ],
    false
  )
}
