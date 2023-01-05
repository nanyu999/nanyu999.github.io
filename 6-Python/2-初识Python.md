### 1.1 Python简介

<hr>

#### 1.1.1 Python发展史

1. 1989年圣诞节：Guido von Rossum开始写Python语言的编译器。
2. 1991年2月：第一个Python编译器（同时也是解释器）诞生，它是用C语言实现的（后面），可以调用C语言的库函数。在最早的版本中，Python已经提供了对“类”，“函数”，“异常处理”等构造块的支持，还有对列表、字典等核心数据类型，同时支持以模块为基础来构造应用程序。
3. 1994年1月：Python 1.0正式发布。
4. 2000年10月16日：Python 2.0发布，增加了完整的[垃圾回收](https://zh.wikipedia.org/wiki/垃圾回收_(計算機科學))，提供了对[Unicode](https://zh.wikipedia.org/wiki/Unicode)的支持。与此同时，Python的整个开发过程更加透明，社区对开发进度的影响逐渐扩大，生态圈开始慢慢形成。
5. 2008年12月3日：Python 3.0发布，它并不完全兼容之前的Python代码，不过因为目前还有不少公司在项目和运维中使用Python 2.x版本，所以Python 3.x的很多新特性后来也被移植到Python 2.6/2.7版本中。

#### 1.1.2 Python的优缺点

**Python优点**

+ 简单明了，容易上手，比其他语言易学
+ 开放源代码，拥有很强大的社区和生态圈，尤其是在数据分析和机器学习领域、
+ 解释型语言，具有很强的移植性，代码可工作于不同的平台
+ 支持面向对象式编程和函数式编程】
+ 代码规范性高，可读性强

**Python的缺点**

- 执行效率稍低，对执行效率要求高的部分可以由其他语言（如：C、C++）编写。

- 代码无法加密，但是现在很多公司都不销售卖软件而是销售服务，这个问题会被弱化。

- 在开发时可以选择的框架太多（如Web框架就有100多个），有选择的地方就有错误。

#### 1.1.3 Python的应用领域

目前Python在Web应用后端开发、云基础设施建设、DevOps、爬虫、自动化自测、数据分析、机器学习等领域应用广泛。

### 1.2 安装Python

<hr>

- **查看Python版本**


可以Windows的命令行提示符中键入下面的命令。

> python --version

在Linux或macOS系统的终端中键入下面的命令。

> python3 --version



### 1.3Python语法基础



<img src="D:\Appinstall\Typora\所有笔记\Python学习笔记\Pythonimg\图片1.png" style="zoom:77%;" />

**Python语法特点**

- **注释规则：**单行注释**#**，多行注释（3 个单引号（'''）或 双引号（"""））

- **语句换行：**语句太长，可使用反斜杠（\）可以实现一条长语句的换行；以小括号()、中括号[]或大括号{}包含起来的语句，不必使用反斜杠也可以被分成多行。

- **一行写多个语句：**Python 允许将多个语句写在同一行上，语句之间用分号隔开，例如：

  `a=10; b=20;print(a+b)`

- **代码块：**缩进位置相同的一组语句形成一个代码块。例如，在下面示例代码中，if True：下面的两行代码就构成了一个代码块。

  ```python
  if True: 
   print ("结果:") 
   print ("True") 
  ```

- 缩进分层：Python 最具特色的语法特点就是以缩进的方式来标识代码块，不再需要使用大括号（{}），使得代码看起来更加简洁。Python 程序中同一个代码块中的语句必须保证相同的缩进空格数，缩进的空格数没有硬性规定，但必须保证空格数是相同的，否则将会出错

- 模块：Python中的模块分为内置模块和非内置模块。内置模块不需手动导入，启动Python时系统会自动导入，任何程序都可以直接使用它们。非内置模块以文件的形式存在于Python的安装目录中，程序使用前需要导入模块。导入模块的语法格式如下：

   **import [模块名]**

  例如，导入数学模块：`import math` # 导入数学模块

  

#### 1.3.1 第一个Python程序

使用Pycharm编写第一个Python程序HelloWorld

```python
print('Hello World')
```

![](D:\Appinstall\Typora\所有笔记\Python学习笔记\Pythonimg\QQ截图20210227160800.png)

![](D:\Appinstall\Typora\所有笔记\Python学习笔记\Pythonimg\QQ截图20210227160923.png)

**命令行模式运行程序**

切换到源代码所在的目录并执行下面的命令，看看屏幕上是否输出了"hello, world!"。

```python
python hello.py
```

#### 1.3.2 代码注释

1. 单行注释 - 以#和空格开头的部分
2. 多行注释 - 三个引号开头，三个引号结尾

```python
'''
print('Hello World') 多行注释
print("多行注释")# 多行注释
'''

# print("多行注释") 单行注释
```

#### 1.2.3 Python之禅

在编辑器中输入下面代码并运行程序

```python
import this
```

> **说明**：输入上面的代码，在Python的交互式环境中可以看到Tim Peter撰写的[“Python之禅”](https://github.com/jackfrued/Python-100-Days/blob/master/Python之禅.md)，里面讲述的道理不仅仅适用于Python，也适用于其他编程语言。

#### 1.2.4 使用turtle在屏幕上绘制图形。

> **说明**：turtle是Python内置的一个非常有趣的模块，特别适合对计算机程序设计进行初体验的小伙伴，它最早是Logo语言的一部分，Logo语言是Wally Feurzig和Seymour Papert在1966发明的编程语言。

```python
import turtle

turtle.pensize(4)
turtle.pencolor('red')

turtle.forward(100)
turtle.right(90)
turtle.forward(100)
turtle.right(90)
turtle.forward(100)
turtle.right(90)
turtle.forward(100)
turtle.mainloop()
```

#### 1.3.3 变量和类型

程序设计中，变量是一种存储数据的载体。计算机中的变量是实际存在的数据或者说是存储器中存储数据的一块

内存空间，变量的值可以被读取和修改，这是所有计算和控制的基础。计算机能处理的数据有很多种类型，除了数

值之外还可以处理文本、图形、音频、视频等各种各样的数据，那么不同的数据就需要定义不同的存储类。

Python中的数据类型很多，而且也允许我们自定义新的数据类型，我们先介绍几种常用的数据类型。

- 整型：Python中可以处理**任意大小的整数**（Python 2.x中有int和long两种类型的整数，但这种区分对Python来说意义不大，因此在Python 3.x中整数只有int这一种了），而且支持二进制（如`0b100`，换算成十进制是4）、八进制（如`0o100`，换算成十进制是64）、十进制（`100`）和十六进制（`0x100`，换算成十进制是256）的表示法。

```python
a=1;#a是整型
b=12241412545262345;#b也是整型
print(a,b);
```

- 浮点型：浮点数也就是小数，之所以称为浮点数，是因为按照科学记数法表示时，一个浮点数的小数点位置是可变的，浮点数除了数学写法（如`123.456`）之外还支持科学计数法（如`1.23456e2`）。

```python
a=1.10;#a是浮点型
b=1.2e2;#b也是浮点型
print(a,b);
```

- 字符串型：字符串是以单引号或双引号括起来的任意文本，比如`'hello'`和`"hello"`,字符串还有原始字符串表示法、字节字符串表示法、Unicode字符串表示法，而且可以书写成多行的形式（用三个单引号或三个双引号开头，三个单引号或三个双引号结尾）。****

```python
print('你好~')
print('''q
asdadfsafdafa
asfassfa
      q''')
```

- 布尔型：布尔值只有`True`、`False`两种值，要么是`True`，要么是`False`，在Python中，可以直接用`True`、`False`表示布尔值（请注意大小写），也可以通过布尔运算计算出来（例如`3 < 5`会产生布尔值`True`，而`2 == 1`会产生布尔值`False`）。

```python
print(3>1)#true
print(3>5)#false
```

- 复数型：形如`3+5j`，跟数学上的复数表示一样，唯一不同的是虚部的`i`换成了`j`。

```python
a=-1+3j;
print(a)#(-1+3j)
print(a.imag)#3.0
print(a.real)#-1.0
```



#### 1.3.4 变量命名及使用

在Python中，变量命名需要遵循以下这些必须遵守硬性规则和强烈建议遵守的非硬性规则。

- 变量名有字母、数字、下划线、美元符号构成，数字不能开头
- 大小写敏感
- 不能是关键字和系统保留字

- 用小写字母拼写，多个单词用下划线连接。
- 受保护的实例属性用单个下划线开头（后面会讲到）。
- 私有的实例属性用两个下划线开头（后面会讲到）。

作为一个专业的程序员，给所有的标识符命名时做到见名知意也是非常重要的。

**变量赋值及运算**

**示例一**

```python
a=121;
b=11;
print(a+b);#加
print(a/b);#除
print(a-b);#减
print(a//b);#整除
print(a**b);#幂
print(a%b);#模
```

**示例二**

```python
#input()输入
f=input('请输入你的年龄：');
#type()函数判断变量的类型
print(type(f))#<class 'str'>字符串类型
#int（）转换数据类型
ff=int(f);#<class 'int'>整数类型
print(type(ff))#<class 'str'>字符串类型
print('你今年'+f+'岁了');#你今年12岁了 用+拼接时所有参数类型必须相同
print('你今年',ff,'岁了');#你今年 12 岁了 用，拼接时参数类型不一定相同
```

**示例三**

```python
a = int(input('a = '))#1
b = int(input('b = '))#3
print('%d + %d = %d' % (a, b, a + b))
print('%d - %d = %d' % (a, b, a - b))
print('%d * %d = %d' % (a, b, a * b))
print('%d / %d = %f' % (a, b, a / b))
print('%d // %d = %d' % (a, b, a // b))
print('%d %% %d = %d' % (a, b, a % b))
print('%d ** %d = %d' % (a, b, a ** b))
```

**示例四**

```python
a = 100
b = 12.345
c = 1 + 5j
d = 'hello, world'
e = True
print(type(a))
print(type(b))
print(type(c))
print(type(d))
print(type(e))
```



#### 1.3.5 标准输入输出函数

- **标准输入函数input（）**

Python 内置的**input()** 函数用于接收用户通过键盘输入的字符串。**input()**函数的基本语法格式如下：

`input([prompt])`

其中，prompt 是可选参数，在输入的时候起辅助作用，提示用户输入需要输入什么样的数据。当用户输入数据并按回车后，input 函数就会返回字符串对象，通常需要一个变量来接收用户输入的数据。

`name = input("请输入一个歌星的姓名：")`



```python
#input()输入
f=input('请输入你的年龄：');
#type()函数判断变量的类型
print(type(f))#<class 'str'>字符串类型
#int（）转换数据类型
ff=int(f);#<class 'int'>整数类型
print(type(ff))#<class 'str'>字符串类型
print('你今年'+f+'岁了');#你今年12岁了 用+拼接时所有参数类型必须相同
print('你今年',ff,'岁了');#你今年 12 岁了 用，拼接时参数类型不一定相同
```

在一行中依次输入数值，并用空格分开

```python
a,b,c=input().split()
#输出样例
3 4 5
```

**案例一:根据输入的数字打印乘法表**

```python
n=int(input())
for x in range(1,n+1):
    for y in range(1,x+1):
        print('%d*%d=%d'%(y,x,x*y),end=' ')
    print()
```

- **标准输出函数print（）**

Python 内置的print () 函数用于输出显示数据。print ()函数的基本语法格式如下：

`print(value,…，sep=' ' ,end='\n')`

value 是表示输出对象，后面的省略号表示可以列出多个输出对象，以逗号隔开。

sep 用于设置多个要输出信息之间的分隔符，默认值为一个空格。

end 表示 print语句的结束符号，默认值为换行符。

```python
print("我最喜欢的歌星是","邓丽君",sep=',')
print("我最喜欢的歌星是","邓丽君",end='$')
```



#### 1.3.6 数据类型

**Python中的数据类型**

简单数据类型：数字类型（int、float、bool、compiex）、字符串类型

复杂数据类型：List、Set、Tuple、Dictionary

![](D:\Appinstall\Typora\所有笔记\Python学习笔记\Pythonimg\图片2.png)



**<font color=red> 数字类型：</font>**

- **int（整型）：**用于表示整数，不带小数点，但可以有正号或负号，例如：10、1024、-100、99、-66等。

Python 3.9对整型是没有大小限制的，只要内存许可，整数的取值范围几乎包括了全部整数（无限大），这给大

数据的计算带来便利。在Python 3.9中，只有一种整数类型 int，没有Python 2.7中的Long。

- **float（浮点型）：**小数形式，示例：1.23、100.0、-123.45、-0.123

- **bool（布尔型）：**布尔类型的值只有两个： True 和 False，表示真和假。如果将布尔值进行数值运算，True 

会被当做整数 1，False 会被当做整数 0

- **complex（复数类型）:**复数由实数（real）部分与虚数（imag）部分构成，表示形式为 real + imag（j/J后缀），实数和虚数部分都是浮点数。复数的示例如下：

```python
c=1.5+0.7j
#实数
a=c.real=1.5
#虚数
b=c.imag=0.7
```



**<font color=red> 字符串类型：</font>**

**标识字符串**

- 用单引号标识字符串。

- 用双引号标识字符串。

- 用三引号（'''或者"""）标识字符串。

三引号相比单引号和双引号，有一个特殊的功能，它能够标识一个多行的字符串，而且该多行字符串中的换行、缩进等格式都会原封不动地保留。

**转义字符**

Python中的转义字符是以反斜杠“\”为前缀，转义字符的意义就是避免字符出现二义性，二义性是所有编程语言都不允许的。

![](D:\Appinstall\Typora\所有笔记\Python学习笔记\Pythonimg\图片3.png)



**字符串常用方法**

![](D:\Appinstall\Typora\所有笔记\Python学习笔记\Pythonimg\图片4.png)



#### 1.3.7 数据类型转换



- int()：将一个数值或字符串转换成整数，可以指定进制。
- float()：将一个字符串转换成浮点数。
- str()：将指定的对象转换成字符串形式，可以指定编码。
- chr()：将整数转换成该编码对应的字符串（一个字符）。
- ord()：将字符串（一个字符）转换成对应的编码（整数）。

```python
a = 100
b = '12.345'
c = '11'
d = 'h'
print(int(c));
print(float(b));
print(str(a));
print(chr(a));
print(ord(d))
```

计算结果如下

```python
11
12.345
100
d
104
```




#### 1.3.8 类型判断函数type()

```python
a = 100
b = 12.345
c = 1 + 5j
d = 'hello, world'
e = True
print(type(a))
print(type(b))
print(type(c))
print(type(d))
print(type(e))
```

输出结果如下

```python
<class 'int'>
<class 'float'>
<class 'complex'>
<class 'str'>
<class 'bool'>
```



#### 1.3.9 占位符

在python中，占位符的表示有三种：

- %s字符串占位符
- %d整数占位符
- %f浮点数占位符
- %c字符占位符

%f只能占位浮点数，%.xf 则是精确至小数点后x位，而%1f表示保留1位，%2f表示保留2位，

```python
a = int(input('a = '))#1
b = int(input('b = '))#3
c=input()#哈哈
d=float(input())#1.4
print('%d + %d = %d' % (a, b, a + b))
print('%d - %d = %d' % (a, b, a - b))
print('%d * %d = %d' % (a, b, a * b))
print('%d / %d = %f' % (a, b, a / b))
print('%d // %d = %d' % (a, b, a // b))
print('%d %% %d = %d' % (a, b, a % b))
print('%d ** %d = %d' % (a, b, a ** b))
print('你叫%s'%c)#你叫哈哈
print('保留两位小数%.2f'%a)#1.00
```

输出结果如下

```python
a = 1
b = 3
1 + 3 = 4
1 - 3 = -2
1 * 3 = 3
1 / 3 = 0.333333
1 // 3 = 0
1 % 3 = 1
1 ** 3 = 1
```



#### 1.3.10 运算符的使用

Python支持多种运算符，下表大致按照优先级从高到低的顺序列出了所有的运算符，我们会陆续使用到它们。

| `[]` `[:]`                                      | 下标，切片                     |
| ----------------------------------------------- | ------------------------------ |
| `**`                                            | 指数                           |
| `~` `+` `-`                                     | 按位取反, 正负号               |
| `*` `/` `%` `//`                                | 乘，除，模，整除               |
| `+` `-`                                         | 加，减                         |
| `>>` `<<`                                       | 右移，左移                     |
| `&`                                             | 按位与                         |
| `^` `                                           | `                              |
| `<=` `<` `>` `>=`                               | 小于等于，小于，大于，大于等于 |
| `==` `!=`                                       | 等于，不等于                   |
| `is` `is not`                                   | 身份运算符                     |
| `in` `not in`                                   | 成员运算符                     |
| `not` `or` `and`                                | 逻辑运算符                     |
| `=` `+=` `-=` `*=` `/=` `%=` `//=` `**=` `&=` ` | =` `^=` `>>=` `<<=`            |

**逻辑运算的真值表**

![](D:\Appinstall\Typora\所有内容\Python学习笔记\Pythonimg\图片5.png)

**赋值运算符**

在 Python 中，使用 = 可以给变量赋值，在算术运算时，为了简化代码，Python 还提供了一系列的与算术运算符对应的赋值运算符

![](D:\Appinstall\Typora\所有笔记\Python学习笔记\Pythonimg\图片6.png)

运算符练习

```python
a=4;
b=7;
print('a=',a)
print(a+b);#加
print(a/b);#除
print(a-b);#减
print(a//b);#整除
print(a**b);#幂
print(a%b);#模
flag1=a>b;#false
flag2=a<b;#true
flag3=flag1 and flag2;4#false
flag4=flag1 or flag3;#true
flag5=not flag1;#true
print('flag1=',flag1);
print('flag2=',flag2);
print('flag3=',flag3);
print('flag4=',flag4);
print('flag5=',flag5);
print(flag1 is not True);#True首字母大写
print(flag2 is not False);
print(flag3 is False);
```

计算结果如下

```python
a= 4
11
0.5714285714285714
-3
0
16384
4
flag1= False
flag2= True
flag3= False
flag4= False
flag5= True
True
True
True
```

**练习一：华氏温度转换为摄氏温度**

```python
f = float(input('请输入华氏温度: '))
#度数转换
c = (f - 32) / 1.8
#占位符
print('%.1f华氏度 = %.1f摄氏度' % (f, c))
```

**练习二：输入圆的半径求圆的面积和周长**

```python
import math;
r=int(input('请输入圆的半径：'));
s=math.pi*r*r;
c=2*math.pi*r;
print('周长：%.2f'%c);
print('面积：%.2f'%s);
```

**练习三：输入年份判断是不是闰年。**

```python
year=int(input('请输入年份：'));
is_leap=(year % 4 == 0 and year % 100 != 0 or
           year % 400 == 0);
print(is_leap);
```



### 1.4 分支控制结构

<hr>

迄今为止，我们写的Python代码都是一条一条语句顺序执行，这种结构的代码我们称之为顺序结构。然而仅有顺序结构并不能解决所有的问题，比如我们设计一个游戏，游戏第一关的通关条件是玩家获得1000分，那么在完成本局游戏后我们要根据玩家得到分数来决定究竟是进入第二关还是告诉玩家“Game Over”，这里就会产生两个分支，而且这两个分支只有一个会被执行，这就是程序中分支结构。



#### 1.4.1 if语句的使用

```python
admin=input('请输入用户名：');
passwd=input('请输入密码：');
if admin=='dingding' and passwd=='123456':
    print('欢迎光临！');
else :
    print('滚！');
```

和C/C++、Java等语言不同，Python中没有用花括号来构造代码块而是**使用了缩进的方式来设置代码的层次结构**，如果`if`条件成立的情况下需要执行多条语句，**只要保持多条语句具有相同的缩进**就可以了，换句话说连续的代码如果又保持了相同的缩进那么它们属于同一个代码块，相当于是一个执行的整体。



#### 1.4.2 if···elif···else语句的使用

f(x)={3x−5(x>1)\x+2(-1≤x≤1)\5x+3(x<-1)

```python
# f(x)={3x−5(x>1)\x+2(-1≤x≤1)\5x+3(x<-1)
x=int(input('请输入一个整数：'));
if x>1 :
    y=3*x-5;
elif x>=-1 and x<=1:
    y=x+2;
else :
    y=5*x+3;
print('f(%d)=%d'%(x,y));
```

当然根据实际开发的需要，分支结构是可以嵌套的，例如判断是否通关以后还要根据你获得的宝物或者道具的数量对你的表现给出等级（比如点亮两颗或三颗星星），那么我们就需要在`if`的内部构造出一个新的分支结构，同理`elif`和`else`中也可以再构造新的分支，我们称之为嵌套的分支结构，也就是说上面的代码也可以写成下面的样子。

```python
x = float(input('x = '))
if x > 1:
    y = 3 * x - 5
else:
    if x >= -1:
        y = x + 2
    else:
        y = 5 * x + 3
print('f(%.2f) = %.2f' % (x, y))
```



**练习一：掷色子**

**说明：**代码中使用了random模块的randint函数生成指定范围的随机数来模拟掷骰子。

```python
# 掷色子
from random import randint;
face=randint(1,6);
if face==1:
    print('唱歌吧');
elif face==2:
    print('跳舞吧');
elif face==3:
    print('吃饭吧');
elif face==4:
    print('逛街吧');
elif face==5:
    print('喝酒吧');
else:
    print('旅游把');
```

**练习二：分值转换**

```python
grade=int(input('请输入你的分数：'));
if grade>=90 and grade<=100:
    degree='A';
elif grade>=70 and grade<90:
    degree='B';
elif grade>=60 and grade<70:
    degree='C';
elif grade>=40 and grade<60:
    degree='D';
elif grade>=0 and grade<40:
    degree='E';
else:
    degree = '留级吧';
print('对应的等级是',degree);
```



### 1.5 循环控制结构

<hr>

如果在程序中我们需要重复的执行某条或某些指令，例如用程序控制机器人踢足球，如果机器人持球而且还没有进

入射门范围，那么我们就要一直发出让机器人向球门方向奔跑的指令。当然你可能已经注意到了，刚才的描述中其

实不仅仅有需要重复的动作，还有我们上一个章节讲到的分支结构。再举一个简单的例子，比如在我们的程序中要

实现每隔1秒中在屏幕上打印一个"hello, world"这样的字符串并持续一个小时，我们肯定不能够将`print('hello, `

`world')`这句代码写上3600遍，如果真的需要这样做那么编程的工作就太无聊了。因此，我们需要了解一下循环

结构，有了循环结构我们就可以轻松的控制某件事或者某些事重复、重复、再重复的发生。在Python中构造循环

结构有两种做法，一种是`for-in`循环，一种是`while`循环。



#### 1.5.1 for-in循环

如果明确的知道循环执行的次数或者是要对一个容器进行迭代（后面会讲到），那么推荐使用`for-in`循环，例如下面代码中计算∑100n=1n∑n=1100n。

```python
sum=0;
for x in range(101):
    sum=sum+x;
print(sum)
```

代码中的`range`类型，`range`可以用来产生一个不变的数值序列，而且这个序列通常都是用在循环中的，例如：

- `range(101)`可以产生一个0到100的整数序列。
- `range(1, 100)`可以产生一个1到99的整数序列。
- `range(1, 100, 2)`可以产生一个1到99的奇数序列，其中的2是步长，即数值序列的增量。

也可以在循环中加入条件语句。

```python
sum=0;
for x in range(1,101):
    if x%2==0:
      sum=sum+x;
print(sum)
```



#### 1.5.2 while循环

如果要构造不知道具体循环次数的循环结构，我们推荐使用`while`循环，`while`循环通过一个能够产生或转换出`bool`值的表达式来控制循环，表达式的值为`True`循环继续，表达式的值为`False`循环结束。下面我们通过一个“猜数字”的小游戏（计算机出一个1~100之间的随机数，人输入自己猜的数字，计算机给出对应的提示信息，直到人猜出计算机出的数字）来看看如何使用`while`循环。

**练习：猜数字游戏**

```python
import random;
answer=random.randint(1,101);
# print(answer)
count=0;
while True:
    count=count+1;
    number=int(input('请输入一个1-100之间的整数：'))
    if number<answer:
        print('再大一点')
    elif number>answer:
        print('再小一点')
    else :
        print('恭喜你答对了')
        break
print('你共猜了%d次'%count)
if count>7:
    print('脑袋瓜子不行呀');
elif count<=3:
    print('卧槽！你开挂了吧！')
else:
    print('还不错，但跟我比起来还差点！')
```

> **说明：**上面的代码中使用了`break`关键字来提前终止循环，需要注意的是`break`只能终止它所在的那个循环，这一点在使用嵌套的循环结构（下面会讲到）需要引起注意。除了`break`之外，还有另一个关键字是`continue`，它可以用来放弃本次循环后续的代码直接让循环进入下一轮。



#### 1.5.3 循环嵌套

和分支结构一样，循环结构也是可以嵌套的，也就是说在循环中还可以构造循环结构。下面的例子演示了如何通过嵌套的循环来输出一个九九乘法表。

```python
# 九九乘法表
for x in range(1,10):
    for y in range(1,x+1):
        print('%d*%d=%d'%(x,y,x*y),end='\t')
    print()
```

**案例一：根据输入的数字打印乘法表**

```python
n=int(input())
for x in range(1,n+1):
    for y in range(1,x+1):
        print('%d*%d=%d'%(y,x,x*y),end=' ')
    print()
```



#### 1.5.4 break语句

Python中，break语句用于强制跳出当前循环。

```python
i=2;
while i<=10:
    j=2;
    while i<=(i/2):
        if i%j==0:
         break;
         j=j+1;
         if j>(i/2):
             print("%d是素数"%i)
         i=i+1;
```



#### 1.5.5 pass语句

pass语句表示空代码，即程序不做热河事情。由于python语言没有花括号来表示代码块，但是在有些地方如果没有代码，系统会报错，此时就可以使用pass语句。pass语句常用来标记留待以后开发的代码，作为占位符使用。

```python
i=0;
for i in range(0,10):
    pass
```



### 1.6 Python数据结构

在Python中有四种内建的数据结构，分别是列表（List）、元组（Tuple）、字典（Dictionary）、集合（Set）



#### 1.6.1 列表（List）

list是动态的，长度大小不固定可以随意增加删除改变元素

列表有三种创建方式：方括号、函数、推导式

- 使用方括号创建列表

```python
#列表创建
list=["钉子君",90,"南雨",'nanyu']
```

如果方括号中为空，则创建一个非空的列表，如list=[];



- 使用构造函数创建列表

python提供了list类的构造函数，可以用来创建列表，类似类型转换。

```python
#元组
t=(1,"nanyu",2,4)
print(t)
#使用list（）构造函数将元组转换为列表
list=list(t)
print(list)
```



- 使用列表推导式创建列表

列表推导式是利用已有的列表根据要求创建一个新的列表，主要用于动态创建列表。

```python
#已有列表
list1=[1,2,3,4]
#利用已有列表动态创建新列表
list2=[n*2 for n in list1]#[2, 4, 6, 8]
print(list2)
```



##### 1.6.1.1 列表基本操作

- 访问列表元素

```python
nums=[1,2,3,4]
print(nums[1])
```

+ for循环遍历列表

```python
nums=[1,2,3,4]
for i in nums:
    print(i)
```

+ while循环遍历列表

```python
nums=[1,2,3,4]
while i<len(nums):
 print(nums[i])
 i=i+1
```

- list常用方法

列表list是一个类，一旦一个列表被创建就构造了一个列表对象，可以使用该列表对象调用类的成员方法，也就是

可以用列表名调用列表的相关方法。语法格式如下：列表名.方法名（）

**append(x)方法：**

再列表的末尾追加元素

```python
nums=[1,2,3,4]
nums.append(5)
print(nums)
```

**insert(x,value)方法：**

在指定位置添加元素

```python
nums=[1,2,3,4]
nums.insert(2,8)
print(nums)
```

**extend(L）方法：**

将一个列表添加到另一个列表的末尾

```python
nums=[1,2,3,4]
nums2=[5,6]
nums.extend(nums2)
print(nums)
```

**removex(x)方法：**

删除列表中第一个与x相同的元素

```python
nums=[1,2,3,4]
nums.remove(2)
print(nums)
```

**pop()方法：**

删除列表中最后一位，并返回被删除的元素

```python
nums=[1,2,3,4]
a=nums.pop()
print(nums)
print(a)
```

**count(x)方法：**

返回列表中x出现的次数

```python
nums=[1,2,2,3,4]
a=nums.count(2)
print(2)
```

**index(x)方法：**

返回列表中x元素第一次出现的下标

```python
nums=[1,2,2,3,4]
a=nums.index(2)
print(a)
```

**reverse()方法：**

反转列表元素

```python
nums=[1,2,2,3,4]
nums.reverse()
print(nums)
```

**sort()方法:**

堆列表进行排序

```python
nums=[1,5,2,3,4]
nums.sort()
print(nums)
```



#### 1.6.2 元组（Tuple）

元组、String是动态的，不能随意增加删除改变元素

元组的两种创建方式：圆括号、函数

- 使用圆括号创建元组

如果创建一个空tuple，可以直接用()表示。但是，**如果创建含有一个元素的tuple，需要在元素后面加逗号。**

```python
T1=()#空列表
T2=("南雨")#错误示范，这样的结果返回的是一个字符串，而不是元组
T3=("南雨",)#正确示范，如果是元组中只有一个元素，则末尾必须有,
print(T1,T2,T3)
```

- 使用构造函数构建元组

Python提供了tuple类的构造函数，可以用来创建元组，语法格式如下:变量= tuple ([可迭代对象])

```python
T1=tuple("南雨")
T2=tuple([1,2,3,4])
print(T1,T2)
```



##### 1.6.3.1 元组的基本操作

- 元组的遍历与访问

```python
T2=tuple([1,2,3,4])
print(T2[2])
for i in T2:
    print(i)
```

- 元组常用方法

**index()方法：**

```python
T2=(1,1,2,3,4)
a=T2.index(2)
print(a)
```

**count()方法：**

```python
T2=(1,1,2,3,4)
b=T2.count(1)
print(b)
```

- 元组与列表的区别

**元组**

```python
T2=(1,1,2,3,4)
T2[2]=2
print(T2)

#结果如下
Traceback (most recent call last):
  File "D:/Appinstall/Pycharm/Project/Project03/test.py", line 4, in <module>
    T2[2]=2
TypeError: 'tuple' object does not support item assignment
```

**列表**

```python
L=[1,2,3,4]
L[2]=1
print(L)
#结果如下
[1, 2, 1, 4]
```

元组的元素在确定之后不可以再做增上改操作，但列表在创建之后还可以进行增删改等操作。



#### 1.6.3 序列及通用方法

序列是Python中最基本的数据结构。序列中的每个元素都分配一个索引，如果有n个元素，那么第一个索引是0，

第二个索引是1，依此类推，最后一个元素索引为n-1。另外，可以用负数来逆序表示元素的索引，最后一个元素

的索引是-1，倒数第二个元素索引是-2，以此类推，第一个元素索引是-n。

前面的列表，元组以及字符串都是序列。这些序列都可以使用以下操作:切片，连接和复制，成员检查，计算长度，取最大值等。

- 切片操作：

```python
L=[1,2,3,4,5,6]
T=(1,2,3,4,5,6)
S="123456"
print(L[0:4:2])#打印列表中1-4的元素，步长为2
print(T[0:4:2])#打印元组中1-4的元素，步长为2
print(S[0:4:2])#打印字符串中1-4的元素，步长为2
```

在切片操作中开始索引和结束索引都可以为空，下面是切片操作几种用法的介绍。

(1）如果切片的结束索引j为空，那么就获取从开始索引i到序列结束的所有元素。

(2）如果切片的开始索引i为空，那么获取从序列开始到索引为j-1的元素。

(3）如果开始和结束的索引都为空，那么获取整个序列。

(4）根据获取元素的顺序，如果开始元素位于结束元素之后，那么获取一个空序列。

(5）如果步长值为负数，表示逆序获取序列元素。

```python
L=[1,2,3,4,5,6]
T=(1,2,3,4,5,6)
S="123456"
print(L[:4])#[1, 2, 3, 4]
print(T[2:])#(3, 4, 5, 6)
print(S[:])#123456
print(L[4:2])#[]
print(L[2:4:-1])#[]
print(T[4:2:-1])#(5, 4)
```

- 序列连接

在python中，可以使用连接操作符“+”把多个**相同的序列**合并在一起,并返回一个新的序列。

```python
L=[1,2,3,4,5,6]
L1=[9,8,7]
T1=(1,2,3)
T2=(4,5,6)
S1="123"
S2="456"
print(T1+T2)#(1, 2, 3, 4, 5, 6)
print(S1+S2)#123456
print(L+L1)#[1, 2, 3, 4, 5, 6, 9, 8, 7]
```

- 序列复制

在python中，使用操作符"*"可以把一个序列复制若干次形成新的序列。

```python
L=[1,2,3,4,5,6]
T1=(1,2,3)
S1="123"
print(L*3)#[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]
print(T1*2)#(1, 2, 3, 1, 2, 3)
print(S1*4)#123123123123
```

- 成员检查（in和not in）

Python提供了两个成员运算符in和not in，用来判断一个元素是否在序列中。如果用in运算符，存在则返回

True，否则为False。如果用not in运算符，不存在则返回True，存在则返回False。

```python
L=[1,2,3,4,5,6]
T1=(1,2,3)
S1="123"
print(7 in L)#False
print(4 in T1)#False
print("4" not in S1)#True
```

内置函数

Python中内置了许多有关序列的函数，比如len()、max()、min()等等。

```python
L=[1,2,3,4,5,6]
T1=(1,2,3)
S1="123"
print(len(L),len(T1),len(S1))#6，3，3
print(max(L))#6
print(min(T1))#1
```



#### 1.6.4 元组、列表、字符串的相互转换

- 字符串转元组和列表

```python
L=[1,2,3,4,5,6]
T1=(1,2,3)
S1="123"
#字符串转列表和元组
print(list(S1))#['1', '2', '3']
print(tuple(S1))#('1', '2', '3')
```

- 列表与元组相互转换

```python
L=[1,2,3,4,5,6]
T1=(1,2,3)
S1="123"
#字符串转列表和元组
print(list(T1))#[1, 2, 3]
print(tuple(L))#(1, 2, 3, 4, 5, 6)
```



#### 1.6.5 字典

Python中，字典Dict使用键-值对来存储数据。一个字典中无序的存储了若干个条目，每个条目都是一个键-值

对，关键字在字典中是唯一的，每个关键字匹配个值，可以使用键来获取相关联的值。