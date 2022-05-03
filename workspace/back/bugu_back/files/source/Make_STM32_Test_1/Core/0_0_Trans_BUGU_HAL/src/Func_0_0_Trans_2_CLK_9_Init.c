#include "../inc/0_0_Trans_2_CLK.h"

void Func_0_0_Trans_2_CLK_9_Init_0_Basic()
{
    uint32_t Func_0_0_Trans_2_CLK_9_Init_0_Basic_0_Temp[1];
    Func_0_0_Trans_2_CLK_0_HSE_Enable_0_Basic();
    do
    {
        Func_0_0_Trans_2_CLK_0_HSE_IsReady_0_Basic((uint32_t*)(Func_0_0_Trans_2_CLK_9_Init_0_Basic_0_Temp + 0));
    }
    while(*(uint32_t*)(Func_0_0_Trans_2_CLK_9_Init_0_Basic_0_Temp + 0) != (uint32_t)1);
    Func_0_0_Trans_2_CLK_0_PLL_ConfigDomain_SYS_0_Basic(Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_1_CLK_2_LL_RCC_PLLSOURCE_1_LL_RCC_PLLSOURCE_HSE, Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_1_CLK_3_LL_RCC_PLLM_DIV_2_LL_RCC_PLLM_DIV_4, (uint32_t)84, Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_1_CLK_4_LL_RCC_PLLP_DIV_0_LL_RCC_PLLP_DIV_2);
    Func_0_0_Trans_2_CLK_4_PLL_Enable_0_Basic();
    do
    {
        Func_0_0_Trans_2_CLK_5_PLL_IsReady_0_Basic((uint32_t*)(Func_0_0_Trans_2_CLK_9_Init_0_Basic_0_Temp + 0));
    }
    while(*(uint32_t*)(Func_0_0_Trans_2_CLK_9_Init_0_Basic_0_Temp + 0) != (uint32_t)1);
    Func_0_0_Trans_2_CLK_6_SetPrescaler_0_AHB(Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_1_CLK_5_LL_RCC_SYSCLK_DIV_0_LL_RCC_SYSCLK_DIV_1);
    Func_0_0_Trans_2_CLK_6_SetPrescaler_1_APB1(Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_1_CLK_6_LL_RCC_APB1_DIV_1_LL_RCC_APB1_DIV_2);
    Func_0_0_Trans_2_CLK_6_SetPrescaler_2_APB2(Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_1_CLK_7_LL_RCC_APB2_DIV_0_LL_RCC_APB2_DIV_1);
    Func_0_0_Trans_2_CLK_7_SetSysClkSource_0_Basic(Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_1_CLK_8_LL_RCC_SYS_CLKSOURCE_2_LL_RCC_SYS_CLKSOURCE_PLL);
    do
    {
        Func_0_0_Trans_2_CLK_8_GetSysClkSource_0_Basic((uint32_t*)(Func_0_0_Trans_2_CLK_9_Init_0_Basic_0_Temp + 0));
    }
    while(*(uint32_t*)(Func_0_0_Trans_2_CLK_9_Init_0_Basic_0_Temp + 0) != Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_1_CLK_9_LL_RCC_SYS_CLKSOURCE_STATUS_2_LL_RCC_SYS_CLKSOURCE_STATUS_PLL);
    Func_0_0_0_SubTrans_0_STM32F401CC_1_CLK_16_LL_Init1msTick_0_Extern((uint32_t)84000000);
    Func_0_0_0_SubTrans_0_STM32F401CC_1_CLK_15_LL_SetSystemCoreClock_0_Extern((uint32_t)84000000);
    Func_0_0_0_SubTrans_0_STM32F401CC_1_CLK_14_LL_RCC_SetTIMPrescaler_0_Extern(Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_1_CLK_10_LL_RCC_TIM_PRESCALER_0_LL_RCC_TIM_PRESCALER_TWICE);
    return;
}