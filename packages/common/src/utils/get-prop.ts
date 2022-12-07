import _ from 'lodash'

export const prop =
  (...paths: (string | symbol | number)[]) =>
  (target: any) => {
    const obj = paths.reduce((sub, path) => {
      return sub[path] as any
    }, target)
    return obj
  }

export const alloc =
  (allocProp: any, ...keys: (string | symbol | number)[]) =>
  (target: object) => {
    const result = keys.reduceRight((sub, key) => {
      return {
        [key]: sub
      }
    }, allocProp)
    return _.merge(target, result)
  }
