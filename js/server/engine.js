let Engine = {

    Canvas: function() {
        this.width = 1000;
        this.height = 600;
        this.xOffset = NaN;
        this.yOffset = NaN;
        this.id = "ClickWars";
        this.containerID = "game";
        this.drawIntervalID = NaN;
        this.drawIntervalSpeed = 10;

        this.colorList = ['Blue', 'Green', 'Yellow', 'Orange', 'Red', 'Purple', 'Cyan'];
    }
};

module.exports = Engine;