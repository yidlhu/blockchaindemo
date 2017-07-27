# How to use hfc with the IBM Bluemix Blockchain beta service

The goal is to run [helloblockchain.js](https://github.com/ratnakar-asara/Node-Sample/blob/master/helloblockchain.js) sample program, which will deploy example02 chaincode and query/invoke it.

1. Find your project folder, e.g. /Users/Documents/Blockchain@Local, then run the command: 'unzip fabric_images_v0.6.tar.zip'  to extract fabric images

2. Import fabric images

   ```
   #(Mac/Linux)          ./fabric_import.sh
   ```
   ```
   #(Windows)            ./fabric_import.bat
   ```

3. Verify docker images with the below command:

	```
	docker images
	```
 (should include 3 images as below:
   hyperledger/fabric-membersrvc:x86_64-0.6.1-preview  ,
   hyperledger/fabric-peer:x86_64-0.6.1-preview  ,
   fabric_client:v0.6
 )


4. Run the command 'unzip workspace.zip' to extract workspace file

5.  Startup docker network and keep this terminal opening
    ```
    cd workspace
    run the command 'docker-compose up'
    ```
     
6. Verify docker containers(Open another terminal #Tip1)
	```
	run the command 'docker ps'
	```
 (should include 3 containers as below: client_dev_s  , peer_dev_s  , ca_dev_s)

 7.Login docker container of blockchain app

	```
	run the command 'docker exec -it client_dev_s /bin/bash'
	```

8.Startup web application

        ```
	cd $WORKSPACE/apps/DEMO
	root@xxx:~/workspace/apps/DEMO#./startup.sh
	```
        	
9.visit app with browser

 	```
	(Mac/Linux)
	http://127.0.0.1:3000/
	(Windows):(You can get this IP by command "docker-machine ip default" #Tip2)
	http://192.168.99.100:3000/
	```

#Tips:

 #1. If you want to reopen this environment,
 #please open a new terminal and execute command "docker-compose down" in workspace dir and then execute command "docker-  compose up".

 #2. When you open a new terminal in Windows every time,
 #please execute "docker-machine env" to initialize docker environment firstly.


