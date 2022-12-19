import { scope } from '@package/common'
import { ApiObject, App, Chart, ChartProps } from 'cdk8s'

interface Component<T extends typeof ApiObject = any> {
  readonly id: string
  readonly props: ConstructorParameters<T>[2]
  load(chart: Chart): InstanceType<typeof ApiObject>
}

export class ComponentLoader<T extends typeof ApiObject> implements Component<T> {
  public constructor(
    private readonly cls: T,
    public readonly id: string,
    public readonly props: NonNullable<ConstructorParameters<T>[2]>
  ) {}

  public load(chart: Chart): InstanceType<T> {
    return new this.cls(chart, this.id, this.props) as any
  }

  public get propScope() {
    return scope<NonNullable<typeof this.props>>(this.props)
  }
}

export class ChartLoader {
  readonly components: Map<string, Component> = new Map()

  public constructor(public readonly id: string, public readonly props: ChartProps) {}

  public addComponent(component: Component) {
    this.components.set(component.id, component)
    return this
  }

  public load(chart: App): Chart {
    return new Chart(chart, this.id, this.props)
  }
}
