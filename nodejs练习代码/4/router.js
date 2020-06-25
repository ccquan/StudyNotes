// 传统
// module.exports = function(app) {
// 	app.get('/', function(req, res) {
// 		fs.readFile('./db.json', 'utf8', function(err, data) {
// 			if (err) {
// 				res.status(500).send('system error');
// 			}

// 			res.render('index.html', {
// 				fruits: fruits,
// 				stu: JSON.parse(data).stu
// 			});
// 		});
		
// 	});
// }

// express封装函数Router
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');
var student = require('./student');
var fruits = ['苹果', '香蕉', '雪梨'];


// 1. 导入express
var express = require('express');
// 2. 引用express.Router();
var router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


// 这里原来的app.get 改成 router.get
router.get('/students', function(req, res) {
	student.select(function(err, data) {
		if (err) {
			return res.end(err);
		}
		
		res.render('index.html', {
			fruits: fruits,
			stu: data
		});
	});
});


router.get('/', function(req, res) {
	student.select(function(err, data) {
		if (err) {
			return res.end(err);
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
	student.add(stuItem, function(err) {
		if (err) {
			console.log('添加失败！' + err);
		} 
	});
	res.writeHead(302, {'Location': '/'});
	res.end();
});

router.get('/students/edit', function(req, res) {
	var parObj = url.parse(req.url, true);
	var stuId = parseInt(parObj.query.id);
	student.findById(stuId, function(err, data) {
		if (err) {
			return res.end(err);
		}
		var nan = '', nv = '';
		if (data.sex == '男') {
			nan = 'checked';
		} else {
			nv = 'checked';
		}
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

	student.update(stuItem, function(err) {
		if (err) {
			return res.end(err);
		}
		res.writeHead(302, {'Location': '/'});
		res.end("更新成功！");
	});
	
});

router.get('/students/delete', function(req, res) {
	var parObj = url.parse(req.url, true).query;
	var stuId = parseInt(parObj.id);

	student.delete(stuId, function(err) {
		if (err) {
			return res.end(err);
		}
		res.writeHead(302, {'Location': '/'});
		res.end('删除成功！');
	});
});

module.exports = router;