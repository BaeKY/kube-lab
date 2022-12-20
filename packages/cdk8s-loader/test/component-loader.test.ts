import { EnvVar } from '@package/k8s-generated/src'
import { ConfigMapLoader, DeployLoader, SecretLoader } from '../src'
import _ from 'lodash'

describe('component-loader', () => {
  test('deployment', () => {
    const deploymentName = 'deployment'
    const labels = {
      'kubernetes.io/component': 'app',
      'kubernetes.io/name': deploymentName
    }

    const cmLoader = new ConfigMapLoader('config-map-id', {
      metadata: {
        name: 'my-configmap'
      },
      data: {
        NODE_ENV: 'production'
      }
    })

    const secretLoader = new SecretLoader('secret-id', {
      metadata: {
        name: 'my-secret'
      },
      type: 'kubernetes.io/tls',
      data: {
        'ca.pem': 'ca',
        'cert.pem': 'cert',
        'key.pem': 'key'
      }
    })

    const cmVolume = cmLoader.createVolume('configmap-volume')
    const secretVolume = secretLoader.createVolume('secret-tls')

    const dpLoader = new DeployLoader('deployment-id', {
      metadata: {
        name: deploymentName,
        labels
      },
      spec: {
        selector: {
          matchLabels: labels
        },
        replicas: 1,
        template: {
          metadata: {
            name: deploymentName,
            labels
          },
          spec: {
            volumes: [cmVolume, secretVolume],
            containers: [
              {
                name: 'main',
                image: 'sample-app:1.0.0',
                volumeMounts: [
                  cmVolume.createMount({
                    mountPath: '/app/config'
                  }),
                  secretVolume.createMount({
                    mountPath: '/tls'
                  })
                ],
                env: [
                  cmLoader.createEnvVar('NODE_ENV'),
                  {
                    name: 'TLS_CERT_PATH',
                    value: '/tls/cert.pem'
                  },
                  {
                    name: 'TLS_KEY_PATH',
                    value: '/tls/key.pem'
                  }
                ],
                ports: [
                  {
                    containerPort: 80,
                    name: 'http'
                  },
                  {
                    containerPort: 443,
                    name: 'https'
                  }
                ]
              }
            ]
          }
        }
      }
    })

    const originProps = _.cloneDeep(dpLoader.props)

    const updateData = {
      metadata: {
        name: 'UPDATED!!',
        labels: {
          is: 'UPDATED!!'
        }
      },
      spec: {
        containers: [
          {
            name: 'cache',
            image: 'redis:6.2.6'
          }
        ]
      }
    }

    dpLoader.propScope.z('spec').z('template').merge(updateData)

    expect(dpLoader.props).toMatchObject({
      ...originProps,
      spec: {
        ...originProps.spec,
        template: {
          metadata: {
            name: updateData.metadata.name,
            labels: {
              ...originProps.spec?.template?.metadata?.labels,
              ...updateData.metadata.labels
            }
          },
          spec: {
            ...originProps.spec?.template?.spec,
            containers: [...(originProps.spec?.template?.spec?.containers ?? []), ...updateData.spec.containers]
          }
        }
      }
    })
  })

  test('config-map', () => {
    const name = 'configmap'
    const data = {
      hello: 'world',
      NODE_ENV: 'production'
    }
    const cmLoader = new ConfigMapLoader('cm-loader', {
      metadata: {
        name
      },
      data
    })

    const propsData = cmLoader.getData<typeof data>()

    expect(propsData).toStrictEqual(data)
    expect(name).toEqual(cmLoader.propScope.z('metadata').z('name').get())

    const envVars = [
      cmLoader.createEnvVar<typeof data>('NODE_ENV'),
      cmLoader.createEnvVar<typeof data>('hello', {
        optional: true
      })
    ]

    expect(envVars).toMatchObject([
      {
        name: 'NODE_ENV',
        valueFrom: {
          configMapKeyRef: {
            key: 'NODE_ENV',
            name
          }
        }
      } as EnvVar,
      {
        name: 'hello',
        valueFrom: {
          configMapKeyRef: {
            key: 'hello',
            name,
            optional: true
          }
        }
      } as EnvVar
    ])

    const expected = cmLoader.createEnvVars<typeof data>([
      {
        name: 'NODE_ENV'
      },
      {
        name: 'hello',
        options: {
          optional: true
        }
      }
    ])

    expect(envVars).toMatchObject(expected)
  })
})
