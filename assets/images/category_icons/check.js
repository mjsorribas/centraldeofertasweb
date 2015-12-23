var fs = require('fs');
var fileName = 'autoservicio';
var fileType = 'png';

isFile = fs.statSync(fileName + '.' + fileType).isFile();
console.log('is file: ', isFile);