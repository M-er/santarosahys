<?php
namespace App;
/**
*
 Clase PasswordHash encripta y desencripta las password
*
**/
class PasswordHash {
    // this will be used to generate a hash
    public static function hash($password) {
        return md5($password);
    }
    // this will be used to compare a password against a hash
    public static function check_password($hash, $password) {
        $new_hash = md5($password);
        return ($hash == $new_hash);
    }
}
?>
