# 嵌入式开发环境安装指南

*嵌入式环境安装分为Windows和Linux两个部分，请先完成Windows下环境安装再进行Linux环境的安装*

**注意：此处环境指的是开发环境，而非用户工作环境，是作为本项目的开发者所必须的环境，而真实用户在使用本项目的产品时并不完全需要我们下面记录的这些东西。**

## Windows

*当你在使用本指南时，默认你已经完成了根目录下README-加入项目所需做的全部工作*

1. `fork`并`clone`本项目所`fork`的openocd副本，副本地址：https://github.com/yunwuhai/openocd ，该项目在编译后会运行在Windows中。

2. 下载并安装MSYS2，我们将使用它去编译openocd，下载地址：https://www.msys2.org/ ，根据网站提示进行下载、安装和更新，只需完成到`pacman -Su`即可，后续可以不管。

3. 打开MSYS2 MinGW x64（注意一定要是MinGW，如果你的计算机是32位，可以使用MSYS2 MinGW x86)，然后使用如下语句完成工具安装：
   ```shell
   pacman -S make libtool pkg-config autoconf automake texinfo mingw-w64-x86_64-libusb  mingw-w64-x86_64-toolchain git
   ```
   其中git没必要进行配置，它的主要功能只是在初始化的时候下载一些东西。另外如果你使用的是zip版本（即非git clone的压缩包版本），那么就不是特别有必要，否则它是必须的。为了方便，我们还是安装上。

4. 继续在上面的环境中使用下述语句完成openocd编译：
   
   我们在这里假设你将openocd下载在D:/BUGU_OpenOCD中，请根据实际情况对下面语句的地址进行修改。
   ```shell
   cd /d/BUGU_OpenOCD
   ./bootstrap 
   ./configure -prefix=/d/BUGU_OpenOCD/app/
   make
   make install
   ```
   上述指令分别代表：
   1. 前往工作文件夹
   2. 初始化，即下载openocd所需的一些库文件
   3. 配置，这里我们只是配置了一下我们openocd在被编译后二进制文件最终会存放的位置，根据工作文件夹实际地址可以修改，但相对位置不建议修改，事实上这里应该也可以直接使用相对位置（但我没试过）
   4. 执行编译
   5. 完成安装，这一步完成后我们就可以在我们第三步指定的位置看见编译出的东西

5. 下载并安装STM32CubeMX、STM32CubeIDE、HT32F5的SDK、STM32F4的Cube SDK，上述内容在STM和Holtek的官网均可找到，这里不赘述。

## Linux

*虽然这里的工作是对Ubuntu Server的配置，但是操作过程最好使用vscode的SSH远程操作来完成，编写程序和操作会更加方便。*

1. `sudo apt install gcc g++ make git`并完成对git的配置。
   
2. 克隆本仓库