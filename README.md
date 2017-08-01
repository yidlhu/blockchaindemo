# How to deploy blockchain demo into local docker environment

The goal is to deploy blockchain demo on local blockchain docker images.  It is a blockchain demo for 2017 innovation day training.

## 1. Find your project folder, e.g. /Users/Documents/Blockchain@Local, then run the command: 'unzip fabric_images_v0.6.1.tar.zip'  to extract fabric images

## 2. Need to import fabric images （Keep the below file with same folder with "fabric_images_v0.6.1.tar"）by following steps:

	### (Mac/Linux)
	
	open Terminal and execute the file: * fabric_import.sh * by the commands:
	
	eg:	
	` ./fabric_import.sh `
	 
	 ### (Windows)
	 
	 (1) Start Menu at All Apps > Windows System > Run
	 (2) run command line interface by input: * cmd *
	 (3) go to the folder you stored the tar file and execute the batch file.
	 
	 eg:	
	 ` ./fabric_import.bat `

## 3. Verify docker images with the below command:
	` docker images `
 (should include 3 images as below:
   hyperledger/fabric-membersrvc:x86_64-0.6.1-preview  ,
   hyperledger/fabric-peer:x86_64-0.6.1-preview  ,
   fabric_client:v0.6.1
 )
<img width="586" alt="3 docker images" src="https://user-images.githubusercontent.com/30460101/28655824-d0cccb42-72d0-11e7-9404-dfa69ec18823.png">

## 4.  Startup docker network and keep this terminal opening

(Keep the below file in the current folder)
<a href="https://raw.githubusercontent.com/yidlhu/blockchaindemo/master/docker-compose.yml">docker-compose.yml</a>
` docker-compose up `
<img width="584" alt="5 docker-compose up" src="https://user-images.githubusercontent.com/30460101/28655822-d0bf2db6-72d0-11e7-961d-4e09d9e8d88e.png">

  
## 5. Verify docker containers(Open another terminal #Tip1)
run the command
` docker ps `
 (should include 3 containers as below: client_dev_s  , peer_dev_s  , ca_dev_s)
<img width="581" alt="6 docker ps" src="https://user-images.githubusercontent.com/30460101/28655823-d0cbb5a4-72d0-11e7-9422-a1ed586ccfb5.png">

 ## 6. Login docker container of blockchain app
run the command 
` docker exec -it client_dev_s /bin/bash`
<img width="581" alt="7 docker exec" src="https://user-images.githubusercontent.com/30460101/28656283-9ce063f4-72d3-11e7-8188-b9d760950f06.png">

## 7. Startup web application
`
cd $WORKSPACE/apps/DEMO
root@xxx:~/workspace/apps/DEMO/startup.sh
`
<img width="775" alt="8 1" src="https://user-images.githubusercontent.com/30460101/28656282-9cd9c3d2-72d3-11e7-8121-4bf1b3030ab5.png">
<img width="774" alt="8 2" src="https://user-images.githubusercontent.com/30460101/28656281-9cc79af4-72d3-11e7-8ed0-444a3b7f272b.png"> 

## 8. Visit app with browser
* (Mac/Linux) *
http://localhost:3000/
* (Windows) * (You can get this IP by command "docker-machine ip default" #Tip2)
http://192.168.99.100:3000/

<img width="1440" alt="9 visit app with browser" src="https://user-images.githubusercontent.com/30460101/28655934-7b7466ea-72d1-11e7-86c5-687ab8320b6c.png">

# Exercises:
## 1. Make a chaincode "hello" and do unit testing.
### 1.1. enter the fabric_client environment of Docker Container(In new Terminal)
`docker exec -it client_dev_s /bin/bash`
### 1.2. compile chaincode
`cd $GOPATH/src/chaincodes/hello`
`go build`
### 1.3. do unit testing
`go test`

## 2. Startup chaincode "hello" in DEV mode by REST
### 2.1. enter the fabric_client environment of Docker Container(In new Terminal)
`docker exec -it client_dev_s /bin/bash`
### 2.2. startup chaincode DEV environment
`cd $GOPATH/src/chaincodes/hello/scripts`
`./startup.sh`

## 3. Access chaincode "hello" by REST (Deploy, Invoke, Query)
### 3.1. enter the fabric_client environment of Docker Container(In new Terminal)
`docker exec -it client_dev_s /bin/bash`
### 3.2. deploy chaincode
`cd $GOPATH/src/chaincodes/hello/scripts`
`./enroll.sh`
`./deploy.sh`
### 3.3. invoke chaincode
`./invoke.sh`
### 3.4. query chaincode
`./query.sh`


# Tips:

 ### 1. If you want to reopen this environment, please open a new terminal and execute command "docker-compose down" in workspace dir and then execute command "docker-  compose up".

 ### 2. When you open a new terminal in Windows every time, please execute "docker-machine env" to initialize docker environment firstly.

 ### 3. For Bluemix Environment
  guide: https://github.com/yidlhu/blockchaindemo/blob/master/readme%40bluemix.txt
  
  workspace: https://ibm.box.com/s/dj4p2dzxw02ibvt8ppubigcangzqvk69
