# 阿里云centos搭建lnmp

### 版本

centos7

nginx1.17

mysql5.7



### Nginx

1. 安装Nginx运行所需要的插件。

- 安装gcc。gcc是Linux下的编译器，它可以编译C、C++、Ada、Object C和Java等语言。

  ```bash
  yum -y install gcc
  ```

- 安装pcre。pcre是一个perl库，Nginx的HTTP模块使用pcre来解析正则表达式。

  ```bash
  yum install -y pcre pcre-devel
  ```

- 安装zlib。zlib是一个文件压缩和解压缩的库，Nginx使用zlib对HTTP数据包进行gzip压缩和解压。

  ```bash
  yum install -y zlib zlib-devel
  ```

2. 下载Nginx安装包。

```bash
wget http://nginx.org/download/nginx-1.17.10.tar.gz
```

> 其它版本http://nginx.org/en/download.html

3. 解压Nginx安装包。

```bash
tar -zxvf nginx-1.17.10.tar.gz
```

4. 编译安装Nginx。

```bash
cd nginx-1.17.10
./configure
make && make install
```

5. 启动Nginx。

```bash
cd /usr/local/nginx/
sbin/nginx
```





### MySQL

1. 下载安装MySQL的Yum源。

```bash
wget http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql57-community-release-el7-10.noarch.rpm
```

2. 安装mysql-server。

```bash
yum -y install mysql-community-server
```

3. 启动mysql-server。

```bash
systemctl start mysqld.service
```

4. 修改默认密码。 
   + 查询root密码。

    ```bash
    grep "password" /var/log/mysqld.log
    ```
   
   + 修改root密码
   
   ```mysql
   set global validate_password_policy=0;  -- 这是密码安全等级为低，如果不是弱密码无视
   alter user root@'localhost' identified by '12345678';
   ```

+ 设置允许远程登陆MySQL

```mysql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '12345678';
```





### PHP

1. 安装PHP。

```bash
yum -y install php php-mysql php-fpm
```

2. 在nginx.conf文件中增加对PHP的支持。

```bash
vim /usr/local/nginx/conf/nginx.conf
```

进入Vim编辑器后，按下`i`键进入编辑模式，在server的根路由配置中新增`index.php`。

```nginx
location / {
      root   html;
      index  index.html index.htm index.php;
}
```

并在根路由下面新增以下配置。

```nginx
if (!-e $request_filename) {
     rewrite ^/(.*)$ /index.php/$1 last;
}

location ~ .*\.php(\/.*)*$ {
     fastcgi_pass   127.0.0.1:9000;
     include       fastcgi.conf;
     fastcgi_index  index.php;
}
```

修改后的nginx.conf文件如下图所示。

![img](https://img.alicdn.com/tfs/TB1SUj8HuH2gK0jSZFEXXcqMpXa-644-873.png)



按下`ESC`键，输入`:wq`保存并退出Vim编辑器。

3. 重启php-fpm服务。

```bash
systemctl restart php-fpm
```

4. 重启Nginx服务。

```bash
/usr/local/nginx/sbin/nginx -s reload
```

5. 检查PHP安装。

a. 在Nginx的网站根目录下创建PHP探针文件phpinfo.php。

```bash
echo "<?php phpinfo(); ?>" > /usr/local/nginx/html/phpinfo.php
```

b. 访问PHP探针页面查看是否安装成功。