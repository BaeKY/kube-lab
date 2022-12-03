#!/bin/bash

function load_helm_chart_values_as_json() {
  local chart=$1
  echo "$(helm show values $chart | yq '.' -o json)"
}

function generate_inferrence() {
  local lang=$1
  local chart=$2
  local helm_values_json=$3
  local destFile=$4

  local temp=(`echo $chart | sed -r 's/\// /g'`)
  local top_level=$(echo ${temp[1]} | sed -r 's/-/_/g' | perl -pe 's/(^|_|-)./uc($&)/ge;s/_//g')

  echo "$HELM_VALUES_JSON" | quicktype --lang $lang --just-types --top-level "$top_level"HelmParam --out $destFile
}

echo $(pwd)/$0

CHART=$1
# 일단은 다른 Lang 지원 안함. 현재는 안쓰는 변수
LANGUAGE=$2

if [ -z "${LANGUAGE}" ]; then
  echo $LANGUAGE
  LANGUAGE=typescript
fi

DIR=$PWD/$CHART
FILE=index.ts

rm -rf $(echo $CHART | sed -r 's/\// /g')[0]

HELM_VALUES_JSON=$(load_helm_chart_values_as_json $CHART)

mkdir -p $DIR

generate_inferrence typescript "$CHART" "$HELM_VALUES_JSON" "$DIR/$FILE"