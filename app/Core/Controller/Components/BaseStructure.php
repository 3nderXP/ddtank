<?php

namespace App\Core\Controller\Components;

use App\Classes\Utils\View;
use App\Core\Controller\Components\Links;
use App\Core\Controller\Components\Scripts;

class BaseStructure {

    public static function render(string $content, array $params = []) {

        $viewPath = "Components/BaseStructure";
        $vars = [
            "lang" => SITE_LANG,
            "title" => $params["title"] ?? SITE_NAME,
            "siteName" => SITE_NAME,
            "url" => URL_BASE,
            "domain" => SITE_DOMAIN,
            "type" => $params["type"] ?? SITE_TYPE,
            "image" => $params["image"] ?? SITE_SUMMARY_IMAGE,
            "cardSummary" => $params["cardSummary"] ?? SITE_SUMMARY_CARD,
            "description" => $params["description"] ?? SITE_DESCRIPTION,
            "themeColor" => SITE_THEME,
            "keywords" => SITE_KEYWORDS,
            "links" => self::getLinks($params["links"] ?? []),
            "scripts" => self::getScripts($params["scripts"] ?? []),
            "content" => $content,
            "urlBase" => URL_BASE
        ];

        return View::render($viewPath, $vars);
        
    }

    private static function getLinks(array $links = []) {

        $defaultLinks = [
            [ "rel" => "stylesheet", "href" => "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" ],
            [ "rel" => "stylesheet", "href" => URL_BASE."/assets/css/global.css" ],
        ];

        return Links::render(array_merge($defaultLinks, $links));

    }

    private static function getScripts(array $scripts = []) {

        $defaultScripts = [
            [ "src" => URL_BASE."/assets/js/global.js", "defer" => true, "type" => "module" ],
        ];

        return Scripts::render(array_merge($defaultScripts, $scripts));

    }


}