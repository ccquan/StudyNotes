var hp = require('http');
var fs = require('fs');
var tp = require('art-template');  // 导入template
var url = require('url');

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
			}
			];

var server = hp.createServer().listen(3000);

server.on('request', function(req, res) {
	var parObj = url.parse(req.url, true);
	var pathName = parObj.pathname;
	console.log(pathName);

	if (pathName === '/' || url === '/index.html') {
		fs.readFile('./views/index.html', function(err, data) {
			if (err) {
				res.end('首页不存在');
				return;
			}


			var newDate = tp.render(data.toString(), {
				commit: commit
			});

			res.end(newDate);
		});
	} else if (pathName.indexOf('/public/') === 0) {
		fs.readFile('.' + pathName, function(err, data) {
			if (err) {
				res.end('文件不存在');
				return;
			}
			res.end(data);
		})
	} else if (pathName === '/post') {
		fs.readFile('./views/post.html', function(err, data) {
			if (err) {
				res.end('post页不存在');
				return;
			}
			res.end(data);
		});
	} else if (pathName === '/addCommit') {
		var commitItem = parObj.query;
		commitItem['date'] = '2019-9-6';
		console.log(commitItem);
		commit.push(commitItem);
		// 重定向
		res.writeHead(301, {'Location': '/'});
		res.end();
	} else {
		fs.readFile('./views/404.html', function(err, data) {
			res.end(data);
		});
	}
});