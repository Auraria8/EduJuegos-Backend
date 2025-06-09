-- MySQL dump 10.13  Distrib 9.0.1, for Win64 (x86_64)
--
-- Host: localhost    Database: 8edujuegos
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actividades`
--

DROP TABLE IF EXISTS `actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `id_docente` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_docente` (`id_docente`),
  CONSTRAINT `actividades_ibfk_1` FOREIGN KEY (`id_docente`) REFERENCES `docentes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividades`
--

LOCK TABLES `actividades` WRITE;
/*!40000 ALTER TABLE `actividades` DISABLE KEYS */;
INSERT INTO `actividades` VALUES (8,'tarea de matematicas','ecuaciones algebraicas','2025-03-21','2025-03-25',2),(14,'tarea de programacion','módulos de software','2025-03-20','2025-03-22',2),(15,'Actividad de Matemáticas','Resolver problemas de suma y resta','2025-03-27','2025-04-05',3),(16,'Ejercicio de Fracciones','Resolver problemas con fracciones equivalentes','2025-03-28','2025-04-05',3),(17,'Actividad de Matemáticas','Resolver ejercicios de multiplicación y división.','2025-04-11','2025-04-18',1);
/*!40000 ALTER TABLE `actividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_docente` int NOT NULL,
  `id_estudiante` int NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_docente` (`id_docente`),
  KEY `id_estudiante` (`id_estudiante`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_docente`) REFERENCES `docentes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (5,2,3,'excelente, continua esforzándote por tus logros.','2025-03-18 05:23:29'),(9,2,9,'buen desempeño en las actividades de aprendizaje. felicitaciones.','2025-03-22 02:29:05'),(18,1,16,'Lucía, hiciste un excelente trabajo en la actividad de lógica matemática. ¡Felicitaciones!','2025-04-11 15:07:43');
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docentes`
--

DROP TABLE IF EXISTS `docentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docentes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docentes`
--

LOCK TABLES `docentes` WRITE;
/*!40000 ALTER TABLE `docentes` DISABLE KEYS */;
INSERT INTO `docentes` VALUES (1,'María López','maria@escuela.com','contraseñaSegura123'),(2,'Juan Pérez','juanperez@email.com','$2b$10$lHm5A.urDIfPJlHSbdjO4uQar3KM7HnSGdod308lavr2OxgHB1QTa'),(3,'Juan Pérez','juanperez@example.com','$2b$10$7IhEz7uPq4xNcTgWipPBqu/2tgZ4hNZbgc/qRYmk8LhaoTv6DcYa.');
/*!40000 ALTER TABLE `docentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_estudiante` int NOT NULL,
  `id_actividad` int NOT NULL,
  `contenido` text NOT NULL,
  `fecha_entrega` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_estudiante` (`id_estudiante`),
  KEY `id_actividad` (`id_actividad`),
  CONSTRAINT `entregas_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id`),
  CONSTRAINT `entregas_ibfk_2` FOREIGN KEY (`id_actividad`) REFERENCES `actividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
INSERT INTO `entregas` VALUES (1,16,17,'Aquí está mi entrega de la actividad de Matemáticas.','2025-04-11'),(3,19,8,'Prueba 1','2025-04-15');
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `edad` int NOT NULL,
  `grado` varchar(50) NOT NULL,
  `id_docente` int DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email_estudiantes` (`email`),
  KEY `id_docente` (`id_docente`),
  CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`id_docente`) REFERENCES `docentes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiantes`
--

LOCK TABLES `estudiantes` WRITE;
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` VALUES (3,'Carlos Gómez',10,'5°',2,'carlos@example.com','temporal123'),(7,'Auryn',8,'3',2,'auryn@example.com','temporal123'),(9,'Alejandra Pinzon',8,'4',2,'alejandra@example.com','temporal123'),(10,'María López',8,'Tercero',3,'maria@example.com','temporal123'),(11,'Lucía Fernández',9,'4°',3,'lucia@example.com','temporal123'),(12,'Juan Estudiante',12,'6°',1,NULL,NULL),(13,'Juan Estudiante',12,'6°',1,NULL,NULL),(14,'Juan Estudiante',12,'6°',1,NULL,NULL),(15,'Lucía González',10,'5°',1,NULL,NULL),(16,'Lucía González',10,'5°',1,'lucifa@example.com','$2b$10$NfZy7O2Ac7TxtOeSDic9xuJHbG3c.WBL4lcKWa/lgcFWZJrnkc2TS'),(17,'Isian',8,'3',NULL,'isian@mail.com','$2b$10$tS1NJF98cGsivSSVTMf.QeK4U76PF5P3845X/w7Li2a1Ky.Nc15fi'),(18,'Ian',8,'3',NULL,'ian@mail.com','$2b$10$IHsZ/wWsdseyqDOM/X9cEeK4lGz7.NkyJUJ6g3oTQpOqk2g9Y1Hvm'),(19,' asanei',7,'3',NULL,'asani@mail.com','$2b$10$ol35MwfirQkom5budkTJx.qgy4b8wAh3vM5G8gdLytGIy9wCFT0XO'),(20,'Juan Pérez',20,'Primero',NULL,'juan.perez@example.com','contraseña123'),(21,'Ana García',22,'Segundo',NULL,'ana.garcia@example.com','contraseña456'),(22,'Luis Rodríguez',18,'Tercero',NULL,'luis.rodriguez@example.com','contraseña789');
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultados`
--

DROP TABLE IF EXISTS `resultados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_estudiante` int NOT NULL,
  `id_actividad` int NOT NULL,
  `calificacion` decimal(5,2) NOT NULL,
  `comentarios` text,
  PRIMARY KEY (`id`),
  KEY `id_estudiante` (`id_estudiante`),
  KEY `id_actividad` (`id_actividad`),
  CONSTRAINT `resultados_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `resultados_ibfk_2` FOREIGN KEY (`id_actividad`) REFERENCES `actividades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultados`
--

LOCK TABLES `resultados` WRITE;
/*!40000 ALTER TABLE `resultados` DISABLE KEYS */;
INSERT INTO `resultados` VALUES (5,3,8,8.00,'bien! felicitaciones'),(8,7,8,10.10,'excelente! continua asi'),(9,9,14,10.00,'excelente, felicitaciones :D'),(10,16,17,4.80,'Muy buen trabajo, sigue así.'),(11,19,8,9.50,'¡Muy bien asanei!'),(12,3,8,10.00,'excelente felicitaciones!');
/*!40000 ALTER TABLE `resultados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-18  4:57:11
