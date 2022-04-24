###  语句

1. if语句

    ```
    if(expr1,expr2,expr3)
    ```

    - 上述语法中expr1代表运算表达式,expr2和expr3是符合expr1的结果

    - expr1的运算结果为真时,则返回结果为expr2   

    - expr1的运算结果为假时,则返回结果为expr3

    示例:

    ```sql
    ## 计算每个雇员的奖金。如果一个雇员的id是奇数并且他的名字不是以'M'开头，那么他的奖金是他工资的100%，否则奖金为0。
    select employee_id,if(employee_id %2=1 and name not like 'M%',salary,0) from Employees;
    ```

2. if null 表达式

    ```
    if null(expr1,expr2)
    ```

    - expr1不为null的情况下都返回expr1,反之都是返回expr2

    示例

    ```sql
    ## expr1为null返回00
    select if null(null,"00");
    ->00;
    ```

3. case ... when ... then ... eles ... end

    ```
    case 表达式
   	    when 值1 then 结果1
   	    when 值2 then 结果2
   	    else 结果3
    ```

    - case when 类似于if...else...语句

     示例

     ```sql
     ## 更新学生表中的数据,根据成绩判断
        update students CASE WHEN SCORE = 'A' THEN '优'
              WHEN SCORE = 'B' THEN '良'
              WHEN SCORE = 'C' THEN '中' 
              ELSE '不及格' 
         END
     ```
4. union all 
    ```
    SELECT column_name(s) FROM table1
    UNION ALL
    SELECT column_name(s) FROM table2;
    ```
    - 这个指令的目的也是要将两个 SQL 语句的结果合并在一起。 
    - UNION ALL 会将每一笔符合条件的资料都列出来，无论资料值有无重复。
    - UNION 操作符选取不同的值,只展示不同的
    
    示例
    
    table1:

        |   employee_id   |    name      |
        |  -------------- | ------------ |
        |   2             |   Crew       |
        |   4             |   Haven      |
        |   5             |   Kristian   |
    table2:

        +-------------+--------+
        | employee_id | salary |
        +-------------+--------+
        | 5           | 76071  |
        | 1           | 22517  |
        | 4           | 63539  |
        +-------------+--------+
    ```
    ### 表达式
    SELECT employee_id FROM table1 UNION ALL SELECT employee_id FROM table2;
    ### 结果
        +-------------+
        | employee_id |
        +-------------+
        | 5           |
        | 5           |
        | 2           |
        | 1           |
        | 4           |
        | 4           |
        +-------------+
    ```
