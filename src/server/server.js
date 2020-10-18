const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

// Init server
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// Object defining possible server event schemas to broadcast to clients
const serverEvents = {
  message: {
    name: 'message',
    data: String
  }
}

app.set('port', 5000);

server.listen(5000, function() {
  console.log('server listening on port 5000');
});

io.on('connect', function(data) {
  console.log('player from socket: ' + data.id.toString() + ' has joined the server');
  io.to(data.id).emit('connectionSuccess');
});

// For testing
setInterval(function() {
  io.sockets.emit('message', 'hi')
}, 1000);