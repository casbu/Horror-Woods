export default {
  type: Phaser.AUTO,
  parent: "horror-woods",
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "horror-woods"
  }
//   plugins: {
//     scene: [
//       { key: 'Dialog', plugin: Dialog, mapping: 'Dialog' }
//     ]
//   }
};