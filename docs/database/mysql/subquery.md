# 子查询
子查询指一个查询语句嵌套在另一个查询语句内部的查询，这个特性从MySQL 4.1开始引入。

  SQL 中子查询的使用大大增强了 SELECT 查询的能力，因为很多时候查询需要从结果集中获取数据，或者需要从同一个表中先计算得出一个数据结果，然后与这个数据结果（可能是某个标量，也可能是某个集合）进行比较。

  子查询的基本使用   子查询的基本语法结构：     子查询（内查询）在主查询之前一次执行完成。

    子查询的结果被主查询（外查询）使用 。

  注意事项：     子查询要包含在括号内；

    将子查询放在比较条件的右侧；

    单行操作符对应单行子查询，多行操作符对应多行子查询。

```java
SELECT last_name,salary
from employees
WHERE salary > (
				SELECT salary
				FROM employees
				WHERE last_name = 'Abel'
				);
```

  子查询的分类   按内查询的结果返回一条还是多条记录，将子查询分为单行子查询、 多行子查询 。   我们按内查询是否被执行多次，将子查询划分为相关(或关联)子查询和 不相关(或非关联)子查询。

  子查询从数据表中查询了数据结果，如果这个数据结果只执行一次，然后这个数据结果作为主查询的条件进行执行，那么这样的子查询叫做不相关子查询。

  同样，如果子查询需要执行多次，即采用循环的方式，先从外部查询开始，每次都传入子查询进行查询，然后再将结果反馈给外部，这种嵌套的执行方式就称为相关子查询。

## 1、单行子查询、多行子查询


  单行子查询   单行比较操作符 ![img](https://img-blog.csdnimg.cn/9448ebbcea564aad8ecc89d0cceab7e4.png#pic_center)

```java
#4. 单行子查询
#4.1 单行操作符： =  !=  >   >=  <  <= 

#题目：查询与141号员工的manager_id和department_id相同的其他员工
#的employee_id，manager_id，department_id。
#方式1：
SELECT employee_id,manager_id,department_id
FROM employees
WHERE manager_id = (
					SELECT manager_id
					FROM employees
					WHERE employee_id = 141
					)
AND department_id = (
					SELECT department_id
					FROM employees
					WHERE employee_id = 141
					)
AND employee_id <> 141;

#方式2：了解（成对查询）
SELECT employee_id,manager_id,department_id
FROM employees
WHERE (manager_id,department_id) = (
				    SELECT manager_id,department_id
			      	FROM employees
				    WHERE employee_id = 141
				   )
AND employee_id <> 141;

#题目：查询最低工资大于110号部门最低工资的部门id和其最低工资
SELECT	department_id,MIN(salary)
FROM employees
GROUP BY department_id
HAVING MIN(salary) > (
					 SELECT MIN(salary)
					 FROM employees
					 WHERE department_id = 110
					 );
```

  CASE中的子查询

```java
#题目：显式员工的employee_id,last_name和location。
#其中，若员工department_id与location_id为1800的department_id相同，
#则location为’Canada’，其余则为’USA’。

SELECT employee_id,last_name,CASE department_id WHEN (SELECT department_id
                                                      FROM departments
                                                      WHERE location_id = 1800)
                                                      THEN 'Canada'
	                                                  ELSE 'USA' END "location"
FROM employees;
```

  子查询中的空值问题     子查询不返回任何行

```java
#4.2 子查询中的空值问题

SELECT last_name, job_id
FROM   employees
WHERE  job_id =
                (SELECT job_id
                 FROM   employees
                 WHERE  last_name = 'Haas');
```

  非法使用子查询

```java
#4.3 非法使用子查询
#错误：Subquery returns more than 1 row
SELECT employee_id, last_name
FROM   employees
WHERE  salary =
                (SELECT   MIN(salary)
                 FROM     employees
                 GROUP BY department_id);
```

  多行子查询   也称为集合比较子查询；

  内查询返回多行；

  使用多行比较操作符。


  多行比较操作符 ![img](https://img-blog.csdnimg.cn/16e49cb44a454d6194a2398bf4f472b4.png#pic_center)

```java
# IN:
SELECT employee_id, last_name
FROM   employees
WHERE  salary IN
                (SELECT   MIN(salary)
                 FROM     employees
                 GROUP BY department_id); 

# ANY / ALL:
#题目：返回其它job_id中比job_id为‘IT_PROG’部门任一工资低的员工的员工号、
#姓名、job_id 以及salary

SELECT employee_id,last_name,job_id,salary
FROM employees
WHERE job_id <> 'IT_PROG' 
AND salary < ANY (
                  SELECT salary
                  FROM employees
                  WHERE job_id = 'IT_PROG' 
                 );


#题目：返回其它job_id中比job_id为‘IT_PROG’部门所有工资低的员工的员工号、
#姓名、job_id 以及salary
SELECT employee_id,last_name,job_id,salary
FROM employees
WHERE job_id <> 'IT_PROG'
AND salary < ALL (
		          SELECT salary
		          FROM employees
		          WHERE job_id = 'IT_PROG'
		          );
		
#题目：查询平均工资最低的部门id
#MySQL中聚合函数是不能嵌套使用的。MIN(AVG(salary))是错误的
#方式1：

SELECT department_id
FROM employees
GROUP BY department_id
HAVING AVG(salary) = (
						SELECT MIN(avg_sal)
						FROM (
								SELECT AVG(salary) avg_sal
								FROM employees
								GROUP BY department_id
							) t_dept_avg_sal
					)

#方式2：
SELECT department_id
FROM employees
GROUP BY department_id
HAVING AVG(salary) <= ALL(	
							SELECT AVG(salary) avg_sal
							FROM employees
							GROUP BY department_id
						)
```

  空值问题

```java
#5.3 空值问题
SELECT last_name
FROM employees
WHERE employee_id NOT IN (
			SELECT manager_id
			FROM employees
			);
```

## 2、相关子查询、不相关子查询

  相关子查询   如果子查询的执行依赖于外部查询，通常情况下都是因为子查询中的表用到了外部的表，并进行了条件关联，因此每执行一次外部查询，子查询都要重新计算一次，这样的子查询就称之为关联子查询。

```java
#结论：在SELECT中，除了GROUP BY 和 LIMIT之外，其他位置都可以声明子查询！
/*
SELECT ....,....,....(存在聚合函数)
FROM ... (LEFT / RIGHT)JOIN ....ON 多表的连接条件 
(LEFT / RIGHT)JOIN ... ON ....
WHERE 不包含聚合函数的过滤条件
GROUP BY ...,....
HAVING 包含聚合函数的过滤条件
ORDER BY ....,...(ASC / DESC )
LIMIT ...,....
*/
```

  相关子查询按照一行接一行的顺序执行，主查询的每一行都执行一次子查询。

  子查询中使用主查询中的列

```java
#题目：查询员工中工资大于本部门平均工资的员工的last_name,salary和其department_id
#方式1：使用相关子查询
SELECT last_name,salary,department_id
FROM employees e1
WHERE salary > (
				SELECT AVG(salary)
				FROM employees e2
				WHERE department_id = e1.department_id
							 );

#方式2：在FROM中声明子查询
SELECT e.last_name,e.salary,e.department_id
FROM employees e,(
				SELECT department_id,AVG(salary) avg_sal
				FROM employees
				GROUP BY department_id) t_dept_avg_sal
WHERE e.department_id = t_dept_avg_sal.department_id
AND e.salary > t_dept_avg_sal.avg_sal
```

  EXISTS 与 NOT EXISTS关键字   关联子查询通常也会和 EXISTS操作符一起来使用，用来检查在子查询中是否存在满足条件的行。

  如果在子查询中不存在满足条件的行：     条件返回 FALSE     继续在子查询中查找

  如果在子查询中存在满足条件的行：     不在子查询中继续查找     条件返回 TRUE

  NOT EXISTS关键字表示如果不存在某种条件，则返回TRUE，否则返回FALSE。

```java
#题目：查询公司管理者的employee_id，last_name，job_id，department_id信息
#方式1：自连接
SELECT DISTINCT mgr.employee_id,mgr.last_name,mgr.job_id,mgr.department_id
FROM employees emp JOIN employees mgr
ON emp.manager_id = mgr.employee_id;

#方式2：子查询

SELECT employee_id,last_name,job_id,department_id
FROM employees
WHERE employee_id IN (
			SELECT DISTINCT manager_id
			FROM employees
			);

#方式3：使用EXISTS
SELECT employee_id,last_name,job_id,department_id
FROM employees e1
WHERE EXISTS (
	       SELECT *
	       FROM employees e2
	       WHERE e1.employee_id = e2.manager_id
	     );
```

  相关更新

```java
UPDATE table1 alias1
SET column = (SELECT expression
			  FROM table2 alias2
			  WHERE alias1.column = alias2.column);
```

  使用相关子查询依据一个表中的数据更新另一个表的数据。

  题目：在employees中增加一个department_name字段，数据为员工对应的部门名称

```java
# 1）
ALTER TABLE employees
ADD(department_name VARCHAR2(14));


# 2）
UPDATE employees e
SET department_name = (SELECT department_name
FROM departments d
WHERE e.department_id = d.department_id);
```

  相关删除

```java
DELETE FROM table1 alias1
WHERE column operator (SELECT expression
FROM table2 alias2
WHERE alias1.column = alias2.column);
```

使用相关子查询依据一个表中的数据删除另一个表的数据。

题目：删除表employees中，其与emp_history表皆有的数据

```java
DELETE FROM employees e
WHERE employee_id in
					(SELECT employee_id
					 FROM emp_history
					 WHERE employee_id = e.employee_id);
```


