import { App, AppProps } from 'cdk8s'

export abstract class AbsApp extends App {
    public constructor(props?: AppProps) {
        super(props)
        this.loadChildren(props)
    }

    protected abstract loadChildren(props?: AppProps): void
}
