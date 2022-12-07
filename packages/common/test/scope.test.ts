import { Scope } from '../src/index'
import { KubeDeploymentProps } from '@package/k8s-generated'
import _ from 'lodash'

describe('Scope', () => {
  let sample: KubeDeploymentProps
  const now = new Date()
  beforeEach(() => {
    sample = {
      metadata: {
        annotations: {
          'kubernetes.io/test': 'hello'
        },
        creationTimestamp: now
      },
      spec: {
        replicas: 33,
        selector: {
          matchExpressions: []
        },
        template: {
          spec: {
            containers: [
              {
                name: 'redis',
                image: 'redis:6.2.6'
              }
            ]
          }
        }
      }
    } as KubeDeploymentProps
  })

  test('get', () => {
    {
      const getOrigin = Scope.init<KubeDeploymentProps>().get()
      expect(getOrigin(sample)).toMatchObject(sample)
    }
    {
      const getTemplateSpec = Scope.init<KubeDeploymentProps>().f('spec').f('template').f('spec').get()
      expect(getTemplateSpec(sample)).toMatchObject({
        containers: [
          {
            name: 'redis',
            image: 'redis:6.2.6'
          }
        ]
      })
    }
    {
      const scopeContainer_0 = Scope.init<KubeDeploymentProps>().f('spec').f('template').f('spec').f('containers').f(0)
      // console.log(scopeContainer_0.path)

      const actual = scopeContainer_0.get()(sample)

      expect(actual).toMatchObject({
        name: 'redis',
        image: 'redis:6.2.6'
      })
    }
    {
      const getContainerWrongIndex = Scope.init<KubeDeploymentProps>()
        .f('spec')
        .f('template')
        .f('spec')
        .f('containers')
        .f(1)
        .get()

      expect(getContainerWrongIndex(sample)).toBeUndefined()
    }
  })

  test('merge', () => {
    const scope = Scope.init<KubeDeploymentProps>()
    {
      let deeplyCopiedSample = _.cloneDeep(sample)
      const props = {
        annotations: {
          'kubernetes.io/component': 'app'
        }
      }

      scope.f('metadata').merge(props)(deeplyCopiedSample)
      const expected = {
        ...sample,
        metadata: {
          ...sample.metadata,
          annotations: {
            ...sample.metadata?.annotations,
            'kubernetes.io/component': 'app'
          }
        }
      }
      // console.log(JSON.stringify({ set1: deeplyCopiedSample }, null, 2))
      expect(deeplyCopiedSample).toMatchObject(expected)
      expect(deeplyCopiedSample.metadata).toMatchObject(props)
    }
    {
      let deeplyCopiedSample = _.cloneDeep(sample)
      const props = {
        'kubernetes.io/component': 'app'
      }

      scope.f('metadata').f('annotations').merge(props)(deeplyCopiedSample)
      const expected = {
        ...sample,
        metadata: {
          ...sample.metadata,
          annotations: {
            ...sample.metadata?.annotations,
            'kubernetes.io/component': 'app'
          }
        }
      }
      // console.log(JSON.stringify({ set2: deeplyCopiedSample }, null, 2))
      expect(deeplyCopiedSample).toMatchObject(expected)
      expect(deeplyCopiedSample.metadata?.annotations).toMatchObject(props)
    }

    {
      let deeplyCopiedSample = _.cloneDeep(sample)
      const props = {
        name: 'database',
        image: 'postgresql:15.0.1'
      }

      scope.f('spec').f('template').f('spec').f('containers').f(1).merge(props)(deeplyCopiedSample)
      const expected = {
        ...sample,
        spec: {
          ...sample.spec,
          template: {
            ...sample.spec?.template,
            spec: {
              ...sample.spec?.template?.spec,
              containers: [
                {
                  name: 'redis',
                  image: 'redis:6.2.6'
                },
                props
              ]
            }
          }
        }
      }
      // console.log(JSON.stringify({ set2: deeplyCopiedSample }, null, 2))
      expect(deeplyCopiedSample).toMatchObject(expected)
      expect(deeplyCopiedSample.spec?.template.spec?.containers[1]).toMatchObject(props)
    }
  })
})
