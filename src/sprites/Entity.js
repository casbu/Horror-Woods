import Phaser from "phaser";

// Parent class for all PC and NPC characters

export default class Entity extends Phaser.GameObjects.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y);
    
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        
        this.body.setVelocity(0, 0).setBounce(0.2).setCollideWorldBounds(true);
        // this.body.setCollideWorldBounds(true);
        // this.body.onWorldBounds = true;
        // this.body.setSize(31,45).setOffset(15,17);
        this.isDead = false;
        // this.hurt = false;

    }

    explode() {
        if(this.isDead) {
            this.isDead = true;
            this.destroy();
            console.log('entity explode')
        }
    }
}