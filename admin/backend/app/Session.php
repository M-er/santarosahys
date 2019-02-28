<?php
namespace App;
/**
*
Clase Session para retornar, crear o eliminar sessiones
*
**/
class Session
{
	function __construct($logger) { $this->logger = $logger; }
	function loggedInfo(){
		if (!isset($_SESSION)) { session_start(); }
		$sess = array();
		if(isset($_SESSION['iduser']))
		{
			$sess["iduser"] = $_SESSION['iduser'];
			$sess["nombuser"] = $_SESSION['nombuser'];
		}
		else
		{
			$sess["iduser"] = '';
			$sess["nombuser"] = 'Invitado';
		}
		return $sess;
	}
	function getSession( $request, $response, $args ){
		if (!isset($_SESSION)) {
			session_start();
		}
		$rta = array();
		if(isset($_SESSION['iduser']))
		{
			$rta["err"] = 0;
			$rta["iduser"] = $_SESSION['iduser'];
			$rta["nombuser"] = $_SESSION['nombuser'];
		}
		else
		{
			$rta["err"] = 1;
			$rta["iduser"] = '';
			$rta["nombuser"] = 'Invitado';
		}
		return $response->withJson($rta);
	}
	function destroySession(){
		if (!isset($_SESSION)) {
			session_start();
		}
		if(isset($_SESSION['iduser']))
		{
			unset($_SESSION['iduser']);
			unset($_SESSION['nombuser']);
			$info='info';
			if(isset($_COOKIE[$info]))
			{
				setcookie ($info, '', time() - $cookie_time);
			}
			$msg="Se ha deslogueado satisfactoriamente...";
		}

	}
}
?>
