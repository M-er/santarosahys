<?php
namespace App;
/**
*
Clase Acciones
*
**/
class Acciones
{

  public function __construct($logger) {$this->logger = $logger;}

  public function getAll( $request,  $response, array $args ) {
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $query = "Select * from log";
    $resultado = $db->getAllRecords($query);
    $addcurso = 0;$addusuario = 0;$addservicio = 0;$addpublicacion = 0;$addproducto = 0;
    $adddocu = 0;
    $delcurso = 0;$delusuario = 0;$delservicio = 0;$delpublicacion = 0;$delproducto = 0;
    $deldocu = 0;
    foreach ($resultado as $value) {
      switch ($value['accion']) {
        case 'Creacion de curso':$addcurso++;break;
        case 'Creacion de usuario':$addusuario++;break;
        case 'Creacion de servicio':$addservicio++;break;
        case 'Creacion de publicacion':$addpublicacion++;break;
        case 'Creacion de producto':$addproducto++;break;
        case 'Creacion de documentacion institucional':$adddocu++;break;
        case 'Eliminacion de curso':$delcurso++;break;
        case 'Eliminacion de usuario':$delusuario++;break;
        case 'Eliminacion de servicio':$delservicio++;break;
        case 'Eliminacion de publicacion':$delpublicacion++;break;
        case 'Eliminacion de producto':$delproducto++;break;
        case 'Eliminacion de documentacion institucional':$deldocu++;break;

        default:break;
      }
    }
    if($resultado){
      $total = $addcurso + $addusuario + $addservicio + $addpublicacion + $addproducto + $delcurso + $delusuario + $delservicio + $delpublicacion + $delproducto;

      $acciones[]= array ('name'=>'Creacion de curso','y'=>$addcurso/$total);
      $acciones[]= array ('name'=>'Creacion de usuario','y'=>$addusuario/$total);
      $acciones[]= array ('name'=>'Creacion de servicio','y'=>$addservicio/$total);
      $acciones[]= array ('name'=>'Creacion de publicacion','y'=>$addpublicacion/$total);
      $acciones[]= array ('name'=>'Creacion de producto','y'=>$addproducto/$total);
      $acciones[]= array ('name'=>'Creacion de documentacion institucional','y'=>$adddocu/$total);
      $acciones[]= array ('name'=>'Eliminacion de curso','y'=>$delcurso/$total);
      $acciones[]= array ('name'=>'Eliminacion de usuario','y'=>$delusuario/$total);
      $acciones[]= array ('name'=>'Eliminacion de servicio','y'=>$delservicio/$total);
      $acciones[]= array ('name'=>'Eliminacion de publicacion','y'=>$delpublicacion/$total);
      $acciones[]= array ('name'=>'Eliminacion de producto','y'=>$delproducto/$total);
      $acciones[]= array ('name'=>'Eliminacion de documentacion institucional','y'=>$deldocu/$total);

      $rta['err'] = 0;
      $rta['status'] = "success";
      $rta['acciones'] = $acciones;
    }else{
      $rta['err'] = 1;
      $rta['status'] = "error";
      $rta['status'] = "Error al traer los datos";

    }

    return $response->withJson($rta);
  }

  public function hojeador($request, $response, array $args)
  {
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $datos = [];
    $params = array_merge($request->getQueryParams(), $request->getParsedBody());
    if (empty($params['cuantos'])) {$params['cuantos'] = 10;}

    if (isset($params['pag'])) {
      $desde = (int) ($params['pag'] * $params['cuantos']);
      $pag = (int) $params['pag'];
      if ($desde < 0) {$desde = 0;}
    } else {
      $desde = 0;
      $pag = 1;
    }
    if (isset($params['columna'])) {
      $columna = $params['columna'];
      if (strpos($params['columna'], 'tx') !== false) {$columna = substr($params['columna'], 2);}
    } else { $columna = '';}

    $datos = [
      'pag' => $pag,
      'desde' => $desde,
      'cuantos' => (int) $params['cuantos'],
      'direccion' => (empty($params['direccion']) ? 'asc' : $params['direccion']),
      'columna' => $columna,
      'hasta' => (int) $params['cuantos'],
      'fecha' => (!isset($params['fecha'])) ? null : vfech($params['fecha']),
      'texto' => (isset($params['texto'])) ? $params['texto'] : null,
    ];
    foreach ($params as $k => $v) {
      if (!array_key_exists($k, $datos)) {
        error_log("parametro faltante en browser: " . $k);
        $datos[$k] = $v;
      }
    }
    $ordenamiento = ($datos['direccion'] == '' || $datos['columna'] == '') ? 'accion desc' : $datos['columna'] . ' ' . $datos['direccion'];
    if ($datos['texto']) {
      $query = 'SELECT SQL_CALC_FOUND_ROWS log.*, nombuser from log left join user on iduser = user_iduser where (accion like "%'.$datos['texto'].'%" or nombuser like "%'.$datos['texto'].'%" ) order by '.$ordenamiento.' limit '.$datos['desde'].','.$datos['cuantos'].';';
      $todas = $db->getAllRecords($query);
    } else {
      $query = 'SELECT SQL_CALC_FOUND_ROWS log.*, nombuser from log left join user on iduser = user_iduser order by '.$ordenamiento.' limit '.$datos['desde'].','.$datos['cuantos'].';';
      $todas = $db->getAllRecords($query);
    }
    $cuantas = $db->getOneRecord('SELECT found_rows()');
    return $response->withJson(array('todos' => $todas, 'cuantas' => $cuantas));
  }
}
