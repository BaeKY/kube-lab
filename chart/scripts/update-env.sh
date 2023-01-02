#!/bin/bash
NWK_INF=$(ip route get 1.1.1.1 | awk 'NR==1 { print $5 }')
IP=$(ip a s $NWK_INF | awk '{print $2}' | tail -1)
FIELD="MY_IP_ADDRESS_POOL"
sed -i '' "s,$FIELD=.*,$FIELD=$IP," .env