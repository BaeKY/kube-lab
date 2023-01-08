#!/bin/bash

# 원하는 도메인 입력
# *.local은 기본적으로 사용중이다(IANA). 나는 localhost 로 결정
DOMAIN=$(cat chart-config.yaml | yq '.env.CUSTOM_DOMAIN')

# 10.0.0.1에 DNS서버를 구축해둔 상태에서
NS_IP=$(cat chart-config.yaml | yq '.env.NS_IP')

RESOLVER_NAME=$DOMAIN
RESOLVER_CONTENT="# bobs-lab/kube-ops에 의해 작성되었습니다.
domain $DOMAIN
search $DOMAIN
nameserver $NS_IP
"

RESOLVER_DIR=/private/etc/resolver
sudo mkdir -p $RESOLVER_DIR
echo "$RESOLVER_CONTENT" | sudo tee -a $RESOLVER_DIR/$RESOLVER_NAME &>/dev/null

# https://vninja.net/2020/02/06/macos-custom-dns-resolvers/
# 위 링크처럼 DNS Refresh
sudo killall -HUP mDNSResponder

# 등록 확인
scutil --dns | grep "domain   : $DOMAIN" -A 5 -B 1 | awk '{$1=$1;print}'
