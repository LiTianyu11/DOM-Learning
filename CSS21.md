#


# 01 
## 如果想让布局是动态的，避免对容器使用固定宽高
- 固定宽高会固定布局
- 可以使用padding而不是使用宽高来增加容器空间


## em和rem
- em is relative to the font-size of its direct or nearest parent, rem is only relative to the html (root) font-size
- em
  - 字体大小会依据的是父元素的字体大小
  - 内外边界会依据当前元素的字体大小，而不是父元素的字体大小
- rem
  - 可以用于font-size。如果font-size使用了em的话，叠套的元素会因为父元素font-size的改变发生一系列变化，这不是我们想要的

em可以应用于按钮，当字体一改变，按钮的内边距也跟着变化，进而整体变化。em使用不当会造成局面的失控，而rem就是为了解决这种失控。
https://youtu.be/_-aDOAMmDHI

## 02 - 复习

