class Player {
  constructor() {
    // Assign basic stats
    this.level = 1;
    this.exp = 0;
    this.hp = 10;
    this.stats = [10, 10, 10, 10, 10] // stats are str, agi, int, end, luk
  }

  updateFromInput(data) {

  }
}

module.exports = Player;