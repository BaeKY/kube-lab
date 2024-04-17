#!/usr/bin/env bash

brew install yq helm quicktype
pnpm link --global @package/helm-value-inferrer

touch ./chart/.env
echo "CLOUDFLARE_API_KEY=" >> ./chart/.env
echo "CERT_MANAGER_EMAIL=" >> ./chart/.env

echo "./chart/.env 파일을 수정해주세요!"
