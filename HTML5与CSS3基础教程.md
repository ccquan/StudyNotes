

# HTML5 与 CSS3 基础教程

### 视频与音频标签

- audio

  ```html
  <audio src="images/music.wav" controls="true"></audio>
  ```

- video

  ```html
  <video controls="true" height="290px" width="490px">
    		<source src="images/movie.mp4" type="video/mp4">
  </video>
  ```

  

### border边框标签

border-style：

- solid  实线
- dashed 虚线
- dotted  原点线
- double  双实线
- none  无边框
- groove  根据border-color的值画3D凹槽
- ridge: 定义3D脊边框。效果取决于边框的颜色值



### box盒子标签

#### display 创建box盒子

```css
display: box;
display: -moz-box;  // 火狐
display: -webkit-box;  // 谷歌
/* Internet Explorer 10 */
display:-ms-flexbox;
```

> Flexible boxes 在 IE 9和更早版本的浏览器中不兼容

#### box-orient盒子的取向

- horizontal  水平
- vertical     垂直

```css
-moz-box-orient: horizontal;
-webkit-box-orient: horizontal;
box-orient: horizontal;
```

#### box-direction盒子的顺序

- normal  正常顺序
- reverse  逆序
- inherit  从子元素继承 box-direction 属性的值

```css
/* Firefox */
-moz-box-direction:reverse;

/* Safari、Opera 以及 Chrome */
-webkit-box-direction:reverse;

/* W3C */
box-direction:reverse;
```

#### box-ordinal-group盒子位置

box-ordinal-group: 排序的位置

```css
#box1{
    height: 50px;
    border: solid 1px red;
    box-ordinal-group: 2;
    -moz-box-ordinal-group: 2;  // 兼容
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 2; /* Internet Explorer 10 */
}
#box2{
    height: 50px;
    border: solid 1px red;
    box-ordinal-group: 1;
    -moz-box-ordinal-group: 1;  // 兼容
    -webkit-box-ordinal-group: 1;
    -ms-flex-order: 1; /* Internet Explorer 10 */
}
```

#### box-flex盒子弹性空间

```css
#box1{
    -moz-box-flex: 4.0; /* Firefox */
	-webkit-box-flex: 4.0; /* Safari 和 Chrome */
    -ms-flex: 4.0; /* Internet Explorer 10 */
    box-flex: 4.0;
}
#box2{
    -moz-box-flex: 2.0; /* Firefox */
	-webkit-box-flex: 2.0; /* Safari 和 Chrome */
    -ms-flex: 2.0; /* Internet Explorer 10 */
    box-flex: 2.0;
}
/* box1的空间是box2的2倍 */
```

#### box-pack、box-align管理盒子空间

> Internet Explorer 10 使用 -ms-flex-pack property 属性来代替支持。
>
> Firefox通过私有属性- MOZ-box-pack支持。
>
> Safari, Opera, 和 Chrome 通过私有属性 -webkit-box-pack 支持.

pack  水平位置

align  垂直位置

- start  
- end
- center
- justify

```css
-ms-flex-pack:center;  /*ie*/
-ms-flex-align:center;

-moz-box-pack:center;  /*firefox*/
-moz-box-align:center;

-webkit-box-pack:center;  /*google*/
-webkit-box-align:center;

box-pack:center;
box-align:center;
```

#### 练习题

```html
<!DOCTYPE html>
<html>
<head>
	<title>弹性盒模型作业 </title>
	<style type="text/css">
		#box{
			height: 500px;
			width: 500px;
			background-color: #6cf;
			display: box;
			display:-ms-flexbox;
			display: -moz-box;
			display: -webkit-box;
			-moz-box-orient: vertical;
			-webkit-box-orient: vertical;
			box-orient: vertical;

			-ms-flex-pack:center;  /*ie*/
			-ms-flex-align:center;

			-moz-box-pack:center;  /*firefox*/
			-moz-box-align:center;

			-webkit-box-pack:center;  /*google*/
			-webkit-box-align:center;

			box-pack:center;
			box-align:center;
		}
		#b1{
			height: 100px;
			width: 100px;
			background-color: #444;
		}
		#b2{
			height: 100px;
			width: 100px;
			background-color: #666;
		}
		#b3{
			height: 100px;
			width: 100px;
			background-color: #888;
		}
		#b4{
			height: 100px;
			width: 100px;
			background-color: #aaa;
		}
	</style>
</head>
<body>
	<div id="box">
		<div id="b1">i am b1</div>
		<div id="b2">i am b2</div>
		<div id="b3">i am b3</div>
		<div id="b4">i am b4</div>
	</div>
</body>
</html>
```



### overflow内容溢出处理标签

| 值      | 描述                                                       |
| ------- | ---------------------------------------------------------- |
| visible | 默认值。内容不会被修剪，会呈现在元素框之外                 |
| auto    | **如果**内容被修剪，则浏览器会显示滚动条以便查看其余的内容 |
| hidden  | 内容会被修剪，并且其余内容是不可见的                       |
| scroll  | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。   |



### resize调整元素内容大小标签

属性规定是否可由用户调整元素的尺寸。

| 值         | 描述                   |
| ---------- | ---------------------- |
| none       | 无法调整元素的尺寸     |
| both       | 可调整元素的高度和宽度 |
| horizontal | 可调整元素的宽度       |
| vertical   | 可调整元素的高度       |



### outline轮廓外边框标签

用于为元素周围绘制轮廓外边框，可以起到突出元素的作用

| 值              | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| *outline-color* | 规定边框的颜色。参阅：[outline-color](https://www.runoob.com/cssref/pr-outline-color.html) 中可能的值。 |
| *outline-style* | 规定边框的样式。参阅：[outline-style](https://www.runoob.com/cssref/pr-outline-style.html) 中可能的值。 |
| *outline-width* | 规定边框的宽度。参阅：[outline-width](https://www.runoob.com/cssref/pr-outline-width.html) 中可能的值。 |
| inherit         | 规定应该从父元素继承 outline 属性的设置。                    |



### column多列布局

column-ga: 在div元素的文本分成三列，并指定一个30像素的列之间的差距

column-count: div元素的文本分成三列

column-rule:  指定列之间的规则：宽度，样式和颜色

```css
-moz-column-count:3; /* Firefox */
-webkit-column-count:3; /* Safari and Chrome */
column-count:3;

-moz-column-gap:40px; /* Firefox */
-webkit-column-gap:40px; /* Safari and Chrome */
column-gap:40px;

-moz-column-rule:4px outset #ff00ff; /* Firefox */
-webkit-column-rule:4px outset #ff00ff; /* Safari and Chrome */
column-rule:4px outset #ff00ff;
```




### @media

- 语法

```css
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```

mediatype:

| 值     | 描述                                 |
| ------ | ------------------------------------ |
| all    | 用于所有设备                         |
| print  | 用于打印机和打印预览                 |
| screen | 用于电脑屏幕，平板电脑，智能手机等。 |

media feature:

| 值        | 描述                                   |
| --------- | -------------------------------------- |
| min-width | 定义输出设备中的页面最小可见区域宽度。 |
| max-width | 定义输出设备中的页面最大可见区域宽度。 |

- 定义电脑屏幕小于1000px的时候改变背景颜色为绿色
- 定义所有设备大于300px的时候改变背景颜色为蓝色

```css
@media all and (min-width: 300px) {
		#box{
			background-color: red;
		}
	}
@media screen and (max-width: 1000px) {
		#box{
			background-color: green;
		}
	}
```



### css样式

- *通配符选择器
- 标签选择器
- id选择器
- 类选择器
- 伪类或伪对象选择器 (a:link)
- 群选择器  （#id1,h1,h2）
- 派送选择器 （h1 h2）

#### 层次选择器

- 后代选择器

  ```css
  div span a{
      /*我控制的是div下的span下的a，并且a下面的a也能控制*/
  }
  ```

- 子元素选择器

  ```css
  div>span>a{
      /*我控制的是div下的span下的a，但a下面的a不能控制*/
  }
  ```

- 相邻兄弟选择器

  ```css
  h2 + h2{
      /*我控制的是同一个父元素的h1和h2*/
  }
  ```

- 通用兄弟选择器

  ```css
  p ~ span{
      color:red;
  }
  <span>This is not red.</span>
  <p>This is not red.</p>
  <code>This is not red.</code>
  <span>This is red.</span>
  ```

  
  
#### css属性选择器

*X：标签  attr：属性  value：属性值*

- X[attr] 只使用属性名

```css
a[id]{
/*表示控制a标签里有id属性的*/
}
a[id][target]{
/*表示控制a标签里有id属性和target属性的*/
}
```

- X[attr="value"] 指定属性名，且指定属性值

```css
a[id="click"] {
/*表示控制a标签里id名为click的*/
}
```

- X[attr~="value"] 指定属性名，且指定属性值，**包含value**，用空格分开

```css
a[title~="website"] {
/*表示控制title中包含website这个关键字的*/
}
<a title="webtitle website webend"></a>
```

- X[attr|="value"] 指定属性名，且指定属性值**以value或value-开头**

```css
[lang|=en] {
/*必须是完整且唯一的单词，或者以 - 分隔开*/
}
<p lang="en"><p lang="en-us">
```

- X[attr^="value"] 指定属性名，且指定属性值**以value开头**

```css
lang[^=en] {
/*前几个字母是 value 就可以*/
}
<p lang="en"><p lang="ennn">
```

- X[attr$="value"] 指定属性名，且指定属性值**以value结束**

```css
a[src$=".pdf"] {
/*后几个字母是 value 就可以*/
}
```

- X[attr*="value"] 指定属性名，且指定属性值能**拼成value就行**

```css
[title*=flower] {
/*code*/
}
<img src="/i/eg_tulip.jpg" title="ffffflowerrrrrr" />
```



#### 结构伪类选择器

- X:root  根元素

  ```css
  :root{
      /*在HTML中根元素始终是HTML元素。*/
      background-color:red;
      /*把页面背景颜色设置为红色*/
  }
  ```

- X:not(selector)

  ```css
  div:not(.end) {
      /*控制div里除了 id等于end 的*/
  }
  ```

- X:empty

  ```css
  p:empty{
      /*选择每个没有任何子级的p元素（包括文本节点）*/
  }
  ```

- X:target

  ```css
  #news1:target{
      /*用来改变页面的锚链接url指向的id元素的样式*/
  }
  <a href="#news1">click1</a>
  <a href="#news2">click2</a>
  <p id="news1">我会被控制样式</p>
  <p id="news2">我不会被控制样式</p>
  ```

  ```css
  :target{
      /*用来改变页面的锚链接url指向的id元素的样式*/
  }
  <a href="#news1">click1</a>
  <a href="#news2">click2</a>
  <p id="news1">我会被控制样式</p>
  <p id="news2">我会被控制样式</p>
  ```

- X:first-child

  ```css
  li:first-child{
      /*控制父元素的第一个子元素*/
      /*这里li的父元素是ul，ul的第一个子元素是li*/
  }
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
  ```

- X:last-child 

  ```css
  li:last-child{
      /*控制父元素的最后一个元素*/
  }
  ```

- X:nth-child(n)  表示父元素的第N个元素

  ```css
  li:nth-child(n+5){
      /*控制父元素的第五个元素开始到最后一个元素*/
  }
  ```

- X:nth-last-child(n)  表示父元素的倒数第N个元素

  ```css
  li:nth-last-child(3) {
      /*控制父元素倒数是第3个元素*/
  }
  li:nth-last-child(even) {
      /*控制父元素倒数偶数元素*/
  }
  ```

  *odd 表示奇数元素 even 表示偶数元素*

- X:only-child

  ```css
  表示控制只有一个子元素的元素
  ```

- X:first-of-type

  ```css
  表示父元素中第一个子元素的节点是X类型的
  p:first-of-type{
      font-size:50px;
      /*p的父元素是div，然后找第一个子元素，找到是h1，但h1跟X类型不一样，所有找到的是第一个p标签*/
  }
  <div>
    <h1>1</h1>
    <p>我会变大</p>
    <p>3</p>
  </div>
  ```

- X:last-of-type

  同上，但是是倒数开始找起

- X:only-of-type

  同上，但找只有一个子元素是跟X同类型的

  ```css
  p:only-of-type{
      font-size:50px;
  }
  <div>
    <h1>1</h1>
    <p>2</p>
    <p>3</p>
  </div>
  /*有两个跟X相同的元素*/
  ```

  ```css
  p:only-of-type{
      font-size:50px;
  }
  <div>
    <h1>1</h1>
    <p>我会变大</p>
  </div>
  /*h1和X不同类型，所以没问题，算一个子元素*/
  ```

- X:nth-of-type(n)           表示父元素的第N个元素，但只找类型相同的

- X:nth-last-of-type(n)   表示父元素的倒数第N个元素，但只找类型相同的

#### css的特性

1. 继承性
2. 层叠性
3. 权重

#### css颜色

```css
background-color:rgba(102,204,255, 0.3);
background-color:hsl(120,60%,70%);
background-color:hsla(120,60%,70%,0.5);
```



### 文本段落样式

#### 字体样式

字体font-family

```css
font-family: name1, name2  /*如果梅伊欧name1就会用备用的anme2*/
```

字体大小font-size

```css
font-size: 20px/20em;
```

字体颜色color

```css
color: value
```

字体粗细font-weight

```css
font-weight: normal, bold, bolder
```

字体样式font-style

```css
font-style: normal, italic, oblique
```

英文字体大小写text-transform

```css
text-transform: capitalize, upppercase, lowercase
```

文字修饰text-decoration

```css
text-decoration: underline, overline, line-through, none, link
```



#### 段落样式

字间距letter-spacing

```css
letter-spacing: value
```

行间距line-height

```css
line-height: value
```

段落首行缩进text-indent

```css
text-indent: 2em
```

段落水平对齐text-align

```css
text-align: left, right, center, justify
```

文本垂直对齐vertical-align

```css
vertical-align: top, middle, bottom
```

#### 引用字体

```css
@font-face {
	  font-family: "FZJZJW";  /*这里是字体名称，下面要一样*/
	  src: url("font/FZJZJW.ttf") format("truetype");  /*这里是字体路径*/
	}
#text{
    font-family: "FZJZJW";
}
```

#### 文字效果

文字阴影text-shadow

```css
text-shadow: x y [阴影大小 颜色]
text-shadow: 2px 3px 2px #6cf;
```

文本溢出text-overflow

```css
text-overflow: clip|ellipsis|string;
clip:修剪文本,没有省略号(...)
ellipsis:修剪文本,有省略号(...)
string:使用给定的字符串来代表被修剪的文本
```

```css
/*文本溢出text-overflow要搭配overflow使用*/
white-space: nowrap;
text-overflow: clip;
overflow: hidden;
```

> white-space:规定段落中的文本不进行换行

#### 空格处理white-space

| --       | --                                     |
| -------- | -------------------------------------- |
| normal   | 所有空格，回车，制表符都合并成一个空格 |
| pre      | 原格式                                 |
| nowrap   | 合成一行，遇到\<br\>结束               |
| pre-wrap | 原样输出，如果有规定宽高会换行         |

#### 换行处理word-wrap

```css
word-wrap: normal|break-word;
normal: 默认
break-word: 如果超出会在内部换行
```



### 背景样式

#### 背景颜色 background-color

```css
color：指定背景颜色。在CSS颜色值近可能的寻找一个颜色值的完整列表。
transparent：指定背景颜色应该是透明的。(默认)
inherit：指定背景颜色，应该从父元素继承
```

```css
background-color:yellow;
background-color:#00ff00;
background-color:rgb(255,0,255);
```



#### 背景图片 background-image

```css
none:无图片
url(图片位置): 设置背景图片
```

#### 多张图片做背景

```css
background:url(图片1) no repeat, url(图片2) no repeat;
```

#### 背景图片重复样式 background-repeat

```css
background-repeat: repeat, no repeat, repeat-x, repeat-y
repeat：重复(默认)
no repeat：不重复
repeat-x：只向左右重复
repeat-y：只向上下重复
```

#### 背景图片固定 background-attachment

```css
scroll：会随着滚动条的滚动而滚动，默认
fixed：保持固定，滚动条怎么滚动都不会跟着滚动
```

#### 背景定位 background-position

```css
x:top/left/right/bottom/center/0%/50%/0
y:top/left/right/bottom/center/0%/50%/0
```

#### 背景图片定位显示区域 background-origin

```css
padding-box	背景图像从内边框那里相对定位
border-box	背景图像从外边框那里相对定位
content-box	背景图像的从内容那里相对定位
```

#### 背景图片裁剪 background-clip

```css
border-box:  裁剪成边框方框(显示成内容+内边距+外边距)
padding-box:  裁剪成衬距方框(也就是显示成内容+内边距)
content-box:  裁剪成内容方框(也就是显示成内容)
```

#### 背景图像大小 background-size

```css
length：长度值
percentage：百分比
cover：完全覆盖背景区域
contain：自适应背景区域
```

```css
background-size: 80px 60px;
background-size: 50% 50%;  如果归属于div且指定宽高，是按div的百分比
```

### 渐变

> ie10以上



#### 线性渐变 linear-gradient

> **向下/向上/向左/向右/对角方向**

| 值                             | 描述                               |
| :----------------------------- | :--------------------------------- |
| *direction*                    | 用角度值指定渐变的方向（或角度）。 |
| *color-stop1, color-stop2,...* | 用于指定渐变的起止颜色。           |

- direction

1. 关键字：to bottom、to top、to right、to left、to bottom right

2. 角度：

<img src="https://www.runoob.com/wp-content/uploads/2014/07/7B0CC41A-86DC-4E1B-8A69-A410E6764B91.jpg" alt="角度" style="zoom: 50%;" />

```css
background-image: linear-gradient(to top, red, yellow);  // 红色下往上黄色渐变
```



#### 径向渐变 radial-gradient

> **由它们的中心定义**

| 值                             | 描述                     |
| :----------------------------- | :----------------------- |
| *shape*                        | 确定圆的类型             |
| *size*                         | 定义渐变的大小           |
| *position*                     | 定义渐变的位置           |
| *start-color, ..., last-color* | 用于指定渐变的起止颜色。 |

- shape

1. ellipse：椭圆形 (默认)
2. circle ：根据圆形的径向渐变

- size

1. farthest-corner ：指定径向渐变的半径长度为从圆心到离圆心最远的角 (默认)
2. closest-side ：指定径向渐变的半径长度为从圆心到离圆心最近的边
3. closest-corner ： 指定径向渐变的半径长度为从圆心到离圆心最近的角
4. farthest-side ：指定径向渐变的半径长度为从圆心到离圆心最远的边

- position

center：（默认）、top  、botton

```css
background-image: radial-gradient(red 5%, green 15%, blue 60%);
```



#### 重复线性渐变 repeating-linear-gradient

| 值                             | 描述                                                         |
| :----------------------------- | :----------------------------------------------------------- |
| *angle*                        | 定义渐变的角度方向。从 0deg 到 360deg，默认为 180deg。       |
| *side-or-corner*               | 指定线性渐变的起始位置。由两个关键字组成：第一个为指定水平位置(left 或 right)，第二个为指定垂直位置（top 或bottom）。 顺序是随意的，每个关键字都是可选的。 |
| *color-stop1, color-stop2,...* | 指定渐变的起止颜色，由颜色值、停止位置（可选，使用百分比指定）组成。 |

```css
background-image: repeating-linear-gradient(to bottom, red 40px, green 80px); /*往下渐变，红色占40px到绿色占80px，重复渐变*/
```



#### 重复径向渐变 repeating-radial-gradient

语法同 径向渐变radial-gradient

```css
background-image: repeating-radial-gradient(circle, red, 40px, orange 80px);  /*径向渐变在中间从红色扩展40px到橙色扩展80px，重复渐变*/
```



#### 作业

```html
<!DOCTYPE html>
<html>
<head>
	<title>渐变</title>
	<style type="text/css">
		div {
			width: 200px;
			height: 200px;
			margin: 20px;
		}
		/*1：*/
		#one {
			border-radius: 100%;
			background-image: radial-gradient(100px circle at 50% 0%, #fff, #daa36c);
		}
		/*2：*/
		#two {
			background-image: repeating-linear-gradient(red, green 10%, orange 20%); 
		}
		/*3：*/
		#three {
			background-image: repeating-linear-gradient( #33bbf1, #33bbf1 30px, #00aaee 30px, #00aaee 60px); 
		}
		/*4：*/
		#four {
			background-image: linear-gradient(90deg,rgba(200,0,0,.5) 50%,transparent 0), linear-gradient(rgba(200,0,0,.5) 50%,transparent 0);
            background-size: 40px 40px;
		}
	</style>
</head>
<body>
	<div id="one"></div>
	<div id="two"></div>
	<div id="three"></div>
	<div id="four"></div>
</body>
</html>
```



### 边框border

css1、css2常用的边框

border-width: 边框粗细

border-color：颜色

border-style：类型 

border-style值

| 值     | 描述   |
| ------ | ------ |
| noe    | 无边框 |
| solid  | 实线   |
| double | 双线   |
| dashed | 虚线   |
| dotted | 点线   |



#### 边框图片 border-image

- border-image-source

使用图像作为边框

```css
width: 200px;
height: 200px;
border: 20px solid;
border-image-source: url(images/border.png)
```



- border-image-slice

图像偏移

```css
width: 200px;
height: 200px;
border: 20px solid;
border-image-source: url(images/border.png);
border-image-slice: 50% 50%;
```



- border-image-width

图像边界的宽度

```css
border-image-width: 30 30;
```



- border-image-repeat

设置重复图像的方式

```css
border-image-repeat: stretch repeat
```

| 值      | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| stretch | 默认值。拉伸图像来填充区域                                   |
| repeat  | 平铺（repeated）图像来填充区域。                             |
| round   | 类似 repeat 值。如果无法完整平铺所有图像，则对图像进行缩放以适应区域。 |
| space   | 类似 repeat 值。如果无法完整平铺所有图像，扩展空间会分布在图像周围 |
| initial | 将此属性设置为默认值。[查看 *initial*](https://www.runoob.com/cssref/css-initial.html) |
| inherit | 从父元素中继承该属性。 [查看 *inherit*](https://www.runoob.com/cssref/css-inherit.html) |

#### 圆角边框 border-radius

```css
border-radius: 1-4 length|% / 1-4 length|%;
```

- 椭圆头像

```css
border-radius: 50%;
```

#### 阴影 box-shadow

```css
box-shadow: x y 模糊度 阴影大小 颜色 是否内阴影;
```



### 列表list 样式

#### 无序列表 ul

#### 有序列表 ol

#### 定义列表 dl

```css
<dt></dt>  自定义列表标题
<dd></dd>  自定义列表内容
```

#### 列表自定义图标 list-style-image

```css
list-style-image: url(xx.gif);
list-style-position: inside;
```



### a标签样式

#### 伪元素

- :link  未访问时状态

- :hover  [ˈhʌvər]  鼠标悬停在a标签上状态
- :active  鼠标长按状态
- :visited   [ˈvɪzɪtɪd] 访问过的状态

