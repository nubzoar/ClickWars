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

        colorList: ['Blue', 'Green', 'Gold', 'Orange', 'Red', 'Purple', 'Cyan']
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