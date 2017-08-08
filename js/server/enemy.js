let Enemy = {

    baseSpeed: .1,
    baseSize: 7,

    canvasWidth: 1000,
    canvasHeight: 600,
    canvasCenterX: 500,
    canvasCenterY: 300,

    list: [],

    createBasic: function() {
        this.type = "basic";
        this.color = "red";
        this.x = 0;
        this.y = 0;
        this.speed = Enemy.baseSpeed;
        this.size = Enemy.baseSize;

        Enemy.list.push(this);
    },

    move: function() {
        Enemy.list.map(function(enemy, index) {

            if (enemy.x < Enemy.canvasCenterX) {
                enemy.x += enemy.speed;
            } else {
                enemy.x -= enemy.speed;
            }

            if (enemy.y < Enemy.canvasCenterY) {
                enemy.y += enemy.speed;
            } else {
                enemy.y -= enemy.speed;
            }

            //if (enemy.x + enemy.size > enemy.canvasCenterX - HomeBase.size)
        });
    }
}

module.exports = Enemy;