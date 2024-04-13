import { ChartLoader } from '@package/cdk8s-loader/src'
import { ChartProps } from 'cdk8s'

export type LoadingChart<T extends { [key: string]: any }> = (
    id: string,
    props: { chartProps: ChartProps } & T
) => ChartLoader
