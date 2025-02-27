<?php

header("Content-Type: text/html; charset=utf-8;");

session_start();

setlocale(LC_ALL, "pt_BR");
date_default_timezone_set("America/Sao_Paulo");

// CONFIG UNDERLINE CONSTS
define("__ROOT__", __DIR__."/..");

// CONFIG URL
define("SITE_PROTOCOL", isset($_SERVER["HTTPS"]) ? "https://" : "http://");
define("SITE_DOMAIN", $_SERVER["SERVER_NAME"]);
define("SITE_ROOT", "/ddtank");
define("URL_BASE", SITE_PROTOCOL.SITE_DOMAIN.SITE_ROOT);

// CONFIG SITE
define("SITE_LANG", "pt_BR");
define("SITE_NAME", "DDTank Paraguai");
define("SITE_DESCRIPTION", "DDTank Paraguai é um projeto de um jogo online de tiro baseado no antigo ddtank.");
define("SITE_THEME", "#560dd4");
define("SITE_SUMMARY_IMAGE", "logo.png");
define("SITE_SUMMARY_CARD", "summary"); // summary | summary_large_image
define("SITE_TYPE", "website");
define("SITE_KEYWORDS", "DDTank, Paraguai, Jogo, Online, Tiro, Diversão");
define("SITE_VERSION", "0.4.0");

// CREDENCIAIS DO SISTEMA

define("SYSTEM_MODE", "DEVELOPMENT"); // PRODUCTION | DEVELOPMENT
define("SYSTEM_KEYS", [
    "SECRET" => "123" // Your Secret key
]);

define("JWT_ALGORITHM", "HS256");

define("STAFF_USERS", [
    // ...[ ...userData ]
]);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);