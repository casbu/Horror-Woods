import Phaser from "phaser";
import config from "./config/config";
import Model from "./Model";
import BootScene from "./scenes/BootScene";
import PreloaderScene from "./scenes/PreloaderScene";
import TitleScene from "./scenes/TitleScene";
import OptionsScene from "./scenes/OptionsScene";
import CreditsScene from "./scenes/CreditsScene";
// import GameScene from "./scenes/GameScene";
import ForestonScene from "./scenes/places/ForestonScene";
// import Dialog from "./plugins/Dialog"; 
import { BattleScene, UIScene } from "./scenes/BattleScene";
// import ForestonScene from "./scenes/places/ForestonScene";
import PlayerHouseScene from "./scenes/places/PlayerHouseScene";


class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    
    // TODO:  Add Dialog plugin somewhere in here???
    //game scenes
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    // this.scene.add('Game', GameScene);
    this.scene.add('Foreston', ForestonScene);
    this.scene.add('PlayerHouse', PlayerHouseScene);
    // this.scene.add('Battle', BattleScene);
    // this.scene.add('UI', UIScene);
    // town
    // this.scene.add('Foreston', ForestonScene);
    this.scene.start('Boot');
  }
}

window.onload = function () {
  window.game = new Game(config);
}






