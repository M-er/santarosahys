<?php
namespace App;
/**
*
Clase Institucional
*
**/
class Institucional
{


  protected $path;
  protected $tipo;
  protected $titulo;
  protected $categoria;
  protected $habilitado;
  protected $user_iduser;
  protected $idinstitucional;
  /**
  * Accept an array of data matching properties of this class
  * and create the class
  *
  * @param array $data The data to use to create
  */
  public function __construct($logger) {$this->logger = $logger;}

  function newInstitucional(array $data){
    $this->path = $data['path'];
    $this->tipo = $data['tipo'];
    $this->titulo = $data['titulo'];
    $this->categoria = $data['categoria'];
    $this->habilitado = $data['habilitado'];
    $this->user_iduser = $data['user_iduser'];
    $this->idinstitucional = $data['idinstitucional'];
  }
  public function get_path(){ return $this->path;}
  public function get_tipo(){ return $this->tipo;}
  public function get_titulo(){ return $this->titulo;}
  public function get_categoria(){ return $this->categoria;}
  public function get_habilitado(){ return $this->habilitado;}
  public function get_user_iduser(){ return $this->user_iduser;}
  public function get_idinstitucional(){ return $this->idinstitucional;}

  function getOne( $request,  $response, array $args ){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $query = "SELECT * FROM institucional WHERE 1";
    $result = $db->getOneRecord($query);
    if($result){
      $rta = $result;
    }
    return $response->withJson($rta);
  }
  public function guardar($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $institucional = [];
    $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
    $uploadedFiles = $request->getUploadedFiles();
    $rta['err'] = 1;
    $rta['status'] = "error";
    $rta['msg'] = "Hubo un error";
    if($uploadedFiles){
      switch ($datos['categoria']) {
        case 'Del agro':$categoria = 'aa/';break;
        case 'De la construcción':$categoria = 'ca/';break;
        case 'Enfermedades profesionales':$categoria = 'ea/';break;
        case 'Leyes generales':$categoria = 'ga/';break;
        case 'De la mineria':$categoria = 'ma/';break;
        case 'Protocolos':$categoria = 'pa/';break;
        case 'Servicios de salud y seguridad':$categoria = 'sa/';break;
      }

      $datos['user_iduser'] = $sess['iduser'];
      if($datos['idinstitucional'] != 0){
        $condition = array('idinstitucional' => $datos['idinstitucional']);
        $instId = $datos['idinstitucional'];
        unset($datos['idinstitucional']);
        $result = $db->update('institucional', $datos, $condition);
      }else{
        unset($datos['idinstitucional']);
        $result = $db->insert('institucional', $datos);
        $instId = $result['id'];
      }
      if($result){
        $directory = '../../../assets/pdf/'.$categoria;
        if (!file_exists($directory)) {
          mkdir($directory, 0777, true);
        }
        $uploadedFile = $uploadedFiles['pdf'];
        $extension = 'pdf';
        $basename = $instId;
        $filename = sprintf('%s.%0.8s', $basename, $extension);
        $move = $uploadedFile->moveTo($directory.$filename);
          $this->logger->addInfo("Creacion de documentacion institucional | ".$sess["nombuser"] );
          $logueo = $db->logger("Creacion de documentacion institucional");
          $rta['err'] = 0;
          $rta['status'] = "success";
          $rta['msg'] = "El documento se ha creado!";
      }else{
        $rta['err'] = 2;
        $rta['status'] = "error";
        $rta['msg'] = "Hubo un error al insertar";
      }
    }else{
      if($datos['idinstitucional']){
        $condition = array('idinstitucional' => $datos['idinstitucional']);
        unset($datos['idinstitucional']);
        $result = $db->update('institucional', $datos, $condition);
        if($result){
          $logueo = $db->logger("Actualizacion de documentacion institucional");
          $rta['err'] = 0;
          $rta['status'] = "success";
          $rta['msg'] = "El documento se ha actualizado";
        }else{
          $rta['err'] = 1;
          $rta['status'] = "error";
          $rta['msg'] = "Hubo un error al actualizar el documento";
        }
      }
    }
    return $response->withJson($rta);
  }
  public function eliminar($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
    $ide = $datos['idinstitucional'];
    $condition = array('idinstitucional' => $ide);
    switch ($datos['categoria']) {
        case 'Del agro':$categoria = 'aa/';break;
        case 'De la construcción':$categoria = 'ca/';break;
        case 'Enfermedades profesionales':$categoria = 'ea/';break;
        case 'Leyes generales':$categoria = 'ga/';break;
        case 'De la mineria':$categoria = 'ma/';break;
        case 'Protocolos':$categoria = 'pa/';break;
        case 'Servicios de salud y seguridad':$categoria = 'sa/';break;
      }
    if($sess['iduser']){
      $delete = $db->delete("institucional", $condition);
      if($delete){
        $delete = unlink('../../../assets/pdf/'.$categoria.'/' . $ide .'.pdf');
        $this->logger->addInfo("Eliminacion de documentacion institucional | ".$sess["nombuser"] );
      }
    }
    if($delete){
      $logueo = $db->logger("Eliminacion de documentacion institucional");
      $rta['err'] = 0;
      $rta['status'] = "success";
      $rta['msg'] = "El documento ha sido eliminado.";
    }else{
      $rta['err'] = 1;
      $rta['status'] = "error";
      $rta['msg'] = "Hubo un error al eliminar el documento.";
    }
    return $response->withJson($rta);
  }
}
