# BOM学习
## BOM概述
BOM(Browser Object Model)浏览器对象模型
- 学习浏览器窗口交互的一些对象
- 兼容性较差
- 顶级对象为window
- BOM大于DOM
  
window对象
- document
- location
- navigation
- screen
- history
  
## window对象常见事件
window.onload（传统注册事件）
window.addEventListener('load' , function(){})
- 等页面全部加载完再执行

document.addEventListener('DOMContentLoaded',function(){})
- 仅DOM加载完成，不包括图片、表格，适用于一些图片很多的网页，提升加载速度
- 比window.addEventListener('load' , function(){})速度要快


window.onresize()
- 浏览器大小一变化就会激活事件

window.setTimeout(fn,间隔时间)  
  - 这里调用的fn不用加()，这和addEventListener('click',fn)是一样的
  
window.setInterval()，第一次调用也有时间间隔
- [倒计时效果.html](./84-倒计时效果.html) 用到了time相关的内容
- [验证码短信间隔.html](./86-验证码短信间隔.html)

## JS执行队列
先执行同步任务，再执行异步任务（先执行主线程，再将任务队列中的任务放到主线程中执行）[JS执行机制.html](90-JS执行机制.html)
- 同步任务：会放到主线程执行栈
- 异步任务：通过回调函数实现，把回调函数放到了任务队列之中
  - 普通事件：click、resize等
  - 资源加载：load、error等
  - 定时器：setInterval、setTimeout等

由于主线程不断地重复获得任务，执行任务，从任务列表中获取任务，再执行，这种机制被称为**事件循环（event loop）**


## locatoin对象
**URL(Uniform Resource Locator, URL)统一资源定位符**

protocol://host[:port]/path/[?query]#fragment
- protocol：通信协议，常用：http，ftp，maito等
- host：主机（域名）www.baidu.com
- port：端口号，可选
- path：路径，由零个或多个'/'符号隔开，一般代表主机上的一个目录或文件地址
- query：参数，以键值对的形式，通过&符号分割开来
- fragment：片段，#后面内容常见于链接，锚点


**location对象属性**
- **location.href**
- .host
- .port
- .pathname - 返回路径
- **.search - 返回参数**
- .hash - 返沪片段

[登录跳转.html](93-获取上一个页面的参数-1.html)
- 表单的使用，from


**location常见方法**
- .assign() - 跟更改href一样，可以跳转页面
- .replace() - 替代当前页面，但不能记录历史以及后退页面
- .reload() - 重新加载页面，相当于f5，如果参数为true，则为强制刷新ctrl + f5


## navigator对象
- navigator对象包含有关浏览器的属性
- userAgent属性可以返回由客户机发送服务器的user-agent头部的值

## history对象
- back() 可以后退功能
- forward() 前进功能
- go(参数) 参数为1就是前进 参数为-1就是后退
OA系统可能会用到


## offsetLeft, offsetTop 元素偏移量
什么是带有定位的父元素? 带有position的父元素

常用属性
- element.offsetParent：返回作为该元素**带有定位的父级元素**，如果父级没有定位则返回body
- .offsetTop：返回元素相对**带有定位父元素**上方的偏移,不断往上找,找到有定位的父元素
- .offsetLeft：返回元素相对**带有定位父元素**左边框的偏移
- .offsetWidth：返回自身包括padding、边框、内容区的宽度(不包括margin)，返回数值不带单位
- .offsetHeight：返回自身包括padding、边框、内容区的高度，返回数值不带单位

## offset与style的区别
style
- style只能获取行内样式表的样式 
- style.width获得的是有单位的
- style.width获得不包含padding和border的值
- style是可读性属性,可以获取也可以赋值,div.style.width = '100px'

offset
- offset可以获取任意样式的样式值
- offset系列获得的数值是没有单位的
- offsetWidth包含padding和border的值
- offsetWidth是只读属性,不能修改赋值

案例
- [获取盒子内的坐标.html](101.获取盒子内的坐标.html)
- [拖动模态框Modal_Dialogue_Box.html](102.拖动模态框Modal_Dialogue_Box.html)
- [⭐框内放大镜.html](105-框内放大镜.html)

## client系列
- client相关属性可以获得该元素的边框大小、元素大小等
- .clientTop 返回元素上边框的大小
- .clientLeft 返回元素左边框的大小
- .clientWidth 返回自身包括padding、内容区宽度，但不包括边框，返回值不带单位
- .clientHeight 返回自身包括padding、内容区高度，但不包括边框，返回值不带单位


## 淘宝flexibel源码
- 物理像素比 dpr devicePixelRation
- window.pageshow事件 - 重新加载页面触发，避免已经缓存页面不触发一些事件




## scroll系列
element.scrollTop 返回被卷上去的上侧距离,返回数值不带单位
element.scrollLeft  返回被卷上去的左侧距离,返回数值不带单位
element.scrollWidth 返回自身**实际**（如果内容超出了盒子，会得到实际高度）的宽度，不含边框，返回数值不带单位
element.scrollHeight 返回自身**实际**的高度，不含边框，返回数值不带单位