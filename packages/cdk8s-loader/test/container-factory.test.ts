import { Container, ContainerPort } from '@package/k8s-generated/src'
import { ContainerFactory } from '../src/container-builder'

describe('container-factory', () => {
  let containerFactory: ContainerFactory

  const [name, image] = ['cache-container', 'redis:6.2.6']

  beforeEach(() => {
    containerFactory = new ContainerFactory(name, image)
  })

  describe('setProp', () => {
    test('Normal Case - 1', () => {
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
      let actual = containerFactory.setProp('ports', ports).setProp('livenessProbe', livenessProbe).create()

      expect(actual).toStrictEqual({
        name,
        image,
        ports,
        livenessProbe
      } as Container)
    })

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
      let actual = containerFactory.setProp('ports', ports).setProp('livenessProbe', livenessProbe).create()

      expect(actual).toStrictEqual({
        name,
        image,
        ports,
        livenessProbe
      } as Container)

      const portsOverwrite: ContainerPort[] = []
      const livenessProbeOverwrite = {
        httpGet: {
          port: {
            value: 81
          },
          host: 'hello-world.sample'
        }
      }

      actual = containerFactory
        .setProp('ports', portsOverwrite)
        .setProp('livenessProbe', livenessProbeOverwrite)
        .create()

      expect(actual).toStrictEqual({
        name,
        image,
        ports: portsOverwrite,
        livenessProbe: livenessProbeOverwrite
      } as Container)
    })
  })
  describe('updateProp', () => {
    test('Normal', () => {
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

      const actual = containerFactory.updateProp('ports', ports).updateProp('livenessProbe', livenessProbe).create()

      expect(actual).toMatchObject({
        name,
        image,
        ports,
        livenessProbe
      } as Container)
    })
  })
})
