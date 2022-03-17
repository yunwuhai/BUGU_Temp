// 用到的库，前端会记录当前类中引用的类，而每个类都对应了一个h文件，直接引用即可。
// 如果是外部的sdk，则可能会对应多个h文件，但是在管理sdk的时候也会有所记录
#include "../../Testdata/TestSDK.h"

// 宏定义重命名，用于统一风格
// 将SDK中的外部数据引入，引入名称为对象命名方式：对象英语名_组件ID_类ID_对象ID，不需要引入所有的对象
#define DATA0_1_0_0 WOW
// 对象在被定义时候就设置了初始值，如果是数据类的话则可以直接赋值
uint32_t testData1_1_0_1 = 32;
// 关于非数据类的对象设计需要讨论
uint32_t testData2_1_0_2;

// 如果限制某个函数内部的取值，可以为其创建取值表，可以直接选用刚才引入的对象、已有的对象或其它外部数据，命名方式是:方法的名字_列表ID_参数英语名
#define FuncTion0_1_0_0_0_Empty_0_Option0 DATA0_1_0_0

// 可以将sdk函数引入，但不需要完全引入，然后将其创建为方法，方法命名方法为：方法英语名_组件ID_类ID_方法ID_重载ID_重载英语名
#define Func0_1_0_0_0_Empty(name) FuncTest(name)
// 如果引入函数有返回值，可以使用宏以函数的样式创建一个赋值语句
#define Func1_1_0_1_0(inparam, outparam) outparam = FuncTest2(inparam)

// 自定义的方法，方法命名和前面一样，只是写的格式差别
// 作用域在前端检测，不需要在代码中生成
void Func2_1_0_2_0_TwoParams(uint32_t param1, uint16_t param2);
void Func3_1_0_3_0(uint32_t param1, uint32_t* outparam);