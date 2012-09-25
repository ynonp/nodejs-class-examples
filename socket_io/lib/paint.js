/**
 * Created with JetBrains WebStorm.
 * User: ynonperek
 * Date: 9/25/12
 * Time: 11:17 PM
 * To change this template use File | Settings | File Templates.
 */

var connected_clients = [];

exports.connect = function(socket) {
    connected_clients.push(socket);

    var notify_all = function(socket, action) {
        return function(data) {
            for ( var i=0; i < connected_clients.length; i++ ) {
                if ( socket != connected_clients[i] ) {
                    connected_clients[i].emit(action, data);
                }
            }
        };
    };

    socket.on('linestart', notify_all(socket, 'linestart'));
    socket.on('linemove',  notify_all(socket, 'linemove'));
};

