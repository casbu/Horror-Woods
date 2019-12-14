import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {

        //----- PROGRESS BAR -----
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 300, 320, 50);
        
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 25,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 80,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);
        
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 310, 300 * value, 30);
        });
        
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
            assetText.destroy();
            this.handler();
        }.bind(this));
        // ----- END PROGRESS BAR -----
        
        //LOAD ASSETS
        //placeholder
        this.load.image('placeholder', '/assets/logo.png');
        
        //audio
        this.load.audio('title_music', '/assets/sounds/Natural_Snow_Buildings_-_04_-_Youll_Become_What_You_Fear_the_Most.mp3');
        this.load.audio('credits_music', '/assets/sounds/Natural_Snow_Buildings_-_10_-_Sandman_Traps.mp3');

        //bitmap font
        //black
        this.load.bitmapFont('font_base', '/assets/fonts/Lunchtime-Doubly-So.png', '/assets/fonts/Lunchtime-Doubly-So.xml');
        this.load.bitmapFont('font_dialogue', '/assets/fonts/petit.png', '/assets/fonts/petit.xml');
        this.load.bitmapFont('font_handwritten', '/assets/fonts/wc-mano-negra-bta.png', '/assets/fonts/wc-mano-negra-bta.xml');
        //white
        this.load.bitmapFont('font_base_white', '/assets/fonts/white/Lunchtime-Doubly-So-white.png', '/assets/fonts/Lunchtime-Doubly-So.xml');
        this.load.bitmapFont('font_dialogue_white', '/assets/fonts/white/petit-white.png', '/assets/fonts/petit.xml');
        this.load.bitmapFont('font_handwritten_white', '/assets/fonts/white/wc-mano-negra-bta-white.png', '/assets/fonts/wc-mano-negra-bta.xml');

        //ui
        this.load.image('title_bg', '/assets/ui/title_bg.png');
        this.load.image('title', '/assets/ui/title0.png');
        this.load.image('options_bg', '/assets/ui/options_bg.png');
        this.load.image('play_button', '/assets/ui/play_button.png');
        this.load.image('options_button', '/assets/ui/options_button.png');
        this.load.image('credits_button', '/assets/ui/credits_button.png');
        this.load.image('credits_overlay', '/assets/ui/credits_overlay.png');
        
        // parallax
        this.load.image('demonwoods_bg', '/assets/parallax/parallax-demon-woods-bg.png');
        this.load.image('demonwoods_fartrees', '/assets/parallax/parallax-demon-woods-far-trees.png');
        this.load.image('demonwoods_midtrees', '/assets/parallax/parallax-demon-woods-mid-trees.png');
        this.load.image('demonwoods_closetrees', '/assets/parallax/parallax-demon-woods-close-trees.png');

        //tilemap
        this.load.image('tiles', '/assets/tiles/main_tiles.png');
        this.load.tilemapTiledJSON('forest_home', '/assets/map/forest.json');

        //sprites
        this.load.spritesheet('player', '/assets/sprites/Fin.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('neighbor', '/assets/sprites/dexter.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('friend', '/assets/sprites/violet.png', {frameWidth: 64, frameHeight: 64});

        //enemies
        this.load.spritesheet('bat', '/assets/sprites/enemies/bat.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('mosquito', '/assets/sprites/enemies/Mosquito/$Mosquito.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('snake', '/assets/sprites/enemies/snake.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('cloakedfigure', '/assets/sprites/enemies/CloakedFigure.png', {frameWidth: 96, frameHeight: 94});
    }

    create () {
        this.events.on('startMenu', this.handler, this);
        this.events.emit('startMenu');
    }
    
    handler(){
        this.scene.launch('Title');
    }
};