import { KubeDeployment } from '@package/k8s-generated/src'
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
        name: 'hello'
      },
      data
    })

    const propsData = cmLoader.getData<typeof data>()
  })
})
