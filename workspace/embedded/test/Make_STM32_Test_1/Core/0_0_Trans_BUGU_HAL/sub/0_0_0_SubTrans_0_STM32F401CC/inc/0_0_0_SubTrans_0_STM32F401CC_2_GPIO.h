#ifndef __0_0_0_SUBTRANS_0_STM32F401CC_2_GPIO_H__
#define __0_0_0_SUBTRANS_0_STM32F401CC_2_GPIO_H__

#ifdef __cplusplus
extern "C" {
#endif

#include "stm32f4xx_ll_gpio.h"

typedef ErrorStatus Object_OptionEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_0_ErrorStatus;
#define Object_OptionEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_0_ErrorStatus_0_SUCCESS SUCCESS
#define Object_OptionEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_0_ErrorStatus_1_ERROR ERROR

/***************************************************************
对象：种类结构对象
所属组件：基础组件
继承关系：基础->数据->结构->种类结构
简介：种类结构的作用类似于枚举，但是枚举一般列举的是一个小种类的所有情况，而结构体一般用于列举一个大种类的所有不同小种类。
结构类和枚举类一样，也有本体初始化和副本初始化两种

移植：种类结构<->struct，BUGU种类结构可以和C语言标准struct之间相互转换。
struct构造的数据类型将是连续的，目前暂时不考虑位域。

前端：
用户在创建对象时，选择了基础组件中的种类结构后，即可创建一个种类结构对象。
种类结构和种类枚举基本相同，如果是本体初始化就只能在对象栏初始化，如果是副本初始化就必须在创建时建立链接。
在种类结构的创建对象弹窗中，至少需要提供如下内容：
1.结构名
2.结构英语名
3.结构简介
4.结构项表
结构项表列举了结构中所有的结构项，结构项的先后顺序需要用户自己排列
每个结构项至少需要提供如下内容：
1.结构项名
2.结构项英语名
3.结构项简介
4.结构项类
同时最好能在表后由系统自动计算出该结构体大小（暂时可以先不考虑）
如果是从后端引入，结构项英语名则是必填的。

后端：
后端解析BUGU种类结构到C的struct，需要生成：
typedef struct
{
    OptionType  OptionName;
    ...
}StructName
StructName的命名方式参考枚举，只是OptionEnum需要改成OptionStruct。
OptionType目前只支持8位、16位、32位（有符号/无符号)整数类（共计6种）和单/双精度浮点数类（共计2种）
OptionName同样参考枚举，只是其先后排列顺序不再是按照值自动排列，而是由用户自己决定。

而如果是从外部sdk引用的内容，则需要生成：
typedef SDK_StructName StructName
#define OptionName SDK_OptionName
具体参考枚举
***************************************************************/
typedef GPIO_TypeDef Object_OptionStruct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_1_GPIO_TypeDef;
#define Object_OptionStruct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_1_GPIO_TypeDef_0_U32_MODER      MODER  
#define Object_OptionStruct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_1_GPIO_TypeDef_1_U32_OTYPER     OTYPER    
#define Object_OptionStruct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_1_GPIO_TypeDef_2_U32_OSPEEDR    OSPEEDR
#define Object_OptionStruct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_1_GPIO_TypeDef_3_U32_PUPDR      PUPDR    
#define Object_OptionStruct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_1_GPIO_TypeDef_4_U32_IDR        IDR    
#define Object_OptionStruct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_1_GPIO_TypeDef_5_U32_ODR        ODR    
#define Object_OptionStruct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_1_GPIO_TypeDef_6_U32_BSRR       BSRR   
#define Object_OptionStruct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_1_GPIO_TypeDef_7_U32_LCKR       LCKR   
#define Object_OptionStruct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_1_GPIO_TypeDef_8_U32_AFR        AFR    

typedef LL_GPIO_InitTypeDef Object_Struct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_2_LL_GPIO_InitTypeDef;
#define Object_Struct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_2_LL_GPIO_InitTypeDef_0_DataEnum_Pin           Pin
#define Object_Struct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_2_LL_GPIO_InitTypeDef_1_DataEnum_Mode          Mode
#define Object_Struct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_2_LL_GPIO_InitTypeDef_2_DataEnum_Speed         Speed
#define Object_Struct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_2_LL_GPIO_InitTypeDef_3_DataEnum_OutputType    OutputType
#define Object_Struct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_2_LL_GPIO_InitTypeDef_4_DataEnum_Pull          Pull
#define Object_Struct_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_2_LL_GPIO_InitTypeDef_5_DataEnum_Alternate     Alternate

#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_0_LL_GPIO_PIN_0       LL_GPIO_PIN_0  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_1_LL_GPIO_PIN_1       LL_GPIO_PIN_1  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_2_LL_GPIO_PIN_2       LL_GPIO_PIN_2  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_3_LL_GPIO_PIN_3       LL_GPIO_PIN_3  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_4_LL_GPIO_PIN_4       LL_GPIO_PIN_4  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_5_LL_GPIO_PIN_5       LL_GPIO_PIN_5  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_6_LL_GPIO_PIN_6       LL_GPIO_PIN_6  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_7_LL_GPIO_PIN_7       LL_GPIO_PIN_7  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_8_LL_GPIO_PIN_8       LL_GPIO_PIN_8  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_9_LL_GPIO_PIN_9       LL_GPIO_PIN_9  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_10_LL_GPIO_PIN_10     LL_GPIO_PIN_10 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_11_LL_GPIO_PIN_11     LL_GPIO_PIN_11 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_12_LL_GPIO_PIN_12     LL_GPIO_PIN_12 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_13_LL_GPIO_PIN_13     LL_GPIO_PIN_13 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_14_LL_GPIO_PIN_14     LL_GPIO_PIN_14 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_15_LL_GPIO_PIN_15     LL_GPIO_PIN_15 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_3_LL_GPIO_PIN_16_LL_GPIO_PIN_ALL    LL_GPIO_PIN_ALL

#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_4_LL_GPIO_MODE_0_LL_GPIO_MODE_INPUT      LL_GPIO_MODE_INPUT    
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_4_LL_GPIO_MODE_1_LL_GPIO_MODE_OUTPUT     LL_GPIO_MODE_OUTPUT   
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_4_LL_GPIO_MODE_2_LL_GPIO_MODE_ALTERNATE  LL_GPIO_MODE_ALTERNATE
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_4_LL_GPIO_MODE_3_LL_GPIO_MODE_ANALOG     LL_GPIO_MODE_ANALOG   

#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_5_LL_GPIO_SPEED_FREQ_0_LL_GPIO_SPEED_FREQ_LOW        LL_GPIO_SPEED_FREQ_LOW      
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_5_LL_GPIO_SPEED_FREQ_1_LL_GPIO_SPEED_FREQ_MEDIUM     LL_GPIO_SPEED_FREQ_MEDIUM   
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_5_LL_GPIO_SPEED_FREQ_2_LL_GPIO_SPEED_FREQ_HIGH       LL_GPIO_SPEED_FREQ_HIGH     
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_5_LL_GPIO_SPEED_FREQ_3_LL_GPIO_SPEED_FREQ_VERY_HIGH  LL_GPIO_SPEED_FREQ_VERY_HIGH

#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_6_LL_GPIO_OUTPUT_0_LL_GPIO_OUTPUT_PUSHPULL   LL_GPIO_OUTPUT_PUSHPULL 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_6_LL_GPIO_OUTPUT_1_LL_GPIO_OUTPUT_OPENDRAIN  LL_GPIO_OUTPUT_OPENDRAIN

#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_7_LL_GPIO_PULL_0_LL_GPIO_PULL_NO     LL_GPIO_PULL_NO  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_7_LL_GPIO_PULL_1_LL_GPIO_PULL_UP     LL_GPIO_PULL_UP  
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_7_LL_GPIO_PULL_2_LL_GPIO_PULL_DOWN   LL_GPIO_PULL_DOWN

#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_0_LL_GPIO_AF_0     LL_GPIO_AF_0 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_1_LL_GPIO_AF_1     LL_GPIO_AF_1 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_2_LL_GPIO_AF_2     LL_GPIO_AF_2 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_3_LL_GPIO_AF_3     LL_GPIO_AF_3 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_4_LL_GPIO_AF_4     LL_GPIO_AF_4 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_5_LL_GPIO_AF_5     LL_GPIO_AF_5 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_6_LL_GPIO_AF_6     LL_GPIO_AF_6 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_7_LL_GPIO_AF_7     LL_GPIO_AF_7 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_8_LL_GPIO_AF_8     LL_GPIO_AF_8 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_9_LL_GPIO_AF_9     LL_GPIO_AF_9 
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_10_LL_GPIO_AF_10   LL_GPIO_AF_10
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_11_LL_GPIO_AF_11   LL_GPIO_AF_11
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_12_LL_GPIO_AF_12   LL_GPIO_AF_12
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_13_LL_GPIO_AF_13   LL_GPIO_AF_13
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_14_LL_GPIO_AF_14   LL_GPIO_AF_14
#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_8_LL_GPIO_AF_15_LL_GPIO_AF_15   LL_GPIO_AF_15

#define Object_DataEnum_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_9_0_GPIOA   GPIOA

/***************************************************************
这里出现了多个本体参数，是因为函数中使用了多个指针传值。
BUGU中本体参数可以直接理解成C的指针传值，此处示范的是从外部导入的情况，方法名和参数对象名命名方法的逻辑和前面是一样的
同时可以发现，如果引入函数有返回值，那么方法的第一个本体参数就是对应了这个返回值。
当在后端解析参数时，如果时一个有返回值的引入函数，那么处理其返回值也就是第一个本体参数的时候，如果希望直接传参，可以使用强制转换传给一个自定义堆栈然后将该堆栈指定位置使用强制转换发送（具体在核心方法中可以看到）。
这主要是目前为了希望使用返回值直接传参以尽量小的时间损耗来减小内存损耗的暂时的权宜之计，未来应该从汇编或语法层面思考更加合适的方案
***************************************************************/
#define Func_0_0_0_SubTrans_0_STM32F401CC_2_GPIO_0_LL_GPIO_Init_0_Extern(OFormParam_OptionEnum_0_State, OFormParam_DataEnum_1_GPIOx, OFormParam_OptionStruct_2_GPIO_InitStruct) *OFormParam_OptionEnum_0_State = LL_GPIO_Init(OFormParam_DataEnum_1_GPIOx, OFormParam_OptionStruct_2_GPIO_InitStruct)

#ifdef __cplusplus
}
#endif

#endif