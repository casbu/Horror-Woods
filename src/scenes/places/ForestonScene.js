import GameScene from '../GameScene';

// Foreston Level Scene

export default class ForestonScene extends GameScene {

    constructor() {
        super('Foreston');

        this.portals.PlayerHouse = "PlayerHouse";

    }

    init(data){
        this.spawnPoint = {
            x: 3353,
            y: 1641
        }
        if(data.hasOwnProperty('origin')){
            if(data.origin === "PlayerHouse") this.spawnPoint = {
                x: 3303,
                y: 1502
            }
        }   
    }

    preload(){
        super.preload();
    }

    //! ------------------------
    //! ----- CREATE -----
    //! ------------------------
    
    create() {

        console.info('Foreston scene started.')

        //TODO load music based on registry value, loop, and play

        //-- CREATE MAP --
        // tilemap & tileset
        super.create({
                tileKey: 'tiles', // tile image key
                mapKey: 'foreston', //tilemapTiledJSON key
                tiledKey: 'tiles' //name of tiles in Tiled
        });

        //-- LOOP THROUGH OBJECTS --
        map.findObject('Objects', function(object) {
            // spawn points
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

            } // end spawn points
            
        }, this);
        // //-- LOOP THROUGH OBJECTS --
        // map.findObject('Objects', function(object) {
        
        //      // doors
        //     if (object.type === "Door"){
        //         this.portals.add(new Phaser.GameObjects.Sprite(this,object.x,object.y));
                
        //         if (object.name === "Player House Entrance"){
        //             this.physics.add.overlap(this.player, this.portals, this.enterPlayerHouse, false, this);
        //         }
        //     }

                        
        //      //script for dialog creation
        //     // if (object.name === "Script"){
        //     //     let tmp = this.add.rectangle((object.x+(object.width/2)), (object.y+(object.height/2)), object.width, object.height);
		// 	// 		tmp.properties = object.properties.reduce(
		// 	// 			(obj, item) => Object.assign(obj, { [item.name]: item.value }), {}
		// 	// 		);
        //     //         this.physics.world.enable(tmp, 1);
		// 	// 		this.physics.add.collider(this.player, tmp, this.HitScript, null, this);
        //     // }


        //     // garbage
        //     //     garbage closed
        //     //     garbage open
        //     // chests
        //     //     chest closed
        //     //     chest open
        //     // items
        //     //     candy
        //     //     add more items
            
        // }, this);

        // add collision with room objects and computer
        this.physics.add.collider(this.player, this.computer);

         // DIALOG
        // this.Dialog.setText('Hello World!');
    } // end create

    //! ------------------------
    //! ----- UPDATE -----
    //! ------------------------
    update(time, delta) {
        
    }

    //! ------------------------
    //! ----- FUNCTIONS -----
    //! ------------------------
    
    enterPlayerHouse(player){
        this.player.onDoor = true;
        this.scene.start('PlayerHouse');
	}
    
};