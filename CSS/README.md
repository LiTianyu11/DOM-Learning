## 1.Icon Bar
[Icon Bar](1-Icon%20Bar.html)
  - 父icon bar **overflow**，子icon **float**
  - [Clearing boxes wrapped around a float](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Floats#clearing_boxes_wrapped_around_a_float)


## 2.Menu Icon
[Meun Icon](2-MenuIcon.html)
- [transform](https://www.w3schools.com/css/css3_2dtransforms.asp) 
  - matrix(scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY())
- transition
- element.classList.**toggle('')** 不能写成 element.classList.toggle = ''


## 3.Accordion
[Accordion](3.Accordion-html)
- overflow: hidden
- DOM: element.nextElementSibling
- .style.display 只能获取行内样式，在此案例中panel的if书写时需注意，不能一开始就判断panel.style.display == 'noen'，因为一开始panel没有行内style


