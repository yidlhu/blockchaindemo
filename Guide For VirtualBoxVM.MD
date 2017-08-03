# 安装运行虚拟机
- ### 从U盘复制 **WUHAN** 目录到你的本地硬盘。
- ### 安装软件 **VirtualBox**, 安装文件路径： WUHAN/VirtualBoxInstall，MAC / WINDOWS用户选择适合本系统的安装文件安装。
- ### 解压缩 WUHAN/InnovationDay2017-VM.zip
- ### 导入 VirtualBoxVM IMAGE. 具体方法：
1. #### 鼠标双击 WUHAN/InnovationDay2017-VM/Ubuntu/Ubuntu.vbox
2. #### 在VirtualBox窗口中会看到Ubuntu虚拟机,点击‘启动’
<img width="802" alt="-users-huyi-workspace2-wuhan-innovationday2017-vm-ubuntu finder at 12 55 39" src="https://user-images.githubusercontent.com/18717367/28906767-47b98b20-784c-11e7-83e5-c4eb51843527.png" style="max-width:100%;">

***

# 启动Blockchain Network
- Open Terminal and input the commands below:
```
cd ~/Desktop/Blockchain
./startNet.sh
```
一个blockchain的testing network就启动起来了。

# 启动 Blockchain DEMO 应用
- Open ***`another`*** Terminal and input the commands below:
```
cd ~/Desktop/Blockchain
./startApp.sh
```    
