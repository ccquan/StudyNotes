var mysql = require('mysql');

// 创建连接对象
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'stu_message'
});
// 连接数据库
connection.connect();

// 执行数据操作
connection.query('select * from stu_users', function(err, data) {
	if (err) {
		console.log("执行数据操作失败");
	} else {
		// console.log(data);  // 返回一个数组
		console.log(data[0].id);
	}
});

// 关闭数据库
connection.end();