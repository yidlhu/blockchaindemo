# How to deploy blockchain demo into local docker environment

The goal is to deploy blockchain demo on local blockchain docker images.  It is a blockchain demo for 2017 innovation day training.

1. Find your project folder, e.g. /Users/Documents/Blockchain@Local, then run the command: 'unzip fabric_images_v0.6.tar.zip'  to extract fabric images

2. Import fabric images
   https://github.com/yidlhu/blockchaindemo/blob/master/fabric_import.sh
   ```
   #(Mac/Linux)          ./fabric_import.sh
   ```
   https://github.com/yidlhu/blockchaindemo/blob/master/fabric_import.bat
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
<img width="586" alt="3 docker images" src="https://user-images.githubusercontent.com/30460101/28655824-d0cccb42-72d0-11e7-9404-dfa69ec18823.png">

4. Run the command 'unzip workspace.zip' to extract workspace file

5.  Startup docker network and keep this terminal opening （https://github.com/yidlhu/blockchaindemo/blob/master/docker-compose.yml）
    ```
    cd workspace
    run the command 'docker-compose up'
    ```
   <img width="584" alt="5 docker-compose up" src="https://user-images.githubusercontent.com/30460101/28655822-d0bf2db6-72d0-11e7-961d-4e09d9e8d88e.png">

  
6. Verify docker containers(Open another terminal #Tip1)
	```
	run the command 'docker ps'
	```
 (should include 3 containers as below: client_dev_s  , peer_dev_s  , ca_dev_s)
<img width="581" alt="6 docker ps" src="https://user-images.githubusercontent.com/30460101/28655823-d0cbb5a4-72d0-11e7-9422-a1ed586ccfb5.png">

 7.Login docker container of blockchain app

	```
	run the command 'docker exec -it client_dev_s /bin/bash'
	```
<img width="581" alt="7 docker exec" src="https://user-images.githubusercontent.com/30460101/28656283-9ce063f4-72d3-11e7-8188-b9d760950f06.png">

8.Startup web application

        ```
	cd $WORKSPACE/apps/DEMO
	root@xxx:~/workspace/apps/DEMO#./startup.sh
	```
  <img width="775" alt="8 1" src="https://user-images.githubusercontent.com/30460101/28656282-9cd9c3d2-72d3-11e7-8121-4bf1b3030ab5.png">
<img width="774" alt="8 2" src="https://user-images.githubusercontent.com/30460101/28656281-9cc79af4-72d3-11e7-8ed0-444a3b7f272b.png">      	
9.visit app with browser

 	```
	(Mac/Linux)
	http://localhost:3000/
	(Windows):(You can get this IP by command "docker-machine ip default" #Tip2)
	http://192.168.99.100:3000/
	```
<img width="1440" alt="9 visit app with browser" src="https://user-images.githubusercontent.com/30460101/28655934-7b7466ea-72d1-11e7-86c5-687ab8320b6c.png">

#Tips:

 #1. If you want to reopen this environment,
 #please open a new terminal and execute command "docker-compose down" in workspace dir and then execute command "docker-  compose up".

 #2. When you open a new terminal in Windows every time,
 #please execute "docker-machine env" to initialize docker environment firstly.


