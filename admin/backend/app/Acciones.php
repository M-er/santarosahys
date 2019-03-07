<?php
namespace App;
/**
*
Clase Acciones
*
**/
class Acciones
{



  /**
  * Accept an array of data matching properties of this class
  * and create the class
  *
  * @param array $data The data to use to create
  */
  public function __construct($logger) {$this->logger = $logger;}
  public function hojeador($request, $response, array $args)
  {
    $path = '../logs/dydback.log';
    $lines = file($path, FILE_IGNORE_NEW_LINES);
    $rta['err'] = 0;
    $rta['acciones'] = $lines;
    return $response->withJson($rta);

  }
}
