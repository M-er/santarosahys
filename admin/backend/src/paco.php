<?php
require "./dbconfig.php";

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../vendor/adodb/adodb-php/adodb-errorhandler.inc.php';

$driver = 'mysqli';
$adodb = ADONewConnection($driver);
$adodb->connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_NAME);
$adodb->Execute("SET @@lc_time_names = 'es_AR';");
$adodb->cacheSecs = 10;
$adodb->debug = false;
$adodb->setFetchMode(ADODB_FETCH_ASSOC);
$adodb->SetCharSet('utf8');
$adodb->execute("SET NAMES 'utf8'");
$adodb->Execute("SET @@lc_time_names = 'es_AR';");
$adodb->Execute("SET collation_connection = 'utf8_general_ci'");
$adodb->Execute("SET SESSION sql_mode=''");
$tablas = $adodb->GetAll('SHOW TABLES FROM '.$DB_NAME);
$indiceMysql = 'Tables_in_'.$DB_NAME;
$tablasN = [];
foreach ($tablas as $laTabla){
  array_push($tablasN,$laTabla[$indiceMysql]);
}
$tablas = $tablasN;
foreach ($tablas as $laTabla){
  if(substr($laTabla, -4) != 'elim'){
    if(!in_array($laTabla."elim", $tablas)){
      $createScript = $adodb->getAll('SHOW CREATE TABLE '.$laTabla);
      $quito = strlen($createScript[0]['Table'])+16;
      $queryCreate = substr($createScript[0]['Create Table'], $quito);
      $queryCreate = 'CREATE TABLE if not exists  '.$laTabla.'elim '.$queryCreate.';';
      $queryAlter = 'ALTER TABLE '.$laTabla.'elim ADD timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ;';
      $index = $adodb->getAll('SHOW INDEX FROM '.$laTabla);
      $index = $index[0]['Column_name'];
      if($index){
        $triggerBorra="CREATE TRIGGER borra".$laTabla." BEFORE DELETE ON ".$laTabla." FOR EACH ROW INSERT IGNORE INTO ".$laTabla."elim SELECT *, CURRENT_TIMESTAMP FROM ".$laTabla." WHERE ".$index."=OLD.".$index;
        $triggerRecupera="CREATE TRIGGER recupera".$laTabla." BEFORE DELETE ON ".$laTabla."elim FOR EACH ROW INSERT INTO ".$laTabla." SELECT * FROM ".$laTabla."elim WHERE ".$index."=OLD.".$index;
        $resulCrea = $adodb->execute($queryCreate);
        $resulAlter = $adodb->execute($queryAlter);
        $resulTBorra = $adodb->execute($triggerBorra);
        $resulTRecupera = $adodb->execute($triggerRecupera);
        if(($resulCrea && $resulAlter && $resulTBorra && $resulTRecupera) !== false){
          echo "\nExito\n";
        }
      }else{
        echo "No hay indice en ".$laTabla;
      }
    }else{
      /* * * Array para luego comparar atributos * * */
      $arrTbl = [];
      $arrTblEl = [];
      $agregados[] = array();
      /* * * Lista de atributos de las dos tablas * * */
      $attrTbl = $adodb->getAll('DESCRIBE '.$laTabla);
      $attrTblEl = $adodb->getAll('DESCRIBE '.$laTabla.'elim');
      foreach ($attrTbl as $attr){ array_push($arrTbl,$attr['Field']); }
      foreach ($attrTblEl as $attr){ if($attr['Field'] != 'timestamp') array_push($arrTblEl,$attr['Field']); }
      $i = 0;
      foreach ($attrTbl as $attr){
        if(!in_array($attr['Field'],$arrTblEl)){
          $agregados[$i]['campo'] = $attr['Field'];
          $agregados[$i]['tipo'] = $attr['Type'];
          $i++;
        }
      }
      foreach($arrTblEl as $attr){
        if(!in_array($attr,$arrTbl)){
          $query = 'ALTER TABLE '.$laTabla.'elim DROP COLUMN '.$attr.' ;';
          $queryAlter = $adodb->execute($query);
          if($queryAlter !== false ){
            echo $attr." eliminado a ".$laTabla."elim. \n";
          }
        }
      }
      $agregados = array_map('array_filter', $agregados);
      $agregados = array_filter($agregados);
      if(!empty($agregados)){
        foreach ($agregados as $attr) {
          $query = 'ALTER TABLE '.$laTabla.'elim ADD '.$attr['campo'].' '.$attr['tipo'].' DEFAULT NULL ;';
          $queryAlter = $adodb->execute($query);
          if($queryAlter !== false ){
            echo $attr['campo']." agregado a ".$laTabla."elim. \n";
          }
        }
      }
    }
  }
}
echo "He concluido.\n Paco's out\n";
echo "__/\\\\\\\\\\\\\___        _____/\\\\\\\\\____        ________/\\\\\\\\\_        _______/\\\\\______        ";
echo " _\/\\\/////////\\\_        ___/\\\\\\\\\\\\\__        _____/\\\////////__        _____/\\\///\\\____       ";
echo "  _\/\\\_______\/\\\_        __/\\\/////////\\\_        ___/\\\/___________        ___/\\\/__\///\\\__      ";
echo "   _\/\\\\\\\\\\\\\/__        _\/\\\_______\/\\\_        __/\\\_____________        __/\\\______\//\\\_     ";
echo "    _\/\\\/////////____        _\/\\\\\\\\\\\\\\\_        _\/\\\_____________        _\/\\\_______\/\\\_    ";
echo "     _\/\\\_____________        _\/\\\/////////\\\_        _\//\\\____________        _\//\\\______/\\\__   ";
echo "      _\/\\\_____________        _\/\\\_______\/\\\_        __\///\\\__________        __\///\\\__/\\\____  ";
echo "       _\/\\\_____________        _\/\\\_______\/\\\_        ____\////\\\\\\\\\_        ____\///\\\\\/_____ ";
echo "        _\///______________        _\///________\///__        _______\/////////__        ______\/////_______";
echo "";
?>
