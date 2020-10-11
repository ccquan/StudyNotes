# Git基础

## 设置初始化环境

- 设置用户信息

与GitHub或码云的身份无关，是本地标志的身份

```powershell
git config --global user.name "nickname"
git config --blobal user.email "admin@qq.com"
```

- 查看配置信息

```powershell
git config --list
git config user.name
```

- 清除用户信息

```powershell
git config --global --unset user.name "nickname"
git config --global --unset user.email "admin@qq.com"
```



## 获取Git仓库

### 本地

```
git init
```



### 远程

```
git clone https://gitee.com/用户名/仓库名.git
```



## 绑定远程仓库

GitHub和Gitee远程仓库共存

1. 打开`~/.ssh`目录，输入下面命令，回车两次

```
ssh-keygen -t rsa -C "GitHub邮箱" -f "github_id_rsa"
```

```
ssh-keygen -t rsa -C "Gitee邮箱" -f "gitee_id_rsa"
```

2. 用文本模式打开`xxx_id_rsa.pub`，复制粘贴到对应远程平台上

Gitee的SSH设置：https://gitee.com/profile/sshkeys

GitHub的SSH设置：https://github.com/settings/keys

3. 新建`config`文件，并添加一下内容

```
# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitee_id_rsa

# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_id_rsa
```



## 本地仓库操作

### 添加文件到暂存区

```
git add 文件名
git add *.txt
```

- 强行添加文件，忽视`.gitignore`文件里匹配的要求

```
git add * -f
```



### 删除文件

执行rm命令后文件还在暂存区，真正删除需要`commit`一下

```
git rm 文件名
```

- 手动删除

用资源管理器删除后是不在暂存区的，需要`rm 文件名`或`add 文件名`一下



### 提交文件

```
git commit -m '提交说明'
```



### 修改commit的message

1. 修改最近一次的commit 信息

```
git commit --amend
```

　　然后就会进入vim编辑模式

2. 然后修改



### 查看状态

```
git status
git status -s
```



### 忽略列表

创建一个`.gitignore`文件，然后里面匹配的文件将不会被跟踪

```
# #表注释， 下面.a的文件都忽略(不会被跟踪)
*.a
# !表例外，下面是lib.a不忽略(要跟踪)
!lib.a
# 下面表conf目录下的都忽略
conf/
# 下面表doc目录下的.txt的文件都忽略
/doc/*.txt
```

Windows系统要用命令才能创建

git:`touch .gitignore`

cmd:`echo #ignore >> .gitignore`



### 查看日志记录

```
git log
```



## 远程仓库操作

### 查看

```
git remote
```

- 查看更详细

```
git remoute -v
```



### 添加

```
git remote add <shortname> <url>
```

- 例如

```
git remote add origin https://github.com/ccquan/private_test1.git
```



### 克隆

```
git clone <url>
```



### 解绑

```
git remote rm <shortname>
```



### 抓取

fetch从远程仓库抓取到本地，但不会自动merge

```
git remote add origin <url>
git fetch origin master
```

手动merge

```
git merge origin/master
```



### 拉取

pull从远程仓库抓取到本地，会自动merge

```
git pull <url>
```

- 强制拉取

```
git pull <url> --allow-unreleted-histories
```

此操作会进入日志信息编辑窗口，按`:wq`保存退出即可



### 推送

```
git push [远程名] [分支名]
```



## 分支操作

### 查看

绿色和星号表示当前所处于的分支

- 查看所有本地分支

```
git branch
```

- 查看所有远程分支

```
git branch -r
```

- 查看所有本地和远程分支

```
git branch -a
```



### 创建

```
git branch <分支名>
```



### 切换

```
 git checkout <分支名>
```



### 合并

```
git checkout master
git merge b1
```

需要切换到要合并的分支，例如主分支，这样就是将`b1`分支合并到主分支

如果分支的文件冲突了，需要修改调整后再`add 和 commit` 一下



### 删除

- 删除本地分支

```
git branch -d <分支名>
```

- 强制删除

```
git branch -D <分支名>
```

- 删除远程分支

```
git push origin -d <分支名>
```



## 标签操作

### 查看

```
git tag
```

- 查看更详细

```
git show
```



### 创建

```
git tag <标签名>
```



### 推送

```
git push <远程名> <标签名>
```



### 检出

新建一个分支，指向某个tag

```
git checkout -b <分支名> <标签名>
```



### 删除

- 删除本地标签

```
git tag -d <标签名>
```

- 删除远程标签

```
git push <远程名> :refs/tags/<标签名>
```

- 例如

```
git push origin :refs/tags/v0.1
```



## 图形化Git软件

tortoise：https://tortoisegit.org/download/



## IDEA中使用Git

### 初始化配置

文件->设置->版本控制->Git->Git执行路径

配置Git的路径，默认idea会自己检测得到，点测试可查看是否成功



### 新建仓库

- 新建本地仓库：VCS->导入版本控制->创建Git存储库

- 从远程仓库克隆：关闭全部项目->从版本控制获取->输入URL->克隆




### 常用操作

- 常用的忽略文件

```
/src/main/resources/
.idea/
Git_test.iml
target/
```

- 推送

VCS->Git->推送 ，也可以快捷键`Ctrl + Shift + k`

定义远程仓库，粘贴远程URL地址过去



- 拉取

  - 蓝色那个更新项目

  - VCS->Git->拉取



- 版本对比

右键->Git->与..对比



- 创建分支

VCS->Git->分支->新建分支



- 切换分支

VCS->Git->分支->选定要切换的分支->检出



- 合并分支

VCS->Git->合并更改

