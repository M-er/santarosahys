<?php
namespace App;
use PDO;

/**
*
Clase DBHandler para el manejo de la base de datos
*
**/
class DBHandler extends DB{
  /**
  Fetching single record
  **/
  function __construct() {
    $this->conn = $this->db_connect();
  }

  public function getOneRecord($query) {
    $r = $this->conn->query($query.' LIMIT 1') or die($this->conn->error.__LINE__);
    return $result = $r->fetch(PDO::FETCH_ASSOC);
  }
  public function getAllRecords($query) {
    $r = $this->conn->query($query) or die($this->conn->error.__LINE__);
    //return $result = $r->fetch(PDO::FETCH_ASSOC);
    return $result = $r->fetchAll(PDO::FETCH_ASSOC);
  }
  public function insert($table, $data)
  {
    if (!empty($data) && is_array($data)) {
      $columns = '';
      $values  = '';
      $i = 0;
      $columnString = implode(',', array_keys($data));
      $valueString = ":".implode(',:', array_keys($data));
      $sql = "INSERT INTO ".$table." (".$columnString.") VALUES (".$valueString.")";
      $query = $this->conn->prepare($sql);
      foreach ($data as $key=>$val) {
        $val = htmlspecialchars(strip_tags($val));
        $query->bindValue(':'.$key, $val);
      }
      $insert = $query->execute();
      if ($insert) {
        $data['id'] = $this->conn->lastInsertId();
        return $data;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  /*
  * Update data into the database
  * @param string name of the table
  * @param array the data for updating into the table
  * @param array where condition on updating data
  */
  public function update($table, $data, $conditions)
  {
    if (!empty($data) && is_array($data)) {
      $colvalSet = '';
      $whereSql = '';
      $i = 0;
      foreach ($data as $key=>$val) {
        $pre = ($i > 0)?', ':'';
        $val = htmlspecialchars(strip_tags($val));
        $colvalSet .= $pre.$key."='".$val."'";
        $i++;
      }
      if (!empty($conditions)&& is_array($conditions)) {
        $whereSql .= ' WHERE ';
        $i = 0;
        foreach ($conditions as $key => $value) {
          $pre = ($i > 0)?' AND ':'';
          $whereSql .= $pre.$key." = '".$value."'";
          $i++;
        }
      }
      $sql = "UPDATE ".$table." SET ".$colvalSet.$whereSql;
      $query = $this->conn->prepare($sql);
      $update = $query->execute();
      return $update?true:false;
    } else {
      return false;
    }
  }
  /*
  * Log data into the database
  * @param string accion with the accion it self
  */
  public function logger($accion){
    $sess   = Session::loggedInfo();
    $user   = $sess['iduser'];
    $userIp = $this->getUserIP();
    $sql = "INSERT INTO log(accion, direccionIp, user_iduser) VALUES ('".$accion."','".$userIp."',".$user.");";
    $query = $this->conn->prepare($sql);
    $logueo = $query->execute();
    return $logueo;
  }

  /*
  * Delete data from the database
  * @param string name of the table
  * @param array where condition on deleting data
  */

  public function delete($table, $conditions)
  {
    $whereSql = '';
    if (!empty($conditions)&& is_array($conditions)) {
      $whereSql .= ' WHERE ';
      $i = 0;
      foreach ($conditions as $key => $value) {
        $pre = ($i > 0)?' AND ':'';
        $whereSql .= $pre.$key." = '".$value."'";
        $i++;
      }
    }
    $sql = "DELETE FROM ".$table.$whereSql;
    $delete = $this->conn->exec($sql);
    return $delete?$delete:false;
  }
  public function getHandler(){
    return new DBHandler();
  }
  public function getUserIP()
  {
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
      $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
      $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
    }
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
      $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
      $ip = $forward;
    }
    else
    {
      $ip = $remote;
    }

    return $ip;
  }


}
?>
