'use strict';

function onConnect(socket) {
    console.info('[%s] connected', socket.handshake.address);
    socket.on('disconnect', function() {
        onDisconnect(socket);
    });

    require('../api/main/main.socket').register(socket);
}

function onDisconnect(socket) {
    console.info('[%s] disconnected', socket.handshake.address);
}

module.exports = function(socketio) {
    socketio.on('connection', onConnect);
};
