var fs = require('fs');

fs.readFile('0-hello.js', function(error, data) {
console.log(data.toString());
});