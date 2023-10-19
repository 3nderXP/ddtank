<?php

namespace App\Core\Controller\Pages;

use App\Core\Controller\Components\Head;
use App\Utils\View;

class Game {

    public static function render() {

        echo View::render("pages/game", [
            "head" => Head::render([
                "links" => [
                    ["rel" => "stylesheet", "href" => URL_BASE."/assets/css/game.css"]
                ],
                "scripts" => [
                    ["src" => "https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"],
                    ["async" => true, "type" => "module", "src" => URL_BASE."/assets/js/game/main.js"]
                ],
            ]),
        ]);

    }

}