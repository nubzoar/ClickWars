let Canvas = {

    width: 1000,
    height: 600,
    xOffset: NaN,
    yOffset: NaN,
    id: "ClickWars",
    containerId: "game",

    colorList: ['Blue', 'Green', 'Yellow', 'Orange', 'Red', 'Purple', 'Cyan'],

    init: function() {

        let can = document.createElement('canvas');
        can.id = Canvas.id;
        can.width = Canvas.width;
        can.height = Canvas.height;

        document.getElementById(Canvas.containerId).appendChild(can);

        Canvas.getOffsets();
    },

    getOffsets: function() {
        let boundingBox = document.getElementById(Canvas.id).getBoundingClientRect();
        Canvas.xOffset = boundingBox.left;
        Canvas.yOffset = boundingBox.top;
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

    drawCircle: function(ctx, x, y, radius, color ) {

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

    }
}