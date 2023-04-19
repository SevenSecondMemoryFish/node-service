CREATE DATABASE 'db-test';

CREATE USER 'test'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'test'@'%';


CREATE TABLE IF NOT EXISTS `db-user`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `username` VARCHAR(100),
   `phone` INT,
   `password` VARCHAR(100),
   `usericon` VARCHAR(40),
   `address` VARCHAR(40),
   `create_date` DATE,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
