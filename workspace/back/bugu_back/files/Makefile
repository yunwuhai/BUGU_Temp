TARGET = 

DEBUG = 0
OPT = -Os

BUILD_DIR = build

C_SOURCES = SDK/Device/ST/STM32F4xx/Source/system_stm32f4xx.c SDK/STM32/STM32F4/LL/Src/stm32f4xx_ll_gpio.c SDK/STM32/STM32F4/LL/Src/stm32f4xx_ll_rcc.c	SDK/STM32/STM32F4/LL/Src/stm32f4xx_ll_utils.c SDK/STM32/STM32F4/LL/Src/stm32f4xx_ll_usart.c SDK/STM32/STM32F4/LL/Src/stm32f4xx_ll_exti.c

ASM_SOURCES = startup_stm32f401xc.s

GCC_PATH = Tools/gcc-arm-none-eabi/bin
PREFIX = arm-none-eabi-
CC = $(GCC_PATH)/$(PREFIX)gcc
AS = $(GCC_PATH)/$(PREFIX)gcc -x assembler-with-cpp
CP = $(GCC_PATH)/$(PREFIX)objcopy
SZ = $(GCC_PATH)/$(PREFIX)size

HEX = $(CP) -O ihex
BIN = $(CP) -O binary -S

CPU = -mcpu=
FPU = -mfpu=
FLOAT-ABI = -mfloat-abi=

MCU = $(CPU) -mthumb $(FPU) $(FLOAT-ABI)
AS_DEFS = 

C_DEFS = -DSTM32F401xC -DUSE_FULL_LL_DRIVER -DHSE_STARTUP_TIMEOUT=100 -DLSE_STARTUP_TIMEOUT=5000 -DLSE_VALUE=32768 -DEXTERNAL_CLOCK_VALUE=12288000 -DHSI_VALUE=16000000 -DLSI_VALUE=32000 -DVDD_VALUE=3300 -DPREFETCH_ENABLE=1 -DINSTRUCTION_CACHE_ENABLE=1 -DDATA_CACHE_ENABLE=1 -DHSE_VALUE=8000000

AS_INCLUDES =

C_INCLUDES = -I. -ISDK/STM32/STM32F4/LL/Inc -ISDK/CMSIS/Include -ISDK/Device/ST/STM32F4xx/Include

ASFLAGS = $(MCU) $(AS_DEFS) $(AS_INCLUDES) $(OPT) -Wall -fdata-sections -ffunction-sections
CFLAGS = $(MCU) $(C_DEFS) $(C_INCLUDES) $(OPT) -Wall -fdata-sections -ffunction-sections
ifeq ($(DEBUG), 1)
CFLAGS += -g -gdwarf-2
endif
CFLAGS += -MMD -MP -MF"$(@:%.o=%.d)"

LDSCRIPT = 

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