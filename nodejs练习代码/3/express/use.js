var express = require("express");

var server = express();

server.listen(3000);
// server.use(express.static('./public/'));
server.use('/a/', express.static('./public'));