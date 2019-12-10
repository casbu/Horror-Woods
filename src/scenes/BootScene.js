import 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('logo', 'assets/logo/casbulogo.png');
    }

    create() {
        this.add.image(400, 300, 'logo');
        //casbu logo tween
        this.tweens.add({
            targets: 'logo',
            x: 100,
            ease: 'Sine.easeInOut',
            repeat: 1,
            duration: 3000,
            onComplete: this.onCompleteHandler.bind(this)
        });
        //camera fade
        this.cameras.main.once('camerafadeincomplete', function (camera) {
            camera.fadeOut(3000);
        });
        this.cameras.main.fadeIn(3000);
    }

    onCompleteHandler(){
        this.scene.start('Preloader');
    }
};
