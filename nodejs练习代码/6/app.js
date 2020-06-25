var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var route = require('./route');

var app = express();

// 静态、模块化的配置
app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));

// 解析post的配置,要在 app.use(route); 前
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 引用session,要在 app.use(route); 前
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 导入路由
app.use(route);

app.listen(3000, function() {
	console.log('http://127.0.0.1:3000');
});

