/*
 * 连接数据库
 *
*/


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/message', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

// 设置集合(文档)结构
// 比如loginUrl是字符串型
// username 是字符串型，但有约束，约束是：该字段必须有
var studentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	sex: {
		type: String,
		enum: ['男', '女'],
		default: '男'
	},
	age: Number,
	class: String
});

// 将文档结构发布为模型
   // 第一个参数：传入一个大写单数名词，表示数据库名称
     // mongoose会自动把它改成小写复数，比如下面的会变成users集合
   // 第二个参数：框架Scheme
   // 返回值：模板构造函数

module.exports = mongoose.model('Student', studentSchema);
