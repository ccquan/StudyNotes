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

