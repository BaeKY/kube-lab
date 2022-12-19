export type PartialRecursive<T extends object> = {
  [k in keyof T]?: T[k] extends object ? PartialRecursive<T[k]> : T
}

export type NonNullableRecursive<T> = {
  [k in keyof T]-?: T[k] extends object ? NonNullableRecursive<T[k]> : T
}

export type UnaryFunc<P, T> = (prop: P) => T

export type OptionalPropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K
  }[keyof T],
  undefined
>

export type MandatoryPropertyOf<T extends object> = Pick<
  T,
  {
    [K in keyof T]: T extends Record<K, T[K]> ? K : never
  }[keyof T]
>
