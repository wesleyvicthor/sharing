SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `sharing` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
USE `sharing` ;

-- -----------------------------------------------------
-- Table `sharing`.`university`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sharing`.`university` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(155) NULL ,
  `description` TEXT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_general_ci;

-- -----------------------------------------------------
-- Table `sharing`.`course`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sharing`.`course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL ,
  `university_id` INT NOT NULL ,
  PRIMARY KEY (`id`, `university_id`) ,
  INDEX `fk_course_university1_idx` (`university_id` ASC) ,
  CONSTRAINT `fk_course_university1`
    FOREIGN KEY (`university_id` )
    REFERENCES `sharing`.`university` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_general_ci;


-- -----------------------------------------------------
-- Table `sharing`.`user`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sharing`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(155) NULL ,
  `university_id` INT NULL ,
  `course_id` INT NULL ,
  `type` ENUM('STUDENT', 'TEACHER') NULL ,
  `active` ENUM('0','1') NULL DEFAULT '0' ,
  `passw` VARCHAR(255) NULL ,
  `email` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`, `university_id`, `course_id`) ,
  INDEX `fk_university_idx` (`university_id` ASC) ,
  INDEX `fk_course_idx` (`course_id` ASC) ,
  CONSTRAINT `fk_university`
    FOREIGN KEY (`university_id` )
    REFERENCES `sharing`.`university` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_user`
    FOREIGN KEY (`course_id` )
    REFERENCES `sharing`.`course` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_general_ci;

-- -----------------------------------------------------
-- Table `sharing`.`group`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sharing`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(155) NULL ,
  `description` VARCHAR(200) NULL ,
  `owner_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_user_groups_idx` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_general_ci;


-- -----------------------------------------------------
-- Table `sharing`.`userGroup`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sharing`.`userGroup` (
  `groups_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL ,
  `university_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  PRIMARY KEY (`groups_id`, `user_id`, `university_id`, `course_id`) ,
  INDEX `fk_user_group_1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_user_userGroup`
    FOREIGN KEY (`user_id` )
    REFERENCES `sharing`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_general_ci;


-- -----------------------------------------------------
-- Table `sharing`.`assets`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sharing`.`assets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(155) NULL ,
  `url` TEXT NULL ,
  `owner_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_assets_1_idx` (`owner_id` ASC) ,
  CONSTRAINT `fk_user_assets`
    FOREIGN KEY (`owner_id` )
    REFERENCES `sharing`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_general_ci;


-- -----------------------------------------------------
-- Table `sharing`.`userAssetShare`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sharing`.`userAssetShare` (
  `asset_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  PRIMARY KEY (`asset_id`, `user_id`) ,
  INDEX `fk_user_asset_share_1_idx` (`user_id` ASC) ,
  INDEX `fk_user_asset_share_1_idx1` (`asset_id` ASC) ,
  CONSTRAINT `fk_user_assetShare`
    FOREIGN KEY (`user_id` )
    REFERENCES `sharing`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_asset_userAssetShare`
    FOREIGN KEY (`asset_id` )
    REFERENCES `sharing`.`assets` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_general_ci;


-- -----------------------------------------------------
-- Table `sharing`.`groupAssetShare`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `sharing`.`groupAssetShare` (
  `groups_id` INT NOT NULL ,
  `asset_id` INT NOT NULL ,
  PRIMARY KEY (`groups_id`, `asset_id`) ,
  INDEX `fk_groups_idx` (`groups_id` ASC) ,
  INDEX `fk_asset_idx` (`asset_id` ASC) ,
  CONSTRAINT `fk_group`
    FOREIGN KEY (`groups_id` )
    REFERENCES `sharing`.`group` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_asset`
    FOREIGN KEY (`asset_id` )
    REFERENCES `sharing`.`assets` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_general_cs;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
