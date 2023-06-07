/*
SQLyog Trial v13.1.8 (64 bit)
MySQL - 8.0.31 : Database - pms
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`pms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `pms`;

/*Table structure for table `administrator` */

DROP TABLE IF EXISTS `administrator`;

CREATE TABLE `administrator` (
  `aID` char(10) NOT NULL,
  `aName` char(20) DEFAULT NULL,
  `aAccountar` char(20) NOT NULL,
  `aPassword` char(20) NOT NULL,
  PRIMARY KEY (`aID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `administrator` */

insert  into `administrator` values 
('a1','admin','管理员','123456');

/*Table structure for table `drug` */

DROP TABLE IF EXISTS `drug`;

CREATE TABLE `drug` (
  `dID` char(10) NOT NULL,
  `dName` char(20) NOT NULL,
  `dType` char(20) DEFAULT NULL,
  `dFrom` char(20) DEFAULT NULL,
  `dUsage` char(100) DEFAULT NULL,
  `dTaboo` char(100) DEFAULT NULL,
  PRIMARY KEY (`dID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `drug` */

insert  into `drug`(`dID`,`dName`,`dType`,`dFrom`,`dUsage`,`dTaboo`) values 
('d1','阿莫西林胶囊','胶囊剂','西药内用','口服','过敏者禁用'),
('d2','感冒灵颗粒','颗粒剂','中成药','口服',''),
('d3','莲花清温胶囊','胶囊剂','中成药','口服',''),
('d4','左氧氟沙星片','片剂','西药内用','口服','过敏者禁用'),
('d5','头孢曲松钠','注射剂','西药注射','口服','对头孢类过敏者禁用'),
('d6','艾叶','中草药','中草药','口服','');

/*Table structure for table `purchase` */

DROP TABLE IF EXISTS `purchase`;

CREATE TABLE `purchase` (
  `pID` char(10) NOT NULL,
  `dID` char(10) DEFAULT NULL,
  `dName` char(20) DEFAULT NULL,
  `InDate` datetime DEFAULT NULL,
  `pCost` int DEFAULT NULL,
  `pNum` int DEFAULT NULL,
  `pUnit` char(20) DEFAULT NULL,
  `pContact` char(10) DEFAULT NULL,
  `pContactTell` char(15) DEFAULT NULL,
  PRIMARY KEY (`pID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `purchase` */

insert  into `purchase`(`pID`,`dID`,`dName`,`InDate`,`pCost`,`pNum`,`pUnit`,`pContact`,`pContactTell`) values 
('p001','d2','感冒灵颗粒','2023-05-27 20:47:44',20,30,'厂家A','AA','11111111'),
('P002','d3','莲花清温胶囊','2023-05-25 20:54:46',25,40,'厂家B','BB','22222222'),
('p003','d1','阿莫西林胶囊','2023-05-26 20:57:32',30,50,'厂家C','CC','33333333');

/*Table structure for table `sale` */

DROP TABLE IF EXISTS `sale`;

CREATE TABLE `sale` (
  `sID` char(10) NOT NULL,
  `dID` char(10) DEFAULT NULL,
  `dName` char(20) DEFAULT NULL,
  `sCost` int DEFAULT NULL,
  `sNum` int DEFAULT NULL,
  `OutDate` datetime DEFAULT NULL,
  PRIMARY KEY (`sID`),
  KEY `dID` (`dID`),
  CONSTRAINT `sale_ibfk_1` FOREIGN KEY (`dID`) REFERENCES `drug` (`dID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `sale` */

insert  into `sale`(`sID`,`dID`,`dName`,`sCost`,`sNum`,`OutDate`) values 
('s001','d1','阿莫西林胶囊',40,10,'2023-06-01 20:58:31'),
('s002','d2','感冒灵颗粒',35,20,'2023-06-02 20:59:04');

/*Table structure for table `stock` */

DROP TABLE IF EXISTS `stock`;

CREATE TABLE `stock` (
  `dID` char(10) NOT NULL,
  `dName` char(20) NOT NULL,
  `dStock` int DEFAULT NULL,
  `dExp` datetime DEFAULT NULL,
  PRIMARY KEY (`dID`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`dID`) REFERENCES `drug` (`dID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `stock` */

insert  into `stock`(`dID`,`dName`,`dStock`,`dExp`) values 
('d1','阿莫西林胶囊',100,'2025-06-07 21:03:52'),
('d2','感冒灵颗粒',200,'2025-07-28 21:04:26'),
('d3','莲花清温胶囊',150,'2025-07-28 21:04:55'),
('d4','左氧氟沙星片',120,'2025-05-15 21:05:20'),
('d5','头孢曲松钠',150,'2024-12-21 21:05:38'),
('d6','艾叶',50,'2024-10-17 21:05:57');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
SELECT `administrator`.`aID`,
    `administrator`.`aName`,
    `administrator`.`aAccountar`,
    `administrator`.`aPassword`
FROM `pms`.`administrator`;
