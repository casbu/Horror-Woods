import 'phaser';
import Player from "../sprites/Player";
import Neighbor from "../sprites/Neighbor";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super('Game');
    }
    
    
    //! ------------------------
    //! ----- CREATE -----
    //! ------------------------
    create() {
        //TODO load music based on registry value, loop, and play

        //-- CREATE MAP --
        // tilemap & tileset
        this.map = this.make.tilemap({ key: 'foreston' });
        this.tiles = this.map.addTilesetImage('tiles');

        // layers
        this.backgroundLayer = this.map.createDynamicLayer('Background', this.tiles, 0, 0);
        this.terrainLayer = this.map.createDynamicLayer('Terrain', this.tiles, 0, 0);
        this.belowLayer = this.map.createDynamicLayer('Below Player', this.tiles, 0, 0);
        this.worldLayer = this.map.createDynamicLayer('World', this.tiles, 0, 0);
        this.doorsLayer = this.map.createDynamicLayer('Doors', this.tiles, 0, 0);
        this.roomItemsLayer = this.map.createDynamicLayer('Room Items', this.tiles, 0, 0);
        this.computerLayer = this.map.createDynamicLayer('ComputerBlinking', this.tiles, 0, 0);
        this.plateauLayer = this.map.createDynamicLayer('Plateau', this.tiles, 0, 0);
        this.roadblockLayer = this.map.createDynamicLayer('ROADBLOCK', this.tiles, 0, 0);
        this.laddersLayer = this.map.createDynamicLayer('Ladders', this.tiles, 0, 0);
        this.signsDecorLayer = this.map.createDynamicLayer('SignDeco', this.tiles, 0, 0);
        this.aboveLayer = this.map.createDynamicLayer('Above Player', this.tiles, 0, 0);

        // world physics
        this.physics.world.bounds.width = this.map.widthInPixels;
        this.physics.world.bounds.height = this.map.heightInPixels;

        // collisions based on layers
        this.worldLayer.setCollisionByProperty({ collides: true });
        
        // set above layer higher than everything else on map
        this.aboveLayer.setDepth(20);


        //-- LOOP THROUGH OBJECTS --
        this.map.findObject('Objects', function(object) {
            //spawn points
            if (object.type === "Spawn") {
                if (object.name === "Player") {
                    this.player = new Player({
                        scene: this,
                        x: object.x,
                        y: object.y
                    });
                }
                
                if (object.name === "Neighbor"){
                    this.neighbor = new Neighbor({
                        scene: this,
                        x: object.x,
                        y: object.y
                    }); 
                                   
                }

                //TODO create Friend.js
            }

            if (object.type === "Door"){
                if (object.name === "Player House"){
                    this.scene.launch('PlayerHouse');
                }
            }

            //garbage
                //garbage closed
                //garbage open
            //chests
                //chest closed
                //chest open
            //items
                //candy
                // add more items
        }, this);

        // add collisions
        this.physics.add.collider(this.player, this.worldLayer);
        this.physics.add.collider(this.player, this.neighbor);
        

        // -- CAMERA SETTINGS & BOUNDS --
        //camera bounds
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        //follow player
        this.cameras.main.startFollow(this.player);
        //TODO FIX THIS: prevent tiles from bleeding
        this.cameras.main.roundPixels = true;
        //fade in
        this.cameras.main.fadeIn(2000, 0, 0, 0);
        
        //! CREATE DEBUG
        //this.debugCollisions();        
    }

    //! ------------------------
    //! ----- UPDATE -----
    //! ------------------------
    update(time, delta) {

        
    }

    //! ------------------------
    //! ----- FUNCTIONS -----
    //! ------------------------
    

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

// export class PlayerHouseScene extends GameScene {
//     constructor() {
//         super('PlayerHouse');
//     }

//     create () {
//         //map of player house
//         this.map = this.make.tilemap({ key: 'foreston' });
//         //tiles used in map
//         this.tiles = this.map.addTilesetImage('tiles');

//         //map layers
//         this.backgroundLayer = this.map.createDynamicLayer('Background', this.tiles, 0, 0);
//         this.terrainLayer = this.map.createDynamicLayer('Terrain', this.tiles, 0, 0);
//         this.belowLayer = this.map.createDynamicLayer('Below Player', this.tiles, 0, 0);
//         this.worldLayer = this.map.createDynamicLayer('World', this.tiles, 0, 0);
//         this.roomItemsLayer = this.map.createDynamicLayer('Room Items', this.tiles, 0, 0);
//         this.computerLayer = this.map.createDynamicLayer('ComputerBlinking', this.tiles, 0, 0);

//         // set physics boundaries from map width and height
//         this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

//         //collision based on layer
//         this.worldLayer.setCollisionByProperty({collides: true});


//         //set up things in this level
//         this.rooms = [];

//         this.map.findObject('Objects', function(object) {
//             //rooms
//             if (object.type === "Room"){
//                     this.rooms.push(object);
//                 }
            

//             //spawn points
//             if (object.type === "Spawn") {
//                 if (object.name === "Player") {
//                     this.player = new Player({
//                         scene: this,
//                         x: object.x,
//                         y: object.y
//                     });
//                 }
//             }
            
//             //items
//         }, this);

//         //add collisions
//         this.physics.add.collider (this.player, this.wallsLayer);
//         // this.physics.add.overlap(this.player, this.computer, function() {
//         //     this.player.onComputer = true;
//         // }, null, this);

//         // -- CAMERA SETTINGS & BOUNDS --
//         //start camera
//         this.cameras.main.setZoom(2.0);
//         // set room boundaries
//         this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
//             this.rooms[this.player.currentRoom].y,
//             this.rooms[this.player.currentRoom].width,
//             this.rooms[this.player.currentRoom].height,
//             true);
        
//         //follow player
//         this.cameras.main.startFollow(this.player);

//         //TODO FIX THIS: prevent tiles from bleeding
//         this.cameras.main.roundPixels = true;
        
//         //camera fade
//         this.cameras.main.fadeIn(2000, 0, 0, 0);


//     }

//     update(time, delta){
//     //     this.cameras.main._ch = this.map.heightInPixels;
//     //     this.cameras.main._cw = this.map.widthInPixels;

//     //     // on player room change, stop player movement, fade camera, and set boundaries
//     //     if(this.player.roomChange){
//     //         this.cameras.main.fadeOut(250, 0, 0, 0, function(camera, progress){
//     //             this.player.canMove = false;
//     //             if (progress === 1) {
//     //                 //change camera boundaries when fade out complete
//     //                 this.cameras.main.setBounds(this.rooms[this.player.currentRoom].x,
//     //                                             this.rooms[this.player.currentRoom].y,
//     //                                             this.rooms[this.player.currentRoom].width,
//     //                                             this.rooms[this.player.currentRoom].height, true);
//     //                 //fade back in with new boundaries
//     //                 this.cameras.main.fadeIn(500, 0, 0, 0, function(camera, progress) {
//     //                     if (progress === 1) {
//     //                         this.player.canMove = true;
//     //                         // this.roomStart(this.player.currentRoom);
//     //                     }
//     //                 }, this);
//     //             }
//     //         }, this);
//     //     }
//     }
// }