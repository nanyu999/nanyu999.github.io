# 1 继承



## 1.1 继承简介

> 继承概述：继承是面向对象三大特征之一。可以使得子类具有父类的属性和方法，还可以在子类中重新定义，追加属性和方法

继承格式：

```java
public class 子类名 extends 父类名(){

}
public class ZiLei extends FuLei(){

}
```

- 父类：也称基类、超类

- 子类：也称派生类



实例：

定义一个Person父类

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

    public void sleep() {
        System.out.println("睡觉");
    }

    public void eat() {
        System.out.println("吃饭");
    }

    public void walk() {
        System.out.println("走路");
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

定义一个Student子类来继承Person父类

```java

/**
 * 因为Studnet继承了Person，所以Person中的方法Student的对象都可以使用
 */
public class Student extends Person {
    private String idcard;

    //public Student(String idcard){
//    this.idcard=idcard;
//}
    public Student() {

    }

    public void study(String id) {
        System.out.println("学号:"+this.idcard+" 姓名:"+id+ "正在学习");
    }

    public void setIdcard(String idcard) {
        this.idcard = idcard;
    }

    public String getIdcard() {
        return idcard;
    }
}
```

定义一个测试类测试继承

```java
public class Test1 {
    public static void main(String[] args) {
        Student student = new Student();
        Person person = new Person();
        person.setName("轩辕狗蛋");
        student.setIdcard("1111111");
        System.out.println(person.getName());
        System.out.println(student.getIdcard());
        //调用子类中的方法
        student.study(person.getName());
        //子类继承父类之后可以直接调用父类中的方法
        student.eat();
        student.walk();
    }
}
```



## 1.2 继承优缺点

继承的优点

- 提高了代码的复用性（多个类相同的成员可以放到同一个类中）
- 提高了代码的维护性（如果方法中的代码需要修改，则只需要修改一处即可）

继承的缺点

- 继承让类与类之间产生了关系，类的耦合性增强，当父类发生变化时子类也要发生变化，削弱了子类的独立性

什么时候使用继承

- 假设有两个类A和B，如果满足A是B的一种，或B是A的一种，则说明他们存在继承关系，就可以考虑使用继承

  来体现，否则就不能滥用继承。比如:苹果和水果之间可以用继承，猫和动物之间可以用继承，猫和狗之间不能用继承



## 1.3 变量访问特点

定义一个Person父类

```java
public class Person {
    public int age=30;
}
```

定义一个Student子类

```java
public class Student extends Person {
    public int age=40;
    public void show(){
        int age=50;
        System.out.print(age);
    }
}
```

定义一个测试类

```java
public class Test1 {
    public static void main(String[] args) {
        Student student = new Student();
        student.show();//输出结果为show（）方法中定义的age=50
    }
}
```

此时测试类中的结果为50，如果show()方法中没有`int age=50`则输出结果为40，如果Student类中没有`public int age=40`则输出结果为30。



继承中变量访问特点

- 子类局部范围找（函数中）

- 子类成员范围找（成员变量）

- 父类成员范围找

- 如果都没有就报错(不考虑父亲的父亲...)



## 1.4 super、this关键字

### 1.4.1 this关键字

> 由变量的访问特点可知，如果在函数中定义了与成员变量同名的局部变量，那么在测试类中直接调用的函数的话输出结果为30，如果想让测试类中的输出结果是成员变量中的age，则需要用到`this`关键字

定义一个Person父类

```java
public class Person {
    public int age=30;
}
```

定义一个Student子类

```java
public class Student extends Person {
    public int age=40;
    public void show(){
        int age=50;
        System.out.print("我是在show()方法中定义的局部变量age，值为:"+age);
         System.out.print("我是在Student类中定义的成员变量age，值为:"+this.age);
    }
}
```

定义一个测试类

```java
public class Test1 {
    public static void main(String[] args) {
        Student student = new Student();
        student.show();
    }
}
/*
输出结果:
我是在show()方法中定义的局部变量age，值为:50
我是在Student类中定义的成员变量age，值为:40
*/
```



### 1.4.2 super关键字

> 由1.4.2 章节可以了解到使用`this`关键字可以指代成员变量。那么在继承关系中，如果想让输出结果为父类中的与子类的同名变量则需要使用`super`关键字。

定义一个Person父类

```java
public class Person {
    public int age=30;
}
```

定义一个Student子类

```java
public class Student extends Person {
    public int age=40;
    public void show(){
        int age=50;
         System.out.print("我是在show()方法中定义的局部变量age，值为:"+age);
         System.out.print("我是在Student类中定义的成员变量age，值为:"+this.age);
         System.out.print("我是在Person类中定义的成员变量age，值为:"+super.age);
    }
}
```

定义一个测试类

```java
public class Test1 {
    public static void main(String[] args) {
        Student student = new Student();
        student.show();
    }
}
/*
输出结果:
我是在show()方法中定义的局部变量age，值为:50
我是在Student类中定义的成员变量age，值为:40
我是在Person类中定义的成员变量age，值为:30
*/
```



### 1.4.3 总结

`super`与`this`关键字用法相似

- this代表本类对象的引用
- super代表父类存储空间的标识（父类对象的引用）

`this`和`super`的三种用法

| 关键字 | 访问成员变量                       | 访问构造方法                | 访问成员方法                         |
| ------ | ---------------------------------- | --------------------------- | ------------------------------------ |
| this   | this.成员变量（访问本类成员变量）  | this()（访问本类构造方法）  | this.成员方法()（访问本类成员方法）  |
| super  | super.成员变量（访问父类成员变量） | super()（访问父类构造方法） | super.成员方法()（访问父类成员方法） |



## 1.5 构造方法的访问特点

定义一个父类

```java
public class Person {
   public Person(){
       System.out.println("父类无参构造方法被调用");
   }
   public Person(int age){
       System.out.println("父类有参构造方法被调用");
   }
}
```

定义一个子类

```java
public class Student extends Person {
 public  Student(){
     super();//默认存在，不写也会存在
     System.out.println("子类无参构造器被调用");
 }
 public  Student(String name){
     super();//默认存在，不写也会存在
     System.out.println("子类中有参构造器被调用");
 }
}
```

定义一个测试类

```java
public class Test1 {
    public static void main(String[] args) {
        Student student = new Student();
        Student stu=new Student(20);
    }
}

/*
输出结果
父类无参构造方法被调用
子类无参构造器被调用
父类无参构造方法被调用
子类中有参构造器被调用
*/
```

子类中所有的构造方法默认都会访问父类中无参的构造方法，为什么?

- 因为子类会继承父类中的数据，可能还会使用父类的数据。所以，子类初始化之前，一定要先完成父类数据的初始化。
- 每一个子类构造方法的第一条语句默认都是: `super()`，因此每次调用子类时默认通过super()方法，调用了父类的无参构造器，如果想调用父类的有参构造器，只需要在子类构造器中使用super(参数)调用即可。



如果父类中没有无参构造方法，只有带参构造方法，该怎么办?

- 通过使用super关键字去显示的调用父类的带参构造方法
- 在父类中自己提供一个无参构造方法(推荐:自己给出无参构造方法)



## 1.6 成员方法的访问特点

定义一个子类

```java
public class Teacher extends Person {
    public void method() {
        System.out.println("Teacher类中Method");
    }

    public void show() {
        System.out.println("Teacher类中show方法");
    }
}
```

定义一个父类

```java
public class Person {

    public void method() {
        System.out.println("Person类中Method");
    }

    public void show() {
        System.out.println("Person类中show方法");
    }
}
```

定义一个测试类

```java
public class Test3 {
    public static void main(String[] args) {
        Teacher t=new Teacher();
        t.method();
        t.show();
    }
}
```



**总结：**

> 通过子类对象访问一个方法，先在子类成员范围找，然后再从父类成员范围找，如果都没有就报错(不考虑父亲的父亲...)



## 1.7 方法重写

> 方法重写概述：子类中出现了和父类中完全相同的方法
>
> 方法重写应用：当子类需要父类的功能，而功能主体子类有自己特有内容时，可以重写父类中的方法，这样，即沿袭了父类的功能，又定义了子类特有的内容。

定义一个父类：

并定义一个call()方法

```java
public class Person {

    public void method() {
        System.out.println("Person类中Method");
    }

    public void show() {
        System.out.println("Person类中show方法");
    }
    public void call(String name){
        System.out.println("给"+name+"打电话");
    }
}
```

定义一个子类：

定义一个与父类中相同名称的call()方法，并在父类的基础上添加新内容，实现方法的重写。

```java
public class Teacher extends Person {
    public void method() {
        System.out.println("Teacher类中Method");
    }

    public void show() {
        System.out.println("Teacher类中show方法");
    }
    public void call(String name){
        System.out.println(name+"犯错了");
        //使用父类call()方法，可以沿袭父类功能
        super.call(name);
    }
}
```

定义一个测试类：

```java
public class Test3 {
    public static void main(String[] args) {
        Teacher t=new Teacher();
      t.call("小明");
    }
}
/*
输出结果：
小明犯错了
给小明的家长打电话
*/
```



> `@Override`注解关键字：检验重写方法时方法声明的正确性，如果子类中重写的方法名称与父类中不一致，则会报错。

**方法重写的注意事项：**

- 子类不能重写父类中的私有方法（private修饰的方法）
- 在子类中重写方法时，子类方法的访问权限不能比父类低，即如果父类中的方法用default（默认）级别修饰，则子类在重写方法时方法的访问权限必须比default高或者相同（public>default>private）



## 1.8 继承注意事项

- Java中只支持单继承，不支持多继承

```java
//错误案例
public class son extends Father,Mother{

} 
```

- Java支持多层继承

```java
//正确案例
public class son extends Father{

}
public class Father extends GrandFather{

} 
```



## 1.9 修饰符

### 1.9.1 导包

概述：

使用不同包下的类时，使用的时候要写类的全路径，写起来太麻烦，为了简化带包的操作，Java提供了导包的功能。

格式：`import 包名`

案例：`import 	com.zut.nanyu.Teacher`



### 1.9.2 修饰符

修饰符：权限修饰符、状态修饰符

- 权限修饰符：

| 修饰符    | 同一类中 | 同一包中子类无关类 | 不同包的子类 | 不同包的无关类 |
| --------- | -------- | ------------------ | ------------ | -------------- |
| private   | √        |                    |              |                |
| 默认      | √        | √                  |              |                |
| protected | √        | √                  | √            |                |
| public    | √        | √                  | √            | √              |



- final修饰变量

> 变量是基本类型: final修饰指的是基本类型的数据值不能发生改变
> 变量是引用类型: final修饰指的是引用类型的地址值不能发生改变，但是地址扯里面的内容是可以发生改变的

final修饰基本类型变量

```java
public class FinalDemo {
    public static void main(String[] args) {
//        final修饰基本类型变量
      final int age=100;
//        age=200; final修饰变量之后，变量就变为了常量，就不能重新赋值了（会报错）
        System.out.println(age);
    }
}

```

final修饰引用类型变量

- 定义一个Teacher类

```java
public class Teacher extends Person {
 public  int age=0;
}
```

定义一个测试类

```java
public class FinalDemo {
    public static void main(String[] args) {
        //final修饰引用数据类型t之后，只说明了t的地址值不能再变，但t里面的内容是可以改变的
        final Teacher t=new Teacher();
//        t=new Teacher(); //会报错，因为这个行为修改了对象的地址值
        t.age=10;
        System.out.println(t.age);
    }
}
```



- 状态修饰符：

`static`是静态的意思，它可以修饰成员方法和成员变量

定义一个Teacher类：

```java
public class Teacher extends Person {
    public String name;
    public String school;
    public int age;
    public void show(){
        System.out.println("姓名:"+name+",年龄:"+age+" 岁"+",学校:"+school);
    }
}
```

定义一个测试类：

```java
public class StaticDemo {
    public static void main(String[] args) {
        Teacher t=new Teacher();
        t.name="张三";
        t.school="中国政法大学";
        t.age=20;
        t.show();

        t.name="李四";
        t.school="中国政法大学";
        t.age=39;
        t.show();
    }
}

//输出结果:姓名:张三,年龄:20 岁,学校:中国政法大学
//输出结果:姓名:李四,年龄:39 岁,学校:中国政法大学
```

现要求`t.school="中国政法大学"`只赋值一次，而不用每次都重复赋值

重新定义Teacher类：将`school`类用`static`关键字修饰

```java
public class Teacher extends Person {
    public String name;
    //    public String school;
    public static String school;
    public int age;

    public void show() {
        System.out.println("姓名:" + name + ",年龄:" + age + " 岁" + ",学校:" + school);
    }
}
```

定义一个测试类：

```java
public class StaticDemo {
    public static void main(String[] args) {
        //推荐这样对static修饰的变量赋值
        Teacher.school="清华大学"
        Teacher t=new Teacher();
        t.name="张三";
        
        //如果一个属性被static修饰，不建议像下边这样写
        //t.school="清华大学";
        t.age=20;
        t.show();

        //此处不再对t.school进行赋值
        t.name="李四";
        t.age=39;
        t.show();
    }
}

//输出结果:姓名:张三,年龄:20 岁,学校:清华大学
//输出结果:姓名:李四,年龄:39 岁,学校:清华大学
```



**static修饰的特点：**

- 被类的所有对象共享，也是判断是否使用静态关键字的条件

- 可以通过类名调用，也可以通过对象名调用，**推荐使用类名调用**



### 1.9.3 static访问特点

非静态的成员方法

- 能访问静态的成员变量
- 能访问非静态的成员变量
- 能访问静态的成员方法
- 能访问非静态的成员方法

静态的成员方法

- 能访问静态的成员变量
- 能访问静态的成员方法



总结：**静态成员方法只能访问静态成员**



# 2 多态

## 2.1 多态简介

> 多态概述：同一对象，在不同时刻的不同形态

举例：

```java
// 猫 cat=new 猫();
// 可以说猫是猫
// 也可以说猫是动物，这两种说法都不错
// 动物 animal=new 猫();
```



> 多态的形式：具体类多态，抽象类多态，接口多态。
>
> 多态的前提：有继承或者实现关系;有方法重写;有父(类/接口)引用指向(子/实现)类对象心

多态实现的前提：

- 有继承/实现关系
- 有方法重写
- 有父类引用指向子类对象

代码实例：

创建一个动物类

```java
public class Animal {
    public void eat(){
        System.out.println("动物吃东西");
        }
}
```

创建一个猫类，并继承动物类

```java
public class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }
}
```

创建一个测试类

```java
public class Test1 {
    public static void main(String[] args) {
        //继承关系：Cat类继承Animal类
        //方法重写：Cat类中重写了Animal类中的eat()方法
        //父类引用指向子类对象
        Animal a=new Cat();
        a.eat();
    }

    }

//输出结果
//猫吃鱼
```



## 2.2 多态中成员的访问特点

<font color=red>**成员方法：**</font> 编译看左边，运行看左边

<font color=red>**成员变量：**</font>编译看左边，运行看右边

> 成员方法和成员变量访问不一样的原因：**成员方法有重写，而成员方法没有。**
>
> 多态形式访问成员方法时只能访问子类中重写父类的方法，子类中自定义的方法不能访问



创建一个Animal类

```java
public class Animal {
    public int age = 12;

    public void eat() {
        System.out.println("动物吃东西");
    }
}
```

创建一个Cat类

```java
public class Cat extends Animal {
    public int age = 30;
    public int weight = 120;

    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }
    //子类中自定义的方法
        public void playGame(){
        System.out.println("猫玩游戏");
    }
}
```

创建一个测试类

```java
public class Test1 {
    public static void main(String[] args) {
        Animal a=new Cat();
        System.out.println(a.age);//输出结果：12
       // System.out.println(a.weight); 会报错，父类中没有weight属性
         a.eat();
        //
        //a.playGame(); 由于这是子类中自定义的方法，所以不能访问
    }

    }
```



## 2.3 多态的好处与弊端

- 多态的好处：提高了程序的扩展性

具体体现：定义方法的时候，使用父类型作为参数，将来在使用的时候，使用具体的子类型参与操作

- 多态的弊端：不能使用子类特有的功能。



程序实例：

创建一个Animal类：

```java
public class Animal {
    public void eat() {
        System.out.println("动物吃东西");
    }
}
```

创建一个Cat类：

```java
public class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }
    public void playGame(){
        System.out.println("猫玩游戏");
    }
}
```

创建一个Dog类：

```java
public class Dog extends Animal{
    @Override
    public void eat() {
        System.out.println("狗吃骨头");
    }
    public void lookDoor() {
        System.out.println("狗卡看门");
    }
}
```

创建一个动物操作类：

```java
public class OperateAnimal {
    /*
    下面这种操作过于繁琐，每新增一种动物都要重新写一个方法，程序延展性太低，不推荐使用

    public void useAnimal(Cat cat) {
        cat.eat();
    }

    public void useAnimal(Dog dog) {
        dog.eat();
    }
    */

    //利用多态，父类引用指向子类对象，可以通过传入子类对象的方式来调用子类方法，只需写一个方法即可，提高了程序的扩展性，这是多态的好处。但多态的缺点就是只能调用子类中重写父类的方法，子类中特有的方法无法被访问。
    public void useAnimal(Animal animal){
        animal.eat();
    }
}
```

创建一个测试类：

```java
public class Test1 {
    public static void main(String[] args) {
        OperateAnimal o=new OperateAnimal();
        Dog dog=new Dog();
        o.useAnimal(dog);//狗吃骨头
        Cat cat=new Cat();
        o.useAnimal(cat);//猫吃鱼
        
  }

    }
```



## 2.4 多态的转型

多态中转型可分为：

- 向上转型：从子到父，父类引用指向子类对象
- 向下转型：从父到子，父类引用转换为子类对象



程序实例：

```java
public class Test1 {
    public static void main(String[] args) {
        //向上转型,只能访问子类中重写父类的方法
        Animal animal=new Cat();
        animal.eat();//猫吃鱼
        //向下转型，可以访问子类中特有的方法
        Cat c= (Cat)animal;
        c.eat();
        c.playGame();
  }

    }
```



## 2.5 猫和狗案例（多态版）

定义一个Animal类：

```java
public class Animal {
    private String name;
    private int age;
    public Animal(){

    }
    public  Animal(String name,int age){
        this.age=age;
        this.name=name;
    }

    public void eat(){
        System.out.println("动物吃东西");
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

定义一个Cat类：

```java
public class Cat extends Animal {
    public Cat(){

    }
    public Cat(String name,int age){
        super(name,age);
    }

    @Override
    public void eat() {
        System.out.println("猫吃饭");
    }
}
```

定义一个Dog类：

```java
public class Dog extends Animal{
    public Dog() {
    }
    public Dog(String name, int age) {
        super(name, age);
    }

    @Override
    public void eat() {
        System.out.println("狗吃饭");
    }
}
```

定义一个测试类：

```java
public class Test1 {
    public static void main(String[] args) {
        Animal animal=new Cat();
        animal.setAge(2);
        animal.setName("布丁");
        System.out.println(animal.getAge()+" "+animal.getName());

        animal=new Cat("蓝渐",3);
        System.out.println(animal.getAge()+" "+animal.getName());
  }

    }
```



## 2.6 抽象类

**抽象类概述：**

在Java中，一个没有方法体的方法应该定义为抽象方法，而类中如果有抽象方法，该类必须定义为抽象类。一个抽象类中可以有非抽象方法，也可以没有抽象方法，但只要类中有抽象方法，该类一定是抽象类



程序实例：

```java
public abstract class Animal {
/*
    public abstract void eat(){
        System.out.println("吃东西")
    };
*/
    //抽像方法没有方法体
    public abstract void eat();
}
```



## 2.7 抽象类的特点

- 抽象类和抽象方法必须使用abstract关键字修饰

` public abstract class 类名{} `

`public abstract void eat(){}`

- 抽象类中不一定有抽象方法，但有抽象方法的类一定是抽象类。
- 抽象类不能实例化，不过它可以参照多态的方式，通过子类对象实例化。叫抽象类多态。
- 抽象类的子类要么重写抽象类中的所有方法，要么是个抽象类。



创建一个Animal抽象类：

```java
public abstract class Animal {
    //抽象方法
    public abstract void eat();

    public void sleep() {
        System.out.println("睡觉");
    }
}
```

创建一个Cat类：

```java
public class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }
}
```

创建一个测试类：

```java
public class Test1 {
    public static void main(String[] args) {
        //抽象类需要采用多态的形式创建对象
     Animal a=new Cat();
     a.eat();//此处的eat()方法是Cat类中重写的方法
     a.sleep();//此处的sleep()是Cat类中继承Animal的方法
  }

    }
```



## 2.8 抽象类的成员特点

- 成员变量，抽象类中可以有变量，也可以有常量
- 构造方法，抽象类中有构造方法，但不能实例化，它的作用是用于子类访问父类数据的初始化
- 成员方法，可以有抽象方法，限定子类必须重写的方法，也可以有普通方法，提高代码的复用性。



## 2.9 猫和狗案例（抽象类版）

定义一个`Animal`抽象类

```java
public abstract class Animal {
    private int age;
    private String name;

    //    构造方法
    public Animal() {
    }

    public Animal(int age, String name) {
        this.age=age;
        this.name=name;
    }

    //抽象方法
    public abstract void eat();

    public void sleep() {
        System.out.println(this.name+"在睡觉");
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

定义`Dog`类继承`Animal`

```java
public class Dog extends Animal {
    public Dog() {
    }

    public Dog(String name, int age) {
        super(age, name);
    }

    @Override
    public void eat() {

        System.out.println(super.getAge()+"的"+super.getName()+"在吃骨头");
    }
}
```

定义`Cat`类继承`Animal`

```java
public class Cat extends Animal {
    public Cat() {
    }

    public Cat(int age, String name) {
        super(age, name);
    }

    @Override
    public void eat() {
        System.out.println(super.getAge()+"的"+super.getName()+"在吃鱼");
    }
}
```

定义一个测试类

```java
public class Test1 {
    public static void main(String[] args) {
        //抽象类需要采用多态的形式创建对象
        Animal a = new Cat();
        a.setName("多多");
        a.setAge(1);
        a.eat();//此处的eat()方法是Cat类中重写的方法
        a.sleep();//此处的sleep()是Cat类中继承Animal的方法
        System.out.println("----------------------------------");
        Animal d = new Dog();
        d.setName("豆豆");
        d.setAge(2);
        d.eat();//此处的eat()方法是Cat类中重写的方法
        d.sleep();//此处的sleep()是Cat类中继承Animal的方法
    }

}
/*
输出结果
多多在睡觉
----------------------------------
2的豆豆在吃骨头
豆豆在睡觉
*/
```



# 3 接口

**接口概述**：接口就是一种公共的规范标准，只要符合规范标准，大家都可以通用，比如笔记本电脑上的键盘接口、鼠标接口等，再比如日常家用插座，虽然制造的厂商不同，但都能通用。

![](https://mypic-1303188480.cos.ap-shanghai.myqcloud.com/myimg/QQ%E6%88%AA%E5%9B%BE20210525164124.png)



![]()

> Java中的接口更多体现在对行为的抽象



## 3.1 接口的特点

- 接口用关键字`interface`修饰

`public interface 类名{}`

- 类实现接口用`implements`接口名{}

`public implements 接口名{}`

- 接口不能实例化，如果要实例化，需要以多态的形式实例化，叫接口多态

> 多态的形式：具体类多态，抽象类多态，接口多态。
>
> 多态的前提：有继承或者实现关系;有方法重写;有父(类/接口)引用指向(子/实现)类对象心

- 接口的实现类，要么重写接口中所有的抽象方法，要么是抽象类



定义一个`Jumpping`接口

```java
package com.study.nanyu.day02;

/*
定义一个接口
 */
public interface Jumpping {
    public abstract void jump();
}
```

定义一个`Cat类`实现接口并重写方法

```java
package com.study.nanyu.day02;

public class Cat implements Jumpping{
    @Override
    public void jump() {
        System.out.println("猫猫跳高了");
    }
}
```

定义一个`Dog`类实现接口，不重写方法

```java
package com.study.nanyu.day02;

public abstract class Dog implements Jumpping {

}
```

定义一个测试类

```java
package com.study.nanyu.day02;

public class Demo {
    public static void main(String[] args) {
//        Jumpping j=new Jumpping(); 报错，接口也是抽象内容，不能以普通方法被实例化
        //以多态的形式将接口实例化
        Jumpping j=new Cat();
        j.jump();

    }
}
/*
输出结果:
猫猫跳高了
*/
```



## 3.2 接口成员特点

- 成员变量：接口中只有常量，没有变量，即使定义的是变量，也会变成常量。默认修饰符：`public static final`

- 构造方法：接口中没有构造方法，因为接口主要是对行为进行抽象的，没有具体的存在**，一个类如果没有父类，默认继承自`Object`类**

- 成员方法：接口里的方法只能是抽象方法。默认修饰符：`public abstract`



## 3.3 猫和狗案例（接口版）

定义一个接口

```java
package com.study.nanyu.day02.one;

public interface Jumpping {
    public abstract void jump();
}
```

定义一个`Animal`抽象

```java
package com.study.nanyu.day02.one;

public abstract class Animal {
    private String name;
    private int age;

    public Animal(){}
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public abstract void eat();
    public void sleep(){
        System.out.println("睡觉");
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

定义一个`Cat`类，继承`Animal`类，实现`Jumpping`接口

```java
package com.study.nanyu.day02.one;

public class Cat extends Animal implements Jumpping {
    public Cat() {
    }

    public Cat(String name, int age) {
        super(name, age);
    }

    @Override
    public void jump() {
        System.out.println("猫猫跳高了");
    }

    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }

    public void show(){
        System.out.println("喵喵喵~");
    }
}
```

定义一个`Dog`类，继承`Animal`类，实现`Jumpping`接口

```java
package com.study.nanyu.day02.one;

public class Dog extends Animal implements Jumpping {
    public Dog() {
    }

    public Dog(String name, int age) {
        super(name, age);
    }

    @Override
    public void jump() {
        System.out.println("狗狗跳高了");
    }

    @Override
    public void eat() {
        System.out.println("狗吃骨头");

    }
}
```

定义一个测试类

```java
package com.study.nanyu.day02.two;
import com.study.nanyu.day02.one.Animal;
import com.study.nanyu.day02.one.Cat;
import com.study.nanyu.day02.one.Dog;
import com.study.nanyu.day02.one.Jumpping;

public class Demo {
    public static void main(String[] args) {
        //接口中方法与抽象类中的方法只能分开调用，这种使用方法不恰当
        Jumpping j = new Cat();
        j.jump();//重写的接口中的方法
        Animal c = new Cat();
        c.setAge(12);
        c.setName("多多");
        System.out.println(c.getAge()+"的猫猫"+c.getName());
        c.sleep();//抽象类中的非抽象方法
        c.eat();//重写的抽象父类中的方法
        System.out.println("------------------------------------");
        Jumpping d = new Dog();
        d.jump();//重写的接口中的方法
        Animal d1 = new Dog();
        d1.setAge(11);
        d1.setName("拉拉");
        System.out.println(d1.getAge()+"的猫猫"+d1.getName());
        d1.sleep();//抽象类中的非抽象方法
        d1.eat();//重写的抽象父类中的方法
        System.out.println("------------------------------------");
        
        //正确的使用方法，Cat中包含接口和抽象类中最多的方法
        Cat cat=new Cat();
        cat.setAge(10);
        cat.setName("布布");
        System.out.println(cat.getAge()+"的猫猫"+cat.getName());
        cat.eat();
        cat.sleep();
        cat.jump();
    }

}

/*
输出结果

猫猫跳高了
12的猫猫多多
睡觉
猫吃鱼
------------------------------------
狗狗跳高了
11的猫猫拉拉
睡觉
狗吃骨头
------------------------------------
10的猫猫布布
猫吃鱼
睡觉
猫猫跳高了
*/
```



# 4 内部类

> 内部类概述：内部类就是在一个类中定义一个类。例如，在类A中定义一个类B，则B为A的内部类。

## 4.1 内部类

内部类定义格式：

```java
public class 类名{
	修饰符 class 类名{
	
	}
}
```

```java
public class outer{
	public class inner{
	
	}
}
```

内部类的访问特点：

- 内部类可以直接访问外部类的成员，包括私有
- 外部类想访问内部类的成员必须先创建对象



程序实例：

```java
package com.study.nanyu.day03;

public class Outer {
    public String name = "钉子君";
    public int age = 19;
    private String gender = "女";

    //内部类
    public class Inner {
        public void show() {
            //内部类可以直接访问外部类成员
            System.out.println(name);
            System.out.println(gender);
        }
    }

    public void method() {
        //外部类不能直接访问内部类成员方法
        Inner i = new Inner();
        i.show();
    }
}
```



## 4.2 成员内部类

按照内部类在类中定义的位置不同，可分为如下两种形式：

- 在类的成员位置：成员内部类
- 在类的局部位置：局部内部类（方法中）



**对于成员内部类，外界如何创建对象并调用方法？**

<u>格式：外部类名.内部类名 对象名=外部类对象.内部类对象</u>



程序实例：

创建内部类

```java
package com.study.nanyu.day03.two;

public class Outer {
    private int num=10;
    private class Inner{
        public void show(){
            System.out.println(num);
        }
    }
    public void menthod(){
        Inner i=new Inner();
        i.show();
    }
}

```

创建Demo类

```java
package com.study.nanyu.day03.two;

public class Demo {
    public static void main(String[] args) {
        //创建内部类对象，并调用内部类方法

        //方式一
        /*
        此方式只用于内部类修饰符为public时才适用
        Outer.Inner i=new Outer().new Inner();
        i.show();
         */

        //方式二
        Outer o=new Outer();
        o.menthod();

    }
}

```



## 4.3 局部内部类

> 局部内部类是在方法中定义的类，所以外界是无法直接使用，需要在方法内部创建对象并使用。
>
> 该类可以直接访问外部类的成员，也可以访问方法内的局部变量

程序实例：

创建外部类

```java
package com.study.nanyu.day03.three;

public class Outer {
    private int num=0;
    public void method(){
        class Inner{
            public void show(){
                System.out.println(num);
            }
        }
        Inner i=new Inner();
        i.show();
    }
}
```

创建内部类

```java
package com.study.nanyu.day03.three;

import com.study.nanyu.day03.two.Outer;

public class Demo {
    public static void main(String[] args) {
        Outer o=new Outer();
        o.menthod();
    }
}
```



## 4.4 匿名内部类

> 前提：存在一个类或接口，这个类可以是具体类，也可以是抽象类
>
> **本质：**是一个继承了该类或实现了该接口的子类匿名对象，匿名内部类是局部内部类的一种形式。

格式：

```java
new 类名或接口名(){
	//重写方法
}
```

```
new Inter(){
	public void show(){
	
	}
}
```



程序示例

定义一个接口

```java
package com.study.nanyu.day03.four;

public interface Inter {
    void show();
}
```

定义一个外部类

```java
package com.study.nanyu.day03.four;

public class Outer {
    public void method() {
        //它的本质是实现了Inter接口的子类的匿名对象
        new Inter() {
            @Override
            public void show() {
                System.out.println("Hello World");
            }
        };

        //方法调用
        new Inter() {
            @Override
            public void show() {
                System.out.println("Hello World");
            }
        }.show();

        //方法调用
        Inter i = new Inter() {
            @Override
            public void show() {
                System.out.println("Hello World");
            }
        };
        i.show();
        i.show();
        i.show();

    }
}
```

定义测试类

```java
package com.study.nanyu.day03.four;

public class Demo {
    public static void main(String[] args) {
        Outer o=new Outer();
        o.method();
    }
}
```



## 4.5 匿名内部类的应用

采用匿名内部类可以提升扩展性，节省不必要的代码。



定义一个接口

```java
package com.study.nanyu.day04;

public interface Jump {
    public void jump();
}
```

定义一个`Cat`实现类

```java
package com.study.nanyu.day04;

public class Cat implements Jump{
    @Override
    public void jump() {
        System.out.println("猫猫跳高啦！");
    }
}
```

定义一个`Cat`实现类

```java
package com.study.nanyu.day04;

public class Dog implements Jump {

    @Override
    public void jump() {
        System.out.println("狗狗跳高了");
    }
}
```

定义一个`Dog`类

```java
package com.study.nanyu.day04;

public class JumpOperate {
    public void method(Jump jump){
        jump.jump();
    }
}
```

定义一个测试类

```java
package com.study.nanyu.day04;

public class Demo {
    public static void main(String[] args) {
        /*
        扩展性不高，每增加一个新的动物，就要新创建一个类
        Jump j=new Cat();
        Jump j1=new Dog();
        JumpOperate jo=new JumpOperate();
        jo.method(j);
        jo.method(j1);
        */
        JumpOperate jo=new JumpOperate();
        jo.method(new Jump() { //匿名内部类的本质是对象
            @Override
            public void jump() {
                System.out.println("猫猫可以跳高了");
            }
        });
        jo.method(new Jump() { //匿名内部类的本质是对象
            @Override
            public void jump() {
                System.out.println("狗可以跳高了");
            }
        });
        jo.method(new Jump() { //匿名内部类的本质是对象
            @Override
            public void jump() {
                System.out.println("猪可以跳高了");
            }
        });
    }


}
```