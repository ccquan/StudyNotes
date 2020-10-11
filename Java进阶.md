Java进阶



## JDBC MySQL

### 描述

Java DataBase Connectivity  Java数据库连接

本质：官方（sum公司）定义的一套操作所有关系型数据库的规则，即接口。各个数据库厂商去实现这套接口，提供数据库驱动jar包。我们可以使用这套接口（JDBC）编程，真正执行的代码时驱动jar包中的实现类



### 代码练习文件夹

IdeaProjects/JDBC_MySQL_Practice



### MySQL版下载

1. https://dev.mysql.com/downloads/connector/j/

2. 选择Platform Independent（与平台无关）
3. Windows下的话一般选zip格式的下载包
4. 点击 No thanks, just start my download.



### IDEA导入包

1. 为了后续项目发展可以先创建一个(libs)文件夹用来存放包
2. 将mysql-connector-java-8.0.20.jar拖到 libs文件夹中
3. 右键 libs文件夹，add as library



### 快速开始

1. 选择驱动和连接地址

- MySQL 8.0 以下版本连接地址

```java
static final String DB_URL = "jdbc:mysql://localhost:3306/RUNOOB";
```

- MySQL 8.0 以上版本连接地址

> 1. MySQL 8.0 以上版本不需要建立 SSL 连接的，需要显式关闭。
>
>    MySQL 5.7 之前版本，安全性做的并不够好，比如安装时生成的root空密码账号、存在任何用户都能连接上的 test 库等，导致数据库存在较大的安全隐患。从5.7版本开始MySQL官方对这些问题逐步进行了修复，到了 MySQL 8.0 以上版本已经不需要使用 SSL 进行连接加密了。但是高版本仍然保留了这个接口，所以需要在连接的时候手动写明是否需要进行 SSL 连接，这里我们手动关闭 SSL 连接加密就OK。
>
>    useSSL=false
>
> 2. 还需要设置 CST。也就是设置时区。
>
>    serverTimezone=UTC
>
> 3. 因为MySQL8.0跟之前的版本有很大改变，所有驱动也将 com.mysql.jdbc.Driver 更换为 com.mysql.**cj**.jdbc.Driver。

```java
static final String DB_URL = "jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&serverTimezone=UTC";
```

- JDBC 8.0 以下注册驱动

```java
Class.forName("com.mysql.jdbc.Driver");
```

- JDBC 8.0以上注册驱动

```java
Class.forName("com.mysql.cj.jdbc.Driver");
```



2. 引用SQL包

```java
import java.sql.*;
```



3. example

   运行环境：MySQL5.7 、jdbc8.0

```java
import java.sql.*;

public class jdbc练习MySQL {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
//        1. 注册驱动
        Class.forName("com.mysql.cj.jdbc.Driver");
//        2. 连接数据库
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&serverTimezone=UTC", "root", "root");
//        4. 定义sql语句
        String sql = "select id, name, url from websites";
//        5. 创建一个用来执行sql语句的Statement对象stmt
        Statement stmt = conn.createStatement();
//        6. 执行sql语句，返回的数据给ResultSet结果集对象
        ResultSet rs = stmt.executeQuery(sql);
//        6.5. 遍历查看结果集对象的数据
        while(rs.next()){
            // 通过字段检索
            int id  = rs.getInt("id");
            String name = rs.getString("name");
            String url = rs.getString("url");
            // 输出数据
            System.out.print("ID: " + id);
            System.out.print(", 站点名称: " + name);
            System.out.print(", 站点 URL: " + url);
            System.out.print("\n");
        }
//        7. 释放资源
        rs.close();
        stmt.close();
        conn.close();
    }
}
```



### 详解SQL的常用对象

#### DriveManager

驱动管理对象

功能：

1. 注册驱动

   真正注册驱动的不是 Class.forName，而是 DriverManager.registerDriver。

   Class.forName("com.mysql.jdbc.Driver");  加载这个驱动时，会自动执行里面的静态代码，里面的静态代码中已经帮我们注册驱动了

   ```java
   static {
       try {
           DriverManager.registerDriver(new Driver());
       } catch (SQLException var1) {
           throw new RuntimeException("Can't register driver!");
       }
   }
   ```

   *MySQL5以后的版本可以省略注册驱动步骤，但最好还在加上*

2. 获取数据库连接

   方法语法：

   ```java
   static Connection getConnection(String url, String root, String password)
   ```

   url: jdbc:mysql://地址:端口/数据库名?其它参数

   * jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&serverTimezone=UTC
   * 一般本机数据库可以缩写成：jdbc:mysql:///RUNOOB



#### Connection

数据库连接对象

功能：

1. 创建一个用来执行sql语句的Statement对象stmt

   Statement createStatement()

   preparedStatement preparedStatement(String sql)

2. 管理事务

   开启事务：setAutoCommit(boolean autoCommit)

   提交事务：commit()

   回滚事务：rollback()



#### Statement

执行sql语句对象

功能：

1. 执行sql语句

   + int executeUpdate(String sql) ：执行（insert、update、delete、create、alter、drop）的语句

     返回值：受影响的语句条数

   + ResultSet executeQuery(String sql) ：执行(select)语句

     返回值：ResultSet结果集对象



#### ResultSet

结果集对象

+ Boolean next()：游标向下移动一行

+ getxxx(字段下标, 字段名)：获取数据xxx表示数据类型，类如：getInt、getString()
  + 字段下标：int 从1开始，如果不填就按字段名查找
  + 字段名：String 根据字段名查询



#### PreparedStatement

预处理执行sql语句对象，防SQL注入

1. 定义SQL语句时用问号 ? 作为占位符

   ```java
   PreparedStatement ps = conn.prepareStatement("select * from users where username = ? and password = ?");
   ```

2. 给 ? 赋值

   setxxx(参数1, 参数2)  ：xxx表示数据类型，如setString()、setInt()

   + 参数1：表示 ? 的位置，从1开始
   + 参数2：要赋值的数据

   例如上面的：

   ```java
   ps.setString(1, "admin");
   ps.setString(2, "admin888");
   ```

3. 执行SQL语句

   跟Statement对象一样，例如 rs = ps.executeQuery();

**后面都会使用这个对象而不使用Statement对象**



### example

登录模拟

TestClass.java

```java
import util.JDBCUtil;
import java.sql.*;
import java.util.Scanner;

public class jdbc登录模拟 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入用户名：");
        String username = sc.nextLine();
        System.out.println("请输入密码：");
        String password = sc.nextLine();
        sc.close();

        if (login(username, password)) {
            System.out.println("登录成功！");
        } else {
            System.out.println("登录失败！");
        }
    }

    private static boolean login(String username, String password) {
        if (username == null || password == null) {
            return false;
        }
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = JDBCUtil.getConnection();
            ps = conn.prepareStatement("select * from users where username = ? and password = ?");
            ps.setString(1, username);  // 给?赋值
            ps.setString(2, password);
            rs = ps.executeQuery();
            return rs.next();  // next本身就是返回布尔值类型
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        } finally {
            JDBCUtil.close(rs, conn, ps);
        }
    }
}
```

JDBCUtil.java   封装对数据库的操作，主要有两个方法，一个是注册驱动一个是释放资源

```java
package util;

import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.sql.*;
import java.util.Enumeration;
import java.util.Properties;

public class JDBCUtil {
    private static String url;
    private static String user;
    private static String password;
    private static String drive;

    static {
        Properties pro = new Properties();
        try {
            ClassLoader classLoader = JDBCUtil.class.getClassLoader();
            URL res = classLoader.getResource("jdbc.properties");
            assert res != null;
            String path = res.getPath();
            System.out.println(path);
            pro.load(new FileReader(path));
            url = pro.getProperty("url");
            user = pro.getProperty("user");
            password = pro.getProperty("password");
            drive = pro.getProperty("drive");
            // jdbc.properties里面不能加双引号
            Class.forName(drive);

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    // 封装注册方法
    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(url, user, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // 封装两个参数的释放资源方法
    public static void close(Connection conn, PreparedStatement ps)  {
        if (ps != null) {
            try {
                ps.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    
    // 封装三个参数的释放资源方法
    public static void close(ResultSet rs, Connection conn,  PreparedStatement ps) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (ps != null) {
            try {
                ps.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```



### JDBC控制事务

语法：

```java
conn.setAutoCommit(false);  // 开启事务，在sql语句执行之前开启
conn.commit();  // 提交事务，在全部sql语句都安全执行之后再提交
conn.rollback();  // 回滚事务，再try捕获异常后回滚
```

#### example

```java
import util.JDBCUtil;
import java.sql.*;

public class JDBC控制事务 {
    public static void main(String[] args) {
        Connection conn = null;
        PreparedStatement ps1 = null;
        PreparedStatement ps2 = null;
        try {
            conn = JDBCUtil.getConnection();
            conn.setAutoCommit(false);  // 开启事务
            ps1 = conn.prepareStatement("update account set money = money + 500 where id = ?");
            ps1.setInt(1, 1);
            ps1.executeUpdate();
			int test = 2 / 0;  // 手动制造一个异常，这样sql只执行了一半
            ps2 = conn.prepareStatement("update account set money = money - 500 where id = ?");
            ps2.setInt(1, 2);
            ps2.executeUpdate();

            conn.commit();  // 提交事务
        } catch (Exception e) {
            try {
                if (conn != null) {
                    conn.rollback();  // 发生异常后回滚事务
                }
            } catch (SQLException ie) {
                ie.printStackTrace();
            }
            e.printStackTrace();
        }
    }
}
```



### 数据库连接池

1. 概念：存放数据库连接的容器。

   当系统初始化后，容器被创建，容器中会申请一些连接对象，当用户来访问数据库时，从容器中获取连接对象，用户访问完后，会将连接对象归还到容器。

2. 好处：节约资源、用户访问高效

接口：DateSource



#### C3P0

数据库连接池实现技术

1. 下载地址：

https://sourceforge.net/projects/c3p0/

2. 导入：

导入c3p0包、依赖包

lib/c3p0-0.9.5.5.jar

lib/mchange-commons-java-0.2.19.jar

3. 数据库配置文件

名称：c3p0.properties  或者 c3p0-config.xml

路径：放在src目录下即可

- 快速开始

```java
import com.mchange.v2.c3p0.ComboPooledDataSource;
import javax.sql.DataSource;
import java.sql.*;

public class JDBC数据库连接池 {
    public static void main(String[] args) {
        DataSource ds = new ComboPooledDataSource();  // 创建连接池，如果没给参数就使用默认连接池
        Connection conn = null;
        try {
            conn = ds.getConnection();  // 获取一个连接
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        System.out.println(conn);
        conn.close();  // 回收连接到连接池，并不是关闭
    }
}
```





#### c3p0-config.xml

MySQL8.0对应的c3p0-config.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<c3p0-config>
  <!-- 这个是默认连接池 -->
  <default-config>
    <property name="driverClass">com.mysql.cj.jdbc.Driver</property>
    <property name="jdbcUrl">jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&amp;serverTimezone=UTC&amp;</property>
    <property name="user">root</property>
    <property name="password">root</property>
    <!-- 初始化申请的连接数量 -->
    <property name="initialPoolSize">10</property>
    <!-- 最小连接数量 -->
    <property name="minPoolSize">10</property>
    <!-- 最大连接数量 -->
    <property name="maxPoolSize">20</property>
  </default-config>
  
  <!-- 这个是使用指定连接池 -->
  <named-config name="myData">
    <property name="driverClass">com.mysql.cj.jdbc.Driver</property>
    <property name="jdbcUrl">jdbc:mysql://localhost:3306/其它数据库?useSSL=false&amp;serverTimezone=UTC&amp;</property>
    <property name="user">root</property>
    <property name="password">root</property>
    <property name="initialPoolSize">10</property>
    <property name="minPoolSize">10</property>
    <property name="maxPoolSize">20</property>
  </named-config>
</c3p0-config>
```

- 使用指定连接池

```java
DataSource ds = new ComboPooledDataSource("myData");
```



#### Druid

数据库连接池实现技术，由阿里提供



2. 导入包

druid-1.0.9.jar

3. 配置文件

druid.properties

```
url = jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&serverTimezone=UTC
username = root
password = root
driverClassName = com.mysql.cj.jdbc.Driver
#初始化申请连接数
initialSize = 5
#最大连接
maxActive = 10
#最长等待时间
maxWaite = 3000
```

- 快速开始

```java
import com.alibaba.druid.pool.DruidDataSourceFactory;
import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.Connection;
import java.util.Properties;

public class jdbc数据库druid连接池 {
    public static void main(String[] args) {
        Properties pro = new Properties();  // 创建一个properties对象
        InputStream is = jdbc数据库druid连接池.class.getClassLoader().getResourceAsStream("druid.properties");  // 创建一个文件流对象
        try {
            pro.load(is);  // properties对象读取文件
            DataSource ds = DruidDataSourceFactory.createDataSource(pro);  // druid连接池读取配置
            // 1. 获取一个连接
            Connection conn = ds.getConnection();
            System.out.println(conn);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



#### 封装Druid

DruidPoolUtil.java

```java
package util;
import com.alibaba.druid.pool.DruidDataSourceFactory;
import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;

public class DruidPoolUtil {
    static DataSource ds;
    // 静态代码，自动读取配置文件和创建一个连接池对象
    static {
        Properties pro = new Properties();
        InputStream is = DruidPoolUtil.class.getClassLoader().getResourceAsStream("druid.properties");
        try {
            pro.load(is);
            ds = DruidDataSourceFactory.createDataSource(pro);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 获取一个连接资源
    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }
    
    // 获取连接池对象
    public static DataSource getDateSource() {
        return ds;
    }

    // 归还资源
    public static void close(Connection conn, PreparedStatement ps) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        if (ps != null) {
            try {
                ps.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
    }
}
```

测试类

```java
package pool;
import util.DruidPoolUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;


public class jdbc数据库druid封装测试类 {
    public static void main(String[] args) {
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = DruidPoolUtil.getConnection();  // 获取一个连接资源
            ps = conn.prepareStatement("update account set money = money + 500 where id = ?");
            ps.setInt(1, 3);
            int rs = ps.executeUpdate();
            System.out.println(rs);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            DruidPoolUtil.close(conn, ps);  // 归还
        }
    }
}
```



## Spring JDBC

### 描述

  Spring框架针对JDBC操作做的一些抽象和封装。里面区分了哪些操作Spring已经帮你做好了、哪些操作是应用开发者需要自己负责的。一句话、Spring帮你屏蔽了很多JDBC底层繁琐的API操作、让你更方便的开发



### 代码练习文件夹

IdeaProjects/Spring_JDBC



### 下载地址

https://jar-download.com/artifacts/org.springframework/spring-jdbc

导入下载后的全部包和数据库驱动的包



### 语法

1. 获取一个JdbcTemplate对象，依赖数据源(连接池)DataSource

   JdbcTemplate jt = new JdbcTemplate(ds)

2. 调用执行sql语句的方法

   - int update(sql)：执行 增删改 语句
   - Map queryForMap(sql)：查询结果，并将查询结果封装为map集合
   - List queryForList(sql)：查询结果，并将查询结果封装为list集合
   - query()：查询结果，并将解除结果封装为JavaBean对象
   - T queryForObject(sql, 封装的对象)：查询结果，并将解除结果封装为对象



- 例：将记录数封装为int对象

```java
String sql = "select count(*) from myusers";
int 记录数 = jt.queryForObject(sql, Integer.class);
```



### 快速开始

update方法示例：

```java
import org.springframework.jdbc.core.JdbcTemplate;
import util.DruidPoolUtil;

public class templateTest {
    public static void main(String[] args) {
        // 创建一个模板，参数是连接池
        // 现在这里传之前封装好的Druid类的获取连接池方法
        JdbcTemplate jt = new JdbcTemplate(DruidPoolUtil.getDateSource());
		// sql语句跟preparedStatement一样用问号
        String sql = "update account set money = money + 100 where id = ?";
        // 然后执行语句
        int rs = jt.update(sql, 3);
        System.out.println(rs);
    }
}
```



### 练习

练习数据库：runoob 表：account 

需求

1. 修改ID为1的money为10
2. 添加一条记录
3. 删除刚才的记录
4. 查询id为1的记录，并封装为map集合
5. 查询所有记录，并封装为List集合
6. 查询总记录数

- 单元测试

```java
import org.junit.Test;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import util.DruidPoolUtil;
import java.util.List;
import java.util.Map;


public class Templdate练习_单元测试 {
    private JdbcTemplate jt = new JdbcTemplate(DruidPoolUtil.getDateSource());

    @Test
    public void test1() {
        String sql = "update account set money = 10 where id = 1";
        int rs = jt.update(sql);
        System.out.println(rs);
    }

    @Test
    public void test2() {
        String sql = "insert into account values(4, ?, ?)";
        int rs = jt.update(sql, "Tom", 800);
        System.out.println(rs);
    }

    @Test
    public void test3() {
        String sql = "delete from account where id = 4";
        int rs = jt.update(sql);
        System.out.println(rs);
    }

    @Test
    public void test4() {
        String sql = "select * from account where id = 1";
        Map data = jt.queryForMap(sql);
        System.out.println(data.toString());
        // 返回结果 {id=1, name=张三, money=10.0}
        // 字段=键 数据=值 ，如果返回的结果大于一条数据那会报错，大于一条数据可以用List
    }

    @Test
    public void test5() {
        String sql = "select * from account";
        List data = jt.queryForList(sql);
        System.out.println(data.toString());
        // 返回结果 [{id=1, name=张三, money=10.0}, {id=2, name=李四, money=1000.0}] map数组
    }

    @Test
    public void test6() {
        String sql = "select count(*) from account";
        Long rs = jt.queryForObject(sql, Long.class);
        System.out.println(rs);
    }
}
```



## JDBC Oracle

## 代码练习文件夹

IdeaProjects/JDBC_Oracle_Practice



### jdbc包下载

https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html

下载对应的jar包，例如11.2 :arrow_right: ojdbc6.jar



### 驱动名称

oracle.jdbc.driver.OracleDriver



### url连接地址

- jdbc:oracle:thin:@地址:端口:sid

```
jdbc:oracle:thin:@127.0.0.1:49161:xe
```

- jdbc:oracle:thin:@地址:端口/服务号

```
jdbc:oracle:thin:@127.0.0.1:49161/xe
```

其它跟MySQL差不多



### 快速开始

```java
import org.junit.Test;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Demo1 {
    @Test
    public void test1() throws Exception {
        Class.forName("oracle.jdbc.driver.OracleDriver");  // 加载驱动
        Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@127.0.0.1:49161:xe", "chen", "chen888");
        PreparedStatement ps = conn.prepareStatement("select * from \"emp\"");
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            System.out.println(rs.getInt("id") + "--" + rs.getString("ename"));
        }
    }
}
```



### java调用存储过程

存储过程： CallableStatement conn.prepareCall(String) 方法

```
CallableStatement cs = conn.prepareCall("{call 过程名(参数1, [参数2])}");
```

```java
@Test
public void test2() throws Exception {
    Class.forName("oracle.jdbc.driver.OracleDriver");
    Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@127.0.0.1:49161:xe", "chen", "chen888");
    CallableStatement cs = conn.prepareCall("{call p_yearsal(?, ?)}");
    cs.setInt(1, 1);
    cs.registerOutParameter(2, OracleTypes.NUMBER);  // 第二个参数时Oracle的number类型，不是java类型
    cs.execute();  // 存储过程没有返回值所有不用接受
    System.out.println(cs.getObject(2));  // getObject(2) 读取第二个变量
}
```



### java调用存储函数

```
CallableStatement cs = conn.prepareCall("{返回变量 = call 函数名(参数1, [参数2])}");
```

存储函数这里变成了 ? = call  函数名 ，所有设置值的时候要注意 1 是 返回变量，2 才是第一个参数

```java
@Test
public void test3() throws Exception {
    Class.forName("oracle.jdbc.driver.OracleDriver");
    Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@127.0.0.1:49161:xe", "chen", "chen888");
    CallableStatement cs = conn.prepareCall("{? = call f_yearsal(?)}");
    cs.setInt(2, 1);
    cs.registerOutParameter(1, OracleTypes.NUMBER);
    cs.execute();  // 存储函数的返回值不是这里接受而是 ？问号占位符
    System.out.println(cs.getObject(1));
}
```

getObject(1) 返回的是对象，如果想要返回其它类型，可以使用getxxx() 

- 例：因为当初存储函数定义的返回值是整型，所以用getInt()

```java
System.out.println("编号1的职员年薪是：" + cs.getInt(1));
```



## Java进阶之-XML

[Java进阶之XML.md](./Java进阶-XML.md)



## WebEE

常见的Java相关的web服务器软件

- weblogic：Oracle公司，大型javaee服务器软件，收费
- websphere：IBM公司，大型，收费
- JBOSS：jboss公司，大型，收费
- tomcat：apache基金组织，中小型，开源免费



### tomcat

1. 下载：https://tomcat.apache.org

2. 安装：解压既可，！注意不能有中文或空格

3. 卸载：删除既可

4. 启动：bin/startup.bat

5. 关闭：bin/shutdown.bat   or  ctrl + c

6. 配置：conf/server.xml

7. 部署：

   + 默认存放web项目在：webapps 

   + 简化部署：将项目打成一个 war 包，然后放到 webapps 目录下，war包会自动解压缩
   + 多站点部署：打开server.xml，在Host标签中创建一个Context

   ```xml
   <Context docBase="站点路径" path="/虚拟路径" />
   ```

   + 推荐：在config/Catalina/localhost 创建一个任意的xml文件

   aaa.xml

   ```xml
   <Context docBase="站点路径" />
   ```

   url访问路径是文件名，例：http://localhost/aaa/index.html



### tomcat目录结构

| 路径    | 描述             |
| ------- | ---------------- |
| bin     | 可执行文件       |
| config  | 配置文件         |
| lib     | 依赖jar包        |
| logs    | 日志文件         |
| temp    | 临时文件         |
| webapps | 存放web项目      |
| work    | 存放运行时的数据 |

- WEB-INF目录
  + web.xml：web项目的核心配置文件
  + classes目录：存放字节码文件的目录
  + lib目录：项目依赖jar包



### 配置首页文件

WEB-INF -> web.xml

```xml
<welcome-file-list>
	<welcome-file>index.html</welcome-file>
	<welcome-file>index.jsp</welcome-file>
</welome-file-list>
```



### IDEA 配置 Tomcat

1. run（运行）-> 调试配置 -> template -> Tomcat Server -> 配置 ，然后选择Tomcat解压的目录即可

2. 创建项目：Java enterprise

3. 编辑配置，这样修改文件时不用再重启tomcat

   On 'Update' action: 更新资源

   On Frame deactivation: 更新资源



运行/调试配置 -> 部署 -> 应用程序上下文：可以修改项目虚拟路径，`/` 表示根路径



### 快速入门

1. 创建一个方法，然后实现Servlet接口

   ```java
   public class servletDemo1 implements Servlet {}
   ```

2. 实现抽象接口 `init`、`getServletConfig` 等

3. 配置servlet，在 web.xml



- 执行原理
  1. 当服务器接受到客户端浏览器的请求后，会解析请求url路径，获取访问的servlet的资源路径
  2. 查找web.xml文件，查看是否有对应的url-pattern标签
  3. 如果有，就找到对应的servlet-class 全类名
  4. tomcat会将字节码文件加载进内存，并且创建对象
  5. 调用其方法



### servlet

server applet ：运行在服务器端的小程序

servlet时一个接口，定义了Java类被浏览器访问到（tomcat识别）的规则



#### servlet映射

web.xml

```xml
<servlet>
  <servlet-name>UserServlet</servlet-name>
  <servlet-class>com.itheima.web.UserServlet</servlet-class>
</servlet>
<servlet-mapping>
  <servlet-name>UserServlet</servlet-name>
  <url-pattern>/user</url-pattern>
</servlet-mapping>
```

这样访问 `http://localhost/虚拟目录/user` 就可以映射到UserServlet.java上了

web3.0以上可以使用注解的方式映射

UserServlet.java

```java
@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {
    // doGet
}
```



#### 抽象方法

- init()：初始化方法，在servlet被创建时执行，只执行一次
- getServletConfig()：
- service()：没一次被访问时执行，执行多次
- getServletInfo()：获取servlet的信息、版本、作者等
- destroy()：销毁方法，服务器关闭时执行，只执行一次



#### servlet生命周期

1. 被创建：执行init方法

   + 默认情况下，第一次访问时servlet被创建

   + 配置文件下，在 `servlet` 标签下 `<load-on-startup>` 

     为负数（默认）时：第一次访问创建

     为0或正整数时：服务器启动时创建

   + servlet是单例的

     多个用户同时访问时，可能存在线程安全

     解决：尽量不要在servlet中定义成员变量，用局部变量，即使定义了，也不要对其赋值操作

2. 提供服务：执行service方法

   每次访问servlet时，都会调用一次

3. 被销毁：执行destroy方法

   servlet销毁时执行，服务器关闭时执行



#### servlet 3.0

创建：Java enterprise ->  Java EE6以上都是3.0以上 -> 勾选 web application -> 取消 创建web.xml

+ src 创建包或类，在类的import下面 配置 `@WebServlet(urlPatterns = "/资源路径")`

- urlPatterns：资源路径
  + 配置多个，例 `{"/a1", "/a2"}`  ，访问http://localhost/xxx/a1  or http://localhost/xxx/a2
  + 配置二级路径，例 `/user/*` ，这样访问 http://localhost/xxx/user/任意



#### servlet体系结构

servlet

   |

GenericServlet：将servlet接口中其它的方法做了默认空实现，只需将service() 方法实现即可

  |

HttpServlet：对http协议的一种封装，简化操作

1. 继承HttpServlet类
2. 重写doGet/doPost方法



#### http

- 请求消息数据格式
  + 请求行：POST /login.html HTTP/1.1
  + 请求头：请求头名称：请求头值 例 `Host:localhost`
  + 请求行：空行
  + 请求体：POST传输的数据 `username=Tom`
- 请求方式：有七种，`GET POST `



### request对象

#### 获取请求行

- String getMethod()：获取请求方法

- String getContextPath()：获取虚拟目录

- String getServletPath()：获取servlet路径

- String getQueryString()：获取get方式的参数：name=Tom&pwd=123

- Stringr getRequestURI()：获取请求uri

- StringBuffe getRequestURL()：获取请求url

- String getProtocl()：获取协议及版本：http/1.1
- String getRemoteAddr()：获取客户端ip地址

```java
protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("service:" + req.getMethod());
    System.out.println("请求方法：" + req.getMethod());
    System.out.println("虚拟目录：" + req.getContextPath());
    System.out.println("servlet路径：" + req.getServletPath());
    System.out.println("get参数：" + req.getQueryString());
    System.out.println("uri：" + req.getRequestURI());
    System.out.println("url：" + req.getRequestURL());
    System.out.println("协议及版本：" + req.getProtocol());
    System.out.println("客户端ip：" + req.getRemoteAddr());
}
```



#### 获取请求头

- String getHeader(String name)：通过头名称获取请求头值

- `Enumeration<String> req.getHeaderNames()` ：获取所有请求体头名称

```java
package cn.itcast;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

@WebServlet(urlPatterns = "/getheader")
public class 获取请求体 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Host请求体的值：" + req.getHeader("Host"));
        System.out.println("遍历所有请求体头名称：");
        Enumeration<String> headers = req.getHeaderNames();
        while (headers.hasMoreElements()) {
            System.out.println(headers.nextElement());
        }
    }
```



#### 获取请求体

BuffereadReader getReader()：获取字符输入流，只能操作字符数据

ServletInputStream getInputStream()：获取字节输入流，可以操作图片、字符等



### 其它功能

#### 获取请求参数通用方式

不管GET还是POST都可以

- String getParameter(String name)：通过参数名称获取参数值，例如：uname=Tom

- String[] getParameterValues(String name)：通过参数名称获取参数数组，例如：hobby=xx&hobby=yy

- `Enumeration<String> getParameterNames()` ：获取所有参数名称
- `Map<String, String[]> getParameterMap()` ：获取所有参数map集合

```java
package cn.itcast;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Map;

@WebServlet("/getarg")
public class 通用参数 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取uname参数值
        System.out.println(req.getParameter("uname"));
        System.out.println("=============");
        // 获取参数数组
        String[] hobby = req.getParameterValues("hobby");
        for (int i = 0; i < hobby.length; i++) {
            System.out.print(hobby[i] + "----");
        }
        System.out.println("=============");
        // 获取map集合
        Map<String, String[]> nameMap = req.getParameterMap();
        System.out.println(nameMap.size());
    }
}
```



**POST方式乱码解决**

在获取参数前添加流编码

```java
req.setCharacterEncoding("utf-8");
```



#### 请求转发

在服务器内部的资源跳转方式

```java
req.getRequestDispatcher("/转发路径").forward(req, resp);
```

- 特点：
  + 浏览器路径不发生变化
  + 只能转发到当前服务器内部资源中



#### Java Web request练习

1. 在web目录下创建一个 `WEB-INF/lib` 文件夹，然后导入jar包 ，右键 添加到库

2. 项目代码

IdeaProjects/Javaweb_User_Login



- BeanUtils工具

> 用于封装Javabean

下载地址：http://commons.apache.org/proper/commons-beanutils/download_beanutils.cgi

populate(Object 类，map 参数map)

- 例：把post参数复制到类的成员去

```java
Map<String, String[]> map = req.getParameterMap();
User user = new User();
try {
    BeanUtils.populate(user, map);
} catch (Exception e) {
    e.printStackTrace();
}
```



### response对象

- 相应行
  + 格式：HTTP/1.1 200 ok
  + 语法：setStatus(int sc)
- 响应头
  + 语法：setHeader(String name, String value)
- 响应体
  + 获取输出流
    + PrintWriter getWriter()
    + ServletOutputStream getOutputStream()
  + 使用输出流
    + 将数据输出到客户端浏览器



### response案列

#### 重定向

1. 设置状态码

```java
resp.setStatus(302);
```

2. 设置响应头

```java
resp.setHeader("location", "/要跳转的路径");
```

- 快速的重定向

```java
resp.sendRedirect("/要跳转的路径");
```

- 重定向(redirect)和转发(forward)的区别
  + 重定向地址栏发生变化，转发不变
  + 重定向可以访问其它站点的资源，转发只能访问当前服务器的资源
  + 重定向是两次请求，不能使用request对象来共享数据，转发是一次请求，可以共享数据

#### 动态获取虚拟目录


```java
String req.getContextPath();
```



#### 输出字符给浏览器

```java
// 1. 获取字符输出流
PrintWriter pw = resp.getWriter();
// 2. 输出数据
pw.write("<h1>Hello 中文</h1>");
```

- 设置返回编码

要在获取字符输出流之前设置流编码

```java
resp.setCharacterEncoding("utf-8");  // 设置流
resp.setHeader("content-type", "text/html;charset=utf-8");  // 设置响应头，告诉浏览器我要返回的编码
```

- 快速的设置返回编码

```java
resp.setContentType("text/html;charset=utf-8")
```



#### 输出字节给浏览器

```java
ServletOutputStream sos = resp.getOutputStream();
sos.write("hello 中文".getBytes());
```

- 图片字节-验证码

```java
package cn.itcast;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

@WebServlet("/img")
public class 返回字节_验证码图片 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int height = 50;
        int width = 100;
        resp.setContentType("image/jpeg");
//        1. 生成一个rgb图片框图像
        BufferedImage bi = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

//        2. 处理图片
        Graphics g = bi.getGraphics();  // 获取画笔对象
        g.setColor(Color.pink);  // 设置画笔颜色
        g.fillRect(0, 0, width, height);  // 填充
//        2.1 画边框(正方形)，边框像素1px，所以要-1，不然出去外面了
        g.setColor(Color.BLUE);
        g.drawRect(0, 0, width - 1, height - 1);
//        2.2 画字符串
        String book = "QWERTYUOPASDFGHJKZXCVBNM1234567890qwertyuopasdfghjkzxcvbnm";
        StringBuilder  saveWord = new StringBuilder();  // 用来保存验证码字符串
        // 随机生成4个验证码字符串
        Random random = new Random();
        for (int i = 0; i < 4; i++) {
            int index = random.nextInt(book.length());
            char word = book.charAt(index);
            saveWord.append(word);
            g.drawString(word + "", 10 + i * 20, 25);
        }
        System.out.println(saveWord);
//        2.3 画线
        g.setColor(Color.green);
        // 随机画10条线段
        for (int i = 0; i < 10; i++) {
            int x1 = random.nextInt(width);
            int x2 = random.nextInt(width);
            int y1 = random.nextInt(height);
            int y2 = random.nextInt(height);
            g.drawLine(x1, y1, x2, y2);
        }

//        3. 输出
        ImageIO.write(bi, "jpg", resp.getOutputStream());
    }
}
```



### ServletContext对象

#### 获取ServletContext

- 第一种

```java
req.getServletContext();
```

- 第二种

```java
this.getServletContext();
```



#### 功能

##### 获取MIME类型

```java
String getMimeType(String file);
```



#### 获取文件路径

```java
String getRealPath(String file);
```



#### 案列：文件下载需求

步骤

1. 定义页面
2. 定义servlet
3. 获取文件名称
4. 使用字节输入流加载文件到内存
5. 指定response的响应头：`content-disposition: attachment;filename=xx` 
6. 将数据写出到response输出流

```java
package cn.itcast;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;

@WebServlet("/download")
public class download extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        1. 通过参数获取文件名
        String fileName = req.getParameter("filename");
//        2. 找到文件路径
        ServletContext sc = this.getServletContext();
        String rp = sc.getRealPath("/files/" + fileName);
//        2.1 读取文件
        FileInputStream fis = new FileInputStream(rp);
//        3. 设置响应头
        String mt = sc.getMimeType(fileName);  // 获取文件的mime类型后缀
        resp.setHeader("context-type", mt);
        resp.setHeader("content-disposition", "attachment;filename=" + fileName);
//        4. 将输入流的数据写出到输出流中
        ServletOutputStream sos = resp.getOutputStream();
        byte[] buff = new byte[1024 * 8];
        int len = 0;
        while ((len = fis.read(buff)) != -1) {
            sos.write(buff, 0, len);
        }
//        5. 关闭输入流
        fis.close();
    }
}
```

download.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>下载文件测试</title>
</head>
<body>
<a href="/download?filename=a.jpg">a.jpg</a>
<a href="/download?filename=a.txt">a.txt</a>
</body>
</html>
```

文件名中文问题

使用别人的轮子：https://blog.csdn.net/dianbian0542/article/details/102108369，然后filename哪里改成

```java
String agent = req.getHeader("User-Agent");  // 获取请求头user-agent的值
fileName = DownloadUtil.getFileName(agent, fileName);
resp.setHeader("content-disposition", "attachment;filename=" + fileName);
```



#### 共享数据

- 域对象：一个有作用范围的对象，可以在范围内共享数据
- request域：代表一次请求的范围，一般用于请求转发多个资源中共享数据
- 方法：
  + setAttribute(String name, Object obj)：存储数据
  + object getAttitude(String name)：通过键获取值
  + void removeAttribute(String name)：通过键移除键值对

数据共享a.java

```java
package cn.itcast;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/gxa")
public class 数据共享a extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("this is gxa");
        req.setAttribute("gxName", "我是共享用户名");  // 设置
        req.getRequestDispatcher("/gxb").forward(req, resp);
    }
}
```

数据共享b.java

```java
package cn.itcast;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/gxb")
public class 数据共享b extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("this is gxb");
        System.out.println(req.getAttribute("gxName"));  // 读取
    }
}
```



#### 请求转发/包含

`getRequestDispatcher()`包含两个方法，分别是请求转发和请求包含。

RequestDispatcher rd = request.getRequestDispatcher("/MyServlet");

请求转发： rd.forward( request , response );
请求包含： rd.include( request  , response);

- 例：从数据库里拿到数据后转发到这里列表页

```java
req.setAttribute("users", users);
req.getRequestDispatcher("/userlist.jsp").forward(req, resp);
```



## 会话

### cookie

#### 语法

- 创建cookie对象

```java
new Cookie(String name, String value);
```

- 发送cookie对象给浏览器

```java
resp.addCookie(Cookie cookie);
```

- 获取cookie

```java
Cookie[] req.getCookie();
```

- 例：创建两个cookie，并发送给浏览器

```java
Cookie c1 = new Cookie("uname", "Tom");
Cookie c2 = new Cookie("uid", "19503");

resp.addCookie(c1);
resp.addCookie(c2);
```



#### cookie属性

- 查看cookie值

```
cookie.getValue();
```

- 查看cookie名

```
cookie.getName();
```

- 例：遍历全部cookie名和值

```java
Cookie[] cookies = req.getCookies();
for (int i = 0; i < cookies.length; i++) {
    System.out.println(cookies[i].getName() + "--" + cookies[i].getValue());
}
```



#### 持久化存储

默认情况下，关闭浏览器cookie即失效

```
setMaxAge(int seconds);
```

- 正数：将cookie数据些盗硬盘中，持久化存储
- 负数：默认值
- 零：删除cookie信息

```java
Cookie cookie = new Cookie("uname", "Tom");
cookie.setMaxAge(100);  // 存储100秒，100秒后删除cookie
resp.addCookie(cookie);
```



#### cookie共享

默认情况下，cookie 的范围是当前的虚拟目录

```
setPath(String "共享范围");
```

- 设置共享范围是当前服务器

```java
cookie.setPath("/");
```

如果不同tomcat服务器之间共享，比如 tongji.baidu.com  tieba.baidu.com

```
cookie.setDomain(".baidu.com");
```



#### cookie的限制

单个cookie的大小是有限制(4kb)，以及同一个域名下的总cookie数量也有限制(20个)



### session

#### 语法

- 获取session对象

```
HttpSession req.getSession();
```

- 设置数据

```
setAttribute(String name, Object value);
```

- 获取数据

```
getAttribute(String name);
```

- 移除数据

```
removeAttribute(String name);
```

- 存储session，关闭浏览器后还是之前的那个会话

原理是，通过cookie的持久化存储，把sessionID给保存下来

```java
Cookie cookie = new Cookie("JSESSIONID", session.getId());
cookie.setMaxAge(60 * 60);
resp.addCookie(cookie);
```



#### session保存在硬盘

用tomcat的 startup.bat 开启后 shutdown.bat 关闭前会把session给保存在work目录下，下次 startup.bat 开启后会恢复之前的session



#### session存活时间

默认session的存活时间是30分钟，可以在web.xml文件的 `<session-config>` 标签的 `session-timeout` 子标签 配置默认存活时间

- 设置session存活时间，就是对网站没操作10秒后会失效，不管关没关浏览器

```
setMaxInactiveInterval(10);  //设置session非活动失效时间，10秒
```

- 注销session

```
session.invalidate();
```



### 用户登录加验证码案列

生成验证码.java 那里将 验证码字符串 添加到session值去，然后 验证登录.java 那里获取值判断





## jsp

### 概念

Java server pages：Java服务器页面

概念：可以理解为一个特殊的页面，其中既可以指定定义html标签页可以指定定义Java标签，jsp本质是一个servlet



### jsp的脚本

```java
<%
	局部变量、java语句  
%>
```

```java
<%!
	全局变量、定义方法
%>
```

```java
<%= 输出表达式 %>
```



### jsp注释

```
<%--  我是注释  --%>
```



### 指令

```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
```

- .jsp第一行那个

- 用于配置jsp页面，导入资源文件
- 格式 `<%@ 指令名称 属性名1=属性值1 属性名2=属性值2 %>`

- 分类
  + page  ：配置jsp页面的
    + contentType：等于resp.setContentType()  设置响应体mime类型和编码
    + import：导入包的，例： `<%@ page import="java.util.List" %>`
    + errorPage：当前页面发送异常后跳转的页面
  + include ：页面包含的，导入页面的资源文件
    + 例：导入头部文件 `<%@include file="head.jsp" %>`
  + taglib  ：导入资源
    + 例：导入标签库 `<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`



### 内置对象

| 变量名      | 真实类型            | 作用                           |
| ----------- | ------------------- | ------------------------------ |
| pageContext | PageContext         | 当前页面共享数据               |
| request     | HttpServletRequest  | 一次请求访问的多个资源（转发） |
| session     | HttpSession         | 一次会话的多个请求间           |
| application | ServletContext      | 所有用户间共享数据             |
| response    | HttpServletResponse | 相应对象                       |
| page        | Object              | 当前页面的对象 this            |
| out         | JspWriter           | 输出对象                       |
| config      | ServletConfig       | servlet的配置对象              |
| exception   | Throwable           | 异常对象                       |



#### 获取虚拟目录

`${pageContext.request.contextPath}`

```java
<a href="${pageContext.request.contextPath}/admin">后台</a>
```



## MVC开发模式

### 概念

M model，JavaBean

- 完成具体的业务操作，如：查询数据库、封装对象

V view，jsp

- 展示数据

C controller，servlet

- 获取用户的输入
- 调用模型
- 将数据交给视图进行展示



### EL表达式

概念：expression language 表达式语言

作用：替换和简化jsp页面中Java代码的编写

语法：${表达式}



#### web.xml需要的头

```xml
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">
```



#### 忽略表达式

- 在jsp指令中 `isELIgnored="true"` 的话表示忽略表达式，原样输出
- 忽略单个：用反斜线，例： `\${表达式}` 



#### 运算

- 算数运算：+ - * / %
- 比较运算：> < >= <= == !=
- 逻辑运算：and or not
- 空运算(判断字符串、集合、数组对象是否为null并且长度是否为0)：empty

- 例：空运算判断集合

```java
<c:if test="${empty requestScope.users}">
    数组为空
</c:if>
<c:if test="${!empty requestScope.users}">
    数组不为空
</c:if>
```



#### 获取值

语法：`${域名称.键名}`

- 域名称
  + pageScope  -->  pageContext
  + requestScope -->  request
  + sessionScope  --> session
  + applicationScope  -> application(ServletContext)



#### 获取对象值

语法：`${域名称.键名.getter}`

```java
<%@ page import="cn.itcast.User" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>获取对象值</title>
</head>
<body>
  <%
      User user = new User();
      user.setName("Tom");
      user.setAge(18);
      user.setGender("男");

      request.setAttribute("u", user);  // 添加到request域
  %>
    <h1>el表达式获取对象</h1>
    ${requestScope.u}
    <p>
        name：    ${requestScope.u.name}
    </p>
    <p>
        age：    ${requestScope.u.age}
    </p>
    <p>
        gender：    ${requestScope.u.gender}
    </p>
</body>
</html>
```



#### 获取集合值

```java
<%
  List list = new ArrayList();
  list.add("aaa");
  list.add("bbb");
  request.setAttribute("list", list);
%>
<h1>获取集合值</h1>
${list[0]};
${list[1]};
```

- 获取map值

```java
第一种：
${map.name}
第二种：
${map["name"]}
```



#### 隐式对象

可以获取其它九大对象

```java
${pageContext.xxx};
```



### JSTL

#### 概念

Javaserver pages tag library  JSP标准标签库

有apache组织提供的开源的免费的JSP标签

作用：用于简化和替换JSP页面上的Java代码



#### 快速开始

1. 下载jar包

https://mirrors.bfsu.edu.cn/apache/tomcat/taglibs/taglibs-standard-1.2.5/taglibs-standard-jstlel-1.2.5.jar

2. 导入 `<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`



#### if

```java
<c:if test="表达式">
    <h1>测试文字</h1>
</c:if>
```

表达式（布尔值），如果是真就显示，如果假就不显示

- 例：

```java
<c:if test="${5 % 2 != 0}">
    <h1>我是奇数</h1>
</c:if>
```



#### choose

相当于Java的switch语句

when ---- case

otherwise---default

```java
<%
    request.setAttribute("number", 2);
%>
<h1>现在星期几：</h1>
<c:choose>
    <c:when test="${number == 1}">星期一</c:when>
    <c:when test="${number == 2}">星期二</c:when>
    <c:otherwise>数字有误</c:otherwise>
</c:choose>
```



#### forEach

1. 循环数字

```java
<c:forEach begin="1" end="10" var="i" step="1">
    ${i}<br>
</c:forEach>
```

- begin：开始值

- end：结束值

- var：临时变量

- step：步长



2. 循环容器

```java
<c:forEach items="${list}" var="str" varStatus="s">
    ${s.index}  ${s.count} ${str}<br>
</c:forEach>
```

- items：容器对象
- var：容器中元素的临时变量

- varStatus：循环状态的对象
  + index：容器中元素的索引，从0开始
  + count：循环次数：从1开始



## 三层架构

- 界面层（表示层）：用户看的界面。用户可以通过界面上的组件和服务器进行交互
- 业务逻辑层：处理业务逻辑的
- 数据访问层：操作数据存储文件



### CURD案列

1. 设计：
   - servlet + jsp + MySQL + jdbcTemplate + duird + beanUtils + tomcat
2.  表结构

```mysql
create table myusers(
  id int primary key auto_increment,
  name varchar(20) not null,
  gender varchar(5),
  age int,
  address varchar(32),
  qq varchar(20),
  email varchar(50));
```

3. 包

| 包                | 描述                       |
| ----------------- | -------------------------- |
| cn.itcast.dao     | 数据访问层：操作数据库的类 |
| cn.itcast.daomain | 对应数据表的类             |
| cn.itcast.service | 业务逻辑层(中间件)         |
| cn.itcast.util    | 工具类，用来封装常用代码   |
| cn.itcast.web     | 页面层                     |



### 代码目录

IdeaProjects/MVC_CURD



## Filter过滤器

### 作用

登录验证、统一编码处理、敏感字符过滤...



### 快速开始

cn.itcast.web.filter

1. 实现 `javax.servlet` 下的 `Filter` 接口
2. `@WebFilter("/要过滤的路径")`

```java
package cn.itcast.web.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

@WebFilter("/index")
public class IndexFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("过滤器...");
//        放行
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
```



### xml配置过滤器

WEB-INF/web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">
    <filter>
        <filter-name>demo1</filter-name>
        <filter-class>cn.itcast.web.filter.IndexFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>demo1</filter-name>
        <url-pattern>/index</url-pattern>
    </filter-mapping>
</web-app>
```



### 生命周期

- init()  服务器启动时时触发
- destroy()  服务器关闭时触发

- doFilter()  每次过滤时触发



### 拦截配置

- 拦截路径配置

  - 拦截具体资源： `/xxx.jsp`
  - 拦截目录： `/admin/*`
  - 后缀名拦截： `*.jsp`
  - 拦截所有资源： `/*`

- 拦截方式

  - REQUEST：默认值，浏览器直接请求资源

  - FORWARD：转发访问资源

  - INCLUDE：包含访问资源

  - ERROR：错误跳转资源

  - ASYNC：异步访问资源

  - 配置拦截方式为REQUEST

    ```
    @WebFilter(value = "/test", dispatcherTypes = DispatcherType.REQUEST)
    ```

  - 配置拦截方式为REQUEST和FORWARD

  ```
  @WebFilter(value = "/test", dispatcherTypes = {DispatcherType.REQUEST, DispatcherType.REQUEST})
  ```



### 过滤器先后顺序

- 比较类的名，较小的先执行

- web.xml：前面的先执行



### 案列：登录验证



## Listener监听器

### 概念

事件：一件事件

事件源：事件发生的地方

监听器：一个对象

注册监听：将事件、事件源、监听器绑定在一起。当事件源发生某个事件后，执行监听器代码



### 快速开始

实现 `ServletContextListener` 接口

```java
public class TestListener implements ServletContextListener {
    
}
```



contextInitialized ：ServletContext对象被创建时调用

contextDestoryed：ServletContext对象被销毁时调用



注释配置：`@WebListener`



## Java&AJAX&JSON

[基础json](jQuery基础.md)

### jackjson解析器

导入3个jackjson包到 web-inf/lib 目录下



### 快速开始

```java
package cn.itcast.test;
import cn.itcast.domain.People;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

public class JackjsonTest {
    @Test
    public void test1() throws JsonProcessingException {
//        1. 创建Java的People对象
        People people = new People();
        people.setName("张三");
        people.setAge(18);
        people.setGender("男");
//        2. 创建Jackson核心对象ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
//        3. 调用转换方法writeValueAsString
        String s = objectMapper.writeValueAsString(people);
        System.out.println(s);
    }
}
```



### Java对象转JSON方法

- writeValue(参数1, obj)

  - 参数1
    - File：将obj对象转换为JSON字符串，然后保存到指定文件中
    - Writer：将obj对象转换为JSON字符串，将json数据填充到字符输出流中
    - OutputStream：将obj对象转换为JSON字符串，将json填充到字节输出流中
  - obj：要转成json的Java对象
  - 例：将对象转成json，然后保存文件到d盘去

  ```
  ObjectMapper objectMapper = new ObjectMapper();
  objectMapper.writeValue(new File("d://people.json"), people);
  ```

- String writeValueAsString(obj)

  - 将对象转成字符串返回



### JSON转Java对象方法

- readValue(json字符串, obj.class)

```java
public void test4() throws IOException {
    String jsonString = "{\"name\":\"张三\",\"age\":2,\"gender\":\"男\",\"birthday\":\"2020-07-13\"}";
    ObjectMapper objectMapper = new ObjectMapper();
    People people = objectMapper.readValue(jsonString, People.class);
    System.out.println(people);
}
```



### 案例：验证用户名是否存在

后台

```java
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    req.setCharacterEncoding("utf-8");
    resp.setContentType("application/json;charset=utf-8");  // 设置返回编码，不然会乱码
    String username = req.getParameter("username");  // 接受传过来的用户名
    UserServiceImpl userService = new UserServiceImpl();
    Admin admin = userService.checkUserName(username);
    // json对象
    ObjectMapper objectMapper = new ObjectMapper();
    Map<String, Object> map = new HashMap<>();
    // 判断是否存在
    if (admin != null) {
        map.put("userExist", true);
        map.put("msg", "用户名已使用，请更换其它");
    } else {
        map.put("userExist", false);
        map.put("msg", "用户名可用");
    }
    objectMapper.writeValue(resp.getWriter(), map);  // 将map对象转换为json，然后传给resp输出流
}
```

前台

```html
<label for="user">用户名：</label>
<input type="text" onblur="checkUsername()" name="username" class="form-control" id="user" placeholder="请输入用户名"/>
<label id="user_msg"></label>

<script>
function checkUsername() {
    const name = document.getElementById('user').value;
    console.log(name);
    $.post('CheckUserName', {'username': name}, function (resp) {
        console.log(resp);
        // 返回 {msg: "xxxxxx", userExist: true}
        // userExist 为true表示用户存在，字体为红色 为false表示用户不存在
        if (resp['userExist']) {
            $('#user_msg').text(resp['msg']).css('color', 'red');
        } else {
            $('#user_msg').text(resp['msg']).css('color', 'green');
        }
    }, 'json');
}
</script>
```



### 注释和格式化

`@JsonIgnore` 可以在Java对象中注释某个成员变量，转换时会忽略

```java
public class People {
    String name;
    int age;
    String gender;
    @JsonIgnore
    Date birthday;
}
```

`@JsonFormat` 格式化成员变量

```java
public class People {
    String name;
    int age;
    String gender;
    @JsonFormat(pattern = "yyyy-MM-dd")
    Date birthday;
}
```





## Redis

### 概念

高性能nosql数据库

1. 数据之间没有关系
2. 数据存储在内存中

- 应用场景
  - 缓存（数据查询、短链接、新闻内容）
  - 聊天室的在线好友列表
  - 任务队列（秒杀、抢购、12306）
  - 应用排行榜
  - 网站访问统计
  - 数据过期处理
  - 分布式集群架构中的session分离



### 下载

官网：https://redis.io/download

Windows编译版：https://github.com/tporadowski/redis/releases

1. 安装时勾选添加到PATH变量

2. cmd开启服务端， `redis-server.exe redis.windows.conf` 也可以用服务进程`Redis`
3. 连接 `redis-cli.exe -h 127.0.0.1 -p 6379`

文件说明：

- redis.windows.conf：配置文件(主机、端口等)
- redis-cli.exe：redis的客户端
- redis.server.exe：redis服务端



### 命令操作

#### 数据结构

- 字符串类型：string
- 哈希类型：hash：map格式
- 列表类型：list：linkedlist格式，支持重复元素
- 集合类型：set 不允许重复元素
- 有序结合类型：sortedset 不允许重复元素，且元素有顺序



#### 字符串类型 string

- 存储：set key value
- 获取：get key
- 删除：del key

```
127.0.0.1:6379> set name Tom
OK
127.0.0.1:6379> get name
"Tom"
127.0.0.1:6379> del name
(integer) 1
```



#### 哈希类型 hash

- 存储：hset key field value
- 获取：hget key field
- 获取所有键：hgetall key
- 删除：hdel key field

```
127.0.0.1:6379> hset myhash  username Tom
(integer) 1
127.0.0.1:6379> hset myhash pwd Tom888.
(integer) 1

127.0.0.1:6379> hget myhash username
"Tom"
127.0.0.1:6379> hget myhash pwd
"Tom888."

127.0.0.1:6379> hgetall myhash
1) "username"
2) "Tom"
3) "pwd"
4) "Tom888."

127.0.0.1:6379> hdel myhash pwd
(integer) 1
```



#### 列表类型

- 从左边添加：lpush key value
- 从右边添加：rpush key value
- 从start获取到end(-1表示全部)：lrange key start end

- 删除左边的元素并返回该删除的元素：lpop key
- 删除右边的元素并返回该删除的元素：rpop key

```
127.0.0.1:6379> lpush mylist Tom
(integer) 1
127.0.0.1:6379> lpush mylist Tim
(integer) 2
127.0.0.1:6379> lrange mylist 0 -1
1) "Tim"
2) "Tom"
127.0.0.1:6379> lpop mylist
"Tim"
```



#### 集合类型

- 存储：sadd key value

- 获取set集合全部元素：smembers key
- 删除某个元素：srem key value

```
127.0.0.1:6379> sadd myset Tom
(integer) 1
127.0.0.1:6379> sadd myset Tim
(integer) 1
127.0.0.1:6379> SMEMBERS myset
1) "Tom"
2) "Tim"
127.0.0.1:6379> srem myset Tom
(integer) 1
```



#### 有序集合类型

按照 `score ` 排序

- 存储：zadd key score value
- 获取：zrange key start end
- 删除：zrem key value

```
127.0.0.1:6379> zadd mysort 60 mysql
(integer) 1
127.0.0.1:6379> zadd mysort 50 java
(integer) 1
127.0.0.1:6379> zrange mysort 0 -1
1) "java"
2) "mysql"
127.0.0.1:6379> zrem mysort java
(integer) 1
```



#### 通用命令

keys *：查询所有的键

type key：获取键的类型

del key：删除指定键



### 持久化

Redis是一个内存数据库，当Redis服务器重启后，数据会丢失

Redis持久化机制：

- RDB：默认方式，不需要配置

redis.windows.conf 大约194行

```
#   after 900 sec (15 min) if at least 1 key changed
save 900 1
#   after 300 sec (5 min) if at least 10 keys changed
save 300 10
#   after 60 sec if at least 10000 keys changed
save 60 10000
```

dump.rdb：数据保存的文件

- AOF：日志记录的方式，可以记录每一条命令的操作。每一次操作后持久化数据

redis.windows.conf

appendonly no（关闭AOF）改成 appendonly yes（开启AOF）

```
# appendfsync always  每一次记录进行持久化
appendfsync everysec  每一秒进行持久化
# appendfsync no      不进行持久化
```



### Java操作Redis：Jedis

包下载：http://www.bjpowernode.com/tutorial_redis/342.html



#### Java操作string类型

```java
@Test
public void test1() {
    //        1. 获取连接
    Jedis localhost = new Jedis("localhost", 6379);
    //        2. 命令操作
    localhost.set("username", "张三");
    String username = localhost.get("username");
    System.out.println(username);
    //        3. 关闭连接
    localhost.close();
}
```

**setex可以指定过期事件**

- 例：10秒后这个code键值会删除

```
localhost.setex("code", 10, "2F5W6AS");
```



#### Java操作哈希类型

```java
@Test
public void test3() {
    localhost.hset("student", "name", "张三");
    localhost.hset("student", "age", "18");
    localhost.hset("student", "gender", "男");
    localhost.hset("student", "classname", "5班");
    // hgetAll获取全部
    Map<String, String> student = localhost.hgetAll("student");
    // 
    Set<String> keySet = student.keySet();
    for (String s : keySet) {
        System.out.println(s + ":" + student.get(s));
    }
}
```



#### Java操作列表类型

```java
@Test
public void test4() {
    localhost.lpush("word", "2");
    localhost.lpush("word", "1");
    localhost.rpush("word", "3");
    localhost.rpush("word", "5");
    // 右边弹出一个元素
    localhost.rpop("word");
    // 获取全部
    List<String> word = localhost.lrange("word", 0, -1);
    for (String s : word) {
        System.out.println(s);
    }
}
```



#### Java操作集合类型

```java
@Test
public void test6() {
    localhost.sadd("users", "小王");
    localhost.sadd("users", "老王");
    localhost.sadd("users", "老王");

    Set<String> users = localhost.smembers("users");
    for (String user : users) {
        System.out.println(user);
    }
}
```



#### Java操作有序集合类型

```java
@Test
public void test5() {
    localhost.zadd("score", 96, "java");
    localhost.zadd("score", 91, "mysql");
    localhost.zadd("score", 1000, "创新创业");

    Set<String> score = localhost.zrange("score", 0, -1);
    for (String s : score) {
        System.out.println(s);
    }
}
```



### Jedis连接池

自带的连接池：JedisPool

```java
//        0. 创建连接池配置对象
JedisPoolConfig config = new JedisPoolConfig();
config.setMaxTotal(50);  // 配置连接池最大总连接数
config.setMaxIdle(10);  // 最大空闲数
//        1. 创建连接池
JedisPool pool = new JedisPool();
//        2. 获取连接
Jedis jedis = pool.getResource();
//        3. 命令操作
jedis.set("nickname", "嫌疑人X的身份");
String nickname = jedis.get("nickname");
System.out.println(nickname);
//        4. 归还到连接池
jedis.close();
```

- 用配置文件进行配置

jedis.properties

```
maxTotal = 50
maxIdle = 10
host = localhost
port = 6379
```

JedisTest.java

```java
public void test8() throws ClassNotFoundException, IOException {
    InputStream stream = JedisTest.class.getClassLoader().getResourceAsStream("jedis.properties");
    Properties properties = new Properties();
    properties.load(stream);
	// 从文件中读取配置数据，然后作为参数配置到JedisPoolConfig对象去
    JedisPoolConfig config = new JedisPoolConfig();
    config.setMaxTotal(Integer.parseInt(properties.getProperty("maxTotal")));
    config.setMaxIdle(Integer.parseInt(properties.getProperty("maxIdle")));
    String host = properties.getProperty("host");
    int port = Integer.parseInt(properties.getProperty("port"));

    JedisPool pool = new JedisPool(config, host, port);
    //        .....
}
```



### 案例

Ajax获取省份的数据





## Maven

> Maven 翻译为"专家"、"内行"，是 Apache 下的一个纯 Java 开发的开源项目。基于项目对象模型（缩写：POM）概念，Maven利用一个中央信息片断能管理一个项目的构建、报告和文档等步骤。
>
> Maven 是一个项目管理工具，可以对 Java 项目进行构建、依赖管理。



### 下载

1. http://maven.apache.org/download.cgi
2. 解压
3. 添加环境变量
4. cmd `mvn -v` 检查



### 仓库

默认存放JAR包的目录在settings.xml里配置

`Default: ${user.home}/.m2/repository` 例如：(`C:\Users\48536\.m2\repository`)

一般不放到系统盘，所以放到指定目录 `<localRepository>E://code/Maven_repository</localRepository>`

- 本地仓库
- 远程仓库（私服）
- 中央仓库



### 标准目录结构

- 核心代码部分：src/main/java
- 配置文件部分：src/main/resources
- 测试代码部分：src/test/java
- 测试配置文件：src/test/resources
- 页面资源(js,css)：src/main/webapp



### 默认生命周期

`mvn clean` 清除项目之前编译信息

1. `mvn compile` 编译

2. `mvn test` 编译测试文件

3. `mvn package` 打包

3. `mvn install` 安装

4. `mvn deploy` 发布



### pom.xml

#### 坐标

```xml
<dependencies>
    <dependency>
      <groupId>依赖包公司名</groupId>
      <artifactId>JAR包名</artifactId>
      <version>版本</version>
    </dependency>
</dependencies>
```

- 例如mysql驱动

```xml
<!--mysql驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.26</version>
    <scope>compile</scope>
</dependency>
```



## Java进阶之-SSM

[Java进阶之-SSM.md](./Java进阶-SSM.md)



## Java进阶之-Spring Boot

[Java进阶之-SpringBoot.md](./springboot基础.md)



## 日志

> SLF4J，即简单日志门面（Simple Logging Facade for Java），bai不du是具体的日志解决方案，它只服务于各种zhi各样dao的日志系统

依赖

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.30</version>
</dependency>
```

