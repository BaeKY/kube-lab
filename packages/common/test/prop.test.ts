import { prop, Scope } from '../src/index'
import { KubeDeploymentProps } from '@package/k8s-generated'

describe('Scope', () => {
  test('prop', () => {
    const sample = {
      spec: {
        replicas: 33,
        template: {
          spec: {
            containers: [
              {
                name: 'redis',
                image: ''
              }
            ]
          }
        }
      }
    } as KubeDeploymentProps
    const actual = prop('spec', 'template', 'spec')(sample)

    expect(actual).toMatchObject({
      containers: [
        {
          name: 'redis',
          image: ''
        }
      ]
    })
  })
})
