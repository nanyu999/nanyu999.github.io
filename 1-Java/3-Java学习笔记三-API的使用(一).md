# 1. API

> API（**Application Programming Interface**）：应用程序编程接口

举例：

编写一个机器人程序去控制机器人踢足球，程序需要向机器人发出向前跑、向后跑、射门、抢球等各种命令。机器人厂商一定会提供一些用于控制机器人的接口类，这些类中定义好了操作机器人各种动作的方法。其实,这些接口类就是机器人厂商提供给应用程序编程的接口，大家把这些类称为API

> Java APl：JDK中提供的各种功能的Java类，这些类将底层的实现封装了起来，我们不需要关心这些类是如何实现的，只需要学习这些类如何使用即可，我们可以通过帮助文档来学习这些API如何使用。

# 2. API的使用

Scanner API的使用

```java
package com.zut.nanyu;
//导入Scanner包
import java.util.Scanner;
public class Test1 {
    public static void main(String[] args) {
        //创建对象
        Scanner sc=new Scanner(System.in);//调用构造函数，System.in为参数
        //用对象调用Scanner类中的方法
        int n=sc.nextInt();
        //快捷键Ctrl+Alt+V快速创建左边的变量名
        String s = sc.next();
    }
}
```



# 3. String

> String类代表字符串，Java程序中的所有字符串文字(例如“ab”）都被实现为此类的实例也就是说，Java程序中所有的双引号字符串，都是String类的对象

String在java.lang包下，因此不需要导包（**java.lang**下的包都不用导）



字符串特点：

- 字符串不可变，它们的值在创建后不能被更改

- 虽然String的值是不可变的，但是它们可以被共亨

- 字符串效果上相当于字符数组( char[])，但是底层原理是字节数组( byte[])



## 3.1 String类的构造方法

| 方法                     | 说明                               |
| ------------------------ | ---------------------------------- |
| public String()          | 创建空白字符串对象，不含有任何内容 |
| public String(char[]chs) | 根据字符数组的内容，创建字符串对象 |
| public String(byte[]bys) | 根据字节数组的内容，创建字符串对象 |
| String str="123"         | 直接赋值的方式创建对象，内容为123  |

```java
package com.zut.nanyu;
import java.util.Scanner;
public class Test1 {
    public static void main(String[] args) {
        //创建一个空白字符串对象，调用String类的无参构造器
        //s对象是String类的实例化
      String s=new String();
      //根据字符数组来创建字符串对象
      char chs[]={'1','2','3'};
      String s1=new String(chs);
      System.out.println(s1);
      //根据字节数组来创建对象,结果为abc
        byte [] byt={97,98,99};//97：a,98:b,99:c
        String s2=new String(byt);
        System.out.println(s2);
        //直接赋值的方式创建字符串对象
        String s3="123";
        System.out.println(s3);
    }
}
```



## 3.2 String对象的特点

- 通过new创建的字符串对象，每一次new都会申请一个内存空间。虽然内容相同，但是地址值不同

```
String str1=new String("abc");
String str2=new String("abc");
```

上面的代码中创建了两个字符串对象，虽然内容相同都是abc，但是他在堆内存中的地址不同。第一行代码执行之后会在堆内存中创建一个对象，第二行代码执行之后也会在堆内存中创建一个对象，两个对象的地址是不同的，不是一个对象

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/erfweva.png" style="zoom:50%;" />



- 以“”方式给出的字符串，只要字符序列相同(顺序和大小写)。无论在程序代码中出现几次,JVM都只会建立一个String对象，并在字符串池中维护

```
String str3="abc";
String str4="abc";
```

上面的代码中，都是用""直接赋值创建字符串对象，但两个赋值形同，所以最终在堆中只会有一个对象。第一行代码执行之后，会在堆内存中创建一个对象，第二行代码执行之后，不会创建新对象，而是会直接指向已经存在对象。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/qwqrq1.png" style="zoom:50%;" />



## 3.3 字符串的比较

使用==做比较：

- 基本类型:比较的是数据值是否相同

- 引用类型:比较的是地址值是否相同

> byte、short、int、long、float、double、boolean、char这八种基本数据类型可以直接用==来比较数值是否相同，但是像对象、数组、集合等引用数据类型是不能直接用==来比较数值是否相同的，因为直接用==比较的是它们的地址值。

```java
package com.zut.nanyu;

import java.util.Scanner;

public class Test1 {
    public static void main(String[] args) {
        //基本数据类型直接可以用==比较，输出为a==
        int a = 1;
        int b = 1;
        //引用数据类型用==比较的是地址，c、d指向的是堆内存中同一个地址，因此c==d
        String c = "abc";
        String d = "abc";
        //引用数据类型，用==比较的是地址，e、f指向的是两个不同的对象，地址不同，所以直接用==比较e!=f
        String e=new String("abc");
        String f=new String("abc");
        if (a == b) {
            System.out.println("a==b");

        } else {
            System.out.println("a!=b");
        }
        if(c==d){
            System.out.println("c==d");
        }else {
            System.out.println("c!=d");
        }
        if(e==f){
            System.out.println("e==f");
        }else {
            System.out.println("e!=f");
        }

    }
}
```



字符串是对象，不能用==直接比较数值是否相同，而要用`.equals()`方法来实现。

```java
package com.zut.nanyu;

import java.util.Scanner;

public class Test1 {
    public static void main(String[] args) {
        String c = "abc";
        String d = "abc";
        String e = new String("abc");
        String f = new String("abc");
        if (c.equals(d)) {
            System.out.println("true");
        } else {
            System.out.println("false");
        }
        if (e.equals(f)) {
            System.out.println("true");
        } else {
            System.out.println("false");
        }
    }
}
```



用户登录小案例：

```java
package com.zut.nanyu;

import java.util.Scanner;

public class Test1 {
    public static void main(String[] args) {
        String username = "admin";
        String passwd = "123456";
for(int i=2;i>=0;i--){
    Scanner sc=new Scanner(System.in);
    System.out.println("请输入用户名:");
    String yourname=sc.next();
    System.out.println("请输入密码:");
    String yourpass=sc.next();
    if(username.equals(yourname)&&passwd.equals(yourpass)){
        System.out.println("登录成功！");
        break;
    }else{
        System.out.println("登录失败！");
        System.out.println("你还有"+i+"次机会！");
    }
}

    }
}
```



## 3.4 遍历字符串

字符串的索引：str.charAt(序列)

```java
package com.zut.nanyu;

import java.util.Scanner;

public class Test1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个字符串");
        String str = sc.next();
        for (int i = 0; i < str.length(); i++) {
            System.out.println(str.charAt(i));
        }
    }
}
```



# 4.StringBuilder

```java
public class Test1 {
    public static void main(String[] args) {
        //此处会在堆中创建一个内容为Hello的字符串对象，地址假设为001
        String s = "Hello";
        //此处会先创建一个内容为World的字符串对象，地址假设为002
        //拼接完成之后会生成一个新的字符串HelloWorld，同时也会在堆中生成一个内容为Hello World的字符串对象，地址假设为003
        s = s + "World";
        //最后将栈中s的地址改为003，即对应到内容为HelloWorld的对象上
        System.out.println(s);
    }
}
```





<img src="https://gitee.com/nanyu99/picgo/raw/master/image/1412w.png" style="zoom:50%;" />

> String对象中的值是不可变的，即创建对应的字符串对象后，对象中的值就不能再改变了，要想做修改，只能重新生成一个内容已经拼接好的新的对象，再赋值到该变量上。但这样做即耗时，又浪费空间，而且还不可避免，不过Java为我们提供的StringBuilder可以很好的解决这种问题。

StringBuilder是一个可变的字符串类，我们可以把它看成是一个容器，这里的可变指的是StringBuilder对象中的内容是可变的，因此在做字符串拼接操作时，可以直接改变StringBuilder对象中的值，而不用重新生成一个新对象。



**String和StringBulider的区别：**

String：对象中的内容是不可变的

StringBuilder：对象中的内容是可变的



## 4.1 StringBuilder的构造方法

| 方法名                           | 说明                                     |
| -------------------------------- | :--------------------------------------- |
| public StringBuilder()           | 创建一个空白可变字符串对象，不含任何内容 |
| public StringBuilder(String str) | 根据字符串内容来创建可变字符串对象       |

StringBuilder不能直接用赋值来创建对象。

- 创建一个空的内容可变的字符串对象

```java
public class Test1 {
    public static void main(String[] args) {
        //创建一个空的内容可变的字符串对象
        StringBuilder sb=new StringBuilder();
        System.out.println("sb:"+sb);//sb:
        //StringBuilder中也有length属性
        System.out.println("sb字符串的长度为："+sb.length());//0
    }
}
```

- 创建一个内容为Hello，且可变的字符串对象。

```java
public class Test1 {
    public static void main(String[] args) {
        System.out.println("sb字符串的长度为：" + sb.length());//0
//创建一个内容为Hello，且可变的字符串对象。
        StringBuilder sb1 = new StringBuilder("Hello");
        System.out.println("sb1:" + sb1);//sb:Hello
        System.out.println("sb字符串的长度为：" + sb1.length());//5
    }
}
```



## 4.2 StringBuilder的添加和反转

| 方法                                  | 说明                     |
| ------------------------------------- | ------------------------ |
| public StringBuilder append(任意类型) | 添加数据，并返回对象本身 |
| public StringBuilder reverse()        | 返回相反的字符串序列     |

- public StringBuilder append(任意类型)

```java
public class Test1 {
    public static void main(String[] args) {
        //创建一个空的内容可变的字符串对象
        StringBuilder sb = new StringBuilder();
        //可以添加任意类型数据，全部转换为字符串
        sb.append("Hello");
        sb.append(3);
        sb.append(true);
        sb.append(12.0);
        System.out.println("sb:" + sb);//sb:Hello3true12.0
        System.out.println("sb字符串的长度为：" + sb.length());//14
    }
}
```

如何判断字符串拼接的时候没有创建新对象？

```java
public class Test1 {
    public static void main(String[] args) {
        //创建一个空的内容可变的字符串对象
        StringBuilder sb = new StringBuilder();
        StringBuilder sb1 = sb.append("Hello");
        System.out.println("sb:" + sb);//sb:Hello
        System.out.println("sb1:" + sb);//sb1:Hello
        System.out.println(sb1==sb);//true
    }
}
```

用sb==sb1比较的是两个字符串在在栈中对应堆中的内存地址，如果比较结果为true说明sb1与sb对应堆中的地址是一样的。所以，使用StringBuilder拼接过程中并没有产生新对象，修改的是原对象中的内容。

<img src="https://gitee.com/nanyu99/picgo/raw/master/image/%E5%9B%BEasfsa1.png" style="zoom:50%;" />

案例：将数组拼接成指定格式的字符串，使用StringBuilder可以有效节省内存空间。

```java
package com.zut.nanyu;

import java.util.Scanner;

public class Test1 {
    public static void main(String[] args) {
        //创建一个空的内容可变的字符串对象
        int arr[] = {1, 2, 3};
        System.out.println(arrayToString(arr));
    }
    
public static String arrayToString(int[] arr) {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                sb.append(arr[i]);
            } else {
                sb.append(arr[i]).append(", ");
            }
        }
        sb.append("]");
        //将StringBuilder转化成String类型，因为需要返回String类型的结果
        String str = sb.toString();
        return str;
    }
}
```

- public StringBuilder reverse()

字符串反转

```java
public class Test1 {
    public static void main(String[] args) {
        //创建一个空的内容可变的字符串对象
        StringBuilder sb = new StringBuilder();
        StringBuilder sb1 = sb.append("Hello");
        System.out.println("sb:" + sb);//sb:Hello
        System.out.println(sb1.reverse());//olleH

    }
}
```



##  4.3 StringBuilder与String相互转换

- StringBuilder转换为String

```java
public class Test1 {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("你好");
        String s=sb.toString();
        System.out.println(s);
    }
}
```

- String转换为StringBuilder

```java
public class Test1 {
    public static void main(String[] args) {
        String s="你好";
        StringBuilder sb = new StringBuilder(s);
        System.out.println(sb);
    }
}
```



# 5.集合基础

集合概述：提供一种存储空间可变的存储模型，存储的数据容量可以发生改变



## 5.1 ArrayList

`ArrayList<E>`

- 是由可调整大小的数组实现，底层是数组。

- <E> 是一种泛型，一种特殊的数据格式

在所有出现<E>的地方，可以使用引用数据类型替换。

比如：`ArrayList<String>`、`ArrayList<Student>`



## 5.2 ArrayList构造方法和添加方法

| 方法名                                | 说明                                       |
| ------------------------------------- | ------------------------------------------ |
| public ArrayList()                    | 创建一个空的集合对象                       |
| public boolean add(E e)               | 将指定的元素追加到集合的末尾，成功返回true |
| public void add(int index ,E element) | 在集合的指定位置添加元素                   |

```java
public class Test1 {
    public static void main(String[] args) {
        //创建一个集合对象,元素的对象是String类型的
        ArrayList<String> arr = new ArrayList<>();
        //这种方法和上边的方法是一样的
        ArrayList<Integer> arr1 = new ArrayList<Integer>();
        System.out.println(arr.add("你好"));//添加类型为String，添加成功，返回true
        System.out.println(arr1.add(1));//添加类型为Integer，添加成功，返回true
        arr1.add(2);
        arr1.add(3);
        arr1.add(4);
        //指定位置添加元素
        arr1.add(1,5);
        //会报IndexOutOfBoundsException错误
        arr1.add(7,9);
        System.out.println(arr);//[你好]
        System.out.println(arr1);//[1,5,2,3,4]
    }
}
```



## 5.3 ArrayList常用方法

| 方法                               | 说明                                     |
| ---------------------------------- | ---------------------------------------- |
| public boolean remove(Object o)    | 删除指定的元素，成功返回true             |
| public E remove(int index)         | 删除指定位置的元素，成功返回被删除的元素 |
| public E set(int index，E element) | 修改指定位置的元素，成功返回被修改的元素 |
| public E get(int index)            | 返回指定索引位置的元素                   |
| public int size()                  | 返回集合中的元素个数                     |

```java
public class Test1 {
    public static void main(String[] args) {
        //创建一个集合对象,元素的对象是String类型的
        ArrayList<String> arr = new ArrayList<>();
        //这种方法和上边的方法是一样的
        ArrayList<Integer> arr1 = new ArrayList<Integer>();
        System.out.println(arr.add("你好"));//添加类型为String，添加成功，返回true
        System.out.println(arr1.add(1));//添加类型为Integer，添加成功，返回true
        arr1.add(2);
        arr1.add(3);
        arr1.add(4);
        System.out.println(arr1);//[1, 2, 3, 4]
        System.out.println( arr1.remove(2));//3
        System.out.println(arr1.set(1,5));//2
        System.out.println(arr1);//[1, 5, 4]
        System.out.println(arr1.get(2));//4
        System.out.println(arr1.size());//3
    }
}
```



## 5.4 案例：存储字符串并遍历

创建一个存储字符串的集合，存储3个字符串元素，使用程序实现在控制台遍历该集合

```java
public class Test1 {
    public static void main(String[] args) {
        //创建一个集合对象,元素的对象是String类型的
        ArrayList<String> arr = new ArrayList<>();
        arr.add("钉子君");
        arr.add("南雨");
        arr.add("上官铁蛋");
        for (int i = 0; i < arr.size(); i++) {
            System.out.println(arr.get(i));
        }
    }
}
```



## 5.5 案例：存储学生对象并遍历

创建一个存储学生对象的集合，存储3个学生对象，使用程序实现在控制台遍历该集合

创建Person类

```java
public class Person {
    private String name;
    private int age;

    public Person() {

    }
    public Person(String name, int age) {
        this.age = age;
        this.name = name;
    }
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

集合存入对象并遍历集合

```java
public class Test1 {
    public static void main(String[] args) {
        //创建一个集合对象,元素的对象是String类型的
        ArrayList<Person> arr = new ArrayList<>();
        Person p1 = new Person("南雨", 24);
        Person p2 = new Person("钉子君", 22);
        Person p3 = new Person("轩辕狗蛋", 21);
        arr.add(p1);
        arr.add(p2);
        arr.add(p3);
        for (int i = 0; i < arr.size(); i++) {
            System.out.println("姓名:"+arr.get(i).getName()+" 年龄:"+arr.get(i).getAge());
        }
    }
}
```

