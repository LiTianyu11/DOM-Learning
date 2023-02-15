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

window.setTimeout(function(){}/fn,间隔时间)  
  - 若是调用函数fn，要写出fn，而不能写成fn()
window.setInterval()，第一次调用也有时间间隔
- [倒计时效果.html](./84-倒计时效果.html) 用到了time相关的内容
- [验证码短信间隔.html](./86-验证码短信间隔.html)