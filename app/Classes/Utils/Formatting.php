<?php

namespace App\Classes\Utils;

use Exception;

class Formatting extends CrudUtils {

    /**
     * 
     * @param string $string String a ser convertida
     * @param string $separator [opcional] Separador que vai ser usado para quebrar a string. O valor padrão será espaço em branco.
     * 
     * @return string String convertida para o formato camelCase
     * 
    */

    public static function toCamelCase(string $string, string $separator = ' ') {

        try {

            if (trim($string) == '') {
        
                throw new Exception('String is empty');
        
            }

            $words = explode($separator, preg_replace("/\s+/", $separator, strtolower($string)));
        
            return implode("", array_map(function ($word, $index) {

                if($index == 0){

                    return $word;

                }

                return ucfirst($word);

            }, $words, array_keys($words)));
        
        } catch (Exception $error) {
        
            echo $error->getMessage();
        
        }

    }

    public static function arrayToAttributes(array $attributes) {
        
        return implode(" ", array_map(function ($attribute, $value) {

            if(is_bool($value) && $value === true){

                return $attribute;

            }

            return "$attribute=\"$value\"";

        }, array_keys($attributes), array_values($attributes)));

    }

    public static function arrayToQueryString(array $array) {

        if(empty($array)){

            return;

        }

        return "?".implode("&", array_map(function ($param, $value){

            return "$param=$value";

        }, array_keys($array), array_values($array)));

    }

    /**
     * 
     * @param string $url That will be converted to src of the iframe
     * @param string $website That tell us what website $url is from
     * 
     * @return string|void and calls method setStatus() if there is some Exception. Call getStatus() to get status and message of the Exception
     * 
    */

    public static function toIframeSrc(string $url, string $website) {

        try {

            $urls = [
                "youtube" => "https://www.youtube.com/embed/:id",
                "vimeo" => "https://player.vimeo.com/video/:id?color=".SITE_THEME,
                "drive" => "http://drive.google.com/file/d/:id/preview?showinfo=0",
                "direct" => "$url?showinfo=0"
            ];
    
            $regexExpression = "/(((http(s)?:\/\/)(www.|music.|m.)?(youtube.com|youtu.be)(\/){1}((watch(\/)?\?v=)|((v\/{1})|embed\/))?)|(((http(s)?:\/\/)((player.|www.)?vimeo.com)\/{1})(video\/)?)|((http(s)?:\/\/){1}(drive.google.com){1}(\/file\/d\/|\/file\/u\/0\/d\/){1}))|([&](.*)|([?](.*))|((\/){1}(view|preview)[?]?(.*)))/";
    
            if(!isset($urls[$website])){
                
                throw new Exception("O website fornecido não tem um link de incorporação padrão");
                
            }

            $videoId = preg_replace($regexExpression, "", $url);
            $formattedUrl = str_replace(":id", $videoId, $urls[$website]);
    
            return $formattedUrl;

        } catch(Exception $e) {

            self::setStatus("error", $e->getMessage(), $e->getCode());

        }

    }

}