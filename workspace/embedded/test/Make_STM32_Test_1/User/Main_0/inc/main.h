#ifndef __MAIN_H
#define __MAIN_H

#ifdef __cplusplus
extern "C" {
#endif

#include "../../../Core/BUGU_HAL_CLK_0_2/inc/BUS_0_2_0.h"

#include "stm32f4xx_ll_rcc.h"
#include "stm32f4xx_ll_bus.h"
#include "stm32f4xx_ll_system.h"
#include "stm32f4xx_ll_exti.h"
#include "stm32f4xx_ll_cortex.h"
#include "stm32f4xx_ll_utils.h"
#include "stm32f4xx_ll_pwr.h"
#include "stm32f4xx_ll_dma.h"
#include "stm32f4xx_ll_usart.h"
#include "stm32f4xx_ll_gpio.h"

#if defined(USE_FULL_ASSERT)
#include "stm32_assert.h"
#endif 

void Error_Handler(void);

#ifndef NVIC_PRIORITYGROUP_0
#define NVIC_PRIORITYGROUP_0         ((uint32_t)0x00000007)
#define NVIC_PRIORITYGROUP_1         ((uint32_t)0x00000006)
#define NVIC_PRIORITYGROUP_2         ((uint32_t)0x00000005)
#define NVIC_PRIORITYGROUP_3         ((uint32_t)0x00000004)
#define NVIC_PRIORITYGROUP_4         ((uint32_t)0x00000003)
#endif

#ifdef __cplusplus
}
#endif

#endif
