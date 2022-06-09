# 运算符
## 1、算术运算符


  算术运算符主要用于数学运算，其可以连接运算符前后的两个数值或表达式，对数值或表达式进行加（+）、减（-）、乘（*）、除（/）和取模（%）运算。 ![img](https://img-blog.csdnimg.cn/d31c5c5a559348d18d005129ad70f724.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQWphdGFyJlByaW5jZXNz,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)   加法与减法运算符

```java
mysql> SELECT 100, 100 + 0, 100 - 0, 100 + 50, 100 + 50 -30, 100 + 35.5, 100 - 35.5
FROM dual;
```

  一个整数类型的值对整数进行加法和减法操作，结果还是一个整数；

  一个整数类型的值对浮点数进行加法和减法操作，结果是一个浮点数；

  加法和减法的优先级相同，进行先加后减操作与进行先减后加操作的结果是一样的；

  在Java中，+的左右两边如果有字符串，那么表示字符串的拼接。但是在MySQL中+只表示数值相加。如果遇到非数值类型，先尝试转成数值，如果转失败，就按0计算。（补充：MySQL中字符串拼接要使用字符串函数CONCAT()实现）

  乘法与除法运算符

```java
SELECT 100, 100 * 1, 100 * 1.0, 100 / 1.0, 100 / 2,
100 + 2 * 5 / 2,100 / 3, 100 DIV 0  # 分母如果为0，则结果为null
FROM DUAL;
```

  一个数乘以整数1和除以整数1后仍得原数；

  一个数乘以浮点数1和除以浮点数1后变成浮点数，数值与原数相等；

  一个数除以整数后，不管是否能除尽，结果都为一个浮点数；

  一个数除以另一个数，除不尽时，结果为一个浮点数，并保留到小数点后4位； 乘法和除法的优先级相同，进行先乘后除操作与先除后乘操作，得出的结果相同。

  在数学运算中，0不能用作除数，在MySQL中，一个数除以0为NULL。

  求模（求余）运算符

```java
#练习：查询员工id为偶数的员工信息
SELECT employee_id,last_name,salary
FROM employees
WHERE employee_id % 2 = 0;
```

## 2、比较运算符

  比较运算符用来对表达式左边的操作数和右边的操作数进行比较，比较的结果为真则返回1，比较的结果为假则返回0，其他情况则返回NULL。


  比较运算符经常被用来作为SELECT查询语句的条件来使用，返回符合条件的结果记录。 ![img](https://img-blog.csdnimg.cn/94a28eb593f24fb6a3e287b49e1d179d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQWphdGFyJlByaW5jZXNz,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)   等号运算符   等号运算符（=）判断等号两边的值、字符串或表达式是否相等，如果相等则返回1，不相等则返回0。

  在使用等号运算符时，遵循如下规则：     如果等号两边的值、字符串或表达式都为字符串，则MySQL会按照字符串进行比较，其比较的是每个字符串中字符的ANSI编码是否相等。

    如果等号两边的值都是整数，则MySQL会按照整数来比较两个值的大小。

    如果等号两边的值一个是整数，另一个是字符串，则MySQL会将字符串转化为数字进行比较。

    如果等号两边的值、字符串或表达式中有一个为NULL，则比较结果为NULL。

  安全等于运算符   安全等于运算符（&lt;=&gt;）与等于运算符(=）的作用是相似的，唯一的区别是&lt;=&gt;可以用来对NULL进行判断。在两个操作数均为NULL时，其返回值为1，而不为NULL；当一个操作数为NULL时，其返回值为0，而不为NULL。

```java
SELECT 1 <=> NULL, NULL <=> NULL
FROM DUAL;
```

  不等于运算符   不等于运算符（&lt;&gt;和!=）用于判断两边的数字、字符串或者表达式的值是否不相等，如果不相等则返回1，相等则返回0。不等于运算符不能判断NULL值。如果两边的值有任意一个为NULL，或两边都为NULL，则结果为NULL。 SQL语句示例如下：

```java
SELECT 1 <> 1, 1 != 2, 'a' != 'b', (3+4) <> (2+6), 'a' != NULL, NULL <> NULL;
```


  此外，还有非符号类型的运算符： ![img](https://img-blog.csdnimg.cn/4f873e5d8f684875ae5227b7c324e882.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQWphdGFyJlByaW5jZXNz,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)   空运算符   空运算符（IS NULL或者ISNULL）判断一个值是否为NULL，如果为NULL则返回1，否则返回0。

  SQL语句示例如下：

```java
SELECT NULL IS NULL, ISNULL(NULL), ISNULL('a'), 1 IS NULL;
```

```java
#查询commission_pct等于NULL。比较如下的四种写法
SELECT employee_id,commission_pct FROM employees WHERE commission_pct IS NULL;
SELECT employee_id,commission_pct FROM employees WHERE commission_pct <=> NULL;
SELECT employee_id,commission_pct FROM employees WHERE ISNULL(commission_pct);
SELECT employee_id,commission_pct FROM employees WHERE commission_pct = NULL;
```

  非空运算符   非空运算符（IS NOT NULL）判断一个值是否不为NULL，如果不为NULL则返回1，否则返回0。

   SQL语句示例如下：

```java
SELECT NULL IS NOT NULL, 'a' IS NOT NULL, 1 IS NOT NULL;
```

   最小值运算符    语法格式为：LEAST(值1，值2，…，值n)。其中，“值n”表示参数列表中有n个值。在有两个或多个参数的情况下，返回最小值。

```java
SELECT LEAST (1,0,2), LEAST('b','a','c'), LEAST(1,NULL,2);
```

   当参数是整数或者浮点数时，LEAST将返回其中最小的值；当参数为字符串时，返回字母表中顺序最靠前的字符；当比较值列表中有NULL时，不能判断大小，返回值为NULL。

   最大值运算符   语法格式为：GREATEST(值1，值2，…，值n)。其中，n表示参数列表中有n个值。当有两个或多个参数时，返回值为最大值。假如任意一个自变量为NULL，则GREATEST()的返回值为NULL。

```java
SELECT GREATEST(1,0,2), GREATEST('b','a','c'), GREATEST(1,NULL,2);
```

  当参数中是整数或者浮点数时，GREATEST将返回其中最大的值；当参数为字符串时，返回字母表中顺序最靠后的字符；当比较值列表中有NULL时，不能判断大小，返回值为NULL。

  ETWEEN AND运算符   BETWEEN运算符使用的格式通常为SELECT xxx FROM TABLE WHERE  C  BETWEEN  A AND  B，此时，当C大于或等于A，并且C小于或等于B时，结果为1，否则结果为0。

```java
SELECT last_name, salary
FROM employees
WHERE salary BETWEEN 2500 AND 3500;
```

  IN运算符   IN运算符用于判断给定的值是否是IN列表中的一个值，如果是则返回1，否则返回0。如果给定的值为NULL，或者IN列表中存在NULL，则结果NULL。

```java
#练习：查询部门为10,20,30部门的员工信息
SELECT last_name,salary,department_id
FROM employees
#WHERE department_id = 10 or department_id = 20 or department_id = 30;
WHERE department_id IN (10,20,30);
```

  NOT IN运算符   符 NOT IN运算符用于判断给定的值是否不是IN列表中的一个值，如果不是IN列表中的一个值，则返回1，否则返回0。

```java
#练习：查询工资不是6000,7000,8000的员工信息
SELECT last_name,salary,department_id
FROM employees
WHERE salary NOT IN (6000,7000,8000);
```

  LIKE运算符   LIKE运算符主要用来匹配字符串，通常用于模糊匹配，如果满足条件则返回1，否则返回0。如果给定的值或者匹配条件为NULL，则返回结果为NULL。

  LIKE运算符通常使用如下通配符：

```java
“%”：匹配0个或多个字符。
“_”：只能匹配一个字符。
```

```java
#练习：查询last_name中包含字符'a'且包含字符'e'的员工信息
SELECT last_name
FROM employees
WHERE last_name LIKE '%a%' AND last_name LIKE '%e%';
```

```java
#练习：查询第3个字符是'a'的员工信息
SELECT employee_id,last_name
FROM employees
WHERE last_name LIKE '__a%';
```

```java
#练习：查询第3个字符是_且第4个字符是'a'的员工信息
#需要使用转义字符: \ 
SELECT employee_id,last_name
FROM employees
WHERE last_name LIKE '__\_a%';
```

  ESCAPE   回避特殊符号的：使用转义符。例如：将[%]转为[%]、[]转为[]，然后再加上[ESCAPE‘$’]即可。

  如果使用\表示转义，要省略ESCAPE。如果不是\，则要加上ESCAPE。

```java
#ESCAPE '$'：表示以&为转义字符;
SELECT last_name
FROM employees
WHERE last_name LIKE '__$_a%' ESCAPE '$';
```

  REGEXP运算符   REGEXP运算符用来匹配字符串，语法格式为： expr REGEXP 匹配条件 。如果expr满足匹配条件，返回1；如果不满足，则返回0。若expr或匹配条件任意一个为NULL，则结果为NULL。

  REGEXP运算符在进行匹配时，常用的有下面几种通配符:

```java
（1）‘^’匹配以该字符后面的字符开头的字符串。(^s)
（2）‘$’匹配以该字符前面的字符结尾的字符串。(t$)
（3）‘.’匹配任何一个单字符。 ('atguigu' REGEXP 'gu.gu':前后都有gu，中间随便一个字母)
（4）“[...]”匹配在方括号内的任何字符。例如，“[abc]”匹配“a”或“b”或“c”。为了命名字符的范围，使用一个‘-’。“[a-z]”匹配任何字母，而“[0-9]”匹配任何数字。('[ab]':里面包含a或者b就行)
（5）‘*’匹配零个或多个在它前面的字符。例如，“x*”匹配任何数量的‘x’字符，“[0-9]*”匹配任何数量的数字，而“*”匹配任何数量的任何字符。
```

## 3、逻辑运算符

  逻辑运算符主要用来判断表达式的真假，在MySQL中，逻辑运算符的返回结果为1、0或者NULL。


  MySQL中支持4种逻辑运算符如下： ![img](https://img-blog.csdnimg.cn/380c5feaef064893b22604021c3ca2cc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQWphdGFyJlByaW5jZXNz,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)   逻辑非运算符   逻辑非（NOT或!）运算符表示当给定的值为0时返回1；当给定的值为非0值时返回0；当给定的值为NULL时，返回NULL。

```java
# not 
SELECT last_name,salary,department_id
FROM employees
#WHERE salary not between 6000 and 8000;
#WHERE commission_pct is not null;
WHERE NOT commission_pct <=> NULL;
```

  逻辑与运算符   逻辑与（AND或&amp;&amp;）运算符是当给定的所有值均为非0值，并且都不为NULL时，返回1；当给定的一个值或者多个值为0时则返回0；否则返回NULL。

```java
SELECT last_name,salary,department_id
FROM employees
WHERE department_id = 50 AND salary > 6000;
```

  逻辑或运算符   逻辑或（OR或||）运算符是当给定的值都不为NULL，并且任何一个值为非0值时，则返回1，否则返回0；当一个值为NULL，并且另一个值为非0值时，返回1，否则返回NULL；当两个值都为NULL时，返回NULL。

```java
SELECT last_name,salary,department_id
FROM employees
WHERE department_id = 10 OR department_id = 20;
```

  OR可以和AND一起使用，但是在使用时要注意两者的优先级，由于AND的优先级高于OR，因此先对AND两边的操作数进行操作，再与OR中的操作数结合。

  逻辑异或运算符   逻辑异或（XOR）运算符是当给定的值中任意一个值为NULL时，则返回NULL；如果两个非NULL的值都是0或者都不等于0时，则返回0；如果一个值为0，另一个值不为0时，则返回1。

```java
# XOR : 追求的"异"
#要么满足department_id = 50并且不满足salary > 6000，
#要么不满足department_id = 50并且满足salary > 6000，
SELECT last_name,salary,department_id
FROM employees
WHERE department_id = 50 XOR salary > 6000;
```

## 4、位运算符

  位运算符是在二进制数上进行计算的运算符。位运算符会先将操作数变成二进制数，然后进行位运算，最后将计算结果从二进制变回十进制数。


  MySQL支持的位运算符如下： ![img](https://img-blog.csdnimg.cn/67c1bf0288bc4c1b8cb8da138440f948.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQWphdGFyJlByaW5jZXNz,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)   按位与运算符 (同1为1)   按位与（&amp;）运算符将给定值对应的二进制数逐位进行逻辑与运算。当给定值对应的二进制位的数值都为1时，则该位返回1，否则返回0。

  按位或运算符 (有1为1)   按位或（|）运算符将给定的值对应的二进制数逐位进行逻辑或运算。当给定值对应的二进制位的数值有一个或两个为1时，则该位返回1，否则返回0。

  按位异或运算符 (不同为1)   按位异或（^）运算符将给定的值对应的二进制数逐位进行逻辑异或运算。当给定值对应的二进制位的数值不同时，则该位返回1，否则返回0。

  按位取反运算符    按位取反（~）运算符将给定的值的二进制数逐位进行取反操作，即将1变为0，将0变为1。

  按位右移运算符    按位右移（&gt;&gt;）运算符将给定的值的二进制数的所有位右移指定的位数。右移指定的位数后，右边低位的数值被移出并丢弃，左边高位空出的位置用0补齐。

  按位左移运算符    按位左移（&lt;&lt;）运算符将给定的值的二进制数的所有位左移指定的位数。左移指定的位数后，左边高位的数值被移出并丢弃，右边低位空出的位置用0补齐。

## 5、运算符的优先级


![img](https://img-blog.csdnimg.cn/d2f3f8d481fd49c5aed665dd84b1dab6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQWphdGFyJlByaW5jZXNz,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)   数字编号越大，优先级越高，优先级高的运算符先进行计算。可以看到，赋值运算符的优先级最低，使用“()”括起来的表达式的优先级最高。