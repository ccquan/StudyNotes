var fs = require('fs');
var path = require('path');

// 会报错，因为我是在 path练习 里运行 node path.js 的，然后path.js里导入的 index.js 所以找不到a.txt
// fs.readFile('./a.txt', 'utf8', function(err, data) {
// 	if (err) {
// 		throw err;
// 	}
// 	console.log(data);
// });

// 下面用__dirname，成功读取
var fileName = path.join(__dirname, 'a.txt');
fs.readFile(fileName, 'utf8', function(err, data) {
	if (err) {
		throw err;
	}
	console.log(data);
});