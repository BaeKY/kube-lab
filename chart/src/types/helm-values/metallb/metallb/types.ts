export interface MetallbHelmParam {
    imagePullSecrets:  any[];
    nameOverride:      string;
    fullnameOverride:  string;
    loadBalancerClass: string;
    rbac:              Rbac;
    prometheus:        Prometheus;
    controller:        MetallbHelmParamController;
    speaker:           Speaker;
    crds:              Crds;
}

export interface MetallbHelmParamController {
    enabled:           boolean;
    logLevel:          string;
    image:             Image;
    strategy:          Strategy;
    serviceAccount:    ServiceAccount;
    securityContext:   SecurityContext;
    resources:         Affinity;
    nodeSelector:      Affinity;
    tolerations:       any[];
    priorityClassName: string;
    runtimeClassName:  string;
    affinity:          Affinity;
    podAnnotations:    Affinity;
    livenessProbe:     NessProbe;
    readinessProbe:    NessProbe;
}

export interface Affinity {
}

export interface Image {
    repository: string;
    tag:        null | string;
    pullPolicy: null;
}

export interface NessProbe {
    enabled:             boolean;
    failureThreshold:    number;
    initialDelaySeconds: number;
    periodSeconds:       number;
    successThreshold:    number;
    timeoutSeconds:      number;
}

export interface SecurityContext {
    runAsNonRoot: boolean;
    runAsUser:    number;
    fsGroup:      number;
}

export interface ServiceAccount {
    create:      boolean;
    name:        string;
    annotations: Affinity;
}

export interface Strategy {
    type: string;
}

export interface Crds {
    enabled:                 boolean;
    validationFailurePolicy: string;
}

export interface Prometheus {
    scrapeAnnotations:          boolean;
    metricsPort:                number;
    speakerMetricsTLSSecret:    string;
    controllerMetricsTLSSecret: string;
    rbacPrometheus:             boolean;
    serviceAccount:             string;
    namespace:                  string;
    rbacProxy:                  RbacProxy;
    podMonitor:                 PodMonitor;
    serviceMonitor:             ServiceMonitor;
    prometheusRule:             PrometheusRule;
}

export interface PodMonitor {
    enabled:           boolean;
    additionalLabels:  Affinity;
    annotations:       Affinity;
    jobLabel:          string;
    interval:          null;
    metricRelabelings: any[];
    relabelings:       any[];
}

export interface PrometheusRule {
    enabled:              boolean;
    additionalLabels:     Affinity;
    annotations:          Affinity;
    staleConfig:          AddressPoolExhausted;
    configNotLoaded:      AddressPoolExhausted;
    addressPoolExhausted: AddressPoolExhausted;
    addressPoolUsage:     AddressPoolUsage;
    bgpSessionDown:       AddressPoolExhausted;
    extraAlerts:          any[];
}

export interface AddressPoolExhausted {
    enabled: boolean;
    labels:  Labels;
}

export interface Labels {
    severity: string;
}

export interface AddressPoolUsage {
    enabled:    boolean;
    thresholds: Threshold[];
}

export interface Threshold {
    percent: number;
    labels:  Labels;
}

export interface RbacProxy {
    repository: string;
    tag:        string;
}

export interface ServiceMonitor {
    enabled:           boolean;
    speaker:           SpeakerClass;
    controller:        SpeakerClass;
    jobLabel:          string;
    interval:          null;
    metricRelabelings: any[];
    relabelings:       any[];
}

export interface SpeakerClass {
    additionalLabels: Affinity;
    annotations:      Affinity;
    tlsConfig:        TlsConfig;
}

export interface TlsConfig {
    insecureSkipVerify: boolean;
}

export interface Rbac {
    create: boolean;
}

export interface Speaker {
    enabled:           boolean;
    logLevel:          string;
    tolerateMaster:    boolean;
    memberlist:        Memberlist;
    image:             Image;
    updateStrategy:    Strategy;
    serviceAccount:    ServiceAccount;
    resources:         Affinity;
    nodeSelector:      Affinity;
    tolerations:       any[];
    priorityClassName: string;
    affinity:          Affinity;
    runtimeClassName:  string;
    podAnnotations:    Affinity;
    livenessProbe:     NessProbe;
    readinessProbe:    NessProbe;
    frr:               Frr;
    reloader:          FrrMetrics;
    frrMetrics:        FrrMetrics;
}

export interface Frr {
    enabled:     boolean;
    image:       Image;
    metricsPort: number;
    resources:   Affinity;
}

export interface FrrMetrics {
    resources: Affinity;
}

export interface Memberlist {
    enabled:    boolean;
    mlBindPort: number;
}
