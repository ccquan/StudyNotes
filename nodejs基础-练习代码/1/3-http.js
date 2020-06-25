var hp = require('http');

var server = hp.createServer();  // 创建一个server势力

// 监听端口
server.listen(3000, function() {
	console.log('服务器已启动');
});
// 请求接口
server.on('request', function(req, res) {
	res.setHeader('Content-type', 'text/plain; charset=utf-8');
	res.end('hell 世界');
});


