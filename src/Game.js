import createAnims from './player/Anims';

let tileset;
let world;
let player;
let cursors;
let playerSpeed = 0.15;

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

  // create world physics object
  world = this.physics.add.staticGroup();

  // init player
  player = this.physics.add.sprite(100, 100, 'char');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  createAnims(this.anims);
  this.cameras.main.startFollow(player);
  this.physics.world.setBounds(0, 0, 1024, 1024);

  // init keyboard input controller
  cursors = this.input.keyboard.createCursorKeys();
}

function update(timestamp, delta) {

  // Handle player movement
  if (cursors.left.isDown) {
    player.x -= delta * playerSpeed;
    player.anims.play('left', true);
  }
  
  if (cursors.right.isDown) {
    player.x += delta * playerSpeed;
    player.anims.play('right', true);
  }

  if (cursors.up.isDown) {
    player.y -= delta * playerSpeed;
    if (!player.anims.isPlaying || (!cursors.left.isDown && !cursors.right.isDown)) {
      player.anims.play('up', true);
    }
  }
  
  if (cursors.down.isDown) {
    player.y += delta * playerSpeed;
    if (!player.anims.isPlaying || (!cursors.left.isDown && !cursors.right.isDown)) {
      player.anims.play('down', true);
    }
  }

  if (player.anims.isPlaying && !cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
    const idleKey = `${player.anims.getCurrentKey()[0]}Idle`;
    player.anims.play(idleKey, true);
    player.anims.stop();
  }
}

export {
  preload,
  create,
  update
};