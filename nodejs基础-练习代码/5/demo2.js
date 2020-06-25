var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/itcast', {useNewUrlParser: true});

// 设置集合(文档)结构
// 比如loginUrl是字符串型
// username 是字符串型，但有约束，约束是：该字段必须有
var userSchema = new Schema({
	loginUrl: String,
	email: {
		type: String
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// 将文档结构发布为模型
   // 第一个参数：传入一个大写单数名词，表示数据库名称
     // mongoose会自动把它改成小写复数，比如下面的会变成users集合
   // 第二个参数：框架Scheme
   // 返回值：模板构造函数

var User = mongoose.model('User', userSchema);

// // 实例化一个模型
// var admin = new User({
// 	loginUrl: '/admin/custom',
// 	email: 'chen@admin.com',
// 	username: 'chen',
// 	password: 'chen888'
// });

// // 插入记录
// admin.save(function(err, ret) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('插入记录成功');
// 		console.log(ret);
// 	}
// });


// 删除数据
// User.remove({
// 	username: 'admin'
// }, function(err, ret) {
// 	if (err) {
// 		console.log('删除失败');
// 	} else {
// 		console.log('删除成功');
// 	}
// });



// 更新数据1
// User.findByIdAndUpdate('5eed7aeeccf2af105cc1bb21', {
// 	password: 'newpwd'
// }, function(err, ret) {
// 	if (err) {
// 		console.log('更新失败');
// 	} else {
// 		console.log('更新成功');
// 		console.log(ret);
// 	}
// });



// 更新数据2
User.update({
	username: 'chen'
}, {
	username: 'Chen'
}, function(err, ret) {
	if (err) {
		console.log(err);
	} else {
		console.log('更新成功');
		console.log(ret);  // 返回{ n: 1, nModified: 1, ok: 1 }
	}
});