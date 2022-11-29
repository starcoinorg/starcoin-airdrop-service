## docker starcoin-airdrop-service

1. stop container，delete old container

`./stop.sh`

2. build docker image

`./build.sh`

3. start container

`./run.sh`

4. check log

`docker logs -f starcoin-airdrop-service`

5. One-click for all above

`./rebuild.sh`

6. inspect a running container.
   `docker exec -it <CONTAINER_ID> /bin/bash`

7. tag
   `docker tag starcoin/starcoin-airdrop-service:latest starcoin/starcoin-airdrop-service:0.1.0`

8. publish to docker hub
   `docker push starcoin/starcoin-airdrop-service:0.1.0`
