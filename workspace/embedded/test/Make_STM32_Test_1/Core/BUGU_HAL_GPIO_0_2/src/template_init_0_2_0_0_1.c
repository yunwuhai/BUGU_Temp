// 调用头文件，只需要使用相对路径引用自己对应类的头文件即可
#include "../inc/GPIO_0_2_0.h"

// 文件名=函数名=方法英语名_作者ID_组件ID_类ID_方法ID_重载ID
// 内部调用的函数目前仍然是芯片厂商的sdk库，但是未来我们需要对其进行修改使之完全支持BUGU描述文件
// 这里只是作为一个示例，真正的
void template_init_0_2_0_0_1(void)
{
  LL_AHB1_GRP1_EnableClock(LL_AHB1_GRP1_PERIPH_GPIOC);
  LL_AHB1_GRP1_EnableClock(LL_AHB1_GRP1_PERIPH_GPIOH);
  LL_AHB1_GRP1_EnableClock(LL_AHB1_GRP1_PERIPH_GPIOA);
}
