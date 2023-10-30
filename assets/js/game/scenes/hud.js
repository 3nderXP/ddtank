export default class HUD extends Phaser.Scene {

    strength

    constructor() {

        super({ key: 'HUD' })

    }

    init() {

    }

    preload() {

        this.load.image('spr_strength_area', `${URL_BASE}/assets/img/sprites/square.png`)
        this.load.image('spr_strength_fill', `${URL_BASE}/assets/img/sprites/square.png`)
        
    }

    create() {
        
        const { width: gameWidth, height: gameHeight } = this.game.config

        this.strength = this.renderStrength(gameWidth / 2, gameHeight, gameWidth * .70, 40, {
            fill: 0x0088ff
        })

        this.strength.self.y -= (this.strength.self.displayHeight / 2) + 20

    }

    update() {

    }

    renderStrength(x, y, width = 100, height = 20, colors = {}) {

        try {

            if(isNaN(x) || isNaN(y)){
    
                throw new Error('Coordenadas X e Y não especificadas')
    
            }
            
            const { width: gameWidth, height: gameHeight } = this.game.config
            const { area: colorArea, fill: colorFill } = colors
            const fillPadding = 5
            
            const model = {
                self: this.add.container(x, y),
                area: this.add.nineslice(0, 0, 'spr_strength_area', null, width, height, 
                    20, 20, // left and right size
                    20, 20 // top and bottom size
                ),
                fill: this.add.nineslice(0, 0, 'spr_strength_area', null, 0, height - (fillPadding * 2), 
                    1, 1, // left and right size
                    1, 1 // top and bottom size
                )
            }

            model.area.setTint(colorArea)
            model.area.setAlpha(.7)

            model.fill.setTint(colorFill)
            model.fill.x = model.area.getLeftCenter().x + fillPadding
            model.fill.setOrigin(0, .5)
   
            model.self.add([
                model.area,
                model.fill,
            ])

            model.self.setSize(width, height)
            
            model.setPercentage = (percentage = 0) => {
    
                percentage = percentage / 100

                model.fill.width = (width - fillPadding * 2) * percentage
    
            }
    
            return model

        } catch(e) {

            console.error(e)

        }

    }

}