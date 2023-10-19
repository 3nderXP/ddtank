<?php

namespace App\Utils;

class Formatting {

    public static function arrayToAttributes(array $attributes) {
        
        return implode(" ", array_map(function ($attribute, $value) {

            if(is_bool($value)){

                return $attribute;

            }

            return "$attribute=\"$value\"";

        }, array_keys($attributes), array_values($attributes)));

    }

}