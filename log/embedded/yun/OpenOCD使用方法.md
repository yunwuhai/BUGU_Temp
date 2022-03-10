# OpenOCD使用方法

## submodule

一般情况下，我们在Linux环境中(至少在Ubuntu Server下测试表现如此)，不需要单独对本项目的OpenOCD进行更新，因为它被加入在了submodule中。但是在Windows下，这似乎并不太行得通，所以如果你发现你本地克隆的OpenOCD文件夹中没有其它文件，请先使用如下命令进行初始化和更新。

```shell
cd data/embedded/tools/openocd
git submodule init .
git submodule update .
```

上述指令分别代表进入子模块文件夹，初始化子模块，更新子模块。事实上这里可以不需要进入子模块文件夹，直接在根目录下就可以全部更新所有的子模块，但是因为之前存在一些子模块提交时没有在submodules中进行记录，所以在为这些模块添加记录之前，我们可能需要先暂时使用上述的步骤。

当然，除此之外，你也可以在clone的时候就直接加上`--recursive`参数，这样可以让克隆下来的工程直接拥有submodule内部的全部文件。

## 编译

接下来我们需要进行一些准备工作，以便在Windows下编译OpenOCD，主要是目前我还没搞清楚如何将编译出来的openocd单独导出，如果该工作完成，我们就可以不需要执行这些麻烦的工作了。

首先你需要下载一个MSYS2：[下载地址](https://www.msys2.org/)。
根据MSYS2官网的介绍，安装并更新MSYS2后，打开MSYS2 MinGW x64版本MSYS2（如果你是32位机，可以打开x86版本）。

使用下述命令安装基础工具。

```shell
pacman -S make libtool pkg-config autoconf automake texinfo mingw-w64-x86_64-libusb mingw-w64-x86_64-toolchain git
```

继续在MSYS2中工作，使用cd进入openocd文件夹，关于在MSYS2中不同分盘中移动，例如仍然可以使用`cd D:`移动到D盘，其他盘同理，然后你可以继续正常使用cd命令移动到指定位置。

然后你可以使用下述命令完成编译：

```shell
./bootstrap
./configure
make
make install
```

上述四步，前两步是openocd的配置方案，后两步是makefile的执行命令，其中最后一步是将openocd命令安装到你的MSYS2环境中，未来你可以在其中直接使用`openocd`来使用openocd，而不需要指明地址，类似于添加了环境变量。

## 烧录

关于STM32的cfg文件，openocd项目已经自带了，而关于HT32，我引用的这个项目添加了HT32F523系列的芯片，我们可以直接使用，使用方法参考[博文](https://blog.csdn.net/SMarxX/article/details/8486052)，注意需要在MSYS2中进行烧录，如果你使用Powershell之类的shell，Windows中可能会提示没有安装一些库（暂时不知道该如何解决，未来可能需要邮件问一下openocd的开发组）。