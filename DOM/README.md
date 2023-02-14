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

- [41-Dropdown Menu](41-下拉菜单Dropdown_Menu.html)
- 兄弟节点操作（实际使用较少）
  - element.nextSibling/previousSibling 包括了元素节点、文本节点等等，可以封装一个函数，将type = 1的筛选出来
  - element.nextElementSibling/previousElementSibling 只获得元素节点，兼容性不好


## 节点操作 - 2
- 创建节点 
  - document.createElement('element')
  - document.write()，页面重绘（了解即可）
  - document.body.innerHTML = '<a>xxx</a>' 这种方式也可以创建元素，还可以使用for循环拼贴，document.body.innerHTML += '<a>xx</a>'
- 添加节点 
  - **node.appendChild(child)**，插入node的最后一个孩子的后面
  - **node.insertBefore(child, 指定元素)**，插入node指定孩子的前面
- 删除节点 node.removeChild(child)    

- [44-Simple Comment Box](44-简单留言板.html) , [49-创建动态表格](49-创建动态表格.html)
- 复制节点 
  - node.cloneNode() 只是克隆了，并没有添加，**若括号为空或者false，就是为浅拷贝，只复制标签不复制里面的内容**


## 创捷元素的效率区别
-  创建的对象有属性更改时
   -  document.createElement('element')，效率比innerHTML拼贴要快，比innerHTML通过数组形式拼贴(arr.push(`element`)，然后join在一起，之后再用appendChild拼贴)要慢
-  创建的对象无属性更改
   -  createElement('element')和innerHTML数组拼贴效率差不多，甚至createElement('element会更快')

[55-innerHTML和createElement效率对比](55-innerHTML和createElement效率对比.html)

## javascript:;


# 事件高级

## 注册事件
- 传统注册事件：事件类型以on开头，同一个元素同一个事件只能设置一个注册事件
- 方法监听注册事件（w3c标准，推荐方式）：addEventListener()，IE9之间IE不支持，事件类型不以on开头，同一个元素同一个事件可以添加多个监听
  - element.addEventListenr('click', fn) ， 注意这里的fn不用加()


## 删除事件（解绑事件）
- 传统方式，例如：element.onclick = null 
- 监听方式：eventTarget.removeEventListener(type,listenr[,useCapture])，listener不能是匿名函数


## DOM事件流
事件流描述的是从页面中接受事件的顺序    
捕获阶段（从上向下）- 冒泡阶段（从下向上）  
[62-DOM事件流](62-DOM事件流.html)  
有些事件是没有冒泡的

## 事件对象
事件对象与事件相关，事件不存在，事件对象就不存在，eventTarget.onclick = function(evt){} , ie9以下通过window.event来获取事件对象
- e.target 返回的是触发事件的对象，this返回的是绑定事件的对象
- [64-e.target和this](64-e.target和this.html)

**event.preventDefault()**  阻止默认行为，例如不让链接跳转，不让按钮提交
 - 直接 return false 也可以阻止默认行为，ie低版本还可以用returnValue  

**e.stopPropagation()** 阻止冒泡 在下层的元素的事件中添加，可以防止之上的元素冒泡
- ie: window.event.cancelBubble = true

## 事件委托(代理) ⭐
- **原理：不在给每个子节点单独设置事件监听器，而是事件监听器设置在其父节点上，然后通过冒泡原理影响每个子节点**
- 例如给ul添加注册事件，利用target找到当前的li，点击li会冒泡到ul，ul有注册事件，就触发了监听器
- 只操作了一次DOM，提高了程序性能
- 冒泡，捕获都可以？
- [事件委托.html](67-事件委托.html)

## 常用鼠标事件
- 鼠标事件对象：e.clientX/Y  **e.pageX/Y** e.screenX/y
- mousemove [跟随鼠标.html](70-跟随鼠标.html) 

## 常用键盘事件
- keydown
- keypress 不识别功能键Ctrl，Shift...
- keyup
- 事件执行顺序：keydown -> keypress -> keyup

**键盘事件对象 keyboardEvent**
- key 
- **keyCode** 返回按下的ASCII码，现已被弃用
  - keydown、keyup不区分大小写
  - keypress区分大小写
[快捷键定位搜索框.html](73-快捷键定位搜索框.html) 
- HTMLElement.focus()，可以让input框focus


[搜索框内容放大.html](75-搜索框内容放大.html)