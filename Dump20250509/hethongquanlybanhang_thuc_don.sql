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
-- Table structure for table `thuc_don`
--

DROP TABLE IF EXISTS `thuc_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thuc_don` (
  `ma_mon_an` int NOT NULL AUTO_INCREMENT,
  `danh_muc` varchar(50) DEFAULT NULL,
  `ten_mon_an` varchar(100) DEFAULT NULL,
  `mo_ta` text,
  `gia` decimal(10,2) DEFAULT NULL,
  `url_hinh_anh` varchar(255) DEFAULT NULL,
  `co_san` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ma_mon_an`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuc_don`
--

LOCK TABLES `thuc_don` WRITE;
/*!40000 ALTER TABLE `thuc_don` DISABLE KEYS */;
INSERT INTO `thuc_don` VALUES (1,'Cupcake','Cupcake mềm','150 kcal, 5g béo, 20g đường',25000.00,'/images/cupcake1.jpg',1),(2,'Cupcake','Cupcake dâu tây','180 kcal, 6g béo, 25g đường',50000.00,'/images/cupcake2.jpg',1),(3,'Cupcake','Cupcake chocolate','210 kcal, 10g béo, 28g đường',100000.00,'/images/cupcake3.jpg',1),(4,'Cupcake','Cupcake dâu hoa hồng','170 kcal, 5g béo, 22g đường',45000.00,'/images/cupcake4.jpg',1),(5,'Cupcake','Cupcake tầng','250 kcal, 12g béo, 30g đường',90000.00,'/images/cupcake5.jpg',1),(6,'Cupcake','Cupcake nhiều màu','190 kcal, 7g béo, 24g đường',45000.00,'/images/cupcake6.jpg',1),(7,'Sea food','Tôm hùm nướng bơ tỏi','200 kcal, 15g protein, 12g chất béo',300000.00,'/images/seafood1.jpg',1),(8,'Sea food','Cua sốt ớt Singapore','250 kcal, 20g protein, 8g chất béo',350000.00,'/images/seafood2.jpg',1),(9,'Sea food','Cá hồi sashimi','150 kcal, 25g protein, 5g chất béo',400000.00,'/images/seafood3.jpg',1),(10,'Sea food','Ghẹ hấp bia','180 kcal, 15g protein, 7g chất béo',280000.00,'/images/seafood4.jpg',1),(11,'Sea food','Súp hải sản','140 kcal, 10g protein, 4g chất béo',120000.00,'/images/seafood5.jpg',1),(12,'Sea food','Tôm sốt chanh dây','190 kcal, 12g protein, 6g chất béo',250000.00,'/images/seafood6.jpg',1),(13,'Juice','Nước ép cam','120 kcal, 0g béo, 25g đường',30000.00,'/images/juice1.jpg',1),(14,'Juice','Nước ép dưa hấu','100 kcal, 0g béo, 20g đường',25000.00,'/images/juice2.jpg',1),(15,'Juice','Nước ép táo','130 kcal, 0g béo, 22g đường',35000.00,'/images/juice3.jpg',1),(16,'Juice','Nước ép cà rốt','90 kcal, 0g béo, 18g đường',40000.00,'/images/juice4.jpg',1),(17,'Juice','Nước ép dứa','110 kcal, 0g béo, 21g đường',30000.00,'/images/juice5.jpg',1),(18,'Juice','Nước ép xoài','150 kcal, 0g béo, 29g đường',45000.00,'/images/juice6.jpg',1),(19,'Nước có ga','Coca Cola','150 kcal, 0g béo, 38g đường',20000.00,'/images/nuoc_ga1.jpg',1),(20,'Nước có ga','Pepsi','140 kcal, 0g béo, 36g đường',20000.00,'/images/nuoc_ga2.jpg',1),(21,'Nước có ga','Sprite','130 kcal, 0g béo, 34g đường',20000.00,'/images/nuoc_ga3.jpg',1),(22,'Nước có ga','7Up','125 kcal, 0g béo, 33g đường',20000.00,'/images/nuoc_ga4.jpg',1),(23,'Nước có ga','Fanta','140 kcal, 0g béo, 35g đường',20000.00,'/images/nuoc_ga5.jpg',1),(24,'Nước có ga','Nước có ga Ramune','200 kcal, 10g đường',30000.00,'images/nuoc_ga6.jpg',1),(25,'Combo tiết kiệm','Combo gà rán và khoai tây','600 kcal, 30g béo, 50g đường',90000.00,'/images/combo1.jpg',1),(26,'Combo tiết kiệm','Combo pizza và nước ngọt','700 kcal, 35g béo, 60g đường',120000.00,'/images/combo2.png',1),(27,'Combo tiết kiệm','Combo sushi và sashimi','550 kcal, 20g béo, 45g đường',150000.00,'/images/combo3.jpg',1),(28,'Combo tiết kiệm','Combo mỳ Ý và salad','480 kcal, 22g béo, 42g đường',85000.00,'/images/combo4.jpg',1),(29,'Combo tiết kiệm','Combo lẩu nướng','1000 kcal, 250g béo, 10g đường',400000.00,'images/combo5.jpg',1),(30,'Combo tiết kiệm','Combo liên hoan tiết kiệm','150000 kcal, 500g béo, 300g đường',250000.00,'images/combo6.jpg',1),(31,'Gà rán','Gà rán truyền thống','250 kcal, 12g béo, 8g đường',40000.00,'/images/garan1.png',1),(32,'Gà rán','Gà rán cay','300 kcal, 15g béo, 10g đường',45000.00,'/images/garan2.jpg',1),(33,'Gà rán','Gà rán mật ong','350 kcal, 18g béo, 12g đường',50000.00,'/images/garan3.jpg',1),(34,'Gà rán','Gà popcorn nhỏ','180 kcal, 10g béo, 7g đường',30000.00,'/images/garan4.jpg',1),(35,'Gà rán','Gà giòn vui vẻ','360 kcal, 20g béo, 14g đường',60000.00,'/images/garan5.jpg',1),(36,'Gà rán','Gà sốt chanh dây','260 kcal, 15g béo, 20g đường',75000.00,'/images/garan6.jpg',1);
/*!40000 ALTER TABLE `thuc_don` ENABLE KEYS */;
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
