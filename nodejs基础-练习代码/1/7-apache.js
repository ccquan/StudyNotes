var hp = require('http');
var fs = require('fs');

var server = hp.createServer();

server.listen(3000);
server.on('request', function(req, res) {
	console.log(req.url);
	if (req.url === '/') {
		res.setHeader('Content-type', 'text/plain; charset=utf-8');
		res.end('欢迎来到首页！');
	} else {
		var file_url = './' + req.url;
		fs.readFile(file_url, function(err, data) {
			if (err) {
				res.setHeader('Content-type', 'text/plain; charset=utf-8');
				res.end('404 not found');
			} else {
				res.end(data);
			}
		});
	}
});