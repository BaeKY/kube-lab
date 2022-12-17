import { KubeDeploymentProps, PodSpec } from '@package/k8s-generated'
import { scope } from '../src/index'

describe('scope-new', () => {
  const props: KubeDeploymentProps = {}
  beforeEach(() => {
    Object.assign(props, {
      metadata: {
        name: 'testing',
        annotations: {},
        labels: {
          'kubernetes.io/component': 'app'
        },
        namespace: 'sample'
      },
      spec: {
        selector: {
          matchExpressions: [
            {
              key: 'kubernetes.io/component',
              operator: 'in'
            }
          ]
        },
        template: {
          metadata: {
            name: 'testing',
            annotations: {},
            labels: {
              'kubernetes.io/component': 'app'
            },
            namespace: 'sample'
          },
          spec: {
            containers: [
              {
                name: 'main',
                image: 'forklift:1.0.0',
                env: [
                  {
                    name: 'NODE_ENV',
                    value: 'production'
                  }
                ],
                ports: [
                  {
                    name: 'mqtts',
                    protocol: 'tcp',
                    containerPort: 8883
                  },
                  {
                    name: 'mqtt',
                    protocol: 'tcp',
                    containerPort: 1883
                  }
                ]
              }
            ]
          }
        }
      }
    })
  })
  describe('merge', () => {
    test('Origin에 바로 적용', () => {
      const updateData = {
        metadata: {
          name: 'Updated'
        }
      }
      scope(props).merge(updateData)

      expect(props).toStrictEqual({ ...props, metadata: { ...props.metadata, ...updateData.metadata } })
    })

    test('set 처럼 사용하기', () => {
      const expected = 'UPDATED!'
      scope(props).z('spec').z('template').z('metadata').z('name').merge(expected)
      const actual = scope(props).z('spec').z('template').z('metadata').z('name').get()
      expect(actual).toStrictEqual(expected)
    })

    test('일반적인 상황 - 1', () => {
      const param = {
        containers: [
          {
            name: 'UPDATED!',
            image: 'UPDATED!'
          },
          {
            name: 'UPDATED2!',
            image: 'UPDATED2!'
          }
        ],
        affinity: {
          nodeAffinity: {
            preferredDuringSchedulingIgnoredDuringExecution: [
              {
                preference: {
                  matchFields: [
                    {
                      key: 'UPDATED!',
                      operator: 'UPDATED!'
                    }
                  ]
                }
              }
            ]
          }
        }
      } as PodSpec
      scope(props).z('spec').z('template').z('spec').merge(param)
      const actual = props
      expect(actual).toStrictEqual({
        ...actual,
        spec: {
          ...actual.spec,
          template: {
            ...actual.spec?.template,
            spec: {
              ...actual.spec?.template?.spec,
              affinity: param.affinity
            }
          }
        }
      })
    })
  })
})
