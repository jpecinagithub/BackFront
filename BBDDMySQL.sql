-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema blog_unir
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema blog_unir
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `blog_unir` DEFAULT CHARACTER SET utf8mb3 ;
USE `blog_unir` ;

-- -----------------------------------------------------
-- Table `blog_unir`.`autores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_unir`.`autores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `blog_unir`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_unir`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(450) NOT NULL,
  `fecha` DATE NOT NULL,
  `categoria` ENUM('filosofia', 'arte', 'naturaleza') NOT NULL,
  `autores_id` INT NOT NULL,
  PRIMARY KEY (`id`, `autores_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_posts_autores_idx` (`autores_id` ASC) VISIBLE,
  CONSTRAINT `fk_posts_autores`
    FOREIGN KEY (`autores_id`)
    REFERENCES `blog_unir`.`autores` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 87
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
