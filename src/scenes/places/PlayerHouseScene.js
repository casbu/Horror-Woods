import GameScene from '../GameScene';
// import 'phaser';
// import Player from '../sprites/Player';

export default class PlayerHouseScene extends GameScene {
    constructor() {
        super('PlayerHouse');

        this.portals.ascend = 'Foreston';
        //this.portals.descend = 'PlayerHouse2';
    }

    // TODO: finish player house in Tiled 
    preload(){
        this.load.image('PlayerHouse', 'assets/map/')
    }

    create () {
        //-- CREATE MAP --
        // tilemap & tileset
        super.create({
            tileKey: 'tiles', // tile image key
            mapKey: 'PlayerHouse', //tilemapTiledJSON key
            tiledKey: 'tiles' //name of tiles in Tiled
    });

        console.info('PlayerHouse scene started.')
        

        //set up things in this level
        this.rooms = [];

        this.map.findObject('Objects', function(object) {
            //rooms
            if (object.type === "Room"){
                this.rooms.push(object);
            }
            
            //spawn point
            if (object.type === "Spawn") {
                if (object.name === "Player House") {
                    this.player = new Player({
                        scene: this,
                        x: object.x,
                        y: object.y
                    });
                }
            }

             // doors
             if (object.type === "Door"){
                this.portals.add(new Phaser.GameObjects.Sprite(this,object.x,object.y));
                if (object.name === "Player House Exit"){
                    this.physics.add.overlap(this.player, this.portals, this.exitPlayerHouse, false, this);
                }
            }
            
            
            //items
        }, this);

        //add collisions
        this.physics.add.collider (this.player, this.wallsLayer);
        this.physics.add.collider(this.player, this.computer);
        this.physics.add.overlap(this.player, this.computer, function() {
            this.player.onComputer = true;
        }, null, this);

        // -- CAMERA SETTINGS & BOUNDS --
        //start camera
        this.cameras.main.setZoom(2.0);
        // set room boundaries
        this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
            this.rooms[this.player.currentRoom].y,
            this.rooms[this.player.currentRoom].width,
            this.rooms[this.player.currentRoom].height,
            true);

        //follow player
        this.cameras.main.startFollow(this.player);

         // set physics boundaries from map width and height
         this.physics.world.setBounds(3223, 1319, this.map.widthInPixels, this.map.heightInPixels);


         // //TODO FIX THIS: prevent tiles from bleeding
         this.cameras.main.roundPixels = true;
         
         //camera fade
         this.cameras.main.fadeIn(2000, 0, 0, 0);

    } // end create function

    update(time, delta){

        super.update();

        // this.cameras.main._ch = this.map.heightInPixels;
        // this.cameras.main._cw = this.map.widthInPixels;

        // // on player room change, stop player movement, fade camera, and set boundaries
        // if(this.player.roomChange){
        //     this.cameras.main.fadeOut(250, 0, 0, 0, function(camera, progress){
        //         this.player.canMove = false;
        //         if (progress === 1) {
        //             //change camera boundaries when fade out complete
        //             this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
        //                                         this.rooms[this.player.currentRoom].y,
        //                                         this.rooms[this.player.currentRoom].width,
        //                                         this.rooms[this.player.currentRoom].height, true);
        //             //fade back in with new boundaries
        //             this.cameras.main.fadeIn(500, 0, 0, 0, function(camera, progress) {
        //                 if (progress === 1) {
        //                     this.player.canMove = true;
        //                     // this.roomStart(this.player.currentRoom);
        //                 }
        //             }, this);
        //         }
        //     }, this);
        // }

        // add computer updates  here
        // if(super.update()){
        //     this.computer.update();
        // } else {
        //     this.computer.ComputerError();
        // }
        
    } // end update function

    //! ------------------------
    //! ----- FUNCTIONS -----
    //! ------------------------

    roomStart(roomNumber) {
        if (roomNumber == 1) {
            this.cameras.main.shake(2500, 0.001, true);
        }
    }

    exitPlayerHouse() {
        this.player.onDoor = true;
        this.scene.start('Game');
    }
}