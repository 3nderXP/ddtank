import Utils from './../../utils.js'
import Weapon from './weapons/square.js'

export default class Player extends Phaser.Physics.Arcade.Sprite {

    hud

    constructor(scene, x = 0, y = 0) {

        super(scene, x, y, 'spr_player')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.hud = this.scene.scene.get('HUD')

        this.setOrigin(.5, 1)
        this.setDisplaySize(64, 32)
        // this.setScale(Utils.getProportionalScale(this.width, 64))

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
            strength: {
                value: 0,
                status: 'idle',
                setStatus: function(status) {

                    try {

                        const possibleStatus = [
                            'idle',
                            'started',
                            'ended'
                        ]

                        if(!possibleStatus.includes(status)) {

                            throw new Error(`O status ${status} não é aceito`)

                        }

                        this.status = status
                         
                    } catch(e) {

                        console.log(e.message)

                    }

                }
            },
            angle: 45,
            bag: {
                equipments: {
                    weapon: new Weapon(scene, this.x, this.y),
                },
            },
            controls: {
                keyboard: {
                    space: () => {

                        // Ao pressionar
            
                        if(this.data.values.strength.status == 'ended' && this.data.values.strength.value <= 0) {
            
                            this.data.values.strength.setStatus('idle')
                            this.data.values.atackStatus = false
            
                            return
            
                        }
            
                        this.data.values.strength.value += this.data.values.strength.status != 'ended' ? .5 : -.5
            
                        this.data.values.strength.setStatus((this.data.values.strength.value != 100) ? 'started' : 'ended')
                        
                        this.hud.strength.setPercentage(this.data.values.strength.value)

                        // Ao soltar a tecla

                        this.scene.input.keyboard.off('keyup-SPACE')
                        this.scene.input.keyboard.on('keyup-SPACE', (event) => {

                            if(this.data.values.atackStatus){

                                return
                                
                            }
                            
                            this.attack(this.data.values.angle, this.data.values.strength.value)
                            
                            this.data.values.attackStatus = true
                            this.data.values.strength.value = 0

                        })
    
                    },
                }
            }
        })

        this.setGravityY(this.data.values.gravity)

    }

    attack(angle, strength) {

        const { bag } = this.data.values

        const weaponToThrown = new Weapon(this.scene, bag.equipments.weapon.x, bag.equipments.weapon.y)

        const velocityX = 1000 * (strength / 100)
        const velocityY = (1000 * (strength / 100)) * Math.sin(angle)
    
        weaponToThrown.setGravityY(300)
        weaponToThrown.setVelocity(velocityX * (this.flipX ? -1 : 1), -velocityY)

        this.scene.physics.add.collider(weaponToThrown, this.scene.platforms, (weapon, platform) => {
            
            weapon.destroy()

        })

    }

    update() {
        
        const { bag, controls, health } = this.data.values


        if(!this.active || health.current <= 0){

            return

        }

        this.move()

        bag.equipments.weapon.setPosition(this.x, this.getTopCenter().y)

        Object.keys(controls.keyboard).forEach((key) => {

            const keyCode = Utils.toSnakeCase(key, '', true).toUpperCase()
            const event = controls.keyboard[key]

            if(this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey(keyCode))){

                event()

            }

        })

    }

    move() {

        const { canMove, keysToMove, velocity } = this.data.values

        if(!canMove){

            return

        }

        const leftIsDown = keysToMove.left.filter(key => this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey(key)))[0]
        const rightIsDown = keysToMove.right.filter(key => this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey(key)))[0]

        const horizontalMove = -Number(Boolean(leftIsDown)) + Number(Boolean(rightIsDown))

        this.setVelocityX(velocity * horizontalMove)

        this.setFlipX(horizontalMove != 0 ? (horizontalMove == 1 ? false : true) : this.flipX)

    }

}