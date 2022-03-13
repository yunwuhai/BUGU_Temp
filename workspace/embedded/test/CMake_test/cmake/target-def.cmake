# Target-specific flags
set(MCU_ARCH ARMCM3)
#£¡
set(MCU_FAMILY STM32F407xx)
set(MCU_NAME STM32F407VE)

set(CPU "-mcpu=cortex-m4")
set(FPU "-mfpu=fpv4-sp-d16")
set(FLOAT_ABI "-mfloat-abi=hard")

set(LINKER_SCRIPT ${CMAKE_SOURCE_DIR}/STM32F407VETx_FLASH.ld)

option(USE_LL_LIB "Enable LL library" OFF)
option(USE_HAL_LIB "Enable HAL library" ON)

option(USE_SYSTEM_VIEW "Enable Segger SystemView library" OFF)