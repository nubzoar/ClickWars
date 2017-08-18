let HomeBase = require('./homeBase.js');
let Engine = require('./engine.js');

let Enemy = {

    idGen: function() {
        // Unique-ish ID's for enemys
        // Barely millisecond unique, but
        // should fine for my purposes.
        return new Date().valueOf();
    },

    baseSpeed: 1,
    baseSize: 10,

    canvasCenterX: Engine.Canvas.width / 2,
    canvasCenterY: Engine.Canvas.height / 2,

    list: [],

    createBasic: function() {
        this.id = Enemy.idGen();
        this.type = "basic";
        this.color = "red";

        let pos = Enemy.getRandomPos();
        this.x = pos[0];
        this.y = pos[1];

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

    getRandomPos: function() {
        // Returns array, index 0 is x coord, index 1 is y coord
        let edge = Engine.getRandomInteger(1, 4);

        if (edge === 1) {
            // Edge is top
            return [0, Engine.getRandomInteger(0, Engine.Canvas.height)];
        } else if (edge === 2) {
            // Edge is right
            return [Engine.getRandomInteger(0, Engine.Canvas.width), Engine.Canvas.height];
        } else if (edge === 3) {
            // Edge is bottom
            return [Engine.Canvas.width, Engine.getRandomInteger(0, Engine.Canvas.height)];
        } else if (edge === 4) {
            // Edge is left
            return [Engine.getRandomInteger(0, Engine.Canvas.width), 0];
        }
    },

    removeById: function(id) {
        Enemy.list.map(function(enemy, index) {
            if (enemy.id === id) {
                Enemy.list.splice(index, 1);
            }
        });
    }
}

module.exports = Enemy;