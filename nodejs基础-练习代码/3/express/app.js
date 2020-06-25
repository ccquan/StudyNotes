var express = require('express');

var server = express();  // 创建一个服务器应用

server.get('/', function(req, res) {
	res.send("首页");
});

server.get('/about', function(req, res) {
	res.send('关于');
});

server.use('/public/', express.static('./public/'));

server.listen(3000);