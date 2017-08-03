# How to create your own Node-Red enviroment in Bluemix
The intent of this guide in this section primary focus on the client environment to create Node-Red to connect to the IoT Websocket services in order to get the data from the device.

Before your start this guide in this section, assume you completed some pre-condition, which include:
1) User already have Bluemix account, space, and already in some organization
2) User already have some knowledge about node-red and already knew how to use it

If you are not satisfied the pre-condition, please following the guide in the invitation letter to have your own Bluemix account.

## 1. Click the 'menu' icon on the top left, and select the 'Dashboard' option to move your page to the 'Dashboard'

<img width="460" alt="screen shot 2017-08-02 at 11 13 14 am" src="https://user-images.githubusercontent.com/6285682/28859239-cd734d42-7788-11e7-8277-41addacca5fb.png">

## 2. Click the 'Create App' button in the 'All Apps' section in order to create your node-red app

<img width="1223" alt="screen shot 2017-08-02 at 11 14 47 am" src="https://user-images.githubusercontent.com/6285682/28859306-2743e7aa-7789-11e7-8666-278cc15606a9.png">

## 3. In the search box type 'node-red' to speed up to seek the 'Node-RED Starter', then click the item

<img width="1292" alt="screen shot 2017-08-02 at 11 16 38 am" src="https://user-images.githubusercontent.com/6285682/28859330-46b55cb8-7789-11e7-8ef8-42ac82182111.png">

## 4. Input App Name, give an unique name. As my example, I used 'myownnode' as my unique name, then click the 'Create' button

The node-red starter template default to binding Node-RED app and Cloudant DB. The initial process will take some time, since the Bluemix need to initial the environment and grant the database service authority.

<img width="1288" alt="screen shot 2017-08-02 at 11 21 04 am" src="https://user-images.githubusercontent.com/6285682/28859405-94b8693c-7789-11e7-9865-3277cb67defb.png">

<img width="1288" alt="screen shot 2017-08-02 at 11 21 05 am" src="https://user-images.githubusercontent.com/18477412/28903408-421b87be-7837-11e7-81f1-b3d367f68ebe.png">


## 5. Click the 'Visit App URL' link to launch your Node-RED when it was ready. It will show you some configuration step on the page.

<img width="1283" alt="screen shot 2017-08-02 at 11 25 36 am" src="https://user-images.githubusercontent.com/6285682/28859424-b4858bb4-7789-11e7-9286-34c83d172cc3.png">

1) On the first page, just click 'Next' Button, to move the next page.

<img width="907" alt="screen shot 2017-08-02 at 11 27 50 am" src="https://user-images.githubusercontent.com/6285682/28859433-caed1dc2-7789-11e7-8666-87f79671ab81.png">

2) The second page required your security strategy and ask you to provide the name/password to access the app, just choose the 'Allow anyone to access the editor' option in order to simplified the step.

<img width="848" alt="screen shot 2017-08-02 at 11 28 33 am" src="https://user-images.githubusercontent.com/6285682/28859443-d81839be-7789-11e7-8334-657e45f221d2.png">

3) Leave the the third page and just click the 'Next' Button, not choose any option from the page.

<img width="851" alt="screen shot 2017-08-02 at 11 31 03 am" src="https://user-images.githubusercontent.com/6285682/28859459-eaf0252e-7789-11e7-883a-3fc75c3c9f62.png">

4) Click the 'Finish' Button to complete the initialization process and waiting for your Node-RED getting started.

<img width="866" alt="screen shot 2017-08-02 at 11 33 21 am" src="https://user-images.githubusercontent.com/6285682/28859471-ff8a630a-7789-11e7-8de2-7542e464e445.png">

## 6. Click 'Go to your Node-RED flow editor' button and move to the flow editor page and start to config your flow

<img width="1154" alt="screen shot 2017-08-02 at 11 33 50 am" src="https://user-images.githubusercontent.com/6285682/28859479-0f5ac0d6-778a-11e7-8cba-fae576fdc1ef.png">

1) Drag 'Websocket' node from the 'Input' section.

<img width="616" alt="screen shot 2017-08-02 at 11 36 36 am" src="https://user-images.githubusercontent.com/6285682/28859487-1f7ac3f8-778a-11e7-89ac-8f03390ed2ef.png">

2) Double Click the 'Websocket' node, it will open the configuration page.

<img width="1016" alt="screen shot 2017-08-02 at 11 39 11 am" src="https://user-images.githubusercontent.com/6285682/28859488-210dc558-778a-11e7-8bea-b91e44921772.png">

3) 'Type' Options => 'Connect to', click 'Edit' button right behind 'URL'.

<img width="1016" alt="screen shot 2017-08-02 at 11 39 11 am" src="https://user-images.githubusercontent.com/6285682/28859499-2a7f599e-778a-11e7-8cea-06d3c483c0dc.png">

4) 'URL' input box value is 'ws://sensoriot.mybluemix.net/ws/iot', select 'Send/Recieve Payload' options, then click 'Update' button, it will move to the previous page, then you can input the nick name for node or leave it as empty. Then, click 'Done' button to finish the configuration.(I input the nick name 'iot-device' for this node in my sample)

<img width="1000" alt="screen shot 2017-08-02 at 11 39 23 am" src="https://user-images.githubusercontent.com/6285682/28859580-c42d9c18-778a-11e7-940f-d36b6fa54a24.png">

<img width="1009" alt="screen shot 2017-08-02 at 11 39 42 am" src="https://user-images.githubusercontent.com/6285682/28859581-c601d5b8-778a-11e7-9590-31c8b82098c2.png">

5) From function section drag 'json' node in order to format the incoming data from string to json

<img width="745" alt="screen shot 2017-08-02 at 11 41 09 am" src="https://user-images.githubusercontent.com/6285682/28859584-c7951d36-778a-11e7-892a-e4e64bbb83bb.png">

6) Drag the 'Debug' node from output section, it will be renamed to 'msg.payload' automatiically, and connect 'iot-device' node, 'json' node, and 'msg.payload' node by drag from entry point to the other. Like the sample I provided below.

<img width="701" alt="screen shot 2017-08-02 at 11 41 45 am" src="https://user-images.githubusercontent.com/6285682/28859586-c8ffa01a-778a-11e7-8e69-55619861edf7.png">

7) Drag another 'Websocket' node from output section, double click to edit.

<img width="726" alt="screen shot 2017-08-02 at 1 36 55 pm" src="https://user-images.githubusercontent.com/6285682/28859655-376a7660-778b-11e7-8a6e-525ce0343bc7.png">

8) 'Type' options => 'Linsen on', click edit URL for defining your Websocket service path. (My sample is '/ws/client/blockchain') Select 'Send/Recieve entire message' and then click 'Update' Button, then it move to the previous page, then click 'Done' button.

<img width="1015" alt="screen shot 2017-08-02 at 11 42 13 am" src="https://user-images.githubusercontent.com/6285682/28859589-ca92a3be-778a-11e7-9d99-73dac8758113.png">

<img width="1010" alt="screen shot 2017-08-02 at 11 42 52 am" src="https://user-images.githubusercontent.com/6285682/28859651-34731f7a-778b-11e7-8819-8c8df4092b34.png">

9) Drag the entry point and connect the nodes betwee 'jason' and 'Websocket' node your created just now. Then click the 'Deploy' button on the top of righ side.

<img width="1252" alt="screen shot 2017-08-02 at 1 42 06 pm" src="https://user-images.githubusercontent.com/6285682/28859735-ace77ee2-778b-11e7-8cc1-4015457e2926.png">

Now you complete the your Node-RED build part in this guide

----
# Next Step -- Follow the Guide for Blockchain on VirtualBoxVM environment --

https://github.com/yidlhu/blockchaindemo/blob/master/GuideForVirtualBoxVM.MD

----
# 下面的Guide是可选的步骤,非虚拟机环境的Guide,耗时比较长, Optional Guide:
***
***
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
