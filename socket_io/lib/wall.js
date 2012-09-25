/**
 * Created with JetBrains WebStorm.
 * User: ynonperek
 * Date: 9/24/12
 * Time: 8:45 PM
 * To change this template use File | Settings | File Templates.
 */

var connected_clients = {};
var colors = ['red', 'blue', 'green', 'orange', 'yellow', 'magenta', 'cyan'];
var last_color_index = 0;

function getNextColor() {
    var s = new String(colors[last_color_index++]);
    console.log('using color: ' + s);
    return s;
}

exports.connect = function(socket) {
    console.log(socket.id);
    connected_clients[socket.id] = { socket: socket, clr: getNextColor() };

    socket.on('text', function(data) {
        var sender = connected_clients[socket.id];
        Object.keys(connected_clients).forEach(function(socket_id) {
            var info = connected_clients[socket_id];
            console.log('sending to: ' + sender.clr);
            info.socket.emit( 'text', { text: data.text, color: sender.clr });
        });
    });
};

