import { EnvVar, KubeDeployment } from '@package/k8s-generated/src'
import { ComponentLoader, ConfigMapLoader } from '../src'

describe('component-loader', () => {
  test('deployment', () => {
    const name = 'deployment'
    const labels = {
      'kubernetes.io/component': 'app'
    }

    const dpLoader = new ComponentLoader(KubeDeployment, 'deployment-id', {
      metadata: {
        name,
        labels
      },
      spec: {} as any
    })

    const originProps = { ...dpLoader.props }

    const updateData = {
      metadata: {
        name,
        labels
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
        template: updateData
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

    console.log(JSON.stringify(expected, null, 2))

    expect(envVars).toMatchObject(expected)
  })
})
