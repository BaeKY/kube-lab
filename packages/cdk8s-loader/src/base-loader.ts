import { scope } from '@package/common'
import { ApiObject, App, Chart, ChartProps, Include } from 'cdk8s'

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
  private readonly components: Map<string, Component> = new Map()
  private readonly includeFactories: Array<(chart: Chart, props: ChartProps) => Include> = []

  public constructor(public readonly id: string, public readonly props: ChartProps) {}

  public addComponent(component: Component) {
    this.components.set(component.id, component)
    return this
  }

  public addInclude(includeFactory: (chart: Chart, props: typeof this.props) => Include) {
    this.includeFactories.push(includeFactory)
    return this
  }

  public load(app: App): Chart {
    const chart = new Chart(app, this.id, this.props)
    let prevApiObject: ApiObject | null = null
    this.components.forEach((component, id) => {
      const apiObject = component.load(chart)
      if (prevApiObject != null) {
        apiObject.addDependency(prevApiObject)
      }
      prevApiObject = apiObject
    })
    this.includeFactories.forEach((includeFactory) => includeFactory(chart, this.props))
    return chart
  }
}
