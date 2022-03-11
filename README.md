# BUGU_Temp

*本仓库为不咕平台的临时仓库，未来将会被移动到服务器仓库中。*

## 加入项目

请各位按照如下方法来参与项目：

1. 下载并安装虚拟机软件和Ubuntu Server 20.04LTS版本，关于安装方式请自行学习，注意在安装过程中需要安装OpenSSH软件。

2. 下载并安装VSCode软件，并安装Commit Message Editor插件（规范提交）、Remote - SSH插件（未来连接云服务器，本地连接虚拟机服务器），关于Remote插件的简易使用可以参考此[博客](https://www.cnblogs.com/hi3254014978/p/12681594.html)，关于Commit插件的使用请参考下图。

![简易使用](https://s2.loli.net/2022/03/08/4QF6MyGAtgkSz9Y.png)

此外，你可以在vscode中通过如下方法使用git。

![vscode的git使用方法](https://s2.loli.net/2022/03/08/m9PqUuWXgzN4CkH.png)

3. 在github中`Fork`本仓库，并分别`clone`你所`Fork`的副本到本地机（Windows）和虚拟机（Ubuntu Server）中。

4. 进入你所`clone`的副本，通过`git switch -c develop origin/develop`使用`develop`分支进行开发。

5. 在本地或虚拟机中进行开发时，建议单独开一个feature分支来开发某一功能，在该功能开发完成后或阶段性结束后，再合并到`develop`分支中并提交pr。

6. 差别较大的功能请分别提交commit，并保证commit清晰（尽量使用VSCode插件进行提交）。

## 分组合作

1. 当前仓库工作区根目录下有四个文件夹：
   
   1. `data`：数据文件夹，用于存放一些数据文件。
   
   2. `log`：日志文件夹，用于存放日志文件，也可以存放各位的一些工作记录或临时笔记。
   
   3. `workspace`：工作文件夹，主要工作区。
   
   4. `preference`：参考文件夹，用于存放一些文档说明文件。

2. 上述每个文件夹下均有：
   
   1. `back`：后端
   
   2. `front`：前端
   
   3. `embedded`：嵌入式
   
   请各位按照自己的分组在规定文件夹下工作。

3. 在`log`文件夹下属于自己的分组文件夹中，可以新建一个文件夹并为其命名，该文件夹将可以作为你的工作笔记存放处，但请在分组文件夹的`README.md`文件中进行说明。

4. 当组内需要在工作区根至三级目录新建任何新文件夹，均应在该文件夹下的`README.md`中记录该文件夹的功能或作用，可以查看`./log/embedded/README.md`文件作为示例，三级目录之后暂时可以不添加。

## 开发环境安装

- [嵌入式开发环境安装指南](./preference/embedded/install.md)

## 资料汇总

考虑到各位对集体开发尚缺少经验（包括我也是），所以大家可以将自己搜集到的认为有价值的资料放至此处：

- [git一些常用指令汇总](https://yunwuhai.blog.csdn.net/article/details/122515950)

- [github如何上传自己的代码到自己的仓库和到别人的仓库](https://blog.csdn.net/weixin_43851149/article/details/107283174)

- [github简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)

- [像git一样思考](http://think-like-a-git.net/)

- [github如何同步主仓库到自己的fork仓库](https://blog.csdn.net/dingjianmin/article/details/117393092?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-117393092.pc_agg_new_rank&utm_term=%E5%A6%82%E4%BD%95%E5%B0%86%E8%87%AA%E5%B7%B1%E7%9A%84fork%E6%9B%B4%E6%96%B0&spm=1000.2123.3001.4430)

- [编译原理网课](https://www.bilibili.com/video/BV1zW411t7YE?from=search&seid=13066746962877628745&spm_id_from=333.337.0.0)

- [OpenOCD使用指南](http://blog.chinaunix.net/uid-24565138-id-2127551.html)

- [OpenOCD添加第三方设备支持:HT32F52352 Cortex-M0+](https://blog.csdn.net/weixin_41328027/article/details/122969985)

- [记gnu-mcu-eclipse-openocd工具链移植](https://blog.csdn.net/idk500/article/details/98476288?spm=1001.2014.3001.5502)

- [Ubuntu下使用OpenOCD通过Jlink烧写HEX到STM32](https://blog.csdn.net/SMarxX/article/details/8486052)

## 项目规划
