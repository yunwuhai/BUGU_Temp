这是一个关于stm32的CMake编译测试

此CMake工程根据CubeMX所生成的makefile文件改写而成

测试方法为：
1. 进入目录下的build文件夹下
2. 如果你是Windows系统，请输入
``` shell
cmake ../ -G 'MinGW Makefiles'

make
```

如果你是Linux系统，可以直接输入
``` shell
cmake ../

make
```
3. 输出结果位于build文件夹下

本CMake工程架构可以查看根目录下的CMakeLists.txt,工程设置文件在cmake文件夹下

注意：文件路径不能含有空格，make工具无法识别有空格的路径

本工程参考：https://github.com/rxdu/stm32_cmake