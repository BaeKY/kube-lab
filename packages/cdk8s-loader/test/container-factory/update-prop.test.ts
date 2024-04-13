import { Container, ContainerPort } from '@package/k8s-generated'
import { ContainerFactory } from '../../src/container-factory'

describe('container-factory', () => {
    let containerFactory: ContainerFactory

    const [name, image] = ['cache-container', 'redis:6.2.6']

    beforeEach(() => {
        containerFactory = new ContainerFactory({ name, image })
    })

    describe('updateProp', () => {
        test('Overwrite', () => {
            const ports = [
                {
                    containerPort: 6379
                }
            ]
            const livenessProbe = {
                httpGet: {
                    port: {
                        value: 80
                    }
                }
            }

            let actual = containerFactory.update('ports', ports).update('livenessProbe', livenessProbe).create()

            expect(actual).toMatchObject({
                name,
                image,
                ports,
                livenessProbe
            } as Container)

            const portsOverwrite: ContainerPort[] = [
                {
                    containerPort: 8883
                }
            ]
            const livenessProbeOverwrite = {
                httpGet: {
                    port: {
                        value: 81
                    },
                    host: 'hello-world.sample'
                }
            }

            actual = containerFactory.update('ports', portsOverwrite).update('livenessProbe', livenessProbeOverwrite).create()

            expect(actual).toStrictEqual({
                name,
                image,
                ports: [...ports, ...portsOverwrite],
                livenessProbe: livenessProbeOverwrite
            } as Container)
        })
    })
})
