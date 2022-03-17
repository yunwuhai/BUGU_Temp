#include "../inc/Object_1_0.h"

// 返回值统一生成为void，如果有输出，则生成指针
void Func1_1_0_1_0(uint32_t param1, uint32_t* outparam)
{
    *outparam = param1++;   // 因为记录为指针，需要进行行为检测，如果是赋值语句，前端会返回是传值还是传地址，用于决定加不加星号
    return;
}