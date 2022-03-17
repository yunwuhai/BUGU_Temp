# 项目名
TARGET = Make_STM32_Test_1
# 是否使用调试模式，目前我们没有调试模式，默认0关闭，如果开启就是1
DEBUG = 0
# 优化等级，目前我们默认采用Os优化，这可以一定程度上增加速度并减小体积
OPT = -Os
# 编译地址，目前默认build文件夹
BUILD_DIR = build
# C资源文件
C_SOURCES = 
# ASM资源文件，目前每个芯片默认有且必有一个各自对应的s文件，这个文件是从data中存储直接复制到PF中根目录下
# 对应这个工程项目的芯片STM32F411xe来说，该文件地址位于data/embedded/sdk/STM32/STM32F4/CMSIS/ST/STM32F4xx/Source/Templates/gcc中
# 我们每添加一个芯片到我们的平台中，都需要上传一个对应的startup文件，并记录其对应位置（当然，部分芯片可能共同使用一个startup文件）
ASM_SOURCES = \
startup_stm32f411xe.s
# GCC的地址，相对地址或绝对地址都可，这里为了方便先写相对地址
GCC_PATH = cd ../../../../data/embedded/tools/gcc-arm-none-eabi/bin/
# 工具链，两个芯片目前都是ARM芯片，所以目前默认arm-none-eabi-工具链
PREFIX = arm-none-eabi-
# 选择工具，这四个直接默认即可
CC = $(GCC_PATH)$(PREFIX)gcc
AS = $(GCC_PATH)$(PREFIX)gcc -x assembler-with-cpp
CP = $(GCC_PATH)$(PREFIX)objcopy
SZ = $(GCC_PATH)$(PREFIX)size
# 生成HEX和BIN，这里直接默认即可
HEX = $(CP) -O ihex
BIN = $(CP) -O binary -S
# 芯片架构，需要针对不同芯片填写不同类容
# CPU架构：STM32F4对应的是Cortex-M4，故这里参数为cortex-m4
CPU = -mcpu=cortex-m4
# FPU架构：STM32F411芯片有FPU且对应的是fpv4-sp-d16
FPU = -mfpu=fpv4-sp-d16
# 因为有FPU，故这里可以使用硬浮点，参数为hard
FLOAT-ABI = -mfloat-abi=hard
# STM32F411使用thumb指令集
MCU = $(CPU) -mthumb $(FPU) $(FLOAT-ABI)
# 汇编宏定义，这里先空着不管
AS_DEFS = 
# C宏定义，这些东西在后期应该可以在前端设置并在此处生成，但是目前使用默认即可（不过具体默认值需要等开发板做出来再决定，本示例不作为最后的方案）
# 注意-D是编译器所需前缀而不是宏定义的一部分
C_DEFS = \
-DUSE_FULL_LL_DRIVER \
-DHSE_VALUE=25000000 \
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
-DSTM32F411xE

AS_INCLUDES = 
C_INCLUDES = 

# 编译指令，直接使用默认值
ASFLAGS = $(MCU) $(AS_DEFS) $(AS_INCLUDES) $(OPT) -Wall -fdata-sections -ffunction-sections
CFLAGS = $(MCU) $(C_DEFS) $(C_INCLUDES) $(OPT) -Wall -fdata-sections -ffunction-sections
# 如果刚才开启了调试模式，就会加入调试参数，目前不用管
ifeq ($(DEBUG), 1)
CFLAGS += -g -gdwarf-2
endif
# 依赖关系生成，直接使用默认值
CFLAGS += -MMD -MP -MF"$(@:%.o=%.d)"
# 链接脚本，从../../../../data/embedded/sdk/STM32/STM32F4/LINK复制过来，但需要设置其中的一些内容，关于需要修改的内容请查看ld文件中的注释
LDSCRIPT = STM32F411CEUx_FLASH.ld
# lib库引用，目前直接使用默认值
LIBS = -lc -lm -lnosys
# lib库地址，目前直接使用默认值
LIBDIR = 
# 链接参数，目前直接使用默认值
LDFLAGS = $(MCU) -specs=nano.specs -T$(LDSCRIPT) $(LIBDIR) $(LIBS) -Wl,-Map=$(BUILD_DIR)/$(TARGET).map,--cref -Wl,--gc-sections
# 生成所有东西，直接使用默认值
all: $(BUILD_DIR)/$(TARGET).elf $(BUILD_DIR)/$(TARGET).hex $(BUILD_DIR)/$(TARGET).bin
# 目标生成，直接使用默认值
OBJECTS = $(addprefix $(BUILD_DIR)/,$(notdir $(C_SOURCES:.c=.o)))
vpath %.c $(sort $(dir $(C_SOURCES)))
OBJECTS += $(addprefix $(BUILD_DIR)/,$(notdir $(ASM_SOURCES:.s=.o)))
vpath %.s $(sort $(dir $(ASM_SOURCES)))

# 后面内容全部直接使用默认值
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