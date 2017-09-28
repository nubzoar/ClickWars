let Canvas = {

    width: NaN,
    height: NaN,

    xOffset: NaN,
    yOffset: NaN,

    id: '',
    containerId: '',

    drawIntervalID: NaN,
    drawIntervalSpeed: 10,

    colorList: [],

    init: function() {
        let can = document.createElement('canvas');
        can.id = Canvas.id;
        can.width = Canvas.width;
        can.height = Canvas.height;
    
        document.getElementById(Canvas.containerId).appendChild(can);
    
        document.getElementsByTagName('body')[0].onresize = Canvas.getOffsets;
        Canvas.getOffsets();
    },

    getOffsets: function() {
        let boundingBox = document.getElementById(Canvas.id).getBoundingClientRect();
        Canvas.xOffset = boundingBox.left;
        Canvas.yOffset = boundingBox.top;
    },

    draw: function() {
        let ctx = document.getElementById(Canvas.id).getContext('2d');
    
        ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    
        // Draw HomeBase
        Canvas.drawCircle(ctx, Canvas.width / 2, Canvas.height / 2, SocketIO.HomeBase.size, SocketIO.HomeBase.color);
        ctx.font = "16px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(SocketIO.HomeBase.health, Canvas.width / 2 - ( ctx.measureText(SocketIO.HomeBase.health).width / 2 ), Canvas.height / 2 + 7);
        
        // Draw clients
        SocketIO.clientList.map(function(client, index) {
            if (client.id !== SocketIO.ownClientId && client.id !== SocketIO.gmClientId) {
                Canvas.drawMouse(ctx, client.mouseX, client.mouseY, Canvas.colorList[index]);
            }

            // Draw colored circle for each player in top right.
            Canvas.drawCircle(ctx, Canvas.width - (15 * index + 10), 10, 5, Canvas.colorList[index]);
        });
    
        // Draw enemies
        SocketIO.enemyList.map(function(enemy) {
            Canvas.drawCircle(ctx, enemy.x, enemy.y, enemy.radius, enemy.color);
        });
    },

    drawMouse: function(ctx, x, y, color) {
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
    },

    drawCircle: function(ctx, x, y, radius, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }
}