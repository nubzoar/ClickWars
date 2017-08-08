let Engine = {

    intervalID: NaN,
    intervalSpeed: 10,

    init: function() {

        SocketIO.init();
        Canvas.init();

        if (SocketIO.clientList[0].ID === SocketIO.ownClientID) {
            Spawn.init();
        }

        Engine.intervalID = setInterval(Engine.run, Engine.intervalSpeed);
    },

    run: function() {

        let ctx = document.getElementById(Canvas.ID).getContext('2d');

        ctx.clearRect(0, 0, Canvas.wIDth, Canvas.height);

        Canvas.drawCircle(ctx, Canvas.wIDth / 2, Canvas.height / 2, HomeBase.size, HomeBase.color);

        SocketIO.clientList.map(function(client, index) {
            if (client.ID !== SocketIO.ownClientID) {
                Canvas.drawMouse(ctx, client.mouseX, client.mouseY, Canvas.colorList[index]);
            }
        });
    }
}