export interface IngressNginxHelmParam {
    commonLabels:         CommonLabels;
    controller:           Controller;
    revisionHistoryLimit: number;
    defaultBackend:       DefaultBackend;
    rbac:                 Rbac;
    podSecurityPolicy:    PodSecurityPolicy;
    serviceAccount:       ServiceAccount;
    imagePullSecrets:     any[];
    tcp:                  CommonLabels;
    udp:                  CommonLabels;
    portNamePrefix:       string;
    dhParam:              null;
}

export interface CommonLabels {
}

export interface Controller {
    name:                          string;
    image:                         ControllerImage;
    existingPsp:                   string;
    containerName:                 string;
    containerPort:                 ContainerPort;
    config:                        CommonLabels;
    configAnnotations:             CommonLabels;
    proxySetHeaders:               CommonLabels;
    addHeaders:                    CommonLabels;
    dnsConfig:                     CommonLabels;
    hostname:                      CommonLabels;
    dnsPolicy:                     string;
    reportNodeInternalIp:          boolean;
    watchIngressWithoutClass:      boolean;
    ingressClassByName:            boolean;
    allowSnippetAnnotations:       boolean;
    hostNetwork:                   boolean;
    hostPort:                      HostPort;
    electionID:                    string;
    ingressClassResource:          IngressClassResource;
    ingressClass:                  string;
    podLabels:                     CommonLabels;
    podSecurityContext:            CommonLabels;
    sysctls:                       CommonLabels;
    publishService:                PublishService;
    scope:                         Scope;
    configMapNamespace:            string;
    tcp:                           Tcp;
    udp:                           Tcp;
    maxmindLicenseKey:             string;
    extraArgs:                     CommonLabels;
    extraEnvs:                     any[];
    kind:                          string;
    annotations:                   CommonLabels;
    labels:                        CommonLabels;
    updateStrategy:                CommonLabels;
    minReadySeconds:               number;
    tolerations:                   any[];
    affinity:                      CommonLabels;
    topologySpreadConstraints:     any[];
    terminationGracePeriodSeconds: number;
    nodeSelector:                  NodeSelector;
    livenessProbe:                 NessProbe;
    readinessProbe:                NessProbe;
    healthCheckPath:               string;
    healthCheckHost:               string;
    podAnnotations:                CommonLabels;
    replicaCount:                  number;
    minAvailable:                  number;
    resources:                     Resources;
    autoscaling:                   Autoscaling;
    autoscalingTemplate:           any[];
    keda:                          Keda;
    enableMimalloc:                boolean;
    customTemplate:                CustomTemplate;
    service:                       ControllerService;
    shareProcessNamespace:         boolean;
    extraContainers:               any[];
    extraVolumeMounts:             any[];
    extraVolumes:                  any[];
    extraInitContainers:           any[];
    extraModules:                  any[];
    admissionWebhooks:             AdmissionWebhooks;
    metrics:                       Metrics;
    lifecycle:                     Lifecycle;
    priorityClassName:             string;
}

export interface AdmissionWebhooks {
    annotations:          CommonLabels;
    enabled:              boolean;
    extraEnvs:            any[];
    failurePolicy:        string;
    port:                 number;
    certificate:          string;
    key:                  string;
    namespaceSelector:    CommonLabels;
    objectSelector:       CommonLabels;
    labels:               CommonLabels;
    existingPsp:          string;
    networkPolicyEnabled: boolean;
    service:              AdmissionWebhooksService;
    createSecretJob:      Job;
    patchWebhookJob:      Job;
    patch:                Patch;
}

export interface Job {
    securityContext: CreateSecretJobSecurityContext;
    resources:       CommonLabels;
}

export interface CreateSecretJobSecurityContext {
    allowPrivilegeEscalation: boolean;
}

export interface Patch {
    enabled:           boolean;
    image:             PatchImage;
    priorityClassName: string;
    podAnnotations:    CommonLabels;
    nodeSelector:      NodeSelector;
    tolerations:       any[];
    labels:            CommonLabels;
    securityContext:   PatchSecurityContext;
}

export interface PatchImage {
    registry:   string;
    image:      string;
    tag:        string;
    digest:     string;
    pullPolicy: string;
}

export interface NodeSelector {
    'kubernetes.io/os': string;
}

export interface PatchSecurityContext {
    runAsNonRoot: boolean;
    runAsUser:    number;
    fsGroup:      number;
}

export interface AdmissionWebhooksService {
    annotations:              CommonLabels;
    externalIPs:              any[];
    loadBalancerSourceRanges: any[];
    servicePort:              number;
    type:                     string;
}

export interface Autoscaling {
    enabled:                           boolean;
    minReplicas:                       number;
    maxReplicas:                       number;
    targetCPUUtilizationPercentage:    number;
    targetMemoryUtilizationPercentage: number;
    behavior?:                         CommonLabels;
    annotations?:                      CommonLabels;
}

export interface ContainerPort {
    http:  number;
    https: number;
}

export interface CustomTemplate {
    configMapName: string;
    configMapKey:  string;
}

export interface HostPort {
    enabled: boolean;
    ports:   ContainerPort;
}

export interface ControllerImage {
    chroot:                   boolean;
    registry:                 string;
    image:                    string;
    tag:                      string;
    digest:                   string;
    digestChroot:             string;
    pullPolicy:               string;
    runAsUser:                number;
    allowPrivilegeEscalation: boolean;
}

export interface IngressClassResource {
    name:            string;
    enabled:         boolean;
    default:         boolean;
    controllerValue: string;
    parameters:      CommonLabels;
}

export interface Keda {
    apiVersion:                    string;
    enabled:                       boolean;
    minReplicas:                   number;
    maxReplicas:                   number;
    pollingInterval:               number;
    cooldownPeriod:                number;
    restoreToOriginalReplicaCount: boolean;
    scaledObject:                  ScaledObject;
    triggers:                      any[];
    behavior:                      CommonLabels;
}

export interface ScaledObject {
    annotations: CommonLabels;
}

export interface Lifecycle {
    preStop: PreStop;
}

export interface PreStop {
    exec: Exec;
}

export interface Exec {
    command: string[];
}

export interface NessProbe {
    httpGet?:            HttpGet;
    initialDelaySeconds: number;
    periodSeconds:       number;
    timeoutSeconds:      number;
    successThreshold:    number;
    failureThreshold:    number;
}

export interface HttpGet {
    path:   string;
    port:   number;
    scheme: string;
}

export interface Metrics {
    port:           number;
    portName:       string;
    enabled:        boolean;
    service:        AdmissionWebhooksService;
    serviceMonitor: ServiceMonitor;
    prometheusRule: PrometheusRule;
}

export interface PrometheusRule {
    enabled:          boolean;
    additionalLabels: CommonLabels;
    rules:            any[];
}

export interface ServiceMonitor {
    enabled:           boolean;
    additionalLabels:  CommonLabels;
    namespace:         string;
    namespaceSelector: CommonLabels;
    scrapeInterval:    string;
    targetLabels:      any[];
    relabelings:       any[];
    metricRelabelings: any[];
}

export interface PublishService {
    enabled:      boolean;
    pathOverride: string;
}

export interface Resources {
    requests: Requests;
}

export interface Requests {
    cpu:    string;
    memory: string;
}

export interface Scope {
    enabled:           boolean;
    namespace:         string;
    namespaceSelector: string;
}

export interface ControllerService {
    enabled:                  boolean;
    appProtocol:              boolean;
    annotations:              CommonLabels;
    labels:                   CommonLabels;
    externalIPs:              any[];
    loadBalancerIP:           string;
    loadBalancerSourceRanges: any[];
    enableHttp:               boolean;
    enableHttps:              boolean;
    ipFamilyPolicy:           string;
    ipFamilies:               string[];
    ports:                    ContainerPort;
    targetPorts:              TargetPorts;
    type:                     string;
    nodePorts:                NodePorts;
    external:                 PodSecurityPolicy;
    internal:                 Internal;
}

export interface PodSecurityPolicy {
    enabled: boolean;
}

export interface Internal {
    enabled:                  boolean;
    annotations:              CommonLabels;
    loadBalancerSourceRanges: any[];
}

export interface NodePorts {
    http:  string;
    https: string;
    tcp:   CommonLabels;
    udp:   CommonLabels;
}

export interface TargetPorts {
    http:  string;
    https: string;
}

export interface Tcp {
    configMapNamespace: string;
    annotations:        CommonLabels;
}

export interface DefaultBackend {
    enabled:                  boolean;
    name:                     string;
    image:                    DefaultBackendImage;
    existingPsp:              string;
    extraArgs:                CommonLabels;
    serviceAccount:           ServiceAccount;
    extraEnvs:                any[];
    port:                     number;
    livenessProbe:            NessProbe;
    readinessProbe:           NessProbe;
    tolerations:              any[];
    affinity:                 CommonLabels;
    podSecurityContext:       CommonLabels;
    containerSecurityContext: CommonLabels;
    podLabels:                CommonLabels;
    nodeSelector:             NodeSelector;
    podAnnotations:           CommonLabels;
    replicaCount:             number;
    minAvailable:             number;
    resources:                CommonLabels;
    extraVolumeMounts:        any[];
    extraVolumes:             any[];
    autoscaling:              Autoscaling;
    service:                  AdmissionWebhooksService;
    priorityClassName:        string;
    labels:                   CommonLabels;
}

export interface DefaultBackendImage {
    registry:                 string;
    image:                    string;
    tag:                      string;
    pullPolicy:               string;
    runAsUser:                number;
    runAsNonRoot:             boolean;
    readOnlyRootFilesystem:   boolean;
    allowPrivilegeEscalation: boolean;
}

export interface ServiceAccount {
    create:                       boolean;
    name:                         string;
    automountServiceAccountToken: boolean;
    annotations?:                 CommonLabels;
}

export interface Rbac {
    create: boolean;
    scope:  boolean;
}
