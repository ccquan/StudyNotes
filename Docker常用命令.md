# Docker常用命令

中文文档：https://yeasy.gitbooks.io/docker_practice/content/

## 配置国内镜像源

### Windows

1. settings -> Docker engine

2. 下面的json，修改registry-mirrors为阿里镜像源

   ```json
   "registry-mirrors": ["https://zzq8umh5.mirror.aliyuncs.com"]
   ```

   或者使用网易和百度的，优点：不用账号登录

   ```json
   "registry-mirrors": [
       "https://mirror.baidubce.com",
       "https://hub-mirror.c.163.com"
   ]
   ```

3. 点击`Apply & Restart`

4. cmd `docker info` 检查是否成功输出



## 修改镜像存放地址

1. settings -> Resources -> Disk image location



## hello world

测试docker

1. `docker pull hello-world`
2. `docker run hello-world`



