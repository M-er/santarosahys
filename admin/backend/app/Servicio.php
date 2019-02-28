<?php
namespace App;
/**
*
Clase Servicio
Cada servicio estaria representado por una página.
*
**/
class Servicio
{

  protected $idservicio;
  protected $titulo;
  protected $path;
  protected $url;
  protected $habilitado;
  protected $textohtml;
  protected $user_iduser;

  /**
  * Accept an array of data matching properties of this class
  * and create the class
  *
  * @param array $data The data to use to create
  */
  public function __construct($logger) {$this->logger = $logger;}

  function newServicio(array $data){
    $this->idservicio = data['idservicio'];
    $this->titulo = data['titulo'];
    $this->path = data['path'];
    $this->url = data['url'];
    $this->habilitado = data['habilitado'];
    $this->textohtml = data['textohtml'];
    $this->user_iduser = data['user_iduser'];
  }

  public function get_id(){return $this->idservicio;}
  public function get_titulo(){return $this->titulo;}
  public function get_path(){return $this->path;}
  public function get_url(){return $this->url;}
  public function get_habilitado(){return $this->habilitado;}
  public function get_textohtml(){return $this->textohtml;}
  public function get_user(){return $this->user_iduser;}

  function getOne( $request,  $response, array $args ){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $query = "SELECT * FROM servicio WHERE 1";
    $result = $db->getOneRecord($query);
    if($result){
      $rta = $result;
    }
    return $response->withJson($rta);
  }
  public function save($request, $response, array $args){}
  public function delete($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $ide = $args['idservicio'];
    $condition = array('idservicio' => $ide);

    if($sess['iduser']){
      $delete = $db->delete("servicio", $condition);
      $this->logger->addInfo("Eliminacion de servicio | ".$sess["nombuser"] );
    }
    if($delete){
      $rta['status'] = "success";
      $rta['message'] = "El servicio ha sido eliminado.";
    }else{
      $rta['status'] = "error";
      $rta['message'] = "Hubo un error al eliminar el servicio.";
    }
    return $response->withJson($rta);
  }
}
