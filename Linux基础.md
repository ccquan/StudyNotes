# Linux常用软件

## 目录结构

![](https://www.runoob.com/wp-content/uploads/2014/06/003vPl7Rty6E8kZRlAEdc690.jpg)

以下是对这些目录的解释：

- **/bin**：
  bin是Binary的缩写, 这个目录存放着最经常使用的命令。

- **/boot：**
  这里存放的是启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件。

- **/dev ：**
  dev是Device(设备)的缩写, 该目录下存放的是Linux的外部设备，在Linux中访问设备的方式和访问文件的方式是相同的。

- **/etc：**
  这个目录用来存放所有的系统管理所需要的配置文件和子目录。

- **/home**：
  用户的主目录，在Linux中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的。

- **/lib**：
  这个目录里存放着系统最基本的动态连接共享库，其作用类似于Windows里的DLL文件。几乎所有的应用程序都需要用到这些共享库。

- **/media**：
  linux 系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。

- **/mnt**：
  系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容了。

- **/opt**：
   这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。

- **/proc**：
  这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。
  这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件，比如可以通过下面的命令来屏蔽主机的ping命令，使别人无法ping你的机器：

  ```
  echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_all
  ```

- **/root**：
  该目录为系统管理员，也称作超级权限者的用户主目录。

- **/sbin**：
  s就是Super User的意思，这里存放的是系统管理员使用的系统管理程序。

- **/selinux**：
   这个目录是Redhat/CentOS所特有的目录，Selinux是一个安全机制，类似于windows的防火墙，但是这套机制比较复杂，这个目录就是存放selinux相关的文件的。

- **/srv**：
   该目录存放一些服务启动之后需要提取的数据。

- **/sys**：

   这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。

  sysfs文件系统集成了下面3种文件系统的信息：

  针对进程信息的proc文件系统、针对设备的devfs文件系统以及针对伪终端的devpts文件系统。

  该文件系统是内核设备树的一个直观反映。

  当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统中被创建。

- **/tmp**：
  这个目录是用来存放一些临时文件的。

- **/usr**：
   这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于windows下的**program files**目录。

- **/usr/bin：**
  系统用户使用的应用程序。

- **/usr/sbin：**
  超级用户使用的比较高级的管理程序和系统守护程序。

- **/usr/src：**
  内核源代码默认的放置目录。

- **/var**：
  这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。

- **/run**：
  是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。如果你的系统上有 /var/run 目录，应该让它指向 run。



## 安装常用软件

### 安装JDK

#### 手动安装

1. 下载地址：https://www.oracle.com/cn/java/technologies/javase/javase-jdk8-downloads.html

2. ```
   cd /usr/
   mkdir java
   cd java
   ```

3. 解压 `tar -zxvf`

4. 配置环境变量(跟Windows的环境变量意思相同) `vi /etc/profile`

5. ```
   #java
   export JAVA_HOME=/usr/java/jdk1.8.0_181
   export PATH=$JAVA_HOME/bin:$PATH
   export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib
   ```

6. 验证 `java`  or `javac`



#### 手动卸载

1. 查看

```
rpm -qa | grep java
```

2. 卸载

```
rpm -e --nodeps 软件包名
```



#### yum 安装

```
yum install java-1.8.0-openjdk
yum install java-1.8.0-openjdk-devel.x86_64
```

默认目录 `/usr/lib/jvm/`



#### yum卸载

1. 查看已安装的软件

```
yum list installed | grep java
```

2. 卸载

```
yum remove 软件包名
```

java这里有两个

```
java-1.8.0-openjdk-devel.aarch64
java-1.8.0-openjdk-headless.aarch64
```





### 安装Mariadb

1.  安装客户端 `yun install mariadb`
2. 安装服务端 `yum install mariadb-server` `yum install mariadb-devel`
3. 启动服务 `systemctl start mariadb`
4.  连接 `mysql`





### 安装MySQL

1. 查看版本网站：https://dev.mysql.com/downloads/repo/yum/
2. 下载MySQL官方rpm `wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm`
3. 安装 `yum -y install mysql57-community-release-el7-10.noarch.rpm`
4. 下载 `yum -y install mysql-community-server`



### 安装Tomcat

1. `yum install tomcat`



### 安装Redis

1. 安装gcc环境 `yum install -y gcc`
2. Redis 下载网站：https://redis.io/download
3. 下载Redis

```bash
wget http://download.redis.io/releases/redis-6.0.8.tar.gz
```

4. 解压 `tar xzf redis-6.0.6.tar.gz`
5. 进入目录后编译 `make`
6. 编译后进入`src`目录，启动`./redis-server` 服务端，回车
7. 启动客户端测试：`./redis-cli` 



### 安装Nginx

1. `yum install nginx`
2. 启动 `systemctl start nginx`
3. 配置文件：`/etc/nginx/nginx.conf`
4. 默认站点目录：`/usr/share/nginx/html`



#### 配置多站点

`nginx.conf`：

```
server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  aaa.baidu.com;  # 域名1
        root         /usr/share/nginx/aaa;  # 站点的资源目录

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  bbb.baidu.com;  # 站点2
        root         /usr/share/nginx/bbb;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```



#### 反向代理

1. 添加upstream
2. 把root注释，添加proxy_pass 然后值是项目名

```
upstream tomcat_travel(项目名) {
    server 127.0.0.1:8080;
}
server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  proxy.baidu.com;  # 站点
        # root         /usr/share/nginx/html;
		proxy_pass http://tomcat_travel;
        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```



#### 负载均衡

1. 将Tomcat复制好几份，修改成不同的端口
2. 在上面的基础上修改
3. weight 表示权重 这里的8080修改成2表示占50% 8081占25% 8082占25%

```
upstream tomcat_travel(项目名) {
    server 127.0.0.1:8080 weight=2;
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
}
```

