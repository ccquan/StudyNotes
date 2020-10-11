# SpringBoot基础

## 概述

- Spring Boot的设计目的是让您尽可能快地启动和运行，而无需预先配置Spring。Spring Boot以一种固定的方式来构建可用于生产级别的应用程序。
- 一般把Spring Boot称为搭建程序的脚手架或者说是便捷搭建基于Spring的工程脚手架。其最主要作用就是帮助开发人员快速的构建庞大的spring项目，并且尽可能的减少一切xml配置，做到开箱即用，迅速上手，让开发人员关注业务而非配置。



## Spring历史

- Spring1.0时代
  在此时因为jdk1.5刚刚出来，注解开发并未盛行，因此一切Spring配置都是xml格式，想象一下所有的bean都用xml配置，细思极恐啊，心疼那个时候的程序员2秒
- Spring2.0时代
  Spring引入了注解开发，但是因为并不完善，因此并未完全替代xml，此时的程序员往往是把xml与注解进行结合，貌似我们之前都是这种方式。.
- Spring3.0及以后
  3.0以后Spring的注解已经非常完善了，因此Spring推荐大家使用完全的java配置来代替以前的xml，不过似乎在国内并未推广盛行。然后当Spring Boot来临，人们才慢慢认识到java配置的优雅。



## 入门

pom.xml

需要添加`spring-boot-starter-web`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.quan</groupId>
    <artifactId>springboot</artifactId>
    <version>1.0-SNAPSHOT</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.5.RELEASE</version>
    </parent>

    <properties>
        <java-version>1.8</java-version>
    </properties>

<!--spring-boot-starter-web这个包把其它的web项目需要的包都导入进来了-->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>
```

cn/quan/Application.java

```java
package cn.quan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

cn/quan/controller/TestController.java

```java
package cn.quan.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @RequestMapping("hello")
    public String hello() {
        return "Hello SpringBoot";
    }
}
```

运行：点击 `public class Application {` 旁边的绿色三角符号



### 使用druid连接池

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&serverTimezone=UTC
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource
```



## Java配置应用

### 用Java的方式配置

1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.21</version>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.20</version>
</dependency>
```

2. 创建配置文件，用注解的方式

resources/jdbc.properties

```
jdbc.url = jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&serverTimezone=UTC
jdbc.username = root
jdbc.password = root
jdbc.driverClassName = com.mysql.cj.jdbc.Driver
```

config/JdbcConfig.java

```java
@Configuration
@PropertySource("classpath:jdbc.properties")
public class JdbcConfig {
    @Value("${jdbc.url}")
    String url;
    @Value("${jdbc.username}")
    String username;
    @Value("${jdbc.password}")
    String password;
    @Value("${jdbc.driverClassName}")
    String driverClassName;

    @Bean
    public DataSource dataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setDriverClassName(driverClassName);
        return dataSource;
    }
}
```

3. 使用：

```java
@RestController
public class TestController {
    @Autowired
    private DataSource dataSource;

    @RequestMapping("mysql")
    public List mysql() {
        JdbcTemplate jt = new JdbcTemplate(dataSource);
        List<Map<String, Object>> maps = jt.queryForList("select * from myusers");
        return maps;
    }
}
```

4. 访问：http://localhost:8080/mysql  ,可以看到返回json格式的数据回来



### 用boot属性注入配置

boot提供的 `@ConfigurationProperties` 注解可以将`application.properties`或`application.yml`文件读取到一个对象中去

1. 将 `jdbc.properties` 复制改名为 `application.properties`

2. config/JdbcProperties.java

这个prefix 就是 `jdbc.xxx` 中的 `jdbc`

```java
@ConfigurationProperties(prefix = "jdbc")
public class JdbcProperties {
    private String url;
    private String username;
    private String password;
    private String driverClassName;
    setter/getter
}
```

3. pom.xml添加

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-configuration-processor</artifactId>
	<optional>true</optional>
</dependency>
```

4. config/JdbcConfig.java

```java
@Configuration
@EnableConfigurationProperties(JdbcProperties.class)
public class JdbcConfig {
    @Bean
    public DataSource dataSource(JdbcProperties jdbcProperties) {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setUrl(jdbcProperties.getUrl());
        dataSource.setUsername(jdbcProperties.getUsername());
        dataSource.setPassword(jdbcProperties.getPassword());
        dataSource.setDriverClassName(jdbcProperties.getDriverClassName());
        return dataSource;
    }
}
```

5. TestController.java ，这个跟上面一样返回json格式数据

```java
@RestController
public class TestController {
    @Autowired
    private DataSource dataSource;

    @RequestMapping("mysql")
    public List mysql() {
        JdbcTemplate jt = new JdbcTemplate(dataSource);
        List<Map<String, Object>> maps = jt.queryForList("select * from myusers");
        return maps;
    }
}
```

6. 返回 http://localhost:8080/mysql ，成功拿到数据库数据



### yaml配置文件介绍

YAML是"YAML Ain't a Markup Language"（YAML不是一种置标语言）的缩写。

- yaml特征：

	1. 树状层级结构展示配置项；
	2. 配置项之间如果有关系的话需要分行空两格；
	3. 配置项如果有值的话，那么需要在：之后空一格再写配置项值；

- 多个yml配置文件：

  在spring boot中是被允许的。这些配置文件的名称必须为application-***yml，并且这些配置文件必须要在application.yml配置文件中激活之后才可以使用。

- 如果properties和yml配置文件同时存在在spring boot项目中：

  那么这两类配置文件都有效。在两个配置文件中如果存在同名的配置项的话会以properties文件的为主。



### yaml配置文件使用

- 将properties改成yaml

```yaml
jdbc:
  url: jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&serverTimezone=UTC
  username: root
  password: root
  driver-class-name: com.mysql.cj.jdbc.Driver
```

- 激活其它yaml

例：激活application-dev.yaml、application-test.yaml 这两个文件

```yaml
spring:
  profiles:
    active: dev, test
```



## Lombok

Lombok是用注解的方式去处理那些setter/getter构造函数等

### 安装

新版本需要在maven导入依赖才能搜到

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

设置->plugins->lombok->install



### 应用

pojo.User.java

`@data` 里面包含set/get/hashCode/toString等方法

```java
package cn.quan.pojo;

import lombok.Data;

@Data
public class User {
    private int id;
    private String name;
    private String gender;
    private int age;
    private String address;
    private String qq;
    private String email;
}
```

除了@data外，还有

`@Getter` `@Setter`  `@Slf4j`



## 整合SpringMVC

### 修改端口

application.yaml

```yaml
#修改端口
server:
  port: 80
```



### 静态资源

1. 扩展包访问`spring-boot-autoconfigure.2.1.5.RELEASE\web\ResourceProperties.class`

2. 可以看到`"classpath:/META-INF/resources/", "classpath:/resources/", "classpath:/static/", "classpath:/public/"` 这些都是boot提供存放静态资源的目录

3. 在resources创建static目录，然后把静态资源放到这里即可

4. 访问时不用带static路径



### 拦截器

1. 编写拦截器（实现HandlerInterceptor)
2. 编写配置类实现WebMvcConfigurer，在该类中添加各种组件
3. 测试

- 代码：

1. interceptor/MyInterceptor.java

```java
public class MyInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle...");
        return true;  // return false就是不通过
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle...");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion...");
    }
}
```

2. config/MvcConfig.java

```java
@Configuration
public class MvcConfig implements WebMvcConfigurer {
//    1. 注册拦截器
    @Bean
    public MyInterceptor myInterceptor() {
        return new MyInterceptor();
    }

//    2. 添加拦截器到spring mvc拦截器链
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(myInterceptor()).addPathPatterns(("/*"));  // 拦截所有，包括静态文件
    }
}
```



### 事务和连接池

1. 添加事务相关的启动器依赖，MySQL相关依赖
2. 编写业务类使用事务注解`@Transactional`
3. 这里使用默认的hikari

依赖，boot不知道我们要用的是什么数据库，所有还要添加MySQL的依赖

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.21</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

application.yaml

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: root
    url: jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&serverTimezone=UTC
```

HelloController.java

```java
@RestController
public class HelloController {
    @Autowired
    private DataSource dataSource;  // 这里直接注入依赖即可，boot已经默认配置hikari连接池了

    @GetMapping("hello")
    public String hello() throws SQLException {
        Connection connection = dataSource.getConnection();
        PreparedStatement preparedStatement = connection.prepareStatement("select * from myusers");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            int id = resultSet.getInt("id");
            String name = resultSet.getString("name");
            System.out.println("id:" + id + "--name:" + name);
        }
        return "hello springBoot";
    }
}
```



### Mybatis

1. 导入依赖

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.0.1</version>
</dependency>
```

2. application.yaml

```yaml
mybatis:
  # 别名，例cn.quan.pojo/User 别名为 user
  type-aliases-package: cn.quan.pojo
  # 映射，这里先不用，注释掉
  # mapper-locations: classpath:mappers/*.xml
```

3. Application.java

在启动入口这里添加扫描mapper的注解`@MapperScan("cn.quan.mapper")`

```java
@SpringBootApplication
@MapperScan("cn.quan.mapper")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```



### 配置通用mapper

通用mapper可以不用写SQL语句

#### tk-Mybatis

1. 依赖

```xml
<dependency>
    <groupId>tk.mybatis</groupId>
    <artifactId>mapper-spring-boot-starter</artifactId>
    <version>2.1.5</version>
</dependency>
```

2. mapper/UserMapper.java

```java
public interface UserMapper extends Mapper<User> {
}
```

3. Application.java 启动器这里要改成tk包的扫描注解

```java
import tk.mybatis.spring.annotation.MapperScan;
@MapperScan("cn.quan.mapper")
```

4. pojo/User.java

```java
@Data
// 对应的那个表的名称
@Table(name = "myusers")
public class User {
    @Id
//    主键回填：插入数据时，id是自增的，我们不知道这个对象的id值，但开启这个后会把自增的id的那个数给赋值回来给这个对象
    @KeySql(useGeneratedKeys = true)
    private int id;
    private String name;
    private String gender;
    private int age;
    private String address;
    private String qq;
    private String email;
}
```

5. service/impl/UserServiceImpl.java

```java
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User queryById(Long id) {
        User user = userMapper.selectByPrimaryKey(id);
        return user;
    }

    @Override
    public void addUser(User user) {
//        insertSelective 是选择性新增，如果没有值的属性是不会插入该列
        userMapper.insertSelective(user);
    }
}
```



- 自定义查询条件，例：查询username为tom的数据

```java
//通过example查询
Example example=new Example(User.class);
Example.Criteria criteria = example.createCriteria();
//自定义查询条件
criteria.andLike("username","tom");
//查询
List<User> users = userMapper.selectByExample(example);
System.out.println(users);
```



更多：https://blog.csdn.net/weixin_43934607/article/details/102540483



#### Mybatis-Plus

数据库表名：order 不行           orders 行

数据库列名：myName 不行    my_name 行



官网文档：https://baomidou.com/

1. 依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.0</version>
</dependency>
```

2. application.yaml

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&serverTimezone=UTC
    username: root
    password: root
```

3. 添加扫描mapper `@MapperScan("cn.quan.boot.mapper")`

```java
@SpringBootApplication
@MapperScan("cn.quan.boot.mapper")
public class BootApplication {
.....
```

4. UserMapper 继承 BaseMapper

```java
public interface UserMapper extends BaseMapper<User> {
}
```

4. 测试使用

```java
@SpringBootTest
class UserMapperTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void test1() {
        List<User> users = userMapper.selectList(null);
        System.out.println(users);
    }
}
```



- 自定义查询，例：查询username为tom的用户

```java
@Test
public void test2() {
    QueryWrapper<User> userQueryWrapper = new QueryWrapper<User>();
    userQueryWrapper.eq("username", "tom");
    User user = userMapper.selectOne(userQueryWrapper);
    System.out.println(user);
}
```



### Junit

1. 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
</dependency>
```

2. 打开`src\main\java\cn\quan\service\impl\UserServiceImpl.java` 然后生成`Test` 选`Junit4` ，选中需要测试的方法
3. test/java/xxx/UserServiceImplTest.java

**在spring boot项目中做测试类要加`@SpringBootTest`**

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceImplTest {
    @Autowired
    private UserService userService;

    @Test
    public void queryById() {
    }

    @Test
    public void addUser() {
    }
}
```



### 整合分页助手

```xml
<!-- 分页插件 -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.2.5</version>
</dependency>
```

appliation.yaml

```yaml
# 分页配置
pagehelper:
  helper-dialect: mysql
  reasonable: true
  support-methods-arguments: true
  params: count=countSql
```

controller/CourserController.java

```java
@RequestMapping("/test")
@ResponseBody
public void test(Integer page, Integer limit) {
    PageHelper.startPage(page, limit);  // 1. 初始化分页对象属性
    List<CourseOrder> courseOrders = courseService.list();  // 2. 中间件获取查询所有数据
    PageInfo<CourseOrder> pageInfo = new PageInfo<CourseOrder>(courseOrders);  // 3. 新建一个分页对象，参数是上面的User对象列表
    System.out.println("当前页：" + pageInfo.getPageNum());  // 打印
    System.out.println("每页记录数：" + pageInfo.getPageSize());  // 打印
}
```



### log4j日志

1. 依赖

```xml
<!-- 日志 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-log4j</artifactId>
    <version>1.3.8.RELEASE</version>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
        </exclusion>
    </exclusions>
</dependency> 
```

2. log4j.properties 放在resources

```properties
#LOG_DIR:/usr/local/.../logs
LOG_DIR = c:\\logs
#Level:ERROR,WARN,INFO,DEBUG
log4j.rootLogger = DEBUG,Console,FileInfo,FileError

log4j.appender.Console = org.apache.log4j.ConsoleAppender
log4j.appender.Console.Threshold = DEBUG
log4j.appender.Console.ImmediateFlush = true
log4j.appender.Console.Target = SYSTEM_OUT
log4j.appender.Console.layout = org.apache.log4j.PatternLayout
log4j.appender.Console.layout.ConversionPattern = [%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n

log4j.appender.FileInfo = org.apache.log4j.DailyRollingFileAppender
log4j.appender.FileInfo.Threshold = INFO
log4j.appender.FileInfo.ImmediateFlush = true
log4j.appender.FileInfo.Append = true
log4j.appender.FileInfo.DatePattern = '_'yyyy-MM-dd'.log'
log4j.appender.FileInfo.encoding=UTF-8
log4j.appender.FileInfo.File = ${LOG_DIR}/info
log4j.appender.FileInfo.layout = org.apache.log4j.PatternLayout
log4j.appender.FileInfo.layout.ConversionPattern = [%-5p][%d{ISO8601}]%m%n

log4j.appender.FileError = org.apache.log4j.DailyRollingFileAppender
log4j.appender.FileError.Threshold = ERROR
log4j.appender.FileError.ImmediateFlush = true
log4j.appender.FileError.Append = true
log4j.appender.FileError.DatePattern = '_'yyyy-MM-dd'.log'
log4j.appender.FileError.encoding=UTF-8
log4j.appender.FileError.File = ${LOG_DIR}/error
log4j.appender.FileError.layout = org.apache.log4j.PatternLayout
log4j.appender.FileError.layout.ConversionPattern = [%-5p][%d{ISO8601}]%m%n

log4j.appender.cn.yivi.service.pay = info,pay
log4j.additivity.cn.yivi.service.pay = false
log4j.appender.pay = org.apache.log4j.DailyRollingFileAppender
log4j.appender.pay.Threshold = WARN
log4j.appender.pay.ImmediateFlush = true
log4j.appender.pay.Append = true
log4j.appender.pay.DatePattern = '_'yyyy-MM-dd'.log'
log4j.appender.pay.encoding=UTF-8
log4j.appender.pay.File = ${LOG_DIR}/pay
log4j.appender.pay.layout = org.apache.log4j.PatternLayout

log4j.appender.pay.layout.ConversionPattern = [%-5p][%d{ISO8601}]%m%n
```

3. application.yaml

```yaml
#日志
logging:
  level:
    cn.quan.crm.dao: debug
```

`cn.quan.crm.dao` 是项目的dao路径



### Redis

1. 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

2. application.yaml

```yaml
spring:
  redis:
    host: localhost
    port: 6379
```

3. RedsTest.java

```java
package cn.quan.service.impl;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Set;

/**
 * @author quan
 * date 2020-09-12
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class RedisTest {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Test
    public void test() {
//        字符串测试
        redisTemplate.opsForValue().set("myString", "myString...");
        System.out.println("string:" + redisTemplate.opsForValue().get("myString"));

//        散列测试（key ==> value）
        redisTemplate.boundHashOps("myHash").put("name", "Tom");
        redisTemplate.boundHashOps("myHash").put("age", "18");
        System.out.println("Hash keys:" + redisTemplate.boundHashOps("myHash").keys());
        System.out.println("Hash values:" + redisTemplate.boundHashOps("myHash").values());

//        list列表测试
        redisTemplate.boundListOps("myList").leftPush("Tom");
        redisTemplate.boundListOps("myList").leftPush("John");
        List<String> list = redisTemplate.boundListOps("myList").range(0, -1);  // -1 表示最后一个
        System.out.println("list:" + list);

//        set集合测试（自动去重）
       redisTemplate.boundSetOps("mySet").add("李白", "王维", "李白");
        Set<String> mySet = redisTemplate.boundSetOps("mySet").members();
        System.out.println("set:" + mySet);

//        sorted set 有序集合测试（排序）
        redisTemplate.boundZSetOps("mySortSet").add("第二名", 2);
        redisTemplate.boundZSetOps("mySortSet").add("第一名", 1);
        redisTemplate.boundZSetOps("mySortSet").add("第三名", 3);
        Set<String> mySortSet = redisTemplate.boundZSetOps("mySortSet").range(0, -1);
        System.out.println("sortSet:" + mySortSet);
    }
}
```



## SpringBoot 解决跨域

1. 在需要跨域的方法上注解`@CrossOrigin`

```java
@CrossOrigin
@RequestMapping("/hello")
public List<User> findAll() {
    return userService.findAll();
}
```

2. 实现`WebMvcConfigurer`类，然后重写`addCorsMappings`方法

config/CorsConfig.java

```java
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        CorsRegistration corsRegistration = registry.addMapping("/*");  // 跨越的路径
        corsRegistration.allowedOrigins("*");  // 允许跨域的ip地址
        corsRegistration.allowCredentials(true);
        corsRegistration.allowedMethods("GET", "POST", "DELETE");  // 允许跨域的协议方法
        corsRegistration.maxAge(3600);
    }
}
```



## Mapping

- `@GetMapping`是一个组合注解，是@RequestMapping(method = RequestMethod.GET)的缩写。
- `@PostMapping`是一个组合注解，是@RequestMapping(method = RequestMethod.POST)的缩写
- `@RequestMapping`如果不配置method，那么允许get、post...等访问



## 视图解析器

静态文件放resources/static

模板网页文件放resources/templates

application.yaml

```yaml
spring:
  thymeleaf:
    prefix: classpath:/templates
    suffix: .html
```

`@RestController` 是不解析视图的

`@Controller` 才会去解析视图



## 打包项目

1. pom.xml添加插件

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

2. Maven->package，然后控制台会输出打包后的文件目录路径

3. 执行：`java -jar 文件名.jar`



## Spring boot插件

`JBLSpringBootAppGen` 可以快速生成application.yaml和Application.java



### 使用

右键点击src或者项目名，出现`JBLSpringBootAppGen` ，然后ok



## 新建工程

1. 文件->新建->Spring Initializr
2. 填写组、Java版本等
3. 勾选需要的依赖，例如Lombok、spring web、thymeleaf、MySQL driver



## 练习

### ems_thymeleaf练习

功能：curd、登录、注册

视频：https://www.bilibili.com/video/BV1C7411273F

代码目录：IdeaProjects\boot\ems_thymeleaf



pom.xml

```xml

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.21</version>
            <scope>runtime</scope>
        </dependency>
<!--        druid-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.20</version>
        </dependency>
<!--        mybatis-->
		<dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.0.1</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>
```



application.yaml

```yaml
# 默认的hikari连接池
#spring:
#  datasource:
#    driver-class-name: com.mysql.cj.jdbc.Driver
#    url: jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&serverTimezone=UTC
#    username: root
#    password: root
server:
  port: 80
  servlet:
    context-path: /ems
spring:
  # 使用alibaba的druid连接池
  datasource:
    url: jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&serverTimezone=UTC
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource
  resources:
    static-locations: classpath:/templates/, classpath:/static/
# mybatis要配置两个，1：mapper映射文件地址  2：实体类的别名
mybatis:
  mapper-locations: classpath:/cn/thymeleaf/ems/mapper/*.xml
  type-aliases-package: cn.thymeleaf.ems.entity
```

**cn.thymeleaf.ems.entity 小心别漏了ems写成了 cn.thymeleaf.entity**



1. thymeleaf解析

templates/login.html

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>login</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css"
          th:href="@{css/style.css}"/>
</head>
```

2. controller/ViewController

```java
@Controller
public class ViewController {
    @GetMapping("/")
    public String toIndex() {
        return "login";
    }

    @GetMapping("/login")
    public String toLogin() {
        return "login";
    }

    @GetMapping("/register")
    public String toRegister() {
        return "register";
    }
}
```

3. 访问：http://localhost/ems/   既可看到，ems这个虚拟目录是在application.yaml配置的

4. 验证码

controller/UserController.java

```java
@RequestMapping("/user")
@Controller
public class UserController {
    @GetMapping("/code")
    public void code(HttpSession session, HttpServletResponse resp) throws IOException {
        String code = ValidateImageCodeUtils.getSecurityCode();  // 1. 生成验证码字符串
        BufferedImage image = ValidateImageCodeUtils.createImage(code);  // 2. 生成验证码图片
        session.setAttribute("code", code);  // 3. 把验证码设置到session
        ServletOutputStream outputStream = resp.getOutputStream();  // 4. 获取回应对象的输出流
        ImageIO.write(image, "png", outputStream);  //5. 写出
    }
}
```

5. 创建实体类

entity/User.java

```java
@Data
public class User {
    private String id;
    private String username;
    private String realname;
    private String password;
    private String sex;
}
```

6. 编写SQL语句

dao/UserDao.java

```java
public interface UserDao {
    void save(User user);
}
```

UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="cn.thymeleaf.ems.dao.UserDao">
    <insert id="save" parameterType="User">
        insert into t_user values (#{id}, #{username}, #{realname}, #{password}, #{sex})
    </insert>
</mapper>
```

这两个要对应上，namespace<=>接口、parameterType<=>参数、id<=>方法名

7. boot自动装载mapper接口

**MapperScan一定要写对**

```java
@SpringBootApplication
@MapperScan("cn.thymeleaf.ems.dao")
public class EmsApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmsApplication.class, args);
    }
}
```



#### templates模板使用

- 数据：

EmpController.java

```java
@Controller
public class EmpController {
    @Autowired
    private EmpService empService;

    @GetMapping("/list")
    @ResponseBody
    public void list () {
        List<Emp> list = empService.list();
        System.out.println(list);
    }

//    有两种方法，方法1
//    @GetMapping("/empList")
//    public String toEmpList(Model model) {
////        ModelAndView empList = new ModelAndView("empList");
//        List<Emp> emps = empService.list();
//        model.addAttribute("emps", emps);
//        return "empList";
//    }

//    方法2
    @GetMapping("/empList")
    public ModelAndView empList() {
        ModelAndView empList = new ModelAndView("empList");
        List<Emp> emps = empService.list();
        empList.addObject("emps", emps);
        return empList;
    }
}
```

- 模板：

`th:each="item:${array}"`

日期格式化：`th:text="${#dates.format(原数据, '要格式化的格式')}"`

```html
<html xmlns:th="http://www.thymeleaf.org">
......
    <tr class="row1" th:each="emp:${emps}">
        <td>
            <span th:text="${emp.id}"></span>
        </td>
        <td>
            <span th:text="${emp.name}"></span>
        </td>
        <td>
            <span th:text="${emp.salary}"></span>
        </td>
        <td>
            <span th:text="${emp.age}"></span>
        </td>
        <td>
            <!--日期格式化-->
            <span th:text="${#dates.format(emp.bir,'yyyy-MM-dd')}"></span>
        </td>
        <a th:href="@{/emp/delete(id=${emp.id})}">删除信息</a>&nbsp;
......
```



#### 处理日期格式

https://www.cnblogs.com/weibanggang/p/9903024.html

- 这里我用的是

dao/Emp.java

```java
@Data
public class Emp {
    private String id;
    private String name;
    private BigDecimal salary;
    private Integer age;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date bir;
}
```



#### 日期注意

数据库尽量用 `datetime` 类型，不然会出现日期对不上



### 前后端分离旅游项目

视频：https://www.bilibili.com/video/BV1Nt4y127Jh



![image-20200919220349846](D:\微云备份\作品\文档\markdown\github\images\SpringBoot基础\image-20200919220349846.png)

![image-20200919220626503](D:\微云备份\作品\文档\markdown\github\images\SpringBoot基础\image-20200919220626503.png)





### 基于layui的crm后台管理

#### 技术选型

后端：SpringBoot + mybatis + MySQL

前端：layui + thymeleaf

脚手架：Spring Web Service + mysql + tyhmeleaf

**Spring Web Service 不会自动创建templates、static目录** 



#### thymeleaf使用

1. 声明

```html
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
```

2. 访问资源

   访问css

```html
<link rel="stylesheet" th:href="@{/index.css}">
```

​		访问js

```html
<script th:src="@{/layui/layui.js}" charset="utf-8"></script>
```

​		访问ico

```html
<link rel="shortcut icon" th:href="@{/favicon.ico}" type="image/x-icon" />
```

**thymeleaf不能解析 `[[`  ，要分开换行**



#### 静态资源修改不重新部署

1. 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

2. 文件->构建->编译器->自动构建项目
3. `Ctrl+Alt+Shift+/` 呼出：Registry(注册表)->找到`compiler.automake.allow.when.app.running` 然后勾选



#### 动态搜索条件

```xml
<!--  因为限制了不等于空才添加where条件，所以当不是搜索过来的是没有这个where条件 -->
<sql id="search_where">
    <where>
        <if test="condition.wechat_no != null and condition.wechat_no != ''">
            wechat_no like '%${condition.wechat_no}%'
        </if>
        <if test="condition.wechat_mark != null and condition.wechat_mark != ''">
            and wechat_mark like '%${condition.wechat_mark}%'
        </if>
        <if test="condition.qq_no != null and condition.qq_no != ''">
            and qq_no like '%${condition.qq_no}%'
        </if>
    </where>
</sql>
```



#### 打印SQL语句

application.yaml

```yaml
#日志
logging:
  level:
    cn.quan.crm.dao: debug
```

搭配 `MyBatis Log Plugin` 插件可以更方便的查看SQL语句



#### 第二季数据表设计

- 课程类别表course_category

```
id 课程id
name 课程名称
publish_date 课程发布日期
status 课程状态：1上架 0下架
course_author 课程作者
```

