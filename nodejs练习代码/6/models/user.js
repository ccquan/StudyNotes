// 用户表设计模型
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/message', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

var userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		required:  true
	},
	password: {
		type: String,
		required: true
	},
	created_time: {
		type: Date,
		// 注意不要Date.now(),因为会写死
		default: Date.now
	},
	last_modified_time: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String,
		default: '/public/img/avatar-default.png'
	},
	bio: {
		// 个人介绍
		type: String,
		default: ''
	},
	gender: {
		type: Number,
		enum: [-1, 0, 1],
		default: -1
	},
	birthday: {
		type: Date
	},
	status: {
		type: Number,
		// 用户状态：是否可以评论、登录
		// 0 正常   1 不可评论   2 不可登录
		enum: [0, 1, 2],
		default: 0
	}
});

module.exports = mongoose.model('User', userSchema);