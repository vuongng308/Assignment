-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: hethongquanlybanhang
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `thanh_toan`
--

DROP TABLE IF EXISTS `thanh_toan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thanh_toan` (
  `ma_thanh_toan` int NOT NULL AUTO_INCREMENT,
  `ma_don_hang` int DEFAULT NULL,
  `phuong_thuc_thanh_toan` varchar(50) DEFAULT NULL,
  `thoi_gian_thanh_toan` datetime DEFAULT CURRENT_TIMESTAMP,
  `so_tien` decimal(10,2) DEFAULT NULL,
  `thanh_cong` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ma_thanh_toan`),
  KEY `ma_don_hang` (`ma_don_hang`),
  CONSTRAINT `thanh_toan_ibfk_1` FOREIGN KEY (`ma_don_hang`) REFERENCES `don_hang` (`ma_don_hang`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanh_toan`
--

LOCK TABLES `thanh_toan` WRITE;
/*!40000 ALTER TABLE `thanh_toan` DISABLE KEYS */;
INSERT INTO `thanh_toan` VALUES (4,26,'momo','2025-05-08 23:03:02',145000.00,1),(5,27,'momo','2025-05-08 23:58:05',340000.00,1),(6,28,'credit-card','2025-05-09 15:02:20',340000.00,1),(7,30,'vnpay','2025-05-09 15:23:47',330000.00,1),(8,31,'momo','2025-05-09 15:24:59',330000.00,1),(9,32,'momo','2025-05-09 15:34:33',50000.00,1),(10,34,'momo','2025-05-09 16:11:41',125000.00,1),(11,35,'momo','2025-05-09 16:12:54',440000.00,1),(12,36,'credit-card','2025-05-09 17:11:09',760000.00,1),(13,37,'momo','2025-05-09 17:12:29',20000.00,1),(14,39,'credit-card','2025-05-09 17:17:16',20000.00,1),(15,40,'momo','2025-05-09 17:31:08',20000.00,1),(16,41,'momo','2025-05-09 17:32:29',50000.00,1),(17,42,'vnpay','2025-05-09 17:33:38',100000.00,1),(18,43,'momo','2025-05-09 18:09:38',100000.00,1),(19,44,'credit-card','2025-05-09 18:28:03',475000.00,1),(20,45,'momo','2025-05-09 18:44:40',350000.00,1),(21,46,'momo','2025-05-09 18:49:32',400000.00,1);
/*!40000 ALTER TABLE `thanh_toan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-09 21:11:47
