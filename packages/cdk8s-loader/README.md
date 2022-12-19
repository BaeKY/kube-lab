# cdk8s-loader

## Introduction

- CDK8S를 Functional하게 써보고 싶어서 제작함

## Example

```Typescript
import { ChartLoader, ComponentLoader } from '@package/cdk8s-loader'
import { App } from 'cdk8s'

const bootstrap = () => {

  const sampleDeployment = new ComponentLoader('sample-deployment', {
    /* Deployment Config Here */
  })

  const sampleChartLoader = new ChartLoader('sample-id', {
    /* Chart Prop Here */
  })

  sampleChartLoader.addComponent(sampleDeployment)


  const app = new App()
  sampleChartLoader.load(app)

  return app
}

bootstrap().synth()
```
