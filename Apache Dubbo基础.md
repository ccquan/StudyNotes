# Apache Dubbo

> Dubbo(读音[ˈdʌbəʊ])前身是阿里巴巴公司开源的一个高性能优秀的服务框架，使得应用可通过高性能的 RPC 实现服务的输出和输入功能，可以和 Spring框架无缝集成。
>
> Dubbo是一款高性能、轻量级的开源Java RPC框架，它提供了三大核心能力：面向接口的远程方法调用，智能容错和负载均衡，以及服务自动注册和发现。



## 架构历史

### 单体架构

- 架构说明：
  全部功能集中在一个项目内（Allin one）。

- 架构优点：
  架构简单，前期开发成本低、开发周期短，适合小型项目。

- 架构缺点：

  全部功能集成在一个工程中，对于大型项目不易开发、扩展和维护。
  技术栈受限，只能使用一种语言开发。
  系统性能扩展只能通过扩展集群节点，成本高。



### 垂直架构

- 架构说明：
  按照业务进行切割，形成小的单体项目。
- 架构优点：
  技术栈可扩展（不同的系统可以用不同的编程语言编写）。
- 架构缺点：
  功能集中在一个项目中，不利于开发、扩展、维护。
  系统扩张只能通过集群的方式。
  项目之间功能冗余、数据冗余、耦合性强。



### SOA架构

> ​    面向服务的架构（SOA）是一个组件模型，它将应用程序的不同功能单元（称为服务）进行拆分，并通过这些服务之间定义良好的接口和协议联系起来。接口是采用中立的方式进行定义的，它应该独立于实现服务的硬件平台、操作系统和编程语言。这使得构件在各种各样的系统中的服务可以以一种统一和通用的方式进行交互。



### 微服务架构

- 架构说明：
  将系统服务层完全独立出来，抽取为一个一个的微服务。
  抽取的粒度更细，遵循单一原则。
  采用轻量级框架协议传输。
- 架构优点：
  服务拆分粒度更细，有利于提高开发效率。可以针对不同服务制定对应的优化方案。适用于互联网时代，产品迭代周期更短。
- 架构缺点：
  粒度太细导致服务太多，维护成本高。
  分布式系统开发的技术成本高，对团队的挑战大。



## Apache Dubbo概述

> Apache Dubbo是一款高性能java RPC框架。其前身是阿里巴巴公司开源的一个高性能、轻量级的开源测Java RPC框架，可以和Spring框架无缝集成。



### RPC

> RPC全称为remote procedure call，即远程过程调用。比如两台服务器A和B，A服务器上部署一个应用，B服务器上部署一个应用，A服务器上的应用想调用B服务器上的用提供的方法，由于两个应用不在一个内存空间，不能直接调用，所以需要通过网络来表达调用的语义和传达调用的数据。
> 需要注意的是RPC并不是一个具体的技术，而是指整个网络远程调用过程。
> RPC是一个泛化的概念，严格来说一切远程过程调用手段都属于RPC范畴。各种开发语言都有自己的RPC框架。
> Java中的RPC框架比较多，广泛使用的有RMI、Hessian、Dubbo等。

Dubbo提供了三大核心能力：面向接口的远程方法调用，智能容错和负载均衡，以及服务自动注册和发现。



### 架构图

<img src="http://dubbo.apache.org/img/architecture.png" style="zoom: 50%;" />

| 名词      | 说明                                   |
| --------- | -------------------------------------- |
| Provider  | 暴露服务的服务提供方                   |
| Consumer  | 调用远程服务的服务消费方               |
| Registry  | 服务注册与发现的注册中心               |
| Monitor   | 统计服务的调用次数和调用时间的监控中心 |
| Container | 服务运行容器                           |



## zookeeper

下载地址：http://archive.apache.org/dist/

1. 下载到Linux服务器
2. 解压文件`tar -zxvf zookeeper-3.4.6.tar.gz -C /usr/local`，并进入目录`cd /usr/local/`
3. 新建一个data目录 `mkdir data`
4. 进入conf目录，并修改zoo_sample文件名，这里也可以直接复制一份，不重命名

```
cd conf/
cp zoo_sample.cfg zoo.cfg
```

5. 修改zoo.cfg文件的`dataDir`值为刚才新建的data目录路径

```
/usr/local/zookeeper-3.4.6/data/
```

6. 进入bin目录，并启动`zkServer.sh`

```
cd /usr/local/zookeeper-3.4.6/bin/
./zkServer.sh start
```

- 停止服务：`./zkServer.sh stop`
- 查看服务运行状态：`./zkServer.sh status`



## 快速开始

项目地址：IdeaProjects/dubbo_one

### 第一步

创建一个空项目，然后创建两个模块，提供者：`provider` ，消费者： `consumer`

### 提供者配置

pom.xml

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <spring.version>5.0.5.RELEASE</spring.version>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-beans</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aspects</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jms</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context-support</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <!-- dubbo相关 -->
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>dubbo</artifactId>
      <version>2.6.0</version>
    </dependency>
    <dependency>
      <groupId>org.apache.zookeeper</groupId>
      <artifactId>zookeeper</artifactId>
      <version>3.4.7</version>
    </dependency>
    <dependency>
      <groupId>com.github.sgroschupf</groupId>
      <artifactId>zkclient</artifactId>
      <version>0.1</version>
    </dependency>
    <dependency>
      <groupId>javassist</groupId>
      <artifactId>javassist</artifactId>
      <version>3.12.1.GA</version>
    </dependency>
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>fastjson</artifactId>
      <version>1.2.47</version>
    </dependency>
  </dependencies>

  <build>
    <finalName>provider</finalName>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>2.3.2</version>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
        </configuration>
      </plugin>
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <configuration>
          <!-- 指定端口 -->
          <port>8081</port>
          <!-- 请求路径 -->
          <path>/</path>
        </configuration>
      </plugin>
    </plugins>
  </build>
```

web.xml

```xml
<!DOCTYPE web-app PUBLIC
        "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
        "http://java.sun.com/dtd/web-app_2_3.dtd" >
<web-app>
  <display-name>Archetype Created Web Application</display-name>
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext*.xml</param-value>
  </context-param>
  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>
</web-app>
```

resources/applicationContext-service.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans.xsd
         http://www.springframework.org/schema/mvc
         http://www.springframework.org/schema/mvc/spring-mvc.xsd
         http://code.alibabatech.com/schema/dubbo
         http://code.alibabatech.com/schema/dubbo/dubbo.xsd
         http://www.springframework.org/schema/context
         http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 当前应用名称，用于注册中心计算应用间依赖关系，注意：消费者和提供者应用名不要一样 -->
    <!--  提供者 -->
    <dubbo:application name="provider" />
    <!-- 连接服务注册中心zookeeper ip为zookeeper所在服务器的ip地址-->
    <!-- 我这里116.63.94.137是华为云，记得配置安全组端口开放 -->
    <dubbo:registry address="zookeeper://116.63.94.137:2181"/>
    <!-- 注册  协议和port   端口默认是20880 -->
    <dubbo:protocol name="dubbo" port="20881"></dubbo:protocol>
    <!-- 扫描指定包，加入@Service注解的类会被发布为服务  -->
    <dubbo:annotation package="cn.quan.service.impl" />
</beans>
```

cn.quan.service.TestService.java

```java
package cn.quan.service;

public interface TestService {
    public String sayHello(String name);
}
```

cn.quan.service.impl.TestServiceImpl.java

```java
package cn.quan.service.impl;

import cn.quan.service.TestService;
import com.alibaba.dubbo.config.annotation.Service;

// 注意这个Service是alibaba.dubbo提供的，不是之前的Spring提供的
@Service
public class TestServiceImpl implements TestService {
    @Override
    public String sayHello(String name) {
        return "Hello" + name;
    }
}
```



### 消费者配置

pom.xml同上，不过Tomcat那里端口要改一下，改成8082

web.xml

```xml
<!DOCTYPE web-app PUBLIC
        "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
        "http://java.sun.com/dtd/web-app_2_3.dtd" >
<web-app>
  <display-name>Archetype Created Web Application</display-name>
  <servlet>
    <servlet-name>springmvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!-- 指定加载的配置文件 ，通过参数contextConfigLocation加载 -->
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:applicationContext-web.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>springmvc</servlet-name>
    <url-pattern>*.do</url-pattern>
  </servlet-mapping>
</web-app>
```

resources/applicationContext-web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
			http://www.springframework.org/schema/beans/spring-beans.xsd
			http://www.springframework.org/schema/mvc
			http://www.springframework.org/schema/mvc/spring-mvc.xsd
			http://code.alibabatech.com/schema/dubbo
			http://code.alibabatech.com/schema/dubbo/dubbo.xsd
			http://www.springframework.org/schema/context
			http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 当前应用名称，用于注册中心计算应用间依赖关系，注意：消费者和提供者应用名不要一样 -->
    <!--  消费者 -->
    <dubbo:application name="consumer" />
    <!-- 连接服务注册中心zookeeper ip为zookeeper所在服务器的ip地址-->
    <dubbo:registry address="zookeeper://116.63.94.137:2181"/>
    <!-- 扫描的方式暴露接口  -->
    <dubbo:annotation package="cn.quan.controller" />
</beans>
```

cn.quan.service.TestService.java

```
package cn.quan.service;

public interface TestService {
    public String sayHello(String name);
}
```

cn.quan.controller.TestController.java

```java
package cn.quan.controller;

import cn.quan.service.TestService;
import com.alibaba.dubbo.config.annotation.Reference;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/hello")
public class TestController {
    // 这里是dubbo去华为云那里找Service
    @Reference
    private TestService testService;

    @RequestMapping("/sayHello")
    @ResponseBody
    public String sayHello(String name) {
        System.out.println("name:" + name);
        System.out.println(testService);
        return testService.sayHello(name);
    }
}
```



### 运行测试

两边都运行`tomcat:run`，然后访问：http://localhost:8082/hello/sayHello.do?name=Jack



## Dubbo管理控制台

地址：https://github.com/apache/dubbo-admin



### 安装

1. 将dubbo-admin-2.6.0.jar包复制到tomcat的webapps目录下
2. 然后bin/startup.bat启动tomcat

第一次启动是不成功的，等他解压后需要修改`web-info/dubbo.properties`里面的zookeeper配置

```
dubbo.registry.address=zookeeper://ip地址:2181
dubbo.admin.root.password=root
dubbo.admin.guest.password=guest
```

之后再启动。

3. 访问：http://127.0.0.1:8080/dubbo-admin-2.6.0/



## Dubbo相关配置

### 扫描

- 第一种

```
<dubbo:annotation package="cn.quan.service" />
```

- 第二种

```
<dubbo:reference id="helloService" interface="cn.quan.service.HelloService" />
```



### 协议

一般在服务提供者一方配置，可以指定使用的协议名称和端口号。

其中Dubbo支持的协议有：dubbo、rmi、hessian、http、webservice、rest、redis等。

推荐使用的是dubbo协议。

dubbo 协议采用单一长连接和 NIO 异步通讯，适合于小数据量大并发的服务调用，以及服务消费者机器数远大于服务提供者机器数的情况。不适合传送大数据量的服务，比如传文件，传视频等，除非请求量很低。

也可以在同一个工程中配置多个协议，不同服务可以使用不同的协议，例如：

```xml
<!-- 多协议配置 -->
<dubbo:protocol name="dubbo" port="20880" />
<dubbo:protocol name="rmi" port="1099" />
<!-- 使用dubbo协议暴露服务 -->
<dubbo:service interface="cn.quan.service.HelloService" ref="helloService" protocol="dubbo" />
<!-- 使用rmi协议暴露服务 -->
<dubbo:service interface="cn.quan.service.DemoService" ref="demoService" protocol="rmi" /> 
```



### 启动时检查

```xml
<dubbo:consumer check="false"/>
```

上面这个配置需要配置在服务消费者一方，如果不配置默认check值为true。Dubbo 缺省会在启动时检查依赖的服务是否可用，不可用时会抛出异常，阻止 Spring 初始化完成，以便上线时，能及早发现问题。可以通过将check值改为false来关闭检查。

建议在开发阶段将check值设置为false，在生产环境下改为true。



### 负载均衡

负载均衡（Load Balance）：其实就是将请求分摊到多个操作单元上进行执行，从而共同完成工作任务。

在集群负载均衡时，Dubbo 提供了多种均衡策略（包括随机、轮询、最少活跃调用数、一致性Hash），缺省为random随机调用。

- 消费者配置

cn.quan.controller.TestController.java

```java
@Controller
@RequestMapping("/hello")
public class TestController {
    // 这里是dubbo去云那里找随机找一个Service，减少负担
    @Reference(check = false,loadbalance = "random")
    private TestService testService;

    @RequestMapping("/sayHello")
    @ResponseBody
    public String sayHello(String name) {
        System.out.println("name:" + name);
        System.out.println(testService);
        return testService.sayHello(name);
    }
}
```

- 提供者配置

```java
@Service(loadbalance = "random")
public class TestServiceImpl implements TestService {
    @Override
    public String sayHello(String name) {
        return "Hello" + name;
    }
}
```

真实环境中，多个服务提供者是分别部署在不同的机器上，都去连接那台华为云(注册者)，然后消费者随机选一台提供者拿数据



### 事务配置

> 在类上加入事务注解后，Spring会为此类基于JDK动态代理技术创建代理对象，创建的代理对象完整类名为com.sun.proxy.$Proxy35，导致Dubbo在进行包匹配时没有成功（因为我们在发布服务时扫描的包为cn.quan.service），所以后面真正发布服务的代码没有执行

提供者配置

1. 需要配置 `proxy-target-class="true"`
2. 添加 `interfaceClass = TestService.class`

pom.xml

```xml
	<!-- 事务相关包 -->
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
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>1.3.1</version>
    </dependency>
```

applicationContext-server.xml

```xml
<!--数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" destroy-method="close">
        <property name="username" value="root" />
        <property name="password" value="root" />
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://localhost:3306/RUNOOB?useSSL=false&amp;serverTimezone=UTC" />
    </bean>
    <!-- 事务管理器  -->
    <bean id="transactionManager"
          class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--开启事务控制的注解支持-->
    <tx:annotation-driven transaction-manager="transactionManager" proxy-target-class="true"/>
```

TestService.java

```java
@Service(interfaceClass = TestService.class, protocol = "dubbo")
@Transactional
public class TestServiceImpl implements TestService {
    @Override
    public String sayHello(String name) {
        return "Hello" + name;
    }
}
```

