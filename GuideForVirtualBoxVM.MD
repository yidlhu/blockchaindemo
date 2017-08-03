# 安装运行虚拟机
- ### 从U盘复制 **WUHAN** 目录到你的本地硬盘。
- ### 安装软件 **VirtualBox**, 安装文件路径： WUHAN/VirtualBoxInstall，MAC / WINDOWS用户选择适合本系统的安装文件安装。
- ### 解压缩 WUHAN/InnovationDay2017-VM.zip
- ### 导入 VirtualBoxVM IMAGE. 具体方法：
1. #### 鼠标双击 WUHAN/InnovationDay2017-VM/Ubuntu/Ubuntu.vbox
2. #### 在VirtualBox窗口中会看到Ubuntu虚拟机,点击‘启动’
<img width="802" alt="-users-huyi-workspace2-wuhan-innovationday2017-vm-ubuntu finder at 12 55 39" src="https://user-images.githubusercontent.com/18717367/28906767-47b98b20-784c-11e7-83e5-c4eb51843527.png" style="max-width:100%;">

***

# 步骤A 启动Blockchain Network
- Open Terminal and input the commands below:
```
cd ~/Desktop/Blockchain
./startNet.sh
```
<img src="https://user-images.githubusercontent.com/18717367/28910668-63f03244-7860-11e7-93c3-c0855c87075a.png" style="max-width:100%;">

# 注意 请保持上面的Blockchain Network窗口不要关闭

# 步骤B 在虚拟机内修改startApp.sh
- 在Ubuntu虚拟机内的桌面双击打开`Blockchain`文件夹
- 双击在编辑器中打开编辑`startApp.sh`文件
- 找到下面的语句：

#### export WS_URL=wss://`clientnode`.mybluemix.net/ws/client/`data` 
- 把 `data` 改为 `blockchain`
- 把 `clientnode` 替换为你刚刚在bluemix中建立的 Node-Red 的名字。如果没有建立Node-Red请参考这个链接
https://github.com/yidlhu/blockchaindemo/blob/master/README.md
#### 修改后应该看起来是这个样子的
#### export WS_URL=wss://`yournoderedname`.mybluemix.net/ws/client/`blockchain` 

# 步骤C 启动 Blockchain DEMO 应用
- Open ***`another`*** Terminal and input the commands below:
- 在***另一个***terminal窗口输入命令：
```
cd ~/Desktop/Blockchain
./startApp.sh
```
<img src="https://user-images.githubusercontent.com/18717367/28910697-81a195ee-7860-11e7-96f5-9304c9b7bb70.png" style="max-width:100%;">

# 如果遇到websocke错误，则是因为步骤B 的名字修改有问题，或者Node-Red有问题。解决问题后，重复 步骤A 和 步骤C.

# 访问 Blockchain DEMO webpage
Open browser in Ubuntu VM, and access the URL:
`http://127.0.0.1:3000/`
<img src="https://user-images.githubusercontent.com/18717367/28910761-bc82d074-7860-11e7-8763-70f49fc0da31.png" style="max-width:100%;">
***
***
# Exercises:
## 1. Make a chaincode "hello" and do unit testing.
  ### 1.1. (In new Terminal) enter the fabric_client environment of Docker Container 
  ```
    docker exec -it client_dev_s /bin/bash
  ```
  ### 1.2. compile chaincode
  ```
    cd $GOPATH/src/chaincodes/hello
    go build
  ```
  ### 1.3. do unit testing
  ```
    go test
  ```
## 2. Startup chaincode "hello" in DEV mode by REST
  ### 2.1. (In new Terminal) enter the fabric_client environment of Docker Container 
  ```
    ./login_workspace.sh  或者
    docker exec -it client_dev_s /bin/bash
  ```
  ### 2.2. startup chaincode DEV environment
  ```
    cd $GOPATH/src/chaincodes/hello/scripts
    ./startup.sh
  ```
## 3. Access chaincode "hello" by REST API(Deploy, Invoke, Query)
  ### 3.1. (In new Terminal) enter the fabric_client environment of Docker Container  
  ```
    ./login_workspace.sh  或者
    docker exec -it client_dev_s /bin/bash
  ```
  ### 3.2. deploy chaincode
  ```
    cd $GOPATH/src/chaincodes/hello/scripts
    ./enroll.sh
    ./deploy.sh
  ```
  ### 3.3. invoke chaincode
  ```
    ./invoke.sh
  ```
  ### 3.4. query chaincode
  ```
    ./query.sh
  ```

