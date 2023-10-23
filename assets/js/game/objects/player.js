import Utils from './../../utils.js'
import Weapon from './weapons/square.js'

export default class Player extends Phaser.Physics.Arcade.Sprite {

    hudScene

    constructor(scene) {

        super(scene, 0, 0, 'spr_player')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.hudScene = this.scene.scene.get('HUD')

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
            velocity: 50,
            gravity: 300,
            strength: 0,
            angle: 45,
            bag: {
                equipments: {
                    weapon: new Weapon(scene, this.x, this.x),
                }
            }
        })

        this.setGravityY(this.data.values.gravity)

        this.scene.input.keyboard.on('keydown', (event) => {

            if(event.code != 'Space'){

                return
                
            }

            this.data.values.strength += 1
            this.data.values.atackStatus = true

        })

        this.scene.input.keyboard.on('keyup', (event) => {

            if(event.code != 'Space' && !this.data.values.atackStatus){

                return
                
            }
            
            this.attack(this.data.values.angle, this.data.values.strength)
            
            this.data.values.atackStatus = false
            this.data.values.strength = 0

        })

    }

    attack(angle, strength) {

        console.log(angle, strength)

        const weaponToThrown = new Weapon(this.scene, this.x, this.y)

        const velocityX = 1000 * (strength / 100);
        const velocityY = (1000 * (strength / 100)) * Math.sin(angle);
    
        weaponToThrown.setGravityY(300)
        weaponToThrown.setVelocity(velocityX * (this.flipX ? -1 : 1), -velocityY);

        this.scene.physics.add.collider(weaponToThrown, this.scene.platforms, (weapon, platform) => {
            
            weapon.destroy()

        })

    }

    update() {

        if(!this.active || this.data.values.health.current <= 0){

            return

        }

        this.move()

        this.data.values.bag.equipments.weapon.setPosition(this.x, this.y)

    }

    move() {

        if(!this.data.values.canMove){

            return

        }

        const leftIsDown = this.data.values.keysToMove.left.filter(key => this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey(key)))[0]
        const rightIsDown = this.data.values.keysToMove.right.filter(key => this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey(key)))[0]

        const horizontalMove = -Number(Boolean(leftIsDown)) + Number(Boolean(rightIsDown))

        this.setVelocityX(this.data.values.velocity * horizontalMove)

        this.setFlipX(horizontalMove != 0 ? (horizontalMove == 1 ? false : true) : this.flipX)

    }

}