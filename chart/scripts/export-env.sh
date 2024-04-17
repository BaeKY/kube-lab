#!/bin/bash

ENV="$(cat chart-config.yaml | yq '.env | .' | sed 's/: /=/g')"

for env in ${ENV[@]}; do
  key=$(echo "$env" | awk -F'=' '{print $1}')
  value=$(echo "$env" | awk -F'=' '{print $2}')
  export $key=$value
  echo $key $value
done
