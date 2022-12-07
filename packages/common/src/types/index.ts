export type PartialRecursive<T extends object> = {
  [k in keyof T]?: T[k] extends object ? PartialRecursive<T[k]> : T
}

export type NonNullableRecursive<T> = {
  [k in keyof T]-?: T[k] extends object ? NonNullableRecursive<T[k]> : T
}

export type UnaryFunc<P, T> = (prop: P) => T
