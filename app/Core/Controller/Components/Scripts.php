<?php

namespace App\Core\Controller\Components;

use App\Core\Controller\Components\Script;

class Scripts {

    public static function render(array $scripts) {

        return implode("\r\n", array_map(function ($script) {

            return Script::render($script);

        }, $scripts));

    }

}