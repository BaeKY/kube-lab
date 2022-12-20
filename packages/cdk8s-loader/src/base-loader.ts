import { scope } from '@package/common'
import { ApiObject, App, Chart, ChartProps, Include } from 'cdk8s'
import { HelmLoader } from './loaders'

interface IComponentLoader<T extends typeof ApiObject = any> {
  readonly id: string
  readonly props: ConstructorParameters<T>[2]
  load(chart: Chart): InstanceType<typeof ApiObject>
}

export class ComponentLoader<T extends typeof ApiObject> implements IComponentLoader<T> {
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
  private readonly components: Map<string, IComponentLoader> = new Map()
  private readonly includeFactories: Array<(chart: Chart, props: ChartProps) => Include> = []
  private readonly helmLoaderCreators: Array<(chartProps: ChartProps) => HelmLoader> = []

  public constructor(public readonly id: string, public readonly props: ChartProps) {}

  public addComponent(component: IComponentLoader) {
    this.components.set(component.id, component)
    return this
  }

  public addInclude(includeFactory: (chart: Chart, props: typeof this.props) => Include) {
    this.includeFactories.push(includeFactory)
    return this
  }

  public addHelm(helmLoaderCreate: (chartProps: ChartProps) => HelmLoader) {
    this.helmLoaderCreators.push(helmLoaderCreate)
    return this
  }

  public load(app: App): Chart {
    const chart = new Chart(app, this.id, this.props)
    let prevApiObject: ApiObject | null = null
    this.components.forEach((componentLoader) => {
      const apiObject = componentLoader.load(chart)
      if (prevApiObject != null) {
        apiObject.addDependency(prevApiObject)
      }
      prevApiObject = apiObject
    })
    this.helmLoaderCreators.forEach((helmLoaderCreate) => {
      helmLoaderCreate(this.props).load(chart)
    })
    this.includeFactories.forEach((includeFactory) => includeFactory(chart, this.props))
    return chart
  }
}
