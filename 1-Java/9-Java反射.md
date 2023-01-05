## Java反射

### 1.1 反射概述

Java反射机制：指在运行时去获取一个类的变量和方法信息，然后通过获取到的信息来创建对象，调用方法的一种机制。由于这种动态性，可以极大的增强程序的灵活性，程序不用在编译期就完成确定，在运行器仍然可以扩展。



### 1.2 获取Class对象

要想通过反射去使用一个类，首先要获取该类的字节码文件对象，即类型为Class类型的对象。

三种获取Class类型对象的方式：

- 使用类的class属性来获取该类对应的Class对象，例如：Student.class将会返回Studen类对应的Class对象。
- 调用对象的getClass()方法，返回该对象所属类对应的Class对象。该方法时Object类中的方法，所有的Java对象都可以调用该方法。
-  使用Class类中的静态方法forName(String className)，该方法需要传入字符串参数，该字符串参数的值是某个类的全路径，也是完整包名的路径。



构建一个Student类：

```java
package com.zut.nanyu;

public class Student {
    private String name;
    int age;
    public String address;

    public Student(String name, int age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    private Student(String name) {
        this.name = name;
    }

    public Student() {

    }

    private void function(){
        System.out.println("function");
    }
    public void menthod1(){
        System.out.println("menthod1");
    }
    public void menthod2(String s){
        System.out.println("menthod2"+s);
    }
    public String menthod3(String s,int i){
       return s+","+i;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", address='" + address + '\'' +
                '}';
    }
}
```



方式一：使用类的class属性来获取类对应的Class对象 

```java
package com.zut.nanyu;

public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException {
//        Student s=new Student();
//        System.out.println(s);

        //方式一:使用类的class属性来获取类对应的Class对象                 使用时最方便
        Class<Student> c1 = Student.class;//获取student类的字节码对象
        System.out.println(c1);//输出结果为：class com.zut.nanyu.Student
        System.out.println("--------------------------------------------------");
    }
}
```



方式二：调用getClass()方法，返回对象所属类对应的Class对象

```java
package com.zut.nanyu;

public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException {
/*
        Class<Student> c1 = Student.class;//获取student类的字节码对象
        System.out.println(c1);//输出结果为：class com.zut.nanyu.Student
        System.out.println("--------------------------------------------------");
*/
        
        //方式二:调用getClass()方法，返回对象所属类对应的Class对象。
        Student s=new Student();
        Class<? extends Student> c2 = s.getClass();
        System.out.println(c2);
        //一个类在内存中只能存在一个字节码文件对象，因此c1与c2相等
        System.out.println(c1==c2);//true
        System.out.println("--------------------------------------------------");
    }
}
```



方式三：使用Class类中的静态方法forName(String className)

```java
package com.zut.nanyu;

public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException {
 /*       
        //方式一:使用类的class属性来获取类对应的Class对象  
        Class<Student> c1 = Student.class;//获取student类的字节码对象
        System.out.println(c1);//输出结果为：class com.zut.nanyu.Student
        System.out.println("--------------------------------------------------");
        //方式二:调用getClass()方法，返回国企对象所属类对应的Class对象。
        Student s=new Student();
        Class<? extends Student> c2 = s.getClass();
        System.out.println(c2);
        //一个类在内存中只能存在一个字节码文件对象，因此c1与c2相等
        System.out.println(c1==c2);//true
        System.out.println("--------------------------------------------------");
   */  
        
//        方式三:使用Class类中的静态方法forName(String className)        灵活性更高
        Class<?> c3 = Class.forName("com.zut.nanyu.Student");
        System.out.println(c1==c3);

    }
}
```



### 1.3 反射获取构造方法并使用

Class类中用于获取构造方法的方法

- Constructor<?>[getConstructors0):返回所有公共构造方法对象的数组
- Constructor<?>[getDeclaredConstructors):返回所有构造方法对象的数组
- Constructor<T> getConstructor(Class<?> ... parameterTypes):返回单个公共构造方法对象
- Constructor<T> getDeclaredConstructor(Class<?>...parameterTypes);返回单个构造方法对象

Constructor类中用于创建对象的方法

- T newlnstance(Object... initargs):根据指定的构造方法创建对象

```java
package com.zut.nanyu;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

/*
反射获取构造方法并使用
 */
public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        //获取Class对象
        Class<?> c = Class.forName("com.zut.nanyu.Student");
        //返回一个包含Constructor对象的数组，Constructor对象反应了由该class对象表示的类的所有公共的构造函数
        Constructor<?>[] cons = c.getConstructors();
        //返回一个包含Constructor对象的数组，Constructor对象反应了由该class对象表示的类的所有的构造函数
        Constructor<?>[] d = c.getDeclaredConstructors();
        for(Constructor con :d){
//            System.out.println(con);
        }
        //获取指定的构造函数；参数：表示要获取的构造方法的参数个数和数据类型对应的字节码文件对象
        //获取无参构造器
        Constructor<?> constructor = c.getConstructor();
        //Constructor提供了一个类的单个构造函数的信息和访问权限
        Object o = constructor.newInstance();
        System.out.println(o);
    }
}
```



### 1.4 反射获取构造方法并使用练习

练习1:通过反射实现如下操作

```java
Student s = new Student("林青霞",30,"西安");
System.out.printIn(s);
```

通过正常方法得到的对象与通过反射的到的对象结果是一样的，只不过实现的形式不同而已。

```java
package com.zut.nanyu;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
public class Test2 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        /*
        通过正常方法得到的对象
        */
        Student s=new Student("轩辕钢蛋",20,"美国");
        System.out.println(s);//输出结果:Student{name='轩辕钢蛋', age=20, address='美国'}
        
        /*
        通过反射得到的对象
        */    
        //获取Class对象c
        Class<?> c = Class.forName("com.zut.nanyu.Student");
        //通过c调用getConstructor()方法得到构造方法对象con
        Constructor<?> con = c.getConstructor(String.class,int.class, String.class);
        //通过构造方法对象con调用newInstance()方法得到对象
        Object o = con.newInstance("轩辕钢蛋",20,"美国");
        System.out.println(o);//输出结果:Student{name='轩辕钢蛋', age=20, address='美国'}

    }
}
```



练习2：通过反射实现如下操作

```java
Student s=new Student("慕容傻根")
System.out.print(s)
```

privaye修饰的构造函数不能用正常的方法获取构造方法对象，需要通过暴力反射

```java
package com.zut.nanyu;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
public class Test2 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {

//        获取Class对象
        Class<?> c = Class.forName("com.zut.nanyu.Student");
//        此构造函数是privaye修饰的，因此获取构造方法对象时要使用getDeclaredConstructor（）
        Constructor<?> con= c.getDeclaredConstructor(String.class);
//        暴力反射,对于私有构造函数不能按照常规方法来生成对象，需要通过暴力反射
        con.setAccessible(true);
//        生成一个对象
        Object obj = con.newInstance("赵四");
        System.out.println(obj);//输出结果：Student{name='赵四', age=0, address='null'}
    }
}
```



### 1.5 反射获取成员变量并使用

`getFields（）`只能获取公共的成员变量

```java
public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        //获取Class对象
        Class<?> c = Class.forName("com.zut.nanyu.Student");
        //获取公共的成员变量
        Field[] fields = c.getFields();
        for(Field file:fields){
            System.out.println(file);
        }
   }
 }

// 输出结果
// public java.lang.String com.zut.nanyu.Student.address
```

`getDeclaredFields()`可以方法获取全部变量（包括private修饰的变量）

```java
public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        //获取Class对象
        Class<?> c = Class.forName("com.zut.nanyu.Student");
        //获取公共的成员变量
        Field[] fields = c.getDeclaredFields();
        for(Field file:fields){
            System.out.println(file);
        }
   }
 }

// 输出结果
// private java.lang.String com.zut.nanyu.Student.name public修饰的变量
// int com.zut.nanyu.Student.age 默认的变量
// public java.lang.String com.zut.nanyu.Student.address private修饰的变量
```

`getFile(String name)`方法获取一个指定的公共的成员变量

`getDeclaredFields(String name)`方法获取一个指定的公共的成员变量

```java
public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException, NoSuchFieldException {
        //获取Class对象
        Class<?> c = Class.forName("com.zut.nanyu.Student");
        //获取指定的public修饰的成员变量
        Field name = c.getField("address");
        //获取指定的private修饰的成员变量
        Field fields = c.getDeclaredField("name");
        //获取指定的默认修饰的成员变量
        Field age = c.getDeclaredField("age");
        System.out.println(fields);
        System.out.println(name);
        System.out.println(age);
    }
}
```



### 1.6 反射获取成员变量并使用练习

练习一：使用反射实现如下功能

```java
Student s=new Student();
s.address="广州";
System.out.println(s);
```

利用反射为成员变量赋值

```java
public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException, NoSuchFieldException {
        //获取Class对象
        Class<?> c = Class.forName("com.zut.nanyu.Student");
        //获取无参构造函数对象
        Constructor<?> con = c.getConstructor();
       //利用无参构造方法对象创建对象
        Object obj = con.newInstance();
        //获取指定的成员变量对象
        Field address = c.getDeclaredField("address");
        //利用指定的成员变量对象获取set()方法，为成员变量赋值
        address.set(obj,"广州");
        System.out.println(obj);
    }
}
```



练习二：使用反射实现如下操作

```java
Student s =new Student();
s.name="李四";
s.age=20;
s.address="深圳";
System.out.println(s);
```

实现步骤

```java
public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException, NoSuchFieldException {
        //获取Class对象
        Class<?> c = Class.forName("com.zut.nanyu.Student");
        //获取成员变量对象
        Field name = c.getDeclaredField("name");
        name.setAccessible(true);
        Field address = c.getDeclaredField("address");
        name.setAccessible(true);
        Field age = c.getDeclaredField("age");
        name.setAccessible(true);
        //创建有参构造函数对象
        Constructor<?> con = c.getDeclaredConstructor();
       //利用有参构造函数对象创建对象
        Object obj = con.newInstance();
        address.set(obj,"深圳");
        age.set(obj,20);
        name.set(obj,"李四");
        System.out.println(obj);
    }
}
```



### 1.7 反射获取成员方法并使用

`getMethods()`方法获取类或接口的所有公共方法对象，包括由类或接口声明的对象以及从父类或接口中继承的类

```java
public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException, NoSuchFieldException {
        //获取Class对象
        Class<?> c = Class.forName("com.zut.nanyu.Student");
        Method[] methods = c.getMethods();
        for(Method m:methods){
            System.out.println(m);
        }

    }
}
/*
输出结果
public java.lang.String com.zut.nanyu.Student.toString()
public java.lang.String com.zut.nanyu.Student.menthod3(java.lang.String,int)
public void com.zut.nanyu.Student.menthod2(java.lang.String)
public void com.zut.nanyu.Student.menthod1()
public final void java.lang.Object.wait() throws java.lang.InterruptedException
public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
public boolean java.lang.Object.equals(java.lang.Object)
public native int java.lang.Object.hashCode()
public final native java.lang.Class java.lang.Object.getClass()
public final native void java.lang.Object.notify()
public final native void java.lang.Object.notifyAll()
*/
```

`getMethods()`方法获取类或接口的所有方法对象，不包括由类或接口声明的对象以及从父类或接口中继承的类

```java
public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException, NoSuchFieldException {
        //获取Class对象
        Class<?> c = Class.forName("com.zut.nanyu.Student");
        Method[] methods = c.getDeclaredMethods();
        for(Method m:methods){
            System.out.println(m);
        }

    }
}
/*
输出结果
public void com.zut.nanyu.Student.menthod1()
public void com.zut.nanyu.Student.menthod2(java.lang.String)
public java.lang.String com.zut.nanyu.Student.menthod3(java.lang.String,int)
public java.lang.String com.zut.nanyu.Student.toString()
private void com.zut.nanyu.Student.function()
*/
```

`getMethod()`获取单个公共成员方法对象

`getDeclaredMethod()`获取单个成员方法对象

`invoke()`方法对方法进行调用和传参

```java
public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException, NoSuchFieldException {
        //获取Class对象
        Class<?> c = Class.forName("com.zut.nanyu.Student");
        //获取无参构造函数对象
        Constructor<?> con = c.getConstructor();
        //使用无参构造函数创建Student对象
        Object obj = con.newInstance();
        //创建指定公共无参成员方法对象
        //Method method = c.getMethod("menthod2");
        //创建指定无参数的成员方法对象
        Method m = c.getDeclaredMethod("menthod1");
        //创建有参数的成员方法对象
        Method method = c.getDeclaredMethod("menthod2",String.class);
        //对方法进行调用和传参 Object invoke(Object obj,Object args……)
        //args:表示成员方法中的参数，无参方法可以不写
        m.invoke(obj);
        method.invoke(obj,"调用成功了");
    }
}
```



### 1.8 反射获取成员方法并使用练习

练习：使用反射实现如下操作

```java
Student s=new Student();
s.method1();
s,method2("张三");
String ss=method3("张三",20);
System.out.print(ss);
s.function();
```

因为`function()`方法属于私有方法，因此需要`m4.setAccessible(true);`方法来关闭检查

```java
public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException, NoSuchFieldException {
        //获取Class对象
        Class<?> c = Class.forName("com.zut.nanyu.Student");
        //使用Class对象创建无参构造函数对象
        Constructor<?> con = c.getConstructor();
        //通过无参构造函数对象创建对象
        Object obj = con.newInstance();

        //获取指定的成员方法对象
        Method m1 = c.getDeclaredMethod("menthod1");
        m1.invoke(obj);

        //获取指定的成员方法对象
        Method m2 = c.getDeclaredMethod("menthod2", String.class);
        m2.invoke(obj,"张三");

        //获取指定的成员方法对象
        Method m3 = c.getDeclaredMethod("menthod3", String.class, int.class);
        Object o = m3.invoke(obj, "张三", 20);
        System.out.println(o);

        //获取指定的成员方法对象
        Method m4 = c.getDeclaredMethod("function");
        m4.setAccessible(true);
        m4.invoke(obj);
    }
}
```



###  1.9 反射练习

练习一：有一个ArrayList<Integer>集合，若要在这个几个中田间一个字符串数据，该怎么做？

```java
public class Test1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException, NoSuchFieldException {
        //创建集合
        ArrayList<Integer> list=new ArrayList<Integer>();
        //获得list集合对象
        Class<? extends ArrayList> a = list.getClass();
        //获取方法对象
        Method add = a.getMethod("add", Object.class);
        add.invoke(list,"Hello");
        add.invoke(list,"Java");
        add.invoke(list,"Why");
        System.out.println(list);
    }
}
/*
输出结果
[Hello, Java, Why]
*/
```



练习二：通过配置文件练习类中的方法

> 使用配置文件的方式相对灵活，不至于把程序写死，用户只需要修改配置文件的内容，程序即可对相应的配置文件做出反应。

- 创建一个学生类

```java
package com.zut.nanyu;

public class Student {
  public void study(){
      System.out.print("好好学习，天天向上");
  }
}
```

- 创建一个教师类

```java
package com.zut.nanyu;

public class Teacher {
    public  void teach() {
        System.out.print("教书育人");
    }
}
```

- 创建一个配置文件

```xml
classname=com.zut.nanyu.Student
methodName=study
```

- 编写测试类

```java
package com.zut.nanyu;

import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Properties;

public class Test1 {
    public static void main(String[] args) throws IOException, ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        //加载数据
        Properties prop=new Properties();
        FileReader fr=new FileReader("./class.txt");
        prop.load(fr);
        fr.close();

        //读取配置文件中的内容
        String classname = prop.getProperty("classname");
        String methodName = prop.getProperty("methodName");

        //通过反射来使用
        //通过com.zut.nanyu.Student，创建Class对象
        Class<?> c = Class.forName(classname);//此处classname=com.zut.nanyu.Student
        //获取无参构造器
        Constructor<?> con = c.getConstructor();
        //通过无参构造器创建一个对象
        Object obj = con.newInstance();
        //通过Class对象获取成员方法对象
        Method m = c.getMethod(methodName);
        m.invoke(obj);
    }
}

//输出结果:好好学习，天天向上
```

