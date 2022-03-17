#include "../inc/Main_0_0.h"

// main函数是唯一不需要和文件名一样的函数，在概念上它是核心方法，但是写法就是和普通main函数一样
// 核心方法（main）应该始终是位于Core中Main组件的Main类的0号方法，且Main组件与Main类的ID也应该为0
// 核心方法也是唯一需要写返回值的方法函数，但前端我们仍可以将其视为普通方法的界面
// 事实上对于嵌入式程序来说，main的参数和返回值意义不大，但是为了规范，我们还是按照正常的写
int main(int argc, char** argv)
{
    TestPrint_0_0_1_0_printf_int_char("Hello %d%c\n", 3, 'D');
    while(1)    // 循环是基础类的一个子类实现的方法，需要特别的解析
    {
        Func1_1_0_1_0(&testData1_1_0_1, &testData2_1_0_2);   // 因为是地址传递，所以需要加上地址引用符
    }
    return 0;
}