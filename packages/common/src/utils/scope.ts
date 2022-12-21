import _ from 'lodash'
import { A } from 'ts-toolbelt'

export type _ObjectEditorCursor<T, K extends keyof T, O> = T[K] extends object | undefined
  ? _ObjectEditor<NonNullable<T[K]>, O>
  : T extends Array<unknown>
  ? _ObjectEditor<NonNullable<T[any]>, O>
  : _ObjectEditorCursorLast<T[K], O>

export interface _ObjectEditor<T, O = T> {
  z: <K extends keyof T>(key: T extends Array<unknown> ? number : K) => _ObjectEditorCursor<T, K, O>
  get: () => T
  getTarget: () => O
  /**
   * 현재 Scope 덮어씀
   * @param data
   * @returns
   */
  set: (data: T) => Pick<this, 'get' | 'getTarget'>
  merge: (data: T) => Pick<this, 'get' | 'getTarget'>
  remove: () => void
}

export type _ObjectEditorCursorLast<T, O = T> = Omit<_ObjectEditor<T, O>, 'z'>

export class ObjectEditor<T, O> implements _ObjectEditor<T, O> {
  public static init<T, O>(target: NonNullable<O>): Omit<ObjectEditor<T, O>, 'remove'> {
    return new ObjectEditor<T, O>(target)
  }

  private constructor(private readonly target: NonNullable<O>, private readonly keys: A.Key[] = []) {
    this.target = target
    this.keys = keys
  }

  public z<K extends keyof T>(key: T extends unknown[] ? number : K): _ObjectEditorCursor<T, K, O> {
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

  public set(data: T): Pick<this, 'get' | 'getTarget'> {
    if (this.isRoot) {
      const keys = Object.keys(this.target)
      keys.forEach((key) => {
        _.unset(this.target, key)
      })
      Object.assign(this.target, data)
    } else {
      _.set(this.target, this.keys, data)
    }
    return this
  }

  public merge(data: T): Pick<this, 'get' | 'getTarget'> {
    if (!this.isRoot && ['string', 'number'].some((type) => type === typeof data)) {
      this.set(data)
      return this
    }
    let currentData = this.get()
    if (data instanceof Array<unknown>) {
      currentData = _.concat(currentData ?? [], data) as any
    } else {
      _.mergeWith(currentData, data, (objValue: any, srcValue: any) => {
        if (_.isArray(objValue)) {
          return objValue.concat(srcValue)
        }
      })
    }
    this.set(currentData ?? data)
    return this
  }

  public remove(): void {
    _.unset(this.target, this.keys)
  }

  private get isRoot(): boolean {
    return this.keys == null || this.keys.length === 0
  }
}

export const scope = <T>(target: NonNullable<T>) => ObjectEditor.init<T, T>(target)
