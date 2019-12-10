import Phaser from "phaser";
import config from "./config/config";
import BootScene from "./scenes/BootScene";
import PreloaderScene from "./scenes/PreloaderScene";
import TitleScene from "./scenes/TitleScene";
import OptionsScene from "./scenes/OptionsScene";
import CreditsScene from "./scenes/CreditsScene";
import GameScene from "./scenes/GameScene";
import { BattleScene, UIScene } from "./scenes/BattleScene";




class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Battle', BattleScene);
    this.scene.add('UI', UIScene);
    this.scene.start('Boot');
  }
}

window.onload = function () {
  window.game = new Game(config);
}




