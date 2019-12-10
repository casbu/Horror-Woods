// MUSIC
// SolarPhasing (itch.io)


// FOREST TILESET

// Copyright/Attribution Notice: 
// Stephen Challener (Redsrike) and the Open Surge team ( http://opensnc.sourceforge.net), hosted by OpenGameArt.org
// Forest Tileset (http://opengameart.org/content/32x32-and-16x16-rpg-tiles-forest-and-some-interior-tiles) 


// CAVE & DESERT TILESET
// Art by MrBeast. (http://opengameart.org)

// CITY & TOWNS TILESET
// Paul Barden and Damian Gasinski aka Gassasin (OpenGameArt.org)

// OTHER ASSETS
// Hyptosis and Zabin under CC by 3.0 (lorestrom.com)
// <a rel="license" href="http://creativecommons.org/licenses/by/3.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.

// Thatchet Roof & Cottage
// "LPC Thatched-roof Cottage" by bluecarrot16. License: CC-BY-SA 3.0 / GPL 3.0+ Based on: "LPC Base Assets" by Lanea Zimmerman (AKA Sharm) and Daniel Armstrong (AKA HughSpectrum). License: CC-BY-SA 3.0 / GPL 3.0+. http://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles "LPC art entry" by Casper Nilsson. License: CC-BY-SA 3.0 / GPL 3.0+. http://opengameart.org/content/lpc-cnilsson
// http://opengameart.org/content/lpc-windows-doors

// Farming Tilesets, Magic Animations, and UI elements
// Please attribute creator as Daniel Eddeland. Please include a link to opengameart.org as well (preferably to the submission for this art package) if you use the art.
//https://opengameart.org/content/lpc-farming-tilesets-magic-animations-and-ui-elements

// Dock Town
// Here is a pixel dock for your RPG game, this is still a wip so I might add or tweak a few things in the future, but feel free to edit it yourself if you wish, if you happen to use this please let me know.
// https://opengameart.org/content/rpg-dock-wip

// house inside2
//https://opengameart.org/content/lpc-house-insides
// Sharm did everything except the castle light sources, those were done by HughSpectrum. Please see the LPC guidelines for attribution and licensing: http://lpc.opengameart.org/

// Terrain
//  LPC-Terrain Attribution Text File (in folder)

// Enemy Sprites
// Mosquito, Armed Ghost, Evil Head, Evil Skull, & Goblin by Matthew Ashworth
// Cloaked Figure - This work should be attributed to Heather Lee Harvey, if possible I would also like a link to EmeraldActivities.com & http://opengameart.org/users/emerald

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
        
        // create hover sprite
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

        //credits text
        var createdByTxt = this.make.text({
            x: 275,
            y: 250,
            text: 'Created by Cas.Bu',
            style: {
                font: '25px monospace',
                fill: '#ffffff'
            }
        });
        createdByTxt.setOrigin(0, 0).setDepth(1);


        var musicByTxt = this.make.text({
            x: 225,
            y: 300,
            text: 'Music: Natural Snow Buildings',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        musicByTxt.setOrigin(0, 0).setDepth(1);

        var spritesByTxt = this.make.text({
            x: 75,
            y: 350,
            text: 'Sprites: Universal LPC Spritesheet Character Generator',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        spritesByTxt.setOrigin(0, 0).setDepth(1);

        var tilesetsByTxt = this.make.text({
            x: 100,
            y: 400,
            text: 'Assets used from OpenGameArt.org',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        tilesetsByTxt.setOrigin(0, 0).setDepth(1);

        var backButton = this.make.text({
            x: 360,
            y: 500,
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
            this.sound.stopAll("credits_music");
            this.scene.start('Title');
        })

        

        // credits background music
        this.sound.play("credits_music", {
            loop: false,
            delay: 1
        }); 

    }

    update() {
        // menu background animation
        this.bg_2.tilePositionX -= 0.1;
        this.bg_3.tilePositionX -= 0.2;
        this.bg_4.tilePositionX -= 0.3;

        // scrolling text animation
        
    }

    
};