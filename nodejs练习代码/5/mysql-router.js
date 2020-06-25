// express封装函数Router
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var fruits = ['苹果', '香蕉', '雪梨'];

// 创建连接对象
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'stu_message'
});
// 连接数据库
connection.connect();


// 1. 导入express
var express = require('express');
// 2. 引用express.Router();
var router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


// 这里原来的app.get 改成 router.get
router.get('/students', function(req, res) {
	// 执行数据操作
	connection.query('select * from stu_users', function(err, data) {
		if (err) {
			return res.end("执行数据操作失败：" + err);
		} 
		res.render('index.html', {
			fruits: fruits,
			stu: data
		});
	});
});


router.get('/', function(req, res) {
	// 执行数据操作
	connection.query('select * from stu_users', function(err, data) {
		if (err) {
			return res.end("执行数据操作失败：" + err);
		} 
		res.render('index.html', {
			fruits: fruits,
			stu: data
		});
	});
});

router.get('/students/new', function(req, res) {
	res.render('new.html');
});

router.post('/students/new', function(req, res) {
	var stuItem = req.body;
	// 判断性别
	if (stuItem.sex == 0) {
		stuItem.sex = '男';
	} else {
		stuItem.sex = '女';
	}
	
	connection.query(`insert into stu_users values(default, '${stuItem.name}', '${stuItem.sex}', '${stuItem.age}', '${stuItem.class}')`, function(err) {
		if (err) {
			return res.end('保存失败：' + err);
		}
		console.log('保存成功');
	});

	res.writeHead(302, {'Location': '/'});
	res.end();
});

router.get('/students/edit', function(req, res) {
	var parObj = url.parse(req.url, true);
	var stuId = parObj.query.id;
	var sql = 'select * from stu_users where id=' + stuId;

	connection.query(sql, function(err, data) {
		if (err) {
			return res.end('查询失败：' + err);
		}
		var nan = '', nv = '';
		if (data.sex == '男') {
			nan = 'checked';
		} else {
			nv = 'checked';
		}
		data = data[0];  // 因为它返回的是一个数组，所以第一个下标就是查询的那个了
		res.render('edit.html', {
			name: data.name,
			nan: nan,
			nv: nv,
			age: data.age,
			dataClass: data.class,
			dataId: data.id
		});

	});
});

router.post('/students/edit', function(req, res) {
	var stuItem = req.body;
	// 判断性别
	if (stuItem.sex == 0) {
		stuItem.sex = '男';
	} else {
		stuItem.sex = '女';
	}

	var sql = `update stu_users set name='${stuItem.name}', sex='${stuItem.sex}', age=${stuItem.age}, class='${stuItem.class}' where id=${stuItem.id}`;
	connection.query(sql, function(err) {
		if (err) {
			return res.end('修改失败：' + err);
		}
	});
	res.writeHead(302, {'Location': '/'});
	res.end("更新成功！");
});

router.get('/students/delete', function(req, res) {
	var parObj = url.parse(req.url, true).query;
	var stuId = parObj.id;

	var sql = 'delete from stu_users where id=' + stuId;
	connection.query(sql, function(err) {
		if (err) {
			return res.end('删除失败：' + err);
		}
		res.writeHead(302, {'Location': '/'});
		res.end('删除成功！');
	});
});


module.exports = router;
