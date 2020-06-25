var fs = require('fs');
var hp = require('http');
var tp = require('art-template');

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