<?php
namespace App;

/**
*
Clase User

*
**/
class User
{
  protected $id;
  protected $nombre;
  protected $tipo;
  protected $path;
  protected $contra;
  /**
  * Accept an array of data matching properties of this class
  * and create the class
  *
  * @param array $data The data to use to create
  */
  public function __construct($logger){$this->logger = $logger;}

  public function newUser(array $data)
  {
    $this->id = $data['iduser'];
    $this->nombre = $data['nombuser'];
    $this->path = $data['path'];
    $this->tipo = $data['tipouser'];
    $this->contra = $data['contuser'];
  }
  public function getId(){ return $this->id;}
  public function getName(){ return $this->nombre;}
  public function getTipo(){ return $this->tipo;}
  public function getPath(){ return $this->path;}
  public function getPass(){ return $this->contra;}

  public function update($request, $response, array $args)
  {
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $sigo = false;
    $usuario = $request->getParsedBody();
    if (isset($usuario['contuser'])) {$usuario['contuser'] = PasswordHash::hash($usuario['contuser']);}
    $condition = array('iduser' => $usuario['iduser']);
    $uploadedFiles = $request->getUploadedFiles();
    if ($uploadedFiles) {
      $uploadedFile = $uploadedFiles[0];
      $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
      $directory = '../assets/images/users/';
      $filename = sprintf('%s.%0.8s', $usuario['nombuser'], $extension);
      $uploadedFile->moveTo($directory . $filename);
      $usuario['path'] = $filename;
    }
    $update = $db->update("user", $usuario, $condition);
    if ($update) {
      if ($sess['iduser'] == $usuario['iduser']) {
        $this->logger->addInfo("Actualizacion de datos propios | " . $sess["nombuser"]);
        $logueo = $db->logger("Actualizacion de datos propios");

      } else {
        $this->logger->addInfo("Actualizacion de usuario con ID:" . $usuario['iduser'] . " | " . $sess["nombuser"]);
        $logueo = $db->logger("Actualizacion de datos de usuario");

      }
      $rta['status'] = "success";
      $rta['message'] = "El usuario se ha actualizado satisfactoriamente";
    } else {
      $rta['status'] = "error";
      $rta['message'] = "Error al actualizar usuario. Revise los campos.";
    }
    return $response->withJson($rta);
  }
  public function getMe($request, $response, array $args)
  {
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $query = "Select * from user where iduser = " . $sess['iduser'];
    $result = $db->getOneRecord($query);
    if ($result) {
      $rta['err'] = 0;
      $rta['user'] = $result;
    } else {
      $rta['err'] = 1;
      $rta['msg'] = "No se encontraron datos de ese usuario.";
    }
    return $response->withJson($rta);
  }
  public function guardar($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $user = [];
    $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
    $uploadedFiles = $request->getUploadedFiles();
    $rta['err'] = 1;
    $rta['status'] = "error";
    $rta['msg'] = "Hubo un error";
    $datos['contuser'] = PasswordHash::hash($datos['contuser']);
    if($uploadedFiles){
      if($datos['iduser'] != 0){
        $condition = array('iduser' => $datos['iduser']);
        $userid = $datos['iduser'];
        unset($datos['iduser']);
        $result = $db->update('user', $datos, $condition);
        $logueo = $db->logger("Actualizacion de usuario");
      }else{
        unset($datos['iduser']);
        $result = $db->insert('user', $datos);
        $logueo = $db->logger("Creacion de usuario");
        $userid = $result['id'];
      }
      if($result){
        $directory = '../../../assets/img/usuarios/';
        if (!file_exists($directory)) {
          mkdir($directory, 0777, true);
        }
        $uploadedFile = $uploadedFiles['imagen'];
        $extension = 'jpg';
        $basename = $userid;
        $filename = sprintf('%s.%0.8s', $basename, $extension);
        $move = $uploadedFile->moveTo($directory.$filename);
        if($move){
          $this->logger->addInfo("Creacion de usuario | ".$sess["nombuser"] );
          $rta['err'] = 0;
          $rta['status'] = "success";
          $rta['msg'] = "El usuario se ha creado!";
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
      if($datos['iduser']){
        $condition = array('iduser' => $datos['iduser']);
        unset($datos['iduser']);
        $result = $db->update('user', $datos, $condition);
        if($result){
          $rta['err'] = 0;
          $rta['status'] = "success";
          $rta['msg'] = "El usuario se ha actualizado";
          $logueo = $db->logger("Actualizacion de usuario");
        }else{
          $rta['err'] = 1;
          $rta['status'] = "error";
          $rta['msg'] = "Hubo un error al actualizar el usuario";
        }
      }
    }
    return $response->withJson($rta);
  }
  public function eliminar($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
    $ide = $datos['iduser'];
    $condition = array('iduser' => $ide);
    if ($sess['iduser'] == $ide) {
      $rta['status'] = "warning";
      $rta['message'] = "No puede eliminarse a si mismo.";
    } else {
      $delete = $db->delete("user", $condition);
      if($delete){
        $delete = unlink('../../../assets/usuarios/' . $ide .'.jpg');
        $this->logger->addInfo("Eliminacion de usuario | ".$sess["nombuser"] );
        $logueo = $db->logger("Eliminacion de usuario");
        $rta['err'] = 0;
        $rta['status'] = "success";
        $rta['msg'] = "El usuario ha sido eliminado.";
      }else{
        $rta['err'] = 1;
        $rta['status'] = "error";
        $rta['msg'] = "Hubo un error al eliminar el usuario.";
      }
    }
    return $response->withJson($rta);
  }
}
