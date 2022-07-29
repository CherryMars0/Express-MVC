---
title: web开发环境总成
date: 2022-07-27 20:18:22
categories:
- coder
- 前端
tags:
- DevelopmentEnvirment
---

### 1. 前言

现如今web产业发展正值高峰，各种框架库和新概念层出不穷，使得我们在开发过程中对技术结构和代码框架的更新迭代而应接不暇，在自由开发过程中有时还会产生对技术本身的迷茫。但是web的根本还是在服务业上，web不过是将服务业延伸到了互联网的层面。故吾开发时不能一味追求技术的提升，而脱离服务业需求的基石。技术应该服务于开发者，而开发者不应该受技术进步的拖累。技术的进步是一把双刃剑，良性的技术进步会推动人类文明的发展。而只为选拔人才和淘汰人才而产生的技术进步只会平白浪费社会生产力，增加不必要的内耗，污染整个生产体系，阻碍人类精神文明的进步。

为了面对日益复杂的开发环境，我将在web开发中遇到的各种开发模式和技术架构做一个总结，以便我在今后的工作和学习生活中参考。

### 2. web开发技术栈

web开发基于B/S(浏览器/服务器)模式，针对浏览器页面的开发属于前端开发，针对服务器程的开发属于后端开发。根据前端开发和后端开发的复杂度以及具体业务的需求，可以将web开发技术栈总结为以下四种：

#### 	2.1 小前端&小后端：

这是web开发目前最常用的一种前后端分离的开发模式，前端负责整个网页的功能，后端负责数据的调度和运算，适合用于中小型的后期会持续开发且前后端逻辑都较为复杂的项目。

`小前端所使用的技术`:HTML，CSS，JS(原生JS,Vue,React,Angular)，chart.js，mathJax.js

`小后端所使用的技术`:JAVA（servlet，Spring族，MyBatis族，Tomcat），golang，django，Python，C++/C + nginx

---

#### 	2.2 大前端：

大前端中将不存在前端与后端的概念区分，负责前端功能的代码与负责后端功能的代码耦合在一起,并且大前端专注于前端页面功能的实现，而后端逻辑相对简单。适合于微小型后端交互逻辑简单，前端功能复杂的项目。

`大前端所使用的技术`:HTML，CSS(各种UI库)，JS(Vue,React,Angular)，chart.js，mathJax.js，konva.js，three.js + Node.js(原生JS,express)，Nginx，Apache

`跨平台`：Cordova/phoneGap，ReactNative，Weex，微信小程序，PWA，Flutter，Picasso，快应用

---

#### 	2.3 大后端：

大后端与大前端同样不存在前端与后端的概念区分，而相较于大前端不同的是，大后端专注于后端复杂逻辑的实现，而前端页面较于简易。适合于微小型后端交互复杂，前端功能简易的项目。

`大后端所使用的技术`:PHP，ASP(.NET)，JSP(JAVA) + Tomcat，Apache

---

#### 	2.4 大前端&大后端：

这是web网络的终极实现方式，同样是前后端分离的模式，而前端不再局限与页面功能的实现，而是负责整个前端页面的渲染和呈现，后端也不再仅仅负责前端对后端复杂逻辑数据的需求，还要兼顾高并发，快速缓存，多线程，分布式等更高层次的要求。适合大型和超大型的结构功能丰富，有大流量访问需求的项目。

`大前端所使用的技术`：

​	`页面功能`：HTML，CSS(各种UI库)，JS(JQuery,Vue,React,Angular ...)，chart.js，mathJax.js，konva.js，three.js

​	`页面渲染`：Nuxt，Templete(Templete.js,Wukong.js,Handlebars.js ...)，Node.js(express)

​	`页面多线程`：Web-Worker

​			......

`大后端所使用的技术`：

​	`前端需求`：JAVA（Spring族，MyBatis族，Tomcat，nginx，Apache），golang，django，C++/C

​	`负载均衡`: Nginx，Tomcat，Apache

​	`多线程`：开发语言（JAVA,GO,C/C++,django）多线程优化

​	`高并发`：负载均衡优化，CDN，快速缓存，数据库优化，多线程，Tomcat优化

​	`分布式`：XML，负载均衡，Tomcat集群，k8s+Docker集群

​	`快速缓存`：服务器端缓存（Redis），代理服务器端缓存，客户端缓存

​	`监控`：Zabbix，Prometheus

​	`容器`：Docker，kubernetes

​			......

---

以上大概总结了4钟技术栈，以及这四种技术栈适合的开发场景，这四种技术栈涵盖了所有的开发模式。根据技术对事不对人的原则，任何开发者都应该泛化，不能以任何技术栈来具体开发者，只有狭义的项目存在技术栈之分，进而使得我们可以根据开发者要开发的项目的规模，来确定相应的技术栈，以减少开发周期和开发难度。

### 3. web开发架构

<img src="https://raw.githubusercontent.com/CherryMars0/blog-img/main/web%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84.png" />

