<?php

session_start();

define("SITE_PROTOCOL", isset($_SERVER["HTTPS"]) ? "https://" : "http://");
define("SITE_DOMAIN", $_SERVER["SERVER_NAME"]);
define("SITE_ROOT", "/rotas");

define("URL_BASE", SITE_PROTOCOL.SITE_DOMAIN.SITE_ROOT);

define("SITE_NAME", "Project of Routes");
define("SITE_LANG", "pt-BR");

define("VERSION", "0.2.0");