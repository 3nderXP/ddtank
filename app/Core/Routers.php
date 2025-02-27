<?php

namespace App\Core;

use App\Core\Controller\Pages\Error;
use CoffeeCode\Router\Router;
use Exception;

class Routers {

    public function init() {

        $router = new Router(URL_BASE);
        $router->namespace("App\Core\Controller");

        try {
        
            // Auth

            $router->get("/", "Pages\Home:render");
            $router->get("/game", "Pages\Game:render");

            $router->dispatch();

        } catch(Exception $e) {
            
            Error::render([
                "code" => $e->getCode(),
                "message" => $e->getMessage()
            ]);

        }

        if($router->error()) {
            
            Error::render([ "code" => $router->error() ]);

        }

    }

}