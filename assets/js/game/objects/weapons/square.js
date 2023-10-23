import Utils from './../../../utils.js'

export default class Square extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, 'spr_wp_square')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setScale(Utils.getProportionalScale(this.width, 30))

    }

}