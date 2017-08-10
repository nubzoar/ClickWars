let start = function () {

    SocketIO.init();

    while (typeof Canvas === undefined) {};

    Canvas.init();
    Player.init();

    Canvas.drawIntervalId = setInterval(Canvas.draw, Canvas.drawIntervalSpeed);

    /*
    setInterval(function() {
        SocketIO.socket.emit('createBasicEnemy')
    }, 1500);
    */
};