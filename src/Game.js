import createAnims from './player/Anims';
import Phaser from 'phaser';

let tileset;
let player;
let keyboardInput;
let playerSpeed = 0.15;

let wKey;
let aKey;
let sKey;
let dKey;

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

  // init player
  player = this.physics.add.sprite(100, 100, 'char');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  createAnims(this.anims);
  this.cameras.main.startFollow(player);
  this.physics.world.setBounds(0, 0, 1024, 1024);

  // init keyboard input controller
  wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
}

function update(timestamp, delta) {

  // Handle player movement
  if (aKey.isDown) {
    player.x -= delta * playerSpeed;
    player.anims.play('left', true);
  }
  
  if (dKey.isDown) {
    player.x += delta * playerSpeed;
    player.anims.play('right', true);
  }

  if (wKey.isDown) {
    player.y -= delta * playerSpeed;
    if (!player.anims.isPlaying || (!aKey.isDown && !dKey.isDown)) {
      player.anims.play('up', true);
    }
  }
  
  if (sKey.isDown) {
    player.y += delta * playerSpeed;
    if (!player.anims.isPlaying || (!aKey.isDown && !dKey.isDown)) {
      player.anims.play('down', true);
    }
  }

  if (player.anims.isPlaying && !aKey.isDown && !dKey.isDown && !wKey.isDown && !sKey.isDown) {
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