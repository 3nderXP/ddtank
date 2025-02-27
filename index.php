<?php

require_once(__DIR__."/vendor/autoload.php");

use App\Core\Routers;

$routers = new Routers();
$routers->init();