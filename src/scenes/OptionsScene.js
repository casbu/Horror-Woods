import 'phaser';

export default class OptionsScene extends Phaser.Scene {
    constructor() {
        super('Options');
    }

    preload() {
        
    }

    create () {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        // background
        this.add.image(0, 0, 'options_bg').setOrigin(0);

        // hover sprite
        let hoverSprite = this.add.sprite(100,100,"cursor_bat", 0);
        hoverSprite.setVisible(false);

        // hover sprite animation
        this.anims.create({
            key: 'fly',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames("cursor_bat", {start: 0, end: 3
            })
        })

        //back button
        var backButton = this.make.text({
            x: 360,
            y: 100,
            text: 'Back',
            style: {
                font: '30px monospace',
                fill: '#ff0000'
            }
        });
        backButton.setOrigin(0, 0).setDepth(1).setInteractive();
        backButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play('fly');
            hoverSprite.x = backButton.x + 35;
            hoverSprite.y = backButton.y - 20;
        })
        backButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })
        backButton.on("pointerup", () => {
            this.scene.sleep('Options');
            this.scene.wake('Title');
        })
        
    }


};