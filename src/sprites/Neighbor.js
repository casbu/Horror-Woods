import Phaser from "phaser";
import Entity from "../sprites/Entity"

export default class Neighbor extends Entity {

    constructor(config) {
        super(config);
        
        this.body.setCollideWorldBounds(true).setSize(32,45).setOffset(15,17);
        this.body.onWorldBounds = true;
        this.body.setImmovable(true);
        
        //neighbor animation
        const anims = config.scene.anims

        anims.create({
            key: 'pace',
            frames: anims.generateFrameNumbers('neighbor', { frames: [9,18,27]}),
            frameRate: 0.5,
            delay: 5000,
            repeat: -1
        });
    }


    preUpdate(time, delta){
        super.preUpdate(time, delta);
        // animation
        // pacing
        this.anims.play('pace', true);
    } 
}