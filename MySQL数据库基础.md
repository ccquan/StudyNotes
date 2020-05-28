# MySQL

### 数据库概述

#### DDL

> 数据库定义语言，Data definition language
>
> 定义结构

- 创建数据库 create database
- 创建表格 crate table
- 修改表格 alter table
- 删除表格 drop table
- 创建视图 crate view
- 修改视图 alter view
- 删除视图 drop view
- 删除表数据 truncate table



#### DML

> 数据操纵语言，Data Manipulation Language
>
> 对数据操作

- 插入操作
- 删除操作
- 修改操作
- 排序操作
- 检索操作



#### DCL

> 数据库控制语言，Data Control Language
>
> 控制用户权限

- Grant
- Revoke



### 数据库操作

#### 查看数据库

- 查看当前的所以的数据库

    ```mysql
    show databases;
    ```

- 查看数据库创建时的属性

  ```mysql
  show create 数据库名;
  ```



#### 创建数据库

```mysql
create database[if not exists ]mytest[character set utf8mb4];
```



#### 删除数据库

```mysql
drop database mytest;
```



#### 修改数据库属性

```mysql
alter database mytest character set gdk;
```



### 表操作

#### 查看表

- 查看表的结构

    ```mysql
    desc 表名;
    show columns from 表名;
    ```



#### 创建表

```mysql
CREATE TABLE table_name (列名 数据类型);
```

- 实列1：创建tb_student表，里面包含id，name，sex，age列

```mysql
create table tb_student(id int unsigned, name varchar(20), sex varchar(2), age int unsigned[COMMENT  '年龄']);
```

- 创建一个无符号的类型

```mysql
create table aa(f1 tinyint, f2 int unsigned);
```

- 复制表

```mysql
create table newTable like oldTable;
```



#### 修改表属性

- 修改列名类型：将name列段修改成varchar类型

```mysql
alter table tb_student modify name varchar(15);
```


- 修改表名：将tb_grade表修改成tb_mark

```mysql
alter table tb_grade rename to tb_mark;
```



#### 插入数据

- values

```mysql
insert into tb_student(id, name, sex, age) values(1920501, '小明', '男', 18);
```

- set

```mysql
insert into tb_student set sno=1920501, sname='小明', ssex=default,sage=18;
```

- 多条数据

```mysql
insert into aa values(11,'monica'),(12,'ross');
```

- 插入查询到的语句

```mysql
insert into newTable select * from oldTable;
```

- 如果有重复的主键就忽略 ignore

```mysql
INSERT ignore INTO `ani_bangumi` VALUES (20210002, '工作细胞 第二季', '《工作细胞》', '', '');
```



#### 删除数据

##### 删除全部

```mysql
truncate table 表名;
```

> TRUNCATE TABLE 在功能上与不带 WHERE 子句的 DELETE 语句相同：二者均删除表中的全部行。但 TRUNCATE TABLE 比 DELETE 速度快，且使用的系统和事务日志资源少。
> 
>delete * from 是一条一条数据删除，在事务日志中要记录每道一条记录的删除



##### 删除指定

```mysql
delete from tb_studnet[where name='小明'];
```



#### 更新数据

```mysql
update tb_studnet set name='小红',age=19 where id=1920501;
```

- 修改多个表    修改 t1 表id是1001的 f1 为 aa 表的 f1

```mysql
update t1,aa set t1.f1=aa.f1 where id=1001;
```



#### 查询数据

```mysql
select * from tb_student[where id<1920601];
```



### 用户管理

#### 查看所有用户

```mysql
SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;
```



#### 创建用户

```mysql
create user 'CJQ'@'localhost' identified by 'toor';
```



#### 删除用户

```mysql
drop user 'CJQ'@'localhost';
```



#### 修改用户

- 修改用户名称

  ```mysql
  rename user 'CJQ'@'localhost' to 'CJQ1'@'localhost';
  ```

- 修改用户密码

  ```mysql
  set password for root@localhost = password('root');
  ```



#### 授权

```sql
show grants for root@localhost;  # 查看权限
# 给予权限
grant select, insert on tb_student to 'test1'@'localhost';
# 收回权限
revoke insert on tb_student from 'test1'@'localhost';
```

权限列表：

- all privileges：所有权限。
- select：读取权限。
- delete：删除权限。
- update：更新权限。
- create：创建权限。
- drop：删除数据库、数据表权限。

授权内容：

- dbName.*;               授予dbName数据库所有表的权限

- dbName.dbTable;   授予数据库dbName中dbTable表的权限。



### 数值类型

- 整型

  TINY INT, SMALL INT, MEDIUM INT, INT, BIG INT

- 浮点型

  FLOAT, DOUBLE

- 字符串型

  CHAR:固定长度字符串

  VARCHAR:可变长度字符串

  BINARY:无字符集的字符串

  VARBINARY:同上，可变

  BLOB/TEXT:已对象类型保存，足够大的数据

  ENUM:枚举

  SET:集合

- 日期与时间型

  DAY

  DAY_HOUR： 日期:小时

  DAY_MINUTE：日期:小时:分钟

  DAY_SECOND：日期:小时:分钟:秒

  HOUR：小时

  HOUR_MINUTE：小时:分钟

  HOUR_SECOND：小时:分钟:秒



### 常用约束

| 名称                       | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| PRIMARY KEY  (/ˈpraɪmeri/) | 主键（唯一不可空），一个表只能有一个                         |
| AUTO_INCREMENT             | 自增长                                                       |
| FOREIGN KEY  (/ˈfɔːrən/)   | 外键 FOREIGN KEY(这个表的外键列) REFERENCES 另一个表(列一个表的列) |
| NOT NULL                   | 非空                                                         |
| DEFAULT '男'               | 默认值                                                       |
| UNIQUE                     | 唯一但可空，一个表可以用多个                                 |
| COMMENT                    | 备注                                                         |

#### 修改约束

```mysql
alter table 表名 add CONSTRAINT 约束(列名);
```

- 修改f2为主键

  ```mysql
  alter table 表名 add constraint primary key(f2);
  ```

  



### 案列

#### 创建dept、emp表

  ```mysql
create table dept(
    deptno char(4) COMMENT '部门编号',
    dname varchar(30) COMMENT '部门名称',
    dmanager varchar(10) COMMENT '部门经理',
    tel varchar(20) COMMENT '电话号码',
    PRIMARY KEY(deptno),
    NOT NULL(dname)
);

create table emp(
    id int COMMENT '员工编号' PRIMARY KEY,
    ename varchar(10) COMMENT '员工姓名' NOT NULL,
    hiredate date COMMENT '入职日期',
    esex char(2) DEFAULT '男' COMMENT '姓名',
    sal int COMMENT '工资',
    job varchar(30) COMMENT '工种' DEFAULT '程序员' NOT NULL,
    deptno char(4) COMMENT '部门编号',
    FOREIGN KEY(deptno) REFERENCES dept(deptno)
);




  ```



### 查询

#### 常规查询

- 列名查询

```sql
select 列段1， 列段2 from 表名;
```

- 别名使用

```sql
select 列段1 as 别名, 列段2 空格 别名 from 表名
```

- 替换显示

  1. 简单函数

  ```mysql
  select sno, ssex,
  case ssex
  when '女' then '女士'
  when '男' then '先生'
  -- when op1 and/or op2 then op3
  else '其他'
  end 别名
  from tb_student;
  ```

  2. 搜索函数

  ```mysql
  select sno, sname, edate,
  case 
  when year(edate) > 2019 and ssex = '男' then '师弟'
  when year(edate) > 2019 and ssex = '女' then '师妹'
  when year(edate) < 2019 and ssex = '男' then '师兄'
  when year(edate) < 2019 and ssex = '女' then '师姐'
  else '同学'
  end 称呼
  from tb_student;
  ```

  



#### 数据源

- 查询多张表

```sql
select * from 表1, 表2;
```

- 子查询数据源

```sql
select * from (select * from 子表1[， 子表2]) as 表;  # 子查询需要指定别名
```

- where子句

```sql
select * from 表 where 列段 运算操作 值
select * from bigdata where id=55;
```



#### 运算符

\> 、< 、 =  、>= 、 <=

between a and b ：a 与 b之间

in (data1, data2) ：在data数据里面

like 'value' ： 模糊匹配

and 、or 、 not

is null 、is not null

- where in

```mysql
-- 查询cno为指定的数据
select * from tb_student where sno in (select sno, cno from tb_mark where cno='指定');
```

- not in

```mysql
select * from tb_student where sno not in (select sno, cno from tb_mark where cno='指定');
```



#### 条件查询

- ALL

  大于全部返回的数据

```mysql
select * from tb_student
where sage > all(
select sage from tb_student
    where classname='19软件4班'
);
```

- ANY  

  大于任意一个返回的数据

```mysql
select * from tb_student
where sage > any(
select sage from tb_student
    where classname='19软件4班'
);
```



#### 联合查询union

- UNION ALL : 保留所有记录
- UNION DESTINCT ： 去除重复记录【默认】

> 结构要一样，UNION 内部的 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每条 SELECT 语句中的列的顺序必须相同。

```mysql
-- 查询性别为女的数据，但联合查询where只会限制最近的select语句，所以用两个where
select * from tb_student
where ssex='女'
union
select * from tb_lxstudent
where ssex='女'
```

- 联合排序

```mysql
(select * from 表1 order by 字段 limit 9999) union (select * from 表1 order by 字段 desc limit 9999);
```

> 如果是对select排序的话需要括号（select里的必须用limit才会生效）
>
> 如果是对union联合之后的话在后面用order by既可



#### 不重复查询distinct

```mysql
select distinct classname from tb_student where classname is not null;
```



#### 模糊查询like

% 表示0个或多个字符

_表示单个字符

```mysql
-- 用两个_下划线表示匹配两个
select * from tb_student where sname like '王__'
```

```mysql
-- 用#号表示转义，需要在后面添加escape
select * from tb_course where cname like '%#_%' escape '#';
```



#### 排序查询order by

> 排序，根据指定字段进行排序

- ASC 升序【默认】
- DESC 降序
- 单字段排序

```mysql
select * from ani_bangumi order by bid;
```

- 多字段排序

```mysql
-- 根据性别排序后根据年龄排序
select * from student order by ssex, sage;
```

- ROLLUP  可以实现统计每一组 且 加上每一个组的数

```mysql
select * from student group by classname with rollup;
```



#### 限制查询limit

> limit用来限制获取数量

limit 数量N： 现在获取N条数据

limit 起始位置, 数量N： 从起始位置获取N条数据

```mysql
-- 查询第4名到第6名
select * from tb_mark where con='c001' order by grade desc limit 3, 3;
```



#### 聚合函数

- group_concat(): 将组里的某个字段全部保留
- any_value(): 不属于分组字段的任意一个组里的值
- count(): 统计数量
  - count(字段名): 统计指定字段值的数量（null不统计）
  - count(*): 统计全部记录的数量
- sum(): 求和
- max()/min(): 求最大/最小值
- avg(): 求平均值



#### 分组查询 group by

> group by子句可以用来统计细分，先分大组然后分小组
>
> 分组统计需要统计函数

- 统计每个班的人数count()

```sql
select count(*), class_name from 表名 group by class_name;
```

- 统计anime_data数据库的vurl有多少个

```sql
select count(vurl) from ani_video;
```

+-------------+
| count(vurl) |
+-------------+
|        1247 |
+-------------+



#### having子句

> having子句类似与where子句，用来分组后数据筛选
>
> having子句必须出现在group by子句之后（如果同上存在）
>
> having几乎能做where的所有事，但where不一定

- 根据班级分组，然后统计每一个班里的人小于3

```sql
select count(*) as 'count', class_name, group_concat(name) from 表名 group by class_name having 'count' < 3;
# count这里用了别名，不然having那里不方便
```

- 根据bid(番剧ID)分组，然后刷选bid(番剧ID)大于2019000(也就是19年的新番)

```sql
select * from ani_video group by(bid) having bid > 20190000;
```

> tip: having的效率没where高，能用where的的绝不用having



#### 连接查询 join

- [inner] join 内连接

两个表中字段匹配关系的记录

ON 连接的条件

```mysql
select s.*, m.*
from tb_student s join tb_mark m
on s.sno = m.sno;
```



- left [outer] join 左连接

获取左表所有记录，即使右表没有对应匹配的记录。

```mysql
select s.*, m.*
from tb_student s left outer join tb_mark m
on s.sno = m.sno;
```



- right [outer] join 右连接

与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。

```mysql
select s.*, m.*
from tb_student s right outer join tb_mark m
on s.sno = m.sno;
```



#### 小结

![image-20200412141412370](images/mysql查询顺序.png)



### 事务

- 查看自动提交事务是否状态

```mysql
show variables like 'autocommit';
```

- 设置自动提交事务

```mysql
set autocommit = 1;  # 开启 ON
set autocommit = 0;  # 关闭 OFF，要自己手动commit才能结束事务
```



- 开启事务

```mysql
begin;  # 开启事务
...........
...........
commit;  # 提交事务
rollback;  # 回滚事务
```

```mysql
begin;
update dept, (select deptno as deptno2, count(*) as people from emp group by deptno) as new_emp set dept.dcount = new_emp.people where dept.deptno=new_emp.deptno2;
rollback;
```



### 索引

#### 索引分类

##### btree索引

- 普通索引 index
- 唯一索引 unique
- 主键索引  primary key
- 全文索引 fulltext

##### hash索引

#### 查看索引

```mysql
show index from 表名;
```



#### 创建索引

1. 

```mysql
create index 索引名 on 表名(列名);
```

2. 

```mysql
alter table 表名 add index 索引名(列名);
```

3. 创建表的时候创建索引

```mysql
create table xx(
    id int,
    name varchar(20),
    primary key(id),
    index name_in(name)  -- 创建name列的索引
);
```

- 例：创建学号列的前5个字符建立一个升序索引

```mysql
create index xh_xs on xs(学号(5) asc);
```

- 例：创建一个复合索引

```mysql
create index xskc_in on xs_kc(学号, 课程号);
```



#### 删除索引

1. 

```mysql
drop index name_in on 表名;
```

2. 

```mysql
alter table 表名 drop index 索引名;
```

> alter table 表名 add/drop/modify   列名/索引名  目标;

### 分区

#### range 分区

range型只能int型

- int型

```mysql
create table 表名 (
	userid int unsigned,
    content text
)
partition by range(userid) (
    partition part1 values less than(5000000),
    partition part2 values less than(10000000),
    partition part3 values less than(maxvalue)
);
```



- date型，但 用year() 得到的是int型

```mysql
create table 表名 (
	userid int unsigned,
    日期列名 date
)
partition by range(year(日期列名)) (
    partition part1 values less than(2000),
    partition part2 values less than(2010),
    partition part3 values less than(maxvalue)
);
```



- 多列分区

```mysql
create table 表名 (
	userid int unsigned,
    日期列名 date
)
partition by range columns(userid, year(日期列名)) (
    partition part1 values less than(5000, 2000),
    partition part2 values less than(5000, 2010),
	partition part1 values less than(10000, 2000),
	partition part1 values less than(10000, 2010),
    partition part3 values less than(maxvalue, maxvalue)
);
```

> columns型支持其他类型



#### list 分区

> LIST分区和RANGE分区非常的相似，主要区别在于LIST是枚举值列表的集合，RANGE是连续的区间值的集合。二者在语法方面非常的相似。同样建议LIST分区列是非null列，否则插入null值如果枚举列表里面不存在null值会插入失败，这点和其它的分区不一样，RANGE分区会将其作为最小分区值存储，HASH\KEY分为会将其转换成0存储，主要LIST分区只支持整形，非整形字段需要通过函数转换成整形；5.5版本之后可以不需要函数转换使用LIST COLUMN分区支持非整形字段



```mysql
create table 表名2 (
	userid int unsigned,
    pubtime date
)
partition by list(month(pubtime)) (
	partition part1 values in(1, 3, 4),  -- 只存储月份1，3，4的数据
    partition part2 values in(2, 5, 6),
    partition part3 values in(null)
);
```



#### hash分区

> hash分区整数是靠取模来分区的
>
> 只允许一列



#### key分区

> key分区允许多列
>
> 有主键的话可以不指定列



### 视图

> 将不同的语句封装
>
> 是个虚拟表

#### 创建视图

- 语法

```mysql
crate [or replace] view 视图名[(列1,...)]
as select 列1 from 表名
[with check option];
```

> or replace：如果这个视图名有了就替换
>
> with check option： 限制这个视图只能查询，不能插入或更新

- 列子

```mysql
create view 查询视图 as select sname, sage, classname from tb_student where classname='19软件5班';
```



#### 修改视图

```mysql
alter view 视图名[(列1,...)]
as select 列1 from 表名
[with check option];
```



#### 查看视图

跟表一样的操作

```mysql
show tables;
desc 视图名;
```

```mysql
show full tables where table_type='view';
```

#### 删除视图

```mysql
drop view 视图名;
```



#### 视图：插入数据

```mysql
insert into 视图名 values (data1[, data2]);
```



#### 视图：更新数据

```mysql
update 视图名 set 列名 = data1;
```



视图：删除数据

```mysql
delete from 视图名 [where=data1];
```



### 存储过程

#### 创建

```mysql
create procedure 名称(in|out|inout 参数名 数据类型)
begin
-- code
end
```



#### 执行

```mysql
call 存储过程名();
```



#### 删除

```mysql
drop procedure 存储过程名;
```



#### 查看

- 查看当前存储过程

```mysql
show procedure status [where db='stumarkdb'/where name like '%get%'];
```

- 查看详细代码

```mysql
show create procedure 存储过程名;
```



#### 存储过程参数

- 获取学生总数

```mysql
delimiter //
create procedure getPeople()
begin
  select count(*) 人数 from tb_student;
end//
delimiter ;

call getPeople();  -- 调用，然后查询
```

> delimiter  修改结束符，不然和里面的代码块有冲突



##### in

> 带输入参数的存储过程

```mysql
delimiter //
create procedure delStudent(in stu_id char(7))
begin
  delete from tb_student where sno = stu_id;
end//
delimiter ;

call delStudent('1930502');
```



##### out

> 带输出参数的存储过程

```mysql
delimiter //
create procedure getName(in stu_id char(7), out out_name varchar(12))
begin
  select sname into out_name from tb_student where sno = stu_id;
end//
delimiter ;

call getName('1930502', @var);  -- 变量用@定义
select @var;                    -- 查询变量值
```

- 例子: 传入两个数，返回较大的数

```mysql
delimiter //
create procedure getMaxNum(in a int, in b int, out res int)
begin
  set res = a;
  if b > res then
  set res = b;
  end if;
end//
delimiter ;

call getMaxNum(3, 6, @var);  -- 变量用@定义
select @var;                    -- 查询变量值
```



##### inout

> 可以输入输出参数的存储过程

```mysql
delimiter //
create procedure getMaxNum2(in a int, inout b int)
begin
  if a > b then
  set b = a;
  end if;
end//
delimiter ;

set @n1 = 56;
set @n2 = 96;
call getMaxNum2(@n1, @n2);  -- 变量用@定义
select @n2;                    -- 查询变量值
```

- 根据班级获取年龄最大最小的年龄差

```mysql
delimiter //
create procedure getAgeNum(in cla_name varchar(20), out age_num int)
begin
  declare max, min int;  -- 定义两个变量
  select sage into max from tb_student where classname=cla_name order by sage desc limit 1;
  select sage into min from tb_student where classname=cla_name order by sage limit 1;
  set age_num = max - min;
end//
delimiter ;

call getAgeNum('19软件5班', @age_num); 
select @age_num;
```



### 流程控制语句

#### if

```mysql
if 条件 then 语句
elseif 条件 then 语句
else 语句
end if;
```



#### case

1. 

```mysql
case 目标
    when 值1 then 语句
    when 值2 then 语句
    else 语句
end case;
```

2. 

```mysql
case
    when 条件 then 语句
    when 条件 then 语句
    else 语句
end case;
```



#### while

```mysql
[标志名:]while 条件 do
    // code
    leave 标志名;  -- 跳出循环，要用标志名
end while[ 标志名];
```

- 例子

```mysql
delimiter //
create procedure ins_blog(cnt int)
begin
  declare i int default 1;
  declare bid int;
  select max(id) into bid from tb_blog;
  
  if bid is null then set bid = 0;
  end if;
  
  while i <= cnt do
    set bid = bid + 1;
    insert into tb_blog values(bid, i, concat('title', i), concat('content', i), now());
    set i = i + 1;
  end while;
end//

delimiter ;


call ins_blog(10);
```



#### repeat

```mysql
[标签名:]repeat
  // code
  until 条件
end repeat [标签名]
```



#### loop

```mysql
[标签名:]loop
  // code
  leave [标签名];
end loop [标签名];
```



```mysql
delimiter //
create procedure get_details(name varchar(10))
begin
  select e.sal, d.dname from emp e join dept d on e.deptno = d.deptno where e.ename = name; 
end//
delimiter ;


call get_details('王雪');
```

```mysql
delimiter //
create procedure get_details3(in name varchar(10), out res_sal int, out res_depart varchar(30))
begin
  select e.sal, d.dname into res_sal, res_depart from emp e join dept d on e.deptno = d.deptno where e.ename = name; 
  select res_sal;
end//
delimiter ;

call get_details3('王雪', @res_sal, @res_depart);

select @res_sal, @res_depart;
```



```mysql
delimiter //
create procedure get_details6(in name varchar(10), out res_sub int, out res_cou double)
begin
  select count(m.cno),avg(m.grade) into res_sub, res_cou from tb_mark m join tb_student s
  on m.sno = s.sno
  where s.sname = name
  group by m.sno ;
end//
delimiter ;

call get_details6('张宇', @res_sub, @res_cou);

select @res_sub, @res_cou;



```

