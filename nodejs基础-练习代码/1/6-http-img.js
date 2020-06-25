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