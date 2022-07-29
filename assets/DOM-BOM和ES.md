---
title: DOM,BOM和ES
date: 2022-06-17 18:03:20
categories:
- coder
- 前端
tags: 
- HTML
- JavaScript
---

# DOM:

	1.什么是DOM：
	
		1.DOM全称是：Document Object Model 也就是文档对象模型，是针对XML的基于树的API
		2.描述了JavaScript处理html内容的接口，是HTML和XML的API，DOM把整个页面规划成由节点层级构成的文档
		3.DOM是一种基于树的API文档，实质是API，它要求在处理过程中整个文档都表示在存储器中
	
	2.DOM在一个网页中的应用：
	
		1.DOM定义了HTMLDocument和HTMLElement作为实现操作DOM的基础，能以编程的方法操作网页中的元素（元素的增改删查），DOM把html看作是一个对象树（DOM树），html中的每个元素看作一个对象，一个Node,node可以理解为DOM中所有Object中的父类
		2.DOM的存在，就是为了操作HTML中的元素，这个API使得在网页被下载到浏览器解析后还能改变网页内容成为可能


	3.DOM体现之处：
	
		DOM为JavaScript提供了操作html的接口，为document:
	
			document:
				当浏览器下载一个网页解析后，这个网页通常是html,这个html就叫document，document通常是整个DOM树的root
				在一个浏览器中可能会有多个document,例如通过iframe加载的页面，每一个页面都是一个document
				在Javascript中，以document开头的语句几乎都是在操作DOM
	
		* 注：要想改变html中的一个元素，就是在操作html中的一个DOM节点，而改变的前提是先要得到它，得到这个元素的过程就是获取DOM中的一个节点的实现
	
	4.document中的节点：
		节点： forms location anchors images links

# BOM:

	1.什么是DOM：
	
		1.BOM全称是 Browser Object Model 浏览器对象模型，是针对为控制浏览器而产生的API文档
		2.描述了JavaScript控制浏览器的接口,是Browser的API
		3.是W3C的一个标准
	
	2.BOM在一个网页中的应用：
	
		1.BOM定义了BrowserWindow作为实现操作BOM基础，能以编程的方法控制浏览器的行为（修改窗口大小，跳转页面等），BOM把浏览器看作是一个对象，窗口内每个控件是他的对象的成员
		2.BOM的存在，一般是为了控制浏览器的行为
	
	3.DOM的体现之处：
	
		BOM为JavaScript提供了操作浏览器的接口，为window:
	
			window:
				BOM的核心是window，而window对象由具有双重角色，它既是通过JavaScript访问浏览器的一个接口，又是一个Global对象。网页中定义的任何对象，变量和函数，都是以window作为其global对象
				而BOM作为一个完整操作B/S结构网站的完整API，且window实现了BOM中定义的所有的方法。所以DOM中的document也是window中的一个成员对象，所以很明显的，BOM包含了DOM
	
	4.window中的成员和方法：
		成员：document location navigator screen history frames

# DOM和BOM的区别:

	1.DOM描述了处理网页内容的方法和接口，BOM描述了与浏览器进行交互的方法和接口
	2.DOM是BOM的一个子集，BOM包含了DOM
	3.DOM最根本的对象document是BOM最根本对象window的一个成员对象

# ES:

	1.什么是ES：
	
		1.ES全称 ECMAScript 描述了JavaScript的语法和基本对象
		2.ECMAScript是一个抽象，JavaScript只是它的一个实例，其他实例有ActionScript
		3.ECMAScript可以为不同种类的宿主环境提供核心的脚本编辑能力，即ECMAScript不与具体的宿主环境相绑定
		4.ECMAScript描述了一下内容：语法格式，数据类型，关键字，保留字，运算符，对象
	
	2.注意：
	
		1.在编写网站时用到的JavaScript是ECMAScript的一个实例，而并不是ECMAScript
		2.DOM和BOM不属于ECMAScript,所以也不属于JavaScript
		3.ECMAScript的实例不止JavaScript一个，还有ActionScript
		4.javascript由ECMAScript实例化而来，就只是起到了一个承上启下的作用
		5.BOM并不属于JavaScript,BOM只是提供接口给了JavaScript，JavaScript只不过是用其语法访问了BOM对象
