<?php

namespace App\Core\Controller\Components;

use App\Core\Controller\Components\Link;

class Links {

    public static function render(array $links) {

        return implode("\r\n", array_map(function ($link) {

            return Link::render($link);

        }, $links));

    }

}