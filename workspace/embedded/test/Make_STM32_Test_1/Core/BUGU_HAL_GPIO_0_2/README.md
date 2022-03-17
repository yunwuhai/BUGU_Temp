# BUGU_HAL_GPIO

## 说明

1. 本组件是`BUGU_HAL`组件的子组件，关于其命名规则请查看文件内部注释。
2. `inc`文件夹中的每个h文件，都代表一个类，里面会声明或初始化变量（对象），同时会包含函数声明（方法对外接口），这对于其他组件也是同理。
3. `src`文件夹中的每个c文件，都代表一个方法，里面会定义函数（方法），同时会引用其所属类的h文件，这对于其他组件也是同理。