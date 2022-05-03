# 如果没有注释说明的地方，就应按照Makefile模板提供，否则应该按照注释的内容提供
# 如果发现有无法解释、无法理解或注释与实际冲突的情况，请联系询问我

# 项目名：前端创建项目时提供，如果没有提供则使用默认项目名——Project
TARGET = Make_STM32_Test_1

# 是否启用调试：当前所有情况默认为0
DEBUG = 0
# 优化等级：当前所有情况默认为-Os
OPT = -Os

BUILD_DIR = build

# C资源文件：C资源文件可以分别来自SDK,Core,User文件夹的下属文件。
# 其中Core,User文件夹的资源文件为自动填充，即每生成一个c文件，就会填充上路径。
# SDK文件夹的内容为手动提供，用户在上传SDK后，如果在组件中需要使用SDK中的函数或数据，则应该在一个目录界面中选择c文件表示添加。
# 用户上传的SDK程序包将会被复制在SDK文件夹中，而其添加的c文件所在路径则会被添加到此处。
C_SOURCES = \
SDK/Device/ST/STM32F4xx/Source/system_stm32f4xx.c \
SDK/STM32/STM32F4/LL/Src/stm32f4xx_ll_gpio.c	\
SDK/STM32/STM32F4/LL/Src/stm32f4xx_ll_rcc.c	\
SDK/STM32/STM32F4/LL/Src/stm32f4xx_ll_utils.c	\
SDK/STM32/STM32F4/LL/Src/stm32f4xx_ll_usart.c	\
SDK/STM32/STM32F4/LL/Src/stm32f4xx_ll_exti.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_0_SYS_0_MCU_Configure.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_1_INT_0_MCU_Configure.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_2_CLK_0_MCU_Configure.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_2_CLK_1_HSE_Enable.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_2_CLK_2_HSE_IsReady.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_2_CLK_3_PLL_ConfigDomain_SYS.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_2_CLK_4_PLL_Enable.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_2_CLK_5_PLL_IsReady.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_2_CLK_6_SetPrescaler.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_2_CLK_7_SetSysClkSource.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_2_CLK_8_GetSysClkSource.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_2_CLK_9_Init.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_3_GPIO_0_ClockEnable.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_4_USART_0_Enable.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_5_PWR_0_MCU_Configure.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_6_FLASH_0_FLASH_SetLatency.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_6_FLASH_1_FLASH_GetLatency.c	\
Core/0_0_Trans_BUGU_HAL/src/Func_0_0_Trans_6_FLASH_2_MCU_Configure.c	\
User/0_Main/src/Func_0_Main_0_main.c	\
User/1_BSP/src/Func_1_BSP_0_CLK_0_Init.c

# 汇编资源文件：目前只需要提供启动文件即可，启动文件来自于data/embedded/sdk/Device/$CHIP_FILE$/Source/gcc中
# 前端发回信息告诉此时选择的芯片为STM32F401CCU6，根据数据库记录，将会调取data/embedded/sdk/Device/ST/STM32F4xx/Source/gcc/startup_stm32f401xc.s
# 该文件将会放在本项目的根目录下
ASM_SOURCES = \
startup_stm32f401xc.s

# 工具链：如果生成的程序需要放在用户电脑上进行编译，我们此时需要调用工具链，
# 将对应平台的工具链文件夹放置在Tools中，并添加其程序路径
# 此处根据前端发回信息得知芯片为STM32F401CCU6，并且希望在Linux平台中编译，根据数据库记录，将会调取data/embedded/tools/gcc-arm-none-eabi文件夹
# 复制完成后根据对该工具链程序存放位置的记录，将复制过来的文件夹下bin目录设置为GCC_PATH
# 同时根据数据库记录为该工具链添加前缀PREFIX为arm-none-eabi
GCC_PATH = Tools/gcc-arm-none-eabi/bin
PREFIX = arm-none-eabi-
CC = $(GCC_PATH)/$(PREFIX)gcc
AS = $(GCC_PATH)/$(PREFIX)gcc -x assembler-with-cpp
CP = $(GCC_PATH)/$(PREFIX)objcopy
SZ = $(GCC_PATH)/$(PREFIX)size

HEX = $(CP) -O ihex
BIN = $(CP) -O binary -S

# CPU架构：选择芯片STM32F401CCU6，对应CPU架构为cortex-m4
CPU = -mcpu=cortex-m4
# FPU架构：选择芯片STM32F401CCU6，对应FPU架构为fpv4-sp-d16
FPU = -mfpu=fpv4-sp-d16
# 浮点处理：选择芯片因为FPU，故可以使用硬浮点，填入hard
FLOAT-ABI = -mfloat-abi=hard

MCU = $(CPU) -mthumb $(FPU) $(FLOAT-ABI)
AS_DEFS = 
# C宏定义：选择芯片为STM32F401CCU6，根据数据库，需要填写以下内容
# 在前端用户也可以看到这些宏定义，并可以对它们进行修改或增减
# 注意-D是前缀，而非宏定义的一部分，每个-D都代表一个宏定义
C_DEFS =  \
-DSTM32F401xC \
-DUSE_FULL_LL_DRIVER \
-DHSE_STARTUP_TIMEOUT=100 \
-DLSE_STARTUP_TIMEOUT=5000 \
-DLSE_VALUE=32768 \
-DEXTERNAL_CLOCK_VALUE=12288000 \
-DHSI_VALUE=16000000 \
-DLSI_VALUE=32000 \
-DVDD_VALUE=3300 \
-DPREFETCH_ENABLE=1 \
-DINSTRUCTION_CACHE_ENABLE=1 \
-DDATA_CACHE_ENABLE=1 \
-DHSE_VALUE=8000000

AS_INCLUDES =
# 引用路径：方便C语言程序include
# 默认添加项目根目录（也就是-I.）
# 其它目录只能是SDK文件夹下的路径，添加方法和SDK中C资源文件类似
C_INCLUDES = \
-I.	\
-ISDK/STM32/STM32F4/LL/Inc	\
-ISDK/CMSIS/Include	\
-ISDK/Device/ST/STM32F4xx/Include

ASFLAGS = $(MCU) $(AS_DEFS) $(AS_INCLUDES) $(OPT) -Wall -fdata-sections -ffunction-sections
CFLAGS = $(MCU) $(C_DEFS) $(C_INCLUDES) $(OPT) -Wall -fdata-sections -ffunction-sections
ifeq ($(DEBUG), 1)
CFLAGS += -g -gdwarf-2
endif
CFLAGS += -MMD -MP -MF"$(@:%.o=%.d)"

# 链接脚本，从data/embedded/sdk/STM32/STM32F4/LINK复制过来，但需要设置其中的一些内容，关于需要修改的内容请查看ld文件中的注释
LDSCRIPT = STM32F401CCUx_FLASH.ld

LIBS = -lc -lm -lnosys
LIBDIR = 
LDFLAGS = $(MCU) -specs=nano.specs -T$(LDSCRIPT) $(LIBDIR) $(LIBS) -Wl,-Map=$(BUILD_DIR)/$(TARGET).map,--cref -Wl,--gc-sections
all: $(BUILD_DIR)/$(TARGET).elf $(BUILD_DIR)/$(TARGET).hex $(BUILD_DIR)/$(TARGET).bin
OBJECTS = $(addprefix $(BUILD_DIR)/,$(notdir $(C_SOURCES:.c=.o)))
vpath %.c $(sort $(dir $(C_SOURCES)))
OBJECTS += $(addprefix $(BUILD_DIR)/,$(notdir $(ASM_SOURCES:.s=.o)))
vpath %.s $(sort $(dir $(ASM_SOURCES)))

$(BUILD_DIR)/%.o: %.c Makefile | $(BUILD_DIR) 
	$(CC) -c $(CFLAGS) -Wa,-a,-ad,-alms=$(BUILD_DIR)/$(notdir $(<:.c=.lst)) $< -o $@

$(BUILD_DIR)/%.o: %.s Makefile | $(BUILD_DIR)
	$(AS) -c $(CFLAGS) $< -o $@

$(BUILD_DIR)/$(TARGET).elf: $(OBJECTS) Makefile
	$(CC) $(OBJECTS) $(LDFLAGS) -o $@
	$(SZ) $@

$(BUILD_DIR)/%.hex: $(BUILD_DIR)/%.elf | $(BUILD_DIR)
	$(HEX) $< $@
	
$(BUILD_DIR)/%.bin: $(BUILD_DIR)/%.elf | $(BUILD_DIR)
	$(BIN) $< $@	
	
$(BUILD_DIR):
	mkdir $@		

clean:
	rm -fR $(BUILD_DIR)

-include $(wildcard $(BUILD_DIR)/*.d)