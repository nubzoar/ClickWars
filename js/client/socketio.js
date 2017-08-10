let SocketIO = {

    socket: io(),
    ownClientId: null,
    Canvas: null,
    gmClientId: null,
    clientList: [],
    enemyList: [],
    HomeBase: {},

    init: function() {

        SocketIO.socket.on('initializeGame', function(clients, id, canvas) {
            SocketIO.clientList = clients;
            SocketIO.gmClientId = SocketIO.clientList[0].id;
            SocketIO.ownClientId = id;

            // Store Canvas object constructor recieved from the server.
            SocketIO.Canvas = canvas;
            // Load Canvas script which uses contructor.
            SocketIO.loadScript("/js/client/canvas.js");

            // TO DO: Remove listener?
        });

        SocketIO.socket.on('intervalUpdate', function(hb, clients, enemys) {
            SocketIO.HomeBase = hb;
            SocketIO.clientList = clients;
            SocketIO.enemyList = enemys;
        });

        SocketIO.socket.on('updateGm', function(clients) {
            SocketIO.clientList = clients;
            SocketIO.gmClientId = SocketIO.clientList[0].id;
        });

    },

    loadScript: function(src) {
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        head.appendChild(script);
    }


}