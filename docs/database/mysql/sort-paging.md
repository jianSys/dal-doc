# 排序和分页
## 1、排序：ORDER BY

  排序规则：   使用 ORDER BY 子句排序     ASC（ascend）: 升序     DESC（descend）:降序

  ORDER BY 子句在SELECT语句的结尾。

   单列排序

```java
#3. 强调格式：WHERE 需要声明在FROM后，ORDER BY之前。
#第二步
SELECT employee_id,salary
#第一步
FROM employees
WHERE department_id IN (50,60,70)
#第三步
ORDER BY department_id DESC;
```

  多列排序

```java
#练习：显示员工信息，按照department_id的降序排列，salary的升序排列
SELECT employee_id,salary,department_id
FROM employees
ORDER BY department_id DESC,salary ASC;
```

  可以使用不在SELECT列表中的列排序。

  在对多列进行排序的时候，首先排序的第一列必须有相同的列值，才会对第二列进行排序。如果第一列数据中所有值都是唯一的，将不再对第二列进行排序。

## 2、分页：LIMIT

  实现规则     分页原理：     所谓分页显示，就是将数据库中的结果集，一段一段显示出来需要的条件。

    MySQL中使用 LIMIT 实现分页

    格式：

```java
LIMIT 位置偏移量, 行数
```

    第一个“位置偏移量”参数指示MysQL从哪一行开始显示，是一个可选参数，如果不指定“位置偏移量”，将会从表中的第一条记录开始（第一条记录的位置偏移量是0，第二条记录的位置偏移量是1，以此类推)；第二个参数“行数”指示返回的记录条数。

    MySQL 8.0中可以使用“LIMIT 3 OFFSET 4”，意思是获取从第5条记录开始后面的3条记录，和“LIMIT4,3;”返回的结果相同。

    分页显式公式：（当前页数-1）*每页条数，每页条数

    注意：LIMIT 子句必须放在整个SELECT语句的最后！

    使用 LIMIT 的好处：     约束返回结果的数量可以减少数据表的网络传输量 ，也可以 提升查询效率 。如果我们知道返回结果只有1 条，就可以使用 LIMIT 1 ，告诉 SELECT 语句只需要返回一条记录即可。这样的好处就是 SELECT 不需要扫描完整的表，只需要检索到一条符合条件的记录即可返回。

