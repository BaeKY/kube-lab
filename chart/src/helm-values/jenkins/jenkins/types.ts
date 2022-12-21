export interface JenkinsHelmParam {
    clusterZone:              string;
    renderHelmLabels:         boolean;
    controller:               Controller;
    agent:                    Agent;
    additionalAgents:         AdditionalAgents;
    persistence:              Persistence;
    networkPolicy:            NetworkPolicy;
    rbac:                     Rbac;
    serviceAccount:           ServiceAccount;
    serviceAccountAgent:      ServiceAccount;
    backup:                   Backup;
    checkDeprecation:         boolean;
    awsSecurityGroupPolicies: AwsSecurityGroupPolicies;
}

export interface AdditionalAgents {
}

export interface Agent {
    enabled:                  boolean;
    defaultsProviderTemplate: string;
    jenkinsUrl:               null;
    jenkinsTunnel:            null;
    kubernetesConnectTimeout: number;
    kubernetesReadTimeout:    number;
    maxRequestsPerHostStr:    string;
    namespace:                null;
    image:                    string;
    tag:                      string;
    workingDir:               string;
    nodeUsageMode:            string;
    customJenkinsLabels:      any[];
    imagePullSecretName:      null;
    componentName:            string;
    websocket:                boolean;
    privileged:               boolean;
    runAsUser:                null;
    runAsGroup:               null;
    hostNetworking:           boolean;
    resources:                AgentResources;
    alwaysPullImage:          boolean;
    podRetention:             string;
    showRawYaml:              boolean;
    volumes:                  any[];
    workspaceVolume:          AdditionalAgents;
    envVars:                  any[];
    nodeSelector:             AdditionalAgents;
    command:                  null;
    args:                     string;
    sideContainerName:        string;
    TTYEnabled:               boolean;
    containerCap:             number;
    podName:                  string;
    idleMinutes:              number;
    yamlTemplate:             string;
    yamlMergeStrategy:        string;
    connectTimeout:           number;
    annotations:              AdditionalAgents;
    additionalContainers:     any[];
    disableDefaultAgent:      boolean;
    podTemplates:             AdditionalAgents;
}

export interface AgentResources {
    requests: PurpleLimits;
    limits:   PurpleLimits;
}

export interface PurpleLimits {
    cpu:    string;
    memory: string;
}

export interface AwsSecurityGroupPolicies {
    enabled:  boolean;
    policies: Policy[];
}

export interface Policy {
    name:             string;
    securityGroupIds: any[];
    podSelector:      AdditionalAgents;
}

export interface Backup {
    enabled:                     boolean;
    componentName:               string;
    schedule:                    string;
    labels:                      AdditionalAgents;
    serviceAccount:              ServiceAccount;
    activeDeadlineSeconds:       string;
    image:                       Image;
    imagePullSecretName:         null;
    extraArgs:                   any[];
    existingSecret:              AdditionalAgents;
    env:                         any[];
    resources:                   BackupResources;
    destination:                 string;
    onlyJobs:                    boolean;
    usePodSecurityContext:       boolean;
    runAsUser:                   number;
    fsGroup:                     number;
    securityContextCapabilities: AdditionalAgents;
}

export interface Image {
    repository: string;
    tag:        string;
}

export interface BackupResources {
    requests: FluffyLimits;
    limits:   FluffyLimits;
}

export interface FluffyLimits {
    memory: string;
    cpu:    number;
}

export interface ServiceAccount {
    create:               boolean;
    name:                 null;
    annotations:          AdditionalAgents;
    imagePullSecretName?: null;
}

export interface Controller {
    componentName:                         string;
    image:                                 string;
    tagLabel:                              string;
    imagePullPolicy:                       string;
    imagePullSecretName:                   null;
    lifecycle:                             null;
    disableRememberMe:                     boolean;
    numExecutors:                          number;
    executorMode:                          string;
    markupFormatter:                       string;
    customJenkinsLabels:                   any[];
    adminSecret:                           boolean;
    hostNetworking:                        boolean;
    adminUser:                             string;
    admin:                                 Admin;
    jenkinsHome:                           string;
    jenkinsRef:                            string;
    jenkinsWar:                            string;
    resources:                             AgentResources;
    usePodSecurityContext:                 boolean;
    runAsUser:                             number;
    fsGroup:                               number;
    securityContextCapabilities:           AdditionalAgents;
    containerSecurityContext:              ControllerContainerSecurityContext;
    servicePort:                           number;
    targetPort:                            number;
    serviceType:                           string;
    serviceExternalTrafficPolicy:          null;
    serviceAnnotations:                    AdditionalAgents;
    statefulSetLabels:                     AdditionalAgents;
    serviceLabels:                         AdditionalAgents;
    podLabels:                             AdditionalAgents;
    healthProbes:                          boolean;
    probes:                                Probes;
    podDisruptionBudget:                   PodDisruptionBudget;
    agentListenerEnabled:                  boolean;
    agentListenerPort:                     number;
    agentListenerHostPort:                 null;
    agentListenerNodePort:                 null;
    agentListenerExternalTrafficPolicy:    null;
    agentListenerLoadBalancerSourceRanges: string[];
    disabledAgentProtocols:                string[];
    csrf:                                  Csrf;
    agentListenerServiceType:              string;
    agentListenerLoadBalancerIP:           null;
    agentListenerServiceAnnotations:       AdditionalAgents;
    loadBalancerSourceRanges:              string[];
    extraPorts:                            any[];
    installPlugins:                        string[];
    installLatestPlugins:                  boolean;
    installLatestSpecifiedPlugins:         boolean;
    additionalPlugins:                     any[];
    initializeOnce:                        boolean;
    overwritePluginsFromImage:             boolean;
    projectNamingStrategy:                 string;
    enableRawHtmlMarkupFormatter:          boolean;
    scriptApproval:                        any[];
    initScripts:                           any[];
    existingSecret:                        null;
    additionalExistingSecrets:             any[];
    additionalSecrets:                     any[];
    secretClaims:                          any[];
    cloudName:                             string;
    JCasC:                                 JCasC;
    customInitContainers:                  any[];
    sidecars:                              Sidecars;
    schedulerName:                         string;
    nodeSelector:                          AdditionalAgents;
    terminationGracePeriodSeconds:         null;
    terminationMessagePath:                null;
    terminationMessagePolicy:              null;
    tolerations:                           any[];
    affinity:                              AdditionalAgents;
    priorityClassName:                     null;
    podAnnotations:                        AdditionalAgents;
    statefulSetAnnotations:                AdditionalAgents;
    updateStrategy:                        AdditionalAgents;
    ingress:                               Ingress;
    secondaryingress:                      Ingress;
    backendconfig:                         Backendconfig;
    route:                                 PodDisruptionBudget;
    hostAliases:                           any[];
    prometheus:                            Prometheus;
    googlePodMonitor:                      GooglePodMonitor;
    testEnabled:                           boolean;
    httpsKeyStore:                         HttpsKeyStore;
}

export interface JCasC {
    defaultConfig:         boolean;
    configUrls:            any[];
    configScripts:         AdditionalAgents;
    security:              Security;
    securityRealm:         string;
    authorizationStrategy: string;
}

export interface Security {
    apiToken: ApiToken;
}

export interface ApiToken {
    creationOfLegacyTokenEnabled:     boolean;
    tokenGenerationOnCreationEnabled: boolean;
    usageStatisticsEnabled:           boolean;
}

export interface Admin {
    existingSecret: string;
    userKey:        string;
    passwordKey:    string;
}

export interface Backendconfig {
    enabled:     boolean;
    apiVersion:  string;
    name:        null;
    labels:      AdditionalAgents;
    annotations: AdditionalAgents;
    spec:        AdditionalAgents;
}

export interface ControllerContainerSecurityContext {
    runAsUser:                number;
    runAsGroup:               number;
    readOnlyRootFilesystem:   boolean;
    allowPrivilegeEscalation: boolean;
}

export interface Csrf {
    defaultCrumbIssuer: DefaultCrumbIssuer;
}

export interface DefaultCrumbIssuer {
    enabled:            boolean;
    proxyCompatability: boolean;
}

export interface GooglePodMonitor {
    enabled:        boolean;
    scrapeInterval: string;
    scrapeEndpoint: string;
}

export interface HttpsKeyStore {
    jenkinsHttpsJksSecretName:    string;
    enable:                       boolean;
    httpPort:                     number;
    path:                         string;
    fileName:                     string;
    password:                     string;
    jenkinsKeyStoreBase64Encoded: string;
}

export interface Ingress {
    enabled:     boolean;
    paths:       any[];
    apiVersion:  string;
    labels:      AdditionalAgents;
    annotations: AdditionalAgents;
    hostName:    null;
    tls:         null;
}

export interface PodDisruptionBudget {
    enabled:     boolean;
    apiVersion?: string;
    annotations: AdditionalAgents;
    labels:      AdditionalAgents;
}

export interface Probes {
    startupProbe:   Probe;
    livenessProbe:  Probe;
    readinessProbe: Probe;
}

export interface Probe {
    failureThreshold: number;
    httpGet:          HttpGet;
    periodSeconds:    number;
    timeoutSeconds:   number;
}

export interface HttpGet {
    path: string;
    port: string;
}

export interface Prometheus {
    enabled:                        boolean;
    serviceMonitorAdditionalLabels: AdditionalAgents;
    scrapeInterval:                 string;
    scrapeEndpoint:                 string;
    alertingRulesAdditionalLabels:  AdditionalAgents;
    alertingrules:                  any[];
    prometheusRuleNamespace:        string;
}

export interface Sidecars {
    configAutoReload: ConfigAutoReload;
    other:            any[];
}

export interface ConfigAutoReload {
    enabled:                  boolean;
    image:                    string;
    imagePullPolicy:          string;
    resources:                AdditionalAgents;
    reqRetryConnect:          number;
    sshTcpPort:               number;
    folder:                   string;
    containerSecurityContext: ConfigAutoReloadContainerSecurityContext;
}

export interface ConfigAutoReloadContainerSecurityContext {
    readOnlyRootFilesystem:   boolean;
    allowPrivilegeEscalation: boolean;
}

export interface NetworkPolicy {
    enabled:        boolean;
    apiVersion:     string;
    internalAgents: InternalAgents;
    externalAgents: AdditionalAgents;
}

export interface InternalAgents {
    allowed:         boolean;
    podLabels:       AdditionalAgents;
    namespaceLabels: AdditionalAgents;
}

export interface Persistence {
    enabled:       boolean;
    existingClaim: null;
    storageClass:  null;
    annotations:   AdditionalAgents;
    labels:        AdditionalAgents;
    accessMode:    string;
    size:          string;
    volumes:       null;
    mounts:        null;
}

export interface Rbac {
    create:      boolean;
    readSecrets: boolean;
}
