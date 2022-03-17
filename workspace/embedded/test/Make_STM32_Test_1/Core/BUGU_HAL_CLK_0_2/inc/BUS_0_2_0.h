#ifndef __BUS_0_2_0_H__
#define __BUS_0_2_0_H__

#ifdef __cplusplus
extern "C" {
#endif

/** 引用头文件 **/

// 因为检测到在本类的方法中调用了其中的函数，所以需要引用这个库，这只会出现在BUGU_HAL库中
// 这里应该实际上应该写相对位置或绝对位置，否则我们需要在Makefile中加入对该文件地址的引用
#include "stm32f4xx_ll_bus.h"

/** 数据区 **/
// 从外部引入几个参数，它们是外部的对象，但会作为重载方法的选择列表并进行了重命名
// 其重命名方法为所属函数名_列表ID_参数名
// 这些参数不是类中本体的对象，主要是方便代码风格统一
#define EnablePeriphClock_0_2_0_0_1_STM32F4_AHB1_0_GPIOA LL_AHB1_GRP1_PERIPH_GPIOA
#define EnablePeriphClock_0_2_0_0_1_STM32F4_AHB1_1_GPIOC LL_AHB1_GRP1_PERIPH_GPIOC
#define EnablePeriphClock_0_2_0_0_1_STM32F4_AHB1_2_GPIOH LL_AHB1_GRP1_PERIPH_GPIOH


/* 接口区 */

// 使能外设时钟的一个重载
// 使用已有函数进行宏定义改名，名字=方法英语名_作者ID_组件ID_类ID_方法ID_重载ID_重载英语名
// 在描述文件中还可以记录这个重载方法的范围
#define EnablePeriphClock_0_2_0_0_1_STM32F4_AHB1(Periphs) LL_AHB1_GRP1_EnableClock(Periphs)

#ifdef __cplusplus
}
#endif

#endif