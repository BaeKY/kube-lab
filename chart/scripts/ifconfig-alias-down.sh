#!/bin/bash

NWK_INF=$(ip route get 1.1.1.1 | awk 'NR==1 { print $5 }')
IP=10.0.0.1

sudo ifconfig $NWK_INF -alias $IP