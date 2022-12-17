# common

## `utils/scope.ts`

- __테스트코드 참조__
- `set`, `merge` 함수는 원본 object를 바꿔버리므로 조심해서 사용해야함
- 아래와 같이 사용 가능

  ```Typescript
  import { scope } from '@package/common'
  import { KubeDeploymentProps } from '@package/k8s-generated'

  const props: KubeDeploymentProps = { /* blahblahblah */ }

  const templateMetadataName = 'sample-app'

  // scope는 원본 object를 바꿔버리므로 조심해서 사용할것!
  scope(props).z('spec').z('template').z('metadata').z('name').set(templateMetadataName)
  ```
