#include "../inc/0_0_Trans_1_INT.h"

void Func_0_0_Trans_1_INT_0_MCU_Configure_0_Basic()
{
    /*************
    这是一个简易堆栈，用于临时保存函数返回值。
    使用这样的堆栈我们可以将返回值临时保存然后传递给其它方法，而不用申请太多的对象而浪费内存。
    在前端展示时它的操作类似于方法输出直接作为另一个方法的输入。
    前端需要统计直接传参时最多堆栈会放的大小，然后申请相应大小的空间。
    *************/
    uint8_t Object_Func_0_0_Trans_1_INT_0_MCU_Configure_0_STM32F401CC_0_Temp[4];
    /*************
    传参：目前在前端，传参对象只支持数据类的对象，用户可以使用当前类内部的数据类对象传入，也可以将非数据类对象内部的数据类对象嵌套传入。
    此处尚不展开数据类对象的介绍，请继续阅读后续。
    *************/
    Func_0_0_0_SubTrans_0_STM32F401CC_0_INT_0_NVIC_SetPriorityGrouping_0_Extern(Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_0_INT_1_NVIC_PRIORITYGROUP_4_4P0S);
    Func_0_0_0_SubTrans_0_STM32F401CC_0_INT_3_NVIC_GetPriorityGrouping_0_Extern((uint32_t*)(Object_Func_0_0_Trans_1_INT_0_MCU_Configure_0_STM32F401CC_0_Temp + 0));
    Func_0_0_0_SubTrans_0_STM32F401CC_0_INT_2_NVIC_EncodePriority_0_Extern(*(uint32_t*)(Object_Func_0_0_Trans_1_INT_0_MCU_Configure_0_STM32F401CC_0_Temp + 0), 15, 0, (uint32_t*)(Object_Func_0_0_Trans_1_INT_0_MCU_Configure_0_STM32F401CC_0_Temp + 0));
    Func_0_0_0_SubTrans_0_STM32F401CC_0_INT_1_NVIC_SetPriority_0_Extern(Object_OptionEnum_0_0_0_SubTrans_0_STM32F401CC_0_INT_0_IRQn_Type_0_SysTick_IRQn, *(uint32_t*)(Object_Func_0_0_Trans_1_INT_0_MCU_Configure_0_STM32F401CC_0_Temp + 0));
    return;
}