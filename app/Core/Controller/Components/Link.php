<?php

namespace App\Core\Controller\Components;

use App\Classes\Utils\Formatting;
use App\Classes\Utils\View;

class Link {

    public static function render(array $attributes) {

        return View::render("Components/Link", [
            "attributes" => Formatting::arrayToAttributes($attributes)
        ]);

    }

}