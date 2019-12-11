import 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    
    
    //! ------------------------
    //! ----- CREATE -----
    //! ------------------------
    create() {
        //TODO load music based on registry value, loop, and play

        //create map
        this.createMap();

        //create animations
        this.createAnimations();

        //create player
        this.createPlayer();

        // create neighbor
        this.createNeighbor();

        //update camera
        this.updateCamera();

        //user input
        this.cursors = this.input.keyboard.createCursorKeys();

        //create enemies
        this.createEnemies();

        // this.events.on('wake', this.wake, this);

        //! DEBUG
        // this.debugCollisions();        
    }
    //! ------------------------
    //! ----- UPDATE -----
    //! ------------------------
    update(time, delta) {
        // //enemies accelerate to player
        // for(var i = 0; i < this.spawns.getChildren().length; i++){
        //     this.physics.accelerateTo(this.spawns.getChildren()[i], this.player);
        // }
        // player movement
        this.player.body.setVelocity(0);
            // horizontal movement
            if (this.cursors.left.isDown){
                this.player.body.setVelocityX(-80);
            } else if (this.cursors.right.isDown){
                this.player.body.setVelocityX(80);
            }
            // vertical movement
            if (this.cursors.up.isDown){
                this.player.body.setVelocityY(-80);
            } else if (this.cursors.down.isDown){
                this.player.body.setVelocityY(80);
            }

        // player animation
        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }

        // play neighbor animation
        this.neighbor.anims.play('pace', true);

        //play enemies animations
        // issues - find fix
        //TODO this.spawns.getChildren().callAll(Phaser.Sprite.play, null, ['fly', 'slither', 'float']);
        
    }

    //! ------------------------
    //! ----- FUNCTIONS -----
    //! ------------------------
    
    createMap(){
        // load tilemap
        this.map = this.make.tilemap({ key: 'forest_home' });
        // load tilemap images
        this.tiles = this.map.addTilesetImage('tiles');
        // Tiled Layers & worldLayer collision
        this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0);
        this.terrainLayer = this.map.createStaticLayer('Terrain', this.tiles, 0, 0);
        this.belowLayer = this.map.createStaticLayer('Below Player', this.tiles, 0, 0);
        this.worldLayer = this.map.createStaticLayer('World', this.tiles, 0, 0);
        this.worldLayer.setCollisionByProperty({ collides: true });
        this.aboveLayer = this.map.createStaticLayer('Above Player', this.tiles, 0, 0);
        this.objectLayer = this.map.createStaticLayer('Objects', this.tiles, 0, 0);
        // world physics
        this.physics.world.bounds.width = this.map.widthInPixels;
        this.physics.world.bounds.height = this.map.heightInPixels;
    }

    createAnimations(){
        // player animation
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [9,10,11,12,13,14,15,16,17]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [27,28,29,30,31,32,33,34,35]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [0,1,2,3,4,5,6,7,8]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [18,19,20,21,22,23,24,25,26]}),
            frameRate: 10,
            repeat: -1
        });

        //neighbor animation
        this.anims.create({
            key: 'pace',
            frames: this.anims.generateFrameNumbers('neighbor', { frames: [9,18,27]}),
            frameRate: 0.5,
            delay: 5000,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('neighbor', { frames: [9,10,11,12,13,14,15,16,17]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('neighbor', { frames: [27,28,29,30,31,32,33,34,35]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('neighbor', { frames: [0,1,2,3,4,5,6,7,8]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('neighbor', { frames: [18,19,20,21,22,23,24,25,26]}),
            frameRate: 10,
            repeat: -1
        });

        // enemy animations
        //--mosquito
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('mosquito', { frames: [0,1,2]}),
            frameRate: 10,
            repeat: -1
        });
        
        //--bat - already created in preload scene

        //--snake
        this.anims.create({
            key: 'slither',
            frames: this.anims.generateFrameNumbers('snake', { frames: [6,7,8]}),
            frameRate: 10,
            repeat: -1
        });

        //--cloaked figure
        this.anims.create({
            key: 'float',
            frames: this.anims.generateFrameNumbers('cloakedfigure', { frames: [0,1,2,3]}),
            frameRate: 10,
            repeat: -1
        });
        
    }

    createPlayer(){
        this.player = this.physics.add.sprite(400, 300, 'player', 18);
        this.player.setCollideWorldBounds(true);
        this.player.onWorldBounds = true;

        //player collisions
        this.physics.add.collider(this.player, this.worldLayer);
        
    }

    createNeighbor(){
        const spawnPointNeighbor = this.map.findObject('Objects', obj => obj.name === "Neighbor Spawn Point");
        this.neighbor = this.physics.add.sprite(spawnPointNeighbor.x, spawnPointNeighbor.y, 'neighbor', 18).setImmovable(true);

        //neighbor collision
        this.physics.add.collider(this.player, this.neighbor);
    }

    updateCamera(){
        // camera follows player
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        // prevent tiles from bleeding
        this.cameras.main.roundPixels = true;
    }


    createEnemies(){
        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Sprite });
        for(var i = 0; i < 5; i++) {
            const location = this.getValidLocation();
            var enemy = this.spawns.create(location.x, location.y, this.getEnemySprite());
            enemy.body.setCollideWorldBounds(true);
            enemy.body.setImmovable();
        }
        this.physics.add.collider(this.spawns, this.worldLayer);
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

        // move enemies
        this.timedEvent = this.time.addEvent({
            delay: 3000,
            callback: this.moveEnemies,
            callbackScope: this,
            loop: true
        });
    }

    moveEnemies(){
        this.spawns.getChildren().forEach((enemy) => {
            const randNumber = Math.floor((Math.random() * 4) + 1);

            switch(randNumber){
                case 1:
                    enemy.body.setVelocityX(50);
                    break;
                case 2:
                    enemy.body.setVelocityX(-50);
                    break;
                case 3:
                    enemy.body.setVelocityY(50);
                    break;
                case 4:
                    enemy.body.setVelocityY(50);
                    break;
                default:
                    enemy.body.setVelocityX(50);
                    break;
            }
        });

        setTimeout(() => {
            this.spawns.setVelocityX(0);
            this.spawns.setVelocityY(0);
        }, 500);
    }

    getEnemySprite(){
        var sprites = ['mosquito', 'snake', 'bat', 'cloakedfigure'];
        return sprites[Math.floor(Math.random() * sprites.length)];
    }

    getValidLocation() {
        var validLocation = false;
        var x, y;
        while (!validLocation) {
          x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
          y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
       
          var occupied = false;
          this.spawns.getChildren().forEach((child) => {
            if (child.getBounds().contains(x, y)) {
              occupied = true;
            }
          });
          if (!occupied) validLocation = true;
        }
        return { x, y };
      }

      onMeetEnemy(player, sprite){
          //move sprite to another location
          sprite.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
          sprite.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

          //shake world
          this.cameras.main.shake(300);

          //start battle
          //TODO: this.scene.switch('Battle');
      }
      

    //! DEBUG GRAPHICS
    debugCollisions(){
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.worldLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }

};
