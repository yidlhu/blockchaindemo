#1. extract docker image file
unzip ./container_blockchain_v0.3.tar.zip

#2. import docker image as "workspace"
docker import ./container_blockchain_v0.3.tar workspace

#3. run docker image "workspace" as container
docker run -it workspace /bin/bash

#4. verify environment
root@workspace:~/workspace/apps/deployer#node -v
root@workspace:~/workspace/apps/deployer#bluemix -v
root@workspace:~/workspace/apps/deployer#go env

#5. modify ServiceCredentials.json(paste from Blockchain SaaS on bluemix)
root@workspace:~/workspace/apps/deployer#vi ./ServiceCredentials.json

#6. deploy chaincode
root@workspace:~/workspace/apps/deployer#./deploy.sh

#7. modify manifest.yml(set host and name with application name on bluemix)
root@workspace:~/workspace/apps/deployer#vi manifest.yml

#8. deploy application
root@workspace:~/workspace/apps/demo#bluemix api https://api.ng.bluemix.net
root@workspace:~/workspace/apps/demo#bluemix login -u ${username} -p ${password} -o ${organization} -s ${space}
root@workspace:~/workspace/apps/demo#bluemix cf push
