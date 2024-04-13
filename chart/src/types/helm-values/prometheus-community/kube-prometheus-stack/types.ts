export interface KubePrometheusStackHelmParam {
    nameOverride:                       string;
    namespaceOverride:                  string;
    kubeTargetVersionOverride:          string;
    kubeVersionOverride:                string;
    fullnameOverride:                   string;
    commonLabels:                       AdditionalPrometheusRulesMap;
    defaultRules:                       DefaultRules;
    additionalPrometheusRulesMap:       AdditionalPrometheusRulesMap;
    global:                             KubePrometheusStackHelmParamGlobal;
    alertmanager:                       Alertmanager;
    grafana:                            Grafana;
    kubeApiServer:                      KubeApiServer;
    kubelet:                            Kubelet;
    kubeControllerManager:              Kube;
    coreDns:                            CoreDns;
    kubeDns:                            KubeDns;
    kubeEtcd:                           KubeEtcd;
    kubeScheduler:                      Kube;
    kubeProxy:                          Kube;
    kubeStateMetrics:                   KubeStateMetrics;
    'kube-state-metrics':               KubeStateMetricsClass;
    nodeExporter:                       KubeStateMetrics;
    'prometheus-node-exporter':         PrometheusNodeExporter;
    prometheusOperator:                 PrometheusOperator;
    prometheus:                         KubePrometheusStackHelmParamPrometheus;
    thanosRuler:                        ThanosRuler;
    cleanPrometheusOperatorObjectNames: boolean;
}

export interface AdditionalPrometheusRulesMap {
}

export interface Alertmanager {
    enabled:             boolean;
    annotations:         AdditionalPrometheusRulesMap;
    apiVersion:          string;
    serviceAccount:      AlertmanagerServiceAccount;
    podDisruptionBudget: PodDisruptionBudget;
    config:              Config;
    tplConfig:           boolean;
    templateFiles:       AdditionalPrometheusRulesMap;
    ingress:             Ingress;
    secret:              Secret;
    ingressPerReplica:   IngressPerReplica;
    service:             AlertmanagerService;
    servicePerReplica:   ServicePerReplica;
    serviceMonitor:      ServiceMonitor;
    alertmanagerSpec:    AlertmanagerSpec;
    extraSecret:         ExtraSecret;
}

export interface AlertmanagerSpec {
    podMetadata:                         AdditionalPrometheusRulesMap;
    image:                               Image;
    useExistingSecret:                   boolean;
    secrets:                             any[];
    configMaps:                          any[];
    web:                                 AdditionalPrometheusRulesMap;
    alertmanagerConfigSelector:          AdditionalPrometheusRulesMap;
    alertmanagerConfigNamespaceSelector: AdditionalPrometheusRulesMap;
    alertmanagerConfiguration:           AdditionalPrometheusRulesMap;
    logFormat:                           string;
    logLevel:                            string;
    replicas:                            number;
    retention:                           string;
    storage:                             AdditionalPrometheusRulesMap;
    externalUrl:                         null;
    routePrefix:                         string;
    paused:                              boolean;
    nodeSelector:                        AdditionalPrometheusRulesMap;
    resources:                           AdditionalPrometheusRulesMap;
    podAntiAffinity:                     string;
    podAntiAffinityTopologyKey:          string;
    affinity:                            AdditionalPrometheusRulesMap;
    tolerations:                         any[];
    topologySpreadConstraints:           any[];
    securityContext:                     SecurityContext;
    listenLocal:                         boolean;
    containers:                          any[];
    volumes:                             any[];
    volumeMounts:                        any[];
    initContainers:                      any[];
    priorityClassName:                   string;
    additionalPeers:                     any[];
    portName:                            string;
    clusterAdvertiseAddress:             boolean;
    forceEnableClusterMode:              boolean;
    minReadySeconds:                     number;
}

export interface Image {
    registry:    string;
    repository:  string;
    tag:         string;
    sha:         string;
    pullPolicy?: string;
}

export interface SecurityContext {
    runAsGroup:   number;
    runAsNonRoot: boolean;
    runAsUser:    number;
    fsGroup?:     number;
}

export interface Config {
    global:        ConfigGlobal;
    inhibit_rules: InhibitRule[];
    route:         ConfigRoute;
    receivers:     Receiver[];
    templates:     string[];
}

export interface ConfigGlobal {
    resolve_timeout: string;
}

export interface InhibitRule {
    source_matchers: string[];
    target_matchers: string[];
    equal:           string[];
}

export interface Receiver {
    name: string;
}

export interface ConfigRoute {
    group_by:        string[];
    group_wait:      string;
    group_interval:  string;
    repeat_interval: string;
    receiver:        string;
    routes:          RouteElement[];
}

export interface RouteElement {
    receiver: string;
    matchers: string[];
}

export interface ExtraSecret {
    annotations: AdditionalPrometheusRulesMap;
    data:        AdditionalPrometheusRulesMap;
}

export interface Ingress {
    enabled:      boolean;
    annotations:  AdditionalPrometheusRulesMap;
    labels:       AdditionalPrometheusRulesMap;
    hosts:        any[];
    paths?:       any[];
    tls:          any[];
    path?:        string;
    servicePort?: number;
    nodePort?:    number;
}

export interface IngressPerReplica {
    enabled:             boolean;
    annotations:         AdditionalPrometheusRulesMap;
    labels:              AdditionalPrometheusRulesMap;
    hostPrefix:          string;
    hostDomain:          string;
    paths:               any[];
    tlsSecretName:       string;
    tlsSecretPerReplica: TlsSecretPerReplica;
}

export interface TlsSecretPerReplica {
    enabled: boolean;
    prefix:  string;
}

export interface PodDisruptionBudget {
    enabled:        boolean;
    minAvailable:   number;
    maxUnavailable: string;
}

export interface Secret {
    annotations: AdditionalPrometheusRulesMap;
}

export interface AlertmanagerService {
    annotations:               AdditionalPrometheusRulesMap;
    labels:                    AdditionalPrometheusRulesMap;
    clusterIP:                 string;
    port?:                     number;
    targetPort?:               number;
    nodePort:                  number;
    additionalPorts:           any[];
    externalIPs:               any[];
    loadBalancerIP:            string;
    loadBalancerSourceRanges:  any[];
    externalTrafficPolicy:     string;
    type:                      string;
    publishNotReadyAddresses?: boolean;
    sessionAffinity?:          string;
    nodePortTls?:              number;
}

export interface AlertmanagerServiceAccount {
    create:      boolean;
    name:        string;
    annotations: AdditionalPrometheusRulesMap;
}

export interface ServiceMonitor {
    interval:          string;
    selfMonitor?:      boolean;
    proxyUrl?:         string;
    scheme:            string;
    enableHttp2?:      boolean;
    tlsConfig:         AdditionalPrometheusRulesMap;
    bearerTokenFile:   null;
    metricRelabelings: any[];
    relabelings:       any[];
    enabled?:          boolean;
}

export interface ServicePerReplica {
    enabled:                  boolean;
    annotations:              AdditionalPrometheusRulesMap;
    port:                     number;
    targetPort:               number;
    nodePort:                 number;
    loadBalancerSourceRanges: any[];
    externalTrafficPolicy:    string;
    type:                     string;
}

export interface CoreDns {
    enabled:        boolean;
    service:        DnsmasqClass;
    serviceMonitor: CoreDnsServiceMonitor;
}

export interface DnsmasqClass {
    port:       number;
    targetPort: number;
}

export interface CoreDnsServiceMonitor {
    interval:          string;
    proxyUrl:          string;
    metricRelabelings: any[];
    relabelings:       any[];
    additionalLabels:  AdditionalPrometheusRulesMap;
}

export interface DefaultRules {
    create:                    boolean;
    rules:                     { [key: string]: boolean };
    appNamespacesTarget:       string;
    labels:                    AdditionalPrometheusRulesMap;
    annotations:               AdditionalPrometheusRulesMap;
    additionalRuleLabels:      AdditionalPrometheusRulesMap;
    additionalRuleAnnotations: AdditionalPrometheusRulesMap;
    runbookUrl:                string;
    disabled:                  AdditionalPrometheusRulesMap;
}

export interface KubePrometheusStackHelmParamGlobal {
    rbac:             GlobalRbac;
    imageRegistry:    string;
    imagePullSecrets: any[];
}

export interface GlobalRbac {
    create:                      boolean;
    createAggregateClusterRoles: boolean;
    pspEnabled:                  boolean;
    pspAnnotations:              AdditionalPrometheusRulesMap;
}

export interface Grafana {
    enabled:                   boolean;
    namespaceOverride:         string;
    forceDeployDatasources:    boolean;
    forceDeployDashboards:     boolean;
    defaultDashboardsEnabled:  boolean;
    defaultDashboardsTimezone: string;
    adminPassword:             string;
    rbac:                      GrafanaRbac;
    ingress:                   Ingress;
    sidecar:                   Sidecar;
    extraConfigmapMounts:      any[];
    deleteDatasources:         any[];
    additionalDataSources:     any[];
    service:                   GrafanaService;
    serviceMonitor:            GrafanaServiceMonitor;
}

export interface GrafanaRbac {
    pspEnabled: boolean;
}

export interface GrafanaService {
    portName: string;
}

export interface GrafanaServiceMonitor {
    enabled:       boolean;
    path:          string;
    labels:        AdditionalPrometheusRulesMap;
    interval:      string;
    scheme:        string;
    tlsConfig:     AdditionalPrometheusRulesMap;
    scrapeTimeout: string;
    relabelings:   any[];
}

export interface Sidecar {
    dashboards:  Dashboards;
    datasources: Datasources;
}

export interface Dashboards {
    enabled:      boolean;
    label:        string;
    labelValue:   string;
    annotations:  AdditionalPrometheusRulesMap;
    multicluster: Multicluster;
    provider:     Provider;
}

export interface Multicluster {
    global: KubeStateMetrics;
    etcd:   KubeStateMetrics;
}

export interface KubeStateMetrics {
    enabled: boolean;
}

export interface Provider {
    allowUiUpdates: boolean;
}

export interface Datasources {
    enabled:                             boolean;
    defaultDatasourceEnabled:            boolean;
    uid:                                 string;
    annotations:                         AdditionalPrometheusRulesMap;
    createPrometheusReplicasDatasources: boolean;
    label:                               string;
    labelValue:                          string;
    exemplarTraceIdDestinations:         AdditionalPrometheusRulesMap;
}

export interface KubeStateMetricsClass {
    namespaceOverride: string;
    rbac:              KubeStateMetricsRbac;
    releaseLabel:      boolean;
    prometheus:        KubeStateMetricsPrometheus;
    selfMonitor:       KubeStateMetrics;
}

export interface KubeStateMetricsPrometheus {
    monitor: Monitor;
}

export interface Monitor {
    enabled:           boolean;
    interval:          string;
    scrapeTimeout:     string;
    proxyUrl:          string;
    honorLabels?:      boolean;
    metricRelabelings: any[];
    relabelings:       any[];
    jobLabel?:         string;
}

export interface KubeStateMetricsRbac {
    create: boolean;
}

export interface KubeApiServer {
    enabled:        boolean;
    tlsConfig:      TlsConfig;
    serviceMonitor: KubeApiServerServiceMonitor;
}

export interface KubeApiServerServiceMonitor {
    interval:          string;
    proxyUrl:          string;
    jobLabel:          string;
    selector:          Selector;
    metricRelabelings: MetricRelabeling[];
    relabelings:       any[];
    additionalLabels:  AdditionalPrometheusRulesMap;
}

export interface MetricRelabeling {
    action:       string;
    regex:        string;
    sourceLabels: string[];
}

export interface Selector {
    matchLabels: MatchLabels;
}

export interface MatchLabels {
    component: string;
    provider:  string;
}

export interface TlsConfig {
    serverName:         string;
    insecureSkipVerify: boolean;
}

export interface Kube {
    enabled:        boolean;
    endpoints:      any[];
    service:        KubeControllerManagerService;
    serviceMonitor: KubeControllerManagerServiceMonitor;
}

export interface KubeControllerManagerService {
    enabled:    boolean;
    port:       number | null;
    targetPort: number | null;
}

export interface KubeControllerManagerServiceMonitor {
    enabled:             boolean;
    interval:            string;
    proxyUrl:            string;
    https:               boolean | null;
    insecureSkipVerify?: null;
    serverName?:         null;
    metricRelabelings:   any[];
    relabelings:         any[];
    additionalLabels:    AdditionalPrometheusRulesMap;
}

export interface KubeDns {
    enabled:        boolean;
    service:        KubeDnsService;
    serviceMonitor: KubeDnsServiceMonitor;
}

export interface KubeDnsService {
    dnsmasq: DnsmasqClass;
    skydns:  DnsmasqClass;
}

export interface KubeDnsServiceMonitor {
    interval:                 string;
    proxyUrl:                 string;
    metricRelabelings:        any[];
    relabelings:              any[];
    dnsmasqMetricRelabelings: any[];
    dnsmasqRelabelings:       any[];
    additionalLabels:         AdditionalPrometheusRulesMap;
}

export interface KubeEtcd {
    enabled:        boolean;
    endpoints:      any[];
    service:        KubeControllerManagerService;
    serviceMonitor: KubeEtcdServiceMonitor;
}

export interface KubeEtcdServiceMonitor {
    enabled:            boolean;
    interval:           string;
    proxyUrl:           string;
    scheme:             string;
    insecureSkipVerify: boolean;
    serverName:         string;
    caFile:             string;
    certFile:           string;
    keyFile:            string;
    metricRelabelings:  any[];
    relabelings:        any[];
    additionalLabels:   AdditionalPrometheusRulesMap;
}

export interface Kubelet {
    enabled:        boolean;
    namespace:      string;
    serviceMonitor: KubeletServiceMonitor;
}

export interface KubeletServiceMonitor {
    interval:                  string;
    proxyUrl:                  string;
    https:                     boolean;
    cAdvisor:                  boolean;
    probes:                    boolean;
    resource:                  boolean;
    resourcePath:              string;
    cAdvisorMetricRelabelings: MetricRelabeling[];
    probesMetricRelabelings:   any[];
    cAdvisorRelabelings:       Relabeling[];
    probesRelabelings:         Relabeling[];
    resourceRelabelings:       Relabeling[];
    metricRelabelings:         any[];
    relabelings:               Relabeling[];
    additionalLabels:          AdditionalPrometheusRulesMap;
}

export interface Relabeling {
    action:       string;
    sourceLabels: string[];
    targetLabel:  string;
}

export interface KubePrometheusStackHelmParamPrometheus {
    enabled:                       boolean;
    annotations:                   AdditionalPrometheusRulesMap;
    serviceAccount:                AlertmanagerServiceAccount;
    thanosService:                 ThanosService;
    thanosServiceMonitor:          ServiceMonitor;
    thanosServiceExternal:         ThanosService;
    service:                       AlertmanagerService;
    servicePerReplica:             ServicePerReplica;
    podDisruptionBudget:           PodDisruptionBudget;
    thanosIngress:                 Ingress;
    extraSecret:                   ExtraSecret;
    ingress:                       Ingress;
    ingressPerReplica:             IngressPerReplica;
    podSecurityPolicy:             PodSecurityPolicy;
    serviceMonitor:                ServiceMonitor;
    prometheusSpec:                PrometheusSpec;
    additionalRulesForClusterRole: any[];
    additionalServiceMonitors:     any[];
    additionalPodMonitors:         any[];
}

export interface PodSecurityPolicy {
    allowedCapabilities: any[];
    allowedHostPaths:    any[];
    volumes:             any[];
}

export interface PrometheusSpec {
    disableCompaction:                       boolean;
    apiserverConfig:                         AdditionalPrometheusRulesMap;
    additionalArgs:                          any[];
    scrapeInterval:                          string;
    scrapeTimeout:                           string;
    evaluationInterval:                      string;
    listenLocal:                             boolean;
    enableAdminAPI:                          boolean;
    web:                                     AdditionalPrometheusRulesMap;
    exemplars:                               string;
    enableFeatures:                          any[];
    image:                                   Image;
    tolerations:                             any[];
    topologySpreadConstraints:               any[];
    alertingEndpoints:                       any[];
    externalLabels:                          AdditionalPrometheusRulesMap;
    enableRemoteWriteReceiver:               boolean;
    replicaExternalLabelName:                string;
    replicaExternalLabelNameClear:           boolean;
    prometheusExternalLabelName:             string;
    prometheusExternalLabelNameClear:        boolean;
    externalUrl:                             string;
    nodeSelector:                            AdditionalPrometheusRulesMap;
    secrets:                                 any[];
    configMaps:                              any[];
    query:                                   AdditionalPrometheusRulesMap;
    ruleNamespaceSelector:                   AdditionalPrometheusRulesMap;
    ruleSelectorNilUsesHelmValues:           boolean;
    ruleSelector:                            AdditionalPrometheusRulesMap;
    serviceMonitorSelectorNilUsesHelmValues: boolean;
    serviceMonitorSelector:                  AdditionalPrometheusRulesMap;
    serviceMonitorNamespaceSelector:         AdditionalPrometheusRulesMap;
    podMonitorSelectorNilUsesHelmValues:     boolean;
    podMonitorSelector:                      AdditionalPrometheusRulesMap;
    podMonitorNamespaceSelector:             AdditionalPrometheusRulesMap;
    probeSelectorNilUsesHelmValues:          boolean;
    probeSelector:                           AdditionalPrometheusRulesMap;
    probeNamespaceSelector:                  AdditionalPrometheusRulesMap;
    retention:                               string;
    retentionSize:                           string;
    walCompression:                          boolean;
    paused:                                  boolean;
    replicas:                                number;
    shards:                                  number;
    logLevel:                                string;
    logFormat:                               string;
    routePrefix:                             string;
    podMetadata:                             AdditionalPrometheusRulesMap;
    podAntiAffinity:                         string;
    podAntiAffinityTopologyKey:              string;
    affinity:                                AdditionalPrometheusRulesMap;
    remoteRead:                              any[];
    additionalRemoteRead:                    any[];
    remoteWrite:                             any[];
    additionalRemoteWrite:                   any[];
    remoteWriteDashboards:                   boolean;
    resources:                               AdditionalPrometheusRulesMap;
    storageSpec:                             AdditionalPrometheusRulesMap;
    volumes:                                 any[];
    volumeMounts:                            any[];
    additionalScrapeConfigs:                 any[];
    additionalScrapeConfigsSecret:           AdditionalPrometheusRulesMap;
    additionalPrometheusSecretsAnnotations:  AdditionalPrometheusRulesMap;
    additionalAlertManagerConfigs:           any[];
    additionalAlertManagerConfigsSecret:     AdditionalPrometheusRulesMap;
    additionalAlertRelabelConfigs:           any[];
    additionalAlertRelabelConfigsSecret:     AdditionalPrometheusRulesMap;
    securityContext:                         SecurityContext;
    priorityClassName:                       string;
    thanos:                                  AdditionalPrometheusRulesMap;
    containers:                              any[];
    initContainers:                          any[];
    portName:                                string;
    arbitraryFSAccessThroughSMs:             boolean;
    overrideHonorLabels:                     boolean;
    overrideHonorTimestamps:                 boolean;
    ignoreNamespaceSelectors:                boolean;
    enforcedNamespaceLabel:                  string;
    prometheusRulesExcludedFromEnforce:      any[];
    excludedFromEnforcement:                 any[];
    queryLogFile:                            boolean;
    enforcedSampleLimit:                     boolean;
    enforcedTargetLimit:                     boolean;
    enforcedLabelLimit:                      boolean;
    enforcedLabelNameLengthLimit:            boolean;
    enforcedLabelValueLengthLimit:           boolean;
    allowOverlappingBlocks:                  boolean;
    minReadySeconds:                         number;
    hostNetwork:                             boolean;
}

export interface ThanosService {
    enabled:                   boolean;
    annotations:               AdditionalPrometheusRulesMap;
    labels:                    AdditionalPrometheusRulesMap;
    externalTrafficPolicy:     string;
    type:                      string;
    portName:                  string;
    port:                      number;
    targetPort:                string;
    httpPortName:              string;
    httpPort:                  number;
    targetHttpPort:            string;
    clusterIP?:                string;
    nodePort:                  number;
    httpNodePort:              number;
    loadBalancerIP?:           string;
    loadBalancerSourceRanges?: any[];
}

export interface PrometheusNodeExporter {
    namespaceOverride: string;
    podLabels:         PodLabels;
    releaseLabel:      boolean;
    extraArgs:         string[];
    service:           GrafanaService;
    prometheus:        KubeStateMetricsPrometheus;
    rbac:              GrafanaRbac;
}

export interface PodLabels {
    jobLabel: string;
}

export interface PrometheusOperator {
    enabled:                        boolean;
    tls:                            Tls;
    admissionWebhooks:              AdmissionWebhooks;
    namespaces:                     AdditionalPrometheusRulesMap;
    denyNamespaces:                 any[];
    alertmanagerInstanceNamespaces: any[];
    alertmanagerConfigNamespaces:   any[];
    prometheusInstanceNamespaces:   any[];
    thanosRulerInstanceNamespaces:  any[];
    networkPolicy:                  KubeStateMetrics;
    serviceAccount:                 PrometheusOperatorServiceAccount;
    service:                        AlertmanagerService;
    labels:                         AdditionalPrometheusRulesMap;
    annotations:                    AdditionalPrometheusRulesMap;
    podLabels:                      AdditionalPrometheusRulesMap;
    podAnnotations:                 AdditionalPrometheusRulesMap;
    kubeletService:                 KubeletService;
    serviceMonitor:                 PrometheusOperatorServiceMonitor;
    resources:                      AdditionalPrometheusRulesMap;
    hostNetwork:                    boolean;
    nodeSelector:                   AdditionalPrometheusRulesMap;
    tolerations:                    any[];
    affinity:                       AdditionalPrometheusRulesMap;
    dnsConfig:                      AdditionalPrometheusRulesMap;
    securityContext:                SecurityContext;
    containerSecurityContext:       ContainerSecurityContext;
    verticalPodAutoscaler:          VerticalPodAutoscaler;
    image:                          Image;
    prometheusConfigReloader:       PrometheusConfigReloader;
    thanosImage:                    Image;
    secretFieldSelector:            string;
}

export interface AdmissionWebhooks {
    failurePolicy:   string;
    timeoutSeconds:  number;
    enabled:         boolean;
    caBundle:        string;
    annotations:     AdditionalPrometheusRulesMap;
    patch:           Patch;
    createSecretJob: Job;
    patchWebhookJob: Job;
    certManager:     CertManager;
}

export interface CertManager {
    enabled:       boolean;
    rootCert:      Cert;
    admissionCert: Cert;
}

export interface Cert {
    duration: string;
}

export interface Job {
    securityContext: AdditionalPrometheusRulesMap;
}

export interface Patch {
    enabled:           boolean;
    image:             Image;
    resources:         AdditionalPrometheusRulesMap;
    priorityClassName: string;
    annotations:       AdditionalPrometheusRulesMap;
    podAnnotations:    AdditionalPrometheusRulesMap;
    nodeSelector:      AdditionalPrometheusRulesMap;
    affinity:          AdditionalPrometheusRulesMap;
    tolerations:       any[];
    securityContext:   SecurityContext;
}

export interface ContainerSecurityContext {
    allowPrivilegeEscalation: boolean;
    readOnlyRootFilesystem:   boolean;
}

export interface KubeletService {
    enabled:   boolean;
    namespace: string;
    name:      string;
}

export interface PrometheusConfigReloader {
    image:     Image;
    resources: Resources;
}

export interface Resources {
    requests: Limits;
    limits:   Limits;
}

export interface Limits {
    cpu:    string;
    memory: string;
}

export interface PrometheusOperatorServiceAccount {
    create: boolean;
    name:   string;
}

export interface PrometheusOperatorServiceMonitor {
    additionalLabels:  AdditionalPrometheusRulesMap;
    interval:          string;
    scrapeTimeout:     string;
    selfMonitor:       boolean;
    metricRelabelings: any[];
    relabelings:       any[];
}

export interface Tls {
    enabled:       boolean;
    tlsMinVersion: string;
    internalPort:  number;
}

export interface VerticalPodAutoscaler {
    enabled:             boolean;
    controlledResources: any[];
    maxAllowed:          AdditionalPrometheusRulesMap;
    minAllowed:          AdditionalPrometheusRulesMap;
    updatePolicy:        UpdatePolicy;
}

export interface UpdatePolicy {
    updateMode: string;
}

export interface ThanosRuler {
    enabled:             boolean;
    annotations:         AdditionalPrometheusRulesMap;
    serviceAccount:      AlertmanagerServiceAccount;
    podDisruptionBudget: PodDisruptionBudget;
    ingress:             Ingress;
    service:             AlertmanagerService;
    serviceMonitor:      ServiceMonitor;
    thanosRulerSpec:     ThanosRulerSpec;
    extraSecret:         ExtraSecret;
}

export interface ThanosRulerSpec {
    podMetadata:                   AdditionalPrometheusRulesMap;
    image:                         Image;
    ruleNamespaceSelector:         AdditionalPrometheusRulesMap;
    ruleSelectorNilUsesHelmValues: boolean;
    ruleSelector:                  AdditionalPrometheusRulesMap;
    logFormat:                     string;
    logLevel:                      string;
    replicas:                      number;
    retention:                     string;
    evaluationInterval:            string;
    storage:                       AdditionalPrometheusRulesMap;
    alertmanagersConfig:           AdditionalPrometheusRulesMap;
    externalPrefix:                null;
    routePrefix:                   string;
    objectStorageConfig:           AdditionalPrometheusRulesMap;
    objectStorageConfigFile:       string;
    queryEndpoints:                any[];
    queryConfig:                   AdditionalPrometheusRulesMap;
    labels:                        AdditionalPrometheusRulesMap;
    paused:                        boolean;
    nodeSelector:                  AdditionalPrometheusRulesMap;
    resources:                     AdditionalPrometheusRulesMap;
    podAntiAffinity:               string;
    podAntiAffinityTopologyKey:    string;
    affinity:                      AdditionalPrometheusRulesMap;
    tolerations:                   any[];
    topologySpreadConstraints:     any[];
    securityContext:               SecurityContext;
    listenLocal:                   boolean;
    containers:                    any[];
    volumes:                       any[];
    volumeMounts:                  any[];
    initContainers:                any[];
    priorityClassName:             string;
    portName:                      string;
}
