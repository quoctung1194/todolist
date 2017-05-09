-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: todolist
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `histories`
--
USE todolistappnet;

DROP TABLE IF EXISTS `histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `histories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sync_time` datetime NOT NULL,
  `content` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `histories`
--

LOCK TABLES `histories` WRITE;
/*!40000 ALTER TABLE `histories` DISABLE KEYS */;
INSERT INTO `histories` VALUES (86,'2017-05-09 19:27:24','[{\"id\":1494332705886,\"name\":\"ASDAS\",\"project\":\" DAS Dasd\",\"priority\":\"0\",\"deadline\":\"2017-05-09\",\"status\":\"0\"},{\"id\":1494332706118,\"name\":\"ASDAS\",\"project\":\" DAS Dasd\",\"priority\":\"0\",\"deadline\":\"2017-05-09\",\"status\":\"0\"},{\"id\":\"1494332706118\",\"name\":\"ASDAS\",\"project\":\" DAS Dasd\",\"priority\":0,\"deadline\":\"2017-05-09\",\"started_date\":\"2017-5-9 19:25:12\",\"status\":\"1\"},{\"id\":\"1494332706118\",\"name\":\"ASDAS\",\"project\":\" DAS Dasd\",\"priority\":0,\"deadline\":\"2017-05-09\",\"status\":\"2\",\"completed_date\":\"2017-5-9 19:25:12\"},{\"id\":\"1494332705886\",\"name\":\"ASDAS\",\"project\":\" DAS Dasd\",\"priority\":0,\"deadline\":\"2017-05-09\",\"started_date\":\"2017-5-9 19:26:15\",\"status\":\"1\"},{\"id\":\"1494332705886\",\"name\":\"ASDAS\",\"project\":\" DAS Dasd\",\"priority\":0,\"deadline\":\"2017-05-09\",\"started_date\":null,\"status\":\"0\"}]','2017-05-09 12:27:24','2017-05-09 12:27:24'),(87,'2017-05-09 19:27:48','[{\"id\":1494332867666,\"name\":\"Testing\",\"project\":\"Apato\",\"priority\":\"2\",\"deadline\":\"2017-05-09\",\"status\":\"0\"}]','2017-05-09 12:27:48','2017-05-09 12:27:48'),(88,'2017-05-09 19:28:05','[{\"id\":1494332884200,\"name\":\"Demo\",\"project\":\"123\",\"priority\":\"0\",\"deadline\":\"2017-05-09\",\"status\":\"0\"}]','2017-05-09 12:28:05','2017-05-09 12:28:05'),(89,'2017-05-09 19:28:10','[{\"id\":\"1494332884200\",\"name\":\"Demo\",\"project\":\"123\",\"priority\":0,\"deadline\":\"2017-05-09\",\"started_date\":\"2017-5-9 19:28:9\",\"status\":\"1\"}]','2017-05-09 12:28:10','2017-05-09 12:28:10'),(90,'2017-05-09 19:29:18','[{\"id\":\"1494332867666\",\"name\":\"Testing\",\"project\":\"Apato ggg\",\"priority\":2,\"deadline\":\"2017-05-09\",\"status\":0},{\"id\":\"1494332867666\",\"name\":\"Testing\",\"project\":\"Apato ggg\",\"priority\":2,\"deadline\":\"2017-05-09\",\"status\":0}]','2017-05-09 12:29:18','2017-05-09 12:29:18');
/*!40000 ALTER TABLE `histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(4,'2017_05_04_163158_init_database',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` int(11) NOT NULL,
  `deadline` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `started_date` datetime DEFAULT NULL,
  `completed_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES ('1494332705886','ASDAS',' DAS Dasd',0,'2017-05-09 00:00:00',0,'2017-05-09 19:26:15',NULL,'2017-05-09 12:27:24','2017-05-09 12:27:24'),('1494332706118','ASDAS',' DAS Dasd',0,'2017-05-09 00:00:00',2,'2017-05-09 19:25:12','2017-05-09 19:25:12','2017-05-09 12:27:24','2017-05-09 12:27:24'),('1494332867666','Testing','Apato ggg',2,'2017-05-09 00:00:00',0,NULL,NULL,'2017-05-09 12:27:48','2017-05-09 12:29:18'),('1494332884200','Demo','123',0,'2017-05-09 00:00:00',1,'2017-05-09 19:28:09',NULL,'2017-05-09 12:28:05','2017-05-09 12:28:10');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `api_token` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_api_token_unique` (`api_token`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Tùng','tung@gmail.com','$2y$10$.iRR8sQ4bF7CeJ6rAFtxduY8LbiI2Dj8WU5tL6Yqmnkc9V6/VRbFm','$2y$10$blp37cCx9BfmJ51KgD2Fgu/FQF30N/zpQfyGd2GFt7FxMID2wFj/W','123','2016-11-10 17:00:00','2016-11-10 17:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'todolist'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-09 19:33:21
