<?php

require_once(__DIR__."/vendor/autoload.php");

use CoffeeCode\Router\Router;
use App\Utils\Formatting;

$route = new Router(URL_BASE);

$route->namespace("App\Core\Controller");

$route->get("/", "Pages\Home:render");

$route->dispatch();