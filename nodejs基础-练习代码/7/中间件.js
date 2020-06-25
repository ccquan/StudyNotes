var express = require('express');

var app = express();

app.use(function(req, res) {
    console.log('任何请求都会进这里' + req.url);
});

app.listen(3000);