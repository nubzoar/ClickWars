let SocketIO = {

    socket: io(),
    ownClientId: null,
    gmClientId: null,
    
    clientList: [],
    enemyList: [],
    Center: {},

    init: function() {

        SocketIO.socket.on('initializeGame', function(clients, id, canvas) {
            SocketIO.clientList = clients;
            SocketIO.gmClientId = SocketIO.clientList[0].id;
            SocketIO.ownClientId = id;
            
            SocketIO.loadCanvas(canvas);

            Canvas.init();
            Player.init();
            Canvas.drawIntervalId = setInterval(Canvas.draw, Canvas.drawIntervalSpeed);

            // TO DO: Figure out how to remove initializeGame listener?
        });

        SocketIO.socket.on('intervalUpdate', function(center, clients, enemys) {
            SocketIO.Center = center;
            SocketIO.clientList = clients;
            SocketIO.enemyList = enemys;
        });

        SocketIO.socket.on('updateGm', function(clients) {
            SocketIO.clientList = clients;
            SocketIO.gmClientId = SocketIO.clientList[0].id;
        });

    },

    loadCanvas: function(canvas) {
        Canvas.width = canvas.width;
        Canvas.height = canvas.height;
        Canvas.id = canvas.id;
        Canvas.containerId = canvas.containerId;
        Canvas.drawIntervalSpeed = canvas.drawIntervalSpeed;
        Canvas.colorList = canvas.colorList;
    },

    emitMovement: function(x, y) {
        SocketIO.socket.emit('clientMovement', x, y);
    },

    removeEnemy: function(id) {
        SocketIO.socket.emit('removeEnemy', id);
    }

    /*
    This function dynamically loads another javascript file from the server.
    I decided to approach it problem a different way, but this was interesting.
    loadScript: function(src) {
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        head.appendChild(script);
    }
    */
}