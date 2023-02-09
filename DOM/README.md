一个页面就是一个文档  
DOM - 文档对象模型，文档中的元素（文档内部标签）都可以看作为一个对象，可以使用对象方法  
```
console.dir()??
```
# ❤️获取元素

## document.getElementById()

## document.getElementsByTagName() 获取某些元素，伪数组形式储存，若找不到元素，则返回空的伪数组 

element.getElementsByTagName()，element是指定的父元素（不能是以伪数组形式，用以对象形式）
可以先给父元素一个id，通过document.getElementById()来获取父元素对象 

 ## 根据类名获取元素 class - HTML5新增
 document.getElementByClassName()

 ## document.querySelector("选择器")  - HTML5新增
 可以选择任意的选择器，但只能选择指定选取器的第一个

 ## document.querySelectorAll("选择器")  - HTML5新增

HTML5不兼容iE9以下的，若考虑兼容性就无法使用新功能

## 获取特殊元素，例如<html> <body>
document.documentElement-<html>  
document.body-<body>

## document.querySelector('.xxx').querySelectorAll('xx') 这样写是可以的

# ❤️事件基础

## 事件源

## 事件类型 
如何触发
## 事件处理程序


# ❤️操作元素
获取事件源 => 对事件源进行修改

## innerText，非标准，去除空格和换行
不识别标签

## innerHTML，标准，保留标签内空格和换行
可以识别标签
"<p>dasdada</p>"

## 修改元素属性
对象.属性
```jsx
let img = document.getElementById('img'); //获取对象
img.src = 'xxxx.xx' //修改对象属性
```
## element.style.display

## 精灵图
[循环遍历精灵图](https://www.bilibili.com/video/BV1k4411w7sV?p=21&spm_id_from=pageDriver&vd_source=77c5e27cac311e28c96e6428ecc427d7
)


## onfocus获得焦点 onblur失去焦点
[16-显示隐藏文本框内容](16-显示隐藏文本框内容.html)


## element.className类名修改（css里写一个class），适合修改更多样式
如果想保留原先的类名，可以用多类名选择器
element.style单个修改会更加方便  
[18-注册页面错误提示](18-注册页面错误提示.html)


## 排他思想 - 循环
- 获取所有元素
- 所有元素绑定排他事件（使用for循环）
- 排他事件：清除所有元素的样式，给当前元素设置样式
[19-排他事件](/DOM/19-排他事件.html)

## for循环为选中的所有元素绑定事件
[20-排他-切换背景1](20-排他-切换背景.html)    
[21-表格隔行变色效果](21-表格隔行变色效果.html)
- 鼠标经过 onmouseover 鼠标离开 onmouseout


## 全选反选
[全选反选](29-全选反选.html)

## 自定义属性操作（也可以用于内置属性操作）
- 自定义属性的获取 element.getAttribute('自定义属性') 
- 自定义属性的更改 element.setAttribute('自定义属性','值')
- 移除属性 element.removeAttribute('属性')   

[⭐33 - tab栏切换](/DOM/33-tab栏切换(how%20to%20tabs).html)

## 