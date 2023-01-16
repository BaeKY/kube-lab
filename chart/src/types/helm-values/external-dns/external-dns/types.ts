export interface ExternalDnsHelmParam {
    image:                         Image;
    imagePullSecrets:              any[];
    nameOverride:                  string;
    fullnameOverride:              string;
    commonLabels:                  Affinity;
    serviceAccount:                ServiceAccount;
    rbac:                          Rbac;
    deploymentAnnotations:         Affinity;
    podLabels:                     Affinity;
    podAnnotations:                Affinity;
    shareProcessNamespace:         boolean;
    podSecurityContext:            PodSecurityContext;
    securityContext:               SecurityContext;
    dnsPolicy:                     null;
    priorityClassName:             string;
    terminationGracePeriodSeconds: null;
    serviceMonitor:                ServiceMonitor;
    env:                           any[];
    livenessProbe:                 NessProbe;
    readinessProbe:                NessProbe;
    service:                       Service;
    extraVolumes:                  any[];
    extraVolumeMounts:             any[];
    resources:                     Affinity;
    nodeSelector:                  Affinity;
    tolerations:                   any[];
    affinity:                      Affinity;
    topologySpreadConstraints:     any[];
    logLevel:                      string;
    logFormat:                     string;
    interval:                      string;
    triggerLoopOnEvent:            boolean;
    sources:                       string[];
    policy:                        string;
    registry:                      string;
    txtOwnerId:                    string;
    txtPrefix:                     string;
    txtSuffix:                     string;
    domainFilters:                 any[];
    provider:                      string;
    extraArgs:                     any[];
    secretConfiguration:           SecretConfiguration;
    deploymentStrategy:            DeploymentStrategy;
}

export interface Affinity {
}

export interface DeploymentStrategy {
    type: string;
}

export interface Image {
    repository: string;
    tag:        string;
    pullPolicy: string;
}

export interface NessProbe {
    httpGet:             HttpGet;
    initialDelaySeconds: number;
    periodSeconds:       number;
    timeoutSeconds:      number;
    failureThreshold:    number;
    successThreshold:    number;
}

export interface HttpGet {
    path: string;
    port: string;
}

export interface PodSecurityContext {
    fsGroup: number;
}

export interface Rbac {
    create:                boolean;
    additionalPermissions: any[];
}

export interface SecretConfiguration {
    enabled:   boolean;
    mountPath: string;
    data:      Affinity;
}

export interface SecurityContext {
    runAsNonRoot:           boolean;
    runAsUser:              number;
    readOnlyRootFilesystem: boolean;
    capabilities:           Capabilities;
}

export interface Capabilities {
    drop: string[];
}

export interface Service {
    port:        number;
    annotations: Affinity;
}

export interface ServiceAccount {
    create:      boolean;
    annotations: Affinity;
    labels:      Affinity;
    name:        string;
}

export interface ServiceMonitor {
    enabled:          boolean;
    additionalLabels: Affinity;
    interval:         string;
    scrapeTimeout:    string;
}
