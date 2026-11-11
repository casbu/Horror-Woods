import 'phaser';
import Player from "../sprites/Player";
import Neighbor from "../sprites/Neighbor";

export default class GameScene extends Phaser.Scene {

    constructor(sceneName) {
        super({key: sceneName});

        
    }

    init(data){}

    // preload() {
        //TODO load scriptdata
        // TODO load health meter images
        // TODO preload animsManager -- still need to create
    // }
    
    //! ------------------------
    //! ----- CREATE -----
    //! ------------------------
    create(settings) {

        // TODO load music based on registry value, loop, and play

        //-- CREATE MAP --
        // tilemap & tileset
        const map = this.make.tilemap({ key: settings.mapKey });
        const tiles = map.addTilesetImage(settings.tiledKey, settings.tileKey);

        // layers
        const backgroundLayer = map.createDynamicLayer('Background', tiles, 0, 0);
        const terrainLayer = map.createDynamicLayer('Terrain', tiles, 0, 0);
        const belowLayer = map.createDynamicLayer('Below Player', tiles, 0, 0);
        const worldLayer = map.createDynamicLayer('World', tiles, 0, 0);
        const doorsLayer = map.createDynamicLayer('Doors', tiles, 0, 0);
        const roomItemsLayer = map.createDynamicLayer('Room Items', tiles, 0, 0);
        const computerLayer = map.createDynamicLayer('ComputerBlinking', tiles, 0, 0);
        const roadblockLayer = map.createDynamicLayer('ROADBLOCK', tiles, 0, 0);
        const laddersLayer = map.createDynamicLayer('Ladders', tiles, 0, 0);
        const signsDecorLayer = map.createDynamicLayer('SignDeco', tiles, 0, 0);
        let aboveLayer = map.createDynamicLayer('Above Player', tiles, 0, 0);

        // world physics
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;

        // collisions based on layers
        worldLayer.setCollisionByProperty({ collides: true });
        // set above layer higher than everything else on map
        aboveLayer.setDepth(20);

        this.rooms = [];
        this.portals = this.physics.add.group();
        
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

            
             //script for dialog creation
            // if (object.name === "Script"){
            //     let tmp = this.add.rectangle((object.x+(object.width/2)), (object.y+(object.height/2)), object.width, object.height);
			// 		tmp.properties = object.properties.reduce(
			// 			(obj, item) => Object.assign(obj, { [item.name]: item.value }), {}
			// 		);
            //         this.physics.world.enable(tmp, 1);
			// 		this.physics.add.collider(this.player, tmp, this.HitScript, null, this);
            // }


            // garbage
            //     garbage closed
            //     garbage open
            // chests
            //     chest closed
            //     chest open
            // items
            //     candy
            //     add more items
            
        }, this);

        // add collisions
        this.physics.add.collider(this.player, worldLayer);
        // this.physics.add.collider(this.player, worldLayer, this.HitDoorLayer.bind(this));
        this.physics.add.collider(this.player, this.neighbor);
        this.physics.add.overlap(this.player, this.portals, this.enterDoor, null, this);

        // -- CAMERA SETTINGS & BOUNDS --
        //camera bounds
        this.cameras.main.setBounds(0, 0, 3200, map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        //TODO FIX THIS: prevent tiles from bleeding
        this.cameras.main.roundPixels = true;
        //fade in
        this.cameras.main.fadeIn(2000, 0, 0, 0);
        
        // DIALOG
        // this.Dialog.setText('Hello World!');

        //! CREATE DEBUG
        //this.debugCollisions(); 

    } // end create

    //! ------------------------
    //! ----- UPDATE -----
    //! ------------------------
    update(time, delta) {
        // Close the dialog on spacebar press
		// if( this.Dialog.visible ){
		// 	if( this.cursors.space.isDown ){
		// 		this.Dialog.display(false);
		// 	}
		// 	return false;
		// }        
        this.player.update();

        // this.cameras.main._ch = this.map.heightInPixels;
        // this.cameras.main._cw = this.map.widthInPixels;

        
    }

    //! ------------------------
    //! ----- FUNCTIONS -----
    //! ------------------------
    

    //! DEBUG GRAPHICS
    debugCollisions(){
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    }

    enterPlayerHouse(player){
        this.player.onDoor = true;
        // this.scene.start('PlayerHouse');
	}

    /**  
	 * Handle collisions with the script layer. Tiles which have a dialog response are given
	 * a 'name' property with a value that corresponds to a key in the script object found
	 * in script.js
	 */
    // HitScript(player, target){
	// 	if(target.properties.name && !this.forestonDialog.visible){
	// 		player.anims.stopAfterRepeat(1);
	// 		this.Dialog.setText(this.script[player.name][target.properties.name]);
	// 	}
	// }

    
}