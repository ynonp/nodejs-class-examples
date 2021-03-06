
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');


var    app = module.exports = express.createServer();
        io = require('socket.io').listen(app);


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var wall    = require('./lib/wall.js');
var paint   = require('./lib/paint.js');
var mousers = require('./lib/mousers.js');

io.of('/wall').on('connection', wall.connect);
io.of('/paint').on('connection', paint.connect);
io.of('/mousers').on('connection', mousers.connect);

io.of('/echo').on('connection', function(s) {
    s.on('message', function(msg) {
        console.log(msg);
        s.send(msg);
        s.broadcast.send(msg);
    });
});




















