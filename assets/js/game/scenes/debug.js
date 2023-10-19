import Player from "../objects/player.js";

export default class Debug extends Phaser.Scene {

    player

    constructor() {

        super({ key: "Debug" })

    }

    init() {}

    preload () {

        this.load.image('spr_player', `${URL_BASE}/assets/img/sprites/player.png`)

    }

    create () {

        const { width: gameWidth, height: gameHeight } = this.game.config

        this.platforms = this.physics.add.staticGroup()

        const mainPlatform = this.add.rectangle(gameWidth / 2, gameHeight, gameWidth, 50, 0x00eeee)

        mainPlatform.setOrigin(.5, 1)

        this.platforms.addMultiple([
            mainPlatform
        ])

        this.player = new Player(this)
        
        this.player.x = gameWidth / 2
        this.player.y = gameHeight / 2

        this.physics.add.collider(this.player, this.platforms)

        this.cameras.main.startFollow(this.player)

    }

    update () {

        this.player.update()

    }

}