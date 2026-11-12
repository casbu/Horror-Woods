import Phaser from "phaser";
import Entity from "../sprites/Entity"

export default class Player extends Entity {

    constructor(config) {
        super(config);
        this.setTexture('player', 0);
        this.body.setVelocity(0, 0).setBounce(0.2).setCollideWorldBounds(true).setSize(31,45).setOffset(15,17);
        this.body.onWorldBounds = true;

        this.currentRoom = 1;       //sets start of room so room change flag doesn't fire
        this.previousRoom = null;
        this.roomChange = false;
        this.canMove = true;
        this.onDoor = false;
        
        const animFrameRate = 15
        const anims = config.scene.anims

        //--player animation
        anims.create({
            key: 'walk-up',
            frames: anims.generateFrameNumbers('player', { start: 0, end: 8 }),
            frameRate: animFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'walk-left',
            frames: anims.generateFrameNumbers('player', { start: 9, end:17 }),
            frameRate: animFrameRate,
            repeat: -1
        });
        anims.create({
            key: 'walk-down',
            frames: anims.generateFrameNumbers('player', { start: 18, end: 26 }),
            frameRate: animFrameRate,
            repeat: -1
        });
        anims.create({
            key: 'walk-right',
            frames: anims.generateFrameNumbers('player', { start: 27, end: 35 }),
            frameRate: animFrameRate,
            repeat: -1
        });

        // inputs
        const {LEFT,RIGHT,UP,DOWN,W,A,S,D} = Phaser.Input.Keyboard.KeyCodes
        this.keys = config.scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        });

        



    } // end constructor

    //! ======
    //! UPDATE
    //! ======
    preUpdate(time, delta){
        super.preUpdate(time, delta);

        const {keys} = this //output: this.keys
        const speed = 100
        // const previousVelocity = this.body.velocity.clone()
        // player movement
        this.body.setVelocity(0);
        // horizontal movement
        if (keys.left.isDown || keys.a.isDown){
            this.body.setVelocityX(-speed);
        } else if (keys.right.isDown || keys.d.isDown){
            this.body.setVelocityX(speed);
        }
        // vertical movement
        if (keys.up.isDown || keys.w.isDown){
            this.body.setVelocityY(-speed);
        } else if (keys.down.isDown || keys.s.isDown){
            this.body.setVelocityY(speed);
        }
        
        this.body.velocity.normalize().scale(speed);

        // player animation
        if (keys.left.isDown || keys.a.isDown) {
            this.anims.play('walk-left', true);
        }
        else if (keys.right.isDown || keys.d.isDown) {
            this.anims.play('walk-right', true);
        }
        else if (keys.up.isDown || keys.w.isDown) {
            this.anims.play('walk-up', true);
        }
        else if (keys.down.isDown || keys.s.isDown) {
            this.anims.play('walk-down', true);
        }
        else {
            this.anims.stop();
        }

        // if(this.anims.currentAnim){
        //     this.facing = this.anims.currentAnim.key.split('-')[1]
        //     //console.log(this.facing);
        // }
        //set idle animations
        // if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        //     //show idl anims
        //     if (previousVelocity.x < 0) {
        //         this.setFrame(this.idleFrame.left)
        //     } else if (previousVelocity.x > 0) {
        //         this.setFrame(this.idleFrame.right)
        //     } else if (previousVelocity.y < 0) {
        //         this.setFrame(this.idleFrame.up)
        //     } else if (previousVelocity.y > 0) {
        //         this.setFrame(this.idleFrame.down)
        //     }
        // }

         // Door
         if (this.onDoor) {
            this.vel = 50;
            this.onDoor = false;
        } else {
            this.vel = 200;
        }

        // diagnoal movement
        this.body.velocity.normalize().scale(this.vel);
        // check for room change
        this.getRoom();

    } // end update

    //! ==========
    //! FUNCTIONS
    //! ==========

    /** Return's player's current and previous room */
    getRoom(){
        // placeholder for current room
        let roomNumber;

        //loop through rooms in level
        for (let room in this.scene.rooms){
            let roomLeft = this.scene.rooms[room].x;
            let roomRight = this.scene.rooms[room].x + this.scene.rooms[room].width;
            let roomTop = this.scene.rooms[room].y;
            let roomBottom = this.scene.rooms[room].y + this.scene.rooms[room].height;

            //player is within the boundaries of this room
            if (this.x > roomLeft && this.x < roomRight &&
                this.y > roomTop && this.y < roomBottom){
                    roomNumber = room;

                    // set this room as visited by player
                    // let visited = this.scene.rooms[room].properties.find(function (property){
                    //     return property.name === 'visited';
                    // });

                    // visited.value = true
            }
        }

        // update player room variables
        if (roomNumber != this.currentRoom){
            this.previousRoom = this.currentRoom;
            this.currentRoom = roomNumber;
            this.roomChange = true;
        } else {
            this.roomChange = false;
        }
    }
}