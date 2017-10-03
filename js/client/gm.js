let Gm = {

    init: function() {
        console.log("You are the GM!");

        let cmds = document.createElement('div');
        cmds.id = 'gmCmds';
        document.getElementsByTagName('body')[0].appendChild(cmds);

        Gm.createButton('createBasicEnemy', 'createBasic', 'Spawn Basic');
        Gm.createButton('createFastEnemy', 'createFast', 'Spawn Fast');
    },

    deInit: function() {
        let gmCmds = document.getElementById('gmCmds')
        document.getElementsByTagName('body')[0].removeChild(gmCmds);
    },

    createButton: function(enemyType, id, text) {
        let btn = document.createElement('button');
        btn.id = id;
        btn.class = 'cmdBtn';
        btn.onclick = function() {
            SocketIO.socket.emit(enemyType);
        }
        let txtNode = document.createTextNode(text);
        btn.appendChild(txtNode);
        document.getElementById('gmCmds').appendChild(btn);
    }
}