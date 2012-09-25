/**
 * Created with JetBrains WebStorm.
 * User: ynonperek
 * Date: 9/25/12
 * Time: 10:02 PM
 * To change this template use File | Settings | File Templates.
 */


(function(global) {
    var can = document.querySelector('canvas');
    var ctx = can.getContext('2d');

    ctx.lineWidth = 10;

    var offset_x = can.offsetLeft;
    var offset_y = can.offsetTop;

    var socket = io.connect('http://localhost:8080');

    var getRelativeCoords = function(ev) {
        ev.preventDefault();
        var pos = ev.touches[0];

        var x = pos.clientX - offset_x;
        var y = pos.clientY - offset_y;
        return { x: x, y: y };
    };

    var drawLine = function(pos) {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };

    var lineStart = function(pos) {
        ctx.fillRect(pos.x-5, pos.y-5, 10, 10);

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    can.addEventListener('touchstart', function(ev) {
        var pos = getRelativeCoords(ev);
        ctx.fillStyle   = 'black';
        ctx.strokeStyle = 'black';

        lineStart(pos);
        socket.emit('linestart', pos);
    });

    can.addEventListener('touchmove', function(ev) {
        var pos = getRelativeCoords(ev);
        ctx.fillStyle   = 'black';
        ctx.strokeStyle = 'black';

        drawLine(pos);
        socket.emit('linemove', pos);
    });

    socket.on('linestart', function(pos) {
        ctx.strokeStyle = 'blue';
        ctx.fillStyle   = 'blue';
        lineStart(pos);
    });

    socket.on('linemove', function(pos) {
        ctx.strokeStyle = 'blue';
        ctx.fillStyle   = 'blue';
        drawLine(pos);
    });
}(this));