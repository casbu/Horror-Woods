import 'phaser';

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super("Title");
    }

    
    //! ------------------------
    //! ----- START CREATE -----
    //! ------------------------
    create() {

        var width = this.cameras.main.width;
        var height = this.cameras.main.height; 

        // create images z order
        this.gameTitle = this.add.image(width / 2 - 50, height / 2, "title").setDepth(1);
        this.titlebg = this.add.tileSprite(0,0,width, height, "title_bg");
        this.titlebg.setOrigin(0,0);
        let playButton = this.add.image(width / 2 - 150, height / 2 + 150, "play_button").setDepth(1);
        let optionsButton = this.add.image(width / 2, height / 2 + 150, "options_button").setDepth(1);
        let creditsButton = this.add.image(width / 2 + 150, height / 2 + 150, "credits_button").setDepth(1);


        // create sprites
        let hoverSprite = this.add.sprite(100,100,"bat", 0);
        hoverSprite.setVisible(false).setDepth(2);

        // create audio, display pauseonblur

        this.sound.play("title_music", {
            loop: true
        });

        // create animation
        this.anims.create({
            key: 'fly',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNames("bat", {start: 0, end: 3
            })
        })

        //make image buttons interactive
        playButton.setInteractive();
        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play('fly');
            hoverSprite.x = playButton.x - 6;
            hoverSprite.y = playButton.y - 30;
        })
        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })
        playButton.on("pointerup", () => {
            this.sound.stopAll("title_music");
            //this.scene.launch('HUD); //launch HUD
            this.scene.start('Game');
        })

        optionsButton.setInteractive();
        optionsButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play('fly');
            hoverSprite.x = optionsButton.x - 6;
            hoverSprite.y = optionsButton.y - 30;
        })
        optionsButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })
        optionsButton.on("pointerup", () => {
            this.scene.sleep('Title');
            this.scene.launch('Options');
        })

        creditsButton.setInteractive();
        creditsButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play('fly');
            hoverSprite.x = creditsButton.x - 6;
            hoverSprite.y = creditsButton.y - 30;
        })
        creditsButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })
        creditsButton.on("pointerup", () => {
            this.sound.stopAll("title_music");
            this.scene.start('Credits');
        })


        // setting new camera for non pixelArt
        this.extracam = this.cameras.add();
        this.extracam.ignore(this.titlebg);

        
        
    }

    //! ------------------------
    //! ----- END CREATE -----
    //! ------------------------



    //! ------------------------
    //! ----- START UPDATE -----
    //! ------------------------
    update() {
        // menu background animation
        this.titlebg.tilePositionX -= 0.1;
    }
    //! ------------------------
    //! ----- END UPDATE -----
    //! ------------------------


    // initRegistry() {
    //     // registry to set and get data 
    //     // this stores our key that tells which map to load
    //     this.registry.set('newGame', true);
    //     this.registry.set('health_max', 5);
    //     this.registry.set('health_current', 5);
    //     this.registry.set('fear_max', 20);
    //     this.registry.set('fear_current', 0);
    //     this.registry.set('pill_max', 20);
    //     this.registry.set('pill_current', 0);
    //     this.registry.set('load', 'ForestTown');
    //     this.registry.set('spawn', 'spawnCenter');
    // }
};