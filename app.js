let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');

const port = 8080;

let server = http.createServer(function (req, res) {

    let uri = url.parse(req.url).pathname;
    let filename = path.join(process.cwd(), uri);

    /*
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
                return404();
            } else {
                res.writeHead(200, { 'Content-Type' : 'image/png' });
                fs.createReadStream(filename).pipe(res);
            }
        });
    }

    else {
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

let serverIntervalId = NaN;
let serverIntervalSpeed = 20;

io.on('connection', function(socket) {

    console.log('A user connected! ID: ' + socket.id);
    socket.emit('setOwnId', socket.id);

    let client = new Client.create(socket.id);

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

    serverIntervalId = setInterval(function () {
        io.emit('intervalUpdate', HomeBase, Client.list, Enemy.list);
        Enemy.move();
    }, serverIntervalSpeed);

    socket.on('disconnect', function() {
        console.log('A user disconnected! ID: ' + socket.id);
        Client.remove(socket.id);
    });
});

// Start server
server.listen(port, function(err) {
    if (err) {
        console.log('Error: ' + err);
    }
    console.log('Server listening on port: ' + port);
});