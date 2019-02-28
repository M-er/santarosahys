<?php
$app->get('/hello/{name}', "saludador:hola");
$app->get('/session/', "sessionador:getSession");
$app->post('/login/', "logueador:login");
$app->get('/logout/', "logueador:logout");
/* * * * * ABM * * * * */
$app->group('/abm', function () use ($app) {
    $app->post('/cursos', 'curso:guardar');
    $app->post('/usuarios', 'usuario:guardar');
    $app->post('/productos', 'producto:guardar');
    $app->post('/servicios', 'servicio:guardar');
    $app->post('/publicacion', 'publicacion:guardar');
    $app->post('/institucional', 'institucional:guardar');
});

/* * * * * Hojeador * * * * */
$app->group('/hojeador', function () use ($app) {
    $app->post('/cursos', 'cursos:hojeador');
    $app->post('/usuarios', 'usuarios:hojeador');
    $app->post('/productos', 'productos:hojeador');
    $app->post('/servicios', 'servicios:hojeador');
    $app->post('/publicaciones', 'publicaciones:hojeador');
    $app->post('/institucional', 'institucionales:hojeador');
});

/* * * * * Usuarios * * * * */
$app->post('/usuario/s', "usuario:save");
$app->get('/usuario/me', "usuario:getMe");
$app->post('/usuario/u', "usuario:update");
$app->get('/usuarios/all', "usuarios:getAll");
$app->delete('/usuarios/delete/{iduser}', "usuario:delete");
/* * * * * Productos * * * * */
$app->get('/productos/all', "productos:getAll");
$app->get('/producto/{{id}}', "producto:getOne");
/* * * * * Acciones * * * * */
$app->get('/acciones/all', "logueador:getAcc");
/* * * * * Servicios * * * * */
$app->get('/servicios/all', "servicios:getAll");
/* * * * * Cursos * * * * */
$app->get('/cursos/all', "cursos:getAll");
/* * * * * Institucional * * * * */
$app->get('/institucional/all', "institucionales:getAll");
$app->get('/institucional/ca', "institucionales:construccion");
$app->get('/institucional/aa', "institucionales:agro");
$app->get('/institucional/ma', "institucionales:mineria");
$app->get('/institucional/ea', "institucionales:enfprofesionales");
$app->get('/institucional/pa', "institucionales:protocolos");
$app->get('/institucional/ga', "institucionales:generales");
$app->get('/institucional/sa', "institucionales:servicios");
$app->post('/institucional/s', "institucional:save");
$app->delete('/institucional/delete/{idinstitucional}', "institucional:delete");
