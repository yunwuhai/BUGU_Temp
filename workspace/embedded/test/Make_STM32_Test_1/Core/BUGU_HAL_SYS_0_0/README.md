# BUGU_HAL_SYS

## 说明

1. **注意，在BUGU_HAL中，SYS组件是一个非常特殊的组件，该部分内容涉及芯片最底层的初始化且和芯片本身直接相关，考虑到通用性，我们可能需要在未来很长一段时间中对其进行重新设计。**
   **但是在没有完全设计之前，这个组件仍然是可以用的，但其中内容并非描述文件进行生成，而是直接复制而来。**
   **从最终希望效果来看，这个组件未来应该和其它组件一样是可以被编辑的且会生成描述文件并被解析的，但是目前为止，我们可以不考虑这些。**
2. 位于`inc`的`stm32_assert.h`是由`data/embedded/sdk/STM32/STM32F4/HAL/inc`中的`stm32_assert_template.h`复制过来，但是注意，复制过来后一定要修改名称。
3. 位于`src`的`system_stm32f4xx.c`是由`data/embedded/sdk/STM32/STM32F4/CMSIS/Device/ST/STM32F4xx/Source/Templates`中的`system_stm32f4xx.c`复制而来。