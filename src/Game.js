let world;
let player;
let cursors;
let playerSpeed = 0.15;

function preload() {
  console.log('preload');

  // load sprites and spritesheets
  this.load.image('background', `http://${process.env.REACT_APP_ASSETS_SERVER_HOSTNAME}:${process.env.REACT_APP_ASSETS_SERVER_PORT}/bg.jpg`);
  this.load.spritesheet('char', `http://${process.env.REACT_APP_ASSETS_SERVER_HOSTNAME}:${process.env.REACT_APP_ASSETS_SERVER_PORT}/char.png`, { frameWidth: 32, frameHeight: 32 });
}

function create() {
  console.log('create');
  this.add.image(0, 0, 'background');

  // create world physics object
  world = this.physics.add.staticGroup();

  // init player
  player = this.physics.add.sprite(100, 100, 'char');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  // create player animations
  this.anims.create({
    key: 'dIdle',
    frames: [ { key: 'char', frame: 1 } ],
    frameRate: 20,
  });

  this.anims.create({
    key: 'lIdle',
    frames: [ { key: 'char', frame: 4 } ],
    frameRate: 20,
  });

  this.anims.create({
    key: 'rIdle',
    frames: [ { key: 'char', frame: 7 } ],
    frameRate: 20,
  });

  this.anims.create({
    key: 'uIdle',
    frames: [ { key: 'char', frame: 10 } ],
    frameRate: 20,
  });

  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('char', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('char', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('char', { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('char', { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1
  });

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