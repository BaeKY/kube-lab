import { Chart, Helm, HelmProps as HelmPropsOrigin } from 'cdk8s'

interface HelmProps<V extends { [key: string]: string } = any> extends HelmPropsOrigin {
  readonly values?: V
}

export class HelmLoader<V extends { [key: string]: any } = any> {
  public constructor(public readonly id: string, private readonly props: HelmProps<V>) {}

  public load(chart: Chart): Helm {
    return new Helm(chart, this.id, this.props)
  }
}
