# Vue基础

官网：https://cn.vuejs.org/

## 概述

- Vue.js是目前最火的一个前端框架，React是最流行的一个前端框架（React除了开发网站，还可以开发手机App，Vue语法也是可以用于进行手机App开发的，需要借助于Weex）
- Vuejs是前端的主流框架之一，和Angularjs、Reactjs一起，并成为前端三大主流框架！
- Vuejs是一套构建用户界面的框架，只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。（Vue有配套的第三方类库，可以整合起来做大型项目的开发）
- 前端的主要工作？主要负责MVC中的V这一层；主要工作就是和界面打交道；

- MVC 是后端的分层开发概念

- MVVM是前端视图层的概念，主要关注于 视图层分离，也就是说：MVVM把前端的视图层，分为了 三部分 Model, View , VM ViewModel



## 快速开始

导入vue之后，会有一个名叫Vue的对象，就像jQuery的`$`

`el` ：element，需要控制的dom元素

`data` ：数据

渲染：`{{ data的变量 }}`

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue练习1</title>
    <script src="./lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <h3>{{ msg }}</h3>
    </div>
    <script>
      var vm = new Vue({
        el: "#box",
        data: {
          msg: "Hello Vue"
        },
      });
    </script>
  </body>
</html>
```



## 基础指令

### v-cloak

如果网速过慢，vue.js没有加载完成，那么网页上会显示`{{ msg }}`插值表达式

解决方法：css添加样式，带有`v-cloak`属性的元素设置隐藏，vue加载好后会显示

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue练习1</title>
    <script src="./lib/vue_v2.6.11.js"></script>
    <style>
      [v-cloak] {
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <h3 v-cloak>{{ msg }}</h3>
    </div>
    <script>
      var vm = new Vue({
        el: "#box",
        data: {
          msg: "Hello Vue",
        },
      });
    </script>
  </body>
</html>
```



### v-text

v-text也可以渲染

```html
<h5 v-text="msg"></h5>
```



### v-html

v-text和插值表达式都是不会解析html标签的，v-html是会解析html标签的

```html
<div v-html="msg2"></div>
```

```html
<script>
    var vm = new Vue({
        el: "#box",
        data: {
            msg2: "<h3>我是h3标签</h3>",
        },
    });
</script>
```



### v-bind

v-bind是用户绑定属性的指令

```html
<input type="button" v-bind:value="btn_value" v-bind:name="btn_name + '123'" />
```

```html
<script>
    var vm = new Vue({
        el: "#box",
        data: {
            btn_value: "我是按钮的值",
            btn_name: "username",
        },
    });
</script>
```

- 也可以省略不写v-bind，用`:`符

```html
<input type="button" :value="btn_value" :name="btn_name + '123'" />
```



### v-on

v-on事件绑定机制

`methods` ：存储方法

```html
<input type="button" value="点击我" v-on:click="show" />
```

```html
<script>
    var vm = new Vue({
        el: "#box",
        methods: {
            show: function () {
                alert(1);
            },
        },
    });
</script>
```

- 也可以省略不写v-on，用`@`符

```html
<input type="button" value="点击我" @click="show" />
```



### 跑马灯案列

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>跑马灯案列</title>
    <script src="./lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <input type="button" value="浪起来" @click="run" />
      <input type="button" value="别浪" @click="stop" />
      <h4 v-text="msg"></h4>
    </div>

    <script>
      new Vue({
        el: "#box",
        data: {
          msg: "猥琐发育，别浪~~~  ",
          intervlid: null,
        },
        methods: {
          run() {
            if (this.intervlid != null) return;
            this.intervlid = setInterval(() => {
              let start = this.msg.substring(0, 1);
              let end = this.msg.substring(1);
              let newText = end + start;
              this.msg = newText;
              console.log(this.msg);
            }, 300);
          },
          stop() {
            clearInterval(this.intervlid);
            this.intervlid = null;
          },
        },
      });
    </script>
  </body>
</html>
```



### v-model

v-model可以实现双向绑定

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>v-model</title>
    <script src="./lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <h4>{{ msg }}</h4>
      <input type="text" name="" v-model="msg" style="width: 500px" />
    </div>

    <script>
      var vm = new Vue({
        el: "#box",
        data: {
          msg: "为了终止绝望的连锁，希望她能化为照亮正确道路的灯火。",
        },
      });
    </script>
  </body>
</html>
```

修改input里的内容data.msg也会改变



### 简易计算器案列

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>简易计算器</title>
    <script src="./lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <input type="text" name="" v-model="n1" id="" />
      <select name="" v-model="op" id="">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input type="text" name="" v-model="n2" id="" />
      <input type="button" value="=" @click="calc" />
      <input type="text" name="" v-model="res" id="" />
    </div>

    <script>
      new Vue({
        el: "#box",
        data: {
          n1: 0,
          n2: 0,
          res: 0,
          op: "+",
        },
        methods: {
          calc() {
            var strCode = "parseInt(this.n1) " + this.op + " parseInt(this.n2)";
            this.res = eval(strCode);
          },
        },
      });
    </script>
  </body>
</html>
```



## 事件修饰符

- .stop 阻止冒泡

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>事件修饰符</title>
    <script src="./lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <div style="width: 200px; height: 200px; background-color: cadetblue" @click="outside">
        <input type="button" value="按钮" @click.stop="inside" />
      </div>
    </div>

    <script>
      var vm = new Vue({
        el: "#box",
        methods: {
          outside() {
            console.log("点击了外面的");
          },
          inside() {
            console.log("点击了里面的");
          },
        },
      });
    </script>
  </body>
</html>
```

如果不加`.stop`那么点击里面的元素是会冒泡到外面的元素，加了`.stop`指令后不会冒泡到外面的元素



- .prevent 阻止默认事件

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>事件修饰符</title>
    <script src="./lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <a href="https://www.baidu.com" @click.prevent="preventLink">百度Baidu</a>
    </div>

    <script>
      var vm = new Vue({
        el: "#box",
        methods: {
          preventLink() {
            console.log("阻止了a标签的默认跳转事件");
          },
        },
      });
    </script>
  </body>
</html>
```

点击A标签后阻止了跳转



- .capture 添加事件侦听器时使用事件捕获模式

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>事件修饰符</title>
    <script src="./lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <div style="width: 200px; height: 200px; background-color: cadetblue" @click.capture="outside" >
        <input type="button" value="按钮" @click="inside" />
      </div>
    </div>

    <script>
      var vm = new Vue({
        el: "#box",
        methods: {
          outside() {
            console.log("点击了外面的");
          },
          inside() {
            console.log("点击了里面的");
          }
        },
      });
    </script>
  </body>
</html>
```

添加 `.capture` 后，冒泡变成捕获了，从外面的元素往里面触发



- .self 只当事件在改元素本身（比如不是子元素）触发时触发回调

```html
<div
        style="width: 200px; height: 200px; background-color: cadetblue"
        @click.self="outside"
      >
        <input type="button" value="按钮" @click.self="inside" />
      </div>
```

点击后，只会阻止自己的冒泡行为，如果有三层，`.self`在第一层，那么它只阻止了第二层，第三层还是会触发，因为第三层是第二层的冒泡，不是第一次的冒泡



- .once 事件只触发一次

```html
<a href="https://www.baidu.com" @click.prevent.once="preventLink">百度Baidu，只阻止一次</a>
```

只阻止了一次默认行为，第二次点击后就可以跳转了

`.prevent`和`.once`哪个先哪个后没关系



## Vue中使用样式

### class样式

- 第一种：数组方式

```css
.red {
    color: red;
}
.size {
    font-size: 2.3rem;
}
.italic {
    font-style: italic;
}
```

```html
<div id="box">
    <p :class="['red', 'size'">
        今后无论发生什么事也好，这个左手上的⋯⋯都是同伴的记号！
    </p>
</div>
```

- 第二种：还可以用三元运算符，不加引号就表示data里的变量

```html
<div id="box">
    <p :class="['red', 'size', isItalic ? 'italic' : '']">
    	今后无论发生什么事也好，这个左手上的⋯⋯都是同伴的记号！
    </p>
</div>

<script>
    new Vue({
        el: "#box",
        data: {
            isItalic: true,
        },
    });
</script>
```

- 第三种：除了三元运算符在这里有更好的方法：

`{'样式': 变量}`，如果变量是true那么就显示该样式

```html
<p :class="['red', 'size', {'italic': isItalic}]">
    今后无论发生什么事也好，这个左手上的⋯⋯都是同伴的记号！
</p>
```

- 第四种：直接使用对象

```html
<p :class="{red: true, size: false}">
    今后无论发生什么事也好，这个左手上的⋯⋯都是同伴的记号！
</p>
```



### 内联样式

>  js中带`-`的键要用引号，例如'font-size'。用驼峰法可以不用引号,例如fontSize

- 第一种：`:style`

```html
<div id="box">
      <p :style="{color: 'red', 'font-size': '2.3rem'}">
        今后无论发生什么事也好，这个左手上的⋯⋯都是同伴的记号！
    </p>
</div>
```

- 第二种：使用变量

```html
    <div id="box">
      <p :style="myStyle">
        今后无论发生什么事也好，这个左手上的⋯⋯都是同伴的记号！
      </p>
    </div>

    <script>
      new Vue({
        el: "#box",
        data: {
          myStyle: { color: "red", "font-size": "2.3rem" },
        },
      });
    </script>
```

- 第三种：引用多个变量

```html
    <div id="box">
      <p :style="[myStyle, myStyle2]">
        今后无论发生什么事也好，这个左手上的⋯⋯都是同伴的记号！
      </p>
    </div>

    <script>
      new Vue({
        el: "#box",
        data: {
          myStyle: { color: "red", fontSize: "2.3rem" },
          myStyle2: { "font-style": "italic" },
        },
      });
    </script>
```



## 循环指令

### v-for

- 案例一：字符串数组

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <p v-for="(value, index) in list">索引：{{ index }}--值：{{ value }}</p>
    </div>
    <script>
      new Vue({
        el: "#box",
        data: {
          list: ["Tom", "John", "Ming", "Li"],
        },
      });
    </script>
  </body>
</html>
```

- 案列二：对象数组

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <p v-for="(user, index) in users">
        索引：{{index}}--姓名：{{user.name}}--年龄：{{user.age}}
      </p>
    </div>
    <script>
      new Vue({
        el: "#box",
        data: {
          users: [
            { name: "Tom", age: 18 },
            { name: "John", age: 15 },
            { name: "Ming", age: 19 },
          ],
        },
      });
    </script>
  </body>
</html>
```

- 案列三：循环对象属性

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <p v-for="(val, key) in human">键：{{key}}--值：{{val}}</p>
    </div>
    <script>
      new Vue({
        el: "#box",
        data: {
          human: {
            id: 1,
            name: "海贼王",
            dec: "历史虽然会一再重演，但人类却无法回到过去。",
          },
        },
      });
    </script>
  </body>
</html>
```

- 案例四：直接循环数字

```html
<p v-for="num in 5">循环第{{ num }}次</p>
```



### v-for中的key

14行的`:key="user.id"`，可以强制进行数据的关联

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <input type="text" name="" id="" v-model="addId" />
      <input type="text" name="" id="" v-model="addName" />
      <input type="button" value="添加" @click="add" />
      <p v-for="user in qins" :key="user.id">
        <input type="checkbox" />{{user.id}}.{{user.name}}
      </p>
    </div>
    <script>
      new Vue({
        el: "#box",
        data: {
          addId: null,
          addName: null,
          qins: [
            { id: 1, name: "李斯" },
            { id: 2, name: "赵高" },
            { id: 3, name: "项羽" },
          ],
        },
        methods: {
          add() {
            this.qins.unshift({ id: this.addId, name: this.addName });
          },
        },
      });
    </script>
  </body>
</html>
```



## v-if和v-show

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <input type="button" value="toggle" @click="flag = !flag" />
      <h3 v-if="flag">v-if控制的元素</h3>
      <h3 v-show="flag">v-show控制的元素</h3>
    </div>
    <script>
      new Vue({
        el: "#box",
        data: {
          flag: true,
        },
      });
    </script>
  </body>
</html>
```

v-if控制的元素：每次都删除和创建该元素

v-show控制的元素：隐藏和显示该元素，改变的是`display:none`样式



## 商品添加案例

代码路径：Vue代码练习\02\01-商品管理案例.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>商品管理案列</title>
    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"
    />
    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"
    ></script>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <form class="form-inline">
        <div class="form-group">
          <label for="exampleInputName2">id</label>
          <input type="text" class="form-control" id="exampleInputName2" placeholder="0" v-model="id"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail2">name</label>
          <input type="text" class="form-control" id="exampleInputEmail2" placeholder="name" v-model="name"
          />
        </div>
        <button type="button" class="btn btn-primary" @click="add">添加</button>
        <div class="form-group">
          <label for="exampleInputEmail3">搜索</label>
          <input type="text" class="form-control" id="exampleInputEmail3" placeholder="搜索" v-model="keyword"
          />
        </div>
      </form>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>id</th>
            <th>品牌名称</th>
            <th>添加时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in search(keyword)">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.ctime}}</td>
            <td><a href="#" @click.stop="del(item.id)">删除</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <script>
      new Vue({
        el: "#box",
        data: {
          id: null,
          name: null,
          keyword: "",
          list: [
            {
              id: 1,
              name: "宝马",
              ctime: new Date().toLocaleDateString(),
            },
            {
              id: 2,
              name: "大众",
              ctime: new Date().toLocaleDateString(),
            },
          ],
        },
        methods: {
          add() {
            var car = {
              id: this.id,
              name: this.name,
              ctime: new Date().toLocaleDateString(),
            };
            this.list.push(car);
            console.log(this.id);
            console.log(this.name);
          },
          del(id) {
            console.log(id);
            this.list.some((item, i) => {
              if (item.id == id) {
                this.list.splice(i, 1);
                return true;
              }
            });
          },
          search(keyword) {
            var newList = [];
            this.list.forEach((item) => {
              if (item.name.indexOf(keyword) != -1) {
                newList.push(item);
              }
            });
            return newList;
          },
        },
      });
    </script>
  </body>
</html>
```



### 过滤器

定义：

```
Vue.filter(过滤器名, 函数);
```

使用：

```
{{ 变量1 | 过滤器名 }}
```

- 例子：将第一个“一切”在渲染之前替换成“所有”

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <p>{{ txt | txtFilter }}</p>
    </div>
    <script>
      Vue.filter("txtFilter", function (txt) {
        return txt.replace("一切", "所有");
      });
      new Vue({
        el: "#box",
        data: {
          txt:
            "最好的时间段，莫过于开始的时候。那时候充满了好奇，向往和自约的协议动力，对一切选择来者不拒，但慢慢的发现并非一切的中途都是无害的。虽不知那一段时间是几何，也不管善恶的对象。最后想起了当初，一切的开始都还是美好的。",
        },
      });
    </script>
  </body>
</html>
```

- 还可以传参数，例：将所有的“一切”替换成“传过来的参数值”

replace使用正则`/正则表达式/g`，匹配全部，如果不带`g`那么只匹配一次

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <p>{{ txt | txtFilter('所有的所有') }}</p>
    </div>
    <script>
      Vue.filter("txtFilter", function (txt, arg) {
        return txt.replace(/一切/g, arg);
      });
      new Vue({
        el: "#box",
        data: {
          txt:
            "最好的时间段，莫过于开始的时候。那时候充满了好奇，向往和自约的协议动力，对一切选择来者不拒，但慢慢的发现并非一切的中途都是无害的。虽不知那一段时间是几何，也不管善恶的对象。最后想起了当初，一切的开始都还是美好的。",
        },
      });
    </script>
  </body>
</html>
```



### 配置多个过滤器

```
{{ txt | 过滤器1('所有的所有') | 过滤器2 }}
```

```javascript
Vue.filter("过滤器1", function (txt) {
	return txt;
});
Vue.filter("过滤器2", function (txt) {
	return txt;
});
```

- 例子

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <p>{{ txt | txtFilter('所有的所有') | author }}</p>
    </div>
    <script>
      Vue.filter("txtFilter", function (txt, arg) {
        return txt.replace(/一切/g, arg);
      });
      Vue.filter("author", function (txt) {
        return txt + " --朴素「安世」";
      });
      new Vue({
        el: "#box",
        data: {
          txt:
            "最好的时间段，莫过于开始的时候。那时候充满了好奇，向往和自约的协议动力，对一切选择来者不拒，但慢慢的发现并非一切的中途都是无害的。虽不知那一段时间是几何，也不管善恶的对象。最后想起了当初，一切的开始都还是美好的。",
        },
      });
    </script>
  </body>
</html>
```



### 时间格式化效果

```html
<td>{{item.ctime | dateFilter }}</td>
```

```javascript
Vue.filter("dateFilter", function (_ctime) {
    var ctime = new Date(_ctime);
    var year = ctime.getFullYear();
    var month = ctime.getMonth() + 1;
    var day = ctime.getDate();
    var h = ctime.getHours();
    var m = ctime.getMinutes();
    var s = ctime.getSeconds();
    return `${year}-${month}-${day} ${h}:${m}:${s}`;
});
```

- 时间字符串不足两位补0功能

```
字符串.toString().padStart(2, "0")
```

```
'2'.toString().padStart(2, "0")
结果:'02'
```



### 全局过滤器

上面那种方式创建的是全局过滤器，所谓的全局过滤器，就是所有的VM示例都共享



### 私有过滤器

```javascript
new Vue({
    el: "#box",
    filters: {
        过滤器名: 函数
    },
});
```

- 例子，如果全局和私有同名，那么就近原则，优先选择私有的过滤器

```html
<td>{{item.ctime | dateFilter }}</td>

<script>
    Vue.filter("dateFilter", function (_ctime) {
        var ctime = new Date(_ctime);
        var year = ctime.getFullYear();
        var month = ctime.getMonth() + 1;
        var day = ctime.getDate();
        var h = ctime.getHours();
        var m = ctime.getMinutes();
        var s = ctime.getSeconds();
        return `${year}-${month}-${day} ${h}:${m}:${s}`;
	});

    new Vue({
        el: "#box",
        filters: {
            dateFilter: function (_ctime) {
                var ctime = new Date(_ctime);
                var year = ctime.getFullYear();
                var month = ctime.getMonth() + 1;
                var day = ctime.getDate();
                var h = ctime.getHours();
                var m = ctime.getMinutes();
                var s = ctime.getSeconds();
                return "-----";
            },
        },
    });
</script>
```



### 自定义按键修饰符

```
@keyup.enter="function()"
```

- Vue提供的按键修饰符

```
.tab  .delete  .esc  .space  .up  .down  .left  .right
```

- 直接使用keyCode，`113`对应的按键是`f2`

```
@keyup.113="function()"
```

- 自定义按键修饰符，把113定义成f2

```
Vue.config.keyCodes.f2 = 113;
```

```
@keyup.f2="function()"
```



### 自定义指令

```javascript
Vue.directive(指令名, {
    bind: function() {},  // 这个是绑定时触发的函数，触发一次
    inserted: function() {},  // 这个是元素插入到dom时触发的函数，触发一次
    updated: function() {},  // 这个是data数据更新时触发的函数，触发多次
    // ......还有其它函数，具体看文档
});
```

- 例：为搜索框添加焦点，指令名不用加`v-`前缀，使用时才要

```html
<script>
    Vue.directive("focus", {
        bind: function () {},  // 1. 绑定时还没有插入元素，所以还获取不到焦点
        inserted: function (el) {
            el.focus();  // 2. 在页面插入元素后就获取焦点，focus是js的，js的最好在inserted里设置
        },
        updated: function () {},
    });
</script>
```

使用：注意要加`v-`前缀

```html
<input type="text" class="form-control"placeholder="搜索" v-model="keyword" v-focus />
```

- 例：自定义一个字体红色的指令

```html
<script>
    Vue.directive("color", {
        bind: function (el) {
          el.style.color = 'red';  // 和样式相关的最好在bind里设置
        }
    });
</script>
```



### 带参数的自定义指令

binding是Vue提供的一个对象

`binding.value` ：拿到的是去除引号的

`binding.expression`：拿到的是原样的数据

```html
<script>
    Vue.directive("color", {
        bind: function (el, binding) {
        el.style.color = binding.value; // 和样式相关的最好在bind里设置
        },
    });
</script>
```

使用：

```html
<input type="text" class="form-control"placeholder="搜索" v-model="keyword" v-color="'blue'" />
```



### 私有自定义指令

```html
<div id="box">
    <input type="text" class="form-control" placeholder="搜索" v-model="keyword" v-mycolor="'blue'">
</div>

<script>
    // 全局自定义指令
    Vue.directive("color", {
        bind: function (el, binding) {
            el.style.color = binding.value; // 和样式相关的最好在bind里设置
        },
    });

    new Vue({
        el: "#box",
        directives: {  // 私有自定义指令
          mycolor: {  // 注意！！，指令名要小写
            bind: function (el, binding) {
              el.style.color = binding.value;
            },
          },
        },
    });
</script>
```



### 指令函数简写

注意!!! 指令名要小写

```html
<div id="box">
    <input type="text" class="form-control" placeholder="搜索" v-model="keyword" myfontsize="25">
</div>

<script>
    new Vue({
        el: "#box",
        directives: {  // 私有自定义指令
          myfontsize: function (el, binding) {  // 这个function相当于bind和updated
            el.style.fontSize = parseInt(binding.value) + "px";
          },
        },
    });
</script>
```



## 生命周期

<img src="https://cn.vuejs.org/images/lifecycle.png" style="zoom: 50%;" />

### beforeCreate

beforeCreate是第一个生命周期，在创建实例之前执行，运行下面代码可以发现beforeCreate方法提示找不到show()和msg

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box"></div>
    <script>
      new Vue({
        el: "#box",
        data: {
          msg: "Hello...",
        },
        methods: {
          show() {
            console.log("Show()...");
          },
        },
        beforeCreate() {
          console.log("beforeCreate()  start....");
          console.log(this.msg);
          console.log(this.show());
          console.log("beforeCreate()  end....");
        },
      });
    </script>
  </body>
</html>
```



### created

created是第二个生命周期，在`data`和`methods`创建后执行

```html
<script>
    new Vue({
        el: "#box",
        data: {
            msg: "Hello...",
        },
        methods: {
            show() {
                console.log("Show()...");
            },
        },
        beforeCreate() {
            console.log("beforeCreate()  start....");
            console.log(this.msg);
            console.log(this.show());
            console.log("beforeCreate()  end....");
        },
        created() {
            console.log("created()  start...");
            console.log(this.msg);
            console.log(this.show());
            console.log("created()  end...");
        },
    });
</script>
```



### beforeMount

第三个生命周期函数，表示模板已经编辑完成，但没有渲染到页面

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <h3 id="h3">{{msg}} World</h3>
    </div>
    <script>
      new Vue({
        el: "#box",
        data: {
          msg: "Hello...",
        },
        beforeMount() {
          console.log("挂载前: " + document.getElementById("h3").outerHTML);
        },
      });
    </script>
  </body>
</html>
```

输出：`挂载前 <h3 id="h3">{{msg}} World</h3>`



### mounted

```javascript
mounted() {
    console.log("挂载后: " + document.getElementById("h3").outerHTML);
}
```

输出：`挂载后: <h3 id="h3">Hello... World</h3>`



### 运行中

运行后的函数：`update` `beforeUpdate`



### 销毁阶段

销毁前：`beforeDestory`

销毁：`destory` 销毁后，数据、方法、过滤器、自定义指令...都会被销毁



## axios

> Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

官方文档：http://www.axios-js.com/zh-cn/docs/



### get&post

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <input type="button" value="get" @click="get" />
      <h5 v-html="getDate"></h5>
      <hr />
      <input type="text" name="" v-model="reqDate" id="" />
      <input type="button" value="post" @click="post" />
      <h5>{{postDate}}</h5>
    </div>
    <script>
      new Vue({
        el: "#box",
        data: {
          getDate: "",
          reqDate: "",
          postDate: "",
        },
        methods: {
          get() {
            var that = this;
            axios.get("https://autumnfish.cn/api/joke/list?num=3").then(
              function (resp) {
                var temp = "";
                resp["data"]["jokes"].forEach((jokeStr) => {
                  temp += jokeStr + "<br>";
                });
                that.getDate = temp;
              },
              function (err) {
                console.log("加载失败：" + err);
              }
            );
          },
          post() {
            var that = this;
            axios
              .post("https://autumnfish.cn/api/user/reg", {
                username: that.reqDate,
              })
              .then(
                function (resp) {
                  that.postDate = resp.data;
                },
                function (err) {
                  console.log("加载失败：" + err);
                }
              );
          },
        },
      });
    </script>
  </body>
</html>
```



除了上面的`axios.get(url[, config])`和`axios.post(url[, config])`还有

```
axios.request(config)

axios.delete(url[, config])

axios.head(url[, config])

axios.options(url[, config])

axios.put(url[, data[, config]])

axios.patch(url[, data[, config]])
```



### 案列：天知道

代码路径：Vue代码练习\02\05-案例：天知道



### 案例：音乐播放器

代码路径：Vue代码练习\02\06-案例：音乐播放器



## Vue动画

Vue提供了一个标签`transition`，用于自定义动画，把需要动画的包裹起来

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>动画</title>
    <script src="lib/vue_v2.6.11.js"></script>
    <style>
      .v-enter,  /* v-enter 时间点，是进入之前的状态，此时还没有开始进入 */
      .v-leave-to {
        /* v-leave-to 时间点，是动画离开之后的状态，此时动画已经结束了 */
        opacity: 0;
        transform: translateX(150px);
      }

      .v-enter-active, /* 入场动画的时间段 */
      .v-leave-active {
        /* 立场动画的时间段 */
        transition: all 0.6s ease;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <input type="button" value="toggle" @click="show = !show;" />
      <transition>
        <h3 v-if="show">蒹葭采采，白露未已。所谓伊人，在水之涘。</h3>
      </transition>
    </div>
    <script>
      new Vue({
        el: "#box",
        data: {
          show: false,
        },
      });
    </script>
  </body>
</html>
```



### 自定义前缀

在`transition`标签里添加`name="自定义前缀"`即可

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>动画</title>
    <script src="lib/vue_v2.6.11.js"></script>
    <style>
      .my-enter,
      .my-leave-to {
        opacity: 0;
        transform: translateX(150px);
      }

      .my-enter-active,
      .my-leave-active {
        transition: all 0.6s ease;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <input type="button" value="toggle" @click="show = !show;" />
      <transition name="my">
        <h3 v-if="show">蒹葭采采，白露未已。所谓伊人，在水之涘。</h3>
      </transition>
    </div>
    <script>
      new Vue({
        el: "#box",
        data: {
          show: false,
        },
      });
    </script>
  </body>
</html>
```



## 组件

> 什么是组件?
>
> 组件的出现，就是为了拆分Vue实例的代码量的，能够让我们以不同的组件，来划分不同的功能模块，将来我们需要什么样的功能，就可以去调用对应的组件即可；
>
> 组件化和模块化的不同?
>
> - 模块化：是从代码逻辑的角度进行划分的；
> - 组件化：是从Ul界面的角度进行划分的；



### 第一种创建方式

1. `var 模板对象 = Vue.extend` 创建全局组件
2. `Vue.component(组件名, 模板对象)` 
3. 使用：`<组件名></组件名>`
4. 注意，如果`Vue.component(组件名, 模板对象)` 的组件名用的是驼峰的话，那么使用时用`-`

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>组件-1</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <my-com1></my-com1>
    </div>
    <script>
      var com1 = Vue.extend({
        template: "<h3>extend创建的组件</h3>",
      });
      Vue.component("myCom1", com1);
      new Vue({
        el: "#box",
        data: {},
      });
    </script>
  </body>
</html>
```



### 第二种创建方式

直接`Vue.component`

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>组件2</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <my-com2></my-com2>
    </div>
    <script>
      Vue.component("myCom2", {
        template: "<h3>extend创建的组件</h3>",
      });
      new Vue({
        el: "#box",
        data: {},
      });
    </script>
  </body>
</html>
```



### 第三种创建方式

1. 在外面创建一个`template`标签，然后`component`添加

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>组件3</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <my-com3></my-com3>
    </div>
    <template id="tmp1">
      <div>  <!- 这里要用div，不然只会读取第一个h3 ->
        <h3>年年岁岁花相似，岁岁年年人不同。</h3>
        <h3>这种方式好用</h3>
      </div>
    </template>
    <script>
      Vue.component("myCom3", {
        template: "#tmp1",
      });
      new Vue({
        el: "#box",
        data: {},
      });
    </script>
  </body>
</html>
```



### 私有组件

`components` 属性

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>私有组件</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <private-com></private-com>
    </div>
    <div id="box2">
      <private-com></private-com>
      <!-- 私有,用不了 -->
    </div>

    <template id="tmp1">
      <div>
        <h3>年年岁岁花相似，岁岁年年人不同。</h3>
        <h3>这种方式好用</h3>
      </div>
    </template>
    <script>
      new Vue({
        el: "#box",
        components: {
          privateCom: {
            template: "#tmp1",
          },
        },
      });
    </script>
  </body>
</html>
```



### 组件里的数据

```javascript
new Vue({
    el: "#box",
    components: {
        privateCom: {
            template: "#tmp1",
            data: function () {
                return {
                    msg: "我是组件里的data数据",
                };
            },
        },
    },
});
```

使用的话跟之前的一样

- 例

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>私有组件</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <private-com></private-com>
    </div>

    <template id="tmp1">
      <div>
        <h4>{{msg}}</h4>
      </div>
    </template>
    <script>
      new Vue({
        el: "#box",
        components: {
          privateCom: {
            template: "#tmp1",
            data: function () {
              return {
                msg: "我是组件里的data数据",
              };
            },
          },
        },
      });
    </script>
  </body>
</html>
```



### 组件切换

Vue提供的`component`标签的`:is`属性可以切换组件

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>组件切换</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <a href="#" @click.prevent="comName = 'login'">登录</a>
      <a href="#" @click.prevent="comName = 'register'">注册</a>

      <component :is="comName"> </component>
    </div>
    <script>
      Vue.component("login", {
        template: "<h3>登录页面</h3>",
      });
      Vue.component("register", {
        template: "<h3>注册页面</h3>",
      });
      new Vue({
        el: "#box",
        data: {
          comName: "login",
        },
      });
    </script>
  </body>
</html>
```



### 组件切换的过渡动画

跟一样，用`transition`标签包起来就可以，然后再style里设置动画

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>组件切换</title>
    <script src="lib/vue_v2.6.11.js"></script>
    <style>
      .v-enter,
      .v-leave-to {
        opacity: 0;
        transform: translateX(150px);
      }

      .v-enter-active,
      .v-leave-active {
        transition: all 0.6s ease;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <a href="#" @click.prevent="comName = 'login'">登录</a>
      <a href="#" @click.prevent="comName = 'register'">注册</a>

      <transition mode="out-in">
        <component :is="comName"> </component>
      </transition>
    </div>
    <script>
      Vue.component("login", {
        template: "<h3>登录页面</h3>",
      });
      Vue.component("register", {
        template: "<h3>注册页面</h3>",
      });
      new Vue({
        el: "#box",
        data: {
          comName: "login",
        },
      });
    </script>
  </body>
</html>
```



### 父组件传值给子组件

子组件默认情况下是访问不了父组件的`data`数据的，需要通过`v-bind:`(简写`:`)方式传递给子组件

1. `:属性名="值"`
2. 子组件里要设置`props`属性，数组类型`props: [属性1, 属性名2,...]`
3. template使用:`{{属性名}}`
4. 父组件传过来的是只读的，强制修改会warn

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>01-父组件传值给子组件</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <son :parentmsg="msg"></son>
    </div>
    <script>
      var app = new Vue({
        el: "#box",
        data: {
          msg: " --诗经",
        },
        components: {
          son: {
            template: "<h3>投我以桃，报之以李。{{parentmsg}}</h3>",
            props: ["parentmsg"],
          },
        },
      });
    </script>
  </body>
</html>

```



### 调用父组件的方法

用`v-on`(简写`:`)的方式传递过去

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>02-调用父组件的方法</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <son @func="echo"></son>
    </div>

    <script>
      new Vue({
        el: "#box",
        methods: {
          echo() {
            console.log("我是父组件的方法！！！");
          },
        },
        components: {
          son: {
            template:
              '<input type="button" value="Click Here" @click="sonEcho">',
            methods: {
              sonEcho() {
                //   $emit 英文是发射，调用的意思，在Vue是调用父组件的功能
                this.$emit("func");
              },
            },
          },
        },
      });
    </script>
  </body>
</html>
```



### 带参数的调用父组件方法

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>03-调用父组件的方法</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <son @func="echo"></son>
    </div>

    <script>
      new Vue({
        el: "#box",
        methods: {
          echo(hitokoto, author, from) {
            console.log(` ${hitokoto} -- by:${author}  -- 来源:${from}`);
          },
        },
        components: {
          son: {
            template:
              '<input type="button" value="Click Here" @click="sonEcho">',
            methods: {
              sonEcho() {
                //   $emit 英文是发射，调用的意思，在Vue是调用父组件的功能
                this.$emit(
                  "func",
                  "一个人可以被毁灭，但不能被打败。",
                  "海明威",
                  "老人与海"
                );
              },
            },
          },
        },
      });
    </script>
  </body>
</html>
```



### 案例：评论列表

代码目录：Vue代码练习\04\案例：评论列表.html



## ref获取dom

添加`ref`属性即可

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>04-ref获取dom</title>
    <script src="lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <h3 ref="myh3">我在时光斑驳深处，聆听到花开的声音。</h3>
      <input type="button" value="Click Here" @click="echo" />
    </div>
    <script>
      new Vue({
        el: "#box",
        data: {},
        methods: {
          echo() {
            console.log(this.$refs.myh3.innerText);
          },
        },
      });
    </script>
  </body>
</html>
```



## 路由

官方文档：https://router.vuejs.org/zh/

### 快速开始

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./lib/vue_v2.6.11.js"></script>
    <!-- 0. 导入路由第三方包 -->
    <script src="./lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <router-link to="/login" tag="span">登录</router-link>
      <router-link to="/register">注册</router-link>
      <!-- 5. 要在box里创建一个router-view标签 -->
      <router-view></router-view>
    </div>
    <script>
      // 1. 创建模板
      const login = {
        template: "<h3>登录页面</h3>",
      };
      const register = {
        template: "<h3>注册页面</h3>",
      };
      //   2. 定义路由表
      const routes = [
        { path: "/", redirect: "/login" },
        { path: "/login", component: login },
        { path: "/register", component: register },
      ];
      //   3. 创建路由示例
      const router = new VueRouter({
        routes, // (缩写) 相当于 routes: routes
      });

      var app = new Vue({
        el: "#box",
        data: {},
        router, // 4. 挂载路由示例
      });
    </script>
  </body>
</html>
```



### router-link

router-link是Vue提供的一个标签，默认渲染的样式是a标签

- 渲染成span标签

```html
<router-link to="/login" tag="span">登录</router-link>
```



### 重定向

这里的redirect重定向跟node是不一样的，node是服务器返回30x然后浏览器去执行的

```javascript
//   2. 定义路由表
const routes = [
    {path: '/', redirect: '/login'},
    { path: "/login", component: login },
    { path: "/register", component: register},
];
```



### 路由切换动画

用`transiton`标签，跟之前一样



### 路由取参数值

`this.$route`是这个路由的详情信息

- 第一种方式获取

```html
<router-link to="/login?id=10&name=tom" tag="span">登录</router-link>
```

```javascript
const login = {
    template: "<h3>登录页面--ID:{{$route.query.id}}--Name:{{$route.query.name}}</h3>",
};
```



- 第二种方式获取

第二种方式需要在路由表里定义定位符

```html
<router-link to="/login/11/tom"  tag="span">登录2</router-link>
```

```javascript
const login = {
    template: "<h3>登录页面--ID:{{$route.params.id}}--Name:{{$route.params.name}}</h3>",
};
```

```javascript
//  定义路由表
const routes = [
    {path: '/', redirect: '/login'},
    { path: "/login/:id/:name", component: login },
    { path: "/register", component: register},
];
```



### 路由嵌套

使用`children`属性实现子路由，子路由的`path`是不带斜杠的

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>07-路由嵌套</title>
    <script src="./lib/vue_v2.6.11.js"></script>
    <script src="./lib/vue-router.js"></script>
  </head>
  <body>
    <div id="box">
      <router-link to="/box">点击进入Box</router-link> <br />
      <router-view></router-view>
    </div>
    <template id="tmp1">
      <div style="height: 150px; width: 200px; border: 5px solid #999999">
        <h1>Box</h1>
        <router-link to="/box/login">嵌套的登录</router-link>
        <router-link to="/box/register">嵌套的注册</router-link>
        <router-view></router-view>
      </div>
    </template>
    <script>
      const box = {
        template: "#tmp1",
      };
      const login = {
        template: "<h3 style='border: 1px solid #66ccff'>登录页面</h3>",
      };
      const register = {
        template: "<h3 style='border: 1px solid #66ccff'>注册页面</h3>",
      };
      const routes = [
        {
          path: "/box",
          component: box,
          children: [
            { path: "login", component: login },
            { path: "register", component: register },
          ],
        },
      ];

      const router = new VueRouter({
        routes, // (缩写) 相当于 routes: routes
      });

      var app = new Vue({
        el: "#box",
        data: {},
        router,
      });
    </script>
  </body>
</html>
```



### 经典布局

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>08-命名视图</title>
    <script src="./lib/vue_v2.6.11.js"></script>
    <script src="./lib/vue-router.js"></script>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      #head {
        height: 200px;
        width: 100%;
        background-color: #ffcf40;
      }
      #left {
        width: 20%;
        height: 100%;
        background-color: #ffdc73;
        float: left;
      }
      #main {
        width: 100%;
        height: 100%;
        background-color: #ffbf00;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <router-view id="head"></router-view>
      <div style="height: 800px">
        <router-view name="left" id="left"></router-view>
        <router-view name="main" id="main"></router-view>
      </div>
    </div>
    <script>
      const head = {
        template: "<h1>head区域</h1>",
      };
      const left = {
        template: "<h1>left区域</h1>",
      };
      const main = {
        template: "<h1>main区域</h1>",
      };
      const router = new VueRouter({
        routes: [
          {
            path: "/",
            components: {
              default: head,
              left: left,
              main: main,
            },
          },
        ],
      });
      var app = new Vue({
        el: "#box",
        data: {},
        router,
      });
    </script>
  </body>
</html>
```



### watch监听数据变化

- 监控data里的数据变化

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>02-watch</title>
    <script src="./lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <input type="text" v-model="firstname" placeholder="firstname" />
      +
      <input type="text" v-model="lastname" placeholder="lastname" />
      <input type="text" v-model="fullname" placeholder="fullname" />
    </div>
    <script>
      var app = new Vue({
        el: "#box",
        data: {
          firstname: "",
          lastname: "",
          fullname: "",
        },
        watch: {
          firstname: function () {
            this.fullname = this.firstname + this.lastname;
          },
          lastname: function () {
            this.fullname = this.firstname + this.lastname;
          },
        },
      });
    </script>
  </body>
</html>
```

- 监控url路由地址

`$route.path` 是路由地址信息

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>03-watch监控url</title>
    <script src="./lib/vue_v2.6.11.js"></script>
    <script src="./lib/vue-router.js"></script>
  </head>
  <body>
    <div id="box">
      <router-view></router-view>
    </div>

    <script>
      var login = {
        template: "<h3>登录页面</h3>",
      };
      var register = {
        template: "<h3>注册页面</h3>",
      };
      var routes = [
        { path: "/login", component: login },
        { path: "/register", component: register },
      ];
      var router = new VueRouter({
        routes,
      });
      var app = new Vue({
        el: "#box",
        data: {},
        router,
        watch: {
          "$route.path": function (newVal, oldVal) {
            if (newVal === "/login") {
              console.log("当前页面是登录页面");
            } else if (newVal === "/register") {
              console.log("当前页面是注册页面");
            }
          },
        },
      });
    </script>
  </body>
</html>
```



### computed

computed也可以实现计算，将fullname定义成函数，然后返回数据

function里使用到的data数据如果发生改变，那么就会触发computed

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>02-watch</title>
    <script src="./lib/vue_v2.6.11.js"></script>
  </head>
  <body>
    <div id="box">
      <input type="text" v-model="firstname" placeholder="firstname" />
      +
      <input type="text" v-model="lastname" placeholder="lastname" />
      <input type="text" v-model="fullname" placeholder="fullname" />
    </div>
    <script>
      var app = new Vue({
        el: "#box",
        data: {
          firstname: "",
          lastname: "",
        },
        computed: {
          fullname: function () {
            return this.firstname + this.lastname;
          },
        },
      });
    </script>
  </body>
</html>
```



## nrm

`npm i nrm -g` 下载

`nrm ls` 查看镜像源

`nrm use 镜像源名` 使用镜像源



## webpack

官网文档：https://www.webpackjs.com/



### 安装

1. 安装

```bash
npm init -y
npm install webpack webpack-cli --save-dev
```

- package.json

```json
{
  "name": "webpack_study",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "dependencies": {
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

最重要的是`"build": "webpack"` 这个是打包的命令配置和`"private": true,` 其它的配置是npm自动生成的，只需添加这两个配置即可

- webpack.config.js

```javascript
const path = require("path");  // 导入path包

module.exports = {  // node.js的导出
  entry: "./src/index.js",  // 入口，表示要打包的文件
  output: {  // 输出文件配置
    filename: "bundle.js",  // 输出文件名称
    path: path.resolve(__dirname, "dist"),  // 输出文件目录
  },
};
```

这个是配置打包出来的js文件名等其它配置

> 官方：`https://www.webpackjs.com/guides/getting-started/#基本安装`



### 快速开始

1. `npm i jquery` 安装一下jQuery

2. 目录结构

```diff
webpack-study
|- /node_modules
|- package.json
|- package-lock.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
```

src/index.js

```javascript
// 项目的js入口文件
import $ from "jquery";  // 导入文件

$(function () {
  $("li").css("color", "#66ccff");
});
```

dist/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>起步</title>
  </head>
  <body>
    <script src="./bundle.js"></script>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </body>
</html>
```

`src/index.js`是源文件，然后`dist/index.html`引用的`dist/bundle.js`是打包过的js

打包命令：`npm run build`



### 自动打包工具

1. 安装

```bash
npm i webpack-dev-server -D
```

2. 引用

- 引用的js文件不是之前的`dist/bundle.js`了，而是根路径

- webpack-dev-server把生成的bundle.js存储在内存中，在文件资源管理器中看不到

```html
<script src="/bundle.js"></script>
```

3. 配置命令，在package.js的`scripts`添加`"dev": "webpack-dev-server"`

```json
{
  ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+   "dev": "webpack-dev-server"
  },
  ...
}
```

4. 运行`npm run dev`



### 导入css样式

1. 下载loader

```bash
npm i style-loader css-loader -D
```

未完待续......