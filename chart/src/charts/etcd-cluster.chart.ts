import { ChartLoader, ComponentLoader } from '@package/cdk8s-loader/src'
import { LoadingChart } from '../types'
import { KubeNamespace, KubeService, KubeStatefulSet, Quantity } from '@package/k8s-generated/src'
import { ContainerFactory } from '@package/cdk8s-loader/src/container-factory'

interface EtcdClusterProps {
  name: string
  labels: {
    [key: string]: string
  }
  replicas: number
}

export const etcdClusterChart: LoadingChart<{ etcdProps: EtcdClusterProps }> = (id, props) => {
  const { chartProps, etcdProps } = props

  const chartLoader = new ChartLoader(id, chartProps)

  const namespace = chartProps.namespace ?? 'dns'

  if (namespace !== 'default') {
    chartLoader.addComponent(
      new ComponentLoader(KubeNamespace, `${id}-ns`, {
        metadata: {
          name: namespace
        }
      })
    )
  }

  const { name, replicas, labels } = etcdProps
  const image = 'quay.io/coreos/etcd:latest'

  return chartLoader
    .addComponent(
      new ComponentLoader(KubeService, `${id}-service`, {
        metadata: {
          name,
          labels
        },
        spec: {
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
            }
          ],
          selector: labels,
          publishNotReadyAddresses: true
        }
      })
    )
    .addComponent(
      new ComponentLoader(KubeStatefulSet, `${id}-statefulset`, {
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
                      '  --listen-client-urls http://${IP}:2379,http://127.0.0.1:2379 \\',
                      '  --advertise-client-urls http://${HOSTNAME}.${SET_NAME}:2379 \\',
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
    )
}
