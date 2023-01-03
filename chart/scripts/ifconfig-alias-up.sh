#!/bin/bash

NWK_INF=$(ip route get 1.1.1.1 | awk 'NR==1 { print $5 }')
IP=$(cat chart-config.yaml | yq '.env.LB_IP_ADDRESS_POOL')

# ---------------------------------------------------------------------------- #
#                    내 로컬머신에 고정된 내부 네트워크 고정IP를 할당한다.                  #
# ---------------------------------------------------------------------------- #

sudo ifconfig $NWK_INF alias $IP up
