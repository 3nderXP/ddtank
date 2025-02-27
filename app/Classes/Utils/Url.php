<?php

namespace App\Classes\Utils;

/**
 * 
 * Classe para manipulação de URLs
 * 
*/

class Url {

    /**
     * Verifica se o URL pertence ao domínio atual
     *
     * @param string $url URL a ser verificada
     * @return bool Retorna `true` se a URL pertence ao domínio atual, caso contrário, `false`.
     * 
    */

    public static function isMyDomain(string $url) {

        $parse = parse_url($url);

        return isset($parse["host"]) && preg_match("/" . SITE_DOMAIN . "/", $parse["host"]);

    }

    /**
     * 
     * Verifica a existencia de uma url de retorno e faz o redirecionamento
     * 
     * @param string $paramName O nome da query string contendo a url à ser redirecionada
     * 
    */

    public static function returnTo(string $paramName = "return_to") {

        $urlToReturn = $_GET[$paramName] ?? null;

        if(!$urlToReturn) return;

        header("Location: ".$urlToReturn);
        exit();

    }

    public static function normalize(string $string) {

        return strtolower(preg_replace(["/[^a-zA-z0-9\s]/", "/\s+/"], ["", "-"], $string));

    }

}
