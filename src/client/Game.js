import io from 'socket.io-client';

import Player from './Player';

let tileset;
let playerInstance;
let socketClientInstance;

// Core phaser game loop functions
function preload() {
  const assetBaseUrl = `http://${process.env.REACT_APP_ASSETS_SERVER_HOSTNAME}:${process.env.REACT_APP_ASSETS_SERVER_PORT}`;

  // load sprites and spritesheets
  this.load.image('tiles', `${assetBaseUrl}/tilesheet.png`);
  this.load.spritesheet('char', `${assetBaseUrl}/char.png`, { frameWidth: 32, frameHeight: 32 });
  this.load.tilemapTiledJSON('map', `${assetBaseUrl}/rpgMap2.json`);
}

function create() {
  // init the map and world
  initGameWorldAndMap(this);

  // init socket
  this.socket = io(`ws://${process.env.REACT_APP_SOCKET_CLIENT_HOSTNAME}:${process.env.REACT_APP_SOCKET_CLIENT_PORT}`);
  // attach a connectionSuccess listener to hear back from the server if we succeeded
  this.socket.on('connectionSuccess', () => {
    console.log('socket ' + this.socket.id + ' successfully connected to the server');
  })

  // attach listener to update events from the server
  this.socket.on('update', newState => onReceiveGameStateFromServer(newState));
  
  // init player
  playerInstance = new Player(this.physics.add.sprite(100, 100, 'char'), this.input.keyboard, socketClientInstance);
  playerInstance.createAnims(this.anims);

  // init the camera
  initCamera(this);
}

function update(timestamp, delta) {
  playerInstance.handleInput(delta);
}

// Helper functions
function initGameWorldAndMap(scene) {
  scene.map = scene.make.tilemap({key: 'map'});
  tileset = scene.map.addTilesetImage('tilesheet_32x', 'tiles');
  scene.groundLayer1 = scene.map.createStaticLayer('ground1', tileset, 0, 0);
  scene.groundLayer2 = scene.map.createStaticLayer('ground2', tileset, 0, 0);
  scene.objectsLayer = scene.map.createStaticLayer('objects3', tileset, 0, 0);
  scene.physics.world.setBounds(0, 0, 1024, 1024);
}

function initCamera(scene) {
  scene.cameras.main.startFollow(playerInstance.phaserSprite);
}

function onReceiveGameStateFromServer(newState) {
    console.log('received new state', newState);
}

export {
  preload,
  create,
  update
};