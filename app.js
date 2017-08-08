let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');

const port = 8080;

let server = http.createServer(function (req, res) {

    let uri = url.parse(req.url).pathname;
    let filename = path.join(process.cwd(), uri);

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

    else if (uri.match(/[/](\w+)/)[1] === 'js') {
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
let io = require('socket.io')(server)

let clientList = [];
let Client = function(ID) {
    if (!checkForClient(ID)) {
        this.ID = ID;
        this.mouseX = NaN;
        this.mouseY = NaN;

        clientList.push(this);
    }
};

function checkForClient(ID) {
    clientList.map(function(client) {
        if (client.ID === ID)
            return true;
    });
};

function removeClient(ID) {
    clientList.map(function(client, index) {
        if (client.ID === ID) {
            clientList.splice(index, 1);
        }
    });
};

let enemyList = [];
let enemyIntervalID = NaN;

io.on('connection', function(socket) {

    console.log('A user connected!');
    socket.emit('setOwnID', socket.ID);

    let client = new Client(socket.ID);
    socket.emit('clientListUpdate', clientList);

    socket.on('emitOwnMovement', function(x, y) {
        clientList.map(function(client) {
            if (client.ID === socket.ID) {
                client.mouseX = x;
                client.mouseY = y;
            }
        });

        io.emit('clientListUpdate', clientList);
    });
    /*
    enemyIntervalID = setInterval(function () {
        io.emit('enemyListUpdate', enemyList);
    }, 10);
    */

    socket.on('disconnect', function() {
        console.log('A user disconnected!')
        removeClient(socket.ID);
    });
});

// Start server
server.listen(port, function(err) {
    if (err) {
        console.log('Error: ' + err);
    }
    console.log('Server listening on port: ' + port);
});