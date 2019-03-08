-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_dyd
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_dyd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_dyd` DEFAULT CHARACTER SET latin1 ;
USE `db_dyd` ;

-- -----------------------------------------------------
-- Table `db_dyd`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyd`.`user` (
  `iduser` INT(11) NOT NULL AUTO_INCREMENT,
  `tipouser` TINYINT(1) NOT NULL,
  `path` VARCHAR(200) NULL DEFAULT 'nopic.png',
  `nombuser` VARCHAR(45) NOT NULL,
  `contuser` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `iduser_UNIQUE` (`iduser` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyd`.`curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyd`.`curso` (
  `idcurso` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `habilitado` TINYINT(1) NOT NULL DEFAULT '1',
  `textohtml` VARCHAR(200) NOT NULL,
  `user_iduser` INT(11) NOT NULL,
  `fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcurso`),
  UNIQUE INDEX `idservicio_UNIQUE` (`idcurso` ASC),
  INDEX `fk_servicio_user1_idx` (`user_iduser` ASC),
  CONSTRAINT `fk_servicio_user10`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `db_dyd`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `db_dyd`.`institucional`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyd`.`institucional` (
  `idinstitucional` INT(11) NOT NULL AUTO_INCREMENT,
  `habilitado` TINYINT(1) NOT NULL DEFAULT '1',
  `categoria` VARCHAR(100) NOT NULL DEFAULT 'Sin categoria',
  `path` VARCHAR(150) NOT NULL,
  `titulo` VARCHAR(100) NOT NULL DEFAULT 'Sin titulo',
  `tipo` TINYINT(1) NOT NULL,
  `user_iduser` INT(11) NOT NULL,
  PRIMARY KEY (`idinstitucional`),
  INDEX `fk_inst_user1_idx` (`user_iduser` ASC),
  CONSTRAINT `fk_inst_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `db_dyd`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 26
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `db_dyd`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyd`.`producto` (
  `idprod` INT(11) NOT NULL AUTO_INCREMENT,
  `nombprod` VARCHAR(45) NOT NULL,
  `cantprod` INT(11) NOT NULL,
  `user_iduser` INT(11) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `precio` INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idprod`),
  UNIQUE INDEX `idproducto_UNIQUE` (`idprod` ASC),
  INDEX `fk_producto_user_idx` (`user_iduser` ASC),
  CONSTRAINT `fk_producto_user`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `db_dyd`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyd`.`publicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyd`.`publicacion` (
  `idpublicacion` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `url` VARCHAR(100) NULL DEFAULT NULL,
  `habilitado` TINYINT(1) NOT NULL,
  `textohtml` TEXT NOT NULL,
  `fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_iduser` INT(11) NOT NULL,
  PRIMARY KEY (`idpublicacion`),
  UNIQUE INDEX `idservicio_UNIQUE` (`idpublicacion` ASC),
  INDEX `fk_servicio_user1_idx` (`user_iduser` ASC),
  CONSTRAINT `fk_servicio_user100`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `db_dyd`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `db_dyd`.`servicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyd`.`servicio` (
  `idservicio` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `habilitado` TINYINT(1) NOT NULL DEFAULT '1',
  `textohtml` VARCHAR(200) NOT NULL,
  `user_iduser` INT(11) NOT NULL,
  `fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idservicio`),
  UNIQUE INDEX `idservicio_UNIQUE` (`idservicio` ASC),
  INDEX `fk_servicio_user1_idx` (`user_iduser` ASC),
  CONSTRAINT `fk_servicio_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `db_dyd`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `db_dyd`.`log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyd`.`log` (
  `idlog` INT NOT NULL AUTO_INCREMENT,
  `accion` VARCHAR(100) NOT NULL,
  `direccionIp` VARCHAR(30) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_iduser` INT(11) NOT NULL,
  PRIMARY KEY (`idlog`),
  UNIQUE INDEX `idlog_UNIQUE` (`idlog` ASC),
  INDEX `fk_log_user1_idx` (`user_iduser` ASC),
  CONSTRAINT `fk_log_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `db_dyd`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
