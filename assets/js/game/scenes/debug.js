import Player from "../objects/player.js";

export default class Debug extends Phaser.Scene {

    player

    constructor() {

        super({ key: "Debug" })

    }

    init() {

        this.scene.launch('HUD')

    }

    preload () {

        this.load.image('spr_grass', `${URL_BASE}/assets/img/sprites/platforms/grass.png`)

        this.load.image('spr_wp_square', `${URL_BASE}/assets/img/sprites/weapons/square.png`)

        this.load.image('spr_player', `${URL_BASE}/assets/img/sprites/player.png`)

    }

    create () {

        const { width: gameWidth, height: gameHeight } = this.game.config

        this.platforms = this.physics.add.staticGroup()

        const mainPlatform = this.add.nineslice(gameWidth / 2, gameHeight, 'spr_grass', null, gameWidth, 100, 13, 13, 33, 12)

        this.platforms.addMultiple([
            mainPlatform
        ])

        this.player = new Player(this)
        
        this.player.x = gameWidth / 2
        this.player.y = gameHeight / 2

        this.physics.add.collider(this.player, this.platforms)

        this.cameras.main.setBounds(-20, 0, gameWidth + 40, mainPlatform.getBottomCenter().y)
        this.cameras.main.startFollow(this.player)

    }

    update () {

        this.player.update()

    }

}