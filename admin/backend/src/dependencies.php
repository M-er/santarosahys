<?php
// DIC configuration
$container = $app->getContainer();
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    //$logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    foreach ($settings['type'] as $elTipo) {
        $logger->pushHandler(new Monolog\Handler\StreamHandler($elTipo['path'], $elTipo['level']));
    }
    return $logger;
};
/*  * * * * Utilidades  * * * *  */
$container['saludador'] = function ($c) {
    $saludador = new App\Saludador($c['logger']);
    return $saludador;
};
$container['sessionador'] = function ($c) {
    $session = new App\Session($c['logger']);
    return $session;
};
/*  * * * * Acciones  * * * *  */
$container['acciones'] = function ($c) {
    $acciones = new App\Acciones($c['logger']);
    return $acciones;
};
/*  * * * * Login  * * * *  */
$container['logueador'] = function ($c) {
    $loguea = new App\Login($c['logger']);
    return $loguea;
};
/*  * * * * Usuarios  * * * *  */
$container['usuario'] = function ($c) {
    $user = new App\User($c['logger']);
    return $user;
};
$container['usuarios'] = function ($c) {
    $users = new App\UserMapper($c['logger']);
    return $users;
};

/*  * * * * Productos  * * * *  */
$container['producto'] = function ($c) {
    $product = new App\Product($c['logger']);
    return $product;
};
$container['productos'] = function ($c) {
    $products = new App\ProductMapper($c['logger']);
    return $products;
};
/*  * * * * Servicio  * * * *  */
$container['servicio'] = function ($c) {
    $servicio = new App\Servicio($c['logger']);
    return $servicio;
};
/*  * * * * Servicios  * * * *  */
$container['servicios'] = function ($c) {
    $servicios = new App\ServicioMapper($c['logger']);
    return $servicios;
};
/*  * * * * Curso  * * * *  */
$container['curso'] = function ($c) {
    $curso = new App\Curso($c['logger']);
    return $curso;
};
/*  * * * * Cursos  * * * *  */
$container['cursos'] = function ($c) {
    $cursos = new App\CursoMapper($c['logger']);
    return $cursos;
};
/*  * * * * Institucional  * * * *  */
$container['institucionales'] = function ($c) {
    $institucional = new App\InstitucionalMapper($c['logger']);
    return $institucional;
};
/*  * * * * Institucional  * * * *  */
$container['institucional'] = function ($c) {
    $institucional = new App\Institucional($c['logger']);
    return $institucional;
};
/*  * * * * Publicaciones  * * * *  */
$container['publicacion'] = function ($c) {
    $publicacion = new App\Publicacion($c['logger']);
    return $publicacion;
};
/*  * * * * Publicaciones  * * * *  */
$container['publicaciones'] = function ($c) {
    $publicaciones = new App\PublicacionMapper($c['logger']);
    return $publicaciones;
};
