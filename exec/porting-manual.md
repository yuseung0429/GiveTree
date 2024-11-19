# GitLab 소스 클론 이후 빌드 및 배포할 수 있도록 정리한 문서

---

## 사용한 JVM, 웹서버, WAS, IDE 제품 종류, 설정, 버전

---

- OpenJDK 17
- Spring Boot 3.3.4
- React 19.0.0
- Next.js 15.0.1
- SWR 2.2.5
- Vanilla Extract 1.16.0
- Framer motion 11.11.10
- react-hook-form 7.53.2
- zod 3.23.8
- MySQL 9.1.0
- Nginx 1.18.0
- Docker 27.3.1
- Docker Compose 2.30.1
- Intellij IDEDA Ultimate
- Visual Studio Code
- GitLab
- Jira
- Mattermost
- Figma
- Notion
- ERD Cloud

## 빌드 시 사용되는 환경 변수 등의 내용

---

- application.yml

```yaml
spring:
  application:
    name:
      givetree
  profiles:
    include: finance, local, blockchain, firebase, secret, oauth

  jpa:
    show-sql: true
    open-in-view: false
    hibernate:
      ddl-auto: none
    properties:
      hibernate:
        highlight_sql: true
        format_sql: true
        default_batch_fetch_size: 100
        discriminator:
          ignore_explicit_for_joined: true
    defer-datasource-initialization: true

  servlet:
    multipart:
      max-file-size: 100MB
      max-request-size: 100MB

```

- application-blockchain.yml

```yaml

```

- application-finance.yml

```yaml

```

- application-firebase.yml

```yaml
firebase:
  file-path: "{FIREBASE-ADMIN-SDK-PATH}"
  uri: https://fcm.googleapis.com/v1/projects/"{FIREBASE-PROJECT-ID}"/messages:send
  google-uri: https://www.googleapis.com/auth/cloud-platform

```

- application-oauth.yml

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: "{CLIENT_ID}"
            client-secret: "{CLIENT-SECRET}"
            redirect-uri: https://givetree.co.kr/api/login/oauth2/code/google
            scope: email, profile
          kakao:
            client-id: "{CLIENT_ID}"
            client-secret: "{CLIENT-SECRET}"
            redirect-uri: https://givetree.co.kr/api/login/oauth2/code/kakao
            authorization-grant-type: authorization_code
            client-authentication-method: client_secret_post
            scope: profile_nickname, profile_image, account_email
            client-name: kakao
          naver:
            client-id: "{CLIENT_ID}"
            client-secret: "{CLIENT-SECRET}"
            redirect-uri: https://givetree.co.kr/api/login/oauth2/code/naver
            authorization_grant_type: authorization_code
            scope: name, email, profile_image
            client-name: naver
        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id
          naver:
            authorization-uri: https://nid.naver.com/oauth2.0/authorize
            token_uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user_name_attribute: response

```

- application-secret.yml

```yaml
spring:
  cloud:
    aws:
      s3:
        bucket: "{S3-BUCKET-NAME}"
      region:
        static: ap-northeast-2
      credentials:
        accessKey: "{S3-CREDENTIAL-ACCESS-KEY}"
        secretKey: "{S3-CREDENTIAL-SECRET-KEY}"

ssafy:
  finance:
    service:
      api-key: "c4f5debc63034d88a2256f36b44f3cdd"
      institution-code: "00100"
      fintech-app-no: "001"

app:
  admin:
    member-id: 0
    wallet-id: 0
    email: "givetree@givetree.co.kr"
    password: "klsjjk"
    simple-password: "0429"

blockchain:
  admin:
    wallet:
      address: "0xecfc4f760bb5106a7292fA94C16fa11B7337c47b"
      private-key: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ffff"

```

## 배포 시 특이사항 기재

---

### Back-End

---

- backend.jenkinsfile

```groovy
pipeline {
    agent any

    stages {
        stage('GitLab Clone') {
            steps {           
                git branch: 'be', credentialsId: ${CREDENTIAL-ID}, url: 'https://lab.ssafy.com/s11-final/S11P31D210'
            }
        }
        stage('Build') {
            steps {
                dir('backend/givetree') {
                    sh '''
                    chmod +x ./gradlew
                    ./gradlew clean bootJar
                    '''
                }
            }
        }
        stage('Make Image') {
            steps {
            	dir('backend/givetree') {
                    sh '''
                    docker stop givetree-spring || true 
                    docker rm givetree-spring || true
                    docker rmi backend || true
                    docker build -t backend . 
                    '''
            	}
            }
        }
        stage('Run Container') {
            steps {
                dir('backend/givetree') {
                    sh '''         
                    docker-compose up -d
                    '''
                }
            }
        }
    }

```

- Dockerfile

```docker
FROM openjdk:17-jdk
EXPOSE 8080
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]

```

- docker-compose.yml

```yaml
services:
  givetree-spring:
    container_name: givetree-spring
    image: backend
    ports:
      - "8080:8080"
    depends_on:
      - givetree-mysql
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://givetree-mysql:3306/givetree
      SPRING_DATASOURCE_USERNAME: "{DATABASE-USERNAME}"
      SPRING_DATASOURCE_PASSWORD: "{DATABASE-PASSWORD}"
      TZ: "Asia/Seoul"
    networks:
      - internal_network

  givetree-mysql:
    container_name: givetree-mysql
    image: mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_DATABASE: "{DATABASE-USERNAME}"
      MYSQL_ROOT_PASSWORD: "{DATABASE-PASSWORD}"
      TZ: "Asia/Seoul"
    volumes:
      - ~/givetree/database/mysql:/var/lib/mysql
    networks:
      - internal_network

networks:
  internal_network:

```

### Front-End

---

- frontend.jenkinsfile

```groovy
pipeline {
    agent any
    
    stages {
        stage('GitLab Clone') {
            steps {           
                git branch: 'fe', credentialsId: ${CREDENTIAL-ID}, url: 'https://lab.ssafy.com/s11-final/S11P31D210'
            }
        }
        stage('Docker Build') {
            steps {
                dir('frontend/givetree') {
                    sh '''
                        docker stop givetree-next || true
                        docker rm givetree-next || true
                        docker rmi frontend || true
                        docker build -t frontend .
                    '''
                }
            }
        }
        stage('Docker Run') {
            steps {
                sh '''
                    docker run -d --name givetree-next -p 3000:3000 frontend
                '''
            }
        }
    }

```

- Dockerfile

```docker
FROM node:18-alpine AS build

WORKDIR /app/fe

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn run build

CMD ["yarn", "start"]

```

# DB 덤프 파일 최신본

---

```sql
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: givetree
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `created_at` date NOT NULL,
  `expiry_at` date NOT NULL,
  `is_active` bit(1) NOT NULL,
  `account_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `bank_code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`account_id`),
  KEY `FKd92gwbdqditppi9vskw4762hn` (`bank_code`),
  KEY `FKr5j0huynd7nsv1s7e9vb8qvwo` (`member_id`),
  CONSTRAINT `FKd92gwbdqditppi9vskw4762hn` FOREIGN KEY (`bank_code`) REFERENCES `bank` (`bank_code`),
  CONSTRAINT `FKr5j0huynd7nsv1s7e9vb8qvwo` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('2024-11-08','2029-11-08',_binary '',0,0,'0010710164044685','001','íêµ­ìí ìììì¶ê¸ ìí');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agent_wallet`
--

DROP TABLE IF EXISTS `agent_wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agent_wallet` (
  `wallet_id` bigint NOT NULL,
  PRIMARY KEY (`wallet_id`),
  CONSTRAINT `FKg84lhlutugyti35wmci8k5tmu` FOREIGN KEY (`wallet_id`) REFERENCES `wallet` (`wallet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent_wallet`
--

LOCK TABLES `agent_wallet` WRITE;
/*!40000 ALTER TABLE `agent_wallet` DISABLE KEYS */;
INSERT INTO `agent_wallet` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20);
/*!40000 ALTER TABLE `agent_wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank` (
  `bank_code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`bank_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank`
--

LOCK TABLES `bank` WRITE;
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
INSERT INTO `bank` VALUES ('001','íêµ­ìí'),('002','ì°ììí'),('003','ê¸°ììí'),('004','êµ­ë¯¼ìí'),('011','ëíìí'),('020','ì°ë¦¬ìí'),('023','SCì ì¼ìí'),('027','ìí°ìí'),('032','ëêµ¬ìí'),('034','ê´ì£¼ìí'),('035','ì ì£¼ìí'),('037','ì ë¶ìí'),('039','ê²½ë¨ìí'),('045','ìë§ìê¸ê³ '),('081','KEBíëìí'),('088','ì íìí'),('090','ì¹´ì¹´ì¤ë±í¬'),('999','ì¸í¼ìí');
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `end_date` date NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `start_date` date NOT NULL,
  `campaign_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `foundation_id` bigint NOT NULL,
  `target_fundraising_amount` bigint NOT NULL,
  `title_image_id` binary(16) DEFAULT NULL,
  `introduction` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `contract_address` varbinary(255) DEFAULT NULL,
  PRIMARY KEY (`campaign_id`),
  UNIQUE KEY `UKiwvtn102eqoymi0q42n0xcqrl` (`title_image_id`),
  KEY `FKbqysy2jf71xo8t4a76315ia5p` (`foundation_id`),
  CONSTRAINT `FKbqysy2jf71xo8t4a76315ia5p` FOREIGN KEY (`foundation_id`) REFERENCES `foundation` (`member_id`),
  CONSTRAINT `FKlapr2e04rvbp3dbe6svxj3pp2` FOREIGN KEY (`title_image_id`) REFERENCES `image` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES ('2024-12-31',_binary '\0','2024-01-01',1,'2024-11-18 15:59:18.086178',3,15000000,_binary '\'Y\Ñ\è@U¾òp818','ì´ë ¤ì´ ì´ììê² í¬ë§ì ì ë¬íë ì¬ëì ì´ë§¤ ìº íì¸ìëë¤.','í¬ë§ ëë ìº íì¸',_binary 'óÆWw)$ùq\êô\\·bÞ¦©i'),('2024-09-30',_binary '\0','2024-03-01',2,'2024-11-18 15:59:19.220796',4,20000000,_binary '<c\Çv\ëH5·d\'¯','ë¯¸ëë¥¼ ì´ëì´ ê° ìì´ë¤ìê² ë ëì êµì¡ê³¼ íê²½ì ì§ìí©ëë¤.','ë¯¸ë ê¿ëë¬´ ì§ì ìº íì¸',_binary '\'$br=¦7,7\Ú\×J#]®·ú'),('2024-11-10',_binary '\0','2024-05-01',3,'2024-11-18 15:59:20.630332',5,10000000,_binary '¤: D*y_VÇ­','ê²½ì ì  ì´ë ¤ìì ê²ªë ì ìëì¸µ ë¶ë¤ìê² ë°ë»í ìê¸¸ì ë´ë°ì´ ì£¼ì¸ì.','ìì¸ê³ì¸µ ì§ì ìº íì¸',_binary '<\ìt\ío	\Õ\ØI\ßþ¦E\Ó'),('2024-11-14',_binary '\0','2024-06-15',4,'2024-11-18 15:59:21.917676',6,5000000,_binary '\ÜW}Ç¯E¸xÖ°a°z','ë¬¼íì ìê»´ì°ê³  ëë ì°ê³  ë°ê¿ì°ë ìº íì¸ìëë¤.','ìëë°ë¤ ìº íì¸',_binary '+Å¬6Tt\ZhðK\Ôù´û');
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_donation`
--

DROP TABLE IF EXISTS `campaign_donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_donation` (
  `campaign_id` bigint NOT NULL,
  `donation_id` bigint NOT NULL,
  `message` varchar(255) NOT NULL,
  PRIMARY KEY (`donation_id`),
  KEY `FKb2fih8n18wope09gol27h9sld` (`campaign_id`),
  CONSTRAINT `FKb2fih8n18wope09gol27h9sld` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`),
  CONSTRAINT `FKfv6ucjljvq5soetdphho5ymrn` FOREIGN KEY (`donation_id`) REFERENCES `donation` (`donation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_donation`
--

LOCK TABLES `campaign_donation` WRITE;
/*!40000 ALTER TABLE `campaign_donation` DISABLE KEYS */;
/*!40000 ALTER TABLE `campaign_donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_image`
--

DROP TABLE IF EXISTS `campaign_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_image` (
  `campaign_id` bigint NOT NULL,
  `campaign_image_id` bigint NOT NULL AUTO_INCREMENT,
  `image_id` binary(16) NOT NULL,
  PRIMARY KEY (`campaign_image_id`),
  UNIQUE KEY `UKbamfe15spufq3y2xdxtcldiy0` (`image_id`),
  KEY `FKkvdx7m09omk6oypnk531gq1mf` (`campaign_id`),
  CONSTRAINT `FK3jy4g0m8jwuhnf4kepmyug6ak` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`),
  CONSTRAINT `FKkvdx7m09omk6oypnk531gq1mf` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_image`
--

LOCK TABLES `campaign_image` WRITE;
/*!40000 ALTER TABLE `campaign_image` DISABLE KEYS */;
INSERT INTO `campaign_image` VALUES (1,1,_binary 'n\àW\0G¤­«\×s\ß'),(1,2,_binary '³Aï¼J´*þ\Z@0\"'),(2,3,_binary 'Ñ»_YcFÞd@\å'),(2,4,_binary '³\Ø,%7LQ\àÔ5\Ê'),(3,5,_binary '9²\î@\Ð÷J¸n\Ø6Ã'),(3,6,_binary 'À¡¿D\ÇHCX¡ými7<'),(4,7,_binary '	·¹j\éFà¥ºøØúÈ¬'),(4,8,_binary '¹¿ª9\0\àJ¬nYjKÁ');
/*!40000 ALTER TABLE `campaign_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_wallet`
--

DROP TABLE IF EXISTS `campaign_wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_wallet` (
  `campaign_id` bigint NOT NULL,
  `wallet_id` bigint NOT NULL,
  PRIMARY KEY (`wallet_id`),
  UNIQUE KEY `UKhhbo15idimqhb68en1xw9qdq4` (`campaign_id`),
  CONSTRAINT `FK2c2kuhi7guu3sagndkn9rc0ni` FOREIGN KEY (`wallet_id`) REFERENCES `wallet` (`wallet_id`),
  CONSTRAINT `FKgbu3u6fdrshsjccldh5ssccr4` FOREIGN KEY (`campaign_id`) REFERENCES `campaign` (`campaign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_wallet`
--

LOCK TABLES `campaign_wallet` WRITE;
/*!40000 ALTER TABLE `campaign_wallet` DISABLE KEYS */;
INSERT INTO `campaign_wallet` VALUES (1,27),(2,28),(3,29),(4,30);
/*!40000 ALTER TABLE `campaign_wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'ë¶ì°ì´ì'),(2,'êµì¡'),(3,'êµ¬í¸');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatroom`
--

DROP TABLE IF EXISTS `chatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatroom` (
  `is_deleted` bit(1) NOT NULL,
  `chatroom_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `sale_id` bigint NOT NULL,
  PRIMARY KEY (`chatroom_id`),
  KEY `FKq1ls8uh9bkvlgdcjrto1vlit6` (`sale_id`),
  CONSTRAINT `FKq1ls8uh9bkvlgdcjrto1vlit6` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom`
--

LOCK TABLES `chatroom` WRITE;
/*!40000 ALTER TABLE `chatroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatroom_connection`
--

DROP TABLE IF EXISTS `chatroom_connection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatroom_connection` (
  `chatroom_id` bigint NOT NULL,
  `chatroom_member_connection_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`chatroom_member_connection_id`),
  KEY `FKrg5maxggtdf3g1bg3jvje80hc` (`chatroom_id`),
  KEY `FKjbx1m71qp9potexo9vp5k6oma` (`member_id`),
  CONSTRAINT `FKjbx1m71qp9potexo9vp5k6oma` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKrg5maxggtdf3g1bg3jvje80hc` FOREIGN KEY (`chatroom_id`) REFERENCES `chatroom` (`chatroom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom_connection`
--

LOCK TABLES `chatroom_connection` WRITE;
/*!40000 ALTER TABLE `chatroom_connection` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatroom_connection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatroom_history`
--

DROP TABLE IF EXISTS `chatroom_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatroom_history` (
  `is_deleted` bit(1) NOT NULL,
  `chatroom_history_id` bigint NOT NULL AUTO_INCREMENT,
  `chatroom_id` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `sender_id` bigint NOT NULL,
  `message` varchar(255) NOT NULL,
  PRIMARY KEY (`chatroom_history_id`),
  KEY `FKhwj8wetc9sgnt9x96o6c1ajks` (`chatroom_id`),
  KEY `FK3sdlerusakvmc9lvhlqkggi5i` (`sender_id`),
  CONSTRAINT `FK3sdlerusakvmc9lvhlqkggi5i` FOREIGN KEY (`sender_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKhwj8wetc9sgnt9x96o6c1ajks` FOREIGN KEY (`chatroom_id`) REFERENCES `chatroom` (`chatroom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom_history`
--

LOCK TABLES `chatroom_history` WRITE;
/*!40000 ALTER TABLE `chatroom_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatroom_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `amount` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `donation_id` bigint NOT NULL AUTO_INCREMENT,
  `donor_id` bigint NOT NULL,
  `transaction_id` bigint NOT NULL,
  PRIMARY KEY (`donation_id`),
  KEY `FKm8skg0bm1n4alfqs6souuxep2` (`donor_id`),
  KEY `FK5l3p84kc0ko0bdo19w0ou5icx` (`transaction_id`),
  CONSTRAINT `FK5l3p84kc0ko0bdo19w0ou5icx` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`),
  CONSTRAINT `FKm8skg0bm1n4alfqs6souuxep2` FOREIGN KEY (`donor_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchange_failure`
--

DROP TABLE IF EXISTS `exchange_failure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exchange_failure` (
  `amount` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `exchange_faulure_id` bigint NOT NULL AUTO_INCREMENT,
  `processed_at` datetime(6) DEFAULT NULL,
  `transaction_id` bigint NOT NULL,
  PRIMARY KEY (`exchange_faulure_id`),
  KEY `FK9cxthmt4w3pbuytfdk76a2l4n` (`transaction_id`),
  CONSTRAINT `FK9cxthmt4w3pbuytfdk76a2l4n` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange_failure`
--

LOCK TABLES `exchange_failure` WRITE;
/*!40000 ALTER TABLE `exchange_failure` DISABLE KEYS */;
/*!40000 ALTER TABLE `exchange_failure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foundation`
--

DROP TABLE IF EXISTS `foundation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foundation` (
  `executed_amount` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  `total_fundraising_amount` bigint NOT NULL,
  `title_image_id` binary(16) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `corporate_registration_number` varchar(255) NOT NULL,
  `introduction` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UKr4clnyrvcipugsdoo5juvg639` (`title_image_id`),
  CONSTRAINT `FK6445vvww8gl05bj8c2w9idde5` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKfmelk4we4qhv87owa236jut9w` FOREIGN KEY (`title_image_id`) REFERENCES `image` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foundation`
--

LOCK TABLES `foundation` WRITE;
/*!40000 ALTER TABLE `foundation` DISABLE KEYS */;
INSERT INTO `foundation` VALUES (0,3,0,_binary '¦*ñf¡»A\îÄ[\É','êµ¬ë¯¸ ì§íë','012-34-56789','ì¬ëì ì´ë§¤ ì¬ë¨ìëë¤.','010-1234-5678'),(0,4,0,_binary 'c¥ð×Dt1Na,¸|','êµ¬ë¯¸ ì§íë','012-34-56789','ì´ë¡ì°ì° ì¬ë¨ìëë¤.','010-1234-5678'),(0,5,0,_binary '\Ãò:DQ@|\é/\ÅGB\î','êµ¬ë¯¸ ì§íë','012-34-56789','êµ¿ë¤ì´ë²ì¤ ì¬ë¨ìëë¤.','010-1234-5678'),(0,6,0,_binary 'ú´ \ßz%CÔº\Z÷£þ®','êµ¬ë¯¸ ì§íë','012-34-56789','ëíì ì­ìì¬ ì¬ë¨ìëë¤.','010-1234-5678');
/*!40000 ALTER TABLE `foundation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foundation_category`
--

DROP TABLE IF EXISTS `foundation_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foundation_category` (
  `category_id` bigint NOT NULL,
  `foundation_id` bigint NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK72btu8t80o3ptpnmddmmxy1xd` (`category_id`),
  KEY `FKtb2j10lsaurfb9kik39l1ioe2` (`foundation_id`),
  CONSTRAINT `FK72btu8t80o3ptpnmddmmxy1xd` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FKtb2j10lsaurfb9kik39l1ioe2` FOREIGN KEY (`foundation_id`) REFERENCES `foundation` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foundation_category`
--

LOCK TABLES `foundation_category` WRITE;
/*!40000 ALTER TABLE `foundation_category` DISABLE KEYS */;
INSERT INTO `foundation_category` VALUES (1,3,1),(2,4,2),(1,5,3),(3,6,4),(1,6,5);
/*!40000 ALTER TABLE `foundation_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foundation_donate_subscription`
--

DROP TABLE IF EXISTS `foundation_donate_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foundation_donate_subscription` (
  `amount` bigint NOT NULL,
  `foundation_donate_subscription_id` bigint NOT NULL AUTO_INCREMENT,
  `foundation_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`foundation_donate_subscription_id`),
  KEY `FKjy25urpru85kgt9w3tri8gssu` (`foundation_id`),
  KEY `FKgjbt2xbikdnb8by7qtnjrmfva` (`member_id`),
  CONSTRAINT `FKgjbt2xbikdnb8by7qtnjrmfva` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKjy25urpru85kgt9w3tri8gssu` FOREIGN KEY (`foundation_id`) REFERENCES `foundation` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foundation_donate_subscription`
--

LOCK TABLES `foundation_donate_subscription` WRITE;
/*!40000 ALTER TABLE `foundation_donate_subscription` DISABLE KEYS */;
/*!40000 ALTER TABLE `foundation_donate_subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foundation_donation`
--

DROP TABLE IF EXISTS `foundation_donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foundation_donation` (
  `donation_id` bigint NOT NULL,
  `foundation_id` bigint NOT NULL,
  `donation_type` enum('ONE_TIME','REGULAR') NOT NULL,
  PRIMARY KEY (`donation_id`),
  KEY `FKrpw1x8b8qlhy8s83ji20jo7g2` (`foundation_id`),
  CONSTRAINT `FKkoki7g38nbsh4wlj4dena8ybn` FOREIGN KEY (`donation_id`) REFERENCES `donation` (`donation_id`),
  CONSTRAINT `FKrpw1x8b8qlhy8s83ji20jo7g2` FOREIGN KEY (`foundation_id`) REFERENCES `foundation` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foundation_donation`
--

LOCK TABLES `foundation_donation` WRITE;
/*!40000 ALTER TABLE `foundation_donation` DISABLE KEYS */;
/*!40000 ALTER TABLE `foundation_donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foundation_image`
--

DROP TABLE IF EXISTS `foundation_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foundation_image` (
  `foundation_id` bigint NOT NULL,
  `foundation_image_id` bigint NOT NULL AUTO_INCREMENT,
  `image_id` binary(16) NOT NULL,
  PRIMARY KEY (`foundation_image_id`),
  UNIQUE KEY `UK98ipm73giti664kxddtgge30s` (`image_id`),
  KEY `FK89ailugyjmspp27gm5nqndawk` (`foundation_id`),
  CONSTRAINT `FK89ailugyjmspp27gm5nqndawk` FOREIGN KEY (`foundation_id`) REFERENCES `foundation` (`member_id`),
  CONSTRAINT `FK9y1fjnyo71glcoxsb6opxstn8` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foundation_image`
--

LOCK TABLES `foundation_image` WRITE;
/*!40000 ALTER TABLE `foundation_image` DISABLE KEYS */;
INSERT INTO `foundation_image` VALUES (3,1,_binary '0¯(§Nô¯p¶¥µ'),(3,2,_binary '\Î\r<\ÅC2ªdÀ}ø	'),(4,3,_binary 'q\Ó\ÇH®=(nD\0'),(4,4,_binary '\Ü\Ð{©\ËA\é¥ @c\ßÐ¯&'),(5,5,_binary '~:7\é\ÚA£Oj\Å\ë'),(5,6,_binary 'ü4\×J¿,P½­\ë'),(6,7,_binary '\r\ãÝ¸xJ¼!\Îs\Þ\ãtñ'),(6,8,_binary 'F8DMv\î¶?¥');
/*!40000 ALTER TABLE `foundation_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK8tbcatdpwrvwjlmst84ykwq22` FOREIGN KEY (`id`) REFERENCES `media` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (_binary '	·¹j\éFà¥ºøØúÈ¬'),(_binary '\r\ãÝ¸xJ¼!\Îs\Þ\ãtñ'),(_binary '+¼wA¿¶p¾q¤¤'),(_binary '~:7\é\ÚA£Oj\Å\ë'),(_binary 'F8DMv\î¶?¥'),(_binary '\'Y\Ñ\è@U¾òp818'),(_binary '0¯(§Nô¯p¶¥µ'),(_binary '9²\î@\Ð÷J¸n\Ø6Ã'),(_binary '<c\Çv\ëH5·d\'¯'),(_binary '=¶\ìfDn¼xò>,&E'),(_binary 'GP¿s5\\J\'¦S\"! ¹'),(_binary 'c¥ð×Dt1Na,¸|'),(_binary 'n\àW\0G¤­«\×s\ß'),(_binary 'q\Ó\ÇH®=(nD\0'),(_binary '=h´»óMW}\ï|)8h\Ü'),(_binary 'ö\Ð\íÿI»\àUi\Î'),(_binary '¤: D*y_VÇ­'),(_binary '¦*ñf¡»A\îÄ[\É'),(_binary '³Aï¼J´*þ\Z@0\"'),(_binary '³\Ø,%7LQ\àÔ5\Ê'),(_binary '¹¿ª9\0\àJ¬nYjKÁ'),(_binary 'À¡¿D\ÇHCX¡ými7<'),(_binary '\Ãò:DQ@|\é/\ÅGB\î'),(_binary '\Î\r<\ÅC2ªdÀ}ø	'),(_binary 'Ñ»_YcFÞd@\å'),(_binary '\Û\"\î¥aC!ª\ç;\ã'),(_binary '\ÜW}Ç¯E¸xÖ°a°z'),(_binary '\Ü\Ð{©\ËA\é¥ @c\ßÐ¯&'),(_binary 'ú´ \ßz%CÔº\Z÷£þ®'),(_binary 'ü4\×J¿,P½­\ë');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ledger`
--

DROP TABLE IF EXISTS `ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ledger` (
  `account_id` bigint NOT NULL,
  `amount` bigint NOT NULL,
  `ledger_id` bigint NOT NULL AUTO_INCREMENT,
  `processed_at` datetime(6) NOT NULL,
  `message` varchar(255) NOT NULL,
  `type` enum('CHARGE','EXCHANGE','REFUND') NOT NULL,
  PRIMARY KEY (`ledger_id`),
  KEY `FKdfl0qn6t6fktydkrl82yxd9u5` (`account_id`),
  CONSTRAINT `FKdfl0qn6t6fktydkrl82yxd9u5` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ledger`
--

LOCK TABLES `ledger` WRITE;
/*!40000 ALTER TABLE `ledger` DISABLE KEYS */;
/*!40000 ALTER TABLE `ledger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` binary(16) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (_binary '	·¹j\éFà¥ºøØúÈ¬','/images/campaign/introducePoster2.png'),(_binary '\r\ãÝ¸xJ¼!\Îs\Þ\ãtñ','https://cdn.pixabay.com/photo/2023/11/05/08/41/hot-air-balloon-8366532_1280.jpg'),(_binary '+¼wA¿¶p¾q¤¤','https://cdn.pixabay.com/photo/2024/08/25/12/33/seagull-8996395_1280.jpg'),(_binary '~:7\é\ÚA£Oj\Å\ë','https://cdn.pixabay.com/photo/2023/11/05/08/41/hot-air-balloon-8366532_1280.jpg'),(_binary 'F8DMv\î¶?¥','https://cdn.pixabay.com/photo/2017/08/01/23/32/colorful-2568654_1280.jpg'),(_binary '\'Y\Ñ\è@U¾òp818','/images/campaign/poster.png'),(_binary '0¯(§Nô¯p¶¥µ','https://cdn.pixabay.com/photo/2023/11/05/08/41/hot-air-balloon-8366532_1280.jpg'),(_binary '9²\î@\Ð÷J¸n\Ø6Ã','/images/campaign/introducePoster.png'),(_binary '<c\Çv\ëH5·d\'¯','/images/campaign/poster2.png'),(_binary '=¶\ìfDn¼xò>,&E','https://cdn.pixabay.com/photo/2024/08/25/12/33/seagull-8996395_1280.jpg'),(_binary 'GP¿s5\\J\'¦S\"! ¹','https://cdn.pixabay.com/photo/2017/08/01/23/32/colorful-2568654_1280.jpg'),(_binary 'c¥ð×Dt1Na,¸|','https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/InflatableBalloons.jpg/460px-InflatableBalloons.jpg'),(_binary 'n\àW\0G¤­«\×s\ß','/images/campaign/introducePoster.png'),(_binary 'q\Ó\ÇH®=(nD\0','https://cdn.pixabay.com/photo/2023/11/05/08/41/hot-air-balloon-8366532_1280.jpg'),(_binary '=h´»óMW}\ï|)8h\Ü','https://cdn.pixabay.com/photo/2023/11/05/08/41/hot-air-balloon-8366532_1280.jpg'),(_binary 'ö\Ð\íÿI»\àUi\Î','https://cdn.pixabay.com/photo/2024/08/25/12/33/seagull-8996395_1280.jpg'),(_binary '¤: D*y_VÇ­','/images/campaign/poster3.png'),(_binary '¦*ñf¡»A\îÄ[\É','https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/InflatableBalloons.jpg/460px-InflatableBalloons.jpg'),(_binary '³Aï¼J´*þ\Z@0\"','/images/campaign/poster.png'),(_binary '³\Ø,%7LQ\àÔ5\Ê','/images/campaign/poster2.png'),(_binary '¹¿ª9\0\àJ¬nYjKÁ','/images/campaign/poster4.png'),(_binary 'À¡¿D\ÇHCX¡ými7<','/images/campaign/poster3.png'),(_binary '\Ãò:DQ@|\é/\ÅGB\î','https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/InflatableBalloons.jpg/460px-InflatableBalloons.jpg'),(_binary '\Î\r<\ÅC2ªdÀ}ø	','https://cdn.pixabay.com/photo/2017/08/01/23/32/colorful-2568654_1280.jpg'),(_binary 'Ñ»_YcFÞd@\å','/images/campaign/introducePoster2.png'),(_binary '\Û\"\î¥aC!ª\ç;\ã','https://cdn.pixabay.com/photo/2024/08/25/12/33/seagull-8996395_1280.jpg'),(_binary '\ÜW}Ç¯E¸xÖ°a°z','/images/campaign/poster4.png'),(_binary '\Ü\Ð{©\ËA\é¥ @c\ßÐ¯&','https://cdn.pixabay.com/photo/2017/08/01/23/32/colorful-2568654_1280.jpg'),(_binary 'ú´ \ßz%CÔº\Z÷£þ®','https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/InflatableBalloons.jpg/460px-InflatableBalloons.jpg'),(_binary 'ü4\×J¿,P½­\ë','https://cdn.pixabay.com/photo/2017/08/01/23/32/colorful-2568654_1280.jpg');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `is_deleted` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `profile_image_id` binary(16) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','FOUNDATION','USER') DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UKmbmcqelty0fbrvxp1q58dn57t` (`email`),
  UNIQUE KEY `UK6cheof1rxqhjd4h5wfi308jo2` (`profile_image_id`),
  CONSTRAINT `FKk6dolck5tod1q6j07u7qpjmrl` FOREIGN KEY (`profile_image_id`) REFERENCES `image` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (_binary '\0','2024-11-18 15:59:17.000000',0,NULL,'givetree@givetree.co.kr','ê´ë¦¬ì','$2a$10$/.Jodl2CFABK5kOvvQPO3eMSGpJ4BqcCwJ2F6iD6A.h6N6sRY0VLe','ADMIN'),(_binary '\0','2024-11-18 15:59:17.605179',1,NULL,'member1@example.com','íì¤í¸ íì 1','$2a$10$mBIEciltEqnCgH0KOAO5w.yhLuCencelGXbLf09F3Hu1t9IAgBm3C','USER'),(_binary '\0','2024-11-18 15:59:17.693177',2,NULL,'member2@example.com','íì¤í¸ íì 2','$2a$10$FmflZQYPdnjc3LH/Wt6bVuDQMaMN/GL4Ogntv0QVAYKYG7jo.qwui','USER'),(_binary '\0','2024-11-18 15:59:17.778177',3,_binary 'ö\Ð\íÿI»\àUi\Î','foundation1@example.com','ì¬ëì ì´ë§¤','$2a$10$9FB4pyK0dmB2o6ArIDBYk.ipfD7kJw3fI9I15gJcXV2SK7FnchnIu','FOUNDATION'),(_binary '\0','2024-11-18 15:59:17.873178',4,_binary '\Û\"\î¥aC!ª\ç;\ã','foundation2@example.com','ì´ë¡ì°ì°','$2a$10$zF6pUuuEt4DJpa/7LE2oOu.oeR.SykyS05xswH.dvlItOtf41Ut3e','FOUNDATION'),(_binary '\0','2024-11-18 15:59:17.957178',5,_binary '+¼wA¿¶p¾q¤¤','foundation3@example.com','êµ¿ë¤ì´ë²ì¤','$2a$10$icyT12bHWXRYWbnhKqdo7uq90pf3NWyDH1JX.tA5uMvqju/luJn6.','FOUNDATION'),(_binary '\0','2024-11-18 15:59:18.039179',6,_binary '=¶\ìfDn¼xò>,&E','foundation4@example.com','ëíì ì­ìì¬','$2a$10$Wn0h3az2IpkMNrfoIHhJRObdPK9cD2gjsaYf0CECrfxgDygFCySz2','FOUNDATION');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_fcm_token`
--

DROP TABLE IF EXISTS `member_fcm_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_fcm_token` (
  `created_date_time` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `updated_date_time` datetime(6) NOT NULL,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_fcm_token`
--

LOCK TABLES `member_fcm_token` WRITE;
/*!40000 ALTER TABLE `member_fcm_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_fcm_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_finance`
--

DROP TABLE IF EXISTS `member_finance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_finance` (
  `member_id` bigint NOT NULL,
  `user_key` binary(16) NOT NULL,
  `salt` varbinary(255) NOT NULL,
  `simple_password` varbinary(255) NOT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_finance`
--

LOCK TABLES `member_finance` WRITE;
/*!40000 ALTER TABLE `member_finance` DISABLE KEYS */;
INSERT INTO `member_finance` VALUES (0,_binary 't	ª\Æ=ùKþMV¯\ÈA',_binary 'h\Íc@\ÑN*T>\âEF\0[R3\åg¿È¨¥',_binary '°J\Æ\ÒC!A¶\ë8v]\Z\Ñ\ÃSò8i\è,5MùqU');
/*!40000 ALTER TABLE `member_finance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_wallet`
--

DROP TABLE IF EXISTS `member_wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_wallet` (
  `member_id` bigint NOT NULL,
  `wallet_id` bigint NOT NULL,
  PRIMARY KEY (`wallet_id`),
  UNIQUE KEY `UKpjuk1nwlsc7x9fmtk8d4xxlhq` (`member_id`),
  CONSTRAINT `FK301foaj96ort4ggonqoxns8he` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKjqv0sc1418e16rrhoo4796xn8` FOREIGN KEY (`wallet_id`) REFERENCES `wallet` (`wallet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_wallet`
--

LOCK TABLES `member_wallet` WRITE;
/*!40000 ALTER TABLE `member_wallet` DISABLE KEYS */;
INSERT INTO `member_wallet` VALUES (0,0),(1,21),(2,22),(3,23),(4,24),(5,25),(6,26);
/*!40000 ALTER TABLE `member_wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `created_datetime` datetime(6) NOT NULL,
  `member_id` bigint NOT NULL,
  `notification_id` bigint NOT NULL AUTO_INCREMENT,
  `body` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refund_failure`
--

DROP TABLE IF EXISTS `refund_failure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refund_failure` (
  `amount` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `ledger_id` bigint NOT NULL,
  `processed_at` datetime(6) DEFAULT NULL,
  `refund_faulure_id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`refund_faulure_id`),
  KEY `FK9ve7w9a0hcm6vhj6u471rp18g` (`ledger_id`),
  CONSTRAINT `FK9ve7w9a0hcm6vhj6u471rp18g` FOREIGN KEY (`ledger_id`) REFERENCES `ledger` (`ledger_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refund_failure`
--

LOCK TABLES `refund_failure` WRITE;
/*!40000 ALTER TABLE `refund_failure` DISABLE KEYS */;
/*!40000 ALTER TABLE `refund_failure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale` (
  `is_deleted` bit(1) NOT NULL,
  `is_delivery_sale` bit(1) NOT NULL,
  `is_direct_sale` bit(1) NOT NULL,
  `contribution` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `funded_foundation_id` bigint NOT NULL,
  `hits` bigint NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` bigint NOT NULL,
  `purchaser_id` bigint DEFAULT NULL,
  `seller_id` bigint NOT NULL,
  `transaction_id` bigint DEFAULT NULL,
  `updated_date_time` datetime(6) NOT NULL,
  `description` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `production_condition` enum('LIKE_NEW','UNOPENED','USED') NOT NULL,
  `status` enum('ON_SALE','RESERVED','SOLD') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale`
--

LOCK TABLES `sale` WRITE;
/*!40000 ALTER TABLE `sale` DISABLE KEYS */;
INSERT INTO `sale` VALUES (_binary '\0',_binary '\0',_binary '',100,'2024-11-18 15:59:23.093101',1,0,1,1000,NULL,1,NULL,'2024-11-18 15:59:23.091103','ì¢ì ë¬¼ê±´ìëë¤~','ì¢ì ë¬¼ê±´ íëë¤','UNOPENED','ON_SALE');
/*!40000 ALTER TABLE `sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_image`
--

DROP TABLE IF EXISTS `sale_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_image` (
  `sale_id` bigint NOT NULL,
  `sale_image_id` bigint NOT NULL AUTO_INCREMENT,
  `image_id` binary(16) NOT NULL,
  PRIMARY KEY (`sale_image_id`),
  UNIQUE KEY `UKtj4t0pbhox42p4vx6petrv98l` (`image_id`),
  KEY `FKjqtieqt67cj3vf7vyb7roon0y` (`sale_id`),
  CONSTRAINT `FKa27beu0otuvecgdfhinl8l978` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`),
  CONSTRAINT `FKjqtieqt67cj3vf7vyb7roon0y` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_image`
--

LOCK TABLES `sale_image` WRITE;
/*!40000 ALTER TABLE `sale_image` DISABLE KEYS */;
INSERT INTO `sale_image` VALUES (1,1,_binary '=h´»óMW}\ï|)8h\Ü'),(1,2,_binary 'GP¿s5\\J\'¦S\"! ¹');
/*!40000 ALTER TABLE `sale_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `amount` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `receiver_wallet_id` bigint NOT NULL,
  `sender_wallet_id` bigint NOT NULL,
  `transaction_id` bigint NOT NULL AUTO_INCREMENT,
  `transaction_hash` varbinary(255) NOT NULL,
  `type` enum('CAMPAIGN_DONATION','CHARGE','EXCHANGE','FOUNDATION_DONATION','SALE') NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `FKtl024r0b6g2kvikll7y90ck8e` (`receiver_wallet_id`),
  KEY `FK3riusbq7l7tpp0fyalvx1oxnl` (`sender_wallet_id`),
  CONSTRAINT `FK3riusbq7l7tpp0fyalvx1oxnl` FOREIGN KEY (`sender_wallet_id`) REFERENCES `wallet` (`wallet_id`),
  CONSTRAINT `FKtl024r0b6g2kvikll7y90ck8e` FOREIGN KEY (`receiver_wallet_id`) REFERENCES `wallet` (`wallet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_ledger`
--

DROP TABLE IF EXISTS `transaction_ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_ledger` (
  `ledger_id` bigint NOT NULL,
  `transaction_id` bigint NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `FKasilub9vcem96kgpkj4gs9yn9` (`ledger_id`),
  CONSTRAINT `FKasilub9vcem96kgpkj4gs9yn9` FOREIGN KEY (`ledger_id`) REFERENCES `ledger` (`ledger_id`),
  CONSTRAINT `FKdvma6v0n41vpic8b6qtpm0w9n` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_ledger`
--

LOCK TABLES `transaction_ledger` WRITE;
/*!40000 ALTER TABLE `transaction_ledger` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_ledger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet` (
  `wallet_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varbinary(255) NOT NULL,
  `private_key` varbinary(255) NOT NULL,
  PRIMARY KEY (`wallet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
INSERT INTO `wallet` VALUES (0,_binary 'ó\Ö\å\Z­öô\Îj¸ry\Ïÿ¹\"f',_binary '¬	t¾Ã\ãk¤¦´\Ò8ÿK¬´x\Ë\í^ü®xM{ôòÿ'),(1,_binary '\\Í²\á\ãY)`!\ÒõØ¡k·',_binary 'ËªYy;l\ÜÕ½\èð¦»*8ZóÓ²©{\ç6[\r\ï*'),(2,_binary 'gajýQû\Ì\èþ#\Øu½©º½',_binary 'þ}FÜVAB\ä¼\ÝË¨9¥U-¿\ì\èS)HÀ*'),(3,_binary '\ßFõ\ÝßLW§Dzô®\×1\Ý',_binary '¨@\ÑJ½\Ò_\Æñ\ÚÊ³\ë3.\ß>¦9Ó¼¯'),(4,_binary '#\é\êó\ÒyÁZ>\'\íõ>\Ón]',_binary '^³\î\äe®6\â¯[ú\Z\Ø4\æy¡­/\Þku\Î\Ë\Ü8P\Ç\0<'),(5,_binary '\è¯<BãW\çR\ïx',_binary 'j£!%°ws\ê6\êú$,ÿI\\¹Áô\ÑI\Â\ëúG'),(6,_binary 'R9Ø»DÛ1·\éY]ª9Ô',_binary '¦\Ê@\'\áú6®fjûªa\0)_¦ª¬@¹\ä'),(7,_binary 'H\Ü\Ñ	FbÒGþ\0Ú¿\Ü\Ã',_binary '9Å·l\Ð:	\ã0[u5Wa½~b\Â2&\ç'),(8,_binary 'ª¨\Ý\á´[\Ó7¸\ã\ÞØlOö\Þ\í',_binary 'À¼V\åiÆÞ¯v°õ²`b\Þg6½ª¦+v\Þ_v'),(9,_binary 'ô®]¸s8úÿjDw\n¨¨',_binary '³\Õ~a\Íp9\åg?¨#§P)!\0\Ù)ñ?\ÎÀ\Å\Ç&'),(10,_binary '6»\Ú]\ë^5	0F\ä*',_binary '½ÐLf@\á	\Öjy\Ú\î#Ì¿ö§C*.h4A\Æ\Ø\Ë\Ê\Í'),(11,_binary '}M~\Í\Û5¹t\É\åHq',_binary '¸Á«x\ßZ;A\í÷6+w?\ÞÿM¦\È÷³J'),(12,_binary '®k°;Ibô\ÆG\íM\æUöQ¯',_binary 'Êö£Q$\ë%`=\È{zô\Ây[BÐO¡'),(13,_binary '$¯\â±\ÒZ\\úm«rn\å\Æ5\à2',_binary '¿P\ÉIX\0VÍUþ3R³a\Å<\ïoqK^:¹'),(14,_binary 'SH3\çt\Ì4G?c=õ¤3\ë\×@',_binary 'i}Kî®$®{~aw\Ìl9t¦¿{hÁ\×&\Ë'),(15,_binary ';tA\æw!`\Ñ\ÙÞ²is¿&\ì:',_binary '@o}a\æ^È¸1\\\éh\ÑóS\Û\'ü%^Tò¨'),(16,_binary '¦&`¢X6ÖvÁ\í¢U¬a\ß',_binary 'p£·2ix§å¸\â~(\ä\ÐMiC\Þ{°Å§K\î['),(17,_binary 'WûD8Å&szó³¹ UÀF',_binary '­N.\n+\ÏX%\Æ4;¢(H)J8\ÍD¿º=%\n\Ê'),(18,_binary 'P\Öü{/\Ý\Éd}\è\Ó\ï~Îª\ïJ',_binary '§Y:e\è^ú_H\Î	XÎ»\Ë\Çx$f\ßò°#	'),(19,_binary 'f\ãKb?Íø°`8T',_binary '\×\ã\ßÏ¤É Q-Iw«ðG~\Çð¯\Ì\Ù\\ ñY\É\Ñ'),(20,_binary 'Nd\Ìôtqz¸\Ùÿ:;ó6f\Ì',_binary '*ñ\Ù\ç$K-\á\"´\\!d@ø\ÏÃ¸)'),(21,_binary '{ßB±tMý´\Ä^¬\ÄmS',_binary 'k\ão,0¤8ªBr\0,»&\ì\n+·!\nCm\Þ'),(22,_binary 'OO!Ãrº$¶¥\é\ã\àBûý{',_binary '1\âstÆMõ\Íu|O\î¶\Îo\nDÿ\Z\r\â\ïð\Ç\Ô'),(23,_binary 'vtö¥À\àxv¹\çWl1\Ä',_binary 'm4<OrBpñhk\ãu«U\ï \î\ÅoHÁh'),(24,_binary '_N@\0§`«ð_Nps~_´',_binary 'h\Ìòñ×¡8þ±sú¨%÷yÒmQ·*Lô[\Ã\Ï'),(25,_binary '\0\à®_sO\Ê[R½V\"=q*z\Ê',_binary '# \éf\Þ	¿\ï~¦\ÝC\é\éh°NkOR=\Ý'),(26,_binary 'x\ê÷\Û\ÆóY\Ç\îBÚÐ\Æ',_binary '¢R¬nv©K\Ý\Ý\ß(@\âöø\Í14\ÊaýC\É'),(27,_binary 'Òª¼©ñÁ\Õb\àÆ¨#\ÄLTÚ',_binary 'ÿ p¯9\îOü0Ô¼\Ûò;\Ü!K\Ý\Ç/\Ù\Óv±ó\çS'),(28,_binary 'C½µq\ä]L\ËÓ¸Ñ«±>*',_binary 'ó#F\Î3,¨\áNA-,ÈGQ¶¡ZBu\È'),(29,_binary 'YÀ½&\ró»\Ê^®\"cM$\í\Êö/¶',_binary '	(²Ç§33­\Å&¬h(Ä«v8Xó\Z¶s%7^?\ê'),(30,_binary '<BTñ>\îþu6{\Â\ÜrdI!',_binary 'e\ï.FÇ\í\É\ï*LL\ÏyLa$ü´To­Ì¸\é =¹*');
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-18 16:02:48

```

# 시연 시나리오

---

**안녕하세요. 기브트리 시연을 맡게 된 윤지원입니다.**

**저희 기브트리 앱은 재단 회원과 일반 개인 회원 이렇게 두가지 유형의 사용자가 있습니다.**

**먼저 재단 회원으로 로그인하여 어떠한 기능을 할 수 있는지 보겠습니다.**

### [재단회원: 사랑의 열매(foundation1)]

로그인(foundation1) → 마이페이지 → 캠페인 신청(2025 희망 나눔 캠페인/ 11.19~2/19 / 3,000,000) →  완료 후 생성된 캠페인 상세 내역 보고 → 마이페이지 캠페인 신청 내역 확인

**미리 가입해 놓은 사랑의 열매 재단 회원으로 로그인해보겠습니다.**

**로그인이 완료되었고, 마이페이지로 가보면 재단 회원은 캠페인을 주최하고 신청할 수 있습니다.**

**(2025 희망 나눔 캠페인/ 11.19~2/19 / 3,000,000)** 

**캠페인 생성이 완료되면 다음과 같이 주최하는 캠페인 상세 내역을 확인할 수 있습니다. (소개 탭, 모금함 탭 한번씩 클릭)** 

**이렇게 생성된 캠페인은 마이페이지 내의 캠페인 신청 내역 확인 탭에서 관리할 수 있습니다.**

**그리고 개인 회원으로 가서 이렇게 진행 중인 캠페인에 후원을 해보겠습니다.**

### [개인회원: 지원산타]

로그인(member1) 되어있음 → 마이페이지 간편계좌 설정 → 비밀번호 설정 → 계좌 등록 → 메인 페이지 캠페인 확인 (3가지 분류) → 캠페인 상세보기 소개, 모금함 탭 확인 → 캠페인 후원 (10000/2025 희망 나눔 캠페인을 응원합니다./000000)

**미리 로그인 한 사용자 (지원산타)로 들어왔습니다. 후원을 하기 전에 출금할 간편 계좌를 먼저 등록하러 가보겠습니다.**

**마이페이지로 가서 간편 계좌 설정에 가보면 먼저 간편 비밀번호(000000)를 설정하고, 출금 계좌를 등록합니다.**

**간편 계좌 등록이 완료되었고, 다시 메인 페이지로 가서 생성된 캠페인들을 둘러보겠습니다.**

**메인 페이지를 보면 현재 진행 중인 캠페인과 마감 임박 캠페인과 종료 된 캠페인을 나눠서 볼 수 있습니다. (아래로 스크롤 내렸다 올린 후 진행 중인 캠페인 옆으로 슬라이드)**

**그럼 방금 생성된 희망 나눔 캠페인으로 가서 후원해보겠습니다. (캠페인 클릭 후 모금함 탭에서 후원하기 버튼 클릭)**

**후원금액을 입력하고(1만원), 캠페인 트리에 달릴 응원 메세지를 작성하고(2025 희망 나눔 캠페인을 응원합니다), 아래에 미리 등록해 놓은 결제 수단으로 결제를 진행합니다. 후원하기 버튼을 클릭하고, 아까 설정한 간편 비밀번호 000000을 입력하면 캠페인 후원이 완료됩니다.**

트리페이지 → 내가 작성한 메세지 확인 → 다른 사용자의 메세지도 확인

**후원할 때 적은 캠페인 트리 메세지는 아래의 트리 탭에서 확인할 수 있습니다.**

**트리 탭으로 가보면 내가 후원한 캠페인 트리가 먼저 보이고, 다른 트리 더보기를 클릭하면 이어서 내가 후원한 캠페인 트리가 보입니다. 내가 후원한 캠페인 트리가 다 보여진 뒤 랜덤으로 다른 캠페인 트리도 볼 수 있습니다.**

**방금 전에 후원한 희망 나눔 캠페인 트리로 가서 작성된 메세지가 잘 전달되었는지 확인해볼까요? 2025 희망 나눔 캠페인 트리의 마지막 장식 클릭하여 확인 + 다른 사용자가 쓴 메세지도 확인**

재단 페이지 재단 검색(사랑의 열매) → 소개, 모금함, 캠페인 탭 확인 후 → 재단 후원하기 → 일시후원 →정기후원

**그럼 이제 재단을 후원해보겠습니다. 재단 탭으로 가서 사랑의 열매 재단에 후원해보겠습니다.**

**사랑의 열매를 클릭하면 이렇게 재단 상세 보기가 나오고, (소개, 모금함, 캠페인 탭 클릭) 아래의 후원하기 버튼을 클릭해보면 재단 후원은 일시후원과 정기후원으로 나뉘는데 먼저 일시후원을 해보겠습니다. 금액을 입력하고(2만원) 등록된 결제 수단으로 후원을 진행하면 이렇게 완료됩니다.**

**정기후원도 해보겠습니다. 후원하기 버튼에 정기후원 클릭하고 매월 결제할 금액 (1만원) 입력 후 정기후원을 신청합니다. 정기후원은 매월 26일에 결제되며, 아직 이번 달 결제일이 되지 않았다면 이번달부터, 26일이 지났다면 다음달 부터 결제가 진행됩니다.**

### [다른 개인회원: 방금 올린 판매글에 채팅 보내주세요]

거래페이지 (나는 판매자) → 판매 게시글 작성 → 올려진 것 확인 (어느 재단에 몇 프로 기부되는지 공지)  → 채팅 알람 옴 → 채팅하기 → 판매자(나) 예약하기 → 구매자(다른 시연자) 구매하기 → 구매자(다른 시연자) 결제 (결제금의 일부는 내가 기부한 내역으로 들어감)

**다음으로 아래의 거래 탭을 보겠습니다.**

**기부 플랫폼에 왜 거래가 있지? 라고 할 수 있지만 저희 앱의 특별한 기능으로 거래 수익금 일부를 기부하는 기능이 있습니다. 중고거래를 통해 판매 수익금의 일부를 지정 재단에 기부할 수 있습니다.**

**보시면 이미 몇 가지 판매 물품들이 올라와 있습니다. 시중의 캐롯마켓과 비슷한 구조인데 판매자가 물품을 올리고 관심있는 구매자와의 채팅을 통해 물품을 예약하고 거래할 수 있습니다.**

**저도 잘 쓰지 않는 물건을 하나 올리고 판매하여 판매 수익금 일부를 기부해보겠습니다.**

**(글쓰기 버튼 클릭 후 아래 내용 입력)**

(제목: 글램팜 미니 고데기 판매합니다! 

내용: 새로 고데기를 하나 구입하여 이전에 쓰던 글램팜 미니 고데기 판매합니다. 얼마 사용하지 않았고, 거의 새상품 입니다. 열이 빨리 오르고 빨리 식습니다. 앞머리 세팅에 유용합니다.

직거래 / 사용감 있음

판매가격: 3만원

사진 두장 업로드

20000원 기부 / 사랑의 열매)

**판매글을 올렸고, 잘 등록된 것을 볼 수 있습니다. 이제 이 상품에 관심 있는 사용자가 있으면 채팅이 오게 됩니다.**

**!! 채팅 보내주세요(안녕하세요 … 이 상품 거래할게요 …)!!**

**마침 채팅 메세지가 도착했네요. 구매자와 채팅을 통해 거래를 진행해보겠습니다. 구매자가 구매를 원하면 저는 위의 예약하기 버튼을 클릭하여 이 상품을 예약 중으로 바꾸고, 상품은 직거래로 받았다 가정하고, 구매자는 결제를 진행합니다.**

**구매자의 결제가 완료되었다면 저에게 이렇게 알람이 뜨게 되고, 제가 설정한 2만원은 사랑의 열매 재단에 기부가 됩니다.**

**마이페이지로 가서 후원발자국 확인하기 보면 방금 거래로 받은 2만원이 사랑의 열매 재단에 후원 된 것을 볼 수 있습니다.**

마이페이지 → 기부발자국 확인하기 (기부내역 확인)

**그럼 지금까지 진행한 후원내역을 확인해볼까요? 마이페이지 내의 기부발자국 확인하기에 들어가보면 지금까지 후원한 내역을 확인할 수 있습니다. 00개의 재단에 정기후원 중이고, 00회의 재단 일시후원을 진행했네요. 그리고 00번 캠페인 후원을 하였네요.**

**상단의 기부발자국 표로 후원 통계 내역을 종합하여 확인할 수 있습니다.**

마이페이지 내의 세액 공제 확인하기 탭 → 올해 소득액 입력 후 계산하기

**그리고 마이페이지 내의 세액 공제 확인하기 탭은 기부를 하면 연말정산 때 세액 공제를 일부 받게 되는데 올해 나의 기부금을 토대로 얼마를 환급 받을 수 있는지 알아보는 탭입니다.**

**올해 연소득에서 각종 공제를 제외한 소득액을 입력하고 계산하기 버튼을 클릭하면 올해 내가 기부한 금액을 토대로 소득액을 기준으로 얼마를 환급 받을 수 있는지 금액이 뜨게 됩니다.**

**이제 다시 재단 회원으로 들어가서 지금까지 재단에서 어떻게 후원금을 확인하고 관리하는지 살펴보겠습니다**

### [재단회원: 사랑의 열매]

마이페이지 → 후원 내역 확인하기 (방금 한 후원 내역 확인) → 간편 계좌 설정하기 → 간편 비밀번호 설정 → 계좌 추가 → 월렛 페이지에서 환전하기 

**마이페이지로 가서 후원 내역 확인하기를 들어가보면 좀 전에 지원산타로 후원했던 내역들을 볼 수 있습니다. (재단후원/ 캠페인 후원 탭) 달 별로 나누어서 통계 내역과 상세 내역을 볼 수 있습니다.**

**그럼 이렇게 후원받은 토큰을 재단에서 어떻게 환전하여 사용하는지 보겠습니다. 환전을 하기 전, 마이페이지의 간편 계좌 설정에서 간편 비밀번호와 계좌를 등록해 준 뒤 진행하겠습니다.** 

**완료되었다면 아래의 지갑 탭으로 가서 환전을 해보겠습니다. 이렇게 후원 받은 총 금액이 뜨고, 재단 환전을 진행해보겠습니다.**

**보시면 금액 선택이 있는데 금액 선택을 클릭하면 어떤 사용자가 얼마를 후원하였는지 뜹니다.**

**이 때 환전 하고자 하는 금액을 클릭한 뒤, 어디에 사용할지 목적을 입력하고 (어르신 영양제 구입), 아까 등록한 계좌의 비밀번호 000000을 입력하면 환전 된 금액이 등록된 계좌로 입금됩니다.**

**이렇게 환전한 내역은 후원을 한 개인회원도 볼 수가 있는데요. 개인 회원으로 들어가서 보겠습니다.**

### [개인회원]

마이페이지 → 기부금 사용내역 확인하기 (방금 재단이 환전한 내역 확인)

**마이페이지 내에서 기부금 사용내역 확인하기 탭을 누르면 방금 재단이 환전한 내역을 볼 수 있습니다. 이렇게 내가 후원한 금액을 재단이 어디에 어떻게 쓰는지 알 수가 있습니다.**

**지금까지 기브트리를 통해 기부가 어떻게 진행되고, 기부한 내역이 어떻게 사용되는지를 보았습니다. 이상으로 시연을 마치겠습니다.**
