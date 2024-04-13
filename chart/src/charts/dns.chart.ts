import { AbsChart, HelmProps } from '@package/cdk8s-loader'
import { ContainerFactory } from '@package/cdk8s-loader/src/container-factory'
import { PartialRecursive, scope } from '@package/common'
import { KubeService, KubeStatefulSet, Quantity } from '@package/k8s-generated/generated'
import { ChartProps, Helm } from 'cdk8s'
import { CorednsHelmParam, ExternalDnsHelmParam } from '../types'

interface DnsChartProps extends ChartProps {
    coreDns: Omit<HelmProps<PartialRecursive<CorednsHelmParam>>, 'chart'>
    externalDns: Omit<HelmProps<PartialRecursive<ExternalDnsHelmParam>>, 'chart'>
    etcd: EtcdClusterProps
}

interface EtcdClusterProps {
    name: string
    labels: {
        [key: string]: string
    }
    replicas: number
    serviceType?: 'ClusterIP' | 'LoadBalancer' | 'NodePort'
}

export class DnsChart extends AbsChart<DnsChartProps> {
    protected loadChildren(id: string, props: DnsChartProps): void {
        const { coreDns, etcd, externalDns, namespace } = props
        {
            const { name, labels, replicas, serviceType } = etcd
            const image = 'quay.io/coreos/etcd:latest'
            const _etcdComponent = {
                service: new KubeService(this, `${id}-etcd-svc`, {
                    metadata: {
                        name,
                        labels
                    },
                    spec: {
                        type: serviceType,
                        ports: [
                            {
                                name: 'etcd-client',
                                port: 2379,
                                protocol: 'TCP'
                            },
                            {
                                name: 'etcd-peer',
                                port: 2380,
                                protocol: 'TCP'
                            },
                            {
                                name: 'etcd-legacy',
                                port: 4001,
                                protocol: 'TCP'
                            }
                        ],
                        selector: labels,
                        publishNotReadyAddresses: true
                    }
                }),
                statefulset: new KubeStatefulSet(this, `${id}-etcd-sts`, {
                    metadata: {
                        name,
                        labels
                    },
                    spec: {
                        serviceName: name,
                        replicas,
                        selector: {
                            matchLabels: labels
                        },
                        template: {
                            metadata: {
                                name,
                                labels
                            },
                            spec: {
                                containers: [
                                    new ContainerFactory({
                                        name,
                                        image,
                                        ports: [
                                            {
                                                containerPort: 2379,
                                                name: 'client'
                                            },
                                            {
                                                containerPort: 2380,
                                                name: 'peer'
                                            },
                                            {
                                                containerPort: 4001,
                                                name: 'legacy'
                                            }
                                        ],
                                        env: [
                                            {
                                                name: 'CLUSTER_SIZE',
                                                value: replicas.toString()
                                            },
                                            {
                                                name: 'SET_NAME',
                                                value: name
                                            }
                                        ],
                                        command: [
                                            '/bin/sh',
                                            '-c',
                                            [
                                                'IP=$(hostname -i)',
                                                'PEERS=""',
                                                'for i in $(seq 0 $((${CLUSTER_SIZE} - 1))); do',
                                                '  PEERS="${PEERS}${PEERS:+,}${SET_NAME}-${i}=http://${SET_NAME}-${i}.${SET_NAME}:2380"',
                                                'done',
                                                '',
                                                'exec /usr/local/bin/etcd --name ${HOSTNAME} \\',
                                                '  --listen-peer-urls http://${IP}:2380 \\',
                                                '  --listen-client-urls http://${IP}:2379,http://127.0.0.1:2379,http://${IP}:4001,http://127.0.0.1:4001 \\',
                                                '  --advertise-client-urls http://${HOSTNAME}.${SET_NAME}:2379,http://${HOSTNAME}.${SET_NAME}:4001 \\',
                                                '  --initial-advertise-peer-urls http://${HOSTNAME}.${SET_NAME}:2380 \\',
                                                '  --initial-cluster-token etcd-cluster-1 \\',
                                                '  --initial-cluster ${PEERS} \\',
                                                '  --initial-cluster-state new \\',
                                                '  --data-dir /var/run/etcd/default.etcd'
                                            ].join('\n')
                                        ],
                                        volumeMounts: [
                                            {
                                                name: 'datadir',
                                                mountPath: '/var/run/etcd'
                                            }
                                        ]
                                    }).create()
                                ]
                            }
                        },
                        volumeClaimTemplates: [
                            {
                                metadata: {
                                    name: 'datadir',
                                    labels
                                },
                                spec: {
                                    accessModes: ['ReadWriteOnce'],
                                    resources: {
                                        requests: {
                                            storage: Quantity.fromString('1G')
                                        }
                                    }
                                }
                            }
                        ]
                    }
                })
            }
        }

        const scopeCoreDnsHelmProps = scope<HelmProps<CorednsHelmParam>>({
            chart: 'coredns/coredns',
            namespace
        }).merge(coreDns as any)
        new Helm(this, `${id}-coredns`, scopeCoreDnsHelmProps.get())

        const scopeExternalDnsHelmProps = scope<HelmProps<PartialRecursive<ExternalDnsHelmParam>>>({
            chart: 'external-dns/external-dns',
            namespace
        }).merge(externalDns as any)
        new Helm(this, `${id}-external-dns`, scopeExternalDnsHelmProps.get())
    }
}
