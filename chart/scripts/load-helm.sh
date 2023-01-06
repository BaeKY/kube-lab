#!/bin/bash

# ---------------------------------------------------------------------------- #
#                            yq, helm 명령어에 의존하고 있음!                        #
# ---------------------------------------------------------------------------- #

function checkDependencyAndExit() {
  local CMD=$1
  command -v $1 &>/dev/null
  if [ $1 = 1 ]; then
    echo Please install \"$1\" 
    exit 1
  fi
}

checkDependencyAndExit helm
checkDependencyAndExit yq

function helmRepoAdd() {
  local CHART_LIST_FILE=$1
  yq '.charts[] | .repo + " " + .url' $CHART_LIST_FILE | awk '{system("helm repo add "$1" "$2)}'
}

function helmValuesCodegenForTypescript() {
  local CHART_LIST_FILE=$1
  local EXEC_DIR=$2
  local HELM_SHOW_VALUE_PARAMS=$(yq '.charts[] | .repo + "/" + .chart + "@" + .version' $CHART_LIST_FILE)
  cd $2
  echo "$HELM_SHOW_VALUE_PARAMS" | awk '{system("generate_helm_value_inference "$1" ts")}'
}

HELM_CHARTS_FILE=$PWD/helm-charts.yaml

helmRepoAdd $HELM_CHARTS_FILE 1>/dev/null

# helm repo update

mkdir -p $PWD/src/types/helm-values
helmValuesCodegenForTypescript $HELM_CHARTS_FILE $PWD/src/types/helm-values
