var fs = require('fs');
var tp = require('art-template');
var url = require('url');
var express = require('express');

var server = express();
server.listen(3000);

// 留言信息，弄成一个数组，每请求一次页面触发的是下面的request，这里的全局变量是不会刷新的
var commit = [
			{
				'author': '天元突破-红莲螺岩',
				'content': '知道人的眼睛为什么长在前面吗？那是因为如果想看到远处的风景的话，就只能向前前进。',
				'date': '2015-6-3'
			},
			{
				'author': '苏轼',
				'content': '明月几时有？把酒问青天。',
				'date': '2015-6-3'
			},
			{
				'author': 'MXLBS',
				'content': '彼岸花花开彼岸，断肠草草断肝肠。',
				'date': '2015-6-3'
			},
			{
				'author': '2001太空漫游',
				'content': '征服可能会受挫，但好奇从未停息。',
				'date': '2020-12-6'
			},
			{
				'author': '网络',
				'content': '你还有好多未完成的梦，你有什么理由停下脚步',
				'date': '2020-12-6'
			},
			];

// 静态资源
server.use('/public/', express.static('./public/'));

// art-template模板
server.engine('html', require('express-art-template'));

// 首页
server.get('/', function(req, res) {
	res.render('index.html', {
		commit: commit
	})
});

// 提交页
server.get('/post', function(req, res) {
	// 之前是fs读取文件
	// fs.readFile('./views/post.html', function(err, data) {
	// 	res.end(data);
	// })
	// 现在可以用res.render渲染页面，不用加views目录，因为默认加了
	res.render('post.html');
});


// addCommit页，重定向
server.get('/addCommit', function(req, res) {
	var obj = url.parse(req.url, true);
	var comItem = obj.query;
	var mydate = new Date();
	comItem['date'] = mydate.toLocaleDateString()
	commit.unshift(comItem);
	res.writeHead(302, {'Location': '/'});
	res.end();
});



