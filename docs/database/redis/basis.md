# redis基本命令

## 1.沟通命令，查看状态
  启动客户端，输入ping，Redis给我们返回PONG，表示服务正常运行

```
127.0.0.1:6379> ping
PONG
```

## 2.查看当前数据库中key的数目
  dbsize：作用返回当前操作的数据库中的key的数量，返回值类型为integer

```
127.0.0.1:6379> dbsize
(integer) 3
```
## 3.切换数据库
  Redis默认操作16个数据库，redis.cong配置文件中体现
```
# Set the number of databases. The default database is DB 0, you can select
# a different one on a per-connection basis using SELECT <dbid> where
# dbid is a number between 0 and 'databases'-1
databases 16
```
  使用select index可以切换数据库，默认使用的是db0

```
127.0.0.1:6379> select 2
OK
127.0.0.1:6379[2]> 
```

## 4.删除数据库中的数据
  flushdb作用删除当前操作的数据库中的内容
```
127.0.0.1:6379> keys *
 1) "sys_dict:sys_job_group"
 2) "sys_dict:sys_job_status"
 3) "sys_config:sys.index.skinName"
## 删除表中的数据
127.0.0.1:6379> flushdb
OK
## 查看所有数据,删除成功数据为空
127.0.0.1:6379> keys *
(empty array)
127.0.0.1:6379>
```

## 5.退出客户端与服务端的连接
```
127.0.0.1:6379> exit
```
