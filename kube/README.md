# starcoin-airdrop-service

## start/restart pods

kubectl apply -f ./starcoin-airdrop-service-deployment.yaml

## check pods

kubectl get pods
NAME READY STATUS RESTARTS AGE
starcoin-airdrop-service-deployment-794f65877-jpk4k 1/1 Running 0 7m16s

## check logs

kubectl logs -f starcoin-airdrop-service-deployment-794f65877-jpk4k

or

kubectl get pods|grep 'starcoin-airdrop-service-deployment' |grep Running |grep -v grep |awk -F' ' '{print $1}' | xargs kubectl logs -f

## stop the worker

kubectl scale --replicas=0 -f ./starcoin-airdrop-service-deployment.yaml
