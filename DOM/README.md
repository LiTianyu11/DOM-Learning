一个页面就是一个文档  
DOM - 文档对象模型，文档中的元素（文档内部标签）都可以看作为一个对象，可以使用对象方法  
```
console.dir()??
```
# 获取元素

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


# 事件基础

## 事件源

## 事件类型 
如何触发
## 事件处理程序



# 操作元素
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

## H5自定义属性 ie11支持（兼容性不太好）
- 规定data-开头作为自定义属性名
- 可以使用element.dataset.属性名 || element.dataset['属性名'] 来获取，若自定义属性名有-连接（list-name）需改成驼峰命名法（listName）
- element.dataset是一个自定义属性集合


# 节点操作
相较于使用DOM来获取元素，节点利用父子兄关系获取节点操作更简洁，逻辑性更强，但兼容性较差


## 节点概述
- nodeType
  - 元素节点为1
  - 属性节点为2
  - 文本节点为3（包括空格、换行）
- nodeName
- nodeValue

## 节点操作 - 1
- **父节点操作** element.parentNode
- **子节点操作** 
  - element.childNodes，包含了元素节点、文本节点等等
  - **element.children** 只获得了元素节点（非标准，但实际开发常用，兼容性也没问题）
  - 获得第一个子节点/最后一个子节点
    - .firstchild/.lastchild，也包括了元素节点、文本节点等等
    - .firstElementChild/.lastElementChild 只获得元素节点 （ie9以上支持）
    - **实际开发写法**：element.children[0] / element.children[element.children.length-1]

[Dropdown Menu](41-下拉菜单Dropdown_Menu.html)
- 兄弟节点操作（实际使用较少）
  - element.nextSibling/previousSibling 包括了元素节点、文本节点等等，可以封装一个函数，将type = 1的筛选出来
  - element.nextElementSibling/previousElementSibling 只获得元素节点，兼容性不好


## 节点操作 - 2
- 创建节点 document.createElement('element')
- 添加节点 
  - node.appendChild(child)，插入node的最后一个孩子的后面
  - node.insertBefore(child, 指定元素)，插入node指定孩子的前面
- 删除节点 node.removeChild(child)    

[Simple Comment Box](44-简单留言板.html) , [创建动态表格](49-创建动态表格.html)
- 复制节点 
  - node.cloneNode() 只是克隆了，并没有添加，**若括号为空或者false，就是为浅拷贝，只复制标签不复制里面的内容**

## javascript:;