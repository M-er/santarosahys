<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);

// Angular
if (isset($_SERVER['HTTP_ORIGIN'])) {
    if (strstr($_SERVER['HTTP_ORIGIN'], 'http://192.168.')) {
        header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    } else if (strstr($_SERVER['HTTP_ORIGIN'], 'http://localhost')) {
        header('Access-Control-Allow-Origin: http://localhost:4200');
    }
}
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: content-type');
