

## Hadoop环境配置

前提条件：已安装虚拟机，已安装三台centOS7



### 1.1 基本工具安装

- 安装openssh

> 三台节点上都要安装

```shell
[root@node01 ~]# yum -y install openssh-clients
[root@node02 ~]# yum -y install openssh-clients
[root@node03 ~]# yum -y install openssh-clients
```

- 安装时间同步工具

> 三台节点均要安装

```shell
#!安装ntpdate工具
[root@node01 ~]# yum -y install ntp ntpdate
#!设置与网络时间同步
[root@node01 ~]# ntpdate cn.pool.ntp.org
#!系统时间写入硬件时间【将硬件时钟调整为与目前的系统时钟一致】
[root@node01 ~]# hwclock --systohc
```

- 安装vim编辑器

> 每个节点都要安装

```shell
[root@node01 ~]# yum -y install vim
```

- 安装上传（rz）下载(sz)工具

> 在主节点安装即可

```shell
[root@node01 ~]# yum -y install lrzsz
```

- 安装网络下载工具wget

> 主节点安装即可

```shell
[root@node01 ~]# yum -y install wget
```

- 关闭防火墙

> 每个节点都需要操作（包括关闭防火墙和开机自启防火墙）

```shell
#!查看防火墙开启状态
[root@node01 ~]# systemctl status firewalld
#!关闭防火墙
[root@node01 ~]# systemctl stop firewalld
#!禁止开机启动防火墙
[root@node01 ~]# systemctl disable firewalld

#！无需执行-------------------------------------------------
#!开启防火墙
[root@node01 ~]# systemctl start firewalld
#!设置开机启动防火墙
[root@node01 ~]# systemctl enable firewalld
#!重启防火墙
[root@node01 ~]# systemctl restart firewalld
```



### 1.2 修改Host文件

> 在每个节点中都添加以下内容

```shell
192.168.154.101 node01
192.168.154.102 node02
192.168.154.103 node03
```

注释掉前两行

```shell
[root@node01 ~]# vim /etc/hosts
#127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
#::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.100.101 node01
192.168.100.102 node02
192.168.100.103 node03
```



### 1.3 配置免密登录

> 每个节点都执行

```shell
#! 每台节点先使用ssh执行以下，以在主目录产生一个.ssh 文件夹
[root@node01 ~]# ssh 192.168.154.101
#! 然后输入no即可
The authenticity of host '192.168.100.101 (192.168.100.101)' can't be established.
ECDSA key fingerprint is SHA256:PamSi9sKideQkXQWm9stSYkf85oydA+TUbwiBtXkf4E.
ECDSA key fingerprint is MD5:5b:17:f8:7c:ae:49:27:f8:2a:24:30:65:a6:f3:4a:49.
Are you sure you want to continue connecting (yes/no)? no
Host key verification failed.
#! 每台机器均进入~/.ssh 目录进行操作
[root@node01 ~]# cd ~/.ssh
#! 输入以下命令，一路回车，用以产生公钥和秘钥
[root@node01 .ssh]# ssh-keygen -t rsa -P ''
#! 出现以下信息说明生成成功
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): 
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:KU0Z/kXpvREFPvkq6wBwog8NLjZ6fSQDyM+747BtUsA root@node01
The key's randomart image is:
+---[RSA 2048]----+
|        .   ...o.|
|..     . o ..... |
|o.. . o =  ...+. |
| Eoo + * o .. oo |
|  =o* + S .    o.|
| o =.* . .    .. |
|..o.. o   . . .  |
| o+o..     . o   |
| .++.      .o    |
+----[SHA256]-----+
#! 将每台机器上的id_rsa.pub公钥内容复制到authorized_keys文件中
[root@node01 .ssh]# cp id_rsa.pub authorized_keys
#! 将所有的authorized_keys文件进行合并（最简单的方法是将其余两台node主机的文件内容追加到node01主机上）
[root@node02 .ssh]# cat ~/.ssh/authorized_keys | ssh root@node01 'cat >> ~/.ssh/authorized_keys'
[root@node03 .ssh]# cat ~/.ssh/authorized_keys | ssh root@node01 'cat >> ~/.ssh/authorized_keys'
#! 查看node01上的authorized_keys文件内容，类似如下即可
[root@node01 .ssh]# more authorized_keys 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCqJi/Q061hGWv91WkRl+fpvoiQ6OyqLSc4lu5KR0FLmWmRxu/Bp1AeuBzf1V8YyjK+UNapYQMgX2/0RPjDWdCKfchrfhvQz9rOX7w8bqmcYGS44EFvy0kxBxPRUd0q/X/cm6J9tvOHsgKJEXIzTG1HD+arjUBmgbP6MOr1mH3UgjJqkhRS5SYP+RcbrRDnTVH+9IE2bKBBHadxK2r8GlP6DL/CtjjYAQSms9x9b9YR9rk/hDUmRO6piq+upy2Gmp4br1EnRTk3LLgIe5sJZQiBQOaoULL7tj6J7D2LXbC0z+a9p8s/PfE/G/7jhxBAoYpzB30JV5BPZmz702JOQjRn root@node01
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDLeDS5mF/PwxExo++I99A3BfK8gyaLUYC8mZGLT4q0H8Skb/7jN1qIjb8MfwubluoIKiHWrA2h/4iEkb2rBzEfUy/JxP+5a+zpi5NIOcVCX1PcNb7mPmWm1X42Zp6/hOZVXnAHfQv4ZuEZRZrp49GmOnZR8g5mz8Gpr0rl9hk0c1m50qpfY6I8EYjQ200suo/9vkd941Qquk3aX4A+6huAZq1Lu8B1EyTTDoV6cWS1eN4AbEdN4nedYN1NqfN5KxYs9ujCfCNfmF41l7HS8vgPc4Yu0aI4LmZnmFhLei0FdK6HSE03nptm7YJ45oDux5iehxXT8M0nvwC2JcK26aoD root@node02
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDTpPnqphGbBH3vqFFdI0oxq1EmI0zWbrl/52qIy6ysvJ+cqib34XzFHs4N61P4pyXwzL7tgMaYrAw0YfVMbZwmK3AAlpxlLTpfWLii/dBTazGcXaHhR0J3s6qKIwu3ZEaeAUGWyGO4KU1uMWM9foLWeAQthTJhYj4HmE2YNmHV5M39uw+F0j2JXMiWZBLEaklu/IpuWY0IgYVvj/uACowmeFUHHWsYezH0GbxcHPpLnenSfcWxUAXNNaVYURKV6WnXqmsxV/9k8rWQ49Apk5AjHsAKpdWRXEzGVr0FBBydoGkCCNvgrr1ORAAiUnFOp0ZEx/Pq9T8cQVdCjk0pILwv root@node03
#! 将node01上的authorized_keys文件分发到其他主机上
[root@node01 .ssh]# scp ~/.ssh/authorized_keys root@node02:~/.ssh/
[root@node01 .ssh]# scp ~/.ssh/authorized_keys root@node03:~/.ssh/
#! 每台机器之间进行ssh免密码登录操作，包括自己与自己
[root@node01 ~]# ssh node01
[root@node01 ~]# ssh node02
[root@node02 ~]# ssh node01
[root@node01 ~]# ssh node03
[root@node03 ~]# ssh node01
[root@node01 ~]# ssh node02
[root@node02 ~]# ssh node02
[root@node02 ~]# ssh node03
[root@node03 ~]# ssh node02
[root@node02 ~]# ssh node03
[root@node03 ~]# ssh node03
```



### 1.4 下载JAVA

Hadoop 的运行需要`Java`环境，因此必须在所有节点上安装`Java`，并且对`Java`版本有如下要求：Hadoop 3.3 

以上支持`Java 8 and Java 11`，但是编译时只支持`Java 8` Hadoop 3.0 — 3.2 只支持`Java 8` Hadoop 2.7.x — 

2.x 支持`Java 7 and Java 8`



**官网下载**：https://www.oracle.com/java/technologies/oracle-java-archive-downloads.html



### 1.5 安装JDK

> **注意：**
>
> 只需要在`node01`上配置即可，其他节点可以在最后远程复制过去
>
> `/etc/profile`：在用户第一次登录时，加载一次

```shell
#! 在node01主节点上创建指定目录
[root@node01 ~]# mkdir -p /opt/apps
#! 进入到apps目录
[root@node01 ~]# cd /opt/apps/
#! 使用rz命令从Windows主机上传jdk压缩包到node01节点，也可以直接拖拽至xshell命令窗口
[root@node01 apps]# rz
#! 解压到当前目录
[root@node01 apps]# tar -zxvf jdk-8u261-linux-x64.tar.gz
#! 配置环境变量，亦可配置到 /etc/bashrc 中
[root@node01 apps]# vim /etc/profile
#! 在该文件后面追加一下内容
export JAVA_HOME=/opt/apps/jdk1.8.0_261
export JRE_HOME=$JAVA_HOME/jre
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib/rt.jar
export PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
#! 使刚才的设置生效
[root@node01 apps]# source /etc/profile
#! 检测是否配置成功
[root@node01 apps]# java -version
java version "1.8.0_261"
Java(TM) SE Runtime Environment (build 1.8.0_261-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.261-b12, mixed mode)
```



### 1.6 下载Hadoop并安装

**官网链接：**https://hadoop.apache.org/releases.html

> 下载完成后上传至`node01`节点，其他节点可以先不配置，最后统一远程拷贝即可。

```shell
#! 上传
[root@node01 ~]# cd /opt/apps
[root@node01 apps]# rz
#! 解压
[root@node01 apps]# tar -zxvf hadoop-3.1.4.tar.gz
#! 查看解压后的目录信息
[root@node01 apps]# ll hadoop-3.1.4/
总用量 176
drwxr-xr-x. 2 1001 1002    183 7月  21 16:27 bin
drwxr-xr-x. 3 1001 1002     20 7月  21 16:07 etc
drwxr-xr-x. 2 1001 1002    106 7月  21 16:27 include
drwxr-xr-x. 3 1001 1002     20 7月  21 16:27 lib
drwxr-xr-x. 4 1001 1002    288 7月  21 16:27 libexec
-rw-rw-r--. 1 1001 1002 147145 7月  21 14:34 LICENSE.txt
-rw-rw-r--. 1 1001 1002  21867 7月  21 14:34 NOTICE.txt
-rw-rw-r--. 1 1001 1002   1366 7月  21 14:34 README.txt
drwxr-xr-x. 3 1001 1002   4096 7月  21 16:07 sbin
drwxr-xr-x. 4 1001 1002     31 7月  21 16:45 share
```



### 1.7 修改配置文件

在`Hadoop`中有以下配置文件需要做修改，详情请查看[Hadoop 3.1.4 集群配置](https://hadoop.apache.org/docs/r3.1.4/hadoop-project-dist/hadoop-common/ClusterSetup.html)

- hadoop-env.sh

> 此配置文件是`Hadoop`一些核心脚本的配置文件，要指定`JAVA_HOME`。

```shell
[root@node01 apps]# cd hadoop/
[root@node01 hadoop]# vim etc/hadoop/hadoop-env.sh
export JAVA_HOME=/opt/apps/jdk
```

- core-site.xml

> 此配置文件是`Hadoop`核心的配置文件，对应于`Common`模块在此配置文件中配置文件系统的访问端口和访问权限等。

```shell
[root@node01 hadoop]# vim etc/hadoop/core-site.xml
```

```xml
<!--在<configuration></configuration>中间添加一下内容-->
<property>
    <name>fs.defaultFS</name><!--定义Hadoop HDFS中 namenode 的URI和端口【必须配置】-->
    <value>hdfs://node01:9000</value>
</property>
<property>
    <name>hadoop.tmp.dir</name><!--Hadoop运行时临时的存储目录【必须配置】-->
    <value>file:/opt/apps/hadoop/tmp</value>
</property>
<property>
    <name>hadoop.http.staticuser.user</name>
    <value>root</value>
</property>
```

hdfs-site.xml

此配置文件是`HDFS`核心的配置文件，对应于`HDFS`模块，在此配置文件中配置文件系统数据存储路径和`SecondaryNameNode`地址等。

```shell
[root@node01 hadoop]# vim etc/hadoop/hdfs-site.xml
```

```xml
<!--在<configuration></configuration>中间添加一下内容-->
<property><!--namenode节点 元数据存储目录【必须配置】-->
    <name>dfs.namenode.name.dir</name>
    <value>file:/opt/apps/hadoop/dfs/name</value>
</property>
<property><!--datanode 真正的数据存储目录【必须配置】-->
    <name>dfs.datanode.data.dir</name>
    <value>file:/opt/apps/hadoop/dfs/data</value>
</property>
<property><!--指定DataNode存储block的副本数量,不大于DataNode的个数就行，默认为3【必须】-->
    <name>dfs.replication</name>
    <value>2</value>
</property>
<property><!--指定SecondaryNamenode的工作目录【必须配置】-->
    <name>dfs.namenode.checkpoint.dir</name>
    <value>file:/opt/apps/hadoop/dfs/namesecondary</value>
</property>
<property><!--指定SecondaryNamenode的http协议访问地址【必须配置】-->
    <name>dfs.namenode.secondary.http-address</name>
    <value>node03:9868</value>
</property>
<property><!--指定SecondaryNamenode的https协议访问地址：【可以不进行配置】-->
    <name>dfs.namenode.secondary.https-address</name>
    <value>node03:9869</value>
</property>
```

- yarn-site.xml

```shell
[root@node01 hadoop]# vim etc/hadoop/yarn-site.xml
```

> 此配置文件是`Yarn`核心的配置文件，对应于`Yarn`模块，在此配置文件中配置`ResourceManager`主机名和`NodeManager`内存大小等。

```xml
<!--在<configuration></configuration>中间添加一下内容-->
<property>
    <!--Reducer获取数据的方式【必须配置】-->
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
</property>
<property>
    <!--Reducer获取数据的方式中shuffle过程对应的类，可以自定义，【可以不配置】，这是默认的-->
    <name>yarn.nodemanager.aux-services.mapreduce_shuffle.class</name>
    <value>org.apache.hadoop.mapred.ShuffleHandler</value>
</property>
<property>
    <!--ResourceManager主机名，配置后其他的address就不用配置了，除非需要自定义端口【必须配置】-->
    <name>yarn.resourcemanager.hostname</name>
    <value>node02</value>
</property>
<property>
    <!--NodeManager节点的内存大小，单位为MB【必须配置】-->
    <name>yarn.nodemanager.resource.memory-mb</name>
    <value>4096</value>
</property>
<!-- 日志聚集功能【暂时不需要配置】 -->
<property>
    <name>yarn.log-aggregation-enable</name>
    <value>true</value>
</property>
<!-- 日志保留时间设置7天 【暂时不需要配置】-->
<property>
    <name>yarn.log-aggregation.retain-seconds</name>
    <value>604800</value>
</property>
```

- mapred-site.xml

> 此配置文件是`MapReduce`核心的配置文件，对应于`MapReduce`模块，

```shell
[root@node01 hadoop]# vim etc/hadoop/mapred-site.xml
```

> mapreduce.framework.name` `MapReduce`程序运行的框架，默认为`local`，集群模式配置为`yarn

```xml
<!--使用yarn运行mapreduce程序【必须配置】-->
<property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
</property>
<!--配置历史服务器【暂时不需要配置】-->
<property><!--MapReduce JobHistory Server地址-->
    <name>mapreduce.jobhistory.address</name>
    <value>node01:10020</value>
</property>
<!--MapReduce JobHistory Server Web界面地址-->
<property>
    <name>mapreduce.jobhistory.webapp.address</name>
    <value>node01:19888</value>
</property>
```

- workers

> 该文件中配置所有`DataNode`节点的主机名

```shell
[root@node01 hadoop]# vim etc/hadoop/workers
#添加以下内容:这里添加的是所有的数据节点，注意删除原来的localhost【必须配置】
node01
node02
node03
```



### 1.8 文件分发

> 将`node01`节点上的`apps`目录远程拷贝到其他节点

```shell
[root@node01 ~]# scp -r /opt/apps root@node02:/opt/
[root@node01 ~]# scp -r /opt/apps root@node03:/opt/
```



### 1.9 设置环境变量

```shell
#! 所有各节点均编辑/etc/profile文件
[root@node01 hadoop-3.1.4]# vim /etc/profile
#! 添加以下内容
##Hadoop
export HADOOP_HOME=/opt/apps/hadoop
export HADOOP_LOG_DIR=$HADOOP_HOME/logs
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
##Hadoop User
export HADOOP_USERNAME=root
export HDFS_NAMENODE_USER=$HADOOP_USERNAME
export HDFS_DATANODE_USER=$HADOOP_USERNAME
export HDFS_SECONDARYNAMENODE_USER=$HADOOP_USERNAME
export YARN_RESOURCEMANAGER_USER=$HADOOP_USERNAME
export YARN_NODEMANAGER_USER=$HADOOP_USERNAME
#! 使设置立即生效
[root@node01 hadoop-3.1.4]# source /etc/profile
```



### 2.0 格式化Hadoop

> 格式：`hdfs namenode -format <集群名称>`

```shell
[root@node01 ~]# hdfs namenode -format nanyu
WARNING: /opt/apps/hadoop-3.1.4/logs/hadoop does not exist. Creating.
2020-09-02 03:53:28,388 INFO namenode.NameNode: STARTUP_MSG: 
/************************************************************
STARTUP_MSG: Starting NameNode
STARTUP_MSG:   host = node01/192.168.100.101
STARTUP_MSG:   args = [-format, hnumi]
STARTUP_MSG:   version = 3.1.4
STARTUP_MSG:   classpath = **********
STARTUP_MSG:   build = https://github.com/apache/hadoop.git -r 1e877761e8dadd71effef30e592368f7fe66a61b; compiled by 'gabota' on 2020-07-21T08:05Z
STARTUP_MSG:   java = 1.8.0_261

/************************************************************
SHUTDOWN_MSG: Shutting down NameNode at node01/192.168.100.101
************************************************************/
```



### 2.1 启动Hadoop

```shell
#! 在node01上启动HDFS
[root@node01 ~]# start-dfs.sh
Starting namenodes on [node01]
上一次登录：三 8月  2 04:21:57 CST 2020pts/0 上
Starting datanodes
上一次登录：三 8月  2 04:23:35 CST 2020pts/0 上
Starting secondary namenodes [node03]
上一次登录：三 8月  2 04:23:37 CST 2020pts/0 上
#! 在node02上启动Yarn
[root@node02 ~]# start-yarn.sh
Starting resourcemanager
上一次登录：三 9月  2 04:21:43 CST 2020pts/0 上
Starting nodemanagers
上一次登录：三 9月  2 04:23:28 CST 2020pts/0 上
#! 在node01上启动MapReduce历史记录服务
[root@node01 ~]# mapred --daemon start historyserver
#! 在所有节点上使用jps命令查看进程状态
[root@node01 ~]# jps
3588 JobHistoryServer
2838 NodeManager
3068 NameNode
3196 DataNode
3646 Jps
[root@node02 ~]# jps
2768 NodeManager
3207 Jps
3096 DataNode
2622 ResourceManager
[root@node03 ~]# jps
1985 NodeManager
2275 Jps
2090 DataNode
2190 SecondaryNameNode
```



### 2.2 停止Hadoop

```shell
#! 停止 MapReduce 历史服务
[root@node01 ~]# mapred --daemon stop historyserver
#! 停止 Yarn
[root@node02 ~]# stop-yarn.sh 
Stopping nodemanagers
上一次登录：三 8月  2 04:23:30 CST 2020pts/0 上
Stopping resourcemanager
上一次登录：三 8月  2 05:03:58 CST 2020pts/0 上
[root@node01 ~]# stop-dfs.sh 
Stopping namenodes on [node01]
上一次登录：三 8月  2 04:23:41 CST 2020pts/0 上
Stopping datanodes
上一次登录：三 8月  2 05:04:26 CST 2020pts/0 上
Stopping secondary namenodes [node03]
上一次登录：三 8月  2 05:04:28 CST 2020pts/0 上
```



## 2. Centos7安装Anaconda

### 2.1 下载

首先下载Anaconda，下面提供几种下载方法

- 可以去官网下载：[官网下载](https://www.anaconda.com/products/individual)

- 使用国内下载镜像，速度更快点，下载完之后再上传至服务器，这是清华镜像，点击即可跳转下载：[清华镜像源](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-2021.05-Linux-x86_64.sh)

- 使用wget命令直接下载：

```sh
wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-2021.05-Linux-x86_64.sh
```

### 2.2 安装

使用bash直接执行脚本即可

```sh
bash ./Anaconda3-2021.05-Linux-x86_64.sh
```

