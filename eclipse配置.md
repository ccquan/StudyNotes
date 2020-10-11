# eclipse配置

## 配置Maven

1. Windows->Maven->User Settings->Gbloal Settings->Browse找到自己的maven的settings.xml

2. Windows->Maven->Installations->Add->选择自己的maven根目录例如：`C:\Program Files\Maven\apache-maven-3.6.3` ->finish -> 勾选



### 添加Maven快捷创建

Window->Perspective->Customize Perspective->Shortcuts->勾选Maven



### 创建Maven工程

1. file->other->Maven Project->填好名称->finish->JRE System Library右键->property->选择JavaSE-1.8（或者选择Workspace default JRE1.8）
2. 修改setting.xml ，在`profiles` 标签里面添加下面的

```xml
    <profile>
      <id>jdk-1.8</id>
      
      <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
      </activation>
      
      <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
      </properties>  
      
    </profile>
```



### 创建Maven Web工程

1. 同上，不过要选war
2. 右键项目名->Build Path->Configure Build Path->Project Facets->取消勾选Dynamic Web Module，然后再重新勾选->下面会出现一个超链接，点击->勾选Generate web.xml....->目录选`src/main/webapp` -> ok

- Eclipse工程属性没有Project Facets选项解决方法：
  安装插件Help-Install New Software
  输入http://download.eclipse.org/releases/oxygen ，选择Web, XML, Java EE and OSGi Enterprise Development 安装即可。

2. servers窗口->Apache->tomcat v8.5（不必一样，选对应的就行）->next->选择tomcat根目录->选择JRE

- servers窗口不存在解决方法：

  Windows->Show View->Other->搜索servers

3. 搞定第二部后会报错，右键项目名->Build Path->Configure Build Path->Libraries->add Library->Server Runtime->选择tomcat->apply

4. 修改jsp默认编码:windows->搜索jsp->修改Encoding，选择utf-8



### 创建Maven 父工程

1. 同上，不过要选pom
2. 创建子工程，创建maven model->选择好parent project
3. 测试：父pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>cn.gdgm</groupId>
  <artifactId>parent</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>pom</packaging>
  <modules>
  	<module>son1</module>
  </modules>
  
  <dependencyManagement>
    <dependencies>
      <dependency>
        <artifactId>junit</artifactId>
        <groupId>junit</groupId>
        <version>4.12</version>
        <scope>test</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>
</project>
```

子工程

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>cn.gdgm</groupId>
    <artifactId>parent</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>son1</artifactId>
  
  <dependencies>
    <dependency>
      <artifactId>junit</artifactId>
      <groupId>junit</groupId>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
```

子工程不用导入版本，用的是父工程的版本



### 导入导出工程

- 导出：file->export->general->file system
- 导入：open projects from file system



## Git

如果之前没用过的话要：preferences->Team->Configuration->User Setting->add Entry 添加相关配置



### 创建Git项目

右键项目->Team->Share Project->勾选Use of creat...-> 点击Create Repository



### 添加到暂存区

右键项目->Team->Add to Index



### commit

右键项目->Team->Commit



### 配置忽略文件

myJava.gitignore

```
# Compiled class file
*.class

# Log file
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*

# I added
.classpath
.project
.settings
target
```

- 添加到全局配置

```
[core]
	excludesfile = C://Users/48536/myJava.gitignore
```



### 切换版本

右键项目->Team->show history->选中需要切换的版本右键->Reset->Hard



### 创建合并分支

右键项目->Team->Switch To->New Branch->输入分支名->finish

- 合并分支

先切换到master分支，然后右键项目->Team->merge->选择分支->finish



### 上传远程仓库

将远程地址粘贴到`Location` -> 填写账号密码 -> 勾选Store in Secure Store可以保存账号密码 -> next -> finish



### 冲突

1. push到远程如果有冲突要pull，然后处理好后在push
2. 分支合并如果有冲突要处理好后在合并



### 克隆

file -> Import -> projects from Git -> Clone URI -> 选中需要导入的分支(master) -> next

**带`with smart import` 的表示智能导入，可以自动创建Maven工程、模板、标识资源等**



