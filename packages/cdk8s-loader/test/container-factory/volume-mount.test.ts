import { ConfigMapLoader, SecretLoader } from '../../src'
import { ContainerFactory } from '../../src/container-factory'

describe('container-factory', () => {
    let containerFactory: ContainerFactory

    const [name, image] = ['cache-container', 'redis:6.2.6']

    beforeEach(() => {
        containerFactory = new ContainerFactory({ name, image })
    })

    describe('volume-mounts', () => {
        test('from config-map volume', () => {
            const cm = new ConfigMapLoader('my-cm', {
                data: {
                    'index.js': 'your-logic-here'
                }
            })

            const cmVolume = cm.createVolume('config-map')

            const actual = containerFactory
                .addVolumeMounts(cmVolume, [
                    {
                        mountPath: '/app/dist'
                    }
                ])
                .create()

            expect(actual).toStrictEqual({
                name,
                image,
                volumeMounts: [
                    {
                        name: 'config-map',
                        mountPath: '/app/dist'
                    }
                ]
            })
        })

        test('from secret-volume', () => {
            const secret = new SecretLoader('my-secret', {
                data: {
                    'index.js': Buffer.from('your-logic-here').toString('base64')
                },
                type: 'Opaque'
            })

            const secretVolume = secret.createVolume('secret')

            const actual = containerFactory
                .addVolumeMounts(secretVolume, [
                    {
                        mountPath: '/app/dist/secrets'
                    }
                ])
                .addVolumeMounts(secretVolume, [
                    {
                        mountPath: '/app/dist/secrets/new'
                    }
                ])
                .create()
            expect(actual).toStrictEqual({
                name,
                image,
                volumeMounts: [
                    {
                        name: secretVolume.name,
                        mountPath: '/app/dist/secrets'
                    },
                    {
                        name: secretVolume.name,
                        mountPath: '/app/dist/secrets/new'
                    }
                ]
            })
        })
    })
})
