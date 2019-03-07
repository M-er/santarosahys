<?php
namespace App;
/**
*
Clase Product
*
**/
class Product
{
    protected $idprod;
    protected $nombprod;
    protected $cantprod;
    protected $imgprod;
    protected $user_iduser;
    protected $descripcion;
    protected $precio;
    /**
     * Accept an array of data matching properties of this class
     * and create the class
     *
     * @param array $data The data to use to create
     */
    public function __construct($logger) {$this->logger = $logger;}

    function newProduct(array $data){
        $this->precio = $data['precio'];
        $this->imgprod = $data['imgprod'];
        $this->idprod = $data['idProduct'];
        $this->cantprod = $data['cantprod'];
        $this->nombre = $data['nombProduct'];
        $this->descripcion = $data['descripcion'];
        $this->user_iduser = $data['user_iduser'];
    }
    public function get_nombre(){return $this->nombre;}
    public function get_precio(){return $this->precio;}
    public function get_idprod(){return $this->idprod;}
    public function get_imgprod(){return $this->imgprod;}
    public function get_cantprod(){return $this->cantprod;}
    public function get_descripcion(){return $this->descripcion;}
    public function get_user_iduser(){return $this->user_iduser;}

    function getOne( $request,  $response, array $args ){
        $sess = Session::loggedInfo();
        $db = DBHandler::getHandler();
        $query = "Select * from producto where idprod = 1";//OJO verlo bien
        $result = $db->getOneRecord($query);
        if($result){
            $rta = $result;
        }
        return $response->withJson($rta);
    }

    public function guardar($request, $response, array $args){
      $sess = Session::loggedInfo();
      $db = DBHandler::getHandler();
      $producto = [];
      $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
      $uploadedFiles = $request->getUploadedFiles();
      $rta['err'] = 1;
      $rta['status'] = "error";
      $rta['msg'] = "Hubo un error";
      if($uploadedFiles){
        $datos['user_iduser'] = $sess['iduser'];
        // $datos['textohtml'] = html_entity_decode(htmlentities($datos['textohtml']));
        if($datos['idprod'] != 0){
          $condition = array('idprod' => $datos['idprod']);
          $prodId = $datos['idprod'];
          unset($datos['idprod']);
          $result = $db->update('producto', $datos, $condition);
        }else{
          unset($datos['idprod']);
          $result = $db->insert('producto', $datos);
          $prodId = $result['id'];
        }
        if($result){
          $directory = '../../../assets/productos/'.$prodId.'/';
          if (!file_exists($directory)) {
            mkdir($directory, 0777, true);
          }
          $uploadedFile = $uploadedFiles['imagen'];
          $extension = 'jpg';
          $basename = $prodId;
          $filename = sprintf('%s.%0.8s', $basename, $extension);
          $move = $uploadedFile->moveTo($directory.$filename);
          if($move){
            $rta['err'] = 0;
            $rta['status'] = "success";
            $rta['msg'] = "El producto se ha creado!";
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
        if($datos['idprod']){
          $condition = array('idprod' => $datos['idprod']);

          unset($datos['idprod']);
          $result = $db->update('producto', $datos, $condition);
          if($result){
            $this->logger->addInfo("Creacion de producto | ".$sess["nombuser"] );
            $rta['err'] = 0;
            $rta['status'] = "success";
            $rta['msg'] = "El producto se ha actualizado";
          }else{
            $rta['err'] = 1;
            $rta['status'] = "error";
            $rta['msg'] = "Hubo un error al actualizar el producto";
          }
        }
      }
      return $response->withJson($rta);
    }
    public function eliminar($request, $response, array $args){
      $sess = Session::loggedInfo();
      $db = DBHandler::getHandler();
      $datos = array_merge($request->getQueryParams(),$request->getParsedBody());
      $ide = $datos['idprod'];
      $condition = array('idprod' => $ide);
      if($sess['iduser']){
        $delete = $db->delete("producto", $condition);
        $this->logger->addInfo("Eliminacion de producto | ".$sess["nombuser"] );
      }
      if($delete){  $rta['err'] = 1;
        $rta['err'] = "0";
        $rta['status'] = "success";
        $rta['msg'] = "La producto ha sido eliminado.";
      }else{
        $rta['err'] = 1;
        $rta['status'] = "error";
        $rta['msg'] = "Hubo un error al eliminar el producto.";
      }
      return $response->withJson($rta);
    }

}
