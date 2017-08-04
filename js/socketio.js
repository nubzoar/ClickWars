let SocketIO = {

    socket: io(),
    ownClientID: null,
    clientList: [],

    init: function() {

        // Emit mouse coords to the server.
        document.onmousemove = function(event) {
            SocketIO.socket.emit('emitOwnMovement', event.pageX - Canvas.xOffset, event.pageY - Canvas.yOffset);
        }

        SocketIO.socket.on('setOwnID', function(id) {
            SocketIO.ownClientID = id;
            // TO DO: Remove listener?
        });

        SocketIO.socket.on('clientListUpdate', function(list) {SocketIO.clientList = list;});
    },


}