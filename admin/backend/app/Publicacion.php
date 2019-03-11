<?php
namespace App;
/**
*
Clase Publicacion
Cada publicacion estaria representada por una página.
*
**/
class Publicacion
{

  protected $idpublicacion;
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

  function newPublicacion(array $data){
    $this->idpublicacion = data['idpublicacion'];
    $this->titulo = data['titulo'];
    $this->path = data['path'];
    $this->url = data['url'];
    $this->fecha = data['fecha'];
    $this->habilitado = data['habilitado'];
    $this->textohtml = data['textohtml'];
    $this->user_iduser = data['user_iduser'];
  }

  public function get_id(){return $this->idpublicacion;}
  public function get_titulo(){return $this->titulo;}
  public function get_path(){return $this->path;}
  public function get_url(){return $this->url;}
  public function get_fecha(){return $this->fecha;}
  public function get_habilitado(){return $this->habilitado;}
  public function get_textohtml(){return $this->textohtml;}
  public function get_user(){return $this->user_iduser;}

  function getOne( $request,  $response, array $args ){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $query = "SELECT * FROM publicacion WHERE 1";
    $result = $db->getOneRecord($query);
    if($result){
      $rta = $result;
    }
    return $response->withJson($rta);
  }
  public function guardar($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $publicacion = [];
    $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
    $uploadedFiles = $request->getUploadedFiles();
    $rta['err'] = 1;
    $rta['status'] = "error";
    $rta['msg'] = "Hubo un error";
    if($uploadedFiles){
      $datos['user_iduser'] = $sess['iduser'];
      $datos['textohtml'] = html_entity_decode(htmlentities($datos['textohtml']));
      if($datos['idpublicacion'] != 0){
        $condition = array('idpublicacion' => $datos['idpublicacion']);
        $pubId = $datos['idpublicacion'];
        unset($datos['idpublicacion']);
        $result = $db->update('publicacion', $datos, $condition);
        $logueo = $db->logger("Actualizacion de publicacion");
      }else{
        unset($datos['idpublicacion']);
        $result = $db->insert('publicacion', $datos);
        $logueo = $db->logger("Creacion de publicacion");
        $pubId = $result['id'];
      }
      if($result){
        $directory = '../../../assets/publicaciones/'.$pubId.'/';
        if (!file_exists($directory)) {
          mkdir($directory, 0777, true);
        }
        $uploadedFile = $uploadedFiles['imagen'];
        $extension = 'jpg';
        $basename = $pubId;
        $filename = sprintf('%s.%0.8s', $basename, $extension);
        $move = $uploadedFile->moveTo($directory.$filename);
        $this->logger->addInfo("Creacion de publicacion | ".$sess["nombuser"] );
        $rta['err'] = 0;
        $rta['status'] = "success";
        $rta['msg'] = "La publicacion se ha creado!";
      }else{
        $rta['err'] = 2;
        $rta['status'] = "error";
        $rta['msg'] = "Hubo un error al insertar";
      }
    }else{
      if($datos['idpublicacion']){
        $condition = array('idpublicacion' => $datos['idpublicacion']);
        unset($datos['idpublicacion']);
        $result = $db->update('publicacion', $datos, $condition);
        if($result){
          $logueo = $db->logger("Actualizacion de publicacion");
          $rta['err'] = 0;
          $rta['status'] = "success";
          $rta['msg'] = "La publicacion se ha actualizado";
        }else{
          $rta['err'] = 1;
          $rta['status'] = "error";
          $rta['msg'] = "Hubo un error al actualizar la publicacion";
        }
      }
    }
    return $response->withJson($rta);
  }
  public function eliminar($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
    $ide = $datos['idpublicacion'];
    $condition = array('idpublicacion' => $ide);
    if($sess['iduser']){
      $delete = $db->delete("publicacion", $condition);
      $this->logger->addInfo("Eliminacion de publicacion | ".$sess["nombuser"] );
      $deleteF = unlink('../../../assets/publicaciones/'. $ide .'/'. $ide .'.jpg');
    }
    if($delete && $deleteF){
      $logueo = $db->logger("Eliminacion de publicacion");
      $rta['err'] = "0";
      $rta['status'] = "success";
      $rta['msg'] = "La publicacion ha sido eliminado.";
    }else{
      $rta['err'] = 1;
      $rta['status'] = "error";
      $rta['msg'] = "Hubo un error al eliminar el publicacion.";
    }
    return $response->withJson($rta);
  }
}
