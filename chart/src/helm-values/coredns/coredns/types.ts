export interface CorednsHelmParam {
    image:                         Image;
    replicaCount:                  number;
    resources:                     Resources;
    rollingUpdate:                 RollingUpdate;
    terminationGracePeriodSeconds: number;
    podAnnotations:                Affinity;
    serviceType:                   string;
    prometheus:                    Prometheus;
    service:                       CorednsHelmParamService;
    serviceAccount:                ServiceAccount;
    rbac:                          Rbac;
    isClusterService:              boolean;
    priorityClassName:             string;
    servers:                       Server[];
    extraConfig:                   Affinity;
    livenessProbe:                 NessProbe;
    readinessProbe:                NessProbe;
    affinity:                      Affinity;
    topologySpreadConstraints:     any[];
    nodeSelector:                  Affinity;
    tolerations:                   any[];
    podDisruptionBudget:           Affinity;
    zoneFiles:                     any[];
    extraVolumes:                  any[];
    extraVolumeMounts:             any[];
    extraSecrets:                  any[];
    customLabels:                  Affinity;
    customAnnotations:             Affinity;
    hpa:                           Hpa;
    autoscaler:                    Autoscaler;
    deployment:                    Deployment;
}

export interface Affinity {
}

export interface Autoscaler {
    enabled:                   boolean;
    coresPerReplica:           number;
    nodesPerReplica:           number;
    min:                       number;
    max:                       number;
    includeUnschedulableNodes: boolean;
    preventSinglePointFailure: boolean;
    image:                     Image;
    priorityClassName:         string;
    affinity:                  Affinity;
    nodeSelector:              Affinity;
    tolerations:               any[];
    resources:                 Resources;
    configmap:                 Configmap;
    livenessProbe:             NessProbe;
}

export interface Configmap {
    annotations: Affinity;
}

export interface Image {
    repository: string;
    tag:        string;
    pullPolicy: string;
}

export interface NessProbe {
    enabled:             boolean;
    initialDelaySeconds: number;
    periodSeconds:       number;
    timeoutSeconds:      number;
    failureThreshold:    number;
    successThreshold:    number;
}

export interface Resources {
    requests: Limits;
    limits:   Limits;
}

export interface Limits {
    cpu:    string;
    memory: string;
}

export interface Deployment {
    enabled:     boolean;
    name:        string;
    annotations: Affinity;
}

export interface Hpa {
    enabled:     boolean;
    minReplicas: number;
    maxReplicas: number;
    metrics:     any[];
}

export interface Prometheus {
    service: PrometheusService;
    monitor: Monitor;
}

export interface Monitor {
    enabled:          boolean;
    additionalLabels: Affinity;
    namespace:        string;
    interval:         string;
}

export interface PrometheusService {
    enabled:     boolean;
    annotations: Annotations;
}

export interface Annotations {
    "prometheus.io/scrape": string;
    "prometheus.io/port":   string;
}

export interface Rbac {
    create:    boolean;
    pspEnable: boolean;
}

export interface RollingUpdate {
    maxUnavailable: number;
    maxSurge:       string;
}

export interface Server {
    zones:   Zone[];
    port:    number;
    plugins: Plugin[];
}

export interface Plugin {
    name:         string;
    configBlock?: string;
    parameters?:  number | string;
}

export interface Zone {
    zone: string;
}

export interface CorednsHelmParamService {
    name:        string;
    annotations: Affinity;
}

export interface ServiceAccount {
    create:      boolean;
    name:        string;
    annotations: Affinity;
}
