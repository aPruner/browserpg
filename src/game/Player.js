import Phaser from 'phaser';
const playerSpeed = 0.15;

class Player {
  constructor(phaserSprite, phaserKeyboardInput, socketClientInstance) {
    // Attach phaser stuff
    this.phaserSprite = phaserSprite;
    this.phaserSprite.setBounce(0.2);
    this.phaserSprite.setCollideWorldBounds(true);
    
    // init keyboard input controller
    this.wKey = phaserKeyboardInput.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = phaserKeyboardInput.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.sKey = phaserKeyboardInput.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dKey = phaserKeyboardInput.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Attach socketClientInstance for connection to the server
    this.socketClientInstance = socketClientInstance;
  }

  handleInput(delta) {
    // Handle player movement
    this.handleMovementInput(delta);

    // TODO: Handle other types of input, such as attacking, etc
  }

  handleMovementInput(delta) {
    if (this.aKey.isDown) {
      this.phaserSprite.x -= delta * playerSpeed;
      this.phaserSprite.anims.play('left', true);
    }
    
    if (this.dKey.isDown) {
      this.phaserSprite.x += delta * playerSpeed;
      this.phaserSprite.anims.play('right', true);
    }

    if (this.wKey.isDown) {
      this.phaserSprite.y -= delta * playerSpeed;
      if (!this.phaserSprite.anims.isPlaying || (!this.aKey.isDown && !this.dKey.isDown)) {
        this.phaserSprite.anims.play('up', true);
      }
    }
    
    if (this.sKey.isDown) {
        this.phaserSprite.y += delta * playerSpeed;
        if (!this.phaserSprite.anims.isPlaying || (!this.aKey.isDown && !this.dKey.isDown)) {
        this.phaserSprite.anims.play('down', true);
        }
    }

    if (this.phaserSprite.anims.isPlaying && !this.aKey.isDown && !this.dKey.isDown && !this.wKey.isDown && !this.sKey.isDown) {
        const idleKey = `${this.phaserSprite.anims.getCurrentKey()[0]}Idle`;
        this.phaserSprite.anims.play(idleKey, true);
        this.phaserSprite.anims.stop();
    }
  }

  createAnims(animManager) {
    // create player animations
    animManager.create({
      key: 'dIdle',
      frames: [ { key: 'char', frame: 1 } ],
      frameRate: 20,
    });
  
    animManager.create({
      key: 'lIdle',
      frames: [ { key: 'char', frame: 4 } ],
      frameRate: 20,
    });
  
    animManager.create({
      key: 'rIdle',
      frames: [ { key: 'char', frame: 7 } ],
      frameRate: 20,
    });
  
    animManager.create({
      key: 'uIdle',
      frames: [ { key: 'char', frame: 10 } ],
      frameRate: 20,
    });
  
    animManager.create({
      key: 'down',
      frames: animManager.generateFrameNumbers('char', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
  
    animManager.create({
      key: 'left',
      frames: animManager.generateFrameNumbers('char', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
  
    animManager.create({
      key: 'right',
      frames: animManager.generateFrameNumbers('char', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  
    animManager.create({
      key: 'up',
      frames: animManager.generateFrameNumbers('char', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
  }
}

export default Player;