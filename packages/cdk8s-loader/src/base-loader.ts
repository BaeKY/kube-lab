import { scope } from '@package/common'
import { ApiObject, App, Chart, ChartProps, Include } from 'cdk8s'
import _ from 'lodash'
import { HelmLoader } from './loaders/helm-loader'

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
    private readonly children: Array<
        IComponentLoader | ((chart: Chart, props: ChartProps) => Include) | ((chartProps: ChartProps) => HelmLoader)
    > = new Array()

    public constructor(
        public readonly id: string,
        public readonly props: ChartProps
    ) {}

    public addComponent(component: IComponentLoader) {
        this.children.push(component)
        return this
    }

    public addInclude(includeFactory: (chart: Chart, props: typeof this.props) => Include) {
        this.children.push(includeFactory)
        return this
    }

    public addHelm(helmLoaderCreate: (chartProps: ChartProps) => HelmLoader) {
        this.children.push(helmLoaderCreate)
        return this
    }

    public load(app: App): Chart {
        const chart = new Chart(app, this.id, this.props)
        this.children.map((child) => {
            if (_.isFunction(child)) {
                const temp = child(chart, this.props)
                if (temp instanceof HelmLoader) {
                    temp.load(chart)
                }
            } else {
                child.load(chart)
            }
        })
        return chart
    }
}
