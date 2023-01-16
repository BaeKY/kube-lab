#!/bin/bash

MANIFESTS=$1

case $MANIFESTS in
  -*|--*|'')
    echo "Unknown k8s manifest path '$MANIFESTS'"
    exit 1
    ;;
esac
shift

if [ -d $MANIFESTS ]; then
  MANIFESTS=$(realpath $MANIFESTS)/*
elif [ ! -f $MANIFESTS ]; then
  echo "Files not exists"
  exit 1
fi

POSITIONAL_ARGS=()

while [[ $# -gt 0 ]]; do
  case $1 in
    -w|--wait)
      WAIT="$2"
      shift # past argument
      shift # past value
      ;;
    -r|--resources)
      RESOURCES=$(echo "$2" | sed -r 's/,/|/g')
      shift # past argument
      shift # past value
      ;;
    -*|--*)
      echo "Unknown option $1"
      exit 1
      ;;
    *)
      POSITIONAL_ARGS+=("$1") # save positional arg
      shift # past argument
      ;;
  esac
done

set -- "${POSITIONAL_ARGS[@]}" # restore positional parameters

echo "$RESOURCES"

# User가 선택하지 않은 Resource 먼저 생성
cat $(ls $MANIFESTS | grep '.yaml') | yq ". | select(.kind | test(\"$RESOURCES\") | not)" | kubectl apply -f -

sleep $WAIT

# User가 선택한 Resource 생성
cat $(ls $MANIFESTS | grep '.yaml') | yq ". | select(.kind | test(\"$RESOURCES\"))" | kubectl apply -f -