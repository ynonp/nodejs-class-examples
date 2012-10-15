/**
 * Created with JetBrains WebStorm.
 * User: ynonperek
 * Date: 9/24/12
 * Time: 10:15 PM
 * To change this template use File | Settings | File Templates.
 */


var fs = require('fs'),
    path = require('path');

function cat(filename) {
    fs.readFile(filename, function(err, data) {
        if ( err != null ) {
            throw "Can't read file: " + filename + ". Error was: " + err;
        }

        process.stdout.write(data) ;
    });
}

function ls(dirname, callback) {
    fs.readdir(dirname, function(err, files) {
        if ( err != null ) {
            throw 'Error: ' + err;
        }

        var i=0;
        var file_stats = {};

        files.forEach(function(item) {
            fs.stat(dirname + path.sep + item, function(err, stats) {
                if ( err != null ) {
                    console.log('Error stating file: ' + item);
                }

                if ( stats.isFile() ) {
                    console.log('[--- ' + String(i) + ' ] ' + item);
                } else if ( stats.isDirectory() ) {
                    console.log('[@@@ ' + String(i) + ' ] ' + item);
                }
                file_stats[item] = stats;
                i += 1;
            });
        });
        if ( callback ) {
            callback.call(null, files, file_stats);
        }

    });
}

ls( '.', function(files, file_stats) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) {
        var idx = Number(chunk);
        var filename = files[idx];

        console.log('you chose: ' + filename);

        if ( file_stats[filename].isFile() ) {
            cat(filename);
        } else if ( file_stats[filename].isDirectory() ) {
            ls(filename);
        }

        process.stdin.pause();
    });

});

