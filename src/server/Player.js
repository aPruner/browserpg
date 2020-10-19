const playerSpeed = 0.15;

// Server-side player class
class Player {
  constructor(name, socketId) {
    this.name = name;
    this.socketId = socketId;

    this.inputState = {
      wKeyPressed: false,
      aKeyPressed: false,
      sKeyPressed: false,
      dKeyPressed: false,
      // TODO: More input as needed
    }

    this.position = {
      x: 100,
      y: 100
    };

    this.currentAnimKey = null;
    this.isAnimPlaying = false;

    // Assign basic stats
    this.level = 1;
    this.exp = 0;
    this.hp = 10;
    this.stats = [10, 10, 10, 10, 10] // stats are str, agi, int, end, luk
  }

  // Update state based on a message from the server
  updateFromInput(data) {

  }

  // Update periodically
  update(timestamp, delta) {
    if (this.inputState.wKeyPressed) {
      this.position.y -= playerSpeed * delta;
    }

    if (this.inputState.aKeyPressed) {
      this.position.x -= playerSpeed * delta;
    }

    if (this.inputState.sKeyPressed) {
      this.position.y += playerSpeed * delta;
    }

    if (this.inputState.dKeyPressed) {
      this.position.x += playerSpeed * delta;
    }
  }
}

module.exports = Player;