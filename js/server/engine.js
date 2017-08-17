let Engine = {

    serverIntervalId: NaN,
    serverIntervalSpeed: 20,

    // Enemy spawning interval id for testing purposes.
    enemyTestingId: NaN,

    Canvas: {
        width: 1000,
        height: 600,
        id: "ClickWars",
        containerId: "game",
        drawIntervalSpeed: 10,

        colorList: ['Blue', 'Green', 'Yellow', 'Orange', 'Red', 'Purple', 'Cyan']
    }


};

module.exports = Engine;