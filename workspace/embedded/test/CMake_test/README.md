这是一个对stm32f407vet6的cmake编译测试

根据CubeMX所生成的工程文件中的Makefile文件改写的CMake工程


测试方法为：
1. 进入build文件夹
2. 如果你的操作系统为Windows, 请输入
    ```shell
    cmake ../ -G 'MinGW Makefiles'

    make
    ```
    如果你的操作系统为Linux, 可以直接输入
    ```shell
    cmake ../

    make
    ```
3. 输出结果

如果要重新覆盖测试，请先删除build文件夹下的所有内容，再重新输入上述内容。

参考工程：https://github.com/rxdu/stm32_cmake