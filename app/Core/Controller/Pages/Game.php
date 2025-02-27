<?php

namespace App\Core\Controller\Pages;

use App\Classes\Utils\View;
use App\Core\Controller\Components\BaseStructure;
use App\Core\Controller\Components\Head;

class Game {

    public static function render() {

        exit(BaseStructure::render(View::render("Pages/Game"), [
            "scripts" => [
                [ "src" => "https://cdn.jsdelivr.net/npm/phaser@3.88.2/dist/phaser.min.js" ],
                [ "src" => URL_BASE."/assets/js/game/main.js", "defer" => true, "type" => "module" ]
            ],
            "links" => [
                [ "rel" => "stylesheet", "href" => URL_BASE."/assets/css/game.css" ]
            ]
        ]));

    }

}