var express = require('express');
var fs = require('fs');
var router = require('./router');

var app = express();
app.listen(3000);




app.use('/public/', express.static('./public/'));

app.engine('html', require('express-art-template'));

// 使用路由
// router(app);  // 传统

app.use(router);
