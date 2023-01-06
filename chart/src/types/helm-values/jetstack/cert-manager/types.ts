export interface CertManagerHelmParam {
    global:                    Global;
    installCRDs:               boolean;
    replicaCount:              number;
    strategy:                  Affinity;
    featureGates:              string;
    image:                     Image;
    clusterResourceNamespace:  string;
    namespace:                 string;
    serviceAccount:            CainjectorServiceAccount;
    extraArgs:                 any[];
    extraEnv:                  any[];
    resources:                 Affinity;
    securityContext:           SecurityContext;
    containerSecurityContext:  ContainerSecurityContext;
    volumes:                   any[];
    volumeMounts:              any[];
    podLabels:                 Affinity;
    nodeSelector:              NodeSelector;
    ingressShim:               Affinity;
    prometheus:                Prometheus;
    affinity:                  Affinity;
    tolerations:               any[];
    topologySpreadConstraints: any[];
    webhook:                   Webhook;
    cainjector:                Cainjector;
    startupapicheck:           Startupapicheck;
}

export interface Affinity {
}

export interface Cainjector {
    enabled:                   boolean;
    replicaCount:              number;
    strategy:                  Affinity;
    securityContext:           SecurityContext;
    containerSecurityContext:  ContainerSecurityContext;
    extraArgs:                 any[];
    resources:                 Affinity;
    nodeSelector:              NodeSelector;
    affinity:                  Affinity;
    tolerations:               any[];
    topologySpreadConstraints: any[];
    podLabels:                 Affinity;
    image:                     Image;
    serviceAccount:            CainjectorServiceAccount;
}

export interface ContainerSecurityContext {
    allowPrivilegeEscalation: boolean;
    capabilities:             Capabilities;
}

export interface Capabilities {
    drop: string[];
}

export interface Image {
    repository: string;
    pullPolicy: string;
}

export interface NodeSelector {
    "kubernetes.io/os": string;
}

export interface SecurityContext {
    runAsNonRoot:   boolean;
    seccompProfile: SeccompProfile;
}

export interface SeccompProfile {
    type: string;
}

export interface CainjectorServiceAccount {
    create:                       boolean;
    automountServiceAccountToken: boolean;
}

export interface Global {
    imagePullSecrets:  any[];
    commonLabels:      Affinity;
    priorityClassName: string;
    rbac:              GlobalRbac;
    podSecurityPolicy: PodSecurityPolicy;
    logLevel:          number;
    leaderElection:    LeaderElection;
}

export interface LeaderElection {
    namespace: string;
}

export interface PodSecurityPolicy {
    enabled:     boolean;
    useAppArmor: boolean;
}

export interface GlobalRbac {
    create:                boolean;
    aggregateClusterRoles: boolean;
}

export interface Prometheus {
    enabled:        boolean;
    servicemonitor: Servicemonitor;
}

export interface Servicemonitor {
    enabled:            boolean;
    prometheusInstance: string;
    targetPort:         number;
    path:               string;
    interval:           string;
    scrapeTimeout:      string;
    labels:             Affinity;
    annotations:        Affinity;
    honorLabels:        boolean;
}

export interface Startupapicheck {
    enabled:                  boolean;
    securityContext:          SecurityContext;
    containerSecurityContext: ContainerSecurityContext;
    timeout:                  string;
    backoffLimit:             number;
    jobAnnotations:           Annotations;
    extraArgs:                any[];
    resources:                Affinity;
    nodeSelector:             NodeSelector;
    affinity:                 Affinity;
    tolerations:              any[];
    podLabels:                Affinity;
    image:                    Image;
    rbac:                     StartupapicheckRbac;
    serviceAccount:           StartupapicheckServiceAccount;
}

export interface Annotations {
    "helm.sh/hook":               string;
    "helm.sh/hook-weight":        string;
    "helm.sh/hook-delete-policy": string;
}

export interface StartupapicheckRbac {
    annotations: Annotations;
}

export interface StartupapicheckServiceAccount {
    create:                       boolean;
    annotations:                  Annotations;
    automountServiceAccountToken: boolean;
}

export interface Webhook {
    replicaCount:              number;
    timeoutSeconds:            number;
    config:                    null;
    strategy:                  Affinity;
    securityContext:           SecurityContext;
    containerSecurityContext:  ContainerSecurityContext;
    extraArgs:                 any[];
    resources:                 Affinity;
    livenessProbe:             NessProbe;
    readinessProbe:            NessProbe;
    nodeSelector:              NodeSelector;
    affinity:                  Affinity;
    tolerations:               any[];
    topologySpreadConstraints: any[];
    podLabels:                 Affinity;
    serviceLabels:             Affinity;
    image:                     Image;
    serviceAccount:            CainjectorServiceAccount;
    securePort:                number;
    hostNetwork:               boolean;
    serviceType:               string;
    url:                       Affinity;
    networkPolicy:             NetworkPolicy;
}

export interface NessProbe {
    failureThreshold:    number;
    initialDelaySeconds: number;
    periodSeconds:       number;
    successThreshold:    number;
    timeoutSeconds:      number;
}

export interface NetworkPolicy {
    enabled: boolean;
    ingress: Ingress[];
    egress:  Egress[];
}

export interface Egress {
    ports: Port[];
    to:    To[];
}

export interface Port {
    port:     number;
    protocol: string;
}

export interface To {
    ipBlock: IpBlock;
}

export interface IpBlock {
    cidr: string;
}

export interface Ingress {
    from: To[];
}
