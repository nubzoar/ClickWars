let Gm = {

    resources: 0,
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

        gmCmdsEle.appendChild(Gm.createButton('createBasicEnemy', 'createBasic', 'Spawn Basic'));
        gmCmdsEle.appendChild(Gm.createButton('createFastEnemy', 'createFast', 'Spawn Fast'));

        setInterval(Gm.updateButtons, 500);
    },

    updateButtons: function() {
        console.log('Resources: ' + Gm.resources + ' Income: ' + Gm.income);
        document.getElementById("gmResources").innerHTML = 'Resources: ' + Gm.resources + '<br />Income: ' + Gm.income;
    },

    deInit: function() {
        let gmCmds = document.getElementById('gmCmds')
        document.getElementsByTagName('body')[0].removeChild(gmCmds);
    },

    createButton: function(enemyType, id, text) {
        let btn = document.createElement('button');
        btn.id = id;
        btn.className = 'cmdBtn';
        btn.onclick = function() {
            SocketIO.socket.emit(enemyType);
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