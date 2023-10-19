import Utils from './../../utils.js'

export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene) {

        super(scene, 0, 0, 'spr_player')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setScale(Utils.getProportionalScale(this.width, 64))

        this.setData({
            health: {
                max: 100,
                current: 100
            },
            canMove: true,
            keysToMove: {
                left: [
                    'LEFT'
                ],
                right: [
                    'RIGHT'
                ],
            },
            velocity: 100,
            gravity: 300,
        })

        this.setGravityY(this.data.values.gravity)

    }

    update() {

        if(!this.active || this.data.values.health.current <= 0){

            return

        }

        this.move()

    }

    move() {

        if(!this.data.values.canMove){

            return

        }

        const leftIsDown = this.data.values.keysToMove.left.filter(key => this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey(key)))[0]
        const rightIsDown = this.data.values.keysToMove.right.filter(key => this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey(key)))[0]

        const horizontalMove = -Number(Boolean(leftIsDown)) + Number(Boolean(rightIsDown))

        this.setVelocityX(this.data.values.velocity * horizontalMove)

    }

}