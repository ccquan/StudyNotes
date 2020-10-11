# Maven进阶

## 基础知识回顾

### 仓库类型

- 本地仓库
- 远程仓库
  - Maven
  - Maven私服（公司局域网内的仓库，需要自己搭建）
  - 其它公共仓库（例如阿里云：https://maven.aliyun.com/repository/public）

#### 常用命令

- clean：清理
- compile：编译
- test：测试（会自动执行单元测试）
- package：打包
- install：安装



#### 依赖范围

| 范围          | 对于编译class path有效 | 对于测试class path有效 | 对于运行时class path有效 | 例子                        |
| ------------- | ---------------------- | ---------------------- | ------------------------ | --------------------------- |
| compile(默认) | Y                      | Y                      | Y                        | spring-core                 |
| test          | -                      | Y                      | -                        | Junit                       |
| provided      | Y                      | Y                      | -                        | servlet-api                 |
| runtime       | -                      | Y                      | Y                        | JDBC驱动                    |
| system        | Y                      | Y                      | -                        | 本地的，Maven仓库之外的类库 |



## 依赖传递

spring-webmvc依赖spring-aop、spring-beans、spring-core....这种关系就叫依赖传递



### 解决依赖冲突

例如webmvc用的是4.0的版本，它所依赖的是4.0的spring-beans，但我的spring-aop用的是5.0的版本，它所依赖的是5.0的spring-beans，这就造成了依赖冲突

#### 使用Maven提供的依赖调解原则

- 第一声明者优先原则：把高版本的移到低版本上面去，这样下面就算要4.0的他发现已经加载有5.0的了，就不会用旧版本了
- 路径进者优先原则：把依赖版本弄成dependency



#### 排除依赖

exclusions标签

```xml
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-webmvc</artifactId>
  <version>4.1.2</version>
  <exclusions>
    <excclusion>
      <groupId>org.springframework</groupId>
      <artifactId>spring-beans</artifactId>
    </excclusion>
  </exclusions>
</dependency>
```

这样就会排除spring-webmvc依赖的spring-beans了



#### 锁定版本(常用)

版本锁定并不会加载Jar包，引用时才加载

1. 在dependencyManagement标签中锁定依赖版本
2. 在dependencies标签中声明需要导入的Maven坐标

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-beans</artifactId>
      <version>5.0.5</version>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>4.1.2</version>
    </dependency>
</dependencies>
```



## Maven构建SSM

1. 添加一个Maven Property

Name=archetypeCatalog  value=internal

这个表示从本地加载插件





## 分模块

  在企业项目开发过程中，由于项目规模庞大，业务复杂，参与的人员比较多，一般会通过合理的模块拆分将一个大型的项目拆分为N多个小模块，分别进行开发。而且拆分出的模块可以非常容易的被其他模块复用。



### 常用的拆分方法

第一种：按照业务模块进行拆分，每个模块拆分成一个maven工程，例如将一个项目分为用户模块、订单模块、购物车模块等，每个模块对应就是一个maven工程

第二种：按照层进行拆分，例如持久层、业务层、表现层等，每个层对应就是一个maven工程





父类：之前是war的方式打包的，现在要用`pom`方式打包

```xml
<groupId>cn.quan</groupId>
<artifactId>Maven_advance</artifactId>
<version>1.0-SNAPSHOT</version>
<packaging>pom</packaging>
```

子类：创建模块那里选择`父项`

```xml
<parent>
    <artifactId>Maven_advance</artifactId>
    <groupId>cn.quan</groupId>
    <version>1.0-SNAPSHOT</version>
</parent>
<modelVersion>4.0.0</modelVersion>

<groupId>cn.quan.son</groupId>
<artifactId>son</artifactId>
```



### 聚合

```xml
<modules>
    <module>登录子模块</module>
    <module>注册子模块</module>
</modules>
```



### 工程练习

三个模块

maven_dao

```xml
spring全家桶
```



maven_service

```xml
<dependencies>
    <dependency>
        <groupId>cn.quan</groupId>
        <artifactId>maven_dao</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
</dependencies>
```



maven_web

```xml
<dependencies>
    <dependency>
        <groupId>cn.quan</groupId>
        <artifactId>maven_service</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
</dependencies>
```



父工程：版本锁定



## Maven私服

### Nexus配置

环境：nexus-3

1. 下载Oracle的jar包：https://www.sonatype.com/download-oss-sonatype
2. 进入nexus-3.26.1-02-win64\nexus-3.26.1-02\bin
3. 用管理员CMD运行`nexus.exe /run`

run是临时性的，也可以将nexus配置成服务，像MySQL那样

```powershell
nexus.exe /install <optional-service-name> //安装服务   
(optional-service-name是服务别名，默认是nexus)
nexus.exe /uninstall //卸载服务
 
nexus.exe /start <optional-service-name> //启动服务
nexus.exe /stop <optional-service-name>  //停止服务
```

4. 打开`localhost:8081`
5. 登录管理员账户，用户名`admin`，密码在`nexus-3.26.1-02-win64\sonatype-work\nexus3\admin.password`中查看

> proxy【代理资源库】：就是配置了外网的maven远程仓库地址的资源库，本地找不到，就会通过代理资源库中的地址，找到远程仓库，从远程仓库中下载所需要的jar。
>
> hosted【托管资源库】：就是放在本地的资源库，零零散散的jar，从远程仓库中下不到，只能自己在网上找，找到jar下载下来，放在托管资源库中，交给nexus统一管理。不然哪天想去用连接数据库的jar包，还得自己翻磁盘，多麻烦。
>
> group【组资源库】　：从上面①+②看出来，其实组资源库中并没有jar包，而是把代理资源库和托管资源库统一配置到组资源库中，然后组资源库作为一个唯一的public提供给所有人使用。就像工人1+工人2把自己的账单统一给包工头，让包工头去跟老板结账是一个道理

更多：https://www.cnblogs.com/kongweifeng/p/9369936.html

在maven的settings.xml配置文件中`servers`标签里配置第三方仓库的server信息

```xml
<server>
    <id>3rd_part</id>
    <username>chen</username>
    <password>chen888</password>
</server>
```



### 新建第三方仓库

1. 新建第三方仓库

   点击 `Create repository` 名字叫3rd_part ，选择**maven2(hosted)**

2. `Deployment policy` 选择允许

3. `Blob store` 选择之前的自己创建的或者默认存储桶

4. 点开`maven-public` ，然后`Group`哪里移动到`Numbers`去



### 安装第三方jar包

安装后是存放在settings.xml设置的本地仓库里

1. 进入第三方jar包目录，打开命令行

```powershell
mvn install:install-file -Dfile=ojdbc6-11.2.0.1.0.jar -DgroupId=com.oracle -DartifactId=ojdbc11 –Dversion=11.2.0.1.0 -Dpackaging=jar
```



### 上传第三方jar包到私服

1. settings.xml设置

```xml
<server>
    <id>3rd_part</id>
    <username>chen</username>
    <password>chen888</password>
</server>
```

2. 进入第三方jar包目录，打开命令行

```powershell
mvn deploy:deploy-file -Dfile=ojdbc6-11.2.0.1.0.jar -DgroupId=com.oracle -DartifactId=ojdbc11 -Dversion=11.2.0.1.0 -Dpackaging=jar -Durl=http://localhost:8081/repository/3rd_part/ -DrepositoryId=3rd_part
```

！可以可以用浏览器上传：http://localhost:8081/#browse/upload

