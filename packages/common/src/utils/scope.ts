import _ from 'lodash'
import { A } from 'ts-toolbelt'
import { alloc } from './get-prop'

type _CursorNext<T, K extends keyof T, O> = T[K] extends object | undefined
  ? _Cursor<NonNullable<T[K]>, O>
  : T extends Array<unknown>
  ? _Cursor<NonNullable<T[any]>, O>
  : _CursorLast<T[K], O>

interface _Cursor<T, O = T> {
  z: <K extends keyof T>(key: T extends Array<unknown> ? number : K) => _CursorNext<T, K, O>
  get: () => T
  getTarget: () => O
  /**
   * 현재 Scope 덮어씀
   * @param data
   * @returns
   */
  set: (data: T) => void
  merge: (data: T) => void
  remove: () => void
}

type _CursorLast<T, O = T> = Omit<_Cursor<T, O>, 'z'>

class ObjectEditor<T, O> implements _Cursor<T, O> {
  public static init<T, O>(target: NonNullable<O>): Omit<ObjectEditor<T, O>, 'remove'> {
    return new ObjectEditor<T, O>(target)
  }

  private constructor(private readonly target: NonNullable<O>, private readonly keys: A.Key[] = []) {
    this.target = target
    this.keys = keys
  }

  public z<K extends keyof T>(key: T extends unknown[] ? number : K): _CursorNext<T, K, O> {
    return new ObjectEditor<any, any>(this.target, [...this.keys, key]) as any
  }

  public get(): T {
    if (this.isRoot) {
      return this.getTarget() as any
    }
    return _.get(this.target, this.keys)
  }

  public getTarget(): O {
    return _.cloneDeep(this.target)
  }

  public set(data: T): void {
    if (this.isRoot) {
      const keys = Object.keys(this.target)
      keys.forEach((key) => {
        _.unset(this.target, key)
      })
      Object.assign(this.target, data)
      return
    }
    _.set(this.target, this.keys, data)
  }

  public merge(data: T): void {
    if (!this.isRoot && ['string', 'number'].some((type) => type === typeof data)) {
      this.set(data)
      return
    }
    const mergeTargetParam = _.merge(this.get(), data)
    this.set(mergeTargetParam)
  }

  public remove(): void {
    _.unset(this.target, this.keys)
  }

  private get isRoot(): boolean {
    return this.keys == null || this.keys.length === 0
  }
}

export const scope = <T>(target: NonNullable<T>) => ObjectEditor.init<T, T>(target)
