#### 下载连接：
https://jquery.com/download/
#### 入口函数

- 1
```
$(document).ready(function(){
    alert("hello world");
});
```
- 2
```
$(function(){
    console.log("hello world");
});
```

> jQuery对象是一个伪数组，jQuery对象其实就是dom对象的一个包装集

#### 开关灯案列
- 1
```
var but1 = document.getElementById("on");
but1.onclick = function(){
    var body_color = document.getElementsByTagName("body");
    body_color[0].style.background = "#fff";
};
var but2 = document.getElementById("off");
but2.onclick = function(){
    var body_color = document.getElementsByTagName("body");
    body_color[0].style.background = "#000";
};
```
- 2
```
$('#on').click(function(){
    $('body').css('backgroundColor', '#fff');
});
$('#off').click(function(){
    $('body').css('backgroundColor', '#000');
});
```
- #### 获取元素的值

```
$('body').css('width');
```
- #### 设置多种样式
```
$('body').css({
    widht: 300,
    'height': '300px',
    backgrounColor: 'red'
});
```
> background-color就要加引号、300加px也要
- #### jQuery基本选择器

```
ID选择器$(#id)               获取指定ID的元素
类选择器$(.class)            获取同一类class的元素
标签选择器$(div)             获取同一类标签的所有元素
并集选择器$(div, p, li)      使用逗号分隔，只要符合条件之一就可。
交集选择器$(div, redClass)   获取class为redClass的div元素
后代选择器$(ul a)            获取ul里面所有的a包含孙元素
自带选择器$(ul a)            获取ul里面的a元素，不包括孙元素
指定选择器$('li:eq(0)')      获取第一个li元素
```
- #### 二级导航
```
$("#nav>ul>li").mouseover(function(){
    $(this).children('.center').css('display', 'block');
});
$("#nav>ul>li").mouseout(function(){
    $(this).children('.center').css('display', 'none');
});
```
> 样式也可以用

```
$(this).children('.center').hide();
$(this).children('.center').show();
```
> 其他方法

```
mouseover       经过，经过子元素也会触发
mouseenter      经过，事件只在鼠标移动到选取的元素是触发
mouseout        移开
click           点击
show()         参数1：动画的时长，毫秒级  参数2：动画执行后的回调函数 (fast  normal  slow)  hide同理
slideDown()     划入动画效果
slidUp()        划出动画效果
slideToggle()   滑动切换效果
fadeIn()         淡入效果
fadeout()        淡出效果
fadeToggle()    淡淡切换效果
fadeTo(时间, 淡入到哪里)  淡入到指定程度
animate(动画属性必选, 时间, 移动的模式, 执行完的函数)  动画效果
html()  获取元素的所以内容
html('我是内容')  设置内容，会覆盖内容，有标签也会解析出来
追加元素：
var $link = $('<a href = "http://www.baidu.com">我是百度</a>');append($link);剪切元素  把页面上的元素追加到最后一个子元素
var $别人的元素 = $("div");
$("div2").append($别人的元素);
prepend()                添加一个元素到第一个子元素
$('#a').before($b);      添加一个元素到a元素之前
$('#a').after($b);       添加一个元素到a元素之后
a.appendTo(b)   将a添加到b
empty();  清空元素
$("#div").remove();   移除自己元素
克隆元素：
var $cloneDiv = $('#div2').clone();
$('body').append($cloneDiv);
参数是true表示会把事件克隆过去，false就不会克隆事件
$('#input_text').val();  获取文本
width()  height();  获取或设置宽高，不包括内外边距
innerWidth()  包括内边距  outerWidth()  包括内边距和边框  outerWidth(true)  包括内外边距、边框
$('window').width();  获取页面窗口可视宽高
offset();  获取一个对象，包含top，left值
position();  获取元素距离document的位置
$('div').scorllLeft()/scorllTop();  获取滚动条的位置
$(window).scrollTop(200);  设置窗口的滚动条位置
scroll();  滚动方法
```
> 遍历方法

```
siblings    返回被选元素的所有同级元素。
children    返回被选元素的所有直接子元素。
find        返回被选元素的后代元素。例：$("#nav").find("li")
parent      返回被选元素的直接父元素
```

- #### 显示自己的子元素时隐藏其他的子元素（手风琴效果）
```
$(this).children('div').show().parent().siblings('li').children('div').hide():
```
> 点击时触发显示，然后show方法返回显示的那个元素，然后parent找父元素，然后找父的li兄弟元素，然后找兄弟元素的子元素div隐藏

- #### li标签的索引
```
var idx = $(this).index();
$('#center>li:eq(' + idx + ')');  //字符串拼接
$('#center>li').eq(idx);  //不拼接的获取变量
```
> js双引号表示字符串，其他详情：https://www.runoob.com/note/29397

- #### 添加或删除类
```
$('#nav>li').addClass('select pub_a');
$('#nav>li').removeClass('pub_a');
$('#nav>li').removeClass();  //移除全部类
hasClass('pub_select');  //判断类
toggleClass('pub_select');  //切换类
```
- #### animate动画效果
```
$('#close').click(function(){
    $('img').animate({
        height: 0,
    }, 800);
});

停止动画
$('div').stop();  第一个参数：是否清除队列  第二个参数：是否跳转到最终效果
```
- #### jQuery操作属性
```
$('img').attr('src', 'haha.jpg');  更换图片，可{}数组设置多属性
$('img').attr('src');  获取属性值
$('img').aremoveAttr('src');  移除属性，空格隔开可移除多个属性
```
- #### 在jQuery1.6之后获取布尔值需要prop方法
```
$('checked').prop();
```
- #### on注册事件

> jQuery1.7之后，jQuery用on统一了所有事件的处理方法
> 最现代的方式，兼容zepto（移动端类似jQuery的一个库），强烈建议使用

1. 简单注册
> 不支持动态注册

```
$('div').on('click', functio(){
    console.log('test');
});
```
2. on委托注册事件
> 支持动态注册
```javascript
$('body').on('click', 'div, span', function(){
    
});
```

3. off()解绑事件

   > off()  不给参数解绑全部事件， off('click')  解绑点击事件 

   ```javascript
   $('#btn1').on('click', function(){
   	$('#one').on({
   		'click':function(){
   			console.log("单击事件");
   		},
   		'mouseenter':function(){
   			console.log("移入事件");
   		}
   	});
   });
   $('#btn2').on('click', function(){
       // $('#one').off();  //解绑全部事件
       $('#one').off('click');  //解绑点击事件
});
   ```

4. trigger()  事件触发

   ```
   $('#btn1').on('click', function(){
   	i++;
   	if(i == 3){
   		$('#one').trigger('click');
   	}
   });
   ```

#### event  事件对象

   > 注册一个事件，系统会生成一个对象记录这个对象触发时的信息如：键盘，坐标


   ```
   $('#one').on('click', function(e){
   	console.log(e);
   });
   ```

   > screenX  以屏幕计算
   >
   > clientX  以可视计算，（滚动条 缩小也算）
   >
   > pageX  以body计算

```
e.stopPropagation();  //阻止事件冒泡
e.preventDefault();  //组织浏览器默认行为
return false;  //两者都阻止
//获取按键信息
$(document).on('keydown', function(){
	console.log(e.keyCode);
});
```

1. 五角星评分案列

   ```
   prev();  上一个兄弟
   prevAll();  上一个全部兄弟
   next();  下一个兄弟
   nextAll();  下一个全部兄弟
   ```

### jQuery补充

#### 链式编程

> 链式编程就是一个元素调用一个方法，这个方法有返回值，而且返回的是一个jQuery对象，那就可以继续在点出jQuery方法

   ```javascript
列：$('div').widht(100).height(100).css('backgroundColor', 'red');
   ```

1. end()  返回上一个状态，注意：.end()需要jQuery对象

```javascript
$(this).text(shi).prevAll().text(shi).end().nextAll().text(kong);  //返回到$(this)这里
```

#### each方法()  显示迭代

> 遍历一个对象设置不同的值

```
$lis.each(function(index, element){
	console.log(index);  //每一个li标签的索引
	console.log(element);  //每一个li标签，是一个dom对象
})
```

#### 版本查询

````
$.fn.jquery
````

- 多库共存

  ```javascript
  $.noConflict();  //$符号控制器释放
  console.log(jQuery.fn.jquery);
  console.log($.fn.jquery);
  ```

  

> 哪个文件后引入，使用的$就是谁的

#### jQuery插件库

- 颜色库

  url:https://www.jq22.com

  url:http://www.htmleaf.com

  url:https://www.bootcdn.cn/jquery-color/

- 城市选择案列

  ```javascript
  <script src="distpicker.data.js"></script>
  <script src="distpicker.js"></script>
  $(function(){
  	$('#one').distpicker();  //调用插件方法
  })
  ```

- jQuery-ul

  url:https://jqueryui.com

- 自执行函数

  ```javascript
  (function($){
  	console.log('hello world');
  }(jQuery));
  ```

- 自己封装函数

  1. 第一种

     ```javascript
     index.html:
     <script scr="jQuery-bgColor.js"></script>
     $('div').bgColor('red').width(100);
     
     jQuery-bgColor.js:
     (function($){
     	$.fn.bgColor = function(bg_color){
     		this.css('backgroundColor', bg_color);
       		return this;  //返回这个对象
     	}
     }(jQuery));
     ```
  
  2. 第二种，静态方法
  
     ```javascript
     (function($){
     	$.add = function(num1, num2){
     		return num1 + num2;
     	}
     }(jQuery));
     ```
  
  - 表格插件封装案列
  
    ```javascript
    (function($){
        $.fn.table = function(arr_th, arr_td){
            var list = [];
            list.push('<table>');
            //表头
            list.push('<tr>');
            for(var i = 0; i < arr_th.length; i++){
                list.push('<th>');
                list.push(arr_th[i]);
                list.push('</th>');
            }
            list.push('</tr>');
            //表体
            for(var i = 0; i < arr_td.length; i++){
                list.push('<tr>');
                list.push('<td>' + (i + 1) +'</td>');  //生成序号
                for(var key in arr_td[i]){
                    list.push('<td>');
                    list.push(arr_td[i][key]);
                    list.push('</td>');
                }
                list.push('</tr>');
            }
            list.push('</table>');
        }
    }(window.jQuery));
    ```
  
    
  
    