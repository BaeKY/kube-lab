export interface HarborHelmParam {
    expose:                  Expose;
    externalURL:             string;
    internalTLS:             InternalTls;
    ipFamily:                { [key: string]: IpFamily };
    persistence:             Persistence;
    imagePullPolicy:         string;
    imagePullSecrets:        null;
    updateStrategy:          UpdateStrategy;
    logLevel:                string;
    harborAdminPassword:     string;
    caSecretName:            string;
    secretKey:               string;
    existingSecretSecretKey: string;
    proxy:                   Proxy;
    enableMigrateHelmHook:   boolean;
    nginx:                   ExporterClass;
    portal:                  ExporterClass;
    core:                    HarborHelmParamCore;
    jobservice:              HarborHelmParamJobservice;
    registry:                Registry;
    chartmuseum:             ExporterClass;
    trivy:                   Trivy;
    notary:                  Notary;
    database:                Database;
    redis:                   Redis;
    exporter:                ExporterClass;
    metrics:                 Metrics;
    trace:                   Trace;
    cache:                   Cache;
}

export interface Cache {
    enabled:     boolean;
    expireHours: number;
}

export interface ExporterClass {
    enabled?:                     boolean;
    serviceAccountName:           string;
    automountServiceAccountToken: boolean;
    absoluteUrl?:                 boolean;
    image:                        Image;
    replicas?:                    number;
    revisionHistoryLimit?:        number;
    nodeSelector:                 Affinity;
    tolerations:                  any[];
    affinity:                     Affinity;
    podAnnotations?:              Affinity;
    priorityClassName:            null;
    indexLimit?:                  number;
    cacheDuration?:               number;
    cacheCleanInterval?:          number;
}

export interface Affinity {
}

export interface Image {
    repository: string;
    tag:        Tag;
}

export enum Tag {
    V270 = 'v2.7.0',
}

export interface HarborHelmParamCore {
    image:                          Image;
    serviceAccountName:             string;
    automountServiceAccountToken:   boolean;
    replicas:                       number;
    revisionHistoryLimit:           number;
    startupProbe:                   StartupProbe;
    nodeSelector:                   Affinity;
    tolerations:                    any[];
    affinity:                       Affinity;
    podAnnotations:                 Affinity;
    serviceAnnotations:             Affinity;
    secret:                         string;
    secretName:                     string;
    xsrfKey:                        string;
    priorityClassName:              null;
    artifactPullAsyncFlushDuration: null;
    gdpr:                           Gdpr;
}

export interface Gdpr {
    deleteUser: boolean;
}

export interface StartupProbe {
    enabled:             boolean;
    initialDelaySeconds: number;
}

export interface Database {
    type:           string;
    internal:       Internal;
    external:       DatabaseExternal;
    maxIdleConns:   number;
    maxOpenConns:   number;
    podAnnotations: Affinity;
}

export interface DatabaseExternal {
    host:                 string;
    port:                 string;
    username:             string;
    password:             string;
    coreDatabase:         string;
    notaryServerDatabase: string;
    notarySignerDatabase: string;
    existingSecret:       string;
    sslmode:              string;
}

export interface Internal {
    serviceAccountName:           string;
    automountServiceAccountToken: boolean;
    image:                        Image;
    password:                     string;
    shmSizeLimit:                 string;
    livenessProbe:                NessProbe;
    readinessProbe:               NessProbe;
    nodeSelector:                 Affinity;
    tolerations:                  any[];
    affinity:                     Affinity;
    priorityClassName:            null;
    initContainer:                InitContainer;
}

export interface InitContainer {
    migrator:    Affinity;
    permissions: Affinity;
}

export interface NessProbe {
    timeoutSeconds: number;
}

export interface Expose {
    type:         string;
    tls:          Tls;
    ingress:      Ingress;
    clusterIP:    ClusterIp;
    nodePort:     NodePort;
    loadBalancer: LoadBalancer;
}

export interface ClusterIp {
    name:        string;
    annotations: Affinity;
    ports:       ClusterIpPorts;
}

export interface ClusterIpPorts {
    httpPort:   number;
    httpsPort:  number;
    notaryPort: number;
}

export interface Ingress {
    hosts:               Hosts;
    controller:          string;
    kubeVersionOverride: string;
    className:           string;
    annotations:         Annotations;
    notary:              Harbor;
    harbor:              Harbor;
}

export interface Annotations {
    'ingress.kubernetes.io/ssl-redirect':          string;
    'ingress.kubernetes.io/proxy-body-size':       string;
    'nginx.ingress.kubernetes.io/ssl-redirect':    string;
    'nginx.ingress.kubernetes.io/proxy-body-size': string;
}

export interface Harbor {
    annotations: Affinity;
    labels:      Affinity;
}

export interface Hosts {
    core:   string;
    notary: string;
}

export interface LoadBalancer {
    name:         string;
    IP:           string;
    ports:        ClusterIpPorts;
    annotations:  Affinity;
    sourceRanges: any[];
}

export interface NodePort {
    name:  string;
    ports: NodePortPorts;
}

export interface NodePortPorts {
    http:   Http;
    https:  Http;
    notary: Http;
}

export interface Http {
    port:     number;
    nodePort: number;
}

export interface Tls {
    enabled:    boolean;
    certSource: string;
    auto:       Auto;
    secret:     Secret;
}

export interface Auto {
    commonName: string;
}

export interface Secret {
    secretName:       string;
    notarySecretName: string;
}

export interface InternalTls {
    enabled:     boolean;
    certSource:  string;
    trustCa:     string;
    core:        CoreClass;
    jobservice:  CoreClass;
    registry:    CoreClass;
    portal:      CoreClass;
    chartmuseum: CoreClass;
    trivy:       CoreClass;
}

export interface CoreClass {
    secretName: string;
    crt:        string;
    key:        string;
}

export interface IpFamily {
    enabled: boolean;
}

export interface HarborHelmParamJobservice {
    image:                        Image;
    replicas:                     number;
    revisionHistoryLimit:         number;
    serviceAccountName:           string;
    automountServiceAccountToken: boolean;
    maxJobWorkers:                number;
    jobLoggers:                   string[];
    loggerSweeperDuration:        number;
    nodeSelector:                 Affinity;
    tolerations:                  any[];
    affinity:                     Affinity;
    podAnnotations:               Affinity;
    secret:                       string;
    priorityClassName:            null;
}

export interface Metrics {
    enabled:        boolean;
    core:           JobserviceClass;
    registry:       JobserviceClass;
    jobservice:     JobserviceClass;
    exporter:       JobserviceClass;
    serviceMonitor: ServiceMonitor;
}

export interface JobserviceClass {
    path: string;
    port: number;
}

export interface ServiceMonitor {
    enabled:           boolean;
    additionalLabels:  Affinity;
    interval:          string;
    metricRelabelings: any[];
    relabelings:       any[];
}

export interface Notary {
    enabled:            boolean;
    server:             ExporterClass;
    serviceAnnotations: Affinity;
    signer:             ExporterClass;
    secretName:         string;
}

export interface Persistence {
    enabled:               boolean;
    resourcePolicy:        string;
    persistentVolumeClaim: PersistentVolumeClaim;
    imageChartStorage:     ImageChartStorage;
}

export interface ImageChartStorage {
    disableredirect: boolean;
    type:            string;
    filesystem:      Filesystem;
    azure:           Azure;
    gcs:             Gcs;
    s3:              S3;
    swift:           Swift;
    oss:             Oss;
}

export interface Azure {
    accountname:    string;
    accountkey:     string;
    container:      string;
    existingSecret: string;
}

export interface Filesystem {
    rootdirectory: string;
}

export interface Gcs {
    bucket:              string;
    encodedkey:          string;
    existingSecret:      string;
    useWorkloadIdentity: boolean;
}

export interface Oss {
    accesskeyid:     string;
    accesskeysecret: string;
    region:          string;
    bucket:          string;
}

export interface S3 {
    region: string;
    bucket: string;
}

export interface Swift {
    authurl:   string;
    username:  string;
    password:  string;
    container: string;
}

export interface PersistentVolumeClaim {
    registry:    DatabaseClass;
    chartmuseum: DatabaseClass;
    jobservice:  PersistentVolumeClaimJobservice;
    database:    DatabaseClass;
    redis:       DatabaseClass;
    trivy:       DatabaseClass;
}

export interface DatabaseClass {
    existingClaim: string;
    storageClass:  string;
    subPath:       string;
    accessMode:    string;
    size:          string;
    annotations:   Affinity;
}

export interface PersistentVolumeClaimJobservice {
    jobLog:          DatabaseClass;
    scanDataExports: DatabaseClass;
}

export interface Proxy {
    httpProxy:  null;
    httpsProxy: null;
    noProxy:    string;
    components: string[];
}

export interface Redis {
    type:           string;
    internal:       ExporterClass;
    external:       RedisExternal;
    podAnnotations: Affinity;
}

export interface RedisExternal {
    addr:                     string;
    sentinelMasterSet:        string;
    coreDatabaseIndex:        string;
    jobserviceDatabaseIndex:  string;
    registryDatabaseIndex:    string;
    chartmuseumDatabaseIndex: string;
    trivyAdapterIndex:        string;
    password:                 string;
    existingSecret:           string;
}

export interface Registry {
    serviceAccountName:           string;
    automountServiceAccountToken: boolean;
    registry:                     Controller;
    controller:                   Controller;
    replicas:                     number;
    revisionHistoryLimit:         number;
    nodeSelector:                 Affinity;
    tolerations:                  any[];
    affinity:                     Affinity;
    podAnnotations:               Affinity;
    priorityClassName:            null;
    secret:                       string;
    relativeurls:                 boolean;
    credentials:                  Credentials;
    middleware:                   Middleware;
    upload_purging:               UploadPurging;
}

export interface Controller {
    image: Image;
}

export interface Credentials {
    username:       string;
    password:       string;
    existingSecret: string;
}

export interface Middleware {
    enabled:    boolean;
    type:       string;
    cloudFront: CloudFront;
}

export interface CloudFront {
    baseurl:          string;
    keypairid:        string;
    duration:         string;
    ipfilteredby:     string;
    privateKeySecret: string;
}

export interface UploadPurging {
    enabled:  boolean;
    age:      string;
    interval: string;
    dryrun:   boolean;
}

export interface Trace {
    enabled:     boolean;
    provider:    string;
    sample_rate: number;
    jaeger:      Jaeger;
    otel:        Otel;
}

export interface Jaeger {
    endpoint: string;
}

export interface Otel {
    endpoint:    string;
    url_path:    string;
    compression: boolean;
    insecure:    boolean;
    timeout:     number;
}

export interface Trivy {
    enabled:                      boolean;
    image:                        Image;
    serviceAccountName:           string;
    automountServiceAccountToken: boolean;
    replicas:                     number;
    debugMode:                    boolean;
    vulnType:                     string;
    severity:                     string;
    ignoreUnfixed:                boolean;
    insecure:                     boolean;
    gitHubToken:                  string;
    skipUpdate:                   boolean;
    offlineScan:                  boolean;
    securityCheck:                string;
    timeout:                      string;
    resources:                    Resources;
    nodeSelector:                 Affinity;
    tolerations:                  any[];
    affinity:                     Affinity;
    podAnnotations:               Affinity;
    priorityClassName:            null;
}

export interface Resources {
    requests: Requests;
    limits:   Limits;
}

export interface Limits {
    cpu:    number;
    memory: string;
}

export interface Requests {
    cpu:    string;
    memory: string;
}

export interface UpdateStrategy {
    type: string;
}
