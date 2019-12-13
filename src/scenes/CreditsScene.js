import 'phaser';

export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    preload() {
        
    }
    

    create() {

        var width = this.cameras.main.width;
        var height = this.cameras.main.height; 

        // credits background music
        this.sound.play("credits_music", {
            loop: false,
            delay: 1
        }); 

        // parallax images
        this.bg_1 = this.add.tileSprite(0,0, game.width, game.height, 'demonwoods_bg');
        this.bg_1.setOrigin(0,0).setDepth(0);
        this.bg_1.setScrollFactor(0);
        this.bg_2 = this.add.tileSprite(0, 0, game.width, game.height, 'demonwoods_fartrees');
        this.bg_2.setOrigin(0,0).setDepth(0);
        this.bg_3 = this.add.tileSprite(0, 0, game.width, game.height, 'demonwoods_midtrees');
        this.bg_3.setOrigin(0,0).setDepth(0);
        this.bg_4 = this.add.tileSprite(0, 0, game.width, game.height, 'demonwoods_closetrees');
        this.bg_4.setOrigin(0,0).setDepth(0);
        
        // scrolling image
        this.credits_scroll = this.add.tileSprite(0, 0, game.width/0.5, game.height, 'credits_scroll');
        this.credits_scroll.setOrigin(0, 0).setDepth(1);

        // create hover sprite
        let hoverSprite = this.add.sprite(100, 100, 'bat', 0);
        hoverSprite.setVisible(false).setDepth(2);

        // hover sprite animation
        this.anims.create({
            key: 'fly',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames('bat', {start: 0, end: 3
            })
        });

        // back button
        var backButton = this.make.text({
            x: 50,
            y: 50,
            text: 'Back',
            style: {
                font: '30px monospace',
                fill: '#ff0000'
            }
        });
        backButton.setOrigin(0, 0).setDepth(2).setInteractive();
        backButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play('fly');
            hoverSprite.x = backButton.x + 35;
            hoverSprite.y = backButton.y - 20;
        });
        backButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        });
        backButton.on("pointerup", () => {
            this.sound.stopAll("credits_music");
            this.scene.start('Title');
        });
    }

    update() {
        //credits animation
        this.credits_scroll.tilePositionY += 0.3;

        // menu background animation
        this.bg_2.tilePositionX -= 0.1;
        this.bg_3.tilePositionX -= 0.2;
        this.bg_4.tilePositionX -= 0.3;     
    }    
};