#include "../inc/0_0_Trans_6_FLASH.h"

void Func_0_0_Trans_6_FLASH_2_MCU_Configure_0_Basic()
{
    uint8_t Func_0_0_Trans_6_FLASH_2_MCU_Configure_0_Basic_0_Temp[4];
    Func_0_0_Trans_6_FLASH_0_FLASH_SetLatency_0_Basic(Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_1_CLK_2_LL_FLASH_LATENCY_2_LL_FLASH_LATENCY_2);
    do
    {
        Func_0_0_0_SubTrans_0_STM32F401CC_5_FLASH_1_LL_FLASH_GetLatency_0_Extern((uint32_t*)(Func_0_0_Trans_6_FLASH_2_MCU_Configure_0_Basic_0_Temp + 0));
    }
    while(*(uint32_t*)(Func_0_0_Trans_6_FLASH_2_MCU_Configure_0_Basic_0_Temp + 0) != (uint32_t)1);
    return;
}