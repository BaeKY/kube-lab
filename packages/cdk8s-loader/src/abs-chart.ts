import { Chart, ChartProps } from 'cdk8s'
import { Construct } from 'constructs'

export abstract class AbsChart<T extends ChartProps = ChartProps> extends Chart {
    public constructor(scope: Construct, id: string, props: T) {
        super(scope, id, {
            labels: props.labels,
            namespace: props.namespace
        })
        this.loadChildren(id, props)
    }

    protected abstract loadChildren(id: string, props: T): void
}
