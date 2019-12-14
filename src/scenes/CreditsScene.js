import 'phaser';

export default class CreditsScene extends Phaser.Scene {  
    constructor() {
        super('Credits');
    }
    create() {
        //background music
        var credit_music = this.sound.play("credits_music", {
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

        //credits text
        var content = [
            // "",
            // "",
            // "",
            // "",
            "CREATED BY: Cas.Bu",
            "",


            "MUSIC & SOUNDS:",
            "Intro - Natural Snow Buildings",
            "Cutscenes - SolarPhasing (itch.io)",
            "Emergency Broadcast Alert - Jamie Clarko",
            "",


            "SPRITES:",
            "Main Characters - Universal LPC Spritesheet Character Generator",
            "Mosquito, Armed Ghost, Evil Head, Evil Skull, & Goblin - Matthew Ashworth",
            "",


            "ART:",
            "Custom Art by Cas.Bu",

            "Forest Tiles - ",
            "Stephen Challener - Redstrike",
            "(http://opensnc.sourceforge.net)",
            "Hyptosis",
            "(http://opengameart.org/content/32x32-and-16x16-rpg-tiles-forest-and-some-interior-tiles)",
            "Zabin",
            "(lorestrom.com)",

            "Cave and Desert Tiles - ",
            "Manuel Riecke aka Mr.Beast (OpenGameArt)",
            "bluecarrot16",
            "(http://opengameart.org/content/lpc-windows-doors)",
            "Lanea Zimmerman aka Sharm",
            "Daniel Armstrong aka HughSpectrum",
            "(http://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles)",
            "(https//opengameart.org/content/lpc-house-insides)",
            "and Casper Nilsson",
            "(http://opengameart.org/content/lpc-cnilsson)",
            "",

            "Farming Tilesets, Magic Animations and UI Elements - ",
            "Daniel Eddeland",
            "(https://opengameart.org/content/lpc-farming-tilesets-magic-animations-and-ui-elements)",
            "",

            "Road Tiles - ",
            "David Stenfors",
            "(davidstenfors.com)",
            "",

            "Dock Town - ",
            "Healy",
            "(https://opengameart.org/content-rpg-dock-wip)",
            "",

            "LPC Assets - ",
            "Matthew Nash - Road",
            "Nushio - Snow & Ice Recolor",
            "William Thompson - Sand & Dirt Recolor",
            "Adrix89 - Nushio Snow Recolor",
            "Casper Nillson",
            "Daniel Eddeland - Plants, Props, Food & Environments",
            "John Charlot - Shoot Em Up Graphic Kit",
            "Skyler Robert Colladay",
            "Lanea Zimmerman AKA Sharm",
            "Stephen Challener AKA Redstrike",
            "Charles Sanchez AKA CharlesGabriel",
            "Manuel Riecke AKA Mr.Beast",
            "Daniel Armstrong AKA HughSpectrum",
            "",

            "CUSTOM FONTS:",
            "by Cas.Bu using Pixel Create Tool (pixelart.com)",
            "",

            "BITMAP FONTS:",
            "Lunchtime-Doubly-So by codeman38",
            "Petit by Clops",
            "WC Mano Negra Bta by WC Fonts / Atypeek"
        ];

        this.scroller = this.add.dynamicBitmapText(400, 600, 'font_base_white', content, 16);
        this.scroller.setDepth(1).setCenterAlign().setOrigin(0.5, 0);
        

        //gradient overlay
        this.credits_overlay = this.add.image(0, 0, 'credits_overlay');
        this.credits_overlay.setOrigin(0,0).setDepth(2);
        

        // create hover sprite
        let hoverSprite = this.add.sprite(100, 100, 'bat', 0);
        hoverSprite.setVisible(false).setDepth(3);

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
            x: 347,
            y: 550,
            text: 'Back',
            style: {
                font: '30px monospace',
                fill: '#ff0000'
            }
        });
        backButton.setOrigin(0, 0).setDepth(3).setInteractive();
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

    update(time, delta) {
        //credits animation
        this.scroller.scrollY += 0.03 * delta;
        if (this.scroller.scrollY > 2000){
            this.scroller.destroy();
            this.cameras.main.fadeOut(3000);
            this.sound.stopAll("credits_music");
            this.scene.start('Title');
        }

        //menu background animation
        this.bg_2.tilePositionX -= 0.1;
        this.bg_3.tilePositionX -= 0.2;
        this.bg_4.tilePositionX -= 0.3;     
    }    
};