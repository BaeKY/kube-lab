# helm-loader

## Introduction

- Helm Chart의 `value.yaml`을 참조하여 typescript의 type으로 만들어주기 위한 패키지다.
- Internally use `helm show values <chart-name>`.

## How to use?

1. `pnpm check-dependency`
2. `pnpm link:global`.
3. Go to package for using Helm. (ex - `<root>/chart/`).
4. `load-helm <helm-chart-name> <lang-for-get-type-inference>`.
5. `<helm-repo-name>/<helm-chart-name>/index.{ts,go,swift,or something..}` is generated on your location.
