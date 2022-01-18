# BUGU_Temp

*本仓库为不咕平台的临时仓库，未来将会被移动到服务器仓库中。*

## 加入项目

请各位按照如下方法来参与项目：

1. 在github的本项目中`Fork`本仓库，并`clone`你所`Fork`的副本，以便未来向本仓库提交`pull request`。

2. 进入你所`clone`的本地副本，使用`git switch -c develop origin/develop`使用`develop`分支进行开发。

3. 根据你目前所进行的阶段性任务，新建一个自定义的分支`git switch -c <name>`，当前你所执行的所有任务请在本分支内进行。

4. 当你完成了一个阶段性任务，此时请将其合并至你的`develop`分支中，并`push`到你的仓库同时提交`pull request`等待主仓库的合并。

5. 主仓库的`develop`仓库将长期持续进行合并，而在完成了某一项完整功能后，`develop`仓库将合并至`release`仓库以进行发布前的检查。

6. 当检查完毕后，`release`仓库将会合并至`master`仓库完成一次版本更新。

7. 请注意以上步骤，同时，若本人在本地进行开发请始终使用自建分支进行工作，如果是在进行功能开发，请将合并提交至`develop`，如果是进行bug修复，请将合并提交至`release`，使用`release`分支的方法同`develop`。在没有申请或要求的情况下，请勿向`master`分支提供合并。

8. 请注意写明`commit`时的注释，同时`pull request`也需要说明详情，另外在编程中的注释请一律规范使用中文且尽量多添加注释。

分组合作：

1. 当前仓库工作区根目录下有三个文件夹：
   
   1. `data`：数据文件夹，用于存放一些数据文件。
   
   2. `log`：日志文件夹，用于存放日志文件，也可以存放各位的一些工作记录或临时笔记。
   
   3. `workspace`：工作文件夹，主要工作区。

2. 上述每个文件夹下均有：
   
   1. `back`：后端
   
   2. `front`：前端
   
   3. `embedded`：嵌入式
   
   请各位按照自己的分组在规定文件夹下工作。

3. 在`log`文件夹下属于自己的分组文件夹中，可以新建一个文件夹并为其命名，该文件夹将可以作为你的工作笔记存放处，但请在分组文件夹的`README.md`文件中进行说明。

4. 当组内需要在工作区根至三级目录新建任何新文件夹，均应在该文件夹下的`README.md`中记录该文件夹的功能或作用，可以查看`./log/embedded/README.md`文件作为示例，三级目录之后暂时可以不添加。

## 开发环境安装

### 嵌入式

为了方便，嵌入式的测试开发环境为Ubuntu 20.04版本。

编程期间，可以选择使用VS或VSCode在Windows上编程，同时依靠openssh之类的工具在虚拟机上进行测试，也可以直接在Linux上安装VSCode直接在虚拟机上进行开发，这里不作要求和详细介绍，需要相关知识可以搜索`vs`、`vscode`、`远程`之类的关键词。

开发期间，应在虚拟机上完成`develop`分支的开发和测试，服务器中测试的内容应至少为`release`分支版本。

现在先说明在Ubuntu中应该安装的内容：

1. 首先是虚拟机和Ubuntu的安装，该部分请在网上自行搜索，但注意给Ubuntu分配的存储空间分大点，至少应在80G及以上，安装完毕后注意更新和换国内源。

2. 然后是关于一些工具的安装，为了方便我们先安装ESP-IDF所需的工具，该内容出现在[ESP-IDF 编程指南](https://docs.espressif.com/projects/esp-idf/zh_CN/v4.3.2/esp32/index.html)中，也可直接复制下面的内容并在命令行中操作：
   
   ```shell
   sudo apt install git wget flex bison gperf python3 python3-pip python3-setuptools cmake ninja-build ccache libffi-dev libssl-dev dfu-util libusb-1.0-0
   ```

3. 安装C/C++所需工具链：
   
   ```shell
   sudo apt install gcc g++ make
   ```

4. 选择一个文件夹安装ESP-IDF，这里默认安装路径为`~/software/esp`，为了方便我们后续称这个路径为`ESP_ROOT`，注意`ESP_ROOT`只是在此处为了方便书写所使用的代称，实际在安装的时候请转换为你所使用的路径。

5. ```shell
   cd ESP_ROOT
   git clone -b v4.3.2 --recursive https://github.com/espressif/esp-idf.git
   ```
   
   这将克隆ESP-IDF的仓库v4.3.2版本到你的`ESP_ROOT`，且其名称为`esp-idf`。

6. ```shell
   cd ESP_ROOT/esp-idf
   ./install.sh all
   ```
   
   通过上述步骤完成所有ESP系列芯片工具的安装。

7. ```shell
   cd ~
   sudo vim .bashrc
   ```
   
   在`.bashrc`文件末尾添上
   
   `alias get_idf='. $HOME/software/esp/esp-idf/export.sh'`
   
   注意这里需要设置对你自己的路径。
   
   **如果你从未使用过vim**：请通过图形界面的文件管理器打开该文件并使用文本编辑器进行修改，如果你看不到`.bashrc`文件，请在文件管理器顶部选项里面勾上显示隐藏文件。

8. 在完成了上述操作后，在命令行中输入`source ~/.bashrc`，完成了这步操作后，未来我们就可以使用`get_idf`指令来激活ESP-IDF了（如果没有设置就无法通过这个指令进行激活，激活方法会变得麻烦，而如果没有激活，我们就无法在当前命令行中使用ESP-IDF工具）

9. 现在开始安装STM32的开发工具链，该工具链安装教程请直接参考该博客：[【STM32开发环境】Linux下开发stm32（一） | 使用gcc-arm-none-eabi工具链编译_Mculover666的博客（嵌入式）-CSDN博客](https://blog.csdn.net/Mculover666/article/details/84888539)，我们只需要安装gcc-arm-none-eabi工具链即可，其它后续的内容可以根据兴趣进行阅读，但并非必须。

10. 在Windows上安装[乐鑫Espressif的Flash下载工具](https://www.espressif.com/zh-hans/support/download/other-tools)以及[STM32的STM32CubeProg](https://www.st.com/zh/development-tools/stm32cubeprog.html)和[STM32CubeMX](https://www.st.com/zh/development-tools/stm32cubemx.html)，前面两个工具分别是用于烧录ESP芯片和STM32芯片的烧录工具，最后一个是STM32的模板代码生成工具，请测试STM32CubeProg是否能够使用DAPLink进行烧录，如果不能请另外购买STLink进行烧录。

## 资料汇总

考虑到各位对集体开发尚缺少经验（包括我也是），所以大家可以将自己搜集到的认为有价值的资料放至此处：

- [git一些常用指令汇总](https://yunwuhai.blog.csdn.net/article/details/122515950)

- [github如何上传自己的代码到自己的仓库和到别人的仓库](https://blog.csdn.net/weixin_43851149/article/details/107283174)

## 项目规划