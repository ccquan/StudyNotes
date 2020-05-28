# jQuery基础

jQuery库包含以下功能

- html元素选取
- html元素操作
- css操作
- html事件函数
- JavaScript特效和动画
- Ajax
- utilities



### 安装及配置

1. https://jquery.com/download/  下载，使用源文件
2. 使用cdn

- https://wwwindex.bootcdn.cn/jquery/
- https://www.jsdelivr.com/package/npm/jquery

html配置

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
```



### 入口函数

- 1: 页面加载后执行

```javascript
$(document).ready(function(){
    alert("hello world");
});
```

- 2: 匿名函数，自己执行

```javascript
$(function(){
    console.log("hello world");
});
```

> jQuery对象是一个伪数组，jQuery对象其实就是dom对象的一个包装集



### jQuery选择器

#### ID选择器$(#id)

获取指定ID的元素

#### 类选择器$(.class)

获取同一类class的元素

#### 标签选择器$(div)

获取同一类标签的所有元素

#### 属性选择器$(属性名)

基于属性定位元素

```
$('[属性名]')                       获取指定属性名的元素
$('[属性名 = /!= /^= /$= /*= 值]')  获取属性名 等于 /不等于 /开头等于 /结尾等于 /包含 值的元素
```

- 例子

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <style>
        tr {
            height: 10px;
            width: 200px;
        }
    </style>
    
  </head>
  <body>
    <table>
        <tr myname="" class="pub"><td>获取哦指定属性名(这里是：myname)</td></tr>
        <tr name="one" class="pub"><td>属性名 = 值(这里是：name=one)</td></tr>
        <tr class="private" ><td>属性名 != 值(这里是：class != pub)</td></tr>
        <tr name="hpub" class="pub"><td>属性名开头等于值(这里是name ^= hpub)</td></tr>
    </table>
    <script>
        $('tr[myname]').css('background-color','#777');
        $('tr[name="one"]').css('background-color','#aaa');
        $('tr[class!="pub"]').css('background-color','#ddd');
        $('tr[name^="hpub"]').css('background-color','#6cf');
    </script>
  </body>
</html>
```

#### 位置选择器$('selector:first')

| 选择器              | 描述                                      |
| ------------------- | ----------------------------------------- |
| $('selector:first') | 获取第一个元素                            |
| $('selector:last')  | 获取最后一个元素                          |
| $('selector:odd')   | 获取索引值为奇数的元素，索引值从0开始计数 |
| $('selector:even')  | 获取索引值为偶数的元素，索引值从0开始计数 |
| $('selector:eq(n)') | 获取索引值为n的元素                       |
| $('selector:gt(n)') | 获取索引值大于n的元素                     |
| $('selector:lt(n)') | 获取索引值小于n的元素                     |

- 例子

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <title>Document</title>
    <style>
        li {
            list-style-type: none;
            text-align: center;
            line-height: 30px;
            width: 200px;
            height: 30px;
            border: 2px solid #6cf;
            margin: 5px 0 5px 0;
        }
    </style>
  </head>
  <body>
    <ul>
        <li>00、first、红色</li>
        <li>01、奇数</li>
        <li>02</li>
        <li>03、奇数</li>
        <li>04</li>
        <li>05、奇数</li>
        <li>06、last、灰色</li>
    </ul>
    <script>
        $('li:first').css('background-color', 'red');
        $('li:last').css('background-color', '#aaa');
        $('li:odd').css('background-color', '#6cf');
    </script>
  </body>
</html>
```

#### 后代选择器$(ul a) 

获取ul里面所有的a包含孙元素

#### 子代选择器$(ul>p)

获取ul下p

#### 并集选择器$(div, p, li) 

使用逗号分隔，只要符合条件之一就可。

#### 选择器的遍历

$('选择器').each(函数体);

```javascript
$('li').each(function(index) {
    console.log("索引：" + index);
    console.log("内容：" + this.innerText);
});
```



### jQuery的dom操作



#### 查找html元素

##### 获取文本内容

element.text()

- 例子

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <title>Document</title>
    <script>
        $(document).ready(function() {
            $('#btn').click(function() {
                // 获取p标签的文本
                alert($('#text').text());
            });
        });
    </script>
  </head>
  <body>
    <p id="text">我是p标签的内容</p>
    <button id="btn">获取p标签的文本</button>
  </body>
</html>
```



##### 修改文本内容

element.text('修改的内容')

```javascript
$('#btn').click(function() {
    $('#text').text('按钮被点击');
});
```



##### 获取属性内容

element.attr(属性名)

```html
<script>
        $(document).ready(function() {
            $('#btn').click(function() {
                alert("p标签的id值是：" + $('#text').attr('id'));
            });
        });
</script>
```



##### 修改/创建属性

```
element.attr('属性名', '值')
```

- 获取属性值

```
$(选择器).attr(属性名);
```



#### 创建html元素

##### append()

> 在element元素的内部的后面追加元素

```
var 元素 = $('<p>添加的元素</p>')
element.append(元素);
```

```html
$('#add').click(function() {
    var new_p = $('<p>我是添加元素</p>');
    $('body').append(new_p);
});
```

##### prepend()

> 在element元素的的内部的前面插入元素，就是插入在父元素内部的第一个元素

##### after()

> 在element元素的之后插入元素

##### before()

> 在element元素的之前插入元素



#### 删除html元素

##### remove()

> remove是直接删除元素及其字元素

##### empty()

> empty清空html元素，但标签还在



#### 克隆html元素

##### clone()

- 例子

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <title>Document</title>
    <script>
        $(document).ready(function() {
            $('button').click(function() {
                // 克隆元素后追加到body内部去
                var cl = $('p:first').clone();
                $('p:last').after(cl);
            });
        });
    </script>
  </head>
  <body>
    <p>我是p标签</p>
    <button>复制</button>
  </body>
</html>
```



#### 替换元素

##### replaceWith()

> 所有匹配到的元素替换成指定的html元素或dom元素

- 例子: 把最后一个p元素替换成hello world

```javascript
$("p:first").replaceWith("Hello world!");
```

##### replaceAll()

replaceAll(selector)

> 用匹配的元素替换所有selector匹配到的元素

- 例子: 用一个span元素替换最后一个p元素

```javascript
$("<span><b>Hello world!</b></span>").replaceAll("p:last");
```



#### css元素

##### 获取css元素

```
element.css('css元素名');
```



##### 修改/添加css元素

```
element.css('css元素名', 'css值');
```

- 修改多个css样式

```javascript
$('body').css({
    widht: 300,
    'height': '300px',
    backgrounColor: 'red'
});
```



### jQuery事件操作

#### 常用事件

| 鼠标       | 键盘     | 表单   | 窗口   |
| ---------- | -------- | ------ | ------ |
| click      | keypress | submit | scroll |
| mouseenter | keydown  | change | resize |
| hover      | keyup    | focus  |        |



#### 事件绑定

```
bind(type, [data], fn);
type: 列如上面的事件
data: 作为event.data属性传递过去
fn  : 绑定的函数
```

- 例子: 为输入框绑定一个焦点事件

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <title>Document</title>
    <script>
        $(document).ready(function() {
            $('#uname').bind('focus', function() {
                $('#status').show();
            });
        });
    </script>
  </head>
  <body>
    <input type="text" name="uname" id="uname">
    <p id="status" style="display: none;">请输入用户名：</p>
  </body>
</html>
```



#### 简写

> click()、dblclick()等事件经常使用，所以可以简写

```javascript
$('对象').事件([函数体]);
```





#### 鼠标事件

```javascript
$('#uname').focus(function() {
    $('#status').show();
});
```



#### 键盘事件

- 例子: 按键后显示按钮的代码

```javascript
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script>
        $(document).keydown(function(event) {
           $('#status').text('key:' + event.keyCode);
        });
    </script>
  </head>
  <body>
    <p id="status">none</p>
  </body>
</html>
```



####  表单事件

##### submit()

> 提交时触发，该事件只适合form元素

- 例子: 

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <title>Document</title>
    <script>
        $(document).ready(function() {
            $('form').submit(function() {
                alert('触发提交事件');
            });
        });
    </script>
  </head>
  <body>
    <form action="">
        <input type="submit" value="提交">
    </form>
  </body>
</html>
```



##### change()

> 元素的值发送改变时触发，该事件只适合textfield 文本域、textarea、select
>
> 失去焦点或按回车时检测是否改变，如果改变了就触发

- 例子: 

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <title>Document</title>
    <script>
        var cnt = 0;
        $(document).ready(function() {
            $('#uname').change(function() {
                $('#status').text('文本发生改变第' + String(cnt++) + '次');
            });
        });
    </script>
  </head>
  <body>
    <input type="text" name="uname" id="uname">
    <p id="status">none</p>
  </body>
</html>
```



#### 焦点事件

- 获得焦点 element.focus();
- 失去焦点 element.blur();



#### 窗口事件

##### 滚动条 scroll()

- 例子

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <title>Document</title>
    <style>
        html, body {
            height: 2000px;
        }
        p:first-child {
            position: fixed;
        }
        p:last-child {
            position: fixed;
            margin-top: 50px;
        }
    </style>
    <script>
        var cnt = 0;
        $(document).scroll(function() {
            $('#status').text('触发' + String(cnt++) + '次scroll事件');
            $('#get_height').text('滚动条当前高度：' + $(this).scrollTop());
        });
    </script>
  </head>
  <body>
    <p id="status">none</p>
    <p id="get_height"></p>
  </body>
</html>
```



##### 窗口大小 resize()

```javascript
$(window).resize(函数体);
```



#### 冒泡事件

##### 停止事件冒泡

```
element.click(function(event) {
    // code
	event.shopPropagation();  // 停止冒泡
});
```

- 例子

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <style>
        #base {
            height: 200px;
            width: 200px;
            background-color: aqua;
        }
        #er {
            height: 250px;
            width: 250px;
            background-color: beige;
        }
        #est {
            height: 300px;
            width: 300px;
            background-color: red;
        }
    </style>
    <script>
        $(document).ready(function() {
            $('#base').click(function(event) {
                $('#status').text('base被点击');
                event.stopPropagation();  // 停止冒泡，不会触发父类的点击事件
            });
            $('#er').click(function(event) {
                $('#status').text('er被点击');
                event.stopPropagation();
            });
            $('#est').click(function(event) {
                $('#status').text('est被点击');
                event.stopPropagation();
            });
        });
    </script>
    <title>Document</title>
  </head>
  <body>
    <div id="est">更大
        <div id="er">较大
            <div id="base">基本</div>
        </div>
    </div>
    <p id="status">none</p>
  </body>
</html>
```



##### 阻止默认行为

> 比如表单点击submit、a标签等，浏览器会默认触发一些行为

- 表单

```
event.preventDefault();
```



- a标签

```
javascript:;
javascript:void(0);
```



**上面的stopPropagation()、perventDefaut() 也可以改成return false;**



#### 事件解除

```
unbind(type, [data])
type: 事件类型
data: 解除的函数
data不填的话解除全部，如果填了的话值解除填的函数
```

- 例子:

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <title>Document</title>
    <script>
        $(document).ready(function() {
            $('#click').click(function() {
                alert('点击');
            });
            $('#relive').click(function() {
                $('#click').unbind('click');
                alert('已解除点击事件,现在点击按钮也不会弹窗了');
            });
        });
    </script>
  </head>
  <body>
    <button id="click">点我弹窗</button>
    <button id="relive">解除事件</button>
  </body>
</html>
```



### jQuery效果

实操内容

#### 获取元素和浏览器的宽高

##### 元素

```
$(元素).width()  |  innerWidth()  |  outerWidth()
width:      元素内容的宽高
innerWidth: 元素 + 内边距         的宽高
outerWidth: 元素 + 内边距 + 边框 的宽高
```

- 例子: 三种情况的元素的宽度

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <title>Document</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: aquamarine;
        }
        #pad {
            padding: 20px;
        }
        #mar {
            padding: 20px;
           border: 5px solid;
        }
    </style>
    <script>
        $(document).ready(function() {
           var d1 = $('#base').width();
           var d2 = $('#pad').innerWidth();
           var d3 = $('#mar').outerWidth();
           $('#status').text("第一个div宽度：" + d1 + " 第二个div宽度：" + d2 + " 第三个div宽度：" + d3);
        });
    </script>
  </head>
  <body>
    <div id="base">h:100 w:100<br>没边距</div><br>
    <div id="pad">h:100 w:100<br>上下左右内边距:20</div><br>
    <div id="mar">h:100 w:100<br>上下左右内边距:20 <br>上下边框:5</div>
    <p id="status"></p>
  </body>
</html>
```



##### 窗口

```
$(window).width();   浏览器宽度
$(window).height();  浏览器高度
```

- 例子: div自适应窗口大小

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            background-color: black;
        }
    </style>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script>
        $(document).ready(function() {
            var wid = $(window).width() * 0.1;
            wid = parseInt(wid);
            $('#box').css('height', wid);
            $('#status').text('当前div的高度是：' + String(wid) + ' 缩放浏览器大小后刷新可变化');
        });
    </script>
  </head>
  <body>
    <div id="box"></div>
    <p id="status">none</p>
  </body>
</html>
```



#### 标签内容操作

```
$(选择器).val([值]);   设置或返回表单字段(input)的值
$(选择器).html([值]);  设置或返回选择器的html内容，不包括自己的html标签
$(选择器).text([值]);  设置或返回文本内容
```

- 例子:

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script>
        $(document).ready(function() {
            $('#show_val').click(function() {
                alert($('#input_text').val());
            });
            $('#show_html').click(function() {
                alert($('#text').html());
            });
            $('#show_text').click(function() {
                alert($('#text').text());
            });
        });
    </script>
    <style>
        #text {
            width: 1000px;
            height: 130px;
            font-size: 2.3rem;
            text-align: center;
        }
        #author {
            color: red;
        }
    </style>
  </head>
  <body>
    <input id="input_text"></input>
    <div id="text">想是否无聊并不是别人来决定的，不管是什么样的梦想，自己拼命努力去追寻才是最重要的。<span id="author"> --守护甜心</span></div>
    <button id="show_val">显示输入框的val</button>
    <button id="show_html">显示html</button>
    <button id="show_text">显示text</button>
  </body>
</html>
```



#### 例子:图片轮播效果例子

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片轮播效果</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script>
        var img_arr = ['https://api.ixiaowai.cn/api/api.php?v=1', 'https://api.ixiaowai.cn/api/api.php?v=2', 'https://api.ixiaowai.cn/api/api.php?v=3'];
        var k = 0;
        var t;
        function changeSrc() {
            k++;
            if (k > 2) {
                k = 0;
            }
            var path = img_arr[k];
            $('#banner_img').attr('src', path);  // 获取图片src属性，然后替换
            // 替换图片后，还要替换下面那个下标
            $('#banner>div').css('background', '');  // 清空banner下面的全部div
            $('#banner>div:eq(' + k + ')').css('background', 'orange');  // 然后选取轮到的下标，修改属性背景
            t = setTimeout(changeSrc, 2000);
        }

        $(document).ready(function() {
            // 添加下标经过效果
            $('#banner>div').mouseover(function() {
                $(this).css('border-width', '3px');
            });
            $('#banner>div').mouseout(function() {
                $(this).css('border-width', '1px');
            });

            // 如果进入元素就停止计时器
            $('#banner').mouseenter(function() {
                clearTimeout(t);  // 清除计时器，参数是上面赋值后的t
            });
            $('#banner').mouseleave(function() {
                setTimeout(changeSrc, 2000);
            });
        });
    </script>
    <style>
        #banner, img {
            width: 1000px;
            position: relative;
        }
        #banner div {
            border: 1px solid orange;
            background: #f3f3f3;
            padding: 1px 5px;
            bottom: 8px;
            font-weight: 8px;
            position: absolute;
        }
    </style>
  </head>
  <body>
      <div id="banner">
        <img id="banner_img" src="https://api.ixiaowai.cn/api/api.php?v=1" alt="">
        <div style="right: 60px;background: orange;">1</div>
        <div style="right: 35px;">2</div>
        <div style="right: 10px;">3</div>
      </div>
  </body>
</html>
```



#### 标签样式操作

```
$(选择器).css(样式名, [值]);       设置或返回css样式
$(选择器).addClass(类别名);        添加类别样式
$(选择器).removeClass(类别名);     移除类别样式
$(选择器).toggleClass(类别名);     切换类别样式，有就去除，没有就追加，跟点击播放点击暂停功能类似
```



- addClass() / removeClass()

```html
<style>
    .add {样式}
</style>

<p id="text">古之立大事者，不惟有超世之才，亦必有坚忍不拔之志</p>
<button id="add">点击追加样式</button>
<button id="del">点击移除样式</button>

<script>
  $("#add").click(function() {  // 点击按钮后，会把add样式添加到p标签那里去
      $('#text').addClass('add');
  });
  $("#del").click(function() { // 点击按钮后，p标签会移除add类样式
      $("#text").removeClass('add');
      //$("#text").removeClass('add add2');  空格分隔可以移除多个类
  });
</script>
```



- toggleClass()

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script>
        $(document).ready(function() {
            $('#toggle').click(function() {
                $('#text').toggleClass('add');
            });
        });
    </script>
    <title>Document</title>
    <style>
        .add {
            border: 2px solid red;
        }
    </style>
  </head>
  <body>
    <p id="text" >古之立大事者，不惟有超世之才，亦必有坚忍不拔之志</p>
    <button id="toggle">点击添加边框或取消边框</button>
  </body>
</html>
```



#### 例子:选项卡效果

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>选项卡效果</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        #box > ul > li {
            list-style-type: none;
            float: left;
            width: 100px;
            height: 50px;
            border: 1px solid white;
            text-align: center;
            line-height: 50px;
        }
        #box > ul > li:first-child {
            background-color: #fc9d9a;
        }
        #box > ul > li:nth-child(2) {
            background-color: #f9cdad;
        }
        #box > ul > li:last-child {
            background-color: #c8c8a9;
        }

        #box>div {
            clear: both;
            width: 306px;
            height: 200px;
            background-color: #fc9d9a;
        }
        .hide {
            display: none;
        }
    </style>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script>
        $(document).ready(function() {
            $('#box>ul>li').each(function(index) {
                $(this).mouseover(function() {
                    var color = $(this).css('background-color');
                    $('#box>div').addClass('hide');
                    $('#div' + index).removeClass('hide');
                    $('#div' + index).css('background-color', color)
                });
            });
        });
    </script>
  </head>
  <body>
    <div id="box">
        <ul>
            <li>国内</li>
            <li>国际</li>
            <li>体育</li>
        </ul>
        <div id="div0">
            <ul>
                <li>国内1</li>
                <li>国内2</li>
            </ul>
        </div>
        <div id="div1" class="hide">
            <ul>
                <li>国际1</li>
                <li>国际2</li>
            </ul>
        </div>
        <div id="div2" class="hide">
            <ul>
                <li>体育1</li>
                <li>体育2</li>
            </ul>
        </div>
    </div>
  </body>
</html>
```



### jQuery动画

#### 显示隐藏动画

```
$(选择器).hide(speed, callback);
$(选择器).show(speed, callback);
$(选择器).toggle(speed, callback);

speed:    隐藏/显示/切换 的速度,毫秒为单位
callback: 执行完后的回调函数
```

##### 遮罩层-登录框

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>遮罩层</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <style>
        #loggin {
            position: absolute;
            left: 500px;
            top: 200px;
            height: 150px;
            width: 200px;
            background-color: rgb(159, 215, 243);
        }
        #cancel {
            position: absolute;
            right: 0px;
            top: 0px;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background-color: turquoise;
        }
        body {
            width: 100%;
            height: 100%;
            background-color: #aaa;
        }
    </style>
    <script>
        $(document).ready(function() {
            $('#btn').click(function() {
                $('#loggin').show(1000);
            });
            $('#cancel').click(function() {
                $('#loggin').hide(1000);
            });
        });
    </script>
  </head>
  <body>
    <div id="loggin" style="display: none;">
        <form>
            <input type="text" name="uname" id="uname" autofocus placeholder="请输入用户名：">
            <input type="password" name="pwd" id="pwd" placeholder="请输入密码：">
            <input type="submit" value="提交">
            <div id="cancel">x</div>
        </form>
    </div>
    <button id="btn">登录</button>
  </body>
</html>
```



#### 淡入淡出动画

```
$(选择器).fadeIn(speed, callback);             淡入：将隐藏的元素淡淡的显示出来
$(选择器).fadeOut(speed, callback);            淡出：将显示的元素淡淡的隐藏起来
$(选择器).fadeToggle(speed, callback);         淡入淡出切换
$(选择器).fadeTo(speed, opacity, callback);    变化元素的不透明度

opacity:  不透明度值(0-1)
```

- 例子

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>淡入淡出</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <style>
        #box {
            height: 200px;
            width: 200px;
            background-color: #66ccff;
        }
    </style>
    <script>
        $(document).ready(function() {
            $('#btn1').click(function() {
                $('#box').fadeIn(1000);
            });
            $('#btn2').click(function() {
                $('#box').fadeOut(1000);
            });
            $('#btn3').click(function() {
                $('#box').fadeToggle(1000);
            });
            $('#btn4').click(function() {
                $('#box').fadeTo(1000, 0.1);
            });
            $('#btn5').click(function() {
                $('#box').fadeTo(1000, 0.9);
            });
        });
    </script>
  </head>
  <body>
      <div id="box"></div>
    <button id="btn1">淡入:显示</button>
    <button id="btn2">淡出：隐藏</button>
    <button id="btn3">切换</button>
    <button id="btn4">透明到0.1</button>
    <button id="btn5">透明到0.9</button>
  </body>
</html>
```



#### 显示隐藏与淡入淡出的区别

> hide隐藏的效果是从下至上或从右下到左上的慢慢折叠缩小，而fadeOut的淡出效果是整体淡化直至消失



#### 滑动动画

```
slideDown();     下滑
slideUp();       上滑
slideToggle();   切换滑动
```

```javascript
$(document).ready(function(){
	$(".btn1").click(function(){
		$("p").slideUp();   // p标签会上滑到消失
	});
	$(".btn2").click(function(){
		$("p").slideDown(); // p标签会从消失下滑出现
	});
});
```

```html
<p>这是一个段落。</p>
<button class="btn1">上滑</button>
<button class="btn2">下滑</button>
```



#### 自定义动画

```
$(选择器).animate(params, speed, callback);

params:  json自定义css样式例如：{height:'200px'}
需要注意的是属性需要用小驼峰命名例如：margin-left  == marginLeft
```

- 例子

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <title>自定义动画效果</title>
    <style>
        #box {
            height: 200px;
            width: 200px;
            background-color: #66ccff;
            position: relative;
        }
    </style>
    <script>
        $(document).ready(function() {
            $('#start').click(function() {
                $('#box').animate({left: '100px', height: '150px'}, 3000, function() {
                    $('#box').animate({left: '0px', height: '200px'}, 3000);  // 这个回调函数，回调内容是使它恢复原样
                });
            });
        });
    </script>
  </head>
  <body>
    <div id="box"></div>
    <button id="start">start</button>
  </body>
</html>
```



#### 例子:两级联动

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>两级联动</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script>
        function sele_item() {
            var v = $('[name=city]').val();
            var ob = $('#city_item');
            switch(v) {
                case 'gd':
                    ob.empty();
                    ob.append('<option value="gz">广州</option>');
                    ob.append('<option value="sz">深圳</option>');
                    ob.append('<option value="zh">珠海</option>');
                    break;
                case 'gx':
                    ob.empty();
                    ob.append('<option value="gl">桂林</option>');
                    ob.append('<option value="yl">玉林</option>');
                    ob.append('<option value="bs">百色</option>');
            }
        }
    </script>
  </head>
  <body>
    <select name="city" id="city" onchange="sele_item()">
        <option value="gx">广西</option>
        <option value="gd">广东</option>
    </select>
    <select name="city_item" id="city_item"></select>
  </body>
</html>
```



#### 例子:图片滚动控制

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片左右滚动</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <style>
        #div1 {
            float: left;
            width: 600px;
            overflow: hidden;
        }
        #div2 {
            position: relative;
            left: 0;
            top: 0;
            width: 1200px;
        }
        #div2 img {
            display: block;
            width: 198px;
            float: left;
            border: 1px solid #aaa;
        }
        #left_ico, #right_ico {
            float: left;
            width: 30px;
            height: 30px;
            margin: 35px 10px 0 10px;
            line-height: 30px;
            text-align: center;
            background-color: #6cf;
        }
    </style>
    <script>
        $(document).ready(function() {
            // 左滚动
            $('#left_ico').click(function() {
                var now_left = parseInt($('#div2').css('left'));
                var next = String(now_left + 200) + 'px';
                if (now_left < '0'){
                    $('#div2').animate({left: next}, 1000);
                }
            });
            // 右滚动
            $('#right_ico').click(function() {
                var now_right = parseInt($('#div2').css('left'));
                var next = String(now_right - 200) + 'px';
                if (now_right > -600) {
                    $('#div2').animate({left: next}, 1000);
                }
            });
        });
    </script>
  </head>
  <body>
      <div id="left_ico"><</div>
    <div id="div1">
        <div id="div2">
            <img src="https://api.ixiaowai.cn/api/api.php?v=1" alt="">
            <img src="https://api.ixiaowai.cn/api/api.php?v=2" alt="">
            <img src="https://api.ixiaowai.cn/api/api.php?v=3" alt="">
            <img src="https://api.ixiaowai.cn/api/api.php?v=4" alt="">
            <img src="https://api.ixiaowai.cn/api/api.php?v=5" alt="">
            <img src="https://api.ixiaowai.cn/api/api.php?v=6" alt="">
        </div>
    </div>
    <div id="right_ico">></div>
  </body>
</html>
```



### Ajax

#### 原生写法

```javascript
第一步：创建对象
xhr = new XMLHttpRequest();
第二步：设置参数
xhr.open('post', '目标.php');
第三步：设置请求头
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencode');
第四步：设置发送内容
xhr.send('uname=root&pwd=root');
第五步：接受返回内容
xhr.onreadystatechange = function() {
  if (xhr.status == 200 && xhr.readyState == 4) {
      var res = xhr.responseText;
      alert(res);
  }  
};
```

> - readyState值：
> 1. uninitialized - 还未开始载入
> 2. loading - 载入中
> 3. interactive - 已加载，文档与用户可以开始交互
> 4. complete - 载入完成



#### xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<标签>
  <单标签 id='1' />
  <单标签 id='2' />
</标签>
```

- 二级联动

```xml
<?xml version="1.0" encoding="utf-8"?>
<list>
    <city id='gd' name='广东'>
        <city_item id='gz' name='广州'></city_item>
        <city_item id='sz' name='深圳'></city_item>
        <city_item id='zh' name='珠海'></city_item>
    </city>
    <city id='gx' name='广西'>
        <city_item id='gl' name='桂林'></city_item>
        <city_item id='yl' name='玉林'></city_item>
        <city_item id='bs' name='百色'></city_item>
    </city>
</list>
```



#### 二级联动

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ajax的二级联动</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script>
        function sele_item() {
            var now_val = $('#city').val();  // 获取当前的省份值
            // 清空
            $('#city_item').empty();
            // 再添加
            $.ajax({
            url: 'city.xml',
            dataType: 'xml',
            success: function(res) {
                $(res).find('[id=' + now_val + ']').children().each(function() {  // 查询当前省份的子标签然后遍历
                    var cname = $(this).attr('name');
                    var cval = $(this).attr('id')
                    var constr = '<option value=' + cval + '>' + cname + '</option>';
                    $('#city_item').append(constr);
                });
            }
            });
        }
        $(document).ready(function() {
            $.ajax({
            url: 'city.xml',
            dataType: 'xml',
            success: function(res) {
               $(res).find('city').each(function() {
                   var cname = $(this).attr('name');
                   var cval = $(this).attr('id')
                   var constr = '<option value=' + cval + '>' + cname + '</option>';
                   $('#city').append(constr);
               });
               sele_item();  // 获取省份信息后，查询子标签
            }
            });
        });
    </script>
  </head>
  <body>
    <select name="city" id="city" onchange="sele_item()">
        <!-- <option value="gx"></option>
        <option value="gd"></option> -->
    </select>
    <select name="city_item" id="city_item"></select>
  </body>
</html>
```



#### jQuery写法

##### $.ajax

```javascript
$.ajax({
    url: '目标.php',
    type: 'post',
    data: 'uname=root&pwd=root',
    dataType: 'text',
    success: function(res) {
        // 成功后的执行的函数
    }
});
```

>dataType: text/ json/ xml/ script



##### $.load

```javascript
$(选择器).load(url, data, callback);

callback:  回调函数，请求后执行的函数，可以传的参数有：
           responseTxt  成功后的结果内容
           statusTxt    调用后的状态
           xhr          xmlhttprequest对象
```

```javascript
$('#text').load('phone.txt', function(responseTxt, statusTxt, xhr){函数体});
```



##### $.get  $.post

```
$(选择器).get(url, data, callback, dataType);
$(选择器).post(url, data, callback, dataType);

callback:  回调函数，get/post请求后执行的函数
dataType:  服务器返回的格式 xml、html、json
```

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>get测试</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script>
        $(document).ready(function() {
            $.get('getTest.txt', function(responseTxt) {
            document.write(responseTxt);
            });
        });
        
    </script>
  </head>
  <body>
    
  </body>
</html>
```



#### 跨域

1. 

> 用callback=?，然后调用写好的函数fun1，把返回的数据传递进去

```javascript
$.ajax({
    url: 'https://api.ip.sb/jsonip?callback=?',
    dataType: 'jsonp',
    jsonpCallback: 'fun1',
    success: function(data){}
});
function fun1(data) {
    console.log(data);
    alert('当前ip:' + data.ip);
}
```



2. 

> $.getJSON();

```javascript
$(document).ready(function() {
    $.getJSON("https://api.ip.sb/jsonip?callback=?",
        function(data) {
            document.write("My IP address is: ", data.ip);
        }
    );
});
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

    

    