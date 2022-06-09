# 单行函数

操作数据对象；

  接受参数返回一个结果；

  只对一行进行变换；

  每行返回一个结果；

  可以嵌套；

  参数可以是一列或一个值。

## 1、数值函数


  基本函数 ![img](https://img-blog.csdnimg.cn/c9b293fadc3c47c08b3540d27b5f3600.png#pic_center)

```java
#1.数值函数
#基本的操作

SELECT ABS(-123),ABS(32),SIGN(-23),SIGN(43),PI(),CEIL(32.32),
CEILING(-43.23),FLOOR(32.32),FLOOR(-43.23),MOD(12,5),12 MOD 5,
12 % 5
FROM DUAL;

#取随机数

#RAND(x)：返回0~1的随机值，其中x的值用作种子值，相同的X值会产生相同的随机数
SELECT RAND(),RAND(),RAND(10),RAND(10),RAND(-1),RAND(-1)
FROM DUAL;

#四舍五入

#ROUND(x,y)：返回一个对x的值进行四舍五入后最接近X的值，并保留到小数点后面Y位
SELECT ROUND(123.556),ROUND(123.456,0),ROUND(123.456,1),
ROUND(123.456,2),ROUND(123.456,-1),ROUND(153.456,-2)
FROM DUAL;

#截断操作
#返回数字x截断为y位小数的结果
SELECT TRUNCATE(123.456,0),TRUNCATE(123.496,1),TRUNCATE(129.45,-1)
FROM DUAL;

#单行函数可以嵌套
SELECT TRUNCATE(ROUND(123.456,2),0)
FROM DUAL;
```


  角度与弧度互换函数 ![img](https://img-blog.csdnimg.cn/7a14ca0e8cb04ef5a7715c56eab2eaee.png#pic_center)

```java
#角度与弧度的互换

SELECT RADIANS(30),RADIANS(45),RADIANS(60),RADIANS(90),
DEGREES(2*PI()),DEGREES(RADIANS(60))
FROM DUAL;
```


  三角函数 ![img](https://img-blog.csdnimg.cn/c04d2203544a421eb231522c52a57a1a.png#pic_center)

```java
#三角函数
SELECT SIN(RADIANS(30)),DEGREES(ASIN(1)),TAN(RADIANS(45)),DEGREES(ATAN(1))
FROM DUAL;
```



  指数与对数 ![img](https://img-blog.csdnimg.cn/da7ccf3e214d453c876b1ede1bd86d6d.png#pic_center)   进制间的转换 ![img](https://img-blog.csdnimg.cn/2393d0bcf0d1431980454cbb6f768b19.png#pic_center)

```java
#进制间的转换
#CONV(x,f1,f2) 返回f1进制数变成f2进制数
SELECT BIN(10),HEX(10),OCT(10),CONV(10,10,8)
FROM DUAL;
```

## 2、字符串函数



![img](https://img-blog.csdnimg.cn/c525b2cbfbb541ad836bc7a27a186c3d.png#pic_center) ![img](https://img-blog.csdnimg.cn/9c751499e2e34c709172ef360e18b095.png#pic_center)

```java
#1个中文 = 3个字节
SELECT ASCII('Abcdfsf'),CHAR_LENGTH('hello'),CHAR_LENGTH('我们'),
LENGTH('hello'),LENGTH('我们')
FROM DUAL;


# xxx worked for yyy
SELECT CONCAT(emp.last_name,' worked for ',mgr.last_name) "details"
FROM employees emp JOIN employees mgr
WHERE emp.manager_id = mgr.employee_id;

SELECT CONCAT_WS('-','hello','world','hello','beijing') CWS
FROM DUAL;


#字符串的索引是从1开始的！
SELECT INSERT('helloworld',2,3,'aaaaa'),REPLACE('hello','ell','mmm')
FROM DUAL;

SELECT UPPER('HelLo'),LOWER('HelLo')
FROM DUAL;


SELECT last_name,salary
FROM employees
WHERE LOWER(last_name) = 'King';

SELECT LEFT('hello',2),RIGHT('hello',3),RIGHT('hello',13)
FROM DUAL;


# LPAD:实现右对齐效果
# RPAD:实现左对齐效果
SELECT employee_id,last_name,LPAD(salary,10,' ')
FROM employees;

SELECT CONCAT('---',LTRIM('    h  el  lo   '),'***'),
TRIM('o' FROM 'ooheollo')
FROM DUAL;

SELECT REPEAT('hello',4),LENGTH(SPACE(5)),STRCMP('abc','abe')
FROM DUAL;

SELECT SUBSTR('hello',2,2),LOCATE('l','hello')
FROM DUAL;


SELECT ELT(2,'a','b','c','d'),FIELD('mm','gg','jj','mm','dd','mm'),
FIND_IN_SET('mm','gg,mm,jj,dd,mm,gg')
FROM DUAL;

SELECT employee_id,NULLIF(LENGTH(first_name),LENGTH(last_name)) "compare"
FROM employees;
```

## 3、日期和时间函数


  获取日期、时间 ![img](https://img-blog.csdnimg.cn/639e05a548d64be18f4347aece4f73b1.png#pic_center)

```java
#3.1  获取日期、时间
SELECT CURDATE(),CURRENT_DATE(),CURTIME(),NOW(),SYSDATE(),
UTC_DATE(),UTC_TIME()
FROM DUAL;

SELECT CURDATE(),CURDATE() + 0,CURTIME() + 0,NOW() + 0
FROM DUAL;
```


  日期与时间戳的转换 ![img](https://img-blog.csdnimg.cn/5d376e2f49434ee885c37c559dcb56f8.png#pic_center)

```java
#3.2 日期与时间戳的转换
SELECT UNIX_TIMESTAMP(),UNIX_TIMESTAMP('2022-03-17 15:34:32'),
FROM_UNIXTIME(1647502404),FROM_UNIXTIME(1647502404)
FROM DUAL;
```


  获取月份、星期、星期数、天数等函数 ![img](https://img-blog.csdnimg.cn/86eee92a66d14b74bd3fae0f344b6965.png#pic_center)

```java
#3.3 获取月份、星期、星期数、天数等函数
SELECT YEAR(CURDATE()),MONTH(CURDATE()),DAY(CURDATE()),
HOUR(CURTIME()),MINUTE(NOW()),SECOND(SYSDATE())
FROM DUAL;

SELECT MONTHNAME('2022-03-17'),DAYNAME('2022-03-17'),WEEKDAY('2022-03-17'),
QUARTER(CURDATE()),WEEK(CURDATE()),DAYOFYEAR(NOW()),
DAYOFMONTH(NOW()),DAYOFWEEK(NOW())
FROM DUAL;
```



  日期的操作函数 ![img](https://img-blog.csdnimg.cn/a2835247faec408190c5a114bb0aa9d6.png#pic_center)   EXTRACT(type FROM date)函数中type的取值与含义： ![img](https://img-blog.csdnimg.cn/820b5b2a61bf462f98bb2f35bcd53b73.png#pic_center)

```java
#3.4 日期的操作函数

SELECT EXTRACT(SECOND FROM NOW()),EXTRACT(DAY FROM NOW()),
EXTRACT(HOUR_MINUTE FROM NOW()),EXTRACT(QUARTER FROM '2022-03-17')
FROM DUAL;
```


  时间和秒钟转换的函数 ![img](https://img-blog.csdnimg.cn/c6190bc3dece4826a10482be02da4ef6.png#pic_center)

```java
#3.5 时间和秒钟转换的函数
SELECT TIME_TO_SEC(CURTIME()),
SEC_TO_TIME(56907)
FROM DUAL;
```




  计算日期和时间的函数 ![img](https://img-blog.csdnimg.cn/9266c5169759410aaedd645a92dca91a.png#pic_center)   上述函数中type的取值： ![img](https://img-blog.csdnimg.cn/4c1bc30efed5455b9ae16b46614b5c20.png#pic_center) ![img](https://img-blog.csdnimg.cn/e3fbc95cbfb04a8cba988d4c522e772c.png#pic_center)

```java
#3.6 计算日期和时间的函数

SELECT NOW(),DATE_ADD(NOW(),INTERVAL 1 YEAR),
DATE_ADD(NOW(),INTERVAL -1 YEAR),
DATE_SUB(NOW(),INTERVAL 1 YEAR)
FROM DUAL;


SELECT DATE_ADD(NOW(), INTERVAL 1 DAY) AS col1,DATE_ADD('2021-10-21 23:32:12',INTERVAL 1 SECOND) AS col2,
ADDDATE('2021-10-21 23:32:12',INTERVAL 1 SECOND) AS col3,
DATE_ADD('2021-10-21 23:32:12',INTERVAL '1_1' MINUTE_SECOND) AS col4,
DATE_ADD(NOW(), INTERVAL -1 YEAR) AS col5, #可以是负数
DATE_ADD(NOW(), INTERVAL '1_1' YEAR_MONTH) AS col6 #需要单引号
FROM DUAL;

SELECT ADDTIME(NOW(),20),SUBTIME(NOW(),30),SUBTIME(NOW(),'1:1:3'),DATEDIFF(NOW(),'2021-10-01'),
TIMEDIFF(NOW(),'2021-10-25 22:10:10'),FROM_DAYS(366),TO_DAYS('0000-12-25'),
LAST_DAY(NOW()),MAKEDATE(YEAR(NOW()),32),MAKETIME(10,21,23),PERIOD_ADD(20200101010101,10)
FROM DUAL;
```




  日期的格式化与解析 ![img](https://img-blog.csdnimg.cn/3fd23c4d1af747129b015ce38ed3c6fc.png#pic_center)   上述非GET_FORMAT函数中fmt参数常用的格式符： ![img](https://img-blog.csdnimg.cn/dfbf8b44e54b423fa6ffe2411bf32140.png#pic_center) ![img](https://img-blog.csdnimg.cn/b022734d4e42430f83df99ff1e4b32ce.png#pic_center)

```java
#3.7 日期的格式化与解析
# 格式化：日期 ---> 字符串
# 解析：  字符串 ----> 日期

#此时我们谈的是日期的显式格式化和解析

#之前，我们接触过隐式的格式化或解析
SELECT *
FROM employees
WHERE hire_date = '1993-01-13';

#格式化：
SELECT DATE_FORMAT(CURDATE(),'%Y-%M-%D'),
DATE_FORMAT(NOW(),'%Y-%m-%d'),TIME_FORMAT(CURTIME(),'%h:%i:%S'),
DATE_FORMAT(NOW(),'%Y-%M-%D %h:%i:%S %W %w %T %r')
FROM DUAL;

#解析：格式化的逆过程
SELECT STR_TO_DATE('2021-October-25th 11:37:30 Monday 1','%Y-%M-%D %h:%i:%S %W %w')
FROM DUAL;

SELECT GET_FORMAT(DATE,'USA')
FROM DUAL;

SELECT DATE_FORMAT(CURDATE(),GET_FORMAT(DATE,'USA'))
FROM DUAL;
```

## 4、流程控制函数


  流程处理函数可以根据不同的条件，执行不同的处理流程，可以在SQL语句中实现不同的条件选择。MySQL中的流程处理函数主要包括IF()、IFNULL()和CASE()函数。 ![img](https://img-blog.csdnimg.cn/c38d845caee74c15afbb467c6e507c5d.png#pic_center)

```java
4.流程控制函数
#4.1 IF(VALUE,VALUE1,VALUE2)

SELECT last_name,salary,IF(salary >= 6000,'高工资','低工资') "details"
FROM employees;

SELECT last_name,commission_pct,IF(commission_pct IS NOT NULL,commission_pct,0) "details",
salary * 12 * (1 + IF(commission_pct IS NOT NULL,commission_pct,0)) "annual_sal"
FROM employees;


#4.2 IFNULL(VALUE1,VALUE2):看做是IF(VALUE,VALUE1,VALUE2)的特殊情况
SELECT last_name,commission_pct,IFNULL(commission_pct,0) "details"
FROM employees;

#4.3 CASE WHEN ... THEN ...WHEN ... THEN ... ELSE ... END
# 类似于java的if ... else if ... else if ... else

SELECT last_name,salary,CASE WHEN salary >= 15000 THEN '白骨精' 
			     WHEN salary >= 10000 THEN '潜力股'
			     WHEN salary >= 8000 THEN '小屌丝'
			     ELSE '草根' END "details",department_id
FROM employees;

SELECT last_name,salary,CASE WHEN salary >= 15000 THEN '白骨精' 
			     WHEN salary >= 10000 THEN '潜力股'
			     WHEN salary >= 8000 THEN '小屌丝'
			     END "details"
FROM employees;

#4.4 CASE ... WHEN ... THEN ... WHEN ... THEN ... ELSE ... END
# 类似于java的swich ... case...
/*

练习1
查询部门号为 10,20, 30 的员工信息, 
若部门号为 10, 则打印其工资的 1.1 倍, 
20 号部门, 则打印其工资的 1.2 倍, 
30 号部门,打印其工资的 1.3 倍数,
其他部门,打印其工资的 1.4 倍数

*/
SELECT employee_id,last_name,department_id,salary,CASE department_id WHEN 10 THEN salary * 1.1
                                                                     WHEN 20 THEN salary * 1.2
                                                                     WHEN 30 THEN salary * 1.3
                                                                     ELSE salary * 1.4
                                                                     END "details"
FROM employees;


/*

练习2
查询部门号为 10,20, 30 的员工信息, 
若部门号为 10, 则打印其工资的 1.1 倍, 
20 号部门, 则打印其工资的 1.2 倍, 
30 号部门打印其工资的 1.3 倍数

*/
SELECT employee_id,last_name,department_id,salary,CASE department_id WHEN 10 THEN salary * 1.1
								     WHEN 20 THEN salary * 1.2
								     WHEN 30 THEN salary * 1.3
								     END "details"
FROM employees
WHERE department_id IN (10,20,30);
```

## 5、加密与解密函数


  加密与解密函数主要用于对数据库中的数据进行加密和解密处理，以防止数据被他人窃取。这些函数在保证数据库安全时非常有用。 ![img](https://img-blog.csdnimg.cn/9687b205aa91456c8e90d8edfa819ee4.png#pic_center)   可以看到，ENCODE(value,password_seed)函数与DECODE(value,password_seed)函数互为反函数。

```java
#5. 加密与解密的函数

# PASSWORD()在mysql8.0中弃用
SELECT PASSWORD('mysql')
FROM DUAL;

SELECT MD5('mysql'),SHA('mysql'),MD5(MD5('mysql'))
FROM DUAL;

#ENCODE()\DECODE() 在mysql8.0中弃用。
/*
SELECT ENCODE('atguigu','mysql'),DECODE(ENCODE('atguigu','mysql'),'mysql')
FROM DUAL;
*/
```

## 6、MySQL信息函数


  MySQL中内置了一些可以查询MySQL信息的函数，这些函数主要用于帮助数据库开发或运维人员更好地对数据库进行维护工作。 ![img](https://img-blog.csdnimg.cn/83ada8e68c224bad8f2d9edb758b7b46.png#pic_center)

```java
#6. MySQL信息函数

SELECT VERSION(),CONNECTION_ID(),DATABASE(),SCHEMA(),
USER(),CURRENT_USER(),CHARSET('尚硅谷'),COLLATION('尚硅谷')
FROM DUAL;
```

## 7、其它函数


  MySQL中有些函数无法对其进行具体的分类，但是这些函数在MySQL的开发和运维过程中也是不容忽视的。 ![img](https://img-blog.csdnimg.cn/ac15f3fdb37246f589334fbf1cbba872.png#pic_center)

```java
#7. 其他函数
#如果n的值小于或者等于0，则只保留整数部分
SELECT FORMAT(123.125,2),FORMAT(123.125,0),FORMAT(123.125,-2)
FROM DUAL;

SELECT CONV(16, 10, 2), CONV(8888,10,16), CONV(NULL, 10, 2)
FROM DUAL;
#以“192.168.1.100”为例，计算方式为192乘以256的3次方，加上168乘以256的2次方，加上1乘以256，再加上100。
SELECT INET_ATON('192.168.1.100'),INET_NTOA(3232235876)
FROM DUAL;
```