#ifndef __0_0_TRANS_2_CLK_H__
#define __0_0_TRANS_2_CLK_H__

#ifdef __cplusplus
extern "C" {
#endif

#include "../sub/0_0_0_SubTrans_0_STM32F401CC/inc/0_0_0_SubTrans_0_STM32F401CC_1_CLK.h"

void Func_0_0_Trans_2_CLK_0_MCU_Configure_0_Basic();
void Func_0_0_Trans_2_CLK_0_HSE_Enable_0_Basic();
/*************
参数列表：在前端即是参数对象列表，记录方法传入或传出的参数
参数对象列表中的参数对象分为两种：输入参数对象和输出参数对象
输入参数以对象的值传入，输出参数以对象的指针传入
考虑到语境不同，我们有时也可以以副本对象和本体对象对其称呼
*************/
/*************
形参名：在定义和声明方法的时候使用的参数对象名
输入形参：IFormParam_类型_参数id_参数英语名
输出形参：OFormParam_类型_参数id_参数英语名
参数英语名可以省略
输入形参在前，输出形参在后，它们的参数id是连续计算的
*************/
void Func_0_0_Trans_2_CLK_0_HSE_IsReady_0_Basic(uint32_t* OFormParam_U32_0_State);
void Func_0_0_Trans_2_CLK_0_PLL_ConfigDomain_SYS_0_Basic(uint32_t IFormParam_DataEnum_0_Source, uint32_t IFormParam_DataEnum_1_PLLM, uint32_t IFormParam_U32_2_PLLN, uint32_t IFormParam_DataEnum_3_PLLP_R);
void Func_0_0_Trans_2_CLK_4_PLL_Enable_0_Basic();
void Func_0_0_Trans_2_CLK_5_PLL_IsReady_0_Basic(uint32_t* OFormParam_U32_0_State);
void Func_0_0_Trans_2_CLK_6_SetPrescaler_0_AHB(uint32_t IFormParam_DataEnum_0_Prescaler);
void Func_0_0_Trans_2_CLK_6_SetPrescaler_1_APB1(uint32_t IFormParam_DataEnum_0_Prescaler);
void Func_0_0_Trans_2_CLK_6_SetPrescaler_2_APB2(uint32_t IFormParam_DataEnum_0_Prescaler);
void Func_0_0_Trans_2_CLK_7_SetSysClkSource_0_Basic(uint32_t IFormParam_DataEnum_0_Source);
void Func_0_0_Trans_2_CLK_8_GetSysClkSource_0_Basic(uint32_t* OFormParam_DataEnum_0_Source);
void Func_0_0_Trans_2_CLK_9_Init_0_Basic();

#ifdef __cplusplus
}
#endif

#endif