<?php

namespace App\Core\Controller\Components;

use App\Core\Controller\Components\Links;
use App\Core\Controller\Components\Scripts;

use App\Utils\View;

class Head {

    public static function render(array $params = []) {

        return View::render("components/head", [
            "title" => SITE_NAME,
            "lang" => SITE_LANG,
            "links" => self::getLinks(isset($params["links"]) ? $params["links"] : []),
            "scripts" => self::getScripts(isset($params["scripts"]) ? $params["scripts"] : []),
            "urlBase" => URL_BASE,
            "version" => VERSION,
        ]);
        
    }

    private static function getLinks(array $links = []) {

        $defaultLinks = [
            ["rel" => "stylesheet", "href" => URL_BASE."/assets/css/global.css"]
        ];

        return Links::render(array_merge($defaultLinks, $links));

    }

    private static function getScripts(array $scripts = []) {

        $defaultScripts = [
            ["type" => "module", "src" => URL_BASE."/assets/js/global.js"]
        ];

        return Scripts::render(array_merge($defaultScripts, $scripts));

    }

}