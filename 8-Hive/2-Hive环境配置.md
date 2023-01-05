Hive是基于Hadoop的一个数据仓库工具，因此Hive的安装前提必须是Hadoop能够正常运行。



### 2.1 Hive安装模式

<hr>

> 根据**元数据**的位置，将Hive的安装分为三个模式：**内嵌模式、独立模式、远程模式**（最复杂）

#### 1.1.1 Hive内嵌安装模式

不需要额外安装元数据库，采用Hive默认的Derby数据库，这种模式的缺点是只允许有一个 Hive 会话连接。

#### 1.1.2 Hive独立安装模式

集群中一个节点即做服务端，同时也做客户端。在安装 Hive 的节点上安装一个 MySQL 服务端，同时将 `hive.metastore.local` 的值设置为 `true`，配置 MySQL 地址和用户名密码即可。

#### 1.1.3 Hive远程安装模式（√）

将 Hive 服务端与元数据的存储地址分开，元数据直接存储在远程的数据库服务器上即可。

因此node01 安装 Hive 服务端，node02安装Hive客户端 ，node03 安装 MySQL，以此来实现 Hive 与元数据的解耦操作。



### 2.2所需软件合集

<hr>

- Mysql:[官网下载地址](https://dev.mysql.com/downloads/mysql/)

  下载版本如下：

![下载版本](https://i.loli.net/2020/11/28/81B76pTmIbGXAgC.png)



- Hive：[官网下载地址](https://mirrors.tuna.tsinghua.edu.cn/apache/hive/)

​        下载版本如下

![下载版本](https://i.loli.net/2020/11/28/uv1aOwLxbdI6o3B.png)



### 2.3 安装Mysql

<hr>

#### 2.3.1 安装Mysql

下载Mysql，在其中一台节点上安装就行（这里选择在node03上安装Mysql）

```shell
## 1、先卸载node03上的数据库mariadb，不卸载会报错
[root@node03 ~]# rpm -qa | grep mariadb
mariadb-libs-5.5.65-1.el7.x86_64
[root@node03 ~]# rpm -e --nodeps mariadb-libs-5.5.65-1.el7.x86_64
## 2、安装 net-tools 工具，否则会报缺少依赖的错
[root@node03 ~]# yum -y install net-tools
## 3、安装 perl,否则会报缺少依赖的错误
[root@node03 ~]# yum -y install perl
## 4、上传Mysql压缩包到node03上
## 创建一个新的文件夹用于存放安装包
[root@node03 ~]# mkdir /opt/apps/Mysql
[root@node03 ~]# cd /opt/apps/
[root@node03 apps]# ls
Hadoop  Java  Mysql
## 上传Mysql压缩包到node03的/opt/SoftWare/Mysql目录中
[root@node03 ~]# cd /opt/SoftWare/Mysql
## 安装上传下载软件
[root@node03 Mysql]# yum -y install lrzsz
[root@node03 Mysql]# rz
[root@node03 Mysql]# ls
mysql-5.7.32-1.el7.x86_64.rpm-bundle.tar
## 5、解包（并非解压）
[root@node03 Mysql]# tar -xvf mysql-5.7.28-1.el7.x86_64.rpm-bundle.tar 
mysql-community-client-5.7.32-1.el7.x86_64.rpm
mysql-community-common-5.7.32-1.el7.x86_64.rpm
mysql-community-devel-5.7.32-1.el7.x86_64.rpm
mysql-community-embedded-5.7.32-1.el7.x86_64.rpm
mysql-community-embedded-compat-5.7.32-1.el7.x86_64.rpm
mysql-community-embedded-devel-5.7.32-1.el7.x86_64.rpm
mysql-community-libs-5.7.32-1.el7.x86_64.rpm
mysql-community-libs-compat-5.7.32-1.el7.x86_64.rpm
mysql-community-server-5.7.32-1.el7.x86_64.rpm
mysql-community-test-5.7.32-1.el7.x86_64.rpm
## 开始安装，安装的顺序不能乱
[root@node03 Mysql]# rpm -ivh mysql-community-common-5.7.32-1.el7.x86_64.rpm
警告：mysql-community-common-5.7.32-1.el7.x86_64.rpm: 头V3 DSA/SHA1 Signature, 密钥 ID 5072e1f5: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:mysql-community-common-5.7.32-1.e################################# [100%]
[root@node03 Mysql]# rpm -ivh mysql-community-libs-5.7.32-1.el7.x86_64.rpm 
警告：mysql-community-libs-5.7.32-1.el7.x86_64.rpm: 头V3 DSA/SHA1 Signature, 密钥 ID 5072e1f5: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:mysql-community-libs-5.7.32-1.el7################################# [100%]
[root@node03 Mysql]# rpm -ivh mysql-community-libs-compat-5.7.32-1.el7.x86_64.rpm 
警告：mysql-community-libs-compat-5.7.32-1.el7.x86_64.rpm: 头V3 DSA/SHA1 Signature, 密钥 ID 5072e1f5: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:mysql-community-libs-compat-5.7.3################################# [100%]
[root@node03 Mysql]# rpm -ivh mysql-community-client-5.7.32-1.el7.x86_64.rpm 
警告：mysql-community-client-5.7.32-1.el7.x86_64.rpm: 头V3 DSA/SHA1 Signature, 密钥 ID 5072e1f5: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:mysql-community-client-5.7.32-1.e################################# [100%]
[root@node03 Mysql]# rpm -ivh mysql-community-server-5.7.32-1.el7.x86_64.rpm 
警告：mysql-community-server-5.7.32-1.el7.x86_64.rpm: 头V3 DSA/SHA1 Signature, 密钥 ID 5072e1f5: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:mysql-community-server-5.7.32-1.e################################# [100%]
```



#### 2.3.2 启动Mysql服务

```shell
## 1、启动Mysql服务
[root@node03 Mysql]# systemctl start mysqld
## 2、查看Mysql状态
[root@node03 Mysql]# systemctl status mysqld
mysqld.service - MySQL Server
Loaded: loaded (/usr/lib/systemd/system/mysqld.service; enabled; vendor preset: disabled)
Active: active (running) since 六 2020-11-28 15:12:41 CST; 2min 0s ago
Docs: man:mysqld(8)
           http://dev.mysql.com/doc/refman/en/using-systemd.html
 Process: 1394 ExecStart=/usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid $MYSQLD_OPTS (code=exited, status=0/SUCCESS)
 Process: 1345 ExecStartPre=/usr/bin/mysqld_pre_systemd (code=exited, status=0/SUCCESS)
 Main PID: 1397 (mysqld)
   CGroup: /system.slice/mysqld.service
           └─1397 /usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid

11月 28 15:12:36 node03 systemd[1]: Starting MySQL Server...
11月 28 15:12:41 node03 systemd[1]: Started MySQL Server.
## 3、设置开机自启动
[root@node03 Mysql]# systemctl enable mysqld
## 4、删除安装包（节省空间）
[root@node03 Mysql]# ls
mysql-5.7.32-1.el7.x86_64.rpm-bundle.tar                 mysql-community-embedded-devel-5.7.32-1.el7.x86_64.rpm
mysql-community-client-5.7.32-1.el7.x86_64.rpm           mysql-community-libs-5.7.32-1.el7.x86_64.rpm
mysql-community-common-5.7.32-1.el7.x86_64.rpm           mysql-community-libs-compat-5.7.32-1.el7.x86_64.rpm
mysql-community-devel-5.7.32-1.el7.x86_64.rpm            mysql-community-server-5.7.32-1.el7.x86_64.rpm
mysql-community-embedded-5.7.32-1.el7.x86_64.rpm         mysql-community-test-5.7.32-1.el7.x86_64.rpm
mysql-community-embedded-compat-5.7.32-1.el7.x86_64.rpm
[root@node03 Mysql]# rm -rf mysql-*
[root@node03 Mysql]# ls
```



#### 2.3.3 修改Root密码

```shell
## 1、 在日志文件中查看mysql的root用户默认密码
##    如下，默认密码为root@localhost:后面的内容，即：4uNuB5DdiX+X
[root@node03 Mysql]# grep 'temporary password' /var/log/mysqld.log
2020-11-28T07:12:38.953216Z 1 [Note] A temporary password is generated for root@localhost: 4uNuB5DdiX+X
## 2、取消密码检查策略s
##    修改/etc/my.cnf文件，在文件中添加以下内容以禁用密码策略
##    validate_password=off（必须手敲，不能拷贝，拷贝会报错）
[root@node03 Mysql]# vim /etc/my.cnf
## 3、重启Mysql服务
[root@node03 Mysql]# systemctl restart mysqld
## 4、进入mysql，并输入4uNuB5DdiX+X密码
[root@node03 Mysql]# mysql -uroot -p
Enter password: 4uNuB5DdiX+X
## 5、修改密码为123456
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
Query OK, 0 rows affected (0.01 sec)
## 6、退出mysql的命令
mysql> exit
```

##### 2.3.3.1 为什么要禁用密码策略

mysql中的密码策略规定，密码不能太过于简单；必须要有大小写；长度必须符合规定等限制。如果没有取消密码策略检查，则在mysql5.7中必然会报错，让你修改密码。

```shell
## 密码策略示意表
mysql> show variables like '%password%';
+----------------------------------------+-----------------+
| Variable_name                          | Value           |
+----------------------------------------+-----------------+
| default_password_lifetime              | 0               |
| disconnect_on_expired_password         | ON              |
| log_builtin_as_identified_by_password  | OFF             |
| mysql_native_password_proxy_users      | OFF             |
| old_passwords                          | 0               |
| report_password                        |                 |
| sha256_password_auto_generate_rsa_keys | ON              |
| sha256_password_private_key_path       | private_key.pem |
| sha256_password_proxy_users            | OFF             |
| sha256_password_public_key_path        | public_key.pem  |
+----------------------------------------+-----------------+
10 rows in set (0.01 sec)

```



#### 2.3.4 修改数据库编码为UTF-8

```shell
## 在/etc/my.cnf文件中的添加以下内容
character_set_server=utf8
init_connect='SET NAMES utf8'
```



#### 2.3.5 添加Root用户的登录权限

默认只允许 root 帐户在本地登录，如果要在其它机器上连接 MySQL，必须修改 root 允许远程连接，或者添加一个允许远程连接的帐户

```shell
## 1. 进入mysql
[root@master SoftWare]# mysql -uroot -p123456
## 2. 修改root的远程访问权限
##    root代表用户名， %代表任何主机都可以访问， 123456为root访问的密码
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION; 
## 3. flush privileges 刷新MySQL的系统权限，使其即时生效，否则就重启服务器
mysql> FLUSH PRIVILEGES;
## 4. 退出
mysql> exit;

```



### 2.4 安装Hive

<hr>
#### 2.4.1 上传解压Hive压缩包配置环境变量

在node01和node02上都要执行一遍。

```shell
## 1、创建新的目录用于存放Hive安装包
[root@node01 ~]# mkdir /opt/apps/Hive
[root@node01 ~]# cd /opt/apps
[root@node01 apps]# ls
Hadoop3.1.4  Hive  JDK1.8
## 2、上传Hive安装包到Hive文件中
[root@node01 Hive]# rz
## 3、解压Hive安装包
[root@node01 Hive]# ls
apache-hive-3.1.2-bin-hadoop-3.1.4.tar.gz
[root@node01 Hive]# tar -zxf apache-hive-3.1.2-bin-hadoop-3.1.4.tar.gz 
## 4、重命名文件，方便使用
[root@node01 Hive]# mv apache-hive-3.1.2-bin hive-3.1.2
[root@node01 Hive]# ls
apache-hive-3.1.2-bin-hadoop-3.1.4.tar.gz   hive-3.1.2
## 5、删除Hive安装包
[root@node01 Hive]# rm -rf apache-hive-3.1.2-bin-hadoop-3.1.4.tar.gz
[root@node01 Hive]# ls
 hive-3.1.2
## 6、配置环境变量
[root@node01 Hive]# cd hive-3.1.2/
[root@node01 hive-3.1.2]# pwd
/opt/apps/Hive/hive-3.1.2
## 编辑 profile 文件，添加以下环境变量内容
[root@node01 hive-2.3.6]# vim /etc/profile
## Hive 环境变量
##Hive
export HIVE_HOME=/opt/apps/Hive/hive-3.1.2
export PATH=$PATH:$HIVE_HOME/bin
```



#### 2.4.2 修改相关配置文件

##### 2.4.2.1 Server端配置（node01）

```scala
## 新建一个conf文件，在里面创建hive-site.xml配置文件，并添加一下内容
[root@node01 hive-3.1.2]# vim conf/hive-site.xml

<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
  <property><!--数据库连接地址，使用MySQL存储元数据信息-->
    <name>javax.jdo.option.ConnectionURL</name>
    <value>jdbc:mysql://node03:3306/metastore?createDatabaseIfNotExist=true&amp;useSSL=false</value>
  </property>
  <property><!--数据库驱动-->
    <name>javax.jdo.option.ConnectionDriverName</name>
    <value>com.mysql.jdbc.Driver</value>
  </property>
  <property><!--数据库用户名-->
    <name>javax.jdo.option.ConnectionUserName</name>
    <value>root</value>
  </property>
  <property><!--密码-->
    <name>javax.jdo.option.ConnectionPassword</name>
    <value>123456</value>
  </property>
  <property><!--HDFS路径，用于存储不同 map/reduce 阶段的执行计划和这些阶段的中间输出结果。-->
    <name>hive.exec.local.scratchdir</name>
    <value>/hive/tmp</value>
  </property>
  <property><!--HDFS路径，本地表的默认位置-->
    <name>hive.metastore.warehouse.dir</name>
    <value>/hive/warehouse</value>
  </property>
  <property><!--本地路径：Hive 查询日志所在的目录，如果该值为空，将不创建查询日志。-->
    <name>hive.querylog.location</name>
    <value>/tmp/hive/logs</value>
  </property>

  <property><!--本地路径：Hive操作日志-->
    <name>hive.server2.logging.operation.log.location</name>
    <value>/tmp/hive/logs</value>
  </property>

  <property><!--本地路径：远程资源下载的临时目录-->
    <name>hive.downloaded.resources.dir</name>
    <value>/tmp/hive/resources</value>
  </property>
  <property>
    <!-- hiveserver2用户名 -->
    <name>beeline.hs2.connection.user</name>
    <value>root</value>
  </property>

  <property>
    <!-- hiveserver2密码 -->
    <name>beeline.hs2.connection.password</name>
    <value>123456</value>
  </property>
</configuration>
```



##### 2.4.2.2 Client端配置（node02）

```scala
## 新建一个conf文件，在里面创建hive-site.xml配置文件，并添加一下内容
[root@node02 hive-2.3.6]# vi conf/hive-site.xml

<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
  <property><!--这里配置的是否启用本地服务器连接Hive，这里我们是客户端和服务端分开的一个配置，所以这里设置为false.-->
    <name>hive.metastore.local</name>
    <value>false</value>
  </property>
  <property><!--HDFS路径，用于存储不同 map/reduce 阶段的执行计划和这些阶段的中间输出结果。-->
    <name>hive.exec.local.scratchdir</name>
    <value>/hive/tmp</value>
  </property>
  <property><!--本地表的默认位置-->
    <name>hive.metastore.warehouse.dir</name>
    <value>/hive/warehouse</value>
  </property>
  <property><!--Hive连接到该URI请求远程元存储的元数据-->
    <name>hive.metastore.uris</name> 
    <value>thrift://node01:9083</value>
  </property>

  <property><!--本地路径：Hive 查询日志所在的目录，如果该值为空，将不创建查询日志。-->
    <name>hive.querylog.location</name>
    <value>/tmp/hive/logs</value>
  </property>

  <property><!--本地路径：Hive操作日志-->
    <name>hive.server2.logging.operation.log.location</name>
    <value>/tmp/hive/logs</value>
  </property>

  <property><!--本地路径：远程资源下载的临时目录-->
    <name>hive.downloaded.resources.dir</name>
    <value>/tmp/hive/resources</value>
  </property>

  <property><!--显示当前所使用的数据库-->
    <name>hive.cli.print.current.db</name>
    <value>true</value>
  </property>

  <property><!--显示表头-->
    <name>hive.cli.print.header</name>
    <value>true</value>
  </property>
</configuration>
```



#### 2.4.3 添加Mysql驱动

服务端（node01）与客户端（node02）都需要将驱动jar包上传至lib目录下

```scala
## 上传驱动jar包到lib目录下
[root@node02 hive-3.1.2]# cd lib/
[root@node02 lib]# rz -E
rz waiting to receive.
[root@node02 lib]# ls mysql-*
mysql-connector-java-5.1.49.jar  mysql-metadata-storage-0.12.0.jar
```



#### 2.4.4 修改日志文件

Hive 的 log 默认存放在 /tmp/root/hive.log目录下（当前用户名下），可以对其进行修改，两台节点均需要配置

```scala
## 重新复制一份log4j配置文件，从Hive 2.1.0 开始，使用的是log4j2。
[root@node01 hive-3.1.2]# cp conf/hive-log4j2.properties.template conf/hive-log4j2.properties
[root@node01 hive-3.1.2]# vi conf/hive-log4j2.properties
## 修改下面的内容
property.hive.log.dir = /opt/apps/hive-3.1.2/logs
```



#### 2.4.5 格式化Hive

先修改Hadoop的相关配置，否则会报错。

```scala
## 1. 修改 Hadoop 中的 core-site.xml 配置文件
[root@node01 Hive]# vi /opt/SoftWare/Hadoop/hadoop-2.7.7/etc/hadoop/core-site.xml
## 添加以下内容
<property>
    <name>hadoop.proxyuser.root.groups</name>
    <value>root</value>
    <description>Allow the superuser oozie to impersonate any members of the group group1 and group2 </description>
</property>
<property>
    <name>hadoop.proxyuser.root.hosts</name>
    <value>*</value>
    <description>The superuser can connect only from host1 and host2 to impersonate a user</description>
</property>

```

在node01上格式化Hive

```scala
[root@node01 hive-2.3.6]# schematool -initSchema -dbType mysql
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/opt/SoftWare/Hive/hive-2.3.6/lib/log4j-slf4j-impl-2.6.2.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/opt/SoftWare/Hadoop/hadoop-2.7.7/share/hadoop/common/lib/slf4j-log4j12-1.7.10.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J: Actual binding is of type [org.apache.logging.slf4j.Log4jLoggerFactory]
Metastore connection URL:     jdbc:mysql://node03:3306/metastore?createDatabaseIfNotExist=true&useSSL=false
Metastore Connection Driver :     com.mysql.jdbc.Driver
Metastore connection User:     root
Starting metastore schema initialization to 2.3.0
Initialization script hive-schema-2.3.0.mysql.sql
Initialization script completed
schemaTool completed

```



#### 2.4.6  启动Hive

两种方式区别

- 方式一：只要是支持Jdbc的，都能连接（支持的是Jdbc协议）

- 方式二：必须使用hive客户端才能连接（支持的是thrift协议）

先启动Hadoop集群

启动方法1

```shell
## 1. 启动服务端  将启动时的结果输出到null中（扔掉） &表示后台运行，在前台不显示
[root@node01 hive-3.1.2]# hiveserver2 > /dev/null 2>&1 &

## 2. 查询服务端进程 ID
[root@node01 hive-3.1.2]# ps -aux| grep hiveserver2
root      13931  1.0 11.1 2344932 431620 pts/0  Sl   00:10   0:16
## 3. 停止服务端【这里暂时不操作，关闭 Hive 的时候操作】
[root@node01 hive-3.1.2]# kill -9 13931
##4.先关闭Hadoop集群的安全模式
[root@node01 ~]# hdfs dfsadmin -safemode leave   //集群退出安全模式
Safe mode is OFF
## 5. 启动客户端
[root@node02 hive-3.1.2]# beeline -u jdbc:hive2://node01:10000 -n root -p 123456
0: jdbc:hive2://node01:10000> show tables;
+-----------+
| tab_name  |
+-----------+ |
+-----------+
1 row selected (0.616 seconds)

```

启动方法2

```shell
## 1. 启动服务端
[root@node01 hive-2.3.6]# hive --service metastore > /dev/null 2>&1 &
## 2. 查看服务端进程 ID
[root@node01 hive-2.3.6]# ps -aux| grep metastore
root      14342  5.5  8.9 2297776 345508 pts/0  Sl   01:18   0:09
## 3. 杀死服务进程
[root@node01 hive-2.3.6]# kill -9 14342
## 4. 启动客户端
[root@node02 hive-2.3.6]# hive
hive (default)> show tables;
OK
tab_name
student2
Time taken: 0.755 seconds, Fetched: 1 row(s)
hive (default)> exit;
```

启动方法3

```scala
## 1. 启动服务端
[root@node01 hive-2.3.6]# hive --service metastore > /dev/null 2>&1 &
## 2. 查看服务端进程 ID
[root@node01 hive-2.3.6]# ps -aux| grep metastore
root      14342  5.5  8.9 2297776 345508 pts/0  Sl   01:18   0:09
## 3. 杀死服务进程
[root@node01 hive-2.3.6]# kill -9 14342
## 4. 启动客户端（用的比较多的方法，因为可以写脚本）
[root@node02 hive-2.3.6]# hive -e "show tables;"
which: no hbase in (/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/opt/SoftWare/Java/jdk1.8.0_212/bin:/opt/SoftWare/Java/jdk1.8.0_212/jre/bin:/opt/SoftWare/Hadoop/hadoop-2.7.7/bin:/opt/SoftWare/Hadoop/hadoop-2.7.7/sbin:/root/bin:/opt/SoftWare/Java/jdk1.8.0_212/bin:/opt/SoftWare/Java/jdk1.8.0_212/jre/bin:/opt/SoftWare/Hadoop/hadoop-2.7.7/bin:/opt/SoftWare/Hadoop/hadoop-2.7.7/sbin:/opt/SoftWare/Hive/hive-2.3.6/bin)
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/opt/SoftWare/Hive/hive-2.3.6/lib/log4j-slf4j-impl-2.6.2.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/opt/SoftWare/Hadoop/hadoop-2.7.7/share/hadoop/common/lib/slf4j-log4j12-1.7.10.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J: Actual binding is of type [org.apache.logging.slf4j.Log4jLoggerFactory]

Logging initialized using configuration in file:/opt/SoftWare/Hive/hive-2.3.6/conf/hive-log4j2.properties Async: true
OK
tab_name
student2
Time taken: 1.274 seconds, Fetched: 1 row(s)

```

