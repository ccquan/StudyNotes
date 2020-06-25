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