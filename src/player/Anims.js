function createAnims(animManager) {
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

export default createAnims;