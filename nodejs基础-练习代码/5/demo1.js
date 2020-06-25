const mongoose = require('mongoose');  // 导入包
mongoose.connect('mongodb://localhost/demo');  // 连接数据库

const Cat = mongoose.model('Cat', { name: String });  // 设计模型

const kitty = new Cat({ name: 'Zildjian' });  // 实例化对象
kitty.save().then(() => console.log('meow'));  // 插入