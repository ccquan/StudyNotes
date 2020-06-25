var fs = require('fs');
var in_data = '写入的数据';
fs.writeFile('insert.txt', in_data, function(err) {
    console.log('写入成功');
});