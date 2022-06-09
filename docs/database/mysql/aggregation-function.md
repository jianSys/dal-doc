# 聚合函数   
聚合函数作用于一组数据，并对一组数据返回一个值。

## 1、AVG / SUM / MAX / MIN / COUNT

  AVG、SUM   可以对数值型数据使用AVG 和 SUM 函数。

```java
#1.1 AVG / SUM ：只适用于数值类型的字段（或变量）
SELECT AVG(salary),SUM(salary),AVG(salary) * 107
FROM employees;

#如下的操作没有意义
SELECT SUM(last_name),AVG(last_name),SUM(hire_date)
FROM employees;
```

  MAX、MIN   可以对任意数据类型的数据使用 MIN 和 MAX 函数。

```java
#1.2 MAX / MIN :适用于数值类型、字符串类型、日期时间类型的字段（或变量）

SELECT MAX(salary),MIN(salary)
FROM employees;

SELECT MAX(last_name),MIN(last_name),MAX(hire_date),MIN(hire_date)
FROM employees;
```

  COUNT   COUNT(*)返回表中记录总数，适用于任意数据类型。

  COUNT(expr) 返回expr不为空的记录总数。

```java
#1.3 COUNT：
# ① 作用：计算指定字段在查询结构中出现的个数（不包含NULL值的）

SELECT COUNT(employee_id),COUNT(salary),COUNT(2 * salary),COUNT(1),COUNT(2),COUNT(*)
FROM employees ;

#如果计算表中有多少条记录，如何实现？
#方式1：COUNT(*)
#方式2：COUNT(1)
#方式3：COUNT(具体字段) : 不一定对！

#② 注意：计算指定字段出现的个数时，是不计算NULL值的。

SELECT COUNT(commission_pct)
FROM employees;

SELECT commission_pct
FROM employees
WHERE commission_pct IS NOT NULL;

#③ 公式：AVG = SUM / COUNT

SELECT AVG(salary),SUM(salary)/COUNT(salary),
AVG(commission_pct),SUM(commission_pct)/COUNT(commission_pct),
SUM(commission_pct) / 107
FROM employees;


#需求：查询公司中平均奖金率
#错误的！
SELECT AVG(commission_pct)
FROM employees; 

#正确的：
SELECT SUM(commission_pct) / COUNT(IFNULL(commission_pct,0)),
AVG(IFNULL(commission_pct,0))
FROM employees;

# 如何需要统计表中的记录数，使用COUNT(*)、COUNT(1)、COUNT(具体字段) 哪个效率更高呢？
# 如果使用的是MyISAM 存储引擎，则三者效率相同，都是O(1)
# 如果使用的是InnoDB 存储引擎，则三者效率：COUNT(*) = COUNT(1)> COUNT(字段)


#其他：方差、标准差、中位数
```

  问题：用count(*)，count(1)，count(列名)谁好呢?     其实，对于MyISAM引擎的表是没有区别的。这种引擎内部有一计数器在维护着行数。

    Innodb引擎的表用count(*),count(1)直接读行数，复杂度是O(n)，因为innodb真的要去数一遍。但好于具体的count(列名)。

  问题：能不能使用count(列名)替换count(*)?     不要使用 count(列名)来替代 count( *) ， count(* ) 是 SQL92 定义的标准统计行数的语法，跟数据库无关，跟 NULL 和非 NULL 无关。

  说明：count(*)会统计值为 NULL 的行，而 count(列名)不会统计此列为 NULL 值的行。

## 2、GROUP BY WITH ROLLUP

  可以使用GROUP BY子句将表中的数据分成若干组

```java
SELECT column, group_function(column)
FROM table
[WHERE condition]
[GROUP BY group_by_expression]
[ORDER BY column];
```

  明确：WHERE一定放在FROM后面

  SELECT中出现的非组函数的字段必须声明在GROUP BY 中。

  GROUP BY 声明在FROM后面、WHERE后面，ORDER BY 前面、LIMIT前面   即FROM、WHERE、GROUP BY、 ORDER BY、LIMIT

```java
#需求：查询各个部门的平均工资，总工资
SELECT department_id,AVG(salary),SUM(salary)
FROM employees
GROUP BY department_id;
```

  包含在 GROUP BY 子句中的列不必包含在SELECT 列表中

  使用多个列分组

```java
#需求：查询各个department_id,job_id的平均工资
#方式1：
SELECT department_id,job_id,AVG(salary)
FROM employees
GROUP BY department_id,job_id;

#方式2：
SELECT job_id,department_id,AVG(salary)
FROM employees
GROUP BY job_id,department_id;

#错误的！
SELECT department_id,job_id,AVG(salary)
FROM employees
GROUP BY department_id;


#结论1：SELECT中出现的非组函数的字段必须声明在GROUP BY 中。
#      反之，GROUP BY中声明的字段可以不出现在SELECT中。

#结论2：GROUP BY 声明在FROM后面、WHERE后面，ORDER BY 前面、LIMIT前面

#结论3：MySQL中GROUP BY中使用WITH ROLLUP
```

  使用 WITH ROLLUP 关键字之后，在所有查询出的分组记录之后增加一条记录，该记录计算查询出的所有记录的总和，即统计记录数量。

```java
SELECT department_id,AVG(salary)
FROM employees
GROUP BY department_id WITH ROLLUP;

#需求：查询各个部门的平均工资，按照平均工资升序排列
SELECT department_id,AVG(salary) avg_sal
FROM employees
GROUP BY department_id
ORDER BY avg_sal ASC;

#说明：当使用ROLLUP时，不能同时使用ORDER BY子句进行结果排序，即ROLLUP和ORDER BY是互相排斥的。
#错误的：
SELECT department_id,AVG(salary) avg_sal
FROM employees
GROUP BY department_id WITH ROLLUP
ORDER BY avg_sal ASC;
```

  当使用ROLLUP时，不能同时使用ORDER BY子句进行结果排序，即ROLLUP和ORDER BY是互相排斥的。

## 3、HAVING

  基本使用     过滤分组：HAVING子句（使用条件）     行已经被分组；

    使用了聚合函数；

    满足HAVING 子句中条件的分组将被显示；

    HAVING 不能单独使用，必须要跟 GROUP BY 一起使用。

    非法使用聚合函数：不能在 WHERE 子句中使用聚合函数。如下：

```java
#练习：查询各个部门中最高工资比10000高的部门信息
#错误的写法：
SELECT department_id,MAX(salary)
FROM employees
WHERE MAX(salary) > 10000
GROUP BY department_id; 

#要求1：如果过滤条件中使用了聚合函数，则必须使用HAVING来替换WHERE。否则，报错。
#要求2：HAVING 必须声明在 GROUP BY 的后面。
#要求3：开发中，我们使用HAVING的前提是SQL中使用了GROUP BY。

#正确的写法：
SELECT department_id,MAX(salary)
FROM employees
GROUP BY department_id
HAVING MAX(salary) > 10000;
```

  WHERE和HAVING的对比   区别1：WHERE 可以直接使用表中的字段作为筛选条件，但不能使用分组中的计算函数作为筛选条件；HAVING 必须要与 GROUP BY 配合使用，可以把分组计算的函数和分组字段作为筛选条件。

  这决定了，在需要对数据进行分组统计的时候，HAVING 可以完成 WHERE 不能完成的任务。这是因为，在查询语法结构中，WHERE 在 GROUP BY 之前，所以无法对分组结果进行筛选。HAVING 在 GROUP BY 之后，可以使用分组字段和分组中的计算函数，对分组的结果集进行筛选，这个功能是 WHERE 无法完成的。另外，WHERE排除的记录不再包括在分组中。

  区别2：如果需要通过连接从关联表中获取需要的数据，WHERE 是先筛选后连接，而 HAVING 是先连接后筛选。

   这一点，就决定了在关联查询中，WHERE 比 HAVING 更高效。因为 WHERE 可以先筛选，用一个筛选后的较小数据集和关联表进行连接，这样占用的资源比较少，执行效率也比较高。HAVING 则需要先把结果集准备好，也就是用未被筛选的数据集进行关联，然后对这个大的数据集进行筛选，这样占用的资源就比较多，执行效率也较低。


  小结如下： ![img](https://img-blog.csdnimg.cn/b316904f5b7a4fbf983a4debe53a32d9.png#pic_center)

## 4、SELECT语句的执行顺序

  查询的结构

```java
#方式1：
SELECT ...,....,...
FROM ...,...,....
WHERE 多表的连接条件
AND 不包含组函数的过滤条件
GROUP BY ...,...
HAVING 包含组函数的过滤条件
ORDER BY ... ASC/DESC
LIMIT ...,...
#方式2：
SELECT ...,....,...
FROM ... JOIN ...
ON 多表的连接条件
JOIN ...
ON ...
WHERE 不包含组函数的过滤条件
AND/OR 不包含组函数的过滤条件
GROUP BY ...,...
HAVING 包含组函数的过滤条件
ORDER BY ... ASC/DESC
LIMIT ...,...
#其中：
#（1）from：从哪些表中筛选
#（2）on：关联多表查询时，去除笛卡尔积
#（3）where：从表中筛选的条件
#（4）group by：分组依据
#（5）having：在统计结果中再次筛选
#（6）order by：排序
#（7）limit：分页
```

  你需要记住 SELECT 查询时的两个顺序：   关键字的顺序是不能颠倒的：

```java
SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT...
```

  SELECT 语句的执行顺序（在 MySQL 和 Oracle 中，SELECT 执行顺序基本相同）：

```java
FROM -> WHERE -> GROUP BY -> HAVING -> SELECT 的字段 -> DISTINCT -> ORDER BY -> LIMIT
```

  SQL 的执行原理   SELECT 是先执行 FROM 这一步的。在这个阶段，如果是多张表联查，还会经历下面的几个步骤：

  首先先通过 CROSS JOIN 求笛卡尔积，相当于得到虚拟表 vt（virtual table）1-1；

  通过 ON 进行筛选，在虚拟表 vt1-1 的基础上进行筛选，得到虚拟表 vt1-2；

  添加外部行。如果我们使用的是左连接、右链接或者全连接，就会涉及到外部行，也就是在虚拟表 vt1-2 的基础上增加外部行，得到虚拟表 vt1-3。

  当然如果我们操作的是两张以上的表，还会重复上面的步骤，直到所有表都被处理完为止。这个过程得到是我们的原始数据。

  当我们拿到了查询数据表的原始数据，也就是最终的虚拟表vt1，就可以在此基础上再进行WHERE 阶段。在这个阶段中，会根据vt1表的结果进行筛选过滤，得到虚拟表vt2。

  然后进入第三步和第四步，也就是 GROUP 和 HAVING 阶段。在这个阶段中，实际上是在虚拟表 vt2 的基础上进行分组和分组过滤，得到中间的虚拟表 vt3 和 vt4 。

  当我们完成了条件筛选部分之后，就可以筛选表中提取的字段，也就是进入到 SELECT 和 DISTINCT阶段。

  首先在 SELECT 阶段会提取想要的字段，然后在 DISTINCT 阶段过滤掉重复的行，分别得到中间的虚拟表vt5-1和vt5-2 。

  当我们提取了想要的字段数据之后，就可以按照指定的字段进行排序，也就是ORDER BY 阶段 ，得到虚拟表vt6 。

  最后在 vt6 的基础上，取出指定行的记录，也就是LIMIT阶段 ，得到最终的结果，对应的是虚拟表vt7 。

  当然我们在写 SELECT 语句的时候，不一定存在所有的关键字，相应的阶段就会省略。

  同时因为 SQL 是一门类似英语的结构化查询语言，所以我们在写 SELECT 语句的时候，还要注意相应的关键字顺序，所谓底层运行的原理，就是我们刚才讲到的执行顺序。
