let SocketIO = {

    socket: io(),
    ownClientID: null,
    clientList: [],

    init: function() {

        SocketIO.socket.on('setOwnID', function(id) {
            SocketIO.ownClientID = id;
            // TO DO: Remove listener?
        });

        SocketIO.socket.on('clientListUpdate', function(list) {SocketIO.clientList = list;});
    },


}