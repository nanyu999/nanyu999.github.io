# KAFKA安装配置

KAFKA压缩包下载：

https://kafka.apache.org/downloads

## 1. 上传并解压压缩包

```bash
## 1. 解压
[root@node01 apps]# tar -zxf kafka_2.12-2.7.1.tgz 
[root@node01 apps]# ls
kafka_2.12-2.7.1  kafka_2.12-2.7.1.tgz
[root@node01 apps]# rm -rf kafka_2.12-2.7.1.tgz 
[root@node01 apps]# mv kafka_2.12-2.7.1 kafka
[root@node01 apps]# cd kafka
[root@node01 kafka]# ls
bin  config  libs  LICENSE  NOTICE  site-docs
```

## 2. 环境配置

```bash
[root@node01 kafka]# mkdir logs
[root@node01 kafka]# cd config/
## 2. 修改Server端的配置
[root@node01 config]# vi server.properties
## 修改以下内容
## 每一台broker必须有唯一的一个id【重点注意】
broker.id=1
## 处理网络请求的线程数量
num.network.threads=3
## 用来处理磁盘IO的线程数量
num.io.threads=8
## 日志目录
log.dirs=/opt/module/kafka/logs
## 分区数
num.partitions=1
## Zookeeper 地址【重点注意】
zookeeper.connect=node01:2181,node02:2181,node03:2181
## 3. 远程复制到其他节点
[root@node01 module]# scp -r kafka root@node02:/opt/module/
[root@node01 module]# scp -r kafka root@node03:/opt/module/
## 4. 修改其他节点的broker.id配置【node02修改为2，node03修改为3】
[root@node02 ~]# vim /opt/module/kafka/config/server.properties
[root@node03 ~]# vim /opt/module/kafka/config/server.properties
## 5.配置Kafka环境变量：node01、node02、node03都需要
[root@node01 ~]# vim /etc/profile
export KAFKA_HOME=/opt/apps/kafka
export PATH=$PATH:$KAFKA_HOME/bin
[root@node01 ~]# source /etc/profile
```







```bash

## 6. 启动服务端【注意：daemon是后台启动】
[root@node01 ~]# kafka-server-start.sh -daemon  ${KAFKA_HOME}/config/server.properties
[root@node02 ~]# kafka-server-start.sh -daemon  ${KAFKA_HOME}/config/server.properties
[root@node03 ~]# kafka-server-start.sh -daemon  ${KAFKA_HOME}/config/server.properties
## 7. 查看集群状态
[root@node01 ~]# jps
******************************
---------node01---------
10308 DataNode
10612 ResourceManager
10900 NodeManager
10055 QuorumPeerMain
10199 NameNode
11289 HRegionServer
11833 Kafka
11133 HMaster
12045 Jps
---------node02---------
10609 Kafka
10086 HMaster
10009 HRegionServer
9882 NodeManager
10778 Jps
9630 QuorumPeerMain
9694 DataNode
9775 SecondaryNameNode
---------node03---------
9681 DataNode
9922 HRegionServer
9795 NodeManager
10550 Kafka
9623 QuorumPeerMain
9999 HMaster
10687 Jps
******************************
## 8. 关闭集群
[root@node01 ~]# kafka-server-stop.sh stop
[root@node02 ~]# kafka-server-stop.sh stop
[root@node03 ~]# kafka-server-stop.sh stop

```

