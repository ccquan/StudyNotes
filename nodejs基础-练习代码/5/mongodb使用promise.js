var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/itcast', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);  // 新版本要求的

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

var User = mongoose.model('User', userSchema);

User.find()
.then(function(user) {
	if (user.username == 'newUser') {
		console.log(user);
	} else {
		var newUser = new User({
			loginUrl: 'newUser',
			email: 'newUser@qq.com',
			username: 'newUser',
			password: 'newUser888'
		});
		return newUser.save();  // 把插入结果返回给promise
	}
})
.then(function(ret) {
	console.log('插入成功！' + ret);
});
