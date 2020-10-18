// This class is the single source of truth for the game state across all clients
class GameState {
	constructor() {
		// Maps socket ids to socket instances
		this.clients = {};
		// Maps socket ids to player instances
		this.players = {};

		
			
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
}