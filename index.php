<?php

require_once(__DIR__."/vendor/autoload.php");

use App\Core\Controller\Pages\Error;
use CoffeeCode\Router\Router;
use App\Utils\Formatting;

$route = new Router(URL_BASE);

$route->namespace("App\Core\Controller");

$route->get("/", "Pages\Home:render");

$route->get("/game", "Pages\Game:render");

$route->dispatch();

if($route->error()){

    Error::render([
        "code" => $route->error(),
    ]);

}