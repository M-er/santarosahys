<?php
namespace App;
/**
*
Clase curso
Cada curso estaria representado por una página.
*
**/
class Curso
{

  protected $idcurso;
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

  function newcurso(array $data){
    $this->idcurso = data['idcurso'];
    $this->titulo = data['titulo'];
    $this->path = data['path'];
    $this->url = data['url'];
    $this->habilitado = data['habilitado'];
    $this->textohtml = data['textohtml'];
    $this->user_iduser = data['user_iduser'];
  }

  public function get_id(){return $this->idcurso;}
  public function get_titulo(){return $this->titulo;}
  public function get_path(){return $this->path;}
  public function get_url(){return $this->url;}
  public function get_habilitado(){return $this->habilitado;}
  public function get_textohtml(){return $this->textohtml;}
  public function get_user(){return $this->user_iduser;}

  function getOne( $request,  $response, array $args ){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $query = "SELECT * FROM curso WHERE 1";
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
    $ide = $args['idcurso'];
    $condition = array('idcurso' => $ide);

    if($sess['iduser']){
      $delete = $db->delete("curso", $condition);
      $this->logger->addInfo("Eliminacion de curso | ".$sess["nombuser"] );
    }
    if($delete){
      $rta['status'] = "success";
      $rta['message'] = "El curso ha sido eliminado.";
    }else{
      $rta['status'] = "error";
      $rta['message'] = "Hubo un error al eliminar el curso.";
    }
    return $response->withJson($rta);
  }
}
