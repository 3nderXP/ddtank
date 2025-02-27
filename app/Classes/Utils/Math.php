<?php

namespace App\Classes\Utils;

class Math {

    public static function minmax(int|float $current, int|float $min, int|float $max) {

        return max(0, min($current, $max));
        
    }

}