import _ from 'lodash'
import { UnaryFunc } from '../types'
import { alloc, prop } from './get-prop'

export interface IScope<T, O = T> {
  readonly path: (T extends any[] ? number : keyof T)[]
  f<K extends keyof T>(
    key: T extends Array<any> ? number : K
  ): T[K] extends object | undefined ? IScope<NonNullable<T[K]>, O> : ILeafScope<T[K], O>
  set(props?: T): UnaryFunc<O, T>
  get(): UnaryFunc<O, T>
}

interface ILeafScope<T, O = T> extends Omit<IScope<T, O>, 'find'> {}

export class Scope<T, O = T> implements IScope<T, O> {
  public static init<T, O = T>(): Omit<IScope<T, O>, 'set'> {
    return {
      f(key) {
        return new Scope(this as any, key) as any
      },
      get() {
        return (props) => props as any
      },
      path: []
    }
  }

  private constructor(private readonly parent: any, private readonly key: T extends any[] ? number : keyof T) {
    this.parent = parent
    this.key = key
  }

  public f<K extends keyof T>(
    key: T extends any[] ? number : K
  ): T[K] extends object | undefined ? IScope<NonNullable<T[K]>, O> : ILeafScope<T[K], O> {
    const child = new Scope<T[K], O>(this as any, key as any)
    return child as any
  }

  public set(data: T): UnaryFunc<O, T> {
    return (props) => {
      const oldOrigin = this.get()(props)
      const path = this.path

      alloc(data, ...path)(props as any)

      return oldOrigin
    }
  }

  public get(): UnaryFunc<O, T> {
    const keys = this.path
    return (props: O): T => prop(...keys)(props)
  }

  public get path(): typeof this.key[] {
    const path = [this.key]
    const parent = this.parent
    path.unshift(...parent.path)
    return path
  }
}
