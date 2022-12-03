#!/bin/bash

function checkInstallation() {
  local cmd=$1
  if ( ! command -v $cmd >/dev/null ); then 
    local result=$?
    echo "'$cmd' is needed"
  fi
}

COMMANDS=(
  'yq'
  'helm'
  'perl'
  'awk'
  'sed'
  'quicktype'
)

COMMENT=""

for cmd in ${COMMANDS[@]}
do
  result=$(checkInstallation $cmd)
  if [ ! -z "${result}" ];then
    COMMENT="$COMMENT\n$result"
  fi
done

if  [ ! -z "${COMMENT}" ];then
  echo $COMMENT -e
fi