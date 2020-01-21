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
        this.model = this.sys.game.globals.model;

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
        backButton.on("pointerdown", () => {
            this.scene.start('Title');
        })
        
        //music & sound buttons
        this.musicButton = this.add.image(300, 300, 'checked_box').setScale(0.5);
        this.musicText = this.add.bitmapText(350, 290, 'font_base_white', 'Music Enabled', 16);

        this.soundButton = this.add.image(300, 350, 'checked_box').setScale(0.5);
        this.soundText = this.add.bitmapText(350, 340, 'font_base_white', 'Sound Enabled', 16);

        this.musicButton.setInteractive();
        this.soundButton.setInteractive();

        this.musicButton.on('pointerdown', function () {
            this.model.musicOn = !this.model.musicOn;
            this.updateAudio();
          }.bind(this));
           
        this.soundButton.on('pointerdown', function () {
          this.model.soundOn = !this.model.soundOn;
          this.updateAudio();
        }.bind(this));
          
        this.updateAudio();
    }
    updateAudio() {
      if (this.model.musicOn === false) {
        this.musicButton.setTexture('box');
        this.sys.game.globals.bgMusic.stop();
        this.model.bgMusicPlaying = false;
      } else {
        this.musicButton.setTexture('checked_box');
        if (this.model.bgMusicPlaying === false) {
          this.sys.game.globals.bgMusic.play();
          this.model.bgMusicPlaying = true;
        }
      }
       
      if (this.model.soundOn === false) {
        this.soundButton.setTexture('box');
      } else {
        this.soundButton.setTexture('checked_box');
      }
    }
};