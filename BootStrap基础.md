# BootStrap基础

## 概述

Bootstrap，来自 Twitter，是目前最受欢迎的前端框架。Bootstrap 是基于 HTML、CSS、JAVASCRIPT 的，它简洁灵活，使得 Web 开发更加快捷。

Bootstrap中文：https://www.bootcss.com/

响应式布局：

+ 同一套页面可以兼容不同的分辨率设备

### 下载地址

https://v3.bootcss.com/getting-started/#download



### 引入

```html
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />
```



## 响应式布局

### 容器

container: 两边留白

container-fluid: 每一种设备都是100%宽度



### 设备代号

- xs:  手机 (< 768px)

- sm:  iPad (>= 768px)
- md: 笔记本 (>= 992px)
- lg:  曲面屏 (>= 1200px)



col-lg-1  笔记本中一行有12个栅格

col-sm-2  iPad中一行有6个栅格

### tip

- 如果超过12个栅格会换行

- 向上兼容



## 全局css样式

### 按钮

可以在A 、button、input:type=submit、input:typebutton 里使用

更多：https://v3.bootcss.com/css/#buttons-tags

btn  按钮样式

btn-default  默认按钮

+ btn-primary  首选项按钮
+ btn-success  成功按钮



### 图片

```html
<img src="http://www.dmoe.cc/random.php" alt="随窗口变化，后面可以接下面三种形状" class="img-responsive" />
```

- 形状

```html
<img src="http://www.dmoe.cc/random.php" alt="方形图片" class="img-rounded" />
<img src="http://www.dmoe.cc/random.php" alt="圆形图片" class="img-responsive" />
<img src="http://www.dmoe.cc/random.php" alt="缩略图片，随窗口变化" class="img-thumbnail" />
```

- 例：圆形的随窗口变化的图片

```html
<img src="http://www.dmoe.cc/random.php" alt="" class="img-responsive img-circle" />
```



### 表格

更多：https://v3.bootcss.com/css/#tables

主类：table

- 条纹状表格：.table-striped
- 带边框的表格：.table-bordered

- 例：

```html
<table class="table table-bordered table-hover">
    <tr>
        <th>key</th>
        <th>value</th>
    </tr>
    <tr>
        <td>one</td>
        <td>two</td>
    </tr>
    <tr>
        <td>1</td>
        <td>2</td>
    </tr>
    <tr>
        <td>一番</td>
        <td>二番</td>
    </tr>
</table>
```



## 组件

### 导航条



### 分页

disabled  禁用此页

```html
<li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
```

active   当前页

```html
<li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
```



## 轮播图

要引入 jQuery、bootstrap.js

```html
<link href="./bootstrap/css/bootstrap.css" rel="stylesheet" />
<script src="./js/jquery-3.5.1.js"></script>
<script src="./bootstrap/js/bootstrap.js"></script>
```



## Layui

### 布局

栅格的响应式能力，得益于CSS3媒体查询（Media Queries）的强力支持，从而针对四类不同尺寸的屏幕，进行相应的适配处理

|                             | 超小屏幕 (手机<768px) | 小屏幕 (平板≥768px) | 中等屏幕 (桌面≥992px) | 大型屏幕 (桌面≥1200px) |
| :-------------------------- | :-------------------- | :------------------ | :-------------------- | :--------------------- |
| *.layui-container*的值      | auto                  | 750px               | 970px                 | 1170px                 |
| 标记                        | xs                    | sm                  | md                    | lg                     |
| 列对应类 * 为1-12的等分数值 | layui-col-xs*         | layui-col-sm*       | layui-col-md*         | layui-col-lg*          |

- 练习：

```html
<div class="layui-container">
    <div class="layui-row">
        <div class="layui-col-md6">md6</div>
        <div class="layui-col-md6">md6</div>
    </div>
    
    <div class="layui-row">
        <div class="layui-col-xs12 layui-col-sm6 layui-col-md4">移动：12/12 | 平板：6/12 | 桌面：4/12</div>
        <div class="layui-col-xs12 layui-col-sm6 layui-col-md4">移动：12/12 | 平板：6/12 | 桌面：4/12</div>
    </div>
</div>
```



### 图标

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css" />
  </head>
  <body>
    <i class="layui-icon layui-icon-face-smile" style="font-size: 30px; color: #66ccff"></i>笑脸
      
    <i class="layui-icon layui-icon-addition" style="font-size: 30px; color: #66ccff"></i>添加

    <i class="layui-icon layui-icon-cellphone" style="font-size: 30px; color: #66ccff"></i>手机号
  </body>
</html>
```



### 表单

`layui-form`

导入`form.js` ，语法：

```
layui.use('form', function(){}
```

然后监听提交事件

- 例子

```html
<form class="layui-form" action="">
    
  <div class="layui-form-item">
    <label class="layui-form-label">输入框</label>
    <div class="layui-input-block">
      <input type="text" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
    </div>
  </div>

  <div class="layui-form-item">
    <div class="layui-input-block">
      <button class="layui-btn" lay-submit lay-filter="formDemo">提交</button>
      <button type="reset" class="layui-btn layui-btn-primary">重置</button>
    </div>
  </div>
</form>

<script>
layui.use('form', function(){
  var form = layui.form;
  
  //监听提交
  form.on('submit(formDemo)', function(data){
    layer.msg(JSON.stringify(data.field));
    return false;
  });
});
</script>
```



### 表格

`layui-table`

```html
<table class="layui-table">
    <thead><tr><th>ID</th></tr></thead>
    <tbody><tr><td>1</td></tr></tbody>
</table>
```



### 动态表格

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css" />
    <script src="../layui/layui.js"></script>
  </head>
  <body>
      这里放一个table标签
    <table id="demo" lay-filter="test"></table>

 <script>
      layui.use("table", function () {
        var table = layui.table;

        //第一个实例
        table.render({
          elem: "#demo",
          height: 312,
          url: "http://127.0.0.1:5500/%E7%BB%83%E4%B9%A0/a.json", //数据接口
          page: { first: "首页", last: "尾页" },  // 分页配置
          cols: [
            [
              //表头
              {
                field: "id",
                title: "ID",
                width: 80,
                sort: true,
                fixed: "left",
              },
              { field: "username", title: "用户名", width: 80 },
              { field: "sex", title: "性别", width: 80, sort: true },
              { field: "city", title: "城市", width: 80 },
              { field: "sign", title: "签名", width: 177 },
              { field: "experience", title: "积分", width: 80, sort: true },
              { field: "score", title: "评分", width: 80, sort: true },
              { field: "classify", title: "职业", width: 80 },
              { field: "wealth", title: "财富", width: 135, sort: true },
            ],
          ],
        });
      });
    </script>
  </body>
</html>
```

数据

上面的`field` 对应这里的data的列，然后`title`是显示的

```json
{
  "code": 0,
  "msg": "",
  "count": 1000,
  "data": [
    {
      "id": 10000,
      "username": "user-0",
      "sex": "女",
      "city": "城市-0",
      "sign": "签名-0",
      "experience": 255,
      "logins": 24,
      "wealth": 82830700,
      "classify": "作家",
      "score": 57
    },
    {
      "id": 10008,
      "username": "user-8",
      "sex": "男",
      "city": "城市-8",
      "sign": "签名-8",
      "experience": 951,
      "logins": 133,
      "wealth": 16503371,
      "classify": "词人",
      "score": 14
    },
  ]
}
```



- 工具条

```
table.render({
    elem: "#demo",
    height: 312,
    url: "http://127.0.0.1:5500/%E7%BB%83%E4%B9%A0/a.json", //数据接口
    page: { first: "首页", last: "尾页" },
    toolbar: "#barDemo",  // 工具条，可用导出、刷选、打印
    cols: []
})
```



### 导航

- 垂直导航

```html
<ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li class="layui-nav-item layui-nav-itemed">
        <a href="javascript:;">默认展开</a>
        <dl class="layui-nav-child">
          <dd><a href="javascript:;">选项1</a></dd>
          <dd><a href="javascript:;">选项2</a></dd>
          <dd><a href="">跳转</a></dd>
        </dl>
      </li>
      <li class="layui-nav-item">
        <a href="javascript:;">解决方案</a>
        <dl class="layui-nav-child">
          <dd><a href="">移动模块</a></dd>
          <dd><a href="">后台模版</a></dd>
          <dd><a href="">电商平台</a></dd>
        </dl>
      </li>
      <li class="layui-nav-item"><a href="">产品</a></li>
      <li class="layui-nav-item"><a href="">大数据</a></li>
    </ul>

要导入element模块
    <script>
      layui.use("element", function () {});
    </script>
```

把`layui-nav-tree` 去掉就是水平的导航



### 动画

`layui-anim`  和 ` layui-anim-xxxx`

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css" />
    <script src="../layui/layui.js"></script>
  </head>
  <body>
    其中 layui-anim 是必须的，后面跟着的即是不同的动画类
    <div class="layui-anim layui-anim-up">aaa</div>

    循环动画，追加：layui-anim-loop
    <div class="layui-anim layui-anim-rotate">bbb</div>
  </body>
</html>
```



### 内置模块layer

弹窗：msg、alert、confirm

导入方法1：直接导入js

```html
<script src="layer.js"></script>
<script>
layer.msg('hello'); 
</script>
```



导入方法2：用use导入

导入模块时，导入多个用数组[]，一个可以不加[]，例layui.use("layer")

- msg

```javascript
layui.use(["layer"], function () {
    var layer = layui.layer;
    layer.msg("弹窗内容");
});
```

- alert

```javascript
layui.use(["layer"], function () {
    var layer = layui.layer;
    layer.alert("弹窗内容", { title: "标题", icon: 6 }, function () {
        layer.msg("点击确定后的回调函数");
    });
});
```

- confirm

```javascript
layui.use(["layer"], function () {
    var layer = layui.layer;
    layer.confirm(
        "确定框内容",
        {
            title: "标题",
            icon: 3,
            btn: ["好！确定", "好！取消", "不清楚"],
            btn3: function () {
                // 第三个按钮要再这里回调
                layer.msg("点击了第三个按钮");
            },
        },
        function () {
            layer.msg("点击了确定");
        },
        function () {
            layer.msg("点击了取消");
        }
    );
});
```

- open

```javascript
layui.use(["layer"], function () {
    var layer = layui.layer;
    //eg2
    layer.open({
        content: "test",
        btn: ["按钮一", "按钮二", "按钮三"],
        yes: function (index, layero) {
            layer.msg("按钮【按钮一】的回调");
        },
        btn2: function (index, layero) {
            layer.msg("按钮【按钮二】的回调");
        },
        btn3: function (index, layero) {
            layer.msg("按钮【按钮三】的回调");
        },
        cancel: function () {
            layer.msg("右上角关闭回调");
            // return false 开启该代码可禁止点击该按钮关闭
        },
    });
});
```

- 坐标

具体：https://www.layui.com/doc/modules/layer.html#offset

```javascript
offset: "rb",  //快捷设置右下角
```

```javascript
layui.use(["layer"], function () {
    var layer = layui.layer;
    //eg2
    layer.open({
        content: "test",
        btn: ["按钮一"],
        yes: function (index, layero) {
            layer.msg("按钮【按钮一】的回调");
        },
        offset: "rb",
    });
});
```



### 文件上传

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../layui/css/layui.css" />
    <script src="../layui/layui.js"></script>
  </head>
  <body>
    <button type="button" class="layui-btn" id="test1">
      <i class="layui-icon">&#xe67c;</i>上传图片
    </button>

    <script>
      layui.use(["upload", "layer"], function () {
        var upload = layui.upload;

        //执行实例
        var uploadInst = upload.render({
          elem: "#test1", //绑定元素
          url: "/upload/", //上传接口
          accept: "images", // 允许上传的文件类型
          size: 500,  // 限制最大500kb
          done: function (res) {
            //上传完毕回调
          },
          error: function () {
            //请求异常回调
          },
        });
      });
    </script>
  </body>
</html>
```



| 参数选项 | 说明                                                         | 类型   | 默认          |
| :------- | :----------------------------------------------------------- | :----- | :------------ |
| accept   | 指定允许上传时校验的文件类型，可选值有：*images*（图片）、*file*（所有文件）、*video*（视频）、*audio*（音频） | string | images        |
| size     | 设置文件最大可允许上传的大小，单位 KB。不支持ie8/9           | number | 0（即不限制） |



### 轮播图

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>carousel模块快速使用</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all" />
  </head>
  <body>
    <div class="layui-carousel" id="test1">
      <div carousel-item>
        <div><img src="https://api.ixiaowai.cn/api/api.php?id=1" alt="" /></div>
        <div><img src="https://api.ixiaowai.cn/api/api.php?id=2" alt="" /></div>
        <div><img src="https://api.ixiaowai.cn/api/api.php?id=3" alt="" /></div>
        <div><img src="https://api.ixiaowai.cn/api/api.php?id=4" alt="" /></div>
        <div><img src="https://api.ixiaowai.cn/api/api.php?id=5" alt="" /></div>
      </div>
    </div>
    <!-- 条目中可以是任意内容，如：<img src=""> -->

    <script src="../layui/layui.js"></script>
    <script>
      layui.use("carousel", function () {
        var carousel = layui.carousel;
        //建造实例
        carousel.render({
          elem: "#test1",
          width: "100%", //设置容器宽度
          height: "500px", //这是容器的高度
          arrow: "always", //始终显示箭头
          //,anim: 'updown' //切换动画方式
        });
      });
    </script>
  </body>
</html>
```



### 常用操作

#### 下拉框选择

1. 添加`th:inline="javascript"`
2. `[[${order.getCourse_name()}]];` thymeleaf获取值拼成 css属性选择器
3. 然后通过jQuery获取dom元素后执行点击事件
4. `select_course_name` 是select标签的id

```javascript
<select name="course_name" id="select_course_name"  lay-search="">
    <option value="">直接选择或搜索选择</option>
    <option value="2018-Java全套课程">2018-Java全套课程</option>
    <option value="2019-Swing从入门到实战">2019-Swing从入门到实战</option>
    <option value="2019-SpringBoot后台CRM项目">2019-SpringBoot后台CRM项目</option>
</select>
.....
<script th:inline="javascript">
    var $,layer;
    layui.use(['form','laydate'], function(){
        var laydate = layui.laydate;
        $ = layui.jquery;
        layer = layui.layer;
        //日期
        laydate.render({
            elem: '#order_date'
        });

        // 主要是这一部分
        var courseNameValue = [[${order.getCourse_name()}]];
        var select = 'dd[lay-value=' + courseNameValue + ']';
        $('#select_course_name').siblings('div.layui-form-select').find('dl').find(select).click();
    })
</script>
```



#### 关闭弹出窗口后刷新

在open里面添加 `end` 函数，然后通过jQuery获取dom元素，然后执行点击事件

```javascript
var $ = layui.jquery;
......
layer.open({
    type: 2 //此处以iframe举例
    ......
    , yes: function () {
        layer.closeAll();
    }
    end:function () {
        $(".layui-laypage-btn").click();//弹出框  关闭后刷新，停留在当前页
    }
});
```

