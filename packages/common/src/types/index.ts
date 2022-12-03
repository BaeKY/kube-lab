export type PartialRecursive<T extends object> = {
  [k in keyof T]?: T[k] extends object ? PartialRecursive<T[k]> : T
}
