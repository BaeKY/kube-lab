#!/bin/bash
IP=$(ip a s en0 | awk 'NR>3{print $2}')
FIELD=MY_IP_ADDRESS_POOL
sed -i '' "s,$FIELD=.*,$FIELD=$IP," .env