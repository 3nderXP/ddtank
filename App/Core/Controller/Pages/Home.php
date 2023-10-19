<?php

namespace App\Core\Controller\Pages;

use App\Core\Controller\Components\Head;
use App\Utils\View;

class Home {

    public static function render(array $params = []) {

        echo View::render("pages/home", [
            "head" => Head::render(),
            "siteName" => SITE_NAME,
            "urlBase" => URL_BASE,
        ]);

    }

}