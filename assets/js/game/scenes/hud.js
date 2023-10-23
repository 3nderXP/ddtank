export default class HUD extends Phaser.Scene {

    strength = {
        area: null,
        fill: null
    }

    constructor() {

        super({ key: 'HUD' })

    }

    init() {

    }

    preload() {
        
    }

    create() {

        const { width: gameWidth, height: gameHeight } = this.game.config

        this.strength.area = this.add.rectangle(gameWidth / 2, gameHeight - 20, gameWidth * .7, 20, 0x414141)
        this.strength.area.setOrigin(.5, 1)
        
        this.strength.fill = this.add.rectangle(this.strength.area.getLeftCenter().x, this.strength.area.getTopCenter().y, 0, this.strength.area.displayHeight, 0x0088ff)
        this.strength.fill.setOrigin(0, 0)
        
    }

    update() {

    }

}