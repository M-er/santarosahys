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
  public function guardar($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $curso = [];
    $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
    $uploadedFiles = $request->getUploadedFiles();
    $rta['err'] = 1;
    $rta['status'] = "error";
    $rta['msg'] = "Hubo un error";
    if($uploadedFiles){
      $datos['user_iduser'] = $sess['iduser'];
      $datos['textohtml'] = html_entity_decode(htmlentities($datos['textohtml']));
      if($datos['idcurso'] != 0){
        $condition = array('idcurso' => $datos['idcurso']);
        $cursoId = $datos['idcurso'];
        unset($datos['idcurso']);
        $result = $db->update('curso', $datos, $condition);
      }else{
        unset($datos['idcurso']);
        $result = $db->insert('curso', $datos);
        $cursoId = $result['id'];
      }
      if($result){
        $directory = '../../../assets/cursos/'.$cursoId.'/';
        if (!file_exists($directory)) {
          mkdir($directory, 0777, true);
        }
        $uploadedFile = $uploadedFiles['imagen'];
        $extension = 'jpg';
        $basename = $cursoId;
        $filename = sprintf('%s.%0.8s', $basename, $extension);
        $move = $uploadedFile->moveTo($directory.$filename);
        $this->logger->addInfo("Creacion de curso | ".$sess["nombuser"] );
        $logueo = $db->logger("Creacion de curso");
        $rta['err'] = 0;
        $rta['status'] = "success";
        $rta['msg'] = "El curso se ha creado!";
      }else{
        $rta['err'] = 2;
        $rta['status'] = "error";
        $rta['msg'] = "Hubo un error al insertar";
      }
    }else{
      if($datos['idcurso']){
        $condition = array('idcurso' => $datos['idcurso']);
        unset($datos['idcurso']);
        if($result){
          $result = $db->update('curso', $datos, $condition);
          $rta['err'] = 0;
          $rta['status'] = "success";
          $rta['msg'] = "El curso se ha actualizado";
        }else{
          $rta['err'] = 1;
          $rta['status'] = "error";
          $rta['msg'] = "Hubo un error al actualizar el curso";
        }
      }
    }
    return $response->withJson($rta);
  }
  public function eliminar($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
    $ide = $datos['idcurso'];
    $condition = array('idcurso' => $ide);
    if($sess['iduser']){
      $delete = $db->delete("curso", $condition);
      $this->logger->addInfo("Eliminacion de curso | ".$sess["nombuser"] );
      $deleteF = unlink('../../../assets/cursos/'. $ide .'/'. $ide .'.jpg');
    }
    if($delete && $deleteF){
      $logueo = $db->logger("Eliminacion de curso");
      $rta['err'] = "0";
      $rta['status'] = "success";
      $rta['msg'] = "El curso ha sido eliminado.";
    }else{
      $rta['err'] = 1;
      $rta['status'] = "error";
      $rta['msg'] = "Hubo un error al eliminar el curso.";
    }
    return $response->withJson($rta);
  }
}