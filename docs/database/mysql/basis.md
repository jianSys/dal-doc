# 基本语法
## 1、SELECT…FROM

  语法：

```java
SELECT 标识选择哪些列
FROM 标识从哪个表中选择
```

  选择全部列：

```java
SELECT *
FROM departments;
```

  选择特定的列：

```java
SELECT department_id, location_id
FROM departments;
```

## 2、列的别名

  重命名一个列，便于计算

  紧跟列名，也可以在列名和别名之间加入关键字AS，别名使用双引号，以便在别名中包含空格或特殊的字符并区分大小写。

  AS 可以省略

```java
SELECT last_name AS name, commission_pct comm
FROM employees;
```

```java
SELECT last_name "Name", salary*12 "Annual Salary"
FROM employees;
```

## 3、去除重复行

  默认情况下，查询会返回全部行，包括重复行。

```java
SELECT department_id
FROM employees;
```

  在SELECT语句中使用关键字DISTINCT去除重复行

```java
SELECT DISTINCT department_id
FROM employees;
```

## 4、空值参与运算

  所有运算符或列值遇到null值，运算的结果都为null。

```java
SELECT employee_id,salary,commission_pct,12 * salary * (1 + commission_pct) "annual_sal"
FROM employees;
```

  在 MySQL 里面， 空值不等于空字符串。一个空字符串的长度是 0，而一个空值的长度是空。而且，在 MySQL 里面，空值是占用空间的。

## 5、着重号

  错误的：

```java
mysql> SELECT * FROM ORDER;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that
corresponds to your MySQL server version for the right syntax to use near 'ORDER' at
line 1
```

  正确的：

```java
SELECT * FROM `ORDER`;
```

  我们需要保证表中的字段、表名等没有和保留字、数据库系统或常用方法冲突。如果真的相同，请在SQL语句中使用一对``（着重号）引起来。

## 6、查询常数

  SELECT 查询还可以对常数进行查询。对的，就是在 SELECT 查询结果中增加一列固定的常数列。这列的取值是我们指定的，而不是从数据表中动态取出的。

  SQL 中的 SELECT 语法的确提供了这个功能，一般来说我们只从一个表中查询数据，通常不需要增加一个固定的常数列，但如果我们想整合不同的数据源，用常数列作为这个表的标记，就需要查询常数。

  比如说，我们想对 employees 数据表中的员工姓名进行查询，同时增加一列字段 corporation ，这个字段固定值为“尚硅谷”，可以这样写：

```java
SELECT '尚硅谷' as corporation, last_name FROM employees
```

## 7、显示表结构

  使用DESCRIBE 或 DESC 命令，表示表结构。

```java
DESCRIBE employees;
```

  或

```java
DESC employees;
```

## 8、过滤数据：WHERE

```java
SELECT 字段1,字段2
FROM 表名
WHERE 过滤条件
```

  使用WHERE 子句，将不满足条件的行过滤掉

  WHERE子句紧随 FROM子句

