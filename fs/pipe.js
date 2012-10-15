var fs = require('fs');
var file = fs.createReadStream('index.html');

file.pipe(process.stdout);

file.on('end', function() {
    setTimeout(function() { process.stdout.write('-- File End--'); }, 1000);
});
