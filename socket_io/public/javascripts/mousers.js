/**
 * Created with JetBrains WebStorm.
 * User: ynonperek
 * Date: 9/28/12
 * Time: 12:55 PM
 * To change this template use File | Settings | File Templates.
 */


(function() {
    var template = Handlebars.compile(document.getElementById('tmpl-mousers').innerHTML);

    var socket = io.connect('/mousers');

    document.addEventListener('mousemove', function(e) {
        console.dir(e);
        socket.emit('move', { x:e.x, y:e.y });
    });

    socket.on('everyone', function(positions) {
        document.body.innerHTML = template({mousers: positions});
        document.body.style.background = '#d7d7d7';
    });

    socket.on('move', function(coords) {
        var el = document.getElementById(coords.id);
        if ( el ) {
            el.style.left = coords.x + 'px';
            el.style.top  = coords.y + 'px';
        }
    });

    socket.on('bye', function(id) {
        var el = document.getElementById(id);
        document.body.removeChild(el);
    });

    socket.on('new', function(id) {
        var el = document.createElement('div');
        el.setAttribute('class', 'mouser');
        el.setAttribute('id', id);

        document.body.appendChild(el);
    });
}());