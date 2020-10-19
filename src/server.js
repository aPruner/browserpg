// external dependencies
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Internal dependencies
const GameState = require('./server/GameState');

// Init server
const app = express();
const server = http.Server(app);
const io = socketIO(server);

const FRAME_RATE = 1000 / 60;

app.set('port', 5000);

const gameState = new GameState();

io.on('connect', socket => {
  console.log('player from socket: ' + socket.id.toString() + ' has joined the server');
  const newPlayer = gameState.createNewPlayer();
  gameState.addPlayer(socket, newPlayer)
  io.to(socket.id).emit('connectionSuccess');
  console.log('players now on the server: ', gameState.players);

  // This handler will have this socket listen on any playerAction event from the server
  socket.on('playerAction', data => {
    gameState.update(socket.id, data);
  })
});

// For testing
setInterval(() => {
  gameState.updateAllPlayers();
  gameState.broadcastState();
}, FRAME_RATE);

server.listen(5000, () => {
  console.log('server listening on port 5000');
});