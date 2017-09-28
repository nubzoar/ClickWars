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

    getRandomInteger: function(min, max) {
        return ( Math.floor( Math.random() * (max - min) ) + min );
    },

    getRandomBool: function() {
        return ( Math.random() >= 0.5 );
    }

};

module.exports = Engine;