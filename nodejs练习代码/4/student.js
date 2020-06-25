/*
 * 负责处理增删改查功能
 *
*/
var fs = require('fs');

var dbPath = './db.json';

exports.add = function(stuItem, callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err);
		}
		var stu = JSON.parse(data).stu;  // 1.读取文件，得到对象
		stuItem.id = parseInt(stu[stu.length - 1].id) + 1;  // 1.1 配置id
		// 1.2 处理性别，单选框传过来的是数字
		if (parseInt(stuItem.sex) === 0) {
			stuItem.sex = '男';
		} else if (parseInt(stuItem.sex) === 1) {
			stuItem.sex = '女';
		} else {
			return callback('性别错误');
		}
		stu.push(stuItem);               // 2.追加到对象
		var fileDate = JSON.stringify({stu: stu});  // 3.将新对象转成字符串

		fs.writeFile(dbPath, fileDate, function(err) {  // 4.写入文件
			if (err) {
				return callback(err);  // 如果写入失败那就返回错误对象
			}
			callback(null);  // 如果写入成功就返回null
		});
    });	
}

exports.delete = function(stuId, callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err);
		}

		var stu = JSON.parse(data).stu;
		var stuIndex = stu.findIndex(function(item) {  // 根据值查找下标
			return item.id === stuId;
		});

		if (stuIndex == -1) {
			return callback('id不存在');
		}
		stu.splice(stuIndex, 1);  // 从下标开始删除一个元素

		// 再重写写入文件去
		var fileDate = JSON.stringify({stu: stu});  // 将新对象转成字符串
		fs.writeFile(dbPath, fileDate, function(err) {
			if (err) {
				callback(err);
			}
			callback(null);
		});
	});
}

exports.update = function(stuItem, callback) {
	// 判断性别
	if (parseInt(stuItem.sex) === 0) {
		stuItem.sex = '男';
	} else if (parseInt(stuItem.sex) === 1) {
		stuItem.sex = '女';
	} else {
		return callback('性别错误');
	}
	// 修改id为整型
	stuItem.id = parseInt(stuItem.id);

	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err);
		}
		var stu = JSON.parse(data).stu;
		for (var i = stu.length - 1; i >= 0; i--) {
			if (stu[i].id === stuItem.id) {
				stu[i] = stuItem;
				break;
			}
		}
		var fileData = JSON.stringify({stu: stu});
		fs.writeFile(dbPath, fileData, function(err, data) {
			if (err) {
				return callback(err);
			}
			callback(null);
		});
	});
}

exports.select = function(callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err);
		}
		callback(null, JSON.parse(data).stu);  // 回调函数返回
	});
}

exports.findById = function(stuId, callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err);
		}
		var stu = JSON.parse(data).stu;
		for (var i = stu.length - 1; i >= 0; i--) {
			if (stu[i].id === stuId) {
				callback(null, stu[i]);
				break;
			}
		}
	});
}

