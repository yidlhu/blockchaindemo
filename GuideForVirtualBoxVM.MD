# 1. Install VirtualBox and load VM into VirtualBox
### 1.1. Copy **InnovationDay** folder from USBDisk to your PC.
### 1.2. Install **VirtualBox**
#### 1.2.1. Installer Folder： InnovationDay/VirtualBoxInstall
- VirtualBox-5.1.24-117012-OSX.dmg (MAC)
- VirtualBox-5.1.24-117012-Win.exe (WIN)
#### 1.2.2. Extract InnovationDay/InnovationDay2017-VM.zip
#### 1.2.3. Load VirtualBoxVM IMAGE as below step：
- Double click InnovationDay/InnovationDay2017-VM/Ubuntu/Ubuntu.vbox
- Click `Start` button of Ubuntu in VirtualBox window
<img width="802" alt="-users-huyi-workspace2-wuhan-innovationday2017-vm-ubuntu finder at 12 55 39" src="https://user-images.githubusercontent.com/18717367/28906767-47b98b20-784c-11e7-83e5-c4eb51843527.png" style="max-width:100%;">

# 2. Setup DEMO Envionrment
## 2.1. Modify startup shell
- Open folder `Desktop/Blockchain` in Ubuntu VM
- modify file `startup.sh` by texteditor
- Find the command below：
```
export WS_URL=wss://`clientnode`.mybluemix.net/ws/client/`data` 
```
- change `data` to `blockchain`
- instead `clientnode` by Node-Red app name just created in your bluemix account.For how to create Node-Red app in bluemix, please refer  in the guide below.
https://github.com/yidlhu/blockchaindemo/blob/master/README.md

- or please refer screen shot below, please use the address you just set last time in your node.red setting to replace your export statement. 
<img src="https://user-images.githubusercontent.com/18717367/29443048-0423cb06-8408-11e7-94bf-296a03e16db8.png" style="max-width:100%;">
- just like below after you mofified, in the screen shot it is eu-gb, PLEASE NOTICE that your ORG coulde be different.

```
export WS_URL=wss://`yournoderedname`.`your bluemix ORG if not US`.mybluemix.net/ws/client/`blockchain`
```

## 2.2. Startup Environment
- Open Terminal and input the commands below:
```
cd ~/Desktop/Blockchain
./startup.sh
```
<img src="https://user-images.githubusercontent.com/13764731/29206049-c5493c54-7eb2-11e7-9a54-864c0c1ce22a.png" style="max-width:100%;">


## 2.3. Access Blockchain DEMO application by browser
Open browser in Ubuntu VM, and access the URL:
`http://127.0.0.1:3000/`
<img src="https://user-images.githubusercontent.com/18717367/28910761-bc82d074-7860-11e7-8763-70f49fc0da31.png" style="max-width:100%;">

***
# Tips:
## 1. If you want to restart blockchain environment:
please `Ctrl+C` to stop application first, and then run the command below to shudown the blockchain network
```
cd ~/Desktop/Blockchain
./shutdown.sh
```
<img src="https://user-images.githubusercontent.com/13764731/29206272-d45caa18-7eb3-11e7-8448-36d972d75df7.png" style="max-width:100%;">
***
