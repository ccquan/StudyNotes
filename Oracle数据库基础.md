# Oracle基础

## 下载地址

https://www.oracle.com/database/technologies/oracle-database-software-downloads.html



## 安装

Oracle10g版安装

1. 安装服务端，地址：链接: https://pan.baidu.com/s/1hYLFgnJfYRdaFrHGmUZJ-g 提取码: nuju
2. 下载后解压，兼容默认打开setup.exe
3. 口令管理，把scott锁定的钩取消并设定口令
4. 安装客户端，地址：链接: https://pan.baidu.com/s/1slU2jStIUvp8D0xc7QC6cQ 提取码: uxv5
5. 本地net服务，服务名orcl，主机名填ip地址

docker安装，方便快捷

https://blog.csdn.net/m18330808841/article/details/103648277

版本：11.2.0.2.0



## 查看Oracle信息

### sqlplus连接数据库

1. docker 命令行进入数据库
2. 切换到操作Oracle数据库  `su - oracle ` 
3. 切换到sqlplus操作 `sqlplus /nolog `
4. 输入数据库的用户名和密码  `conn personal/personal `
5. 会提示Connected.(连接成功)，显示 SQL> ： 就可以执行sql语句了

### 查看SID

1. 连接数据库 `sqlplus / as sysdba ` or navicat工具
2. sql语句查询版本 `select value from v$parameter where name='instance_name';`

### 查看服务号

```sql
select value from v$parameter where name='service_names';
```

### 查看版本

```sql
select * from v$version;
```



## 表空间操作

### 创建表空间

```sql
create tablespace itcast
datafile 'itcast.dbf'
size 5m
autoextend on
next 5m;
```

itcast为空间名

datafile：表空间对应的数据文件

size：表空间大小

autoextend：on为开启自动增长，表空间不够时自动增长

next：指定自动增长的大小

! 用户登录数据库后看不到表空间，会在用户下创建一个跟用户名一样的模式(数据库)，创建表就在那里创建



### 删除表空间

```sql
drop tablespace itcast;
```



## 用户操作

### 创建用户

```sql
create user chen(用户名)
identified by chen888(密码)
default tablespace itcast;
```

itcast：默认分配的表空间，意思是这个用户只能使用这个表空间



### 用户授权

创建用户分配表空间后还不能使用，因为没有权限

Oracle常用角色(权限组)

- connect  连接角色，基本角色
- resource  开发者角色
- dba  超级管理员角色

```sql
grant dba to chen;
-- 授予 chen 用户 dba 权限
```



### 解锁用户

```sql
alter user acott(用户名) account unlock;
```



### 修改密码

```sql
alter user scott identified by 123456;
```





## 数据类型

| 数据类   | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| varchar  | 不常用，字符串                                               |
| varchar2 | 可变字符串，varchar(n)可以指定初始化字符长度                 |
| number   | 数值型 <br> number(n) 表示长度为n <br> number(m, n) 表示小数，总长度m小数点n |
| data     | 日期型                                                       |
| clob     | 大对象，表示大文本数据类型，可存4g                           |
| blob     | 大对象，表示二进制数据，可存4g                               |



## 表操作

### 创建表

- 例：创建一个 person 表，pid字段为数值型，pname为字符型

```sql
create table person(
    pid number(20),
    pname varchar2(10)
);
```



### 删除表

- 普通删除

```sql
drop table pserson;
```



### 查看表

- 查看当前用户的表

```sql
SELECT * FROM user_tables; 
```

- 查看所有用户的表

```sql
SELECT * FROM all_tab_comments;
```



### 修改表结构

- 例：新增 gender 性别字段，字段类型是数值型

```sql
alter table person add (gender number(1));
```

- 例：修改字段类型为不可变字符型

```sql
alter table person modify gender char(1);
```

- 例：修改字段名称，将 gender 修改为 sex

```sql
alter table person rename column gender to sex;
```

- 例：删除字段

```sql
alter table person drop column sex;
```



### 插入数据

这里跟MySQL不一样，要记得手动提交事务

**如果是navicat是自动提交的**

```sql
insert into person values(1, 'Tom');
commit;
```



### 修改数据

```sql
update person set pname = 'Tim' where pname = 'Tom';
```



### 删除数据

```sql
delete from person[ where pid = 1];
```

- 先删除表，然后再创建表，效果跟删除全部数据一样，但跳过索引

```sql
truncate table person;
```



### 序列

默认从1开始，自增长

1. 创建序列

```sql
create sequence s_person;
```

2. 使用序列

```sql
insert into person(pid, pname) values(s_person.nextval, 'July');
```



## 查询

### 单行函数(字符函数)

- upper() 将小写转大写
- lower() 将大写转小写
- round(26.56, 1)  四舍五入，点号后面表示小数点保留小数

```sql
select round(26.56, 1) from dual;
```

- trunc(26.56, 1)  直接截取到点号后面的保留小数

- mod(10, 3) 取模
- sysdate  当前时间函数

```sql
select sysdate from dual;
```

- 例：获取当前时间年份

```sql
select to_char(sysdate, 'yyyy') from dual;
```



### 多行函数(聚合函数)

- count(1)  行数
- sum  总数
- ......

- 例：查询职业为 程序员  的人数

```sql
SELECT count( 1 )  FROM "emp"  WHERE "job" = '程序员';
```

- 例：查询全部职员总工资

```sql
SELECT sum("sal") 总工资 from "emp";
```



### 分页

rownum：行号，`select`操作时的行号，默认从1开始，所以 `where` 时要注意

先 在子查询里排序 然后外面在嵌套一层 `where rownum`

- 例：查询工资最低的人

```sql
SELECT ROWNUM 外面的, t.*
FROM
	( SELECT ROWNUM 里面的, e.* FROM "emp" e ORDER BY e."sal" ) t where ROWNUM < 2;
-- 1 < 2 √
-- 2 < 2 × 所以显示一行，就是工资最低的人了
```

- 例：查询工资最低的前5个人

```sql
SELECT ROWNUM 外面的, t.*
FROM
	( SELECT ROWNUM 里面的, e.* FROM "emp" e ORDER BY e."sal" ) t where ROWNUM < 6;
```

- 例：查询工资最低的第6个人到第10个人

```sql
SELECT
	* 
FROM
	( SELECT ROWNUM rn, t.* FROM ( SELECT * FROM "emp" ORDER BY "sal" ) t WHERE ROWNUM < 11 ) 
WHERE
	rn > 5;
```

- 例：查询第6个人到第10个人，不排序

```sql
SELECT
	* 
FROM
	( SELECT ROWNUM rn, e.* FROM "emp" e ) 
WHERE
	rn > 5 AND rn < 11;
```



## 视图

跟MySQL差不多

### 创建视图

```sql
create view 视图名 as 查询语句;
```

- 例：创建只读视图

```sql
create view v_emp as select
  ename, job
from emp
with read only;
```



### 查询视图

```sql
select * from 视图名;
```



### 通过视图修改数据

```sql
update 视图名 set 字段=值[ where id = 1];
```



## 索引

### 创建索引

- 创建一个ename姓名单列(单字段)索引

```sql
create index inx_ename on emp(ename);
```

- 创建一个复合索引

```sql
create index ind_ename_and_job on emp(ename, job);
```



## SQL编程

### 定义与打印

declare 定义遍历

```sql
declare
  i number(2) := 10;
  s varchar(2) := 'CN';
  ena "emp"."ename"%type;
  emprow "emp"%rowtype;
```

:= 表示赋值

emp.ename%type 表示定义一个跟emp表ename字段相同类型的变量

emp%rowtype  表示 记录一行 变量

```sql
begin
  dbms_output.put_line(i);
  dbms_output.put_line(s);
  select "ename" into ena from "emp" where "id" = 1;
	DBMS_OUTPUT.PUT_LINE(ena);
  select * into emprow from "emp" where "id" = 1;
end;
```

赋值也可以用 into

select * into emprow：表示将一整行查询到的记录赋值给 emprow



### 多分枝判断

```sql
select e.name,
  case e.name
    when 'Tom' then '汤姆'
    when 'Tim' then '提姆'
    else '佚名'
  end
from emp e;
```



### if 判断

```sql
if then  // code
elsif then // code
else // code
end if;
```

- 例子判断年龄

```sql
declare
  i number(3) := 36;
begin
  if i < 18 then
		dbms_output.put_line('未成年');
  elsif i < 40 then
    DBMS_OUTPUT.PUT_LINE('中年人');
  else
    DBMS_OUTPUT.PUT_LINE('老年人');
  end if;
end;

```



### loop 循环

- 例：循环1-10

```sql
-- 第一种循环
-- declare
--   i number(2) := 1;
-- begin
--   while i < 11 loop
-- 	  dbms_output.put_line(i);
-- 		i := i + 1;
-- 	 end loop;
--  end;
 
--  第二种循环，常用
declare
  i number(2) := 1;
begin
  loop
	  exit when i > 10;
		dbms_output.put_line(i);
		i := i + 1;
	end loop;
end;
 
--  // 第三种循环
 declare
 begin
   for i in 1..10 loop
	   dbms_output.put_line(i);
	 end loop;
 end;
```



### 游标

可以存放多个对象，多行记录。

- 输出emp表中所有员工的姓名

```sql
declare
  cursor cl is select * from emp;
  emprow emp%rowtype;
begin
  open c1;
    loop
      fetch c1 into emprow;
      exit when c1%notfound;
      dbms_output.put_line(emprow.ename);
    end loop;
  close c1;
end;
```



### 触发条件

- 触发单列ename索引

```sql
select * from emp where ename = 'scott';
```

- 触发复合ename、job索引

```sql
select * from emp where ename = 'scott' and job = 'xxx';
```

- 不触发索引，因为or

```sql
select * from emp where ename = 'scott' or job = 'xxx'; 
```



## 存储过程

```sql
create [or replace] procedure 过程名[(参数名 in/out 数据类型)] as/is
begin
  -- code
end;
```

- 例：给指定员工涨100工资

```sql
create or replace procedure p1(eno in "emp"."id"%type) is
begin
  update "emp" set "sal" = "sal" + 100 where "id" = eno;
end;

-- 调用存储过程
declare
-- 如果不定义变量可以不写 declare
begin
  p1(8);
end;
```

- 例：传入员工编号查询年薪

```sql
create or replace procedure p_yearsal(eno in "emp"."id"%type, yearsal out number) is
begin
  select "sal"*12 into yearsal from "emp" where "id" = 1;
end;

-- 调用存储过程
declare
  s number(10);
begin
  p_yearsal(1, s);
	dbms_output.put_line(s);
end;
```



### 存储函数

```sql
create or replace function 函数名(Name in type[, Name2 in type]) return 数据类型 is
  结果变量 数据类型;
begin
  -- code
  return 结果变量;
end;
```

调用

```sql
-- 如果有返回值要定义
declare
  s number(10);
begin
  s := 函数名(参数);
  dbms_output.put_line(s);
end;
```

- 例：传入员工编号查询年薪

```sql
create or replace function f_yearsal(eno in "emp"."id"%type) return number is
  s NUMBER(10);
begin
  select "sal"*12 into s from "emp" where "id" = eno;
  return s;
end;

-- 构造函数需要接受返回值
declare
  s number(10);
begin
  s := f_yearsal(1);
  dbms_output.put_line(s);
end;
```



### 两者的区别

1. 存储函数有返回值，存储过程没返回值

2. 利用存储函数有返回值这一特性，可以做字段如

   ```sql
   select e.name, 自定义函数(e.id) from emp e;
   ```



## 触发器

语法：

```sql
create [ or replace] trigger 触发器名
before/after
insert/delete/update
on 表名
declare
begin
  -- code
end;
```

- 例：插入一条记录，输出一个新员工入职

```sql
create or replace trigger t1 after insert on person
declare
begin
  dbms_output.put_line('一个新员工入职');
end;
-- 测试数据
insert into PERSON VALUES(4, 'TTT');
```

:old  未修改时的表

:new  修改后的表

- 例：不能降低工资，否则抛出异常

```sql
create or replace trigger tt2 before update on "emp" for each row
begin
  if :old."sal">:new."sal" then
	  raise_application_error(-20001, '工资不能降低');
	end if;
end;
```


