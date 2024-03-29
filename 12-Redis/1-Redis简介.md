## Redis五种数据类型

`Redis`支持五种数据类型：`string`（字符串），`hash`（哈希），`list`（列表），`set`（集合），`zset`（有序集合）



### 1 string类型

- `string`是`Redis`最基本的类型，可以理解成与`Memcached`一模一样的类型，一个`key`对应一个`value`。
- `string`类型是二进制安全的。意思是`Redis`的`string`可以包含任何数据。比如`jpg`图片或者序列化的对象。
- `string`类型是`Redis`最基本的数据类型，`string`类型的值最大能存储`512MB`。



#### 1.1 string类型基本操作

> `nil`类似于Java中的`null`，基本运算必须为数字，否则报错

```shell
#！启动Redis客户端
[root@node01 ~]# redis-cli
#！设置数据
127.0.0.1:6379> set name zhangsan
OK
#！查询数据
 127.0.0.1:6379> get name
"zhangsan"
#！删除数据
127.0.0.1:6379> del name
(integer) 1
127.0.0.1:6379> get name
(nil)
#！追加数据
127.0.0.1:6379> set s1 haha
OK
127.0.0.1:6379> get s1
"haha"
127.0.0.1:6379> append s1 111
(integer) 7
127.0.0.1:6379> get s1
"haha111"
#！显示长度
127.0.0.1:6379> strlen s1 
(integer) 7
#！-----------------------------
127.0.0.1:6379> set s2 1
OK
127.0.0.1:6379> set s3 2
OK
#！每次+1
127.0.0.1:6379> incr s2
(integer) 2
127.0.0.1:6379> get s2
"2"
#！每次-1
127.0.0.1:6379> decr s3
(integer) 1
127.0.0.1:6379> get s3
"1"
#！每次+4
127.0.0.1:6379> incrby s2 4
(integer) 6
127.0.0.1:6379> get s2
"6"
#！每次-4
127.0.0.1:6379> decrby s2 4
(integer) 2
127.0.0.1:6379> get s2
"2"
#！截取指定位置字符串
127.0.0.1:6379> set s4 abcdefg
OK
127.0.0.1:6379> GETRANGE s4 0 3
"abcd"
127.0.0.1:6379> GETRANGE s4 0 -1
"abcdefg"
127.0.0.1:6379> GETRANGE s4 0 -2
"abcdef"
127.0.0.1:6379> GETRANGE s4 0 -3
"abcde"
#！设置指定位置的值
127.0.0.1:6379> get s4
"abcdefg"
127.0.0.1:6379> SETRANGE s4 2 hehe
(integer) 7
127.0.0.1:6379> get s4
"abheheg"
#！设置值的过期的时间，15秒之后s5的值变为nil(空)
127.0.0.1:6379> setex s5 15 lalala
OK
127.0.0.1:6379> get s5
"lalala"
127.0.0.1:6379> get s5
"lalala"
#！判断key是否存在，不存在设置值，存在则不设置
127.0.0.1:6379> setnx s5 dadada
(integer) 1
127.0.0.1:6379> get s5
"dadada"
127.0.0.1:6379> setnx s3 sssss
(integer) 0
127.0.0.1:6379> get s3
"1"
127.0.0.1:6379>
#！同时设置多个值
127.0.0.1:6379> mset k1 a k2 b k3 c
OK
127.0.0.1:6379> mget k1 k2 k3
1) "a"
2) "b"
3) "c"
127.0.0.1:6379> get k2
"b"
```



### 2 hash数据类型

- Redis hash是一个键值key=>value对集合。
- Redis hash是一个string类型的field和value的映射表，hash特别适合用于存储对象。
- 类似于Java中的Map



#### 2.1 hash数据类型基本操作

```shell
#！添加数据
127.0.0.1:6379> hset h1 name zhangsan age 18 gender M
(integer) 3
127.0.0.1:6379> 
#！获取数据
127.0.0.1:6379> hget h1 age
"18"
127.0.0.1:6379> hget h1 name
"zhangsan"
127.0.0.1:6379> hget h1 gender
"M"
#！获取全部数据
127.0.0.1:6379> hgetall h1
1) "name"
2) "zhangsan"
3) "age"
4) "18"
5) "gender"
6) "M"
#！修改数据
127.0.0.1:6379> hset h1 name lisi
(integer) 0
127.0.0.1:6379> hget h1 name
"lisi"
#！批量修改数据
127.0.0.1:6379> hmset h1 age 90 gender F 
OK
127.0.0.1:6379> hgetall h1
1) "name"
2) "lisi"
3) "age"
4) "90"
5) "gender"
6) "F"
#！获取长度
127.0.0.1:6379> hlen h1
(integer) 3
#！获取所有key
127.0.0.1:6379> HKEYS h1
1) "name"
2) "age"
3) "gender"
#！获取所有value
127.0.0.1:6379> HVALS h1
1) "lisi"
2) "90"
3) "F"
#！判断某一可以是否存在，若存在返回1，不存在返回0
127.0.0.1:6379> HEXISTS h1 name
(integer) 1
127.0.0.1:6379> HEXISTS h1 email
(integer) 0
```



### 3 list类型

- Redis列表是简单的字符串列表，按照插入顺序排序。可以添加一个元素到列表的头部或者尾部
- 它的底层实际是个双向链表，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差
- 列表最多可存储2^32-1个元素



#### 3.1 list基本操作

```shell
#！创建list
127.0.0.1:6379> lpush k1 1 2 3 5 6
(integer) 5
#！查询数据
127.0.0.1:6379> LRANGE k1 0 -1
1) "6"
2) "5"
3) "3"
4) "2"
5) "1"
127.0.0.1:6379> LRANGE k1 0 -2
1) "6"
2) "5"
3) "3"
4) "2"
127.0.0.1:6379> LRANGE k1 0 4
1) "6"
2) "5"
3) "3"
4) "2"
5) "1"
#！创建list
127.0.0.1:6379> rpush k2 1 2 3 5 6
(integer) 5
#！查询数据
127.0.0.1:6379> LRANGE k2 0 -1
1) "1"
2) "2"
3) "3"
4) "5"
5) "6"
127.0.0.1:6379> LRANGE k2 0 -2
1) "1"
2) "2"
3) "3"
4) "5"
127.0.0.1:6379> LRANGE k2 0 3
1) "1"
2) "2"
3) "3"
4) "5"
#！LPOP与RPOP弹出顶值和尾值
127.0.0.1:6379> LRANGE k1 0 -1
1) "5"
2) "3"
3) "2"
4) "1"
127.0.0.1:6379> lpop k1
"5"
127.0.0.1:6379> rpop k1
"1"
#！获取指定位置的值
127.0.0.1:6379> LPUSH k3 1 2 3 4 5 6 7 8
(integer) 8
127.0.0.1:6379> LRANGE k3 0 -1
1) "8"
2) "7"
3) "6"
4) "5"
5) "4"
6) "3"
7) "2"
8) "1"
127.0.0.1:6379> LINDEX k3 3
"5"
#！获取长度
127.0.0.1:6379> llen k3
(integer) 8
#！删除n个指定的元素
127.0.0.1:6379> RPUSH k4 1 1 1 2 2 2 3 3 3 4 4 4
(integer) 12
127.0.0.1:6379> LRANGE k4 0 -1
 1) "1"
 2) "1"
 3) "1"
 4) "2"
 5) "2"
 6) "2"
 7) "3"
 8) "3"
 9) "3"
10) "4"
11) "4"
12) "4"
127.0.0.1:6379> lrem k4 2 3
(integer) 2
127.0.0.1:6379> LRANGE k4 0 -1
 1) "1"
 2) "1"
 3) "1"
 4) "2"
 5) "2"
 6) "2"
 7) "3"
 8) "4"
 9) "4"
10) "4"
#！删除指定范围的元素
127.0.0.1:6379> LPUSH k5 1 2 3 4 5
(integer) 5
127.0.0.1:6379> LRANGE k5 0 -1
1) "5"
2) "4"
3) "3"
4) "2"
5) "1"
127.0.0.1:6379> LTRIM k5 0 2
OK
127.0.0.1:6379> LRANGE k5 0 -1
1) "5"
2) "4"
3) "3"
 #！RPOPLPUSH 源 目的地
 127.0.0.1:6379> LPUSH k6 1 2 3
(integer) 3
127.0.0.1:6379> LPUSH k7 6 8 7
(integer) 3
127.0.0.1:6379> RPOPLPUSH k6 k7
"1"
#！将k6尾数pop出来添加到k7中
127.0.0.1:6379> LRANGE k6 0 -1
1) "3"
2) "2"
127.0.0.1:6379> LRANGE k7 0 -1
1) "1"
2) "7"
3) "8"
4) "6"
#！设定指定值为新值
127.0.0.1:6379> LPUSH k8 1 2 3 5 4
(integer) 5
#！在元素2的前面增加a
127.0.0.1:6379> linsert k8 before  2 a 
(integer) 6
127.0.0.1:6379> LRANGE k8 0 -1
1) "4"
2) "5"
3) "3"
4) "a"
5) "2"
6) "1"
```



### 4 set类型

- `Redis`的`Set`是`string`类型的无序集合。
- 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。
- 集合内元素的唯一，第二次插入的元素将被忽略
- 常用于去重操作



#### 4.1 set基本操作

```shell
#！添加数据
127.0.0.1:6379> sadd t1 1 2 3 4 1 1 2 5
(integer) 5
#！添加数据
127.0.0.1:6379> SMEMBERS t1
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
#！判断数据是否存在，存在返回1，不存在返回0
127.0.0.1:6379> SISMEMBER t1 2
(integer) 1
127.0.0.1:6379> SISMEMBER t1 0
(integer) 0
#！判断集合元素的个数
127.0.0.1:6379> SCARD t1
(integer) 5
#！删除集合中指定的元素
127.0.0.1:6379> SREM t1 2
(integer) 1
127.0.0.1:6379> SMEMBERS t1
1) "1"
2) "3"
3) "4"
4) "5"
#！随机获取几个数据
127.0.0.1:6379> sadd t2 1 1 1 2 3 4 5 6 7 8 9 3 2 4 6
(integer) 9
127.0.0.1:6379> SMEMBERS t2
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
6) "6"
7) "7"
8) "8"
9) "9"
127.0.0.1:6379> SRANDMEMBER t2 3
1) "7"
2) "6"
3) "5"
127.0.0.1:6379> SRANDMEMBER t2 3
1) "8"
2) "7"
3) "9"
#！随机出栈
127.0.0.1:6379> SPOP t2 2
1) "2"
2) "1"
127.0.0.1:6379> SPOP t2 2
1) "3"
2) "7"
127.0.0.1:6379> SMEMBERS t2
1) "4"
2) "5"
3) "6"
4) "8"
5) "9"
#！移动指定元素到另一个集合中
127.0.0.1:6379> sadd t3 1 2 3
(integer) 3
127.0.0.1:6379> sadd t4 a b c
(integer) 3
127.0.0.1:6379> SMOVE t3 t4 3
(integer) 1
127.0.0.1:6379> SMEMBERS t3
1) "1"
2) "2"
127.0.0.1:6379> SMEMBERS t4
1) "3"
2) "b"
3) "c"
4) "a"
#！差交并
127.0.0.1:6379> sadd t5 3 4 5 6
(integer) 4
127.0.0.1:6379> sadd t6 2 3 4 5
(integer) 4
127.0.0.1:6379> SDIFF t3 t5
1) "1"
2) "2"
127.0.0.1:6379> SINTER t5 t6
1) "3"
2) "4"
3) "5"
127.0.0.1:6379> SUNION t5 t6
1) "2"
2) "3"
3) "4"
4) "5"
5) "6"
```



###  5 zset类型

- `Redis zset`和`set`一样也是`string`类型元素的集合，且不允许重复的成员。
- 每个元素都会关联一个`double`类型的评分。`Redis`正是通过分数来为集合中的成员进行从小到大的排序。
- `zset`的成员是唯一的，但评分(`score`)却可以重复。



#### 5.1 zset基本操作

```shell
#！添加数据
127.0.0.1:6379> zadd z1 10 v1 8 v2 12 v3
(integer) 3
#！查询数据
127.0.0.1:6379> ZRANGE z1 0 -1
1) "v2"
2) "v1"
3) "v3"
#！查询数据，附加scores
127.0.0.1:6379> ZRANGE z1 0 -1 withscores
1) "v2"
2) "8"
3) "v1"
4) "10"
5) "v3"
6) "12"
#！依据特定条件取数据
127.0.0.1:6379> ZRANGEBYSCORE z1 6 15
1) "v2"
2) "v1"
3) "v3"
127.0.0.1:6379> ZRANGEBYSCORE z1 10 15
1) "v1"
2) "v3"
127.0.0.1:6379> ZRANGEBYSCORE z1 (10 15
1) "v3"
127.0.0.1:6379> ZRANGEBYSCORE z1 10 (12
1) "v1"
127.0.0.1:6379> ZRANGEBYSCORE z1 10 15 limit 1 1
1) "v3"
#！删除某一元素
127.0.0.1:6379> ZREM z1 v2
(integer) 1
127.0.0.1:6379> ZRANGE z1 0 -1
1) "v1"
2) "v3"
#！获取集合长度
127.0.0.1:6379> ZCARD z1 
(integer) 2
#！获取指定score范围元素的个数
127.0.0.1:6379> ZCOUNT z1 5 15
(integer) 2
#！获取指定元素的score值
127.0.0.1:6379> ZSCORE z1 v1
"10"
```

