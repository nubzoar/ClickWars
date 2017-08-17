let HomeBase = require('./homeBase.js');
let Engine = require('./engine.js');

let Enemy = {

    idGen: function() {
        // Unique-ish ID's for enemys
        // Barely millisecond unique, but
        // should fine for my purposes.
        return new Date().valueOf();
    },

    baseSpeed: .1,
    baseSize: 7,

    canvasCenterX: Engine.Canvas.width / 2,
    canvasCenterY: Engine.Canvas.height / 2,

    list: [],

    createBasic: function() {
        this.id = Enemy.idGen();
        this.type = "basic";
        this.color = "red";
        this.x = 0;
        this.y = 0;
        this.speed = Enemy.baseSpeed;
        this.radius = Enemy.baseSize;

        // Variables useful for collision detection
        // since not every enemy might be a circle.
        this.leftEdge = -1 * Enemy.baseSize;
        this.rightEdge = Enemy.baseSize;
        this.topEdge = -1 * Enemy.baseSize;
        this.bottomEdge = Enemy.baseSize;

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

            // Collision doesn't work correctly in the corners of the home base
            // because the collision code doesn't account for the fact that home base is a circle.
            if (enemy.x + enemy.rightEdge >= Enemy.canvasCenterX - HomeBase.size
                    && enemy.x + enemy.leftEdge <= Enemy.canvasCenterX + HomeBase.size) {
                if (enemy.y + enemy.bottomEdge >= Enemy.canvasCenterY - HomeBase.size
                    && enemy.y + enemy.topEdge <= Enemy.canvasCenterY + HomeBase.size) {
                        Enemy.removeById(enemy.id);
                        HomeBase.health--;
                }
            }
        });
    },

    removeById: function(id) {
        Enemy.list.map(function(enemy, index) {
            if (enemy.id === id) {
                Enemy.list.splice(enemy.index, 1);
            }
        });
    }
}

module.exports = Enemy;