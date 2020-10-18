import Player from './player/Player';

let tileset;
let playerInstance;

function preload() {
  console.log('preload');

  const assetBaseUrl = `http://${process.env.REACT_APP_ASSETS_SERVER_HOSTNAME}:${process.env.REACT_APP_ASSETS_SERVER_PORT}`;

  // load sprites and spritesheets
  this.load.image('tiles', `${assetBaseUrl}/tilesheet.png`);
  this.load.spritesheet('char', `${assetBaseUrl}/char.png`, { frameWidth: 32, frameHeight: 32 });
  this.load.tilemapTiledJSON('map', `${assetBaseUrl}/rpgMap2.json`);
}

function create() {
  console.log('create');
  this.map = this.make.tilemap({key: 'map'});
  tileset = this.map.addTilesetImage('tilesheet_32x', 'tiles');
  this.groundLayer1 = this.map.createStaticLayer('ground1', tileset, 0, 0);
  this.groundLayer2 = this.map.createStaticLayer('ground2', tileset, 0, 0);
  this.objectsLayer = this.map.createStaticLayer('objects3', tileset, 0, 0);
  this.physics.world.setBounds(0, 0, 1024, 1024);
  
  // init player
  playerInstance = new Player(this.physics.add.sprite(100, 100, 'char'), this.input.keyboard);
  playerInstance.createAnims(this.anims);
  this.cameras.main.startFollow(playerInstance.phaserSprite);
}

function update(timestamp, delta) {
  playerInstance.handleInput(delta);
}

export {
  preload,
  create,
  update
};