let Player = {

    x: NaN,
    y: NaN,

    init: function() {
        
        // Track mouse coords
        document.onmousemove = function(event) {
            // Set own coords
            Player.x = event.pageX - Canvas.xOffset;
            Player.y = event.pageY - Canvas.yOffset;
            // Emit coords to the server.
            SocketIO.socket.emit('emitOwnMovement', event.pageX - Canvas.xOffset, event.pageY - Canvas.yOffset);
        }

        canvas.addEventListener('click', function() {
            if ( Player.detectEnemy(Player.x, Player.y) ) {
                // Remove enemy
            }
        });
    },

    detectEnemy: function(x, y) {
        
    }
}