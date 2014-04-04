delimiter $$

CREATE DATABASE `db_demo` /*!40100 DEFAULT CHARACTER SET utf8 */

CREATE  TABLE `db_demo`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `lastname` VARCHAR(45) NOT NULL ,
  `firstname` VARCHAR(45) NOT NULL ,
  `weight` TINYINT(3) UNSIGNED NULL ,
  `height` SMALLINT UNSIGNED NULL ,
PRIMARY KEY (`user_id`) );

$$

