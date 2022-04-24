
### 函数

1. CONCAT 用来拼接字符串

   ```sql
   ### 拼接字符串
   select concat('my','sql')
   ### 结果
   mysql
   ```

   

2. LEFT 从左边截取字符

   ```sql
   ### 从左往右开始截取字符串长度为5
   select left('woshinibaba',5)
   ### 结果
   woshi
   ```

   

3. RIGHT 从右边截取字符

   ```sql
   ### 从右往左截取字符串长度为5
   select right('woshinibaba',5)
   ### 结果
   ibaba
   ```

   

4. UPPER 变为大写

   ```sql
   ### 将所有字符串变为大写
   select upper('woshinibaba')
   ### 结果
   WOSHINIBABA
   ```

   

5. LOWER 变为小写

   ```sql
   ### 将字符串变成小写
   select lower('WOSHINIBABA')
   ### 结果
   woshinibaba
   ```

   

6. SUBSTRING 截取字符串

   ```sql
   ### 截取字符串
   select substring('woshinibaba',5)
   ### 结果
   nibaba
   ```

   

   

