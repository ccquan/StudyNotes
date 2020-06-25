var fs = require('fs');

var p1 = new Promise(function(resolve, reject) {
	fs.readFile('./a.txt', 'utf8', function(err, data) {
		if (err) {
			reject(err);  // 拒绝
		} else {
			resolve(data);  // 决定
		}
	});
});

var p2 = new Promise(function(resolve, reject) {
	fs.readFile('./b.txt', 'utf8', function(err, data) {
		if (err) {
			reject(err);  // 拒绝
		} else {
			resolve(data);  // 决定
		}
	});
});

var p3 = new Promise(function(resolve, reject) {
	fs.readFile('./c.txt', 'utf8', function(err, data) {
		if (err) {
			reject(err);  // 拒绝
		} else {
			resolve(data);  // 决定
		}
	});
});

p1.then(function(data) {
	console.log(data);
	return p2;
}, function(err) {
	console.log('读取文件失败！', err);
}).then(function(data) {
	console.log(data);
	return p3;
}).then(function(data) {
	console.log(data);
});




