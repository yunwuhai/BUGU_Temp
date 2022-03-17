// 引用组件
#include "../../Test_Func_1/inc/Object_1_0.h"
// 引用外部sdk
#include "stdio.h"

// 对于外部变参函数，我们不需要使用变参，只需要根据实际情况创建对应的重载即可
// 而前端的变参函数只需要在前端表现出变参即可，传到后端的参数数量仍然是确定的
#define TestPrint_0_0_1_0_printf_int_char(string, character, integer) printf(string, character, integer)