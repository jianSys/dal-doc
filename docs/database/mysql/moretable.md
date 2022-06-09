# 多表查询
多表查询，也称为关联查询，指两个或更多个表一起完成查询操作。

  前提条件：这些一起查询的表之间是有关系的（一对一、一对多），它们之间一定是有关联字段，这个关联字段可能建立了外键，也可能没有建立外键。比如：员工表和部门表，这两个表依靠“部门编号”进行关联。

## 1、笛卡尔积（或交叉连接）

  笛卡尔乘积是一个数学运算。假设我有两个集合 X 和 Y，那么 X 和 Y 的笛卡尔积就是 X 和 Y 的所有可能组合，也就是第一个对象来自于 X，第二个对象来自于 Y 的所有可能。组合的个数即为两个集合中元素个数的乘积数X * Y。

  SQL92中，笛卡尔积也称为交叉连接 ，英文是CROSS JOIN 。在 SQL99 中也是使用 CROSS JOIN表示交叉连接。它的作用就是可以把任意表进行连接，即使这两张表不相关。在MySQL中如下情况会出现笛卡尔积：

```java
#查询员工姓名和所在部门名称
SELECT last_name,department_name FROM employees,departments;
SELECT last_name,department_name FROM employees CROSS JOIN departments;
SELECT last_name,department_name FROM employees INNER JOIN departments;
SELECT last_name,department_name FROM employees JOIN departments;
```

  笛卡尔积的错误会在下面条件下产生：     省略多个表的连接条件（或关联条件）；

    连接条件（或关联条件）无效；

    所有表中的所有行互相连接。

  为了避免笛卡尔积， 可以在WHERE 加入有效的连接条件。

  加入连接条件后，查询语法：

```java
#案例：查询员工的姓名及其部门名称
SELECT last_name, department_name
FROM employees, departments
WHERE employees.department_id = departments.department_id
```

  在表中有相同列时，在列名之前加上表名前缀。

## 2、多表查询分类讲解

  分类1：等值连接 vs 非等值连接

  等值连接：

  多个连接条件与 AND 操作符

```java
#练习：查询员工的employee_id,last_name,department_name,city
SELECT e.employee_id,e.last_name,d.department_name,l.city,e.department_id,l.location_id
FROM employees e,departments d,locations l
WHERE e.department_id = d.department_id AND d.location_id = l.location_id;
```

  区分重复的列名   多个表中有相同列时，必须在列名之前加上表名前缀;

  在不同表中具有相同列名的列可以用表名加以区分。

```java
SELECT employees.last_name, departments.department_name,employees.department_id
FROM employees, departments
WHERE employees.department_id = departments.department_id;
```

  表的别名   使用别名可以简化查询;

  列名前使用表名前缀可以提高查询效率。

```java
SELECT e.employee_id, e.last_name, e.department_id,
d.department_id, d.location_id
FROM employees e , departments d
WHERE e.department_id = d.department_id;
```

  需要注意的是，如果我们使用了表的别名，在查询字段中、过滤条件中就只能使用别名进行代替，不能使用原有的表名，否则就会报错。

  【 强制 】对于数据库中表记录的查询和变更，只要涉及多个表，都需要在列名前加表的别名（或表名）进行限定。

  说明 ：对多表进行查询记录、更新记录、删除记录时，如果对操作列没有限定表的别名（或表名），并且操作列在多个表中存在时，就会抛异常。

  正例 ：select t1.name from table_first as t1 , table_second as t2 where t1.id=t2.id;

  反例 ：在某业务中，由于多表关联查询语句没有加表的别名（或表名）的限制，正常运行两年后，最近在某个表中增加一个同名字段，在预发布环境做数据库变更后，线上查询语句出现出1052 异常：Column ‘name’ in field list is ambiguous。

  连接多个表   总结：连接 n个表,至少需要n-1个连接条件。比如，连接三个表，至少需要两个连接条件。

  非等值连接：

```java
SELECT e.last_name,e.salary,j.grade_level
FROM employees e,job_grades j
WHERE e.salary between j.lowest_sal and j.highest_sal;
#WHERE e.`salary` >= j.`lowest_sal` AND e.`salary` <= j.`highest_sal`;
```

  自连接 vs 非自连接

  自连接   当table1和table2本质上是同一张表，只是用取别名的方式虚拟成两张表以代表不同的意义。然后两个表再进行内连接，外连接等查询。

```java
#自连接的例子：
#练习：查询员工id,员工姓名及其管理者的id和姓名

SELECT emp.employee_id,emp.last_name,mgr.employee_id,mgr.last_name
FROM employees emp ,employees mgr
WHERE emp.manager_id = mgr.employee_id;
```

  非自连接   内连接: 合并具有同一列的两个以上的表的行, 结果集中不包含一个表与另一个表不匹配的行

  外连接: 两个表在连接过程中除了返回满足连接条件的行以外还返回左（或右）表中不满足条件的行 ，这种连接称为左（或右） 外连接。没有匹配的行时, 结果表中相应的列为空(NULL)。

  如果是左外连接，则连接条件中左边的表也称为主表，右边的表称为从表。

  如果是右外连接，则连接条件中右边的表也称为主表，左边的表称为从表。

## 3、SQL92语法

  使用(+)创建连接   在 SQL92 中采用（+）代表从表所在的位置。即左或右外连接中，(+) 表示哪个是从表。

  Oracle 对 SQL92 支持较好，而 MySQL 则不支持 SQL92 的外连接。

```java
# MySQL 则不支持 SQL92 的外连接。
SELECT employee_id,department_name
FROM employees e,departments d
WHERE e.`department_id` = d.department_id(+);
```

  而且在 SQL92 中，只有左外连接和右外连接，没有满（或全）外连接。

## 4、SQL99语法

  使用JOIN…ON子句创建连接的语法结构：

```java
SELECT table1.column, table2.column,table3.column
FROM table1
JOIN table2 ON table1 和 table2 的连接条件
JOIN table3 ON table2 和 table3 的连接条件
```

  语法说明：   可以使用 ON 子句指定额外的连接条件；

  这个连接条件是与其它条件分开的；

  ON 子句使语句具有更高的易读性；

  关键字 JOIN、INNER JOIN、CROSS JOIN 的含义是一样的，都表示内连接。

## 5、SQL99——7种SQL JOINS的实现


![img](https://img-blog.csdnimg.cn/eaddee7450b04240a625ed463174ac24.png#pic_center)   1、内连接(INNER JOIN)的实现   语法：

```java
SELECT 字段列表
FROM A表 INNER JOIN B表
ON 关联条件
WHERE 等其他子句;

# 中图：内连接
SELECT employee_id,department_name
FROM employees e JOIN departments d
ON e.department_id = d.department_id;
```

  外连接(OUTER JOIN)的实现     2、左外连接(LEFT OUTER JOIN)     语法：

```java
#实现查询结果是A
SELECT 字段列表
FROM A表 LEFT JOIN B表
ON 关联条件
WHERE 等其他子句;

# 左上图：左外连接
SELECT employee_id,department_name
FROM employees e LEFT JOIN departments d
ON e.department_id = d.department_id;
```

    3、右外连接(RIGHT OUTER JOIN)     语法：

```java
SELECT 字段列表
FROM A表 RIGHT JOIN B表
ON 关联条件
WHERE 等其他子句;

# 右上图：右外连接
SELECT employee_id,department_name
FROM employees e RIGHT JOIN departments d
ON e.department_id = d.department_id;
```

  需要注意的是，LEFT JOIN 和 RIGHT JOIN 只存在于 SQL99 及以后的标准中，在 SQL92 中不存在，只能用 (+) 表示。

    4、满外连接(FULL OUTER JOIN)     满外连接的结果 = 左右表匹配的数据 + 左表没有匹配到的数据 + 右表没有匹配到的数据。

    SQL99是支持满外连接的。使用FULL JOIN 或 FULL OUTER JOIN来实现。

    需要注意的是，MySQL不支持FULL JOIN，但是可以用 LEFT JOIN UNION RIGHT join代替。

```java
#满外连接：mysql不支持FULL OUTER JOIN
SELECT last_name,department_name
FROM employees e FULL OUTER JOIN departments d
ON e.`department_id` = d.`department_id`;
```

```java
# 左下图：满外连接
# 方式1：左上图 UNION ALL 右中图

SELECT employee_id,department_name
FROM employees e LEFT JOIN departments d
ON e.department_id = d.department_id
UNION ALL
SELECT employee_id,department_name
FROM employees e RIGHT JOIN departments d
ON e.department_id = d.department_id
WHERE e.`department_id` IS NULL;

# 方式2：左中图 UNION ALL 右上图

SELECT employee_id,department_name
FROM employees e LEFT JOIN departments d
ON e.department_id = d.department_id
WHERE d.department_id IS NULL
UNION ALL
SELECT employee_id,department_name
FROM employees e RIGHT JOIN departments d
ON e.department_id = d.department_id;
```

  UNION的使用   合并查询结果 利用UNION关键字，可以给出多条SELECT语句，并将它们的结果组合成单个结果集。合并时，两个表对应的列数和数据类型必须相同，并且相互对应。各个SELECT语句之间使用UNION或UNIONALL关键字分隔。

  语法格式：

```java
SELECT column,... FROM table1
UNION [ALL]
SELECT column,... FROM table2
```

  UNION操作符   UNION 操作符返回两个查询的结果集的并集，去除重复记录。

  UNION ALL操作符——尽量多用（效率高）   UNION ALL操作符返回两个查询的结果集的并集。对于两个结果集的重复部分，不去重。

  注意：执行UNION ALL语句时所需要的资源比UNION语句少。如果明确知道合并数据后的结果数据不存在重复数据，或者不需要去除重复的数据，则尽量使用UNION ALL语句，以提高数据查询的效率。

    5、

```java
# 左中图：
SELECT employee_id,department_name
FROM employees e LEFT JOIN departments d
ON e.department_id = d.department_id
#中间的共同区域是department_id I不为NULL的，要实现左中图就可以只选择department_id I为NULL的
WHERE d.department_id IS NULL;
```

    6、

```java
# 右中图：
SELECT employee_id,department_name
FROM employees e RIGHT JOIN departments d
ON e.department_id = d.department_id
#中间的共同区域是department_id I不为NULL的，要实现右中图就可以用右外连接后，只选择department_id 为NULL的
WHERE e.department_id IS NULL;
```

    7、

```java
# 右下图：左中图  UNION ALL 右中图
SELECT employee_id,department_name
FROM employees e LEFT JOIN departments d
ON e.department_id = d.department_id
WHERE d.department_id IS NULL
UNION ALL
SELECT employee_id,department_name
FROM employees e RIGHT JOIN departments d
ON e.department_id = d.department_id
WHERE e.department_id IS NULL;
```

## 6、SQL99语法新特性

  自然连接   SQL99 在 SQL92 的基础上提供了一些特殊语法，比如NATURAL JOIN用来表示自然连接。我们可以把自然连接理解为 SQL92 中的等值连接。它会帮你自动查询两张连接表中所有相同的字段，然后进行等值连接。

  在SQL92标准中：

```java
SELECT employee_id,last_name,department_name
FROM employees e JOIN departments d
ON e.department_id = d.department_id
AND e.manager_id = d.manager_id;
```

  在 SQL99 中你可以写成：

```java
SELECT employee_id,last_name,department_name
FROM employees e NATURAL JOIN departments d;
```

  USING连接   当我们进行连接的时候，SQL99还支持使用 USING 指定数据表里的同名字段进行等值连接。但是只能配合JOIN一起使用。比如：   在SQL92标准中：

```java
SELECT employee_id,last_name,department_name
FROM employees e JOIN departments d
ON e.department_id = d.department_id;
```

  在 SQL99 中你可以写成：

```java
SELECT employee_id,last_name,department_name
FROM employees e JOIN departments d
USING (department_id);
```