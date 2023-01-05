# 1 Math&System类

## 1.1 Math类

`Math`包含执行基本数字运算的方法，`Math`类中没有构造方法



Math类中常用方法

| 方法                                        | 说明                                           |
| ------------------------------------------- | ---------------------------------------------- |
| public static int abs(int a)                | 返回参数的绝对值                               |
| public static double ceil(double a)         | 返回大于或等于参数的最小double值，等于一个整数 |
| public static double floor(double a)        | 返回大于或等于参数的最大double值，等于一个整数 |
| public static int round(float a)            | 按照四舍五入返回最接近参数的int                |
| public static int max(int a,int b)          | 返回两个int中最大的值                          |
| public static int min(int a,int b)          | 返回两个int中最小的值                          |
| public static double pow(double a,double b) | 返回a的b次幂                                   |
| public static double radom()                | 返回值为double的正值，[0.0,1.0]                |



程序实例

```java
package com.study.nanyu.day05;

public class MathTest {
    public static void main(String[] args) {
        System.out.println(Math.abs(88));
        System.out.println(Math.abs(-88));
        System.out.println("-------------");
        System.out.println(Math.ceil(2.6));
        System.out.println(Math.floor(2.6));
        System.out.println("-------------");
        System.out.println(Math.round(3.6));
        System.out.println("-------------");
        System.out.println(Math.max(3,5));
        System.out.println(Math.min(3,5));
        System.out.println("-------------");
        System.out.println(Math.pow(3.2,5.4));
        System.out.println("-------------");
        System.out.println(Math.random());
    }
}
/*
输出结果
88
88
-------------
3.0
2.0
-------------
4
-------------
5
3
-------------
534.3303993219894
-------------
0.009380731752183569
*/
```



## 1.2 System类

System类中包含几个有用的类字段和方法，它不能被实例化。

| 方法名                              | 说明                                       |
| ----------------------------------- | ------------------------------------------ |
| public static void exit(int status) | 终止当前运行的Java虚拟机，非零表示异常终止 |
| public static long currentTime()    | 返回当前时间（以毫秒为单位）               |



方法：`public static void exit(int status)`

```java
package com.study.nanyu.day05;

public class SystemTest {
    public static void main(String[] args) {
        // public static void exit(int status)
        System.out.println("开始");
        System.exit(0);
        System.out.println("结束");
    }
}
/*
输出结果
开始
*/
```

方法：`public static long currentTime()`

```java
package com.study.nanyu.day05;

public class SystemTest {
    public static void main(String[] args) {
        //   public static long currentTime()
        System.out.println(System.currentTimeMillis());
        
        System.out.println("------------------------");
        long begin=System.currentTimeMillis();
        for(int i=0;i<100;i++){
            System.out.println(i);
        }
		  long end=System.currentTimeMillis();
       System.out.println("该程序共耗时"+(end-begin)+"毫秒");
    }
}
/*
输出结果
1622559805306
------------------------
该程序共耗时4毫秒
*/
```



# 2 Object类

> Object是类层次结构的根，每个类都可以将Object类作为超类，所有类都直接或间接的继承自该类。
>
> 构造方法：`public Object()`



## 2.1 toString()方法

定义一个`Student`类

```java
package com.study.nanyu.day05.two;

public class Student extends Object {
    private String name;
    private int age;

    public Student() {

    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
    
    /*
    此方法是Object类中的方法，因为所有类默认继承Object类，所以所有的类都可以重写Object中的toString()方法
    */
    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

定义一个`Teacher`类

```java
package com.study.nanyu.day05.two;

public class Teacher {
    private String name;
    private int age;

    public Teacher() {

    }

    public Teacher(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

}
```

定义一个`Demo类`

```java
package com.study.nanyu.day05.two;

public class ObjectDemo {
    public static void main(String[] args) {
        Student s = new Student();
        Teacher t=new Teacher();
        s.setName("钉子君");
        s.setAge(20);
        System.out.println("重写toString方法:"+'\n'+s);
        System.out.println("未重写toString方法:"+'\n'+t);
        
    }
}
/*
输出结果
重写toString方法:
Student{name='钉子君', age=20}

未重写toString方法:
com.study.nanyu.day05.two.Teacher@1b6d3586
*/
```


# 3 Arrays类

## 3.1 冒泡排序

**排序：**将一组数据按照固定的顺序进行排列

**冒泡排序：**一种排序方式，对要进行排序的数据中相邻的数据进行两两比较，将较大的数据放在后面，一次对所有的数据进行操作，直至所有数据按要求完成排序

- 如果有n个数据需要进行排序，总共需要比较n-1次
- 每一次比较完毕，下一次的比较会少一个数据的参与



程序实现：

```java
package com.study.nanyu.day06;

public class Sort {
    public static void main(String[] args) {
        int[] arr = {2, 3, 7, 9, 5, 1};
        for (int i = arr.length - 1; i >= 0; i--) {
            for (int j = 0; j < arr.length - 1; j++) {
                int temp;
                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        for (int k = 0; k < arr.length; k++) {
            System.out.println(arr[k]);
        }
    }
}
```



## 3.2 Arrays类

Arrays类包含用于操作数组的各种方法

| 方法名                                  | 说明                             |
| --------------------------------------- | -------------------------------- |
| public static String toString(int [] a) | 返回指定数组内容的字符串表示形式 |
| public static void  sort(int [] a)      | 按照数字顺序排列指定的数组       |



程序实例：

```java
package com.study.nanyu.day06;

import java.util.Arrays;

public class ArraysDemo {
    public static void main(String[] args) {
        int arr []={1,2,3,9,3,6,8};
        System.out.println("排序前"+ Arrays.toString(arr));
        Arrays.sort(arr);
        System.out.println("排序后"+ Arrays.toString(arr));
    }
}

/*
输出结果
排序前[1, 2, 3, 9, 3, 6, 8]
排序后[1, 2, 3, 3, 6, 8, 9]
*/
```



工具类的设计思想：

- 构造方法用`private`修饰
- 成员用`public static`修饰
- 成员通过类名直接调用



# 4 基本类型包装类

> 将基本数据类型封装成对象的好处在于可以在对象中定义更多的功能方法操作该数据

常用的操作之一：用于基本数据类型与字符串之间的转换。

| 基本数据类型 | 包装类    |
| ------------ | --------- |
| byte         | Byte      |
| short        | Short     |
| int          | Integer   |
| long         | Long      |
| float        | Float     |
| double       | Double    |
| char         | Character |
| boolean      | Boolean   |



## 4.1 Integer类

> Integer：包装一个对象中的原始类型
>
> int的值。

| 方法名                                   | 说明                                |
| ---------------------------------------- | ----------------------------------- |
| public Integer(int value)                | 根据int创建Integer对象（已过时）    |
| public Integer(String s)                 | 根据String创建Integer对象（已过时） |
| public static Integer valueOf(int i)     | 返回指定int值的Integer实例          |
| public  static Integer valueOf(String s) | 返回保存指定值的Integer对象String   |



程序实例：

```java
package com.study.nanyu.day06;

public class IntegerDemo {
    public static void main(String[] args) {

        Integer i1=new Integer(100);//已过时方法
        System.out.println(i1);//Integer类中重写了toString方法
        Integer i2=new Integer("100");//已过时方法
        System.out.println(i2);

        Integer i3 = Integer.valueOf(100);
        System.out.println(i3);
        Integer i4 = Integer.valueOf("100");
        System.out.println(i4);
    }
}
/*
输出结果
100
100
100
100
*/
```



## 4.2 int与String相互转换

- **int转换为String**

public static String valueOf(inti)：返回int参数的字符串表示形式，该方法是String类中的方法。



- **String转换为int**

public static int parselnt(Strings):将字符串解析为int类型，该方法是Integer类中的方法。



```java
package com.study.nanyu.day06;

import com.study.nanyu.day02.two.Inter;

public class IntegerDemo {
    public static void main(String[] args) {

        System.out.println("----------int转String-----------");
        int num=100;
        //方式一
        String str=num+"";
        System.out.println(str);
        //方式二
        String str1=String.valueOf(100);
        System.out.println(str1);

        System.out.println("----------String转int-----------");
        //方式一
        String str2="200";
//        String类型转为Integer
        Integer i=Integer.valueOf(str2);
//        Integer转为int
        int x=i.intValue();
        System.out.println(x);
//        方式二
        int y= Integer.parseInt(str2);
        System.out.println(y);
    }
}
/*
输出结果
----------int转String-----------
100
100
----------String转int-----------
200
200
*/
```



## 4.3 自动装箱和拆箱

+ 装箱：将基本数据类型转换为对应的包装类类型
+ 拆箱：将包装类类型转换为对应的基本数据类型



装箱：

```java
package com.study.nanyu.day06;

import com.study.nanyu.day02.two.Inter;

public class IntegerDemo {
    public static void main(String[] args) {
        System.out.println("-----------装箱:-------------");
        System.out.println("自动将int类型数据转换为Integer类型");
        Integer i=Integer.valueOf(100);//装箱
        Integer i1=200;//自动装箱
        System.out.println(i);
        System.out.println(i1);
    }
}
/*
输出结果
-----------装箱:-------------
将int类型数据转换为Integer类型
100
200
*/

```

拆箱：

```java
package com.study.nanyu.day06;

import com.study.nanyu.day02.two.Inter;

public class IntegerDemo {
    public static void main(String[] args) {
        System.out.println("-----------拆箱:-------------");
        System.out.println("将Integer类型数据转换为int类型");
        int i2 = i1.intValue();//拆箱
        int i3 = i1 + 100;//自动拆箱
        System.out.println(i2);
        System.out.println(i3);
    }
}
/*
输出结果
-----------拆箱:-------------
将Integer类型数据转换为int类型
200
300
*/
```

如果引用类型的值为`null`，则拆箱时会报错,因此在拆箱前要先进行不为null判断

```java
package com.study.nanyu.day06;

import com.study.nanyu.day02.two.Inter;

public class IntegerDemo {
    public static void main(String[] args) {
        System.out.println("如果引用类型的值为null，则拆箱时会报错,因此在拆箱前要先进行不为null判断");
        Integer i4=null;
        if(i4!=null){
            i4+=0;
        }
    }
}
/*
输出结果
如果引用类型的值为null，则拆箱时会报错,因此在拆箱前要先进行不为null判断
*/
```



# 5 Date类

> Date代表了一个特定的时间，精确到毫秒

| 方法名                 | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| public Date()          | 分配一个Date对象，并初始化，以便它代表被分配的时间，精确到毫秒 |
| Public Date(long date) | 分配一个Date对象，并初始化为表示从标准基准时间起指定的毫秒数 |



程序实例：

```java
package com.study.nanyu.day06;

import java.util.Date;

public class DateDemo {
    public static void main(String[] args) {
        Date d=new Date();
        System.out.println(d);
        System.out.println("-------------------");
        long date=1000*60*60;
        Date d1=new Date(date);
        System.out.println(d1);
    }
}
```



## 5.1 Date类常用方法

| 方法名                | 说明                                                   |
| --------------------- | ------------------------------------------------------ |
| public long getTime() | 获取的是日期对象，从1970年1月1日00:00:00到现在的毫秒值 |
| public long setTime() | 设置时间，给的是毫秒值                                 |



程序实例：

```java
package com.study.nanyu.day06;

import java.rmi.activation.ActivationSystem;
import java.util.Date;

public class DateDemo {
    public static void main(String[] args) {
        Date d=new Date();
        double v = d.getTime() * 1.0 / 60 / 60 / 1000 / 24 / 365;
        
        System.out.println(v+"年");
        long time=System.currentTimeMillis();
        d.setTime(time);
        System.out.println(d);
    }
}
/*
输出结果
51.45328000240994年
Wed Jun 02 18:43:58 CST 2021
*/
```



## 5.2 SimpleDateFormate类

> SimpleDateFormate是一个具体的类，用于以区域设置敏感的方式**格式化和解析日期**。

构造方法

| 方法名                                   | 说明                                                      |
| ---------------------------------------- | --------------------------------------------------------- |
| public SimpleDateFormate()               | 构造一个SimpleDateFormate，使用默认模式和日期格式         |
| public SimpleDateFormate(String pattern) | 构造一个SimpleDateFormate使用给定的模式和默认的日期格式。 |



- 格式化（从`Date`到`String`）

 将日期格式化为日期/时间字符串

```java
public final String format(Date date)
```

- 解析（从`String`到`Date`）

从给定的字符串开始解析文本以生成日期

```java
public Date parse(String source)
```



程序实例：

- 将日期格式化为字符串

```java
package com.study.nanyu.day06;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SimpleDateFormateDemo {
    public static void main(String[] args) {
        Date date=new Date();
        //默认时间格式
        SimpleDateFormat df=new SimpleDateFormat();
        //自定义时间格式
        SimpleDateFormat df1=new SimpleDateFormat("yyyy-MM-HH");
        
        String format = df.format(date);
        String format1 = df1.format(date);
        System.out.println(format);
        System.out.println(format1);
    }
}
/*
输出结果
21-6-4 上午10:00
2021-06-10
*/
```

- 将字符串日期解析为日期

```java
package com.study.nanyu.day06;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SimpleDateFormateDemo {
    public static void main(String[] args) {
        String str="2021-06-04";
        String str1="2021年06月04日";
        SimpleDateFormat df=new SimpleDateFormat("yyyy-MM-HH");
        //SimpleDateFormat("")中字符串的格式要与字符串格式向匹配，否则会报错
        SimpleDateFormat df1=new SimpleDateFormat("yyyy年MM月HH日");
        Date date=null;
        Date date1=null;
        try {
             date=df.parse(str);
             date1=df1.parse(str1);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        System.out.println(date);
        System.out.println(date1);
    }
}
/*
输出结果
Tue Jun 01 04:00:00 CST 2021
Tue Jun 01 04:00:00 CST 2021
*/
```



# 6 Calendar类

> Calendar为某一时刻和一组日历字段之间的转换提供了一些方法，并为操作日历字段提供了一些方法

`Calendar`提供了一个类方法`getlnstance`用于获取`Calendar`对象，其日历字段已使用当前日期和时间初始化

```java
Calendar rightNow=Calendar.getInstance();
```



程序实例：

在表示中国月份时，需要将`Calendar`得到的月份加一

```java
package com.study.nanyu.day06;

import java.util.Calendar;
import java.util.Date;

public class CalendarDemo {
    public static void main(String[] args) {
        //获取Calendar对象
        Calendar c=Calendar.getInstance();
        System.out.println(c);
        //获取当前时间
        Date time = c.getTime();
        //获取当前年份
        int year=c.get(Calendar.YEAR);
        //获取当前月份,需要加一才能表示中国月份
        int month = c.get(Calendar.MONTH)+1;
        //获取当前日期
        int date = c.get(Calendar.DATE);
        //获取当前小时
        int hour = c.get(Calendar.HOUR);
        //获取当前分钟
        int minute = c.get(Calendar.MINUTE);
        //获取当前秒
        int second = c.get(Calendar.SECOND);
        System.out.println("当前时间:"+year+"年");
        System.out.println("当前月份:"+month+"月");
        System.out.println("当前日期:"+date+"日");
        System.out.println("当前小时:"+hour+"时");
        System.out.println("当前分钟:"+minute+"分");
        System.out.println("当前秒:"+second+"秒");
    }
}
/*
输出结果
java.util.GregorianCalendar[time=1622775068529,areFieldsSet=true,areAllFieldsSet=true,lenient=true,zone=sun.util.calendar.ZoneInfo[id="Asia/Shanghai",offset=28800000,dstSavings=0,useDaylight=false,transitions=31,lastRule=null],firstDayOfWeek=1,minimalDaysInFirstWeek=1,ERA=1,YEAR=2021,MONTH=5,WEEK_OF_YEAR=23,WEEK_OF_MONTH=1,DAY_OF_MONTH=4,DAY_OF_YEAR=155,DAY_OF_WEEK=6,DAY_OF_WEEK_IN_MONTH=1,AM_PM=0,HOUR=10,HOUR_OF_DAY=10,MINUTE=51,SECOND=8,MILLISECOND=529,ZONE_OFFSET=28800000,DST_OFFSET=0]

当前时间:2021年
当前月份:6月
当前日期:4日
当前小时:10时
当前分钟:51分
当前秒:8秒
*/
```



## 6.1 Calendar常用方法

| 方法名                                             | 说明                                                 |
| -------------------------------------------------- | ---------------------------------------------------- |
| public int get(int field)                          | 返回给定日历字段的值                                 |
| public abstract void add(int field,int amount)     | 根据日历的规则，将指定的时间添加或减去给定的日历字段 |
| public final void set(int year,int month,int date) | 设置当前日历的年月日                                 |



程序实例：

```java
package com.study.nanyu.day06;

import java.util.Calendar;
import java.util.Date;

public class CalendarDemo {
    public static void main(String[] args) {

        Calendar c=Calendar.getInstance();
        //设置日历时间为2050年11月20日
        c.set(2050,11,20);
        c.add(Calendar.YEAR,-3);
        c.add(Calendar.DATE,5);
        int year=c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH)+1;
        int date = c.get(Calendar.DATE);

        System.out.println("三年前："+year);
        System.out.println("五天后："+date);
    }
}
/*
输出结果
三年前：2047
五天后：25
*/
```