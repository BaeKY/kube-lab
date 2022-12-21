#!/bin/bash

function load_helm_chart_values_as_json() {
  local chart=$1
  echo "$(helm show values $chart | yq '.' -o json)"
}

function generate_inferrence() {
  local lang=$1
  local chart=$2
  local helm_values_json=$3
  local destDir=$4

  local temp=(`echo $chart | sed -r 's/\// /g'`)
  local top_level=$(echo ${temp[1]} | sed -r 's/-/_/g' | perl -pe 's/(^|_|-)./uc($&)/ge;s/_//g')HelmParam

  echo "$HELM_VALUES_JSON" | quicktype --lang $lang --just-types --top-level "$top_level" --acronym-style camel --out $destDir/types.ts
  echo "$HELM_VALUES_JSON" > $destDir/default-values.json
cat <<EOF > $destDir/index.ts
import * as fs from 'fs'
import * as path from 'path'
import { $top_level } from './types'

export * from './types'
const defaultValues: $top_level = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'default-values.json')).toString()
)
export default defaultValues
EOF
}

CHART=$1
# 일단은 다른 Lang 지원 안함. 현재는 안쓰는 변수
LANGUAGE=$2

if [ -z "${LANGUAGE}" ]; then
  echo $LANGUAGE
  LANGUAGE=ts
fi

DIR=$PWD/$CHART

rm -rf $DIR

HELM_VALUES_JSON=$(load_helm_chart_values_as_json $CHART)

mkdir -p $DIR

generate_inferrence ts "$CHART" "$HELM_VALUES_JSON" "$DIR"
