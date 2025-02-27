<?php

namespace App\Core\Controller\Components;

use App\Classes\Utils\Formatting;
use App\Classes\Utils\View;

class Script {

    public static function render(array $attributes, string $content = null) {


    
        if (isset($attributes['src'])) {
            $attributes['src'] .= '?version=' . SITE_VERSION;
        }

        return View::render("Components/Script", [
            "attributes" => Formatting::arrayToAttributes($attributes),
            "content" => $content
        ]);

    }

}