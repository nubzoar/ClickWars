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

    else if (uri.match(/[/](\w+)/)[1] === 'javascript') {
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
let Client = function(id) {
    if (!checkForClient(id)) {
        this.id = id;
        this.mouseX = NaN;
        this.mouseY = NaN;

        clientList.push(this);
    }
};

function checkForClient(id) {
    clientList.map(function(client) {
        if (client.id === id) {return true;}
    });
}

function removeClient(id) {
    clientList.map(function(client, index) {
        if (client.id === id) {
            clientList.splice(index, 1);
        }
    });
}

io.on('connection', function(socket) {

    console.log('A user connected!');
    let client = new Client(socket.id);
    socket.emit('setOwnID', socket.id);
    socket.emit('clientListUpdate', clientList);

    socket.on('emitOwnMovement', function(x, y) {
        clientList.map(function(client) {
            if (client.id === socket.id) {
                client.mouseX = x;
                client.mouseY = y;
            }
        });

        socket.emit('clientListUpdate', clientList);
    });

    socket.on('disconnect', function() {
        console.log('A user disconnected!')
        removeClient(socket.id);
    });
});

// Start server
server.listen(port, function(err) {
    if (err) {
        console.log('Error: ' + err);
    }
    console.log('Server listening on port: ' + port);
});