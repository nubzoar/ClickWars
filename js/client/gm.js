let Gm = {

    resources: 0,
    resourceCap: 0,
    income: 0,

    init: function() {
        console.log("You are the GM!");

        let cmds = document.createElement('div');
        cmds.id = 'gmCmds';
        document.getElementsByTagName('main')[0].appendChild(cmds);

        let gmCmdsEle = document.getElementById('gmCmds');

        let resourceEle = document.createElement('p');
        resourceEle.id = 'gmResources';
        resourceEle.innerHTML = 'Resources: ' + Gm.resources + '<br />Income: ' + Gm.income;
        gmCmdsEle.appendChild(resourceEle);

        gmCmdsEle.appendChild(Gm.createButton('createBasic', 'Spawn Basic (40)'));
        gmCmdsEle.appendChild(Gm.createButton('createFast', 'Spawn Fast (120)'));

        setInterval(Gm.updateButtons, 20);
    },

    updateButtons: function() {
        document.getElementById("gmResources").innerHTML = 'Resources: ' + Gm.resources + ' / ' + Gm.resourceCap + '<br />Income: ' + Gm.income + "/Sec";
    },

    deInit: function() {
        let gmCmds = document.getElementById('gmCmds')
        document.getElementsByTagName('body')[0].removeChild(gmCmds);
    },

    createButton: function(enemyType, text) {
        let btn = document.createElement('button');
        btn.id = enemyType;
        btn.className = 'cmdBtn';
        btn.onclick = function() {
            SocketIO.socket.emit('createEnemy', enemyType);
        }
        let txtNode = document.createTextNode(text);
        btn.appendChild(txtNode);
        return btn;
    },

    disableButton: function(button) {
        button.className = 'cmdBtn disabled';
        button.disabled = true;
    },

    enableButton: function(button) {
        button.className = 'cmdBtn';
        button.disabled = false;
    }
}