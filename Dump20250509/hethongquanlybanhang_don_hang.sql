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
-- Table structure for table `don_hang`
--

DROP TABLE IF EXISTS `don_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `don_hang` (
  `ma_don_hang` int NOT NULL AUTO_INCREMENT,
  `ma_nguoi_dung` int DEFAULT NULL,
  `thoi_gian_dat` datetime DEFAULT CURRENT_TIMESTAMP,
  `trang_thai` enum('dang_xu_ly','da_thanh_toan','da_huy') DEFAULT 'dang_xu_ly',
  `tong_tien` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ma_don_hang`),
  KEY `ma_nguoi_dung` (`ma_nguoi_dung`),
  CONSTRAINT `don_hang_ibfk_1` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoi_dung` (`ma_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `don_hang`
--

LOCK TABLES `don_hang` WRITE;
/*!40000 ALTER TABLE `don_hang` DISABLE KEYS */;
INSERT INTO `don_hang` VALUES (2,1,'2025-05-08 15:57:11','dang_xu_ly',205000.00),(3,1,'2025-05-08 17:44:26','dang_xu_ly',100000.00),(4,1,'2025-05-08 17:46:22','dang_xu_ly',140000.00),(5,1,'2025-05-08 19:45:30','dang_xu_ly',325000.00),(6,1,'2025-05-08 19:46:16','dang_xu_ly',120000.00),(7,1,'2025-05-08 19:53:24','dang_xu_ly',100000.00),(8,1,'2025-05-08 20:10:31','dang_xu_ly',150000.00),(9,1,'2025-05-08 20:12:46','dang_xu_ly',200000.00),(10,1,'2025-05-08 20:20:28','dang_xu_ly',200000.00),(11,1,'2025-05-08 21:18:34','dang_xu_ly',200000.00),(12,1,'2025-05-08 21:32:03','dang_xu_ly',200000.00),(13,1,'2025-05-08 21:35:30','dang_xu_ly',200000.00),(14,1,'2025-05-08 21:37:20','dang_xu_ly',50000.00),(15,1,'2025-05-08 22:00:18','dang_xu_ly',50000.00),(16,1,'2025-05-08 22:03:01','dang_xu_ly',50000.00),(17,1,'2025-05-08 22:03:06','dang_xu_ly',100000.00),(18,1,'2025-05-08 22:14:42','dang_xu_ly',485000.00),(19,1,'2025-05-08 22:25:31','dang_xu_ly',470000.00),(20,1,'2025-05-08 22:27:47','dang_xu_ly',470000.00),(21,1,'2025-05-08 22:28:45','dang_xu_ly',470000.00),(22,1,'2025-05-08 22:29:21','dang_xu_ly',470000.00),(23,1,'2025-05-08 22:33:12','dang_xu_ly',250000.00),(24,1,'2025-05-08 22:41:14','dang_xu_ly',250000.00),(25,1,'2025-05-08 22:51:56','dang_xu_ly',340000.00),(26,1,'2025-05-08 23:02:58','dang_xu_ly',145000.00),(27,1,'2025-05-08 23:58:02','dang_xu_ly',340000.00),(28,1,'2025-05-09 15:02:15','dang_xu_ly',340000.00),(30,1,'2025-05-09 15:23:42','dang_xu_ly',330000.00),(31,1,'2025-05-09 15:24:56','dang_xu_ly',330000.00),(32,1,'2025-05-09 15:34:30','dang_xu_ly',50000.00),(33,1,'2025-05-09 16:01:22','dang_xu_ly',125000.00),(34,1,'2025-05-09 16:10:43','dang_xu_ly',125000.00),(35,1,'2025-05-09 16:12:51','dang_xu_ly',440000.00),(36,1,'2025-05-09 17:11:06','dang_xu_ly',760000.00),(37,1,'2025-05-09 17:12:27','dang_xu_ly',20000.00),(38,1,'2025-05-09 17:15:24','dang_xu_ly',20000.00),(39,1,'2025-05-09 17:17:06','dang_xu_ly',20000.00),(40,1,'2025-05-09 17:31:05','dang_xu_ly',20000.00),(41,1,'2025-05-09 17:32:27','dang_xu_ly',50000.00),(42,1,'2025-05-09 17:33:35','dang_xu_ly',100000.00),(43,1,'2025-05-09 18:09:33','dang_xu_ly',100000.00),(44,1,'2025-05-09 18:28:00','dang_xu_ly',475000.00),(45,1,'2025-05-09 18:44:38','dang_xu_ly',350000.00),(46,1,'2025-05-09 18:49:30','dang_xu_ly',400000.00);
/*!40000 ALTER TABLE `don_hang` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-09 21:11:48
