# Node.js基础

Node.js 是一个运行时环境(runtime)



### Node.js 下载

https://nodejs.org/en/

查看版本`node --version`



### hello world

1. 编写js文件

```javascript
var echo = 'hello world';
console.log(echo);
```

2. 命令窗口执行`node hello.js`



#### 读取文件例子

语法：

```
fs.readFile(path, options, callback)
```

http://nodejs.cn/api/fs.html#fs_fs_readfile_path_options_callback

```
callback:
  error 读取成功 null
        读取失败 错误对象
  data  读取成功 数据对象
        读取失败 undefined
```



- 例子

```javascript
var fs = require('fs');  // 引入模块

fs.readFile('0-hello.js', function(error, data) {
    if (error) {
        console.log('读取失败');
    } else {
        console.log(data.toString());
    }
});
```

- 例子：以utf8的编码读取文件，这样data就是字符串了，不是二进制了

```javascript
fs.readFile('./db.json', 'utf8', function(err, data) {
    console.log(data);
    console.log(typeof(data));
});
```



#### 写入文件例子

语法：

```
fs.writeFile(file, data[, options], callback)
```

http://nodejs.cn/api/fs.html#fs_fs_writefile_file_data_options_callback

- 例子

```javascript
var fs = require('fs');
var in_data = '写入的数据';
fs.writeFile('insert.txt', in_data, function(error) {
    if (error) {
        console.log('写入失败');
    } else {
        console.log('写入成功');
    }
});
```



#### http模块

> nodejs封装的一个服务器

- 设置返回编码

```javascript
res.setHeader('Content-type', 'text/plain; charset=utf-8');
```

- 设置返回类型

html

```
Content-Type: text/html;charset=utf-8
```

纯文本plain

```
Content-Type: text/plain;charset=utf-8
```



- 例子

```javascript
var hp = require('http');

var server = hp.createServer();  // 创建一个server势力

// 监听端口
server.listen(3000, function() {
	console.log('服务器已启动');
});
// 请求接口
server.on('request', function() {
	console.log('收到客服端请求');
});
```



##### 例: 获取get参数

访问：http://127.0.0.1:3000/index.php?uname=root&pwd=toor

```javascript
var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
 
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("用户名：" + params.uname);
    res.write("\n");
    res.write("密码：" + params.pwd);
    res.end();
 
}).listen(3000);
```



##### 例:读取图片

```javascript
var hp = require('http');
var fs = require('fs');

var server = hp.createServer();

server.listen(3000);

server.on('request', function(req, res) {
    fs.readFile('a1.jpg', function(err, data) {
    	if (err) {
    		res.setHeader('Content-type', 'text/plain; charset=utf-8');
    		res.end('图片读取失败');
    	} else {
    		res.setHeader('Content-type', 'image/jpeg');
    		res.end(data);
    	}
    	
    });

});
```



##### res.end()

```javascript
console.log('关闭前')
return res.end('关闭此会话');
console.log('关闭后')
```

> red.end() 只会发送请求会话结束，但下面的代码还会继续执行，如果是res.end(err) 发送错误信息的话记得加上return让它有错误后不再继续



### 模块化

#### 简单的模块化

a.js:

```javascript
console.log('a start');
require('./b.js');
console.log('a end');
```

b.js:

```javascript
console.log('this is b.js');
```

1. 导入时，如果是相对路径必须要加 `./`

2. node.js中没有全局作用域，只有模块作用域，所以上面导入b.js只能执行b.js里的代码，不能访问b.js的属性或方法



#### 加载与导出

> exports === module.exports



##### 导出单个成员

```javascript
function getAge();
module.exports = getAge;
```

这样a.js

```javascript
getAge = require('./b.js');
getAge();   直接就是getAge了，而不用b.getAge
```



##### 导出多个成员

1. module.export

```javascript
module.exports = {
    'a': 'aaa',
    'age': 22
}
```

2. 

exports.属性或方法  可以使其它js能使用到b.js的属性或方法

a.js:

```javascript
var b = require('./b.js');  // 加载
console.log('age: ' + b.age);
console.log('add: ' + b.add(2, 3))
```

b.js:

- exports 导出属性

```javascript
exports.age = 22;
```

- exports 导出方法

```javascript
exports.add = function(x, y) {
    return x + y;
}
```



### 模块引擎

### node_modules 目录

nodejs会在当前目录找，如果找不到会继续到上一级目录找，一直找到根目录不存在才报错，所以一个项目只要一个node_modules就可以了，然后子js会去项目根目录找



#### 安装

在网站目录下执行

```shell
npm install art-template --save
```



#### 配置

在html里

```html
<script src="node_modules/art-template/lib/template-web.js"></script>
```



#### art-template语法

> art-template 是一个简约、超快的模板引擎。
>
> 它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。

文档：http://aui.github.io/art-template/zh-cn/docs/index.html



##### 变量

```html
{{ 变量名 }}
```

> 注意不用$符



##### if条件语句

```html
{{if id == 2}}
  <option selected>选中</option>
{{ else }}
  <option >没选中</option>
{{/if}}
```



##### 循环语句

> 遍历的话值是 $value
>
> 遍历时的索引是 $index

```html
{{each 数组名}}
  {{ $value }}
{{/each}}
```



##### 继承模板

block 如果不填就相当于没填坑，只是留个坑在那

layout.html:

```html
{{block 'head'}}{{/block}}

{{block 'script'}}{{/block}}
```

index.html:

```
{{extend './layout.html'}}
{{block 'head'}}
<title>首页</title>
{{/block}}
```



##### 引入模板

```
{{ include './header.html' }}
```

header.html:

```html
<div>
    <li><a>首页</a></li>
    <li><a>关于</a></li>
</div>
```



#### 使用

在html里

```html
<script type="text/template" id="tp1">
  author : {{ name }}
  age    : {{ age }}
  hobbies: {{each hobbies}} {{ $value }} {{ /each }}
</script>

<script>
  var ret = template('tp1', {
      name:'jack',
      age: 18,
      hobbies: ['song', 'game']
  });
  console.log(ret);
</script>
```



#### 例: 在html中使用模板

```html
<!DOCTYPE html>
<html>
<head>
	<title>art-template</title>
	<script src="node_modules/art-template/lib/template-web.js"></script>
</head>
<body>

<script type="text/template" id="tp1">
	<h3>author : {{name}}</h3>
	<h4>age    : {{ age }}</h4>
	hobbies: 
	<ul>
		{{each hobbies}} // 遍历数组
			<li>{{ $value }}</li>
		{{ /each }}
	</ul>
</script>

<script>
  var ret = template('tp1', {
      name:'jack',
      age: 18,
      hobbies: ['song', 'game']
  });
  document.write(ret);
</script>
</body>
</html>
```



#### 例: 在nodejs中使用模板

```
template.render(字符串, {}对象)
```

10-index.html

```html
<!DOCTYPE html>
<html>
<head>
	<title>nodejs 的art-template</title>
</head>
<body>
<h3>author : {{name}}</h3>
	<h4>age    : {{ age }}</h4>
	hobbies: 
	<ul>
		{{each hobbies}}
			<li>{{ $value }}</li>
		{{ /each }}
	</ul>
</body>
</html>
```

10-js:

```javascript
var fs = require('fs');
var hp = require('http');
var tp = require('art-template');  // 导入template

var server = hp.createServer();

server.listen(3000);
server.on('request', function(req, res) {
	fs.readFile('10-index.html', function(err, data) {
		if(err) {
			res.end('文件读取失败');
			return;
		}

		var ret = tp.render(data.toString(), {
      		name:'jack',
      		age: 18,
      		hobbies: ['song', 'game']
  		});

		res.end(ret);
	})
});
```



#### 读取其它静态资源

> 把img，js这些放到public目录去，然后index.html中如果带有css,js这些的引入就可以用nodejs读取了，要不然只会读取纯index.html的内容

```javascript
var hp = require('http');
var fs = require('fs');


var server = hp.createServer().listen(3000);

server.on('request', function(req, res) {
	var url = req.url;
	console.log(url);
	if (url === '/' || url === '/index.html') {
		fs.readFile('./index.html', function(err, data) {
			if (err) {
				res.end('首页不存在');
				return;
			}

			res.end(data);
		});
	} else if (url.indexOf('/public/') === 0) {
		fs.readFile('.' + url, function(err, data) {
			if (err) {
				res.end('文件不存在');
				return;
			}
			res.end(data);
		});
	}
	 else {
		fs.readFile('./404.html', function(err, data) {
			res.end(data);
		});
	}
});
```



### 模块加载

#### require缓存加载

app.js

```javascript
var a = require('./a.js');
var b = require('./b.js');
```

a.js

```javascript
console.log('a');
var b = require('./b.js');
```

b.js

```javascript
console.log('b');
```

因为a.js加载了b.js，所以app.js会在缓存里找，所以不用**多加载一次**



### url模块

解析url

```
url.parse(url, true/false)
第二个参数如果是真query属性会参数转化为对象
```



### 重定向

1. 设定状态 3xx
2. 设置header响应头返回地址

301 永久重定向，浏览器记住后下次会直接跳转，（from dist cache）

302 临时重定向，浏览器每次会根据location跳转

> 浏览器如果看到你返回3xx就会去找localhost的地址

```javascript
res.writeHead(302, {'Location': '/'});
```



### npm 常用命令

  跳过向导快速生成package.jsoin初始化项目

```bash
npm init -y
```



#### 安装

npm install  // 根据package.json自动下载包

npm install 包名  // 只下载

npm install --save 包名  // 下载并保存依赖项到package.json

> install 可以简写i  列： npm i jquery



#### 卸载

npm uninstall

npm uninstall 包名

npm uninstall --save 包名

> uninstall 可以简写un 列：npm un jquery



#### 国内镜像

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```



### express框架

1. 安装

```
mkdir myexpress
cnpm i express
```

2. 快速生成package.jsoin初始化项目

```
npm init -y
```

3. hello world

```javascript
var express = require('express');  // 引入

var server = express();  // 创建一个服务器应用

server.get('/', function(req, res) {  // 监听一个get请求
	res.send("首页");
});

server.get('/about', function(req, res) {
	res.send('关于');
});

server.listen(3000);  // 监听3000端口
```



#### 读取其它静态资源

##### 正常

```javascript
server.use('/public/', express.static('./public/'));
```



##### 简略url

> 用127.0.0.1:3000/xx.jpg 表示127.0.0.1:3000/public/xx.jpg

```javascript
server.use(express.static('./pulic/'));
```



##### 别名

> 用127.0.0.1:3000/a/xx.jpg  代替127.0.0.1:3000/public/xx.jpg

```javascript
server.use('/a/', express.static('./public/'));
```



#### 使用art-template

1. 安装

```shell
npm install art-template express-art-template
```

2. 配置

engine(后缀名, require('express-art-template'))

```javascript
server.engine('html', require('express-art-template'));
```

3. 使用

```
res.render(views目录下的文件, {模板数据})
```

```javascript
server.get('/', function(req, rse) {
    // express 默认会去项目的 views 目录查找
    res.render('index.html', {
        commit: commit
    })
});
```

如果想要更改默认的 views 目录

```javascript
server.set('views', '目录路径');
```



#### 传统路由模块化

入口负责创建服务器，然后把服务器app 传给router，然后router.js负责流程控制

app.js

```javascript
var router = require(router);

var app = express();
router(app);
```

router.js

```javascript
module.exports = function(app) {
    app.get...
};
```



#### express封装的路由模块化

app.js

```javascript
var express = require('express');
var router = require('./router');

var app = express();
app.engine('html', require('express-art-template'));  // 如果要使用express-art-template的话要在app.js中引入
app.use(router);  // 挂载到app服务中
app.listen(3000);  // 开启web服务
```

router.js

```javascript
var fs = require('fs');
// express封装函数Router
// 1. 导入express
var express = require('express');
// 2. 引用express.Router();
var router = express.Router();

// 这里原来的app.get 改成 router.get
router.get('/', function(req, res) {
	fs.readFile('./db.json', 'utf8', function(err, data) {
		if (err) {
			res.status(500).send('system error');
		}

		res.render('index.html', {
			fruits: fruits,
			stu: JSON.parse(data).stu
		});
	});
		
});

// 3. 导出router
module.exports = router;
```



#### 获取post数据

1. 安装

```
npm i body-parser
```

2. 使用

`req.body` 就是返回的post数据对象

```javascript
var bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

// addCommit页，重定向，post请求
server.post('/addCommit', function(req, res) {
	var comItem = req.body;
	var mydate = new Date();
	comItem['date'] = mydate.toLocaleDateString();
	commit.unshift(comItem);

	res.writeHead(302, {'Location': '/'});
	res.end();
});
```



#### express-session

> express 不支持session，所以要用第三方包

1. 安装包

```
npm i express-session
```

2. 引入

```
var session = require('express-session');
// 引用session,要在 app.use(route)引入路由 前
app.use(session({
  secret: 'code016',  // 这个跟加盐差不多，为了安全性更高一些
  resave: false,
  saveUninitialized: true  // 用不用session都会生成会话id：sid
}))
```

3. 使用

```
req.session.任意;  // 获取值
req.sesseion.任意 = true;  // 设置值
```

4. 删除

```
delete req.session.任意;  // 第一种方法
req.session.任意 = null;  // 第二种方法
```



#### 中间件

**session、body-parser等都是中间件**

use()会把get、post、delete、put等不同的请求方式都会匹配

##### 万能匹配

```javascript
var express = require('express');

var app = express();

// next  下一个中间件
app.use(function(req, res, next) {
    console.log('任何请求都会进这里' + req.url);
    // next();   // 如果不调用是不会进入下一个中间件的
});

// 第二个中间件
// app.use(function(req, res, next) {
//     console.log('2-任何请求都会进这里' + req.url);
// });

app.listen(3000);
```



##### 匹配指定

- 创建一个以 a 开头 的中间件

```javascript
app.use('/a', function(req, res, next) {
    console.log('xxx/a的都进这里' + req.url);
});
```



##### next() 的用法

```javascript
app.get('/', function(req, res, next) {
    fs.readFile('读一个错误的文件', function(err, data) {
        if (err)  {
            next(err);  // 这里直接传参数会去下面的带四个参数的方法里，这样就不用在每个方法里处理错误了;
            // 如果不传参数只会找下面带三个参数的方法
        }
    });
});
// 统一处理上面的错误，配置错误中间件
app.use(function(err, req, res, next) {
    res.render('404.html');
});
```



### nodemon 工具

> nodemon可以修改代码后自动重启服务器

1. 安装

```shell
npm install --global nodemon
```

2. 启动

```shell
nodemon app.js
```



### 异步获取值

> 只能通过回调函数获取

```javascript
function fn(callback) {
  // var callback = function (data) { console.log(data) }  // callback想到与这个
  setTimeout(function () {
    var data = 'hello'
    callback(data)
  }, 1000)
}

fn(function(data) {
	console.log(data);
});
```

- 例

router.js

```javascript
router.get('/', function(req, res) {
	student.select(function(err, data) {
		if (err) {
			res.end(err);
		}
		res.render('index.html', {
			fruits: fruits,
			stu: data
		});
	});
});
```

student.js

```javascript
exports.select = function(callback) {
	fs.readFile(dbpath, 'utf8', function(err, data) {
		if (err) {
			return callback(err);
		}
		callback(null, JSON.parse(data).stu);  // 回调函数返回
	});
}
```



### mongodb

#### 下载连接

https://www.mongodb.com/try/download/community



#### 结构

DATABASE

|--collection

​    |--记录



#### 启动服务端

1. MongoDB将数据目录存储在 db 目录下。但是这个数据目录不会主动创建，需要在根目录创建一个**data/db**目录

比如在C盘创建一个c://data/db目录

```
mongod
```

如果想要修改默认存储数据库的/data/db目录的话

```shell
mongod --path=路径
```

2. 停止命令：`ctrl + c`

3. 启动客户端命令：`mongo`

**新版本好像不用，自带Windows服务了**，直接`mongo`就可以连接数据库了



#### 基本命令

- 查看全部数据库 `show dbs`
- 查看当前数据库 `db`
- (使用)进入数据库 `use 数据库名`



- 查看当前数据库的集合 `show collections` or `show tables`

基本语法：

```
db.集合名.操作命令(数据，json格式)
```



#### 创建数据库/集合

`use 数据库名` ，如果数据库不存在，则创建数据库，否则切换到指定数据库。然后要插入数据 `show dbs` 才会看到



集合：

```
db.createCollection(集合名[, options])
options: 可选参数, 指定有关内存大小及索引的选项
```

也可以 `db.集合名.insert`  然后插入数据也算创建集合了 



#### 删除数据库/集合

数据库：

```
use 数据库名
db.dropDatabase()
```

> 删除当前数据库，默认为 test，你可以使用 db 命令查看当前数据库名。

集合：

```
db.集合名.drop()
```



#### 插入记录

```
db.COLLECTION_NAME.insert(document)
或
db.COLLECTION_NAME.save(document)
```

- 例1

```sql
db.student.insert({"name": "Tom"})
db.student.insert({"name": "Tom", "age": 18})
```

> insert(): 若插入的数据主键已经存在，则会抛 **org.springframework.dao.DuplicateKeyException** 异常，提示主键重复，不保存当前数据。

- 例2

```sql
 db.runoob.save({x: 10})
```

> save()：如果 _id 主键存在则更新数据，如果不存在就插入数据。该方法新版本中已废弃，可以使用 **db.collection.insertOne()** 或 **db.collection.replaceOne()** 来代替。



##### 新增：

**3.2 版本之后新增了 db.collection.insertOne() 和 。**

db.collection.insertOne()：向集合插入一个新文档

db.collection.insertMany()：向集合插入一个多个文档





#### 查询

```sql
db.student.find()
```

返回：id是唯一值，自带的

```json
{ "_id" : ObjectId("5eec732e375a9c9d1485e022"), "name" : "Tom" }
{ "_id" : ObjectId("5eec73df375a9c9d1485e024"), "name" : "Tom", "age" : 18 }
```



#### 约束

type：类型

enum：枚举

default：默认值

required：true为必须需要(非空) false为可空



##### 在nodejs里使用约束

```javascript
字段: {
    type: Number,
    enum: [0, 1],
    default: 0
}
```



### node操作mongodb

1. 安装第三方包

```
npm i mongoose
```



#### 快速入手

```javascript
const mongoose = require('mongoose');  // 导入包
mongoose.connect('mongodb://localhost/test');  // 连接数据库

const Cat = mongoose.model('Cat', { name: String });  // 设计模型

const kitty = new Cat({ name: 'Zildjian' });  // 实例化对象
kitty.save().then(() => console.log('meow'));  // 插入
```



#### 连接数据库

```javascript
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/itcast', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);  // 新版本要求的

// 设置集合(文档)结构
// 比如loginUrl是字符串型
// username 是字符串型，但有约束，约束是：该字段必须有
var userSchema = new Schema({
	loginUrl: String,
	email: {
		type: String
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// 将文档结构发布为模型
   // 第一个参数：传入一个大写单数名词，表示数据库名称
     // mongoose会自动把它改成小写复数，比如下面的会变成users集合
   // 第二个参数：框架Scheme
   // 返回值：模板构造函数

var User = mongoose.model('User', userSchema);
```



#### 插入记录

```
Obj.save
```

```javascript
// 实例化一个模型
var admin = new User({
	loginUrl: '/admin/custom',
	email: 'admin@admin.com',
	username: 'admin',
	password: 'admin888'
});
// 插入记录
admin.save(function(err, ret) {
	if (err) {
		console.log(err);
	} else {
		console.log('插入记录成功');
		console.log(ret);
	}
});
```



#### 查询记录

```
Model.find
```



##### 查询全部

```javascript
User.find(function(err, data) {
	if (err) {
		console.log('查询失败');
	} else {
		console.log(data);
		console.log(typeof(datas));  // 返回的是Object，查询不到返回null
	}
});
```



 ##### 限制查询

- 查询username是admin，password是admin888的记录

```javascript
User.find({
    username: 'admin',
    password: 'admin888'
}, function(err, ret) {
	if (err) {
		console.log('查询失败');
	} else {
		console.log(ret);
	}
});
```



#### 根据ID查询

```javascript
model.findById(id)
```



##### 查询一条记录

```
Model.findOne
```

```javascript
User.findOne(function(err, ret) {
	if (err) {
		console.log('查询失败');
	} else {
		console.log(ret);
	}
});
```



#### 删除记录

```
Model.remove
```

- 删除username是admin的记录，如果是删除全部就不加 {数据}

```javascript
User.remove({
	username: 'admin'
}, function(err, ret) {
	if (err) {
		console.log('删除失败');
	} else {
		console.log('删除成功');
	}
});
```



##### 根据ID删除

```
Model.findByIdAndRemove
```



#### 更新记录

##### 根据条件更新

```
Model.update
```

- 更新username是chen的记录

```javascript
User.update({
	username: 'chen'
}, {
	username: 'Chen'
}, function(err, ret) {
	if (err) {
		console.log(err);
	} else {
		console.log('更新成功');
		console.log(ret);  // 返回{ n: 1, nModified: 1, ok: 1 }
	}
});
```



##### 根据ID更新

```javascript
Model.findOneAndUpdate()
```

- 更新ID是5eed7aeeccf2af105cc1bb21的记录

```javascript
User.findByIdAndUpdate('5eed7aeeccf2af105cc1bb21', {
	password: 'newpwd'
}, function(err, ret) {
	if (err) {
		console.log('更新失败');
	} else {
		console.log('更新成功');
		console.log(ret);
	}
});
```



### 学生管理系统mongodb版

#### 导入连接数据库的模板

```
var student = require('./student-mongo');
```



#### 数据库模板

```javascript
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/message', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

// 设置集合(文档)结构
var studentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	sex: {
		type: String,
		enum: ['男', '女'],
		default: '男'
	},
	age: Number,
	class: String
});
// 将数据库导出
module.exports = mongoose.model('Student', studentSchema);
```



#### 增

```javascript
// 实例化一个student模板
var stuOne = new student(stuItem);
// Obj.save 保存数据
stuOne.save(stuItem, function(err) {
    if (err) {
        console.log('添加失败！' + err);
    } 
});
```

#### 删

```javascript
var parObj = url.parse(req.url, true).query;  // url解析
var stuId = parObj.id;  // 获取id

student.findByIdAndRemove(stuId, function(err) {
    if (err) {
        return res.end(err);
    }
    res.writeHead(302, {'Location': '/'});
    res.end('删除成功！');
});
```



#### 改

```javascript
var stuItem = req.body;
// 判断性别
if (stuItem.sex == 0) {
    stuItem.sex = '男';
} else {
    stuItem.sex = '女';
}

student.findByIdAndUpdate(stuItem.id, stuItem, function(err) {
    if (err) {
        return res.end(err);
    }
    res.writeHead(302, {'Location': '/'});
    res.end("更新成功！");
});
```



#### 查

```javascript
student.find(function(err, data) {
    if (err) {
        return res.end(err);
    }

    res.render('index.html', {
        fruits: fruits,
        stu: data
    });
});
```



### node操作MySQL

#### 安装包

```
npm i mysql
```



#### 快速上手

```javascript
var mysql = require('mysql');

// 创建连接对象
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'anime_data'
});
// 连接数据库
connection.connect();

// 执行数据操作
connection.query('select * from ani_bangumi limit 5', function(err, data) {
	if (err) {
		console.log("执行数据操作失败");
	} else {
		console.log(data);  // 返回一个数组
		console.log(data[0].bname);  // 查看字段用 data.字段名
	}
});

// 关闭数据库
connection.end();
```



### 学生管理系统MySQL版

#### 连接数据库

```javascript
var mysql = require('mysql');

// 创建连接对象
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'stu_message'
});
// 连接数据库
connection.connect();

// 执行数据操作
connection.query('select * from stu_users', function(err, data) {
	if (err) {
		console.log("执行数据操作失败");
	} else {
		// console.log(data);  // 返回一个数组
		console.log(data[0].id);
	}
});
```



#### 增

```javascript
var stuItem = req.body;
// 判断性别
if (stuItem.sex == 0) {
    stuItem.sex = '男';
} else {
    stuItem.sex = '女';
}

connection.query(`insert into stu_users values(default, '${stuItem.name}', '${stuItem.sex}', '${stuItem.age}', '${stuItem.class}')`, function(err) {
    if (err) {
        return res.end('保存失败：' + err);
    }
    console.log('保存成功');
});

res.writeHead(302, {'Location': '/'});
res.end();
```



#### 删

```javascript
var parObj = url.parse(req.url, true).query;
var stuId = parObj.id;

var sql = 'delete from stu_users where id=' + stuId;
connection.query(sql, function(err) {
    if (err) {
        return res.end('删除失败：' + err);
    }
    res.writeHead(302, {'Location': '/'});
    res.end('删除成功！');
});
```



#### 改

```javascript
var stuItem = req.body;
// 判断性别
if (stuItem.sex == 0) {
    stuItem.sex = '男';
} else {
    stuItem.sex = '女';
}

var sql = `update stu_users set name='${stuItem.name}', sex='${stuItem.sex}', age=${stuItem.age}, class='${stuItem.class}' where id=${stuItem.id}`;
connection.query(sql, function(err) {
    if (err) {
        return res.end('修改失败：' + err);
    }
});
res.writeHead(302, {'Location': '/'});
res.end("更新成功！");
```



#### 查

```javascript
connection.query('select * from stu_users', function(err, data) {
    if (err) {
        return res.end("执行数据操作失败：" + err);
    } 
    res.render('index.html', {
        fruits: fruits,
        stu: data
    });
});
```



### promise解决异步问题

es6的封装函数

```javascript
var p = new Promise();

p.then(function(data) {  // 第一个参数是接受resolve
    console.log(data);
}, function(err){  // 第二个参数是接受reject
    console.log(err);
});
```

- 链式，第一个then返回第二个要执行的代码，然后第二个then(function(data)) 接受

```
var p = new Promise();

p.then(function() {

}).then(function() {

}).then(function() {

});
```

- 例如：

```javascript
var fs = require('fs');

var p1 = new Promise(function(resolve, reject) {
	fs.readFile('./a.txt', 'utf8', function(err, data) {
		if (err) {
			reject(err);  // 拒绝
		} else {
			resolve(data);  // 决定
		}
	});
});

var p2 = new Promise(function(resolve, reject) {
	fs.readFile('./b.txt', 'utf8', function(err, data) {
		if (err) {
			reject(err);  // 拒绝
		} else {
			resolve(data);  // 决定
		}
	});
});

var p3 = new Promise(function(resolve, reject) {
	fs.readFile('./c.txt', 'utf8', function(err, data) {
		if (err) {
			reject(err);  // 拒绝
		} else {
			resolve(data);  // 决定
		}
	});
});

p1.then(function(data) {
	console.log(data);
	return p2;
}, function(err) {
	console.log('读取文件失败！', err);
}).then(function(data) {
	console.log(data);
	return p3;
}).then(function(data) {
	console.log(data);
});
```



#### 应用场景

```javascript
var data = {};
$.get('http://127.0.0.1:3000/users/1')
  .then(function(user) {
	data.user = user;
	return $.get('http://127.0.0.1:3000/jobs');
})
  .then(function(jobs) {
  	data.jobs = jobs;
  	console.log(data.user, data.jobs);

  	// 模板渲染
  	var htmlStr = template('tp1', {
		user: data.user,
		jobs: data.jobs
	});
	$('#form-box').html(htmlStr);
  });
```

index.html

```html
<form id="form-box">	
</form>
<script type="text/template" id="tp1">
  <div>
    <label>ID：</label> {{user.id}} <br>
    <label>用户名：</label>{{user.username}} <br>
    <label>年龄：</label> {{user.age}} <br>
    <label>职业：</label>
    <select>
      {{ each jobs}}
        {{ if user.job == $value.id }}
          <option value="{{ $value.id }}" selected>{{ $value.name }}</option>
		{{ else }}
		  <option value="{{ $value.id }}" >{{ $value.name }}</option>
		{{ /if }}
      {{ /each }}
    </select>
  </div>
</script>
<script src="../node_modules/art-template/lib/template-web.js"></script>
```



#### mongodb支持promise

```javascript
db.集合名.操作命令(数据，json格式).then();
```

- 例：先查询一个用户名，然后判断是否存在，不过不存在的话就插入，如果是异步的话，有可能还没查询完毕就执行下面的代码了，所以用promise很重要

```javascript
User.find()
.then(function(user) {
	if (user.username == 'newUser') {
		console.log(user);
	} else {
		var newUser = new User({
			loginUrl: 'newUser',
			email: 'newUser@qq.com',
			username: 'newUser',
			password: 'newUser888'
		});
		return newUser.save();  // 把插入结果返回给promise
	}
})
.then(function(ret) {
	console.log('插入成功！' + ret);
});
```





### path路径模块

```javascript
fileUrl = 'D:\微云备份\作品\文档\markdown\github\nodejs\6\app.js'
```



#### path.dirname

获取目录路径，如上面会得到：`D:\微云备份\作品\文档\markdown\github\nodejs\6`



#### path.basename

获取文件名，如上面会得到：`app.js`

path.basename(fileUrl, '.js') 得到：`app`



#### path.extname

获取文件扩展名：如上面会得到：`.js`



#### path.join

将多个路径拼接在一起

```
path.join(r1[, r2, r3]);
```



#### node中的非模块成员

除了require、exports还有两个特殊的成员：

__dirname：获取当前模块的目录绝对路径

__filename：获取当前模块目录+文件名的绝对路径