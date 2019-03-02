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
  public function guardar($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $servicio = [];
    $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
    $uploadedFiles = $request->getUploadedFiles();
    $rta['err'] = 1;
    $rta['status'] = "error";
    $rta['msg'] = "Hubo un error";
    if($uploadedFiles){
      $datos['user_iduser'] = $sess['iduser'];
      $datos['textohtml'] = html_entity_decode(htmlentities($datos['textohtml']));
      if($datos['idservicio'] != 0){
        $condition = array('idservicio' => $datos['idservicio']);
        $servicioId = $datos['idservicio'];
        unset($datos['idservicio']);
        $result = $db->update('servicio', $datos, $condition);
      }else{
        unset($datos['idservicio']);
        $result = $db->insert('servicio', $datos);
        $servicioId = $result['id'];
      }
      if($result){
        $directory = '../../../assets/servicios/'.$servicioId.'/';
        if (!file_exists($directory)) {
          mkdir($directory, 0777, true);
        }
        $uploadedFile = $uploadedFiles['imagen'];
        // $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
        $extension = 'jpg';
        $basename = $servicioId;
        $filename = sprintf('%s.%0.8s', $basename, $extension);
        $move = $uploadedFile->moveTo($directory.$filename);
        if($move){
          $rta['err'] = 0;
          $rta['status'] = "success";
          $rta['msg'] = "El servicio se ha creado!";
        }else{
          $rta['err'] = 1;
          $rta['status'] = "error";
          $rta['msg'] = "Hubo un error al mover la imagen";
        }
      }else{
        $rta['err'] = 2;
        $rta['status'] = "error";
        $rta['msg'] = "Hubo un error al insertar";
      }
    }else{
      if($datos['idservicio']){
        $condition = array('idservicio' => $datos['idservicio']);

        unset($datos['idservicio']);
        $result = $db->update('servicio', $datos, $condition);
        if($result){
          $rta['err'] = 0;
          $rta['status'] = "success";
          $rta['msg'] = "El servicio se ha actualizado";
        }else{
          $rta['err'] = 1;
          $rta['status'] = "error";
          $rta['msg'] = "Hubo un error al actualizar el servicio";
        }
      }
    }
    return $response->withJson($rta);
  }
  public function eliminar($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
    $ide = $datos['idservicio'];
    $condition = array('idservicio' => $ide);
    if($sess['iduser']){
      $delete = $db->delete("servicio", $condition);
      $this->logger->addInfo("Eliminacion de servicio | ".$sess["nombuser"] );
    }
    if($delete){  $rta['err'] = 1;
      $rta['err'] = "0";
      $rta['status'] = "success";
      $rta['msg'] = "El servicio ha sido eliminado.";
    }else{
      $rta['err'] = 1;
      $rta['status'] = "error";
      $rta['msg'] = "Hubo un error al eliminar el servicio.";
    }
    return $response->withJson($rta);
  }
}
