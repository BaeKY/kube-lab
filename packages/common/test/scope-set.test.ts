import { KubeDeploymentProps } from '@package/k8s-generated'
import { scope } from '../src/index'

describe('scope.set', () => {
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
    test('Origin에 바로 적용', () => {
        const expected = {
            metadata: {
                name: 'Updated'
            }
        }
        scope(props).set(expected)

        expect(props).toStrictEqual(expected)
    })

    test('일반적인 상황', () => {
        const expected = 'UPDATED!'
        scope(props).z('spec').z('template').z('metadata').z('name').set(expected)
        const actual = scope(props).z('spec').z('template').z('metadata').z('name').get()
        expect(actual).toStrictEqual(expected)
    })

    test('중간에 개체배열 - 1', () => {
        const expected = {
            name: 'added!',
            image: 'updated!'
        }
        scope(props).z('spec').z('template').z('spec').z('containers').z(1).set(expected)
        const actual = scope(props).z('spec').z('template').z('spec').z('containers').z(1).get()
        expect(actual).toStrictEqual(expected as any)
    })

    test('중간에 개체배열 - 2', () => {
        const expected = {
            name: 'added!',
            image: 'updated!'
        }
        scope(props).z('spec').z('template').z('spec').z('containers').z(0).set(expected)
        const actual = scope(props).z('spec').z('template').z('spec').z('containers').z(0).get()
        expect(actual).toStrictEqual(expected as any)
    })

    test('중간에 개체배열 - 3', () => {
        const expected = {
            name: 'added!',
            image: 'updated!'
        }
        scope(props).z('spec').z('template').z('spec').z('containers').z(2).set(expected)
        const actual = scope(props).z('spec').z('template').z('spec').z('containers').z(2).get()
        expect(actual).toStrictEqual(expected as any)
    })

    test('중간이 비어있는 경로 - 1', () => {
        const expected = 'UPDATED!'
        scope(props).z('spec').z('template').z('spec').z('initContainers').z(0).z('name').set(expected)
        const actual = scope(props).z('spec').z('template').z('spec').z('initContainers').z(0).z('name').get()
        expect(actual).toStrictEqual(expected)
    })

    test('중간이 비어있는 경로 - 2', () => {
        const expected = 'UPDATED!'
        scope(props).z('spec').z('template').z('metadata').z('annotations').z('hello').set(expected)
        const actual = scope(props).z('spec').z('template').z('metadata').z('annotations').z('hello').get()
        expect(actual).toStrictEqual(expected)
    })

    test('빈 배열을 할당한다면...?', () => {
        const expected = [] as any[]
        scope(props).z('metadata').z('ownerReferences').set(expected)

        const actual = scope(props).z('metadata').z('ownerReferences').get()
        expect(actual).toStrictEqual(expected)
    })
})
