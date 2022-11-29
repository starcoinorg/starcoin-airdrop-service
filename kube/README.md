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

## start service

kubectl apply -f ./service-starcoin-airdrop-service.yaml

## check service

kubectl get services
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
starcoin-airdrop-service LoadBalancer xxxx xxx.elb.amazonaws.com 80:4000/TCP 4m48s

# cname https://api-airdrop.starcoin.org to ab517df8eb84a441dac9560542696a10-111151260.ap-northeast-1.elb.amazonaws.com
