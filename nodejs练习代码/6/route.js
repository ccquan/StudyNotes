var express = require('express');
var fs = require('fs');
const md5 = require('md5-nodejs');
const User = require('./models/user');
var router = express.Router();

// 首页路由
router.get('/', function(req, res) {
	res.render('index.html', {
		user: req.session.user
	});
});

// 注册路由
router.get('/register', function(req, res) {
	res.render('register.html');
});

router.post('/register', function(req, res) {
	var regItem = req.body;

	// 查询邮箱或者昵称是否存在
	User.findOne({
		$or: [
			{emial: regItem.email},
			{nickname: regItem.nickname}
		]
	}, function(err, data) {
		if (err) {
			return res.status(500).json({code: 101, msg: err});
		}
		// 如果data有数据说明该邮箱或者昵称已存在
		if (data) {
			return res.status(200).json({code: 102, msg: 'email or nickname already exists.'})
		}
		// 插入记录
		regItem.password = md5(md5(regItem.password));  // 加密密码
		// console.log(regItem);
		new User(regItem).save(function(err, data) {
			if (err) {
				return res.status(500).json({code: 101, msg: err});
			}
			req.session.user = regItem;
			res.status(200).json({code: 200, msg: ''});
		});

	});
});

// 登录路由
router.get('/login', function(req, res) {
	res.render('login.html');
});

router.post('/login', function(req, res) {
	var regItem = req.body;
	regItem.password = md5(md5(regItem.password));  // 加密密码
	User.findOne({
		email: regItem.email,
		password: regItem.password
	}, function(err, data) {
		if (err) {
			return res.status(500).json({code: 101, msg: err});
		}
		if (data) {
			req.session.user = data;
			return res.status(200).json({code: 200, msg: ''});
		} else {
			return res.status(200).json({code: 102, msg: '登录失败！邮箱或密码错误'});
		}
	});
});

// 退出路由
router.get('/logout', function(req, res) {
	// 把session.user 赋值为空就是了
	req.session.user = null;
	res.redirect('/login');
});



module.exports = router;