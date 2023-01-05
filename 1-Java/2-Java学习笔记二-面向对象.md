# 1.类和对象

- 什么是对象？

万物皆可对象，客观存在的事物皆为对象。水杯、手机、电脑、铅笔、汽车、飞机等只要是客观存在的事物都可以对象。



- 什么是面向对象？

面向对象的方法主要是把事物给对象化，包括其属性和行为。面向对象说到底就是一种思想，任何事物都可以看作

是一个对象。之前在知乎上看到过一篇有关面向对象和面向过程的介绍，比较通俗易懂。

文章链接：[点我进入](https://zhuanlan.zhihu.com/p/75265007)



- 什么是类？

类是对现实生活中一类具有共同属性和行为的事物的抽象。

**类的特点：**

1. 类是对象的数据类型。

2. 类是具有相同属性和行为的一组对象的集合（也可以说一个类对应多个对象，只要这些对象的属性和行为是相同的）。

   

- 什么是对象属性？

**属性：**对象具有的各种特征，每个对象的每个属性都拥有特定的属性值，以人为例。

| 属性 | 属性值 |
| ---- | ------ |
| 身高 | 189cm  |
| 体重 | 135kg  |
| 性别 | 男     |
| 年龄 | 26     |



- 什么是对象的行为？

行为：对象能执行的操作，还以人为例。

人可以吃饭、睡觉、学习、跑步等行为。



- 类和对象的关系

> 类：类是对现实生活中一类具有共同属性和行为的事物的抽象
>
> 对象：是能够看得到摸的着的真实存在的实体

**类是对象的抽象，对象是类的实体**，比如下图。右边的对象实现了左边类里所有的属性与行为，左边的类是右边对象的抽象。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210331172808.png" style="zoom:67%;" />



# 2.类的定义

**类的重要性**：类是java程序最基本的组成单位

**类是什么：**是对现实生活中一类具有共同属性和行为的事物的抽象，确定对象将会拥有属性和行为。

**类的组成：**类是由属性和行为组成

- 属性：在类中通过成员变量来体现。（类中方法外的变量）

- 行为：在类中通过成员方法来体现（即不带static关键字）

注意：Java中就没有全局变量这个概念，只分为成员变量和局部变量，全局变量与成员变量基本没什么区别，全局变量是C语言中的叫法，但很多人在学Java时习惯把成员变量叫做全局变量。



类的定义步骤：

1. 定义类

```java
public class 类名{

}
```

2. 编写类的成员变量

```java
public class 类名{
//成员变量
    数据类型 变量1;
    数据类型 变量2;
}
```

3. 编写类的成员方法

```java
public class 类名{
//成员变量
    数据类型 变量1;
    数据类型 变量2;
  		……
 //成员方法
    方法1;
    方法2;
   ……
}
```

实例：

```java
package com.zut.nanyu;

public class Person {
    //声明成员变量
    public String name;
    //public为修饰符，后面会有介绍，暂时不用关注
    public int age;
    public String sex;

    //声明成员方法
    public void run(){
System.out.print("跑步");
    }
    public void speak(){
        System.out.print("说话");
    }
}
```



# 3.使用对象

使用对象之前，我们需要先创建一个对象。

创建对象的格式：`类名 对象名=new 类名();`

```java
package com.zut.nanyu;

public class Person {
    //声明成员变量
    public String name;
    //public为修饰符，后面会有介绍，暂时不用关注
    public int age;
    public String sex;

    //声明成员方法
    public void run(){
System.out.print("跑步");
    }
    public void speak(){
        System.out.print("说话");
    }
}
```

创建对象：

```java
package com.zut.nanyu;
public class Test1 {
    public static void main(String[] args) {
        //这里创建的对象就是Person类的实例化，此Person对象实例化了Person类中的所有的成员变量与成员方法，可以直接调用属性和方法。
        Person p=new Person();
    }
}

```

对象的使用1：

```java
package com.zut.nanyu;
public class Test1 {
    public static void main(String[] args) {
        Person p=new Person();
        String pname=p.name;
        int page=p.age;
        String psex=p.sex;
       //未对属性赋值，所以属性被调用后输出的是默认值
        System.out.print(pname);//输出为null
        System.out.print(page);//输出为0
        System.out.print(psex);//输出为null
    }
}
```

对象的使用2：

```java
package com.zut.nanyu;
public class Test1 {
    public static void main(String[] args) {
        //创建对象
        Person p=new Person();
        //调用Person的属性
        p.name="钉子君";
        p.age=34;
        p.sex="男";
        String pname=p.name;
        int page=p.age;
        String psex=p.sex;
        System.out.println(pname);//输出为钉子君
        System.out.println(page);//输出为34
        System.out.println(psex);//输出为男
        //调用Person中的方法
        p.run();//输出为跑步
        p.speak();//输出为说话
    }
}
```



# 4.成员变量与局部变量

成员变量：类中方法外的变量。

```java
package com.zut.nanyu;

public class Person {
    //声明成员变量
    public String name;
}
```

局部变量：方法中的变量

```java
package com.zut.nanyu;

public class Person {
    //声明成员变量
    public String name;
    public void run(){
    int str="钉子君";
    System.out.print(str);
    }
}
```



局部变量与成员变量的区别：

| 区别           | 成员变量                               | 局部变量                                 |
| -------------- | -------------------------------------- | ---------------------------------------- |
| 类中位置不同   | 类中方法外                             | 类中方法内                               |
| 内存中位置不同 | 对内存                                 | 栈内存                                   |
| 生命周期不同   | 随着对象的存在而存在，随对象消失而消失 | 随方法的调用而存在，方法调用完毕消失     |
| 初始化值不同   | 有默认的初始化值                       | 无默认的初始化值，必须先定义赋值才能使用 |



# 5.封装



## 5.1 private关键字

- private是一个权限修饰符
- 可以修饰成员（成员变量和成员方法)
- 作用是保护成员不被别的类使用，被private修饰的成员只在本类中才能访问

> 被private修饰的成员变量不能被别的类随意访问。针对private修饰的成员变量，如果需要被其他类使用，需
>
> 要提供相应的操作，public修饰的变量允许被其他类调用，所以不需要get(),set()方法

- 提供“get变量名()”方法，用于获取成员变量的值，方法用public修饰
- 提供“set变量名(参数)”方法，用于设置成员变量的值，方法用public修饰



实例：

Person类

```java
package com.zut.nanyu;
public class Person {
    //public修饰的成员变量可以被其他类调用
    public String name;
    //private修饰的方法只能在本类中使用，其他类无法直接调用。
    private int age;
    //如果想调用private修饰的变量可以通过get（）和set（）方法来获取和设置值,两个方法
    //get()和set()方法都要用public修饰
    //set()方法为private修饰的变量赋值
    public void setAge(int a) {
        age = a;
    }
   //set()方法获取private修饰的变量
    public int getAge() {
        return age;
    }
}
```

测试类：

```java
package com.zut.nanyu;
public class Test1 {
    public static void main(String[] args) {
      Person p=new Person();
      p.name="钉子君";
      //通过调用setAge(实参)方法来为age传参
      p.setAge(-19);
      System.out.println(p.name);
        //通过调用getAge()方法来调用age属性值
      System.out.println(p.getAge());
    }
}
```





为什么private修饰的成员变量要用get()，set()方法来设置和获取值？

原因：

> private修饰的变量表示我们不想让其他人随意调用这个变量，有时候需要对别人传过来的属性值加一限制，比如Person中的age变量代表的是人的年龄属性，如果调用者传入的值是上述代码中的-19，那么这个值显然是不符合常理的，所以我们有时需要对别人传入的变量值做限制，让变量的赋值更加规范。而我们刚好可以通过set方法，在传入变量值时对其加以判断，筛选掉不符合逻辑或不符合我们要求的值。

```java
package com.zut.nanyu;
public class Person {
    public String name;
    private int age;
    //在set()方法中加入判断条件，如果年龄不在范围内，则输出错误信息
    public void setAge(int a) {
        if(a<=0||a>120){
           System.out.println("输入的年龄有误!");
        }else{
            age = a;
        }
    }
    public int getAge() {
        return age;
    }
}
```



## 5.2 this关键字

> this修饰的变量用于指代成员变量，方法形参如果与成员变量同名，不带this修饰的变量指得时形参而不是成员变量，用this修饰的变量为成员变量。



什么时候用this关键字？

当局部变量与成员变量同名时，防止局部变量把成员变量隐藏。

```java
package com.zut.nanyu;
public class Person {
    public String name;
    private int age;
//成员变量与形参同名，用this关键字来指代成员变量，this后面跟的就是成员变量，赋值号后面的就是局部变量
    public void setAge(int age) {
        this.age = age;
    }
    
    public int getAge() {
        return age;
    }
}
```



this的内存原理

![](https://gitee.com/nanyu99/picgo/raw/master/image/QQ%E6%88%AA%E5%9B%BE20210331200207.png)



## 5.3 封装

- 封装概述：

是面向对象三大特征之一(封装，继承，多态)，是面向对象编程语言对客观世界的模拟，客观世界里成员变量都是隐藏在对象内部的，外界是无法直接操作的

- 分装原则：

将类的某些信息隐藏在类内部，不允许外部程序直接访问，而是通过该类提供的方法来实现对隐藏信息的操作和访问成员变量private，提供对应的getXxox()/setXxx()方法

- 封装好处：

通过方法来控制成员变量的操作，提高了代码的安全性把代码用方法进行封，提高了代码的复用性



## 5.4 构造方法

构造方法概述：构造方法是一种特殊的方法。

构造方法作用：**创建对象**

构造方法功能：完成对象数据的初始化

语法格式：

```java
public class 类名(){
//如果没有参数的话，叫无参构造器
	修饰符 类名(参数){
	}
}
```

实例：

Person类：

```java
package com.zut.nanyu;
public class Person {
    public String name;
    private int age;
    //一个类中可以同时有无参构造器和有参构造器
//无参构造器
    public Person() {
        System.out.println("无参构造器");
    }

    //有参构造器
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }
}
```

测试类：

```java
package com.zut.nanyu;
public class Test1 {
    public static void main(String[] args) {
        
      Person p=new Person();//这里相当于调用了无参构造函数
      p.name="钉子君";
      //通过调用setAge(实参)方法来为age传参
      p.setAge(19);
      System.out.println(p.name);
        //通过调用getAge()方法来调用age属性值
      System.out.println(p.getAge());
    }
}

//输出结果
/*
无参构造器
钉子君
-19
*/
```



## 5.5 构造方法注意事项

注意事项一：

如果Person类中程序员没有写构造方法，创建对象并调用时程序会不会报错？答案是：**不会！**

下面的Person类中没有写构造函数，但程序运行时不会报错。原因是当一个类中没有给任何的构造方法，系统会默认给一个无参的构造函数。

```java
package com.zut.nanyu;
public class Person {
    public String name;
    private int age;
    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }
}
```



注意事项二：

如果在类中已经创建了一个有参构造器，而没有创建无参构造函数，则在创建对象时不能使用无参构造器，若想使用无参构造器同时使用有参构造器，必须同时创建有参构造器和无参构造器。

```java
package com.zut.nanyu;
public class Test1 {
    public static void main(String[] args) {
        //有参构造器，使用时必须传参
        Person p = new Person("钉子君", 30);
        //Person类中只有一个有参构造器，如果像下面那样构建对象，则会报错
       // Person p = new Person();
        System.out.println(p.getAge());
        System.out.println(p.getName());
    }
}
```



## 5.6 标准类的制作

成员变量

- 使用private修饰

构造方法

- 提供一个无参构造方法

- 提供一个带多个参数的构造方法

成员方法

- 提供每一个成员变量对应的setXXX()/getXXX()
- 提供一个显示对象信息的show()

创建对象并为其成员变量赋值的两种方式

- 无参构造方法创建对象后使用setXxxx()赋值

- 使用带参构造方法直接创建带有属性值的对象



实例：

Person类：

```java
package com.zut.nanyu;

public class Person {
    private String name;
    private int age;
//无参构造器
    public Person() {

    }
//有两个参数的构造器
    public Person(String name, int age) {
        this.age = age;
        this.name = name;
    }
//有一个参数的构造器
    public Person(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

```

测试类：

```java
package com.zut.nanyu;
public class Test1 {
    public static void main(String[] args) {
        //使用无参构造器
        Person p = new Person();
        p.setAge(15);
        p.setName("钉子君");
        //有参构造器，必须传参
        Person p1 = new Person("钉子君", 30);
        Person p2 = new Person("钉子君");
        System.out.println(p.getAge());
        System.out.println(p.getName());
    }
}
```

