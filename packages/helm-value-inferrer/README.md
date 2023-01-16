# helm-loader

## Introduction

- Generate schema type of Helm Chart's `value.yaml` to other languages.(typescript, golang, swift, etc...)
  - Internally use `helm show values <chart-name>`.

## How to use?

1. `pnpm check-dependency`
2. `pnpm link:global`.
3. Go to package for using Helm. (ex - `<root>/chart/`).
4. `load-helm <helm-chart-name> <lang-for-get-type-inference>`.
5. `<helm-repo-name>/<helm-chart-name>/index.{ts,go,swift,or something..}` is generated on your location.
