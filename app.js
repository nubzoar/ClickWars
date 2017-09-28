let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');

const port = 8080;

let server = http.createServer(function (req, res) {

    let uri = url.parse(req.url).pathname;
    let filename = path.join(process.cwd(), uri);

    /*
    // Remove comment for verbose uri logging.
    let array = uri.match(/[/](\w+)/g);
    if (array) {
        for (let i = 0; i < array.length; i++) {
            console.log(array[i]);
        }
    }
    */

    if (req.url === '/') {

        res.writeHead(200, { 'Content-Type' : 'text/html' });

        fs.createReadStream('index.html').pipe(res)
    }

    else if (uri.match(/[/](\w+)/)[1] === 'css') {
        fs.exists(filename, function(exists) {
            if (!exists) {
                console.log("Css doesn't exist: " + req.url);
                return404();
            } else {
                res.writeHead(200, { 'Content-Type' : 'text/css' });
                fs.createReadStream(filename).pipe(res);
            }
        });
    }

    else if (uri.match(/[/](\w+)/g)[0] === '/js' && uri.match(/[/](\w+)/g)[1] === '/client') {
        fs.exists(filename, function(exists) {
            if (!exists) {
                console.log("Client javascript doesn't exist: " + req.url);
                return404();
            } else {
                res.writeHead(200, { 'Content-Type' : 'text/javascript' });
                fs.createReadStream(filename).pipe(res);
            }
        });
    }

    // Currently only serves .pngs
    // TO DO: Write logic to detect file type and write http header with correct mime type.
    else if (uri.match(/[/](\w+)/)[1] === 'images') {
        fs.exists(filename, function(exists) {
            if (!exists) {
                console.log("Image doesn't exist: " + req.url);
                return404();
            } else {
                res.writeHead(200, { 'Content-Type' : 'image/png' });
                fs.createReadStream(filename).pipe(res);
            }
        });
    }

    else {
        console.log("Else reached, here is request url: " + req.url);
        return404(res);
    }

})

function return404(res) {
    res.writeHead(200, { 'Content-Type' : 'text/plain' });
    res.write('Error 404: Not Found');
    res.end();
}

// SOCKET.IO
let io = require('socket.io')(server);
let HomeBase = require('./js/server/homeBase.js');
let Client = require('./js/server/client.js');
let Enemy = require('./js/server/enemy.js');
let Engine = require('./js/server/engine.js');

io.on('connection', function(socket) {

    console.log('A user connected! ID: ' + socket.id);
    let client = new Client.create(socket.id);

    console.log("Client.list: " + Client.list + ", socket.id: " + socket.id + ", Engine.Canvas: " + Engine.Canvas);
    socket.emit('initializeGame', Client.list, socket.id, Engine.Canvas);

    socket.on('clientMovement', function(x, y) {
        Client.list.map(function(client) {
            if (client.id === socket.id) {
                client.mouseX = x;
                client.mouseY = y;
            }
        });
    });

    socket.on('createBasicEnemy', function() {
        let enemy = new Enemy.createBasic();
    });

    socket.on('removeEnemy', function(id) {
        Enemy.removeById(id);
    });

    if (!Engine.serverIntervalId) {
        console.log("Engine interval started!");
        Engine.serverIntervalId = setInterval(function () {
            Enemy.move();
            io.emit('intervalUpdate', HomeBase, Client.list, Enemy.list);
        }, Engine.serverIntervalSpeed);
    }

    // Temporary enemy creation for testing purposes.
    if (!Engine.enemyTestingId) {
        console.log("Enemy testing interval started!");
        Engine.enemyTestingId = setInterval(function() {
            let enemy = new Enemy.createBasic();
        }, 3000);
    }

    socket.on('disconnect', function() {
        console.log('A user disconnected! ID: ' + socket.id);
        Client.remove(socket.id);
        io.emit('updateGm', Client.list);
    });
});

// Start server
server.listen(port, function(err) {
    if (err) {
        console.log('Error: ' + err);
    }
    console.log('Server listening on port: ' + port);
});