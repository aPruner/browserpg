import React from 'react'
import ReactDOM from 'react-dom'
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader'
import Phaser from 'phaser'
import App from './App';
import { preload, create, update } from './game/Game';
import './index.css';

const game = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        x: 0,
        y: 0
      },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
}
 
ReactDOM.render(<App game={<ion-phaser ref={el => el.game = game} />}/>, document.getElementById('root'));
 
defineIonPhaser(window);
