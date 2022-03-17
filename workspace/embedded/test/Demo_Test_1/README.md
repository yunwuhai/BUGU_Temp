# Demo_Test_1

*因为STM32和HT32的内容比较多，所以先用一个简单的非单片机C模板来进行说明和简单测试，等后续STM32的内容完善后再进行更加详细的开发。*

## 说明

1. `Core`文件夹是通过工程模板自动添加的组件进行生成的，而`User`文件夹是用户自己添加的组件或自己写的组件进行生成的，本项目只讲解`User`的内容，`Core`中的内容和`User`类似，只是在文件命名上稍微有一点差别。
2. `Core`下的README是空的，只是为了能传git。
3. 本示例项目不能真正工作，只是为了说明情况而举的例子，同时我们使用一个Testfile来模拟Makefile，进行一些和路径相关的功能说明，它并不能真正工作也不完全符合Makefile的语法，但是只要可以实现所需功能，就可以实现Makefile的功能以及一些其它文件设置。
4. `Test.ld`和`Test.s`同样也是用于模拟单片机运作中必须的ld文件和s文件。
5. 上述三个文件均可以在`../Testdata`中找到，程序需要将这三个文件复制过来，然后分别对里面进行修改，修改内容已加上注释，请配合`Testdata`中的原文件一起查看。