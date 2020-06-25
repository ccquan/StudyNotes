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