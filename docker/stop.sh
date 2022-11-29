#!/bin/bash

echo "=== container stopping ==="
docker stop starcoin-airdrop-service
docker rm  starcoin-airdrop-service
echo "=== container stopped ==="