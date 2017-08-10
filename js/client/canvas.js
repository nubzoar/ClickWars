let Canvas = new SocketIO.Canvas();

Canvas.init = function() {
    let can = document.createElement('canvas');
    can.id = Canvas.id;
    can.width = Canvas.width;
    can.height = Canvas.height;

    document.getElementById(Canvas.containerId).appendChild(can);

    document.getElementsByTagName('body')[0].onresize = Canvas.getOffsets;
    Canvas.getOffsets();
};

Canvas.getOffsets = function() {
    let boundingBox = document.getElementById(Canvas.id).getBoundingClientRect();
    Canvas.xOffset = boundingBox.left;
    Canvas.yOffset = boundingBox.top;
};

Canvas.draw = function() {
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
};

Canvas.drawMouse = function() {
    // Triangle bit
    ctx.beginPath();
    ctx.moveTo(x, y + 12);
    ctx.lineTo(x, y);
    ctx.lineTo(x + 8, y + 10);
    ctx.fillStyle = color;
    ctx.fill();

    // Line bit
    ctx.beginPath();
    ctx.moveTo(x + 3, y + 8);
    ctx.lineTo(x + 6, y + 15);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
};

Canvas.drawCircle = function() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
};