const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

// Init server
const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set('port', 5000);

server.listen(5000, function() {
    console.log('server listening on port 5000');
});

io.on('connection', function(socket) {

});

// For testing
setInterval(function() {
    io.sockets.emit('message', 'hi')
}, 1000);