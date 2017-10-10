let Client = require('./client.js');

let Engine = {

    serverIntervalId: null,
    serverIntervalSpeed: 20,

    // Enemy spawning interval id for testing purposes.
    enemyTestingId: NaN,

    Canvas: {
        width: 1000,
        height: 600,
        id: "ClickWars",
        containerId: "game",
        drawIntervalSpeed: 10,

        colorList: ['Black', 'Blue', 'Red', 'Green', 'Orange', 'Pink', 'Cyan', 'Purple', 'Gold', 'Grey', 'LightBlue', 'DarkGreen', 'Brown']
    },

    Gm: {
        resources: 0,
        baseIncome: Client.list.length * 10,
        extraIncome: 0,

        calcIncome: function () {
            return this.baseIncome + this.extraIncome;
        },

        updateBaseIncome: function() {
            this.baseIncome = Client.list.length * 10;
        },

        resourceUpdate: function() {
            this.resources += this.calcIncome();
        },

        intervalId: NaN,
        intervalSpeed: 1000
    },

    getDistance: function(x1, x2, y1, y2) {
        return Math.sqrt( Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) )
    },

    // Minimum is inclusive, maximum is exclusive.
    getRandomInteger: function(min, max) {
        return ( Math.floor( Math.random() * (max - min) ) + min );
    },

    getRandomBool: function() {
        return ( Math.random() >= 0.5 );
    }

};

module.exports = Engine;