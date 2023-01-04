export interface ArgoCdHelmParam {
    nameOverride:         string;
    fullnameOverride:     string;
    kubeVersionOverride:  string;
    apiVersionOverrides:  ApiVersionOverrides;
    createAggregateRoles: boolean;
    openshift:            Openshift;
    crds:                 Crds;
    global:               Global;
    configs:              Configs;
    extraObjects:         any[];
    controller:           Controller;
    dex:                  Dex;
    redis:                ArgoCdHelmParamRedis;
    "redis-ha":           RedisHa;
    externalRedis:        ExternalRedis;
    server:               Server;
    repoServer:           RepoServer;
    applicationSet:       ApplicationSet;
    notifications:        Notifications;
}

export interface ApiVersionOverrides {
    certmanager: string;
    cloudgoogle: string;
    autoscaling: string;
}

export interface ApplicationSet {
    enabled:                  boolean;
    name:                     string;
    replicaCount:             number;
    pdb:                      Pdb;
    image:                    InitImageClass;
    imagePullSecrets:         any[];
    args:                     Args;
    logFormat:                string;
    logLevel:                 string;
    extraContainers:          any[];
    metrics:                  ApplicationSetMetrics;
    service:                  ApplicationSetService;
    serviceAccount:           ServiceAccount;
    deploymentAnnotations:    Affinity;
    podAnnotations:           Affinity;
    podLabels:                Affinity;
    containerSecurityContext: ApplicationSetContainerSecurityContext;
    readinessProbe:           NessProbe;
    livenessProbe:            NessProbe;
    resources:                Affinity;
    nodeSelector:             Affinity;
    tolerations:              any[];
    affinity:                 Affinity;
    priorityClassName:        string;
    extraVolumeMounts:        any[];
    extraVolumes:             any[];
    extraArgs:                any[];
    extraEnv:                 any[];
    extraEnvFrom:             any[];
    webhook:                  Webhook;
}

export interface Affinity {
}

export interface Args {
    metricsAddr:   string;
    probeBindAddr: string;
    policy:        string;
    dryRun:        boolean;
}

export interface ApplicationSetContainerSecurityContext {
    runAsNonRoot:             boolean;
    readOnlyRootFilesystem:   boolean;
    allowPrivilegeEscalation: boolean;
    seccompProfile:           SeccompProfile;
    capabilities:             Capabilities;
}

export interface Capabilities {
    drop: Drop[];
}

export enum Drop {
    All = "ALL",
}

export interface SeccompProfile {
    type: Type;
}

export enum Type {
    RuntimeDefault = "RuntimeDefault",
}

export interface InitImageClass {
    repository:      string;
    tag:             string;
    imagePullPolicy: ImagePullPolicy;
}

export enum ImagePullPolicy {
    Empty = "",
    IfNotPresent = "IfNotPresent",
}

export interface NessProbe {
    enabled?:            boolean;
    failureThreshold:    number;
    initialDelaySeconds: number;
    periodSeconds:       number;
    successThreshold:    number;
    timeoutSeconds:      number;
}

export interface ApplicationSetMetrics {
    enabled:        boolean;
    service:        ApplicationSetService;
    serviceMonitor: ServiceMonitor;
}

export interface ApplicationSetService {
    annotations:  Affinity;
    labels:       Affinity;
    servicePort?: number;
    portName:     string;
    port?:        number;
}

export interface ServiceMonitor {
    enabled:           boolean;
    interval?:         string;
    relabelings:       any[];
    metricRelabelings: any[];
    selector:          Affinity;
    scheme:            string;
    tlsConfig:         Affinity;
    namespace?:        string;
    additionalLabels:  Affinity;
    annotations:       Affinity;
}

export interface Pdb {
    enabled:        boolean;
    labels:         Affinity;
    annotations:    Affinity;
    minAvailable:   string;
    maxUnavailable: string;
}

export interface ServiceAccount {
    create:                        boolean;
    annotations:                   Affinity;
    labels?:                       Affinity;
    name:                          string;
    automountServiceAccountToken?: boolean;
}

export interface Webhook {
    ingress: Ingress;
}

export interface Ingress {
    enabled:          boolean;
    annotations:      Affinity;
    labels:           Affinity;
    ingressClassName: string;
    hosts:            any[];
    paths:            string[];
    pathType:         string;
    extraPaths:       any[];
    tls:              any[];
    https?:           boolean;
    isAWSALB?:        boolean;
    awsALB?:          AwsAlb;
}

export interface AwsAlb {
    serviceType:            string;
    backendProtocolVersion: string;
}

export interface Configs {
    cm:                             ConfigsCm;
    params:                         Params;
    rbac:                           Rbac;
    gpg:                            Gpg;
    clusterCredentials:             any[];
    knownHostsAnnotations:          Affinity;
    knownHosts:                     KnownHosts;
    tlsCertsAnnotations:            Affinity;
    tlsCerts:                       Affinity;
    credentialTemplates:            Affinity;
    credentialTemplatesAnnotations: Affinity;
    repositories:                   Affinity;
    repositoriesAnnotations:        Affinity;
    secret:                         ConfigsSecret;
    styles:                         string;
}

export interface ConfigsCm {
    create:                           boolean;
    annotations:                      Affinity;
    url:                              string;
    "application.instanceLabelKey":   string;
    "server.rbac.log.enforce.enable": boolean;
    "exec.enabled":                   boolean;
    "admin.enabled":                  boolean;
    "timeout.reconciliation":         string;
    "timeout.hard.reconciliation":    string;
}

export interface Gpg {
    annotations: Affinity;
    keys:        Affinity;
}

export interface KnownHosts {
    data: Data;
}

export interface Data {
    ssh_known_hosts: string;
}

export interface Params {
    annotations:                              Affinity;
    "otlp.address":                           string;
    "controller.status.processors":           number;
    "controller.operation.processors":        number;
    "controller.self.heal.timeout.seconds":   number;
    "controller.repo.server.timeout.seconds": number;
    "server.insecure":                        boolean;
    "server.basehref":                        string;
    "server.rootpath":                        string;
    "server.staticassets":                    string;
    "server.disable.auth":                    boolean;
    "server.enable.gzip":                     boolean;
    "server.x.frame.options":                 string;
    "reposerver.parallelism.limit":           number;
}

export interface Rbac {
    create:           boolean;
    annotations:      Affinity;
    "policy.default": string;
    "policy.csv":     string;
    scopes:           string;
}

export interface ConfigsSecret {
    createSecret:                   boolean;
    annotations:                    Affinity;
    githubSecret:                   string;
    gitlabSecret:                   string;
    bitbucketServerSecret:          string;
    bitbucketUUID:                  string;
    gogsSecret:                     string;
    extra:                          Affinity;
    argocdServerAdminPassword:      string;
    argocdServerAdminPasswordMtime: string;
}

export interface Controller {
    name:                      string;
    replicas:                  number;
    pdb:                       Pdb;
    image:                     InitImageClass;
    imagePullSecrets:          any[];
    args:                      Affinity;
    extraArgs:                 any[];
    env:                       any[];
    envFrom:                   any[];
    statefulsetAnnotations:    Affinity;
    podAnnotations:            Affinity;
    podLabels:                 Affinity;
    containerSecurityContext:  ApplicationSetContainerSecurityContext;
    containerPort:             number;
    readinessProbe:            NessProbe;
    volumeMounts:              any[];
    volumes:                   any[];
    nodeSelector:              Affinity;
    tolerations:               any[];
    affinity:                  Affinity;
    topologySpreadConstraints: any[];
    priorityClassName:         string;
    resources:                 Affinity;
    serviceAccount:            ServiceAccount;
    metrics:                   ControllerMetrics;
    clusterAdminAccess:        Openshift;
    clusterRoleRules:          ClusterRoleRules;
    extraContainers:           any[];
    initContainers:            any[];
}

export interface Openshift {
    enabled: boolean;
}

export interface ClusterRoleRules {
    enabled: boolean;
    rules:   any[];
}

export interface ControllerMetrics {
    enabled:           boolean;
    applicationLabels: ApplicationLabels;
    service:           ApplicationSetService;
    serviceMonitor:    ServiceMonitor;
    rules:             Rules;
}

export interface ApplicationLabels {
    enabled: boolean;
    labels:  any[];
}

export interface Rules {
    enabled: boolean;
    spec:    any[];
}

export interface Crds {
    install:     boolean;
    keep:        boolean;
    annotations: Affinity;
}

export interface Dex {
    enabled:                   boolean;
    name:                      string;
    extraArgs:                 any[];
    metrics:                   ApplicationSetMetrics;
    pdb:                       Pdb;
    image:                     InitImageClass;
    imagePullSecrets:          any[];
    initImage:                 InitImageClass;
    env:                       any[];
    envFrom:                   any[];
    certificateSecret:         CertificateSecret;
    deploymentAnnotations:     Affinity;
    podAnnotations:            Affinity;
    podLabels:                 Affinity;
    containerSecurityContext:  ApplicationSetContainerSecurityContext;
    livenessProbe:             NessProbe;
    readinessProbe:            NessProbe;
    serviceAccount:            ServiceAccount;
    volumeMounts:              any[];
    volumes:                   any[];
    containerPortHttp:         number;
    servicePortHttp:           number;
    servicePortHttpName:       string;
    containerPortGrpc:         number;
    servicePortGrpc:           number;
    servicePortGrpcName:       string;
    containerPortMetrics:      number;
    servicePortMetrics:        number;
    nodeSelector:              Affinity;
    tolerations:               any[];
    affinity:                  Affinity;
    topologySpreadConstraints: any[];
    priorityClassName:         string;
    resources:                 Affinity;
    extraContainers:           any[];
    initContainers:            any[];
}

export interface CertificateSecret {
    enabled:     boolean;
    labels:      Affinity;
    annotations: Affinity;
    ca?:         string;
    key:         string;
    crt:         string;
}

export interface ExternalRedis {
    host:              string;
    username:          string;
    password:          string;
    port:              number;
    existingSecret:    string;
    secretAnnotations: Affinity;
}

export interface Global {
    additionalLabels:       Affinity;
    revisionHistoryLimit:   number;
    image:                  InitImageClass;
    imagePullSecrets:       any[];
    logging:                Logging;
    statefulsetAnnotations: Affinity;
    deploymentAnnotations:  Affinity;
    podAnnotations:         Affinity;
    podLabels:              Affinity;
    securityContext:        Affinity;
    hostAliases:            any[];
    networkPolicy:          NetworkPolicy;
}

export interface Logging {
    format: string;
    level:  string;
}

export interface NetworkPolicy {
    create:             boolean;
    defaultDenyIngress: boolean;
}

export interface Notifications {
    enabled:                  boolean;
    name:                     string;
    affinity:                 Affinity;
    argocdUrl:                null;
    pdb:                      Pdb;
    image:                    InitImageClass;
    imagePullSecrets:         any[];
    nodeSelector:             Affinity;
    context:                  Affinity;
    secret:                   NotificationsSecret;
    logFormat:                string;
    logLevel:                 string;
    extraArgs:                any[];
    extraEnv:                 any[];
    extraEnvFrom:             any[];
    extraVolumeMounts:        any[];
    extraVolumes:             any[];
    metrics:                  NotificationsMetrics;
    notifiers:                Affinity;
    deploymentAnnotations:    Affinity;
    podAnnotations:           Affinity;
    podLabels:                Affinity;
    containerSecurityContext: ApplicationSetContainerSecurityContext;
    priorityClassName:        string;
    resources:                Affinity;
    serviceAccount:           ServiceAccount;
    cm:                       NotificationsCm;
    subscriptions:            any[];
    templates:                Affinity;
    tolerations:              any[];
    triggers:                 Affinity;
    bots:                     Bots;
}

export interface Bots {
    slack: Slack;
}

export interface Slack {
    enabled:                  boolean;
    pdb:                      Pdb;
    image:                    InitImageClass;
    imagePullSecrets:         any[];
    service:                  SlackService;
    serviceAccount:           ServiceAccount;
    containerSecurityContext: ApplicationSetContainerSecurityContext;
    resources:                Affinity;
    affinity:                 Affinity;
    tolerations:              any[];
    nodeSelector:             Affinity;
}

export interface SlackService {
    annotations: Affinity;
    port:        number;
    type:        string;
}

export interface NotificationsCm {
    create: boolean;
}

export interface NotificationsMetrics {
    enabled:        boolean;
    port:           number;
    service:        ApplicationSetService;
    serviceMonitor: ServiceMonitor;
}

export interface NotificationsSecret {
    create:      boolean;
    annotations: Affinity;
    items:       Affinity;
}

export interface ArgoCdHelmParamRedis {
    enabled:                   boolean;
    name:                      string;
    pdb:                       Pdb;
    image:                     InitImageClass;
    imagePullSecrets:          any[];
    extraArgs:                 any[];
    containerPort:             number;
    servicePort:               number;
    env:                       any[];
    envFrom:                   any[];
    deploymentAnnotations:     Affinity;
    podAnnotations:            Affinity;
    podLabels:                 Affinity;
    securityContext:           SecurityContext;
    containerSecurityContext:  RedisContainerSecurityContext;
    nodeSelector:              Affinity;
    tolerations:               any[];
    affinity:                  Affinity;
    topologySpreadConstraints: any[];
    priorityClassName:         string;
    serviceAccount:            ServiceAccount;
    resources:                 Affinity;
    volumeMounts:              any[];
    volumes:                   any[];
    extraContainers:           any[];
    initContainers:            any[];
    service:                   RedisService;
    metrics:                   RedisMetrics;
}

export interface RedisContainerSecurityContext {
    allowPrivilegeEscalation: boolean;
    capabilities:             Capabilities;
}

export interface RedisMetrics {
    enabled:                  boolean;
    image:                    InitImageClass;
    containerPort:            number;
    containerSecurityContext: ApplicationSetContainerSecurityContext;
    resources:                Affinity;
    service:                  PurpleService;
    serviceMonitor:           ServiceMonitor;
}

export interface PurpleService {
    type:        string;
    clusterIP:   string;
    annotations: Affinity;
    labels:      Affinity;
    servicePort: number;
    portName:    string;
}

export interface SecurityContext {
    runAsNonRoot:   boolean;
    runAsUser:      number;
    seccompProfile: SeccompProfile;
}

export interface RedisService {
    annotations: Affinity;
    labels:      Affinity;
}

export interface RedisHa {
    enabled:                   boolean;
    exporter:                  Openshift;
    persistentVolume:          Openshift;
    redis:                     RedisHaRedis;
    haproxy:                   Haproxy;
    image:                     RedisHaImage;
    topologySpreadConstraints: TopologySpreadConstraints;
}

export interface Haproxy {
    enabled: boolean;
    metrics: Openshift;
}

export interface RedisHaImage {
    tag: string;
}

export interface RedisHaRedis {
    masterGroupName: string;
    config:          Config;
}

export interface Config {
    save: string;
}

export interface TopologySpreadConstraints {
    enabled:           boolean;
    maxSkew:           string;
    topologyKey:       string;
    whenUnsatisfiable: string;
}

export interface RepoServer {
    name:                      string;
    replicas:                  number;
    autoscaling:               Autoscaling;
    pdb:                       Pdb;
    image:                     InitImageClass;
    imagePullSecrets:          any[];
    extraArgs:                 any[];
    env:                       any[];
    envFrom:                   any[];
    deploymentAnnotations:     Affinity;
    podAnnotations:            Affinity;
    podLabels:                 Affinity;
    containerPort:             number;
    readinessProbe:            NessProbe;
    livenessProbe:             NessProbe;
    volumeMounts:              any[];
    volumes:                   any[];
    nodeSelector:              Affinity;
    tolerations:               any[];
    affinity:                  Affinity;
    topologySpreadConstraints: any[];
    priorityClassName:         string;
    containerSecurityContext:  ApplicationSetContainerSecurityContext;
    resources:                 Affinity;
    certificateSecret:         CertificateSecret;
    service:                   ApplicationSetService;
    metrics:                   ApplicationSetMetrics;
    clusterAdminAccess:        Openshift;
    clusterRoleRules:          ClusterRoleRules;
    serviceAccount:            ServiceAccount;
    extraContainers:           any[];
    rbac:                      any[];
    initContainers:            any[];
}

export interface Autoscaling {
    enabled:                           boolean;
    minReplicas:                       number;
    maxReplicas:                       number;
    targetCPUUtilizationPercentage:    number;
    targetMemoryUtilizationPercentage: number;
    behavior:                          Affinity;
}

export interface Server {
    name:                      string;
    replicas:                  number;
    autoscaling:               Autoscaling;
    pdb:                       Pdb;
    image:                     InitImageClass;
    imagePullSecrets:          any[];
    extraArgs:                 any[];
    env:                       any[];
    envFrom:                   any[];
    lifecycle:                 Affinity;
    deploymentAnnotations:     Affinity;
    podAnnotations:            Affinity;
    podLabels:                 Affinity;
    containerPort:             number;
    readinessProbe:            NessProbe;
    livenessProbe:             NessProbe;
    volumeMounts:              any[];
    volumes:                   any[];
    nodeSelector:              Affinity;
    tolerations:               any[];
    affinity:                  Affinity;
    topologySpreadConstraints: any[];
    priorityClassName:         string;
    containerSecurityContext:  ApplicationSetContainerSecurityContext;
    resources:                 Affinity;
    certificate:               Certificate;
    certificateSecret:         CertificateSecret;
    service:                   ServerService;
    metrics:                   ApplicationSetMetrics;
    serviceAccount:            ServiceAccount;
    ingress:                   Ingress;
    ingressGrpc:               Ingress;
    route:                     Route;
    clusterAdminAccess:        Openshift;
    GKEbackendConfig:          GkEendConfig;
    GKEmanagedCertificate:     GkEmanagedCertificate;
    GKEfrontendConfig:         GkEendConfig;
    extraContainers:           any[];
    initContainers:            any[];
    extensions:                Extensions;
}

export interface GkEendConfig {
    enabled: boolean;
    spec:    Affinity;
}

export interface GkEmanagedCertificate {
    enabled: boolean;
    domains: string[];
}

export interface Certificate {
    enabled:         boolean;
    secretName:      string;
    domain:          string;
    additionalHosts: any[];
    duration:        string;
    renewBefore:     string;
    issuer:          Issuer;
    privateKey:      PrivateKey;
}

export interface Issuer {
    group: string;
    kind:  string;
    name:  string;
}

export interface PrivateKey {
    rotationPolicy: string;
    encoding:       string;
    algorithm:      string;
    size:           number;
}

export interface Extensions {
    enabled:                  boolean;
    image:                    InitImageClass;
    containerSecurityContext: ApplicationSetContainerSecurityContext;
    resources:                Affinity;
}

export interface Route {
    enabled:            boolean;
    annotations:        Affinity;
    hostname:           string;
    termination_type:   string;
    termination_policy: string;
}

export interface ServerService {
    annotations:              Affinity;
    labels:                   Affinity;
    type:                     string;
    nodePortHttp:             number;
    nodePortHttps:            number;
    servicePortHttp:          number;
    servicePortHttps:         number;
    servicePortHttpName:      string;
    servicePortHttpsName:     string;
    namedTargetPort:          boolean;
    loadBalancerIP:           string;
    loadBalancerSourceRanges: any[];
    externalIPs:              any[];
    externalTrafficPolicy:    string;
    sessionAffinity:          string;
}
