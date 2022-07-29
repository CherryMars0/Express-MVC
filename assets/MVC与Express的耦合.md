---
title: MVC与Express的耦合
date: 2022-06-22 11:38:52
categories:
- coder
- 全栈
tags:
- MVC
- NodeJS
- Express
---

# 1.MVC模型在Express中适用性的探究	

<svg id="SvgjsSvg1114" width="707.4375" height="460.578125" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs">
    <defs id="SvgjsDefs1115">
        <marker id="SvgjsMarker1148" markerWidth="14" markerHeight="10" refX="10" refY="5" viewBox="0 0 14 10" orient="auto" markerUnits="userSpaceOnUse" stroke-dasharray="0,0">
            <path id="SvgjsPath1149" d="M0,0 L14,5 L0,10 L0,0" fill="#323232" stroke="#323232" stroke-width="1"></path>
        </marker>
        <marker id="SvgjsMarker1152" markerWidth="14" markerHeight="10" refX="10" refY="5" viewBox="0 0 14 10" orient="auto" markerUnits="userSpaceOnUse" stroke-dasharray="0,0">
            <path id="SvgjsPath1153" d="M0,0 L14,5 L0,10 L0,0" fill="#323232" stroke="#323232" stroke-width="1"></path>
        </marker>
        <marker id="SvgjsMarker1156" markerWidth="14" markerHeight="10" refX="10" refY="5" viewBox="0 0 14 10" orient="auto" markerUnits="userSpaceOnUse" stroke-dasharray="0,0">
            <path id="SvgjsPath1157" d="M0,0 L14,5 L0,10 L0,0" fill="#323232" stroke="#323232" stroke-width="1"></path>
        </marker>
        <marker id="SvgjsMarker1160" markerWidth="14" markerHeight="10" refX="10" refY="5" viewBox="0 0 14 10" orient="auto" markerUnits="userSpaceOnUse" stroke-dasharray="0,0">
            <path id="SvgjsPath1161" d="M0,0 L14,5 L0,10 L0,0" fill="#323232" stroke="#323232" stroke-width="1"></path>
        </marker>
        <marker id="SvgjsMarker1170" markerWidth="14" markerHeight="10" refX="10" refY="5" viewBox="0 0 14 10" orient="auto" markerUnits="userSpaceOnUse" stroke-dasharray="0,0">
            <path id="SvgjsPath1171" d="M0,0 L14,5 L0,10 L0,0" fill="#323232" stroke="#323232" stroke-width="1"></path>
        </marker>
        <marker id="SvgjsMarker1180" markerWidth="14" markerHeight="10" refX="10" refY="5" viewBox="0 0 14 10" orient="auto" markerUnits="userSpaceOnUse" stroke-dasharray="0,0">
            <path id="SvgjsPath1181" d="M0,0 L14,5 L0,10 L0,0" fill="#323232" stroke="#323232" stroke-width="1"></path>
        </marker>
        <marker id="SvgjsMarker1184" markerWidth="14" markerHeight="10" refX="10" refY="5" viewBox="0 0 14 10" orient="auto" markerUnits="userSpaceOnUse" stroke-dasharray="0,0">
            <path id="SvgjsPath1185" d="M0,0 L14,5 L0,10 L0,0" fill="#323232" stroke="#323232" stroke-width="1"></path>
        </marker>
    </defs>
    <g id="SvgjsG1116" transform="translate(25.008928571428555,213.29464285714295)">
        <path id="SvgjsPath1117" d="M 0 0L 100 0L 100 70L 0 70Z" stroke="rgba(50,50,50,1)" stroke-width="2" fill-opacity="1" fill="#ffffff"></path>
        <g id="SvgjsG1118">
            <text id="SvgjsText1119" font-family="微软雅黑" text-anchor="middle" font-size="13px" width="80px" fill="#323232" font-weight="400" align="middle" lineHeight="125%" anchor="middle" family="微软雅黑" size="13px" weight="400" font-style="" opacity="1" y="24.375" transform="rotate(0)">
                <tspan id="SvgjsTspan1120" dy="16" x="50">
                    <tspan id="SvgjsTspan1121" style="text-decoration:;">Application</tspan>
                </tspan>
            </text>
        </g>
    </g>
    <g id="SvgjsG1122" transform="translate(424.3422619047618,25.0089285714284)">
        <path id="SvgjsPath1123" d="M 0 0L 100 0L 100 70L 0 70Z" stroke="rgba(50,50,50,1)" stroke-width="2" fill-opacity="1" fill="#ffffff"></path>
        <g id="SvgjsG1124">
            <text id="SvgjsText1125" font-family="微软雅黑" text-anchor="middle" font-size="13px" width="80px" fill="#323232" font-weight="400" align="middle" lineHeight="125%" anchor="middle" family="微软雅黑" size="13px" weight="400" font-style="" opacity="1" y="24.375" transform="rotate(0)">
                <tspan id="SvgjsTspan1126" dy="16" x="50">
                    <tspan id="SvgjsTspan1127" style="text-decoration:;">View</tspan>
                </tspan>
            </text>
        </g>
    </g>
    <g id="SvgjsG1128" transform="translate(173.58035714285575,208.29464285714295)">
        <path id="SvgjsPath1129" d="M 0 40L 60 0L 120 40L 60 80Z" stroke="rgba(50,50,50,1)" stroke-width="2" fill-opacity="1" fill="#ffffff"></path>
        <g id="SvgjsG1130">
            <text id="SvgjsText1131" font-family="微软雅黑" text-anchor="middle" font-size="13px" width="100px" fill="#323232" font-weight="400" align="middle" lineHeight="125%" anchor="middle" family="微软雅黑" size="13px" weight="400" font-style="" opacity="1" y="29.775" transform="rotate(0)">
                <tspan id="SvgjsTspan1132" dy="16" x="60">
                    <tspan id="SvgjsTspan1133" style="text-decoration:;">MVC</tspan>
                </tspan>
            </text>
        </g>
    </g>
    <g id="SvgjsG1134" transform="translate(424.34226190476176,130.6279761904764)">
        <path id="SvgjsPath1135" d="M 0 0L 100 0L 100 70L 0 70Z" stroke="rgba(50,50,50,1)" stroke-width="2" fill-opacity="1" fill="#ffffff"></path>
        <g id="SvgjsG1136">
            <text id="SvgjsText1137" font-family="微软雅黑" text-anchor="middle" font-size="13px" width="80px" fill="#323232" font-weight="400" align="middle" lineHeight="125%" anchor="middle" family="微软雅黑" size="13px" weight="400" font-style="" opacity="1" y="24.375" transform="rotate(0)">
                <tspan id="SvgjsTspan1138" dy="16" x="50">
                    <tspan id="SvgjsTspan1139" style="text-decoration:;">Model</tspan>
                </tspan>
            </text>
        </g>
    </g>
    <g id="SvgjsG1140" transform="translate(424.3422619047618,365.5803571428582)">
        <path id="SvgjsPath1141" d="M 0 0L 100 0L 100 70L 0 70Z" stroke="rgba(50,50,50,1)" stroke-width="2" fill-opacity="1" fill="#ffffff"></path>
        <g id="SvgjsG1142">
            <text id="SvgjsText1143" font-family="微软雅黑" text-anchor="middle" font-size="13px" width="80px" fill="#323232" font-weight="400" align="middle" lineHeight="125%" anchor="middle" family="微软雅黑" size="13px" weight="400" font-style="" opacity="1" y="24.375" transform="rotate(0)">
                <tspan id="SvgjsTspan1144" dy="16" x="50">
                    <tspan id="SvgjsTspan1145" style="text-decoration:;">Controller</tspan>
                </tspan>
            </text>
        </g>
    </g>
    <g id="SvgjsG1146">
        <path id="SvgjsPath1147" d="M126.00892857142827 248.29464285714295L149.294642857142 248.29464285714295L149.294642857142 248.29464285714295L169.98035714285575 248.29464285714295" stroke="#323232" stroke-width="2" fill="none" marker-end="url(#SvgjsMarker1148)"></path>
    </g>
    <g id="SvgjsG1150">
        <path id="SvgjsPath1151" d="M262.1852379325107 226.67459272327656L262.1852379325107 60.00892857142833L420.7422619047618 60.00892857142833" stroke="#323232" stroke-width="2" fill="none" marker-end="url(#SvgjsMarker1152)"></path>
    </g>
    <g id="SvgjsG1154">
        <path id="SvgjsPath1155" d="M294.58035714285575 248.29464285714295L358.9613095238087 248.29464285714295L358.9613095238087 165.62797619047663L420.74226190476173 165.62797619047663" stroke="#323232" stroke-width="2" fill="none" marker-end="url(#SvgjsMarker1156)"></path>
    </g>
    <g id="SvgjsG1158">
        <path id="SvgjsPath1159" d="M261.3884490424327 269.89139863714064L261.3884490424327 400.5803571428582L420.7422619047618 400.5803571428582" stroke="#323232" stroke-width="2" fill="none" marker-end="url(#SvgjsMarker1160)"></path>
    </g>
    <g id="SvgjsG1162" transform="translate(582.4374999999999,171.6279761904773)">
        <path id="SvgjsPath1163" d="M 0 0L 100 0L 100 70L 0 70Z" stroke="rgba(50,50,50,1)" stroke-width="2" fill-opacity="1" fill="#ffffff"></path>
        <g id="SvgjsG1164">
            <text id="SvgjsText1165" font-family="微软雅黑" text-anchor="middle" font-size="13px" width="80px" fill="#323232" font-weight="400" align="middle" lineHeight="125%" anchor="middle" family="微软雅黑" size="13px" weight="400" font-style="" opacity="1" y="24.375" transform="rotate(0)">
                <tspan id="SvgjsTspan1166" dy="16" x="50">
                    <tspan id="SvgjsTspan1167" style="text-decoration:;">Dao</tspan>
                </tspan>
            </text>
        </g>
    </g>
    <g id="SvgjsG1168">
        <path id="SvgjsPath1169" d="M525.3422619047615 165.6279761904764L553.3898809523807 165.6279761904764L553.3898809523807 206.6279761904771L578.8374999999999 206.6279761904771" stroke="#323232" stroke-width="2" fill="none" marker-end="url(#SvgjsMarker1170)"></path>
    </g>
    <g id="SvgjsG1172" transform="translate(582.4374999999999,82.34226190476173)">
        <path id="SvgjsPath1173" d="M 0 0L 100 0L 100 70L 0 70Z" stroke="rgba(50,50,50,1)" stroke-width="2" fill-opacity="1" fill="#ffffff"></path>
        <g id="SvgjsG1174">
            <text id="SvgjsText1175" font-family="微软雅黑" text-anchor="middle" font-size="13px" width="80px" fill="#323232" font-weight="400" align="middle" lineHeight="125%" anchor="middle" family="微软雅黑" size="13px" weight="400" font-style="" opacity="1" y="24.375" transform="rotate(0)">
                <tspan id="SvgjsTspan1176" dy="16" x="50">
                    <tspan id="SvgjsTspan1177" style="text-decoration:;">Pojo</tspan>
                </tspan>
            </text>
        </g>
    </g>
    <g id="SvgjsG1178">
        <path id="SvgjsPath1179" d="M525.3422619047615 165.6279761904764L553.3898809523807 165.6279761904764L553.3898809523807 117.3422619047621L578.8374999999999 117.3422619047621" stroke="#323232" stroke-width="2" fill="none" marker-end="url(#SvgjsMarker1180)"></path>
    </g>
    <g id="SvgjsG1182">
        <path id="SvgjsPath1183" d="M294.58035714285575 248.29464285714295L358.9613095238088 248.29464285714295L358.9613095238088 294.1041666666667L420.7422619047618 294.1041666666667" stroke="#323232" stroke-width="2" fill="none" marker-end="url(#SvgjsMarker1184)"></path>
    </g>
    <g id="SvgjsG1186" transform="translate(424.3422619047618,259.1041666666667)">
        <path id="SvgjsPath1187" d="M 0 0L 100 0L 100 70L 0 70Z" stroke="rgba(50,50,50,1)" stroke-width="2" fill-opacity="1" fill="#ffffff"></path>
        <g id="SvgjsG1188">
            <text id="SvgjsText1189" font-family="微软雅黑" text-anchor="middle" font-size="13px" width="80px" fill="#323232" font-weight="400" align="middle" lineHeight="125%" anchor="middle" family="微软雅黑" size="13px" weight="400" font-style="" opacity="1" y="24.375" transform="rotate(0)">
                <tspan id="SvgjsTspan1190" dy="16" x="50">
                    <tspan id="SvgjsTspan1191" style="text-decoration:;">Service</tspan>
                </tspan>
            </text>
        </g>
    </g>
</svg>
<br />

在传统Java后端中，我们一般使用MVC模型来开发所需的业务逻辑，传统MVC再附加Spring的IOC和AOP特性，使得Java后端开发更为简洁和高效。同样的我们也可以将这种程序开发的思路迁移到NodeJS当中去，让一些基于NodeJS的小型web应用的开发变得更为清晰和易于维护。<font color="red"><u>请注意这不是一种新的框架，而是将MVC开发模式向Node的适配与改进。</u></font>

##### 		优点：

​		1.结构清晰，维护简便。

​		2.明确分工，可持续增加业务。

​		3.一站式开发，对环境的要求更低。

​		4.基于ES6，代码简单。

##### 		缺点：

​		1.步骤繁琐，非开箱即用。

​		2.对开发人员的业务能力有更高的要求。

# 2.准备开发环境

使用的包管理器基于 <font color="green"><u>yarn</u></font> ，JS语法基于 <font color="green"><u>ES6</u></font> 。

##### 初始化一个新项目

  ```shell
  yarn init
  ```

##### 安装依赖

```shell
yarn add express -D
yarn add bable-cli -D
yarn add nodemon -D
yarn add babel-preset-es2015 babel-preset-stage-2 -D
yarn add babel-register -D
```

##### 配置 yarn 启动项

```json
// 在 package.json 里添加运行的脚本

"scripts": {
  "start": "nodemon Application.js --exec babel-node --presets es2015,stage-2"
}
```

##### 启动服务

```she
yarn start
```

# 3.准备生产环境

首先将入口文件移动到 <font color="green"><u>lib</u></font> 文件夹下,再配置yarn启动项。

##### 配置 yarn 启动项

```json
"scripts": {
  "start": "nodemon lib/Application.js --exec babel-node", 
  "build": "babel lib -d dist", 
  "serve": "node dist/Application.js", 
}

yarn start // 开发环境启动
yarn build // 编译生产环境
tarn serve // 在生产环境启动
```

##### 把babel选项保存到配置文件（.Babelrc）中

在根目录下创建一个 .babelrc 文件，然后添加如下配置：

```json
{
  "presets": ["es2015", "stage-2"], 
  "plugins": []
}
```

# 4.demo 预览

项目demo发布在github中：https://github.com/CherryMars0/Express-MVC.git



# 5.展望

1.继承Spring的IOC和AOP开发优点。

2.针对NodeJS进行高并发大容量的优化。

3.统筹轻量型web应用程序一站式快捷开发方式。

4.约束系统。
