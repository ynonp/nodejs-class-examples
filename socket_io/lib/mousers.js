/**
 * Created with JetBrains WebStorm.
 * User: ynonperek
 * Date: 9/28/12
 * Time: 12:45 PM
 * To change this template use File | Settings | File Templates.
 */

var positions = {};

var values = function(o) {
    return Object.keys(o).map(function(k) { return o[k] });
};

exports.connect = function(socket) {

    var positions_as_array = values( positions );

    socket.emit('everyone', positions_as_array );

    socket.on('move', function(coords) {
        coords.id = socket.id;
        positions[socket.id] = coords;
        socket.broadcast.emit('move', coords);
    });

    socket.on('disconnect', function() {
        delete positions[socket.id];
        socket.broadcast.emit('bye', socket.id);
    });

    socket.broadcast.emit('new', socket.id);
};


