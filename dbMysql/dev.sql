CREATE DATABASE 'db-test';

CREATE USER 'test'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'test'@'%';


CREATE TABLE IF NOT EXISTS `db_user`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `username` VARCHAR(100),
   `phone` INT,
   `password` VARCHAR(100),
   `usericon` VARCHAR(40),
   `address` VARCHAR(40),
   `create_date` DATE,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


create table if not exists `db_felocation`(
    `id` int UNSIGNED AUTO_INCREMENT,
    `version` int comment '版本',
    `path` varchar (40) comment '路径',
    `app_buildId` varchar (20) comment 'app包名',
    `commit_id` varchar (20) comment '代码commit',
    `status` int default 0 comment '状态码：0 未上架，1上架',
    `create_date` DATE,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

alter table `db_felocation` change app_buildId  app_build_id varchar (20) comment 'app包名';

alter table `db_felocation` modify column path varchar (500) comment '路径';
