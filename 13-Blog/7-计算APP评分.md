## 计算APP评分

在上一个MapReduce实例WordCount中，使用的是默认的数据格式IntWirteable。但由于MapReduce的数据格式是可以自定义的。

因此，该篇文章是记录使用自定义输入数据类型来实现:<b><font color=red>大量用户对App四方面性能的平均得分。</font></b>

**案例要求：**

> 求用户对 ：
>
> “拼多多、快手、biubiu加速器、腾讯加速器、抖音、QQ、你我当年、京东、作业帮、淘宝、微信、美团、腾讯视频、哔哩哔哩、钉钉、爱奇艺、菜鸟、微博、酷狗音乐、迅雷、小红书、学习通、夸克、QQ音乐、Soul、网易云音乐、百度网盘、饿了么、学习强国、知乎”
>
> 这30款App：UI设计    响应速度    使用率  喜爱程度 四个性能的平均评分
>
> **注意：**必须使用自定义输入数据类型

**源数据（30万用户量）：**

源数据格式如下（部分）：

分别对应用户ID		App名称		UI评分		 响应速度评分  	  使用率评分  		喜爱程度评分 

> U472239003843261	京东						60	75	46	99
> U542820822173045	快手						2	20	80	19
> U542820822173045	学习通					45	29	34	39
> U542820822173045	滴滴出行				31	47	42	49
> U542820822173045	作业帮					52	63	93	99
> U542820822173045	夸克	 					11	13	4	92
> U542820822173045	QQ音乐					94	68	87	50
> U542820822173045	网易云音乐		46	15	81	14
> U542820822173045	京东						81	61	81	57
> U542820822173045	网易云音乐		5	69	50	66



**代码实现：**

**自定义输入数据类型NewWriteable类**

```java
package com.zut.nanyu.hadoop.project4;
import org.apache.hadoop.io.WritableComparable;
import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;
import java.text.NumberFormat;
/*
  自定义数据类型需继承WritableComparable类
 */
public class NewWriteable implements WritableComparable<NewWriteable> {
    private double Ui;//UI设计组件
    private double Vel;//响应速度组件
    private double De;//使用程度组件（Degree）
    private double Lov;//喜好程度组件
    private double All;//总评分

    /*
     无参构造器
     */
    public NewWriteable() {
    }

    /*
      有参构造器
     */
    public NewWriteable(double Ui, double Vel, double De, double Lov, double All) {
        this.Ui = Ui;
        this.Vel = Vel;
        this.De = De;
        this.Lov = Lov;
        this.All = All;

    }

    public NewWriteable(double Ui, double Vel, double De, double Lov) {
        this.Ui = Ui;
        this.Vel = Vel;
        this.De = De;
        this.Lov = Lov;
    }

    public double getUi() {
        return Ui;
    }

    public void setUi(int ui) {
        Ui = ui;
    }

    public double getVel() {
        return Vel;
    }

    public void setVel(int vel) {
        Vel = vel;
    }

    public double getDe() {
        return De;
    }

    public void setDe(int de) {
        De = de;
    }

    public double getLov() {
        return Lov;
    }

    public void setLov(int lov) {
        Lov = lov;
    }

    public double getLAll() {
        return All;
    }

    public void setAll(int all) {
        All = all;
    }

    /*
    普通的方法类，也可以单独写一个工具类来实现
     */
    public NewWriteable run(Iterable<NewWriteable> values) {
        int count = 0;//用于计数，算平均
        double Ui = 0, Vel = 0, De = 0, Lov = 0, All = 0, Ave = 0;//依次对应UI设计、响应名称、使用率、喜爱程度、总评分
        for (NewWriteable value : values) {
            Ui = Ui + value.getUi();
            Vel = Vel + value.getVel();
            De = De + value.getDe();
            Lov = Lov + value.getLov();
            Ave = (Ui + Vel + De + Lov) / 4;
            count = count + 1;
        }
        //最终数数据保留两位小数
        NumberFormat ny = NumberFormat.getInstance();
        ny.setMaximumFractionDigits(2);
        double UI = Ui / count;
        double VEL = Vel / count;
        double DE = De / count;
        double LOV = Lov / count;
        double AVE = Ave / count;
        return new NewWriteable(Double.parseDouble(ny.format(UI)), Double.parseDouble(ny.format(VEL)), Double.parseDouble(ny.format(DE)), Double.parseDouble(ny.format(LOV)), Double.parseDouble(ny.format(AVE)));
    }

    @Override
    public String toString() {
        return "    " + Ui + "   " + Vel + "    " + De + "    " + Lov + "    " + All;
    }

    /*
     序列化与反序列化
     */
    @Override
    public void write(DataOutput out) throws IOException {
        out.writeDouble(this.Ui);
        out.writeDouble(this.Vel);
        out.writeDouble(this.De);
        out.writeDouble(this.Lov);
        out.writeDouble(this.All);
    }

    @Override
    public void readFields(DataInput in) throws IOException {
        this.Ui = in.readDouble();
        this.Vel = in.readDouble();
        this.De = in.readDouble();
        this.Lov = in.readDouble();
        this.All = in.readDouble();
    }

    @Override
    public int compareTo(NewWriteable o) {
        return 0;
    }


}
```



**MapReduce类**

```java
package com.zut.nanyu.hadoop.project4;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import java.io.IOException;
/*
  @钉子君 Mapreduce实例
   需求：统计每个App指标的平均评分
 */
/*
Map阶段
 */
class AveMapper extends Mapper<LongWritable, Text, Text, NewWriteable> {
    @Override
    protected void map(LongWritable key, Text value, Mapper.Context context) throws IOException, InterruptedException {
        //使用制表符分隔成数组
        String strs[] = value.toString().split("\t");
        //strs[0]为用户ID，无用。strs[1]为APP名称，作为Map输出的key值，Map输出的value值为自定义数据类型，参数为strs[2]、strs[3]、strs[4]、strs[5]
        for (String str : strs) {
            context.write(new Text(strs[1]), new NewWriteable(Double.parseDouble(strs[2]), Double.parseDouble(strs[3]), Double.parseDouble(strs[4]), Double.parseDouble(strs[5])));
        }
    }
}

/*
Reduce阶段
 */
class AveReducer extends Reducer<Text, NewWriteable, Text, NewWriteable> {
    @Override
    protected void reduce(Text key, Iterable<NewWriteable> values, Context context) throws IOException, InterruptedException {
        context.write(key, new NewWriteable().run(values));
    }
}
```



Driver类

```java
package com.zut.nanyu.hadoop.project4;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
/*
Driver类里设置各种变量，同时采用Win系统上运行
 */
public class Driver {
    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "App");
        job.setJarByClass(Driver.class);
        job.setMapperClass(AveMapper.class);
        job.setReducerClass(AveReducer.class);
        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(NewWriteable.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(NewWriteable.class);
        FileInputFormat.addInputPath(job, new Path("file:///D:\\Download\\MapReduceData\\in"));
        FileOutputFormat.setOutputPath(job, new Path("file:///D:\\Download\\MapReduceData\\out"));
        System.out.println(job.waitForCompletion(true)?0:1);
    }
}
```



**最终结果：**

![](https://cdn.jsdelivr.net/gh/LazyHaozi/tuchuang/2020/11/14/238e4f.png)



**总结：**其实现原理和WordCount的实现原理是一致的，只是Word Count使用的是默认的数据类型IntWriteable，而本篇文章中的案例，必须使用自定义输入数据格式来实现，底层原理是一样的。

