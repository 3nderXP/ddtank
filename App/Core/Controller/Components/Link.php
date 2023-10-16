<?php

namespace App\Core\Controller\Components;

use App\Utils\Formatting;
use App\Utils\View;

class Link {

    public static function render(array $attributes, string $content = null) {

        return View::render("components/link", [
            "attributes" => Formatting::arrayToAttributes($attributes)
        ]);

    }

}