---
title: Git基本操作
date: 2022-07-29 20:11:24
categories:
- coder
tags: 
- Git
---

#### Git基本操作：

```shell
#用户基本信息设置：
git config --global user.name "姓名"
git config --global user.email "邮箱"

#生成SSH：
ssh-keygen -t rsa -C "邮箱" # SSH文件存放在C:/User/用户/.ssh下，id_rsa为私钥，id_rsa.pub为公钥。

#测试SSH连接：
ssh -T git@github.com

git init  #初始化仓库
git clone {网址} #克隆仓库

git add . # 添加当前文件夹内容至待提交区

git commit -m "注释" # 将待提交的文件提交

git pull -u {仓库网址} {当前分支} # 将提交的文件添加到上传区

git push -u {仓库网址} {当前分支} # 将待上传的文件上传
```

