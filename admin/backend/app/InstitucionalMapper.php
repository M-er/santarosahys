<?php
namespace App;
/**
*
Clase InstitucionalMapper
Es un conjunto de institucionales
*
**/
class InstitucionalMapper extends Mapper
{

	public function construccion( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%construccion%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function agro( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%agro%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function mineria( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%mineria%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function enfprofesionales( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%profesionales%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function protocolos( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%protocolos%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function generales( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%generales%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function servicios( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%servicios%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function getAll( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
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
			'columna' => ($columna == 'usuario')? 'nombuser' : $columna,
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
		$ordenamiento = ($datos['direccion'] == '' || $datos['columna'] == '') ? 'nombuser desc' : $datos['columna'] . ' ' . $datos['direccion'];
		if ($datos['texto']) {
			$query = 'SELECT SQL_CALC_FOUND_ROWS institucional.*, nombuser from institucional left join user on iduser = user_iduser where (categoria like "%'.$datos['texto'].'%" or titulo like "%'.$datos['texto'].'%" or nombuser like "%'.$datos['texto'].'%" ) order by '.$ordenamiento.' limit '.$datos['desde'].','.$datos['cuantos'].';';
			$todas = $db->getAllRecords($query);
		} else {
			$query = 'SELECT SQL_CALC_FOUND_ROWS institucional.*, nombuser from institucional left join user on iduser = user_iduser order by '.$ordenamiento.' limit '.$datos['desde'].','.$datos['cuantos'].';';
			$todas = $db->getAllRecords($query);
		}
		$cuantas = $db->getOneRecord('SELECT found_rows()');
		return $response->withJson(array('todos' => $todas, 'cuantas' => $cuantas));
	}
}
