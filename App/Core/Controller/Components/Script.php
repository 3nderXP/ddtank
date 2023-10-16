<?php

namespace App\Core\Controller\Components;

use App\Utils\Formatting;
use App\Utils\View;

class Script {

    public static function render(array $attributes, string $content = null) {

        return View::render("components/script", [
            "attributes" => Formatting::arrayToAttributes($attributes),
            "content" => $content
        ]);

    }

}