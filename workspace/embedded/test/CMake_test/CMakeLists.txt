## 设置工具链 
include(${CMAKE_SOURCE_DIR}/cmake/gcc-arm-none-eabi.cmake)

cmake_minimum_required(VERSION 3.0)
project(DEMO C CXX ASM)

message(STATUS "----------Building project: ${PROJECT_NAME}----------")

##工程设置
include(${CMAKE_SOURCE_DIR}/cmake/target-def.cmake)
# 把${CMAKE_SOURCE_DIR}换成${CMAKE_CURRENT_SOURCE_DIR}会不会更好？

## flag设置
set(MCU_FLAGS "${CPU} -mthumb ${FPU} ${FLOAT_ABI}")
set(LINK_FLAGS "${MCU_FLAGS} -Wl,--gc-sections")
set(EXTRA_LINK_FLAGS "-Wl,-Map=${PROJECT_NAME}.map,--cref,--no-warn-mismatch -specs=nano.specs -specs=nosys.specs")
include(${CMAKE_SOURCE_DIR}/cmake/stm32-gcc-flags.cmake)

## 输出工程信息小结
message(STATUS "MCU_FAMILY: ${MCU_FAMILY}")
message(STATUS "MCU_NAME: ${MCU_NAME}")
message(STATUS "Specified C compiler: ${CMAKE_C_COMPILER}")
message(STATUS "Linker script: ${LINKER_SCRIPT}")
message(STATUS "Use LL library: ${USE_LL_LIB}")
message(STATUS "Use HAL library: ${USE_HAL_LIB}")
message(STATUS "Use Segger SystemView library: ${USE_SYSTEM_VIEW}") 

## 版本信息（目前没什么用）
set(VERSION_MAJOR 0 CACHE STRING "Project major version number.")
set(VERSION_MINOR 1 CACHE STRING "Project minor version number.")
set(VERSION_PATCH 0 CACHE STRING "Project patch version number.")

## 添加用户头文件
include_directories(${CMAKE_SOURCE_DIR}/Core/Inc)
if(USE_SYSTEM_VIEW)
add_definitions("-DENABLE_SYSTEMVIEW")
endif()

## 设置工程输出文件名
set(ELF_TARGET ${PROJECT_NAME}.elf)

# 驱动库设置
set(PROJ_DRIVERS_PATH ${CMAKE_SOURCE_DIR}/Drivers)
add_subdirectory(${PROJ_DRIVERS_PATH}/CMSIS ${CMAKE_BINARY_DIR}/Drivers/CMSIS)
add_subdirectory(${PROJ_DRIVERS_PATH}/STM32F4xx_HAL_Driver ${CMAKE_BINARY_DIR}/Drivers/STM32F4xx_HAL_Driver)

# 添加用户源文件
set(USER_SRC
    ${CMAKE_SOURCE_DIR}/Core/Src/gpio.c
    ${CMAKE_SOURCE_DIR}/Core/Src/main.c
    ${CMAKE_SOURCE_DIR}/Core/Src/stm32f4xx_it.c
    ${CMAKE_SOURCE_DIR}/Core/Src/usart.c
    ${CMAKE_SOURCE_DIR}/Core/Src/system_stm32f4xx.c
    ${CMAKE_SOURCE_DIR}/Core/Src/stm32f4xx_hal_msp.c
    ${CMAKE_SOURCE_DIR}/startup_stm32f407xx.s
)

## 工程输出
add_executable(${ELF_TARGET} ${USER_SRC})
target_compile_definitions(${ELF_TARGET} PUBLIC -D${MCU_FAMILY})
target_link_libraries(${ELF_TARGET} PUBLIC cmsis stm32f4xx_hal -lc -lm -lnosys)
target_link_libraries(${ELF_TARGET} PRIVATE -T${LINKER_SCRIPT} ${EXTRA_LINK_FLAGS})
target_include_directories(${ELF_TARGET} PUBLIC
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/Core/Inc>)

## add post-build targets
include(${CMAKE_SOURCE_DIR}/cmake/stm32-gcc-postbuild.cmake)
# include(${CMAKE_SOURCE_DIR}/cmake/stm32-gcc-jlink.cmake)