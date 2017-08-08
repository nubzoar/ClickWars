let Engine = {

    intervalId: NaN,
    intervalSpeed: 10,

    init: function() {
        Canvas.init();
        Player.init();
        SocketIO.init();

        Engine.intervalId = setInterval(Engine.run, Engine.intervalSpeed);
        /*
        setInterval(function() {
            SocketIO.socket.emit('createBasicEnemy')
        }, 1500);
        */
    },

    run: function() {

        let ctx = document.getElementById(Canvas.id).getContext('2d');

        ctx.clearRect(0, 0, Canvas.width, Canvas.height);

        // Draw HomeBase
        Canvas.drawCircle(ctx, Canvas.width / 2, Canvas.height / 2, SocketIO.HomeBase.size, SocketIO.HomeBase.color);
        ctx.font = "16px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(SocketIO.HomeBase.health, Canvas.width / 2 - 15, Canvas.height / 2 + 7);

        SocketIO.clientList.map(function(client, index) {
            if (client.id !== SocketIO.ownClientId && client.id !== SocketIO.gmClientId) {
                Canvas.drawMouse(ctx, client.mouseX, client.mouseY, Canvas.colorList[index]);
            }
        });

        SocketIO.enemyList.map(function(enemy) {
            Canvas.drawCircle(ctx, enemy.x, enemy.y, enemy.color);
        });

        SocketIO.updateGm();
    }
}