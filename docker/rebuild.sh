#!/bin/bash

./stop.sh
./build.sh
./run.sh
docker logs -f starcoin-airdrop-service
