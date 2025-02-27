<?php

namespace App\Classes\Utils;

class ArrayUtils {

    public static function every(array $array, callable $callback) {

        foreach($array as $key => $value){
    
            if(!$callback($value, $key)) return false;
    
        }
    
        return true;
    
    }

    
    
}