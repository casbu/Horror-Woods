
export default class Player extends Phaser.GameObjects.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, 'player');
        
        config.scene = this.scene;
        this.currentRoom = 2;       //sets start of room so room change flag doesn't fire
        this.previousRoom = null;
        this.roomChange = false;
        this.canMove = true;
        
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.setSize(31,45).setOffset(15,17);
        // this.alive = true;
        // this.hurt = false;
        this.input = config.scene.input.keyboard.createCursorKeys();

    }


    preUpdate(time, delta){
        super.preUpdate(time, delta);

        // player movement
        this.body.setVelocity(0);
        // horizontal movement
        if (this.input.left.isDown){
            this.body.setVelocityX(-80);
        } else if (this.input.right.isDown){
            this.body.setVelocityX(80);
        }
        // vertical movement
        if (this.input.up.isDown){
            this.body.setVelocityY(-80);
        } else if (this.input.down.isDown){
            this.body.setVelocityY(80);
        }
        
        // player animation
        if (this.input.left.isDown)
        {
            this.anims.play('walk-left', true);
        }
        else if (this.input.right.isDown)
        {
            this.anims.play('walk-right', true);
        }
        else if (this.input.up.isDown)
        {
            this.anims.play('walk-up', true);
        }
        else if (this.input.down.isDown)
        {
            this.anims.play('walk-down', true);
        }
        else
        {
            this.anims.stop();
        }

        // check for room change
        this.getRoom();
    } 

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

                    // //set this room as visited by player
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