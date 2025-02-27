<?php

namespace App\Classes\Utils;

class UUID {

    public static function genAlpha(int $length = 10) {

        $alphabet = "abcdefghijklmnopqrstuvwxyz";
        $upperAlphabet = strtoupper($alphabet);
        $numbers = "0123456789";

        $alphaNumeric = "";

        do {

            $alphaNumeric .= str_shuffle($alphabet.$upperAlphabet.$numbers);

        } while(strlen($alphaNumeric) < $length);

        return substr($alphaNumeric, 0, $length);

    }

}