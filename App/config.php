<?php

session_start();

define("SITE_PROTOCOL", isset($_SERVER["HTTPS"]) ? "https://" : "http://");
define("SITE_DOMAIN", $_SERVER["SERVER_NAME"]);
define("SITE_ROOT", "/ddtank");

define("URL_BASE", SITE_PROTOCOL.SITE_DOMAIN.SITE_ROOT);

define("SITE_NAME", "DDTank Paraguai");
define("SITE_LANG", "pt-BR");

define("VERSION", "0.3.0");

ini_set("display_errors", 1);
ini_set("error_reporting", E_ALL);