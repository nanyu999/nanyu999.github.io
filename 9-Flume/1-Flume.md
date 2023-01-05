### 一、Flume



### 1.1 Flume简介

<hr>

Flume提供了一个分布式的，可靠的,对大数据量的日志进行高效的收集，聚合,转移的服务,只能在Linux下使用。基于流式框架，容错性强，比较灵活简单。使用- -个简单的可扩展数据模型,可以为在线系统提供服务。可以用于对数据进行实时采集，Kafka (卡弗卡)实时采集。Spark,Storm对数据进行实时的处理。impala对数据进行实时的查询。Hive做离线数据处理，MR离线数据处理。



### 1.2 Flume架构

<hr>

 Flume主要有**<font color=red>Agent</font>**组成，Agent由三部分组成**Source（输入）、Channel（连接）、Sink（输出）**


Flume架构图



![](https://i.loli.net/2020/12/10/q8aHPS5imtRJGA1.png)

Agent 是一个 JVM 进程，它以Event(事件)的形式将数据从源头送至目的地。

- Source 用于采集数据，即与数据的来源进行对接，然后将采集的数据流传输到 Channel。支持各种数据源的采集： Avro、Thrift、Exec、JMS、Spooling Directory、Taildir、Twitter、Kafka、NetCat、Sequence Generator、Syslog、Http、Stress、Legacy 以及自定义数据源。
- Channel 即将 Source 和 Sinks 连接起来，类似于一个队列，是数据的缓冲区，默认有 Memory Channel 和 File Channel。
- Sink 从 Channel 轮询读取数据，然后将数据写到目的地，目的地类型有：下一个 Source，HDFS、Hive、Logger、Avro、Thrift、IRC、File、HBase、ElasticSearch、Kafka、HTTP、Kite以及自定义 Sink。
- Event 数据的传输单元。即事件，类似Java中的bean类。
- 数据传输 Source 可以监控某个文件或数据流，或端口等等，一旦数据源产生新的数据，拿到数据后，将数据分装成一个事件（Event），然后放入（put）到 Channel 中然后（Submit）提交，Channel 队列先进先出，Sink 就去 Channel 队列拉去数据，然后写入到目标中（ HDFS 或者其他的目标）



### 1.3 Flume应用设计

<hr>
Flume不止有单Flumne设计，还可以有多Flum设计、合并设计、多输出设计

- 单Flume设计
一个Agent，Source连接的是被采集数据端，Sink连接的是输出端位置的地方。

![](https://i.loli.net/2020/12/10/q8aHPS5imtRJGA1.png)

- 多Flume设计

  按照一定的顺序将多个Flume连接起来，一个Agent的Sink端指向下一个Agent的Source端，并且前一个Agent的Sink端，与下一个Agent的Source端必须都为Avro类型

  ![](https://i.loli.net/2020/12/10/Nn7lIBTdbfJPt8X.png)

- 合并Flume设计

  多个Agent，多个Agent的Sink（Avro类型）的数据输出作为另外一个Agent（Avro类型）的Source是数据输入（常见于日志收集）

![](https://i.loli.net/2020/12/10/lnXyjwYOgv3RV2d.png)

- 多输出Flume设计

  将 Agent 数据流复用到一个或多个目的地。(多Channels，多Sink，多输出)

  ![](https://i.loli.net/2020/12/10/amQNlfSYE1BjWs4.png)

### 二、环境搭建



### 2.1 Flume环境搭建

<hr>

要求：JDK1.8以上

Flume下载：[官网链接](http://flume.apache.org/download.html)



在一台节点上安装Flume即可

```shell
## 1. 创建安装目录并上传 Flume 安装包
[root@node01 ~]# cd /opt/apps/
[root@node01 SoftWare]# mkdir Flume
[root@node01 SoftWare]# cd Flume/
[root@node01 Flume]# rz
[root@node01 Flume]# ls
apache-flume-1.9.0-bin.tar.gz
## 2. 解压 Flume 安装包
[root@node01 Flume]# tar -zxf apache-flume-1.9.0-bin.tar.gz 
## 3. 重命名 Flume文件夹名称
[root@node01 Flume]# mv apache-flume-1.9.0-bin flume-1.9.0
[root@node01 Flume]# ls
apache-flume-1.9.0-bin.tar.gz  flume-1.9.0
## 4. 删除 Flume 安装包
[root@node01 Flume]# rm -rf apache-flume-1.9.0-bin.tar.gz
## 5. 复制Flume的环境配置文件，并修改Java目录
[root@node01 Flume]# cd flume-1.9.0/conf/
[root@node01 conf]# cp flume-env.sh.template flume-env.sh
[root@node01 conf]# vim flume-env.sh
## 修改JAVA_HOME为自己的JDK安装目录即可
export JAVA_HOME=/opt/apps/jdk1.8.0_256
## 6. 修改 /etc/profile 文件环境变量配置
[root@node01 conf]# vim /etc/profile
#Flume 环境变量配置
export FLUME_HOME=/opt/apps/Flume/flume-1.9.0
export PATH=$PATH:$FLUME_HOME/bin
## 7. 使配置生效
[root@node01 conf]# source /etc/profile
## 9. 检查 Flume 配置是否成功
[root@node01 conf]# flume-ng version
Flume 1.9.0
Source code repository: https://git-wip-us.apache.org/repos/asf/flume.git
Revision: d4fcab4f501d41597bc616921329a4339f73585e
Compiled by fszabo on Mon Dec 17 20:45:25 CET 2018
From source with checksum 35db629a3bda49d23e9b3690c80737f9
```



### 三、Flume实例



### 3.1 监控端口的数据流

<hr>

 **需求：**


> 使用Flume监控node01上的6666端口，并将数据结果输出到控制台上（当向node01上的6666端口发送数据时，node01就会检测到发来的数据，并将这个数据输出到控制台上）

**步骤：**

1.创建目录

```shell
[root@node01 conf]# cd /opt/apps/Flume/
[root@node01 Flume]# mkdir conf
[root@node01 Flume]# cd conf/
```

2.创建配置文件

```shell
[root@node01 conf]# vim flume-netcat.conf
# 配置agent中的名字：a1表示agent的名字，r1表示输入的Source的名字
a1.sources = r1
a1.sinks = k1
a1.channels = c1
# 配置source：输入源类型，地址，端口
a1.sources.r1.type = netcat
a1.sources.r1.bind = node01
a1.sources.r1.port = 6666
# 配置sink：输出目的地的类型【控制台日志】
a1.sinks.k1.type = logger
# 配置channel：类型；Channel中可以存放1000个event，收集100个event就提交事务
a1.channels.c1.type = memory
a1.channels.c1.capacity = 1000
a1.channels.c1.transactionCapacity = 100
# 建立关系
a1.sources.r1.channels = c1
a1.sinks.k1.channel = c1
```

3.启动Flume监控端口

```shell
flume-ng agent \
--conf conf \
--conf-file /opt/apps/Flume/flume-conf/flume-netcat.conf \
--name a1 \
-Dflume.root.logger==INFO,console
```

4.向端口中写入数据，需要先安装nc（netcat）(Ctrl+Z结束数据输入)

```shell
[root@node02 ~]# yum -y install nc
[root@node02 ~]# nc node01 6666
hahaha
OK
1111
OK
```

node01上监控的结果（Ctrl+Z结束检测）

```shell
2020-12-10 14:17:05,372 INFO sink.LoggerSink: Event: { headers:{} body: 68 61 68 61 68 61                               hahaha }
2020-12-10 14:17:35,384 INFO sink.LoggerSink: Event: { headers:{} body: 31 31 31 31                                     1111 }
```



### 3.2 实时读取本地文件到HDFS

<hr>

**需求：**

> 监控本地某一个文件，产生新的内容就添加到 HDFS，并且在控制台显示。其实就是多个输出

**步骤**

```shell
[root@node01 conf]# vim flume-exec.conf
## 添加以下配置信息

a2.sources = r2
a2.sinks = k2
a2.channels = c2
## source
a2.sources.r2.type = exec
a2.sources.r2.command = tail -F /opt/data/tmp.log 
## sink
a2.sinks.k2.type = hdfs
#1. 文件上传的HDFS路径
a2.sinks.k2.hdfs.path = hdfs://node01:9000/flume/%y-%m-%d/%H-%M
#2. 文件的前后缀
## 文件前缀
a2.sinks.k2.hdfs.filePrefix = tmp-log-
## 文件后缀
a2.sinks.k2.hdfs.fileSuffix = .log
## 文件正在写入时的前缀
a2.sinks.k2.hdfs.inUsePrefix = progress-
## 文件正在写入时的后缀
a2.sinks.k2.hdfs.inUseSuffix = .tmp
#3. 时间戳问题
##时间戳是否应四舍五入
a2.sinks.k2.hdfs.round = true
##四舍五入到小于当前时间的最高倍数
a2.sinks.k2.hdfs.roundValue = 1
##四舍五入值的单位
a2.sinks.k2.hdfs.roundUnit = minute
#4. 滚动产生新的文件
##滚动当前文件之前要等待的秒数
a2.sinks.k2.hdfs.rollInterval =  30
##触发滚动的文件大小，以字节为单位
a2.sinks.k2.hdfs.rollSize = 125829120
##滚动之前写入文件的事件数
a2.sinks.k2.hdfs.rollCount = 30
a2.sinks.k2.hdfs.fileType = DataStream
#hdfs.minBlockReplicas这个就是block块的数目
#是否启用本地时间
a2.sinks.k2.hdfs.useLocalTimeStamp = true
##Channel
a2.channels.c2.type = memory
a2.channels.c2.capacity = 1000
a2.channels.c2.transactionCapacity = 100
##关联
a2.sources.r2.channels = c2
a2.sinks.k2.channel = c2
```

创建本地文件

```shell
[root@node01 ~]# cd /opt/
[root@node01 opt]# mkdir data
[root@node01 opt]# vim /opt/data/tmp.log
```

启动Flume监控

```shell
flume-ng agent \
--conf conf \
--name a2 \
--conf-file /opt/apps/Flume/flume-exec.conf
```

使用echo向tmp.log中写入数据

```shell
[root@node01 data]# echo 'hahahaha' >> /opt/data/tmp.log
```

如果出现如下错误，还是guava中的jar包错误。

修改/opt/apps/Flume/flume-1.9.0/lib/中的guava包为高版本即可。

```shell
java.lang.NoSuchMethodError: com.google.common.base.Preconditions.checkArgument(ZLjava/lang/String;Ljava/lang/Object;)V
	at org.apache.hadoop.conf.Configuration.set(Configuration.java:1357)
	at org.apache.hadoop.conf.Configuration.set(Configuration.java:1338)
	at org.apache.hadoop.conf.Configuration.setBoolean(Configuration.java:1679)
	at org.apache.flume.sink.hdfs.BucketWriter.open(BucketWriter.java:221)
	at org.apache.flume.sink.hdfs.BucketWriter.append(BucketWriter.java:572)
	at org.apache.flume.sink.hdfs.HDFSEventSink.process(HDFSEventSink.java:412)
	at org.apache.flume.sink.DefaultSinkProcessor.process(DefaultSinkProcessor.java:67)
	at org.apache.flume.SinkRunner$PollingRunner.run(SinkRunner.java:145)
	at java.lang.Thread.run(Thread.java:748)
Exception in thread "SinkRunner-PollingRunner-DefaultSinkProcessor" java.lang.NoSuchMethodError: com.google.common.base.Preconditions.checkArgument(ZLjava/lang/String;Ljava/lang/Object;)V
	at org.apache.hadoop.conf.Configuration.set(Configuration.java:1357)
	at org.apache.hadoop.conf.Configuration.set(Configuration.java:1338)
	at org.apache.hadoop.conf.Configuration.setBoolean(Configuration.java:1679)
	at org.apache.flume.sink.hdfs.BucketWriter.open(BucketWriter.java:221)
	at org.apache.flume.sink.hdfs.BucketWriter.append(BucketWriter.java:572)
	at org.apache.flume.sink.hdfs.HDFSEventSink.process(HDFSEventSink.java:412)
	at org.apache.flume.sink.DefaultSinkProcessor.process(DefaultSinkProcessor.java:67)
	at org.apache.flume.SinkRunner$PollingRunner.run(SinkRunner.java:145)
	at java.lang.Thread.run(Thread.java:748)
```



### 3.3 监控目录输出到HDFS

<hr>

**需求:**

> 监控目录中的文件情况，一旦有新文件产生就立即上传至 HDFS

**步骤**

> 1. 创建配置文件
> 2. 创建目录
> 3. 启动Flume监控目录
> 4. 将其他文件移动指定目录

1.创建配置文件

```shell
 a3.sources = r3
 a3.sinks = k3
 a3.channels = c3
## source
a3.sources.r3.type = spooldir	
a3.sources.r3.spoolDir = /opt/test/flume/dir	
#a3.sources.r3.includePattern.log
#a3.sources.r3.ignorePattern.tmp
## sink
a3.sinks.k3.type = hdfs
#文件上传的HDFS路径
a3.sinks.k3.hdfs.path = hdfs://node01:9000/flume/dir/%H-%M
##a3.sinks.k3.hdfs.path = hdfs://node01:9000/flume/dir/%y-%m-%d/%H-%M
#文件的前缀
a3.sinks.k3.hdfs.filePrefix = dir-
#是否按照时间滚动产生新的文件夹
a3.sinks.k3.hdfs.round = true
#按照多长时间滚动一次
a3.sinks.k3.hdfs.roundValue = 1
#时间的单位
a3.sinks.k3.hdfs.roundUnit = hour
#滚动产生新的文件
a3.sinks.k3.hdfs.rollInterval =  300000
a3.sinks.k3.hdfs.rollSize = 125829120
a3.sinks.k3.hdfs.rollSize = 125829120
#设置事件多少个之后产生新的文件
a3.sinks.k3.hdfs.rollCount = 52428800
a3.sinks.k3.hdfs.fileType = DataStream
#hdfs.minBlockReplicas这个就是block块的数目
a3.sinks.k3.hdfs.useLocalTimeStamp = true
##Channel
a3.channels.c3.type = memory
a3.channels.c3.capacity = 1000
a3.channels.c3.transactionCapacity = 100
##关联
a3.sources.r3.channels = c3
a3.sinks.k3.channel = c3
```

2.创建目录

```shell
[root@node01 opt]# mkdir -p test/flume/dir
```

3.启动flume监控目录

```shell
flume-ng agent \
--conf conf \
--name a3 \
--conf-file /opt/apps/Flume/flume-dir.conf
```



### 3.4 单数据源多出口

<hr>

1.创建配置文件

```shell
[root@master flume]# vim flume-more.conf 
a4.sources = r1
a4.sinks = k1 k2
a4.channels = c1 c2
##source
a4.sources.r1.type = exec
a4.sources.r1.command = tail -F /opt/test/flume/date.log
##sink
a4.sinks.k1.type = hdfs
a4.sinks.k1.hdfs.path = hdfs://node01:9000/flume/more
a4.sinks.k1.hdfs.roundUnit = hour
a4.sinks.k1.hdfs.rollInterval = 0
a4.sinks.k1.hdfs.rollCount = 0
a4.sinks.k1.hdfs.fileType = DataStream
a4.sinks.k2.type = file_roll
a4.sinks.k2.sink.directory = /opt/test/flume/new
​##channel
a4.channels.c1.type = memory
a4.channels.c1.capacity = 1000
a4.channels.c1.transactionCapacity = 100
a4.channels.c2.type = memory
a4.channels.c2.capacity = 1000
a4.channels.c2.transactionCapacity = 100
a4.sources.r1.channels = c1 c2
a4.sinks.k1.channel = c1
a4.sinks.k2.channel = c2
```

2.创建目录

```shell
[root@master ~]# mkdir -p /opt/test/flume/date.log
[root@master ~]# mkdir -p /opt/test/flume/new
```

3.启动flume监控目录

```sh
flume-ng agent \
--conf conf \
--name a4 \
--conf-file /opt/apps/Flume/flume-more.conf
```



### 3.5 多数据源单出口

<hr>

1.创建配置文件

```sh
[root@master flume]# vim flume-one-more.conf 
##sources
a5.sources = r1 r2
a5.sinks = k1
a5.channels = c1
a5.sources.r1.type = exec
a5.sources.r1.command = tail -F /opt/data/date1.log
a5.sources.r2.type = exec
a5.sources.r2.command = tail -F /opt/data/date2.log
##sinks
a5.sinks.k1.type = hdfs
a5.sinks.k1.hdfs.path = hdfs://node01:9000/flume/sum
a5.sinks.k1.hdfs.roundUnit = hour
a5.sinks.k1.hdfs.rollInterval = 0
a5.sinks.k1.hdfs.rollCount = 0
a5.sinks.k1.hdfs.fileType = DataStream
##channels
a5.channels.c1.type = memory
a5.channels.c1.capacity = 1000
a5.channels.c1.transactionCapacity = 100
a5.sources.r1.channels = c1
a5.sources.r2.channels = c1
a5.sinks.k1.channel = c1
```

2.创建目录

```sh
[root@node01 ~]# mkdir -p /opt/data/date1.log
[root@node01 ~]# mkdir -p /opt/data/date2.log
```

3.启动flume监控目录

```sh
flume-ng agent \
--conf conf \
--name a5 \
--conf-file /opt/apps/Flume/flume-one-more.conf
```



### 3.6 一个agent到多个agent输出

<hr>

1.创建配置文件

```shell
## Flume1
[root@master flume]# vim flume-more-flume1.conf 
a1.sources = r1
a1.sinks = k1 k2
a1.channels = c1 c2

a1.sources.r1.type = exec
a1.sources.r1.command = tail -F /opt/test/flume/date.log

a1.sinks.k1.type = avro
a1.sinks.k1.hostname = master
a1.sinks.k1.port = 5555

a1.sinks.k2.type = avro
a1.sinks.k2.hostname = master
a1.sinks.k2.port = 5556

a1.channels.c1.type = memory
a1.channels.c1.capacity = 1000
a1.channels.c1.transactionCapacity = 100

a1.channels.c2.type = memory
a1.channels.c2.capacity = 1000
a1.channels.c2.transactionCapacity = 100
​
a1.sources.r1.channels = c1 c2
a1.sinks.k1.channel = c1
a1.sinks.k2.channel = c2
​
## Flume2
[root@master flume]# vim flume-more-flume2.conf 
a2.sources = r1
a2.sinks = k1
a2.channels = c1

a2.sources.r1.type = avro
a2.sources.r1.bind = master
a2.sources.r1.port = 5555

a2.sinks.k1.type = hdfs
a2.sinks.k1.hdfs.path = hdfs://master:9000/flume/more-flume
a2.sinks.k1.hdfs.roundUnit = hour
a2.sinks.k1.hdfs.rollInterval = 0
a2.sinks.k1.hdfs.rollCount = 0
a2.sinks.k1.hdfs.fileType = DataStream

a2.channels.c1.type = memory
a2.channels.c1.capacity = 1000
a2.channels.c1.transactionCapacity = 100

a2.sources.r1.channels = c1
a2.sinks.k1.channel = c1

## Flume3
[root@master flume]# vim flume-more-flume3.conf 
a3.sources = r1
a3.sinks = k2
a3.channels = c2

a3.sources.r1.type = avro
a3.sources.r1.bind = master
a3.sources.r1.port = 5556

a3.sinks.k2.type = file_roll
a3.sinks.k2.sink.directory = /opt/test/flume/new1

a3.channels.c2.type = memory
a3.channels.c2.capacity = 1000
a3.channels.c2.transactionCapacity = 100

a3.sources.r1.channels = c2
a3.sinks.k2.channel = c2
```

