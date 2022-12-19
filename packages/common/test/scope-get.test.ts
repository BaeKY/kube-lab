import { KubeDeploymentProps } from '@package/k8s-generated'
import { scope } from '../src/index'

describe('scope.get', () => {
  const props: KubeDeploymentProps = {
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
  }
  test('origin 바로가져옴', () => {
    const actual = scope(props).get()
    expect(actual).toMatchObject(props)
  })

  test('normal case', () => {
    const actual = scope(props).z('spec').z('template').z('metadata').z('name').get()
    const expected = props.spec?.template?.metadata?.name
    expect(actual).toEqual(expected)
  })

  test('중간이 개체배열이면?', () => {
    const actual = scope(props).z('spec').z('template').z('spec').z('containers').z(0).get()
    const expected = props?.spec?.template?.spec?.containers[0]
    expect(actual).toMatchObject(expected as any)
  })

  test('중간에 비어있는 경로면?', () => {
    const actual = scope(props).z('spec').z('template').z('spec').z('initContainers').z(0).z('name').get()
    const expected = undefined
    expect(actual).toEqual(expected)
  })
})
