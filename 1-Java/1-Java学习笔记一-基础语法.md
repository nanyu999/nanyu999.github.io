# 1. Java跨平台原理

- 什么是平台

平台指的是操作系统平台，比如Windows、Linux、Mac

- 什么是跨平台？

Java程序可以在任意平台上运行

- 跨平台原理

不同国家的人之间交流需要翻译才能进行交流。

![](https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328094722.png)

同理，Java程序在不同的操作系统上运行时也需要一个翻译，而这个翻译就是Java虚拟机（JVM：Java Virtua
Machine），以下简称JVM。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328095349.png" style="zoom:80%;" />

我们只需要针对不同的操作系统提供不同的JVM即可实现Java跨平台。在Win上运行Java程序时提供Win版的JVM；在Mac上运行Java程序时提供Mac版的JVM；在Linux上运行Java程序时提供Linux版的JVM即可。

> 总结：在需要运行Java应用程序的操作系统上，安装一个与操作系统对应的Java虚拟机(JVM：Java Virtua
> Machine)即可。



# 2.JRE和JDK

## 2.1 什么是JRE？

JRE：(Java Runtime Environment)是Java程序运行时环境，包含**JVM**和运行时所需的**核心类库**。我们想要运行一个Java程序，只需要安装JRE即可。

> 上节说到JVM能保证Java跨平台运行，而JRE又包含JVM，所以我们只安装JRE也能保证Java跨平台运行



## 2.2 什么是JDK？

JDK：(Java Development Kit)，**包含JRE**和开发人员使用的**开发工具**。我们想开发一个全新的Java程序，必须要安装JDK。

开发工具：编译工具（javac.exe）、运行工具（java.exe）

>  实际开发时我们只需要JDK即可，因为它包含了JRE和开发工具。



## 2.3 关系图

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/jdk.png" style="zoom: 50%;" />



# 3.JDK下载与安装

[官网下载](https://www.oracle.com/java/technologies/javase-downloads.html)

**注意：**下载时要下载与自己电脑操作系统相对应的版本。



# 4.常用DOS命令

打开命令提示符窗口：

1.按下Win+R

2.在弹出框中输入cmd

3.敲回车或点确定

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328103722.png" style="zoom:50%;" />



常用命令

| 操作             | 说明                                          |
| ---------------- | --------------------------------------------- |
| D:回车或者d:回车 | 切换到D盘                                     |
| dir              | 查看当前路径下的所有内容                      |
| cd 目录          | 切换到指定目录 cd blog（按下Tab键可补齐目录） |
| cd ..            | 返回上级目录                                  |
| cd blog\themes   | 切换到多级目录                                |
| cd \             | 返回到当前盘的根目录                          |
| cls              | 清屏                                          |
| exit             | 退出命令提示符窗口                            |



# 5.Path环境变量配置

## 5.1 为什么配置环境变量

我们在开发Java程序时，需要用到JDK提供的开发工具，而这些工具在JDK的安装目录的bin目录下。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328105154.png" style="zoom: 50%;" />



如果不配置Java环境变量会怎么样？打开命令提示窗口，输入javac或java，然后回车就会会提示以下内容：

> 'javac' 不是内部或外部命令，也不是可运行的程序或批处理文件。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328105527.png" style="zoom: 67%;" />



怎么才能正常使用javac或java命令？

**方法一：**

执行javac或java命令时，先切换到JDK的bin目录下，再执行命令

![](https://gitee.com/nanyu99/picgo/raw/master/image/qwwreqrq.png)



**方法二：**

由于每次执行命令时都要切换到bin目录下，所有略显麻烦，在实际开发中也不方便，所以才有了一种一劳永逸的方法二，即配置环境变量。



## 5.2 配置环境变量（JDK8为例）

打开文件管理器，右键此电脑，选择属性。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/Snipaste_2021-03-28_11-39-02.png" style="zoom: 50%;" />

点击高级系统设置

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328114238.png" style="zoom: 50%;" />



点击环境变量

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328114407.png" style="zoom:50%;" />



找到系统变量，点击新建，会弹出窗口。

变量名：JAVA_HOME

变量值：JDK的安装路径

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328114647.png" style="zoom:50%;" />



在系统变量中找到Path，点击编辑

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328115000.png" style="zoom:50%;" />



点击新建，添加下图中两条变量，最后点击确定。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328115217.png" style="zoom:50%;" />



以上，Java环境变量已经配置完成，在任意目录下执行`javac`命令若如下图，则说明配置成功。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328115813.png" style="zoom: 50%;" />



# 6.第一个Java程序

开发一个Java程序需要三个步骤：**<font color=red>编写程序、编译程序、运行程序</font>**

> Java属于编译型语言，因此在运行Java程序之前需要先对Java源程序进行编译，编译成Java自己字节码文件，最后才能执行Java程序。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/%E5%9B%BE%E7%89%87112.png" style="zoom: 50%;" />



**第一个Java程序：Hello World：**

1.新建文本文档，修改名为HelloWorld.java

2.用记事本打开HelloWorld.java文本，输入以下内容并保存

```java
public class HelloWorld{
	public static void main (String [] args) {
		System.out.println("Hello World！");
}
}
```

3.打开命令提示符窗口，进入到HelloWorld.java所在目录，使用以下命令先对java源程序进行编译

```java
javac HelloWorld.java
```

编译完成后会在HelloWorld.java的同级目录下生成一个命名为java类名，后缀名为`.class`的文件HelloWorld.class，使用以下命令即可执行该字节码文件。

```java
//注意:java直接跟文件名，不能加后缀，加后缀会报错
java HelloWorld
```

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210328121216.png" style="zoom:50%;" />



# 7.常量、变量、数据类型

## 7.1 注释

- 注释指在程序指定位置添加说明性信息

- 注释不参与程序运行，仅起到说明作用

- 注释分为：单行注释、多行注释、文档注释



**单行注释**

```java
public class HelloWorld{
	public static void main (String [] args) {
        //这是单行注释，程序不会执行此行
		System.out.println("Hello World！");
}
}
```

**多行注释**

```java
public class HelloWorld{
	public static void main (String [] args) {
/*	这是多行注释
	程序不会执行我们
	我的注释范围比单行注释更广*/
		System.out.println("Hello World！");
}
}
```

**文本注释**

```java
/**
这是文档注释
**/
public class HelloWorld{
	public static void main (String [] args) {
		System.out.println("Hello World！");
}
}
```



#### 7.2 关键字

**关键字描述：**关键字就是被Java语言赋予了特殊含义的单词

**关键字的特点：**

- 关键字的字母全部小写

- 常用的代码编辑器对关键词有特殊的颜色显示

- 关键字有50多个左右

```java
//该程序中的public、class、void都是最常见的关键字，后期会学到更多的关键字
public class HelloWorld{
	public static void main(String [] args){
		System.out.println("Hello World");
	}
}
```



## 7.3 常量

**常量概述：**在程序运行过程中，其值不可以再发生改变的量

**常量分类：**

| 常量类型   | 说明             | 举例                        |
| ---------- | ---------------- | --------------------------- |
| 字符串常量 | 英文双引号括起来 | "钉子君博客" ， "钉子君"    |
| 整数常量   | 整数包括正负     | 18，-18，0                  |
| 小数常量   | 含有小数点的数字 | 1.5，10.0，10.00，-1.0，0.1 |
| 字符常量   | 用单引号括起来   | 'A'，'0'，'我'              |
| 布尔常量   | 布尔值，表真假   | 只有两个值：true、false     |
| 空常量     | 一个特殊值：空值 | null                        |

```java
public class HelloWorld{
	public static void main(String [] args){
        //字符串常量
		System.out.println("Hello World");
        //整数常量
       System.out.println(12);
       System.out.println(-12);
        //小数常量
       System.out.println(12.1);
       System.out.println(-12.1);
        //字符常量
       System.out.println('1');
       System.out.println('我');
       System.out.println('A');
        //布尔常量
       System.out.println(true);
       System.out.println(false);
        //空常量
       System.out.println(null);
	}
}
```



## 7.4 数据类型

- **计算机的存储单元**

计算机是可以用来存储数据的，但无论是内存还是硬盘，计算机存储设备的最小信息单元叫“位(bit)"，又称之

为“比特位”，通常用小写的字母” b”表示。而计算机中最小的存储单元叫“字节(byte)"，通常用大写字

母”B”表示，字节由连续的8个位组成。

1B(字节) = 8bit

1KB = 1024B

1MB = 1024kB

1GB = 1024MB

1TB = 1024GB



- **数据类型**

Java语言是强类型语言，对于每一种数据都给出了明确的数据类型，不同的数据类型也分配了不同的内存空间,所

以它们表示的数据大小也是不一样的。Java在声明变量时必须指明该变量的数据类型，但比如Python、

JavaScript就不许要指明数据类型。

> Java中的数据类型分为两大类分别是基本类型和引用类型，基本类型包含int，float，double，char，
>
> boolean等八种类型，引用类型包含类，数组，接口三种类型。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/as.jpg" style="zoom:67%;" />

| 数据类型 | 描述                                   | 占用字节 | 取值范围               | 默认值 |
| -------- | -------------------------------------- | -------- | ---------------------- | ------ |
| int      | 整型，用于存储整数                     | 4字节    | -2147483648~2147483647 | 0      |
| byte     | Java中最小的数据类型                   | 1字节    | -128~127               | 0      |
| short    | 短整型                                 | 2字节    | -32768~32717           | 0      |
| long     | 长整型                                 | 8字节    | -2^63~2^63-1           | 0L     |
| float    | 浮点型，用于存储带小数点的数字         | 4字节    |                        | 0.0f   |
| double   | 双精度浮点型，用于存储带有小数点的数字 | 8字节    |                        | 0.0d   |
| char     | 字符型，用于存储单个字符               | 2字节    | 0~65535                | 空     |
| boolean  | 布尔类型，用于判断真或假               | 1字节    | true、false            | false  |



- 数据类型之间的相互转换

类型转换分为：自动类型转换和强制类型转换

**自动类型转换：**将表示数值小的变量类型转换为表示数值类型大的数据类型，小数据类型转换为大数据类型可以自动转换。

表示数据范围从小到大图

![](https://gitee.com/nanyu99/picgo/raw/master/image/%E5%9B%BE%E7%89%87sw1.png)



案例：10为int类型，但将它赋值给double类型的变量时，10就自动转换为了浮点型10.0

```java
public class HelloWorld{
	public static void main(String [] args){
       double d=10;
		System.out.println(d);//结果为10.0
	}
}
```



**强制类型转换**：将表示数值大的变量类型转换为表示数值类型小的数据类型，大数据类型转换为小数据类型需强制转换。

案例：10.0为double类型，但将它赋值给int类型时，需要强制转换才能转换成功

```java
public class HelloWorld{
	public static void main(String [] args){
       int n=(int)10.0;//(目标数据类型)
		System.out.println(n);//结果为10
	}
}
```



## 7.6 变量

**变量概述：**在程序运行过程中，其值可以发生改变的量。从本质上来说，变量就是内存中的一小块区域

**变量定义：** 

格式：数据类型  变量名=变量值;

范例：`int num=10;`

**使用变量：** 取值和修改值

取值：变量名

范例：num

修改值：num=18;



变量使用的注意事项:

- 变量名字不能重复

- 变量未赋值不能使用

- long类型的变量定义的时为防止整数过大，后面要加L

- float类型变量定义时，为防止类型不兼容，后面要加F



# 8.运算符

## 8.1 算术运算符

| 符号 | 作用 | 说明                                   |
| ---- | ---- | -------------------------------------- |
| 加   | +    | 1+2=3，''1'+''2'=''12'' ，'A'+10=75    |
| 减   | -    | 2-1=1，1.5-1=0.5                       |
| 乘   | *    | 2*1=2，2.0 * 1=2.0                     |
| 除   | /    | 6/5=1，整数相除只能得到整数；6.0/5=1.2 |
| 取余 | %    | 8%4=0，0是两个数相除的余数             |

实例：

```java
public class Test1 {
    public static void main(String[] args) {
        int a=1;
        int b=2;
        System.out.print(a+b);
        System.out.print(b-a);
        System.out.print(a*b);
        System.out.print(a/b);
        System.out.print(b%a);
    }
}
```

**注意1：**

算术表达式中包含多个基本数据类型的值的时候，整个算术表达式的类型会自动进行提升。

提升规则：

- byte类型，short类型和char类型将被提升到int类型

- 整个表达式的类型自动提升到表达式中最高等级操作数同样的类型等级顺序: 

> byte,short,char →int → long → float  double

```java
public class Test1 {
	public static void main(String[] args) {     
		int a=1;     
		char b='A';     
      double c=10.1
	System.out.print(b+a);//11 ,结果提升为int类型
   System.out.print(b+c);//20.1 ,结果提升为double类型    
}
}
```

**注意2：**

字符也可以做+运算操作，并且字符也有数值。

详见：[ASCII对照表](https://tool.oschina.net/commons?type=4)

```java
public class Test1 {
    public static void main(String[] args) {
     int a=1;
     char b='A';//对应ASCII值为65
     System.out.print(b+a);//11
    }
}
```

**注意3：**

字符串也可以做+运算操作。

字符串相加，结果直接拼接

```java
public class Test1 {
    public static void main(String[] args) {
     int a=10;
     String b="钉子君";
     String c="牛哇牛哇";
     int d=6
     System.out.print(b+a);//钉子君11
     System.out.print(b+c);//钉子君牛哇牛哇
     System.out.print(b+a+d);//钉子君106
     System.out.print(a+d+b);//16钉子君
    }
}
```



## 8.2 赋值运算符

| 符号 | 作用       | 说明                |
| ---- | ---------- | ------------------- |
| =    | 赋值       | a=10;将10赋值给a    |
| +=   | 加后赋值   | a+=1;等价于a=a+1;   |
| -=   | 减后赋值   | a-=1;等价于a=a-1;   |
| *=   | 乘后赋值   | a*=1;等价于a=a * 1; |
| /=   | 除后赋值   | a/=1;等价于a=a/1;   |
| %=   | 取余后赋值 | a%=1;等价于a=a%1;   |

实例：

```java
public class Test1 {
    public static void main(String[] args) {
     int a=10;
     System.out.print(a);//10
     a+=10;
     System.out.print(a);//20
     a-=10;
     System.out.print(a);//0
     a*=10;
     System.out.print(a);//100
     a/=10;
     System.out.print(a);//1
     a%=3;
     System.out.print(a);//1
    }
}
```



## 8.3 自增/减运算符

自增：自动加一

自减：自动减一

实例：

```java
public class Test1 {
    public static void main(String[] args) {
   int a=1;
   //先输出a的值，再进行++操作
   System.out.println(a++);//1
   int b=1;
   //先进行++操作，再输出b的值
   System.out.println(++b);//2
   int c=2;
   //先输出c的值，再进行--操作
   System.out.println(c--);//2
   int d=2;
   //先进行--操作，再输出d的值
   System.out.println(--d);//1
    }
}
```



## 8.4 关系运算符

| 符号 | 说明                                                    |
| ---- | ------------------------------------------------------- |
| ==   | a==b，判断a和b的值是否相等，成立为true，不成立为false   |
| !=   | a!=b，判断a和b的值是否不相等，成立为true，不成立为false |
| >    | a>b，判断a是否大于b。成立为true，不成立为false          |
| >=   | a>=b，判断a是否大于等于b，成立为true，不成立为falsea<b  |
| <    | 判断a是否小于b，成立为true，不成立为falsea<=b           |
| <=   | 判断a是否小于等于b，成立为true，不成立为false           |

实例：

```java
public class Test1 {
    public static void main(String[] args) {
        int a=1;
        int b=1;
        int c=2;
        String str1="你好";
        String str2="你好";
        System.out.println(a==b);//true
        System.out.println(a==c);//false
        System.out.println(a<=c);//true
        System.out.println(a>=b);//true
        System.out.println(str1==str2);//true
    }
}
```



## 8.5 逻辑运算符

在数学中，一个数据x，大于3，小于6，我们可以这样来进行表示: 3<x<6。

但在Java中，不能直接写上面的表达式，需要把上面的式子先进行拆解，再进行合并。

- 拆解：x>3且x<6
- 合并：x>3&&x<6

**逻辑运算符**

| 符号 | 作用     | 说明                                        |
| ---- | -------- | ------------------------------------------- |
| &    | 逻辑与   | a&b,a和b都是true，结果为true，否则为false   |
| \|   | 逻辑或   | a\|b,a和b都是false，结果为false，否则为true |
| ^    | 逻辑异或 | a^b，a和b结果不同为true，相同为false        |
| ！   | 逻辑非   | !a，结果和a的结果正好相反                   |

```java
public class Test1 {
    public static void main(String[] args) {
        int a=1;
        int b=2;
        int c=3;
        System.out.println(b>a&c>a);//true
        System.out.println(b>c|c>a);//true
        System.out.println(b>c^c>a);//false^true   true
        System.out.println(b>a^c>a);//true^true    false
        System.out.println(b<a^c<a);//false^fasle  false
        System.out.println(b>a^c<a);//true^fasle   true
        System.out.println(!(b>a)^c<a);//fasle^fasle   false
    }
}
```

**短路逻辑运算符**

| 符号 | 作用   | 说明                           |
| ---- | ------ | ------------------------------ |
| &&   | 短路与 | 作用和&相同，但是有短路效果    |
| \|\| | 短路或 | 作用和\|相同，但是有短路或效果 |

- 逻辑与&，无论左边真假，右边都要执行。

短路与&&，如果左边为真，右边执行；如果左边为假。右边不执行。

- 逻辑或，无论左边真假，右边都要执行。

短路或|l，如果左边为假，右边执行；如果左边为真，右边不执行.

> 最常用的逻辑运算符：&&与||



## 8.6 三元运算符

格式：关系表达式？表达式1:表达式2

范例：a>b?a:b

计算规则：先计算关系表达式的值，如果值为true，表达式1的值就是运算结果。如果值为false，表达式2的值就是运算结果。

```java
public class Test1 {
    public static void main(String[] args) {
        int a=1;
        int b=2;
        //表达式成立则输出表达式1，表达式不成立输出表达式2
        System.out.println(a>b?a:b);//2
    }
}
```



#  9. 分支语句

流程控制语句分类：

- 顺序结构
- 分支结构（if，switch）
- 循环控制（for，while，do…while）



## 9.1 顺序结构

顺序结构是程序中最基本最简单的流程控制，它没有特定的语法结构，按照代码的先后顺序依次执行代码，程序中大部分代码都是这样执行的。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/shunxu.png" style="zoom:50%;" />

```java
public class Test1 {
    public static void main(String[] args) {
    System.out.println("这是顺序结构案例");
    System.out.println("没有特定的语法结构");
    System.out.println("按照代码的先后顺序依次执行代码");
    System.out.println("程序中大部分代码都是这样执行的");
    }
}
```



## 9.2 分支结构

### 9.2.1 if语句

**语法格式一：if**

```java
if(表达式){
 语句体;
}
```

执行流程:

- 首先计算关系表达式的值

- 如果关系表达式的值为true就执行语句体
- 如果关系表达式的值为false就不执行语句体

- 继续执行后面的语句内容

```java
public class Test1 {
    public static void main(String[] args) {
        int a = 1;
        int b = 2;
        if (a < b) {
            System.out.println("a小于b");
        }
    }
}
```



**语法格式二：if-else**

```java
if(表达式){
 语句体1;
}else{
 语句体2;
}
```

执行流程:

- 首先计算关系表达式1的值

- 如果关系表达式的值为true就执行语句体1
- 如果关系表达式的值为false就执行语句体2

```java
public class Test1 {
    public static void main(String[] args) {
        int a = 1;
        int b = 2;
        if (a < b) {
            System.out.println("a小于b");
        }else{
            System.out.println("a大于b");
        }
    }
}
```



**语法格式三：if…else-if**

```java
if(表达式1){
 语句体1;
}else if(表达式2){
 语句体2;
}else if(表达式3){
 语句体3;
 .
 .
 .
 
}else{
语句体n;
}
```

执行流程:

- 首先计算关系表达式1的值

- 如果关系表达式的值为true就执行语句体1
- 如果关系表达式1的值为false就执行表达式2
- 如果表达式2的值为true，则执行语句体2
- 如果表达式2的值为false，就执行表达式3
- 这样一直向下执行，如果所有表达式都不满足，则执行表达式n

```java
public class Test1 {
    public static void main(String[] args) {
        int a = 1;
        int b = 2;
        if (a < b) {
            System.out.println("a小于b");
        }else if(a>b){
            System.out.println("a大于b");
        }else{
            System.out.println("a等于b");
        }
    }
}
```

if…else-if 案例：

```java
import java.util.Scanner;
public class Test1 {
    public static void main(String[] args) {
        System.out.print("请输入你的成绩：");
        Scanner sc = new Scanner(System.in);
        int score = sc.nextInt();
        if (score >= 90 && score <= 100) {
            System.out.print("太棒啦！");
        } else if (score >= 70 && score < 90) {
            System.out.print("已经很不错啦！但还要继续努力哦！");
        } else if (score >= 60 && score < 70) {
            System.out.print("刚好及格，险过呀！");
        } else {
            System.out.print("别灰心，下次努努力，一定能及格的！");
        }
    }
}
```



### 9.2.2 switch语句

**语法格式：**

```java
switch(表达式){
case 值1:
    语句体1;
    break;
case 值2:
    语句体2;
    break;
case 值3:
    语句体3;
    break;
case 值4:
    语句体4;
    break;
 default:
   语句体n;
}
```

执行流程:

- 先计算表达式的值。

- 依次和case后面的值进行比较，如果有对应的值，就会执行相应的语句，在执行的过程中，遇到break就会结束。

- 如果所有的case后面的值和表达式的值都不匹配，就会执行default里面的语句体，然后程序结束掉。

实例：

```java
import java.util.Scanner;
public class Test1 {
    public static void main(String[] args) {
        System.out.print("请输入一个1-5的整数：");
        Scanner sc = new Scanner(System.in);
        int n=sc.nextInt();
        switch (n){
            case 1:
                System.out.print("你输入的是1");
                break;
            case 2:
                System.out.print("你输入的是2");
                break;
            case 3:
                System.out.print("你输入的是3");
                break;
            case 4:
                System.out.print("你输入的是4");
                break;
            case 5:
                System.out.print("你输入的是5");
                break;
            default:
                System.out.print("你输入的数有问题");
                break;
        }
        }
    }
```

如果不加break，程序就不会跳出，会自动执行到代码的最底端。



## 9.3 循环结构

循环结构的组成：

- 初始化语句:用于表示循环开启时的起始状态， 简单说就是循环开始的时候什么样

- 条件判断语句:用于表示循环反复执行的条件,简单说就是判断循环是否能-直执行 下去

- 循环体语句:用于表示循环反复执行的内容， 简单说就是循环反复执行的事情

- 条件控制语句:用于表示循环执行中每次变化的内容,简单说就是控制循环是否能执行下去



循环结构对应的语法:

- 初始化语句:这里可以是一 条或者多条语句,这些语句可以完成-些初始化操作

- 条件判断语句:这里使用一个结果值为boolean类型的表达式，这个表达式能决定是否执行循环体。例如: a<3

- 循环体语句: .这里可以是任意语句,这些语句将反复执行

- 条件控制语句:这里通常是使用一条语句来改变变量的值， 从而达到控制循环是否继续向下执行的效果。常见`i+ +` ,`j--`这样的操作



### 9.3.1 for循环

语法结构：

```java
for(初始化语句;条件判断语句;条件控制语句){
     循环体;
}
```

执行流程:

1.执行初始化语句

2.执行条件判断语句，看其结果是true还是false，如果是false,循环结束，如果是true,继续执行

3.执行循环体语句

4.执行条件控制语句

5.回到2继续



实例：

```java
for(int i=0;i<10;i++){
System.out.println(i);
}
```



### 9.3.2 while循环

语法格式：

```
while(条件判断语句){
循环体语句;
条件控制语句;
}
```

执行流程:

1.执行初始化语句

2.执行条件判断语句，看其结果是true还是false，如果是false,循环结束，如果是true,继续执行

3.执行循环体语句

4.执行条件控制语句

5.回到2继续



实例：

```java
int i=1;
while(i<10){
System.out.print(i);
i++
}
```



### 9.3.3 do…while循环

语法格式：

```java
do{
循坏体;
}while(条件控制语句)
```

执行流程:

1.执行初始化语句

2.执行循环体语句

3.执行条件控制语句

4.执行条件判断语句，看其结果是true还是false，如果是false,循环结束，如果是true,继续执行

5.回到2继续

```java
i=3;
do{
System.out.println('你好');
i++;
}while(i<3)
```



- **三种循环的区别：**

for循环和while循环先判断条件是否成立，然后决定是否执行循环体(先判断后执行)

do..while循环先执行一次循环体, 然后判断条件是否成立，是否继续执行循环体(先执行后判断)

- **while循环与for循环的区别：**

条件控制语句所控制的自增变量,因为归属for循环的语法结构中,在for循环结束后， 就不能再次被访问到了

条件控制语句所控制的自增变量，对于while循环来说不归属其语法结构中，在while循环结束后,该变量还可以续

使用



### 9.4.4 跳转控制语句

Java中的循环控制语句有两种，分别是：**continue**与**break**

**continue用法：**

用在循环中，基于条件控制，跳过某次循环体内容的执行，继续下一次的执行

```java
//输出结果为：0，1，3，4
public class Test1 {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            if (i == 2) {
                continue;
            }
            System.out.println(i);
        }
    }
}
```

**break**：

用在循环中，基于条件控制，终止循环体内容的执行，也就是说结束当前的整个循环

```java
//输出结果为：0，1,2
public class Test1 {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            if (i == 2) {
                break;
            }
            System.out.println(i);
        }
    }
}
```



#  10.数组

**数组概述：**

- 一次性声明大量的用于存储数据的变量。

- 要存储大的数据通常是相同的数据类型，比如：考试成绩

**什么是数组：**

数组（array）是一种用于存储多个相同数据类型的存储模型

**数组的定义格式：**

格式一（推荐使用）：

数据类型 [] 变量名:int [] arr

定义了一个int类型的数组，数组名为arr



格式二：

数据类型 变量名 []:int arr[]

定义了一个int类型的变量，变量名为数组arr



## 10.1 数组初始化

数组中的元素必须需要先初始化才能使用。-

- **什么是初始化**

初始化就是为数组中的数组元素分配内存空间，并为每个数组元素赋值。

- **动态初始化**

动态初始化：初始化时只指定数组的长度，由系统为数组分配初始值。

格式：数据类型 [] 变量名=new 数据类型[数组长度]

```java
public class Test1 {
    public static void main(String[] args) {
        int [] arr=new int[5];
    }
}
```

> int :数组的数据类型，也可以是String、double等
>
> []:说明这是一个数组
>
> arr:数组的名称
>
> new:关键字，为数组申请内存空间
>
> 5：数组长度，即数组中的元素个数。

- **静态初始化**

静态初始化：即在声明数组时，直接指明数组的元素。

格式：数据类型 [] 变量名=new 数据类型[元素1，元素2，元素3]

```java
public class Test1 {
    public static void main(String[] args) {
        int [] arr={1，2，3，4};
    }
}
```



## 10.2 数组元素访问及遍历数组

数组中元素的访问是通过数组名[索引]来实现的，所谓索引也叫下标就是给每一个数组元素分配一个从0开始的序号。

实例：

```java
public class Test1 {
    public static void main(String[] args) {
        int [] arr=new int[1，2，3，4];//下标从0开始，数组中1的下标为0，2的下标为1，3的下标为2，4的下标为3
        //直接输出数组名字的话得到的是数组在堆空间中的内存地址
        System.out.println(arr)
        //访问数组元素时就是通过下标来访问，比如访问数组中的元素2，元素2对应的下标为1，则
        System.out.println(arr[1])//输出为2
    }
}
```

数组的遍历

数组的遍历就是通过循环，将数组中的所有元素全部打印出来，其中循环我们一般用for循环。

```java
public class Test1 {
    public static void main(String[] args) {
        int [] arr=new int[1，2，3，4];
        //数组的ength属性用来获取数组的长度
        for(int i=0;i<arr.length;i++){
        System.out.println(arrp[i])
}
    }
}
```



## 10.3 内存分配

Java中的内存分配

> Java程序在运行时，需要在内存中分配空间。为了提高运算效率,就对空间进行了不同区域的划分，因为每一片区域都有特定的处理数据方 式和内存管理方式。

![](https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210330195409.png)

其中粉红色的内存区域为**栈内存**：存储局部变量，定义在方法中的变量，例如: arr，变量使用完毕后立即消除

右侧蓝色部分为**堆内存**：存储new出来的内容(实体,对象)，数组在初始化时，会为存储空间添加默认值

整数: 0；浮点数: 0.0；布尔: false；字符:空字符；引用数据类型: null

每一个new出来的东西都有一个地址值使用完毕，会在垃圾回收器**空闲时**被回收



## 10.4 数组常见两个问题

- 索引越界

如果声明一个长度为3的数组，则它的索引只能是0，1，2，如果使用时索引大于2，则会运行时报错

```java
public class Test1 {
    public static void main(String[] args) {
        int [] arr= {1,2,3};
        //索引越界
        System.out.println(arr[4]);
    }
}
//会报索引越界异常
/*
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 4
	at Test1.main(Test1.java:6)
*/

```

- 空指针异常

访问的数组已经不再指向堆内存的数据，造成空指针异常

```java
public class Test1 {
    public static void main(String[] args) {
        int [] arr= {1,2,3};
        //将数组值设为空
        arr=null;
        System.out.println(arr[1]);
    }
}
//会报空指针异常
/*
Exception in thread "main" java.lang.NullPointerException
	at Test1.main(Test1.java:7)
	*/
```



# 11. 方法

方法：方法是具有独立功能的代码块组织成为一个整体，使其具有特殊功能的代码集

方法必须先创建再使用，该过程成为方法的定义，创建完方法之后需要调用才能执行方法。



## 11.1 方法的定义与调用

方法的定义：

```java
public static void 方法名(){
        //方法体
    }
//实例
public static void run(){
    System.out.println("跑步")
}
```

方法的调用：

在调用方法之前，该方法必须被事先定义好的，如果没有定义而调用，则会报错。

```java
public class Test1 {
    public static void main(String[] args) {
        //方法的调用，调用run（）方法
        run();
    }

    public static void run() {
        System.out.print("跑步");
    }
}
```

实例：

```java
public class Test1 {
    public static void main(String[] args) {
        //2.调用方法
        getMax();
    }

    //1.定义方法
    public static void getMax() {
        int a = 10;
        int b = 12;
        if (a > b) {
            System.out.println(a);
        } else {
            System.out.println(b);
        }
    }
}
```



## 11.2 带参数的方法

形参与实参：

- 形参：形参是定义方法时定义的参数，等同于变量定义格式
- 实参：方法定义时，实际传入的参数，等同于使用变量或常量



带参数的方法的定义：

```java
public static void 方法名(数据类型 参数1,数据类型 参数2,数据类型 参数3…){
        //方法体
    }
//实例
public static void run(String name){
    System.out.println(name+"在跑步")
}
```

带参数的方法的调用：

方法调用时，参数的数量与类型必须与方法定义中的设置相匹配，否则程序将报错

```java
public class Test1 {
    public static void main(String[] args) {
        //方法的调用，调用run（）方法
        run("南雨");
    }

    public static void run(String name) {
        System.out.print("跑步");
    }
}
```

实例：

```java
public class Test1 {
    public static void main(String[] args) {
        //向getSum中传递的参数，必须与定义方法时设置的参数数据类型，和参数个数保持一致
        //1，2，3为实参
        getSum(1, 2, 3);
    }
//a,b,c为形参
    public static void getSum(int a, int b, int c) {
        System.out.print(a + b + c);
    }
}
```



## 11.3 带返回值方法的定义与调用

带返回值的方法的定义：

方法定义时return后面的返回值与方法定义上的数据类型要匹配，否则程序将报错

```java
public static 数据类型 方法名(参数){
reutrn 数据类型;
}
public static int getInt(int a){
return a;
}
public static String getString(String str){
return 100;
}
public static int getInt(int a){
return "南雨";
}
public static boolean getBoolean(int b){
return True;
}
```

带返回值方法的调用

格式一：

```java
方法名（参数）;
getboolean(0);
```

格式二：

```java
数据类型 变量名=方法名（参数）;
Boolean flag=getBoolean(0);
```

方法的返回值通常会使用变量接收,否则该返回值将无意义，所以更推荐用格式二来调用方法

实例：

```java
public class Test1 {
    public static void main(String[] args) {
        //向getSum中传递的参数，必须与定义方法时设置的参数数据类型，和参数个数保持一致
        int sum=-getSum(1, 2, 3);
        System.out.print(sum);
    }

    public static int getSum(int a, int b, int c) {
        int n=a+b+c;
        return n;
    }
}
```



## 11.4 有关方法注意事项

- 方法与方法之间不能嵌套定义，只能一个方法定义另一个方法。

- void关键字表示无返回值，课省略return，也可以单独写return，但return后面不加数据。

  

## 11.5 方法重载

**重载概述：**

方法重载指同一个类中定义的多个方法之间的关系，满足下列条件的多个方法相互构成重载

- 多个方法在同一个类中

- 多个方法具有相同的方法名

- 多个方法的参数不相同，类型不同或者数量不同

**重载特点：**

- 重载仅对应方法的定义，与方法的调用无关，调用方式参照标准格式

- 重载仅针对同一个类中方法的名称与参数进行识别，与返回值无关，不能通过返回值来判定两个方法是否相互构成重载

```java
public class Test1 {
    public static void main(String[] args) {
        //向getSum中传递的参数，必须与定义方法时设置的参数数据类型，和参数个数保持一致
        int sum=-getSum(1, 2, 3);
        int sum2=-getSum(1, 2);
        double sum1=getSum(1.7,1.9);
        System.out.println(sum);
        System.out.println(sum1);
        System.out.println(sum2);
    }

    public static int getSum(int a, int b, int c) {
        int n=a+b+c;
        return n;
    }
    public static int getSum(int a, int b) {
        int n=a+b;
        return n;
    }
    public static double getSum(double a, double b) {
        double n=a+b;
        return n;
    }
}
```



# 12. DeBug

**<font color=red>debug：</font>**

是供程序员使用的程序调试工具，它可以用于**查看程序的执行流程**，也可以**用于追踪程序执行过程来调试程序。**



**debug操作流程：**

Debug调试，又被称为断点调试，断点其实是一个标记，告诉我们从哪里开始查看。具体操作流程：如何加断点、如何运行加了断点的程序、看哪里、点哪里、如何删除断点



- 加断点

![](https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210330232934.png)



- 运行加了断点的程序

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/Snipaste_2021-03-30_23-36-27.png" style="zoom: 67%;" />



- 观察debug窗口

![](https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210330233826.png)



- 观察console窗口，观察运行结果

![](https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210330233941.png)



- 点F7键可向下执行代码，再次点击断点处可删除断点。

