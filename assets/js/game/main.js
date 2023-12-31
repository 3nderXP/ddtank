import Debug from "./scenes/debug.js"
import HUD from "./scenes/hud.js"

const Game = new Phaser.Game({
    type: Phaser.AUTO,
    autoFocus: true,
    autoCenter: true,
    autoMobilePipeline: true,
    failIfMajorPerformanceCaveat: true,
    expandParent: true,
    scale: {
        mode: Phaser.Scale.FIT,
        orientation: Phaser.Scale.Orientation.LANDSCAPE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    disableContextMenu: true,
    gameTitle: 'DDTank Paraguai',
    scene: [
        new Debug,
        new HUD,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
})