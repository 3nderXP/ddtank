import Player from '../objects/player.js'
import Utils from '../../utils.js'

export default class Debug extends Phaser.Scene {

    players = []
    currentTurn = 0
    platforms

    constructor() {

        super({ key: "Debug" })

    }

    init() {

        this.scene.launch('HUD')

    }

    preload () {

        this.load.image('spr_grass', `${URL_BASE}/assets/img/sprites/platforms/grass.png`)
        this.load.image('spr_wp_square', `${URL_BASE}/assets/img/sprites/square.png`)
        this.load.image('spr_player', `${URL_BASE}/assets/img/sprites/player.png`)

    }

    create () {

        const { width: gameWidth, height: gameHeight } = this.game.config

        this.platforms = this.physics.add.staticGroup()

        const mainPlatform = this.add.nineslice(gameWidth / 2, gameHeight, 'spr_grass', null, gameWidth, 100, 13, 13, 33, 12)

        this.platforms.addMultiple([
            mainPlatform,
            this.add.nineslice(gameWidth / 2, gameHeight / 2, 'spr_grass', null, 200, 50,
                13, 13,
                33, 12
            )
        ])

        this.connectPlayers(4)

        this.cameras.main.setBounds(-20, 0, gameWidth + 40, mainPlatform.getBottomCenter().y)

        this.changeTurn(this.currentTurn)

        this.input.keyboard.on('keydown-P', () => {

            this.skipTurn()

        })

    }

    update () {

        if(this.players.length > 0){

            this.players.forEach((player, index) => {

                player.data.values.canMove = this.currentTurn == index
                player.update()
         
            })

        }

    }

    changeTurn(turn) {

        this.cameras.main.startFollow(this.players[turn])

    }

    skipTurn() {

        this.currentTurn = (this.currentTurn < (this.players.length - 1)) ? this.currentTurn + 1 : 0
        
        this.changeTurn(this.currentTurn)

    }

    connectPlayers(quantity) {

        for(let i = 0; i < quantity; i++){

            const platform = this.platforms.children.entries[Utils.rand(0, this.platforms.children.size - 1)]

            const player = new Player(this, 0, 0, this.players.length + 1)
            
            player.x = Utils.rand(platform.getLeftCenter().x, platform.getRightCenter().x)
            player.y = platform.getTopCenter().y
   
            if(i > 0){

                const rgba = new Phaser.Display.Color()

                rgba.random(0, 255)

                player.setTint(rgba.color)

            }

            this.physics.add.collider(this.players, this.platforms)

            this.players.push(player)
            this.players = Utils.shuffle(this.players)
            
        }

    }

}