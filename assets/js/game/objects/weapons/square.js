import Utils from './../../../utils.js'

export default class Square extends Phaser.Physics.Arcade.Sprite {

    throwAnimation
    particles

    constructor(scene, x, y) {

        super(scene, x, y, 'spr_wp_square')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setScale(Utils.getProportionalScale(this.width, 30))

        this.on('destroy', () => {

            this.particles.explode()

        })

    }

    startThrow() {

        this.throwAnimation = this.scene.tweens.add({
            targets: this,
            duration: 1000,
            angle: (this.flipX) ? -360 : 360,
            repeat: -1,
        })

        this.particles = this.scene.add.particles(0, 0, this.texture.key, {
            speed: 100,
            alpha: {
                start: 1,
                end: 0,
            },
            scale: {
                start: Utils.getProportionalScale(this.width, 10),
                end: 0,
            },
            lifespan: 500,
            follow: this,
        })

    }

}