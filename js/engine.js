let Engine = {

    intervalID: NaN,
    intervalSpeed: 10,

    init: function() {

        SocketIO.init();
        Canvas.init();

        Engine.intervalID = setInterval(Engine.run, Engine.intervalSpeed);
    },

    run: function() {

        let ctx = document.getElementById(Canvas.ID).getContext('2d');

        ctx.clearRect(0, 0, Canvas.width, Canvas.height);

        SocketIO.clientList.map(function(client, index) {
            if (client.id !== SocketIO.ownClientID) {
                Canvas.drawMouse(ctx, client.mouseX, client.mouseY, Canvas.colorList[index]);
            }
        });
    }
}