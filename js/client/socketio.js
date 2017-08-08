let SocketIO = {

    socket: io(),
    ownClientId: null,
    gmClientId: null,
    clientList: [],
    enemyList: [],
    HomeBase: {},

    init: function() {

        SocketIO.socket.on('setOwnId', function(id) {
            SocketIO.ownClientId = id;
            // TO DO: Remove listener?
        });

        SocketIO.socket.on('intervalUpdate', function(hb, clients, enemys) {
            SocketIO.HomeBase = hb;
            SocketIO.clientList = clients;
            SocketIO.enemyList = enemys;
        });

    },

    updateGm: function() {
        if (SocketIO.clientList[0]) {
            SocketIO.gmClientId = SocketIO.clientList[0].id;
        }
    }


}