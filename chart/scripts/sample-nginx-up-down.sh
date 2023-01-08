#!/bin/bash

UP_DOWN=$1

NAME=sample-nginx
PORT=80
TARGET_PORT=$PORT
DOMAIN=nginx-test.kube-ops.localhost
NAMESPACE=default

if [ $UP_DOWN = "up" ]; then
  kubectl create deployment $NAME --image nginx --namespace $NAMESPACE
  kubectl expose deployment $NAME --port 80 --target-port $TARGET_PORT --namespace $NAMESPACE
  kubectl create ingress $NAME --rule=$DOMAIN/=$NAME:$PORT --class nginx --namespace $NAMESPACE
else
  kubectl delete deployment $NAME
  kubectl delete service $NAME
  kubectl delete ingress $NAME
fi