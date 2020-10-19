const Player = require('./Player');

// This class is the single source of truth for the game state across all clients
class GameState {
	constructor() {
		// Maps socket ids to socket instances
		this.clients = {};
		// Maps socket ids to player instances
		this.players = {};

		// variables to hold the last update time, and delta time
		this.lastUpdate = 0;
		this.delta = 0;
	}

	createNewPlayer() {
		return new Player();
	}

	// Add a player (socket and player instances) to the server game state
	addPlayer(socket, playerInstance) {
		if (!this.clients[socket.id] && !this.players[socket.id]) {
			this.clients[socket.id] = socket;
			this.players[socket.id] = playerInstance;
		}
	}

	// Remove a player (socket and player instances) from the server game state
	removePlayer(socket, playerInstance) {
		if (this.clients[socket.id] && this.players[socket.id]) {
			delete this.clients[socket.id];
			delete this.players[socket.id];
		}
	}

	// Update the game state for a given socket id (mapping to a specific client/player) based on the data
	updateSpecificPlayerFromInput(socketId, data) {
		console.log('updating gameState server-side for socket: ' + socketId + ' with data: ', data);
		this.players[socketId].update(data);
	}

	// Update the game state periodically
	updateAllPlayers() {
		const currentTime = Date.now();
		this.delta = currentTime - this.lastUpdate;
		this.lastUpdate = currentTime;

		this.players.values().forEach(player => {
			player.update(currentTime, delta);
		});
	}

}

module.exports = GameState;