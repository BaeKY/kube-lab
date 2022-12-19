# container-builder

## Overview

- k8s Deployment에 들어가는 spec.template.spec.containers 항목에 가독성 향상, 코드재사용성 향상을 위해 만들었음
- 아래와 같이 사용할것

  ```Typescript
  import { ContainerFactory } from '@package/cdk8s-loader'

  const containerFactory = new ContainerFactory('main', 'nginx')

  containerFactory.setProp('')
  ```
