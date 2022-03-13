set(STM32F4_HAL_SRC
    Src/stm32f4xx_hal_tim.c
    Src/stm32f4xx_hal_tim_ex.c
    Src/stm32f4xx_hal_rcc.c
    Src/stm32f4xx_hal_rcc_ex.c
    Src/stm32f4xx_hal_flash.c
    Src/stm32f4xx_hal_flash_ex.c
    Src/stm32f4xx_hal_flash_ramfunc.c
    Src/stm32f4xx_hal_gpio.c
    Src/stm32f4xx_hal_dma_ex.c
    Src/stm32f4xx_hal_dma.c
    Src/stm32f4xx_hal_pwr.c
    Src/stm32f4xx_hal_pwr_ex.c
    Src/stm32f4xx_hal_cortex.c
    Src/stm32f4xx_hal.c
    Src/stm32f4xx_hal_exti.c
)
set(STM32F4_LL_SRC
    Src/stm32f4xx_ll_adc.c
    Src/stm32f4xx_ll_crc.c
    Src/stm32f4xx_ll_dac.c
    Src/stm32f4xx_ll_dma.c
    Src/stm32f4xx_ll_exti.c
    Src/stm32f4xx_ll_gpio.c
    Src/stm32f4xx_ll_i2c.c
    Src/stm32f4xx_ll_pwr.c
    Src/stm32f4xx_ll_rcc.c
    Src/stm32f4xx_ll_rtc.c
    Src/stm32f4xx_ll_spi.c
    Src/stm32f4xx_ll_tim.c
    Src/stm32f4xx_ll_usart.c
    Src/stm32f4xx_ll_utils.c
)

if(USE_HAL_LIB)
set(STM32F4_LIB_SRC ${STM32F4_HAL_SRC})
else()
set(STM32F4_LIB_SRC ${STM32F4_LL_SRC})
endif()

add_library(stm32f4xx_hal ${STM32F4_LIB_SRC})
if(USE_LL_LIB)
    target_compile_definitions(stm32f4xx_hal PUBLIC -DUSE_FULL_LL_DRIVER)
endif()
if(USE_HAL_LIB)
    target_compile_definitions(stm32f4xx_hal PUBLIC -DUSE_HAL_DRIVER)
endif()
target_link_libraries(stm32f4xx_hal PUBLIC cmsis)
target_include_directories(stm32f4xx_hal PUBLIC
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/Inc>
  PRIVATE Src)
