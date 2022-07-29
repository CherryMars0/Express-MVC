---
title: CentOS安装Redis
date: 2022-06-17 14:59:17
categories:
- coder
- 后端
tags: 
- Linux
- CentOS
- Redis
---

## 1.下载：

```shell
     https://redis.io/
     wget http://download.redis.io/releases/redis-5.0.7.tar.gz
```

## 2.解压：

```shell
	tar -xzvf redis-5.0.7.tar.gz 
```

## 3.编译：

```shell
    yum install gcc
    yum install tcl

    cd redis-5.0.7/
    make MALLOC=libc
```

## 4.测试编译：

```shell
	make test
```

## 5.安装:

```
    mkdir /usr/local/soft/redis5
    cd /usr/local/soft/redis5/
    mkdir bin
    mkdir conf
    cd bin/
    cp /usr/local/source/redis-5.0.7/src/redis-cli ./
    cp /usr/local/source/redis-5.0.7/src/redis-server ./
    cd ../conf/
    cp /usr/local/source/redis-5.0.7/redis.conf ./
```

## 6.配置：

```shell
    vi redis.conf

    设置以下两个地方:
    # daemonize no
    daemonize yes

    # maxmemory <bytes>
    maxmemory 128MB 

```

## 7.运行：

```shell
	/usr/local/soft/redis5/bin/redis-server /usr/local/soft/redis5/conf/redis.conf
```

## 8.检测端口：

```shell
    [root@localhost conf] # netstat -anp | grep 6379

    tcp        0      0 127.0.0.1:6379          0.0.0.0:*               LISTEN      16073/redis-server  
```

## 9.加入systemd:

```shell
    vim /lib/systemd/system/redis.service

    参照修改：
    [Unit]Description=RedisAfter=network.target					             														[Service]Type=forkingPIDFile=/var/run/redis_6379
    		.pidExecStart=/usr/local/soft/r	edis5/bin/redis-server /usr/local/soft/redis5/conf/redis
    		.confExecReload=/bin/kill -s HUP $MAINPIDExecStop=/bin/kill -s QUIT $MAINPIDPrivateTmp=true
    [Install]WantedBy=multi-user.target
```

## 10.重载服务：

```shell
	systemctl daemon-reload
```

## 11.管理redis:

```shell
    启动
    systemctl start redis    
    查看状态
    systemctl status redis
    使开机启动
    systemctl enable redis
```

