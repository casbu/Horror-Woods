
export default class Neighbor extends Phaser.GameObjects.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, 'neighbor');
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        

        this.body.setCollideWorldBounds(true);
        this.body.setSize(31,45).setOffset(15,17);
        this.body.setImmovable(true);
        // this.alive = true;
        // this.hurt = false;
        

    }


    preUpdate(time, delta){
        super.preUpdate(time, delta);
        // animation
        // pacing
        this.anims.play('pace', true);
    } 
}