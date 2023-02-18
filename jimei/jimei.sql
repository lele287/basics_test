/*
 Navicat Premium Data Transfer

 Source Server         : zq
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : localhost:3306
 Source Schema         : jimei

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 26/10/2020 13:42:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `ClassId` int(11) NOT NULL AUTO_INCREMENT,
  `ClassName` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ClassFather_fahterId` int(11) NOT NULL,
  PRIMARY KEY (`ClassId`) USING BTREE,
  INDEX `fk_Class_ClassFather1_idx`(`ClassFather_fahterId`) USING BTREE,
  CONSTRAINT `fk_Class_ClassFather1` FOREIGN KEY (`ClassFather_fahterId`) REFERENCES `classfather` (`fatherId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, '苹果手机', 1);
INSERT INTO `class` VALUES (2, '小米手机', 1);
INSERT INTO `class` VALUES (3, '华为手机', 1);
INSERT INTO `class` VALUES (4, '三星手机', 1);
INSERT INTO `class` VALUES (5, 'OPPO手机', 1);
INSERT INTO `class` VALUES (6, 'vivo手机', 1);
INSERT INTO `class` VALUES (7, '华为平板', 2);
INSERT INTO `class` VALUES (8, 'ipad', 2);
INSERT INTO `class` VALUES (9, '小米平板', 2);
INSERT INTO `class` VALUES (10, '微软', 2);
INSERT INTO `class` VALUES (11, '联想', 3);
INSERT INTO `class` VALUES (12, '戴尔', 3);
INSERT INTO `class` VALUES (13, '惠普', 3);
INSERT INTO `class` VALUES (14, '华硕', 3);
INSERT INTO `class` VALUES (15, '苹果', 3);
INSERT INTO `class` VALUES (16, '小米', 3);
INSERT INTO `class` VALUES (17, '宁美国度', 4);
INSERT INTO `class` VALUES (18, '联想', 4);
INSERT INTO `class` VALUES (19, '华硕', 4);
INSERT INTO `class` VALUES (20, '惠普', 4);
INSERT INTO `class` VALUES (21, '名龙堂', 4);
INSERT INTO `class` VALUES (22, '技嘉', 4);
INSERT INTO `class` VALUES (23, '苹果', 4);
INSERT INTO `class` VALUES (24, '鼠标', 5);
INSERT INTO `class` VALUES (25, '键盘', 5);
INSERT INTO `class` VALUES (26, '耳机', 5);
INSERT INTO `class` VALUES (27, '显示器', 5);
INSERT INTO `class` VALUES (28, '音响', 5);
INSERT INTO `class` VALUES (29, '主板等', 5);

-- ----------------------------
-- Table structure for classfather
-- ----------------------------
DROP TABLE IF EXISTS `classfather`;
CREATE TABLE `classfather`  (
  `fatherId` int(11) NOT NULL AUTO_INCREMENT,
  `fatherName` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`fatherId`) USING BTREE,
  UNIQUE INDEX `childrenName_UNIQUE`(`fatherName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classfather
-- ----------------------------
INSERT INTO `classfather` VALUES (4, '台式机');
INSERT INTO `classfather` VALUES (2, '平板电脑');
INSERT INTO `classfather` VALUES (1, '手机');
INSERT INTO `classfather` VALUES (5, '电脑配件');
INSERT INTO `classfather` VALUES (3, '笔记本');

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection`  (
  `collectionId` int(255) NOT NULL AUTO_INCREMENT,
  `userInfos_uId` int(255) NOT NULL,
  `goods_gId` int(255) NOT NULL,
  PRIMARY KEY (`collectionId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES (34, 3, 3);
INSERT INTO `collection` VALUES (35, 3, 142);
INSERT INTO `collection` VALUES (36, 3, 142);
INSERT INTO `collection` VALUES (37, 3, 140);
INSERT INTO `collection` VALUES (39, 3, 129);
INSERT INTO `collection` VALUES (45, 3, 129);
INSERT INTO `collection` VALUES (48, 3, 86);
INSERT INTO `collection` VALUES (49, 3, 134);

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `userInfos_uId` int(11) NOT NULL,
  `goods_gId` int(11) NOT NULL,
  `comId` int(11) NOT NULL AUTO_INCREMENT,
  `comDate` datetime(0) NOT NULL,
  `comMes` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `comLevel` int(11) NOT NULL,
  PRIMARY KEY (`comId`) USING BTREE,
  INDEX `fk_userInfos_has_goods1_goods1_idx`(`goods_gId`) USING BTREE,
  INDEX `fk_userInfos_has_goods1_userInfos1_idx`(`userInfos_uId`) USING BTREE,
  CONSTRAINT `fk_userInfos_has_goods1_goods1` FOREIGN KEY (`goods_gId`) REFERENCES `goods` (`gId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_userInfos_has_goods1_userInfos1` FOREIGN KEY (`userInfos_uId`) REFERENCES `userinfos` (`uId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (1, 3, 1, '2020-09-12 10:00:00', 'test', 1);
INSERT INTO `comments` VALUES (3, 78, 2, '2020-10-19 19:27:54', '111', 5);
INSERT INTO `comments` VALUES (3, 97, 3, '2020-10-20 21:39:21', '12313', 5);

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `gId` int(11) NOT NULL AUTO_INCREMENT,
  `gName` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gMes` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gPrice` int(11) NOT NULL,
  `gHits` int(11) NOT NULL,
  `gNum` int(11) NOT NULL,
  `gSetterId` int(11) NOT NULL,
  `gDiscount` int(11) NOT NULL,
  `Class_ClassId` int(11) NOT NULL,
  `gPic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gSetTime` datetime(0) NOT NULL,
  PRIMARY KEY (`gId`) USING BTREE,
  UNIQUE INDEX `gId_UNIQUE`(`gId`) USING BTREE,
  INDEX `fk_goods_userInfos1_idx`(`gSetterId`) USING BTREE,
  INDEX `fk_goods_Class1_idx`(`Class_ClassId`) USING BTREE,
  CONSTRAINT `fk_goods_Class1` FOREIGN KEY (`Class_ClassId`) REFERENCES `class` (`ClassId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_goods_userInfos1` FOREIGN KEY (`gSetterId`) REFERENCES `userinfos` (`uId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 205 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, '苹果 iPhone X', '', 3400, 2, 7, 1, 1, 1, 'https://img12.360buyimg.com/n1/s250x250_jfs/t11938/247/1821328042/25414/c8a2570/5a0d640dNb09bde40.png', '2020-08-17 16:00:01');
INSERT INTO `goods` VALUES (2, '苹果 iPhone XS Max', NULL, 5882, 10, 1, 2, 0, 1, 'https://img10.360buyimg.com/n1/s250x250_jfs/t26713/121/1763493512/26686/29e3abf3/5bebbfa7N2363a4aa.jpg', '2020-07-12 14:01:03');
INSERT INTO `goods` VALUES (3, '苹果 iPhone 8Plus', NULL, 3012, 2, 1, 1, 0, 1, 'https://img10.360buyimg.com/n1/s250x250_jfs/t9235/89/1979904851/25636/3917b0f6/59c266edN02f2fe47.jpg', '2019-08-13 17:05:42');
INSERT INTO `goods` VALUES (4, '苹果 iPhone 7 Plus', NULL, 2330, 3, 1, 1, 0, 1, 'https://img12.360buyimg.com/n1/s250x250_jfs/t4063/249/1174541139/19585/1d871c20/58bd22b0Nb107da23.jpg', '2018-07-04 09:08:56');
INSERT INTO `goods` VALUES (5, '苹果 iPhone XR', NULL, 3582, 1, 1, 2, 0, 1, 'https://img20.360buyimg.com/n1/s250x250_jfs/t27295/108/1763317812/23591/11cccaa2/5bebc3c3N30a4c1d9.jpg', '2019-08-16 15:07:34');
INSERT INTO `goods` VALUES (6, '苹果 iPhone 6', NULL, 520, 0, 1, 1, 0, 1, 'https://img20.360buyimg.com/n1/s250x250_jfs/t2836/164/2735181363/32582/bbb33383/577217daN251fa33f.jpg', '2020-07-16 08:02:03');
INSERT INTO `goods` VALUES (7, '苹果 iPhone 6S', NULL, 653, 0, 1, 1, 0, 1, 'https://img14.360buyimg.com/n1/s250x250_jfs/t2770/183/2727557748/40209/1bfdcb97/577217e3N4cab38a1.jpg', '2018-12-08 16:00:00');
INSERT INTO `goods` VALUES (8, '苹果 iPhone 7', NULL, 1161, 1, 1, 2, 0, 1, 'https://img14.360buyimg.com/n1/s250x250_jfs/t3259/46/4053169174/19585/1d871c20/57fc3c70N2f95aac2.jpg', '2017-06-16 13:07:40');
INSERT INTO `goods` VALUES (9, '苹果 iPhone 6S Plus', NULL, 796, 2, 1, 1, 0, 1, 'https://img10.360buyimg.com/n1/s250x250_jfs/t2806/201/2740121037/29611/46511a1e/577217e3Nfea607dd.jpg', '2020-01-15 12:56:40');
INSERT INTO `goods` VALUES (10, '苹果 iPhone 6 Plus', NULL, 534, 3, 1, 2, 0, 1, 'https://img14.360buyimg.com/n1/s250x250_jfs/t2590/167/2720968434/33924/2fcbebe0/577217dcNdb163991.jpg', '2016-04-12 13:45:21');
INSERT INTO `goods` VALUES (11, '苹果 iPhone 8', NULL, 2092, 0, 1, 2, 0, 1, 'https://img10.360buyimg.com/n1/s250x250_jfs/t8545/89/1964656348/25636/3917b0f6/59c266bcNf9160bda.jpg', '2020-01-01 13:00:43');
INSERT INTO `goods` VALUES (12, '苹果 iPhone XS', NULL, 4411, 4, 1, 2, 0, 1, 'https://img10.360buyimg.com/n1/s250x250_jfs/t25237/223/2636631770/26887/cfd30f46/5bebbfa7N3ac7fa9b.jpg', '2016-06-19 16:04:53');
INSERT INTO `goods` VALUES (13, '苹果 iPhone SE 2', NULL, 3350, 0, 1, 1, 0, 1, 'https://img20.360buyimg.com/n1/s250x250_jfs/t1/122246/15/887/15256/5eb818d8E622b3453/6f6375f1f75cdc88.png', '2019-07-04 13:42:13');
INSERT INTO `goods` VALUES (14, '苹果 iPhone 11', NULL, 4986, 5, 1, 1, 0, 1, 'https://img12.360buyimg.com/n1/s250x250_jfs/t1/58809/18/11283/12278/5d848ec4Ee5ae6871/d9e3283eb64248bd.png', '2017-06-07 14:12:01');
INSERT INTO `goods` VALUES (15, '苹果 iPhone 11 Pro', NULL, 7045, 0, 1, 1, 0, 1, 'https://img10.360buyimg.com/n1/s250x250_jfs/t1/46100/26/11317/17293/5d848ec4Ec2fc2ab5/92513397fa71a3af.png', '2018-06-15 17:35:21');
INSERT INTO `goods` VALUES (16, '苹果 iPhone 11 Pro Max', NULL, 8042, 1, 0, 2, 0, 1, 'https://img10.360buyimg.com/n1/s250x250_jfs/t1/81918/17/10907/16170/5d848ec4E443fb1b0/c19ff60039749c4a.png', '2017-08-30 20:24:32');
INSERT INTO `goods` VALUES (17, '苹果 iPhone SE', NULL, 568, 5, 1, 2, 0, 1, 'https://img14.360buyimg.com/n1/s250x250_jfs/t2977/105/1031670561/37605/4aa221f2/577217d7N1e5cc1a9.jpg', '2017-07-09 22:13:02');
INSERT INTO `goods` VALUES (18, '苹果 iPhone 5c', NULL, 122, 0, 1, 1, 0, 1, 'https://img10.360buyimg.com/n1/s250x250_jfs/t2881/109/2750161893/35124/16ced713/577217dfNd0f138ad.jpg', '2015-07-01 13:02:08');
INSERT INTO `goods` VALUES (19, '苹果 iPhone 4', NULL, 20, 2, 1, 1, 0, 1, 'https://img20.360buyimg.com/n1/s250x250_jfs/t2698/136/2757466468/30759/a460ffae/577217daN10d98b15.jpg', '2013-08-13 13:24:05');
INSERT INTO `goods` VALUES (20, '苹果 iPhone 4s', NULL, 40, 1, 1, 2, 0, 1, 'https://img14.360buyimg.com/n1/s250x250_jfs/t2821/110/2731648777/30629/c524e852/577217d9N94ecba4f.jpg', '2014-08-09 13:02:07');
INSERT INTO `goods` VALUES (21, '苹果 iPhone X', NULL, 3573, 0, 1, 1, 0, 1, 'https://img12.360buyimg.com/n1/s250x250_jfs/t11938/247/1821328042/25414/c8a2570/5a0d640dNb09bde40.png', '2019-12-29 16:57:08');
INSERT INTO `goods` VALUES (22, '华为（HUAWEI）P8', NULL, 253, 30, 1, 1, 0, 3, 'https://img14.360buyimg.com/n7/jfs/t1/136208/29/3408/217961/5efc5ab4E7c46e33a/1455430debcc4ba9.jpg', '2020-09-15 11:06:10');
INSERT INTO `goods` VALUES (23, '华为（HUAWEI）', NULL, 538, 5, 1, 1, 0, 3, 'https://img10.360buyimg.com/n7/jfs/t1/147168/13/1883/203120/5efc5ab5Ebb69319b/8d52cbd376df502c.jpg', '2020-09-02 11:07:19');
INSERT INTO `goods` VALUES (24, 'Huawei/华为P30手机', NULL, 2299, 3, 1, 1, 0, 3, 'https://img10.360buyimg.com/n7/jfs/t1/94143/25/4906/94010/5dea25c1E2304af50/27f029e001a33ed1.png', '2020-06-10 09:08:20');
INSERT INTO `goods` VALUES (26, '华为 HUAWEI Mate30Pro', NULL, 3849, 2, 1, 1, 0, 3, 'https://img11.360buyimg.com/n7/jfs/t1/120758/24/12156/162061/5f59d59bEf509505d/070023907158efca.jpg', '2018-12-12 11:11:07');
INSERT INTO `goods` VALUES (27, '华为 荣耀V9', NULL, 415, 7, 1, 1, 0, 3, 'https://img13.360buyimg.com/n7/jfs/t1/130689/5/3348/560173/5efc5ab9Ead0fc3cb/cd1db77e734eb248.png', '2018-03-06 05:12:01');
INSERT INTO `goods` VALUES (28, '华为手机 畅享5S', NULL, 238, 1, 1, 1, 0, 3, 'https://img10.360buyimg.com/n7/jfs/t1/125786/26/10860/130653/5f467f0dE8b862942/2b0deda0cdff0fd3.jpg', '2017-08-16 11:13:36');
INSERT INTO `goods` VALUES (29, '华为 HUAWEI P20', NULL, 1119, 2, 1, 1, 0, 3, 'https://img10.360buyimg.com/n7/jfs/t1/150270/35/8269/240979/5f5e4daeE1082d32f/32e53c87205ae8e8.jpg', '2018-10-03 23:14:47');
INSERT INTO `goods` VALUES (30, '华为（HUAWEI）荣耀6', NULL, 268, 0, 1, 1, 0, 3, 'https://img14.360buyimg.com/n7/jfs/t1/126661/34/6020/238452/5efc5ab5Edb997c9e/b8c23b3d7354a1d4.jpg', '2020-06-04 11:15:46');
INSERT INTO `goods` VALUES (31, '华为（HUAWEI）P8', NULL, 250, 0, 1, 1, 0, 3, 'https://img13.360buyimg.com/n7/jfs/t1/114396/40/11231/226688/5efc5ab5E2b1b7bf3/4c654e2c34edf178.jpg', '2015-11-19 13:17:05');
INSERT INTO `goods` VALUES (32, 'Huawei/华为 P20 ', NULL, 1316, 4, 1, 1, 0, 3, 'https://img13.360buyimg.com/n7/jfs/t1/144505/26/8444/243006/5f5e4daaE4abb16ba/48eca484add14f4a.jpg', '2020-05-19 18:18:25');
INSERT INTO `goods` VALUES (33, '华为 nova3e', NULL, 799, 7, 1, 1, 0, 3, 'https://img10.360buyimg.com/n7/jfs/t1/12091/2/4203/759989/5c2e04c1E49d03b50/41313eecabf04e26.png', '2020-09-01 19:19:30');
INSERT INTO `goods` VALUES (34, 'Huawei/华为P30手机', NULL, 2299, 0, 1, 1, 0, 3, 'https://img13.360buyimg.com/n7/jfs/t1/89234/24/5047/121461/5dea25ccE8ea0e9ca/f32400cc87b7d7d0.png', '2019-07-24 17:20:21');
INSERT INTO `goods` VALUES (35, '华为 nova3e', NULL, 799, 1, 1, 1, 0, 3, 'https://img11.360buyimg.com/n7/jfs/t1/27457/15/4091/649047/5c2e04f8E97c69aea/2072c6adc71007f1.png', '2018-08-06 11:21:30');
INSERT INTO `goods` VALUES (36, '华为Mate10二手手机', NULL, 858, 0, 1, 1, 0, 3, 'https://img12.360buyimg.com/n7/jfs/t1/135294/8/9811/179249/5f5e4da9Ebbeb9287/81e77516a26c7046.jpg', '2019-09-17 22:22:32');
INSERT INTO `goods` VALUES (37, 'Huawei/华为P30 Pro手机', NULL, 2889, 6, 1, 1, 0, 3, 'https://img12.360buyimg.com/n7/jfs/t1/97541/8/5821/109047/5df05c0bE54547b3b/60d7bcfb8373c185.png', '2017-10-12 16:45:35');
INSERT INTO `goods` VALUES (38, '华为 Mate8 安卓智能手机', NULL, 550, 0, 1, 1, 0, 3, 'https://img13.360buyimg.com/n7/jfs/t1/73663/26/14268/114429/5dbcf879Edaeb425f/eca0f5e0ac0c5834.jpg', '2016-10-19 11:24:44');
INSERT INTO `goods` VALUES (39, '华为 HUAWEI P30 Pro ', NULL, 2869, 0, 1, 1, 0, 3, 'https://img14.360buyimg.com/n7/jfs/t1/125205/14/12575/168208/5f5e233dE9243e253/d37af75328ba2100.jpg', '2020-04-14 05:59:30');
INSERT INTO `goods` VALUES (40, '华为手机 畅享5S', NULL, 248, 0, 1, 1, 0, 3, 'https://img13.360buyimg.com/n7/jfs/t1/116848/28/16177/123653/5f467f1eE93b12b6a/8afaba008755e418.jpg', '2017-07-18 23:56:26');
INSERT INTO `goods` VALUES (41, '华为手机 荣耀', NULL, 208, 1, 1, 1, 0, 3, 'https://img11.360buyimg.com/n7/jfs/t1/117724/30/16363/101460/5f4684f6Ed26a7808/d163f99585473f8f.jpg', '2018-11-21 13:46:25');
INSERT INTO `goods` VALUES (42, 'Huawei/华为P30手机', NULL, 2199, 0, 1, 1, 0, 3, 'https://img11.360buyimg.com/n7/jfs/t1/122160/11/10981/87246/5f476e01Ea3bb08d5/c76e51b8758ae2d7.jpg', '2020-02-10 13:51:15');
INSERT INTO `goods` VALUES (43, ' Apple AirPods Pro3代/Air Pods2代 蓝牙耳机', NULL, 1399, 2, 1, 1, 0, 26, 'https://img13.360buyimg.com/n7/jfs/t1/113536/19/11229/32891/5efad1c5E9ee73681/12f43ba5b3c40280.jpg', '2020-09-02 15:12:00');
INSERT INTO `goods` VALUES (44, 'Beats X 蓝牙无线耳机 入耳式手机耳机', NULL, 328, 3, 1, 1, 0, 26, 'https://img12.360buyimg.com/n7/jfs/t1/133348/13/9449/131486/5f573832E79192d09/e7f9f6f434c30c32.jpg', '2019-10-16 15:13:05');
INSERT INTO `goods` VALUES (45, 'Apple/苹果 AirPods2单只耳机补配1代', NULL, 288, 0, 1, 1, 0, 26, 'https://img14.360buyimg.com/n7/jfs/t1/79144/22/7002/46041/5d522c58Ee94f0385/66b03e87661fdb36.jpg', '2017-10-18 15:14:10');
INSERT INTO `goods` VALUES (46, 'Beats solo2 wireless无线蓝牙头戴式耳机solo3魔音studio3 ', NULL, 388, 8, 1, 1, 0, 26, 'https://img13.360buyimg.com/n7/jfs/t1/145659/14/2845/123540/5f0d0c98Ef96941fd/8230dc4c5e2d385c.jpg', '2016-04-05 15:15:26');
INSERT INTO `goods` VALUES (47, 'Apple AirPods2代 二手蓝牙耳机', NULL, 839, 0, 1, 1, 0, 26, 'https://img11.360buyimg.com/n7/jfs/t1/130245/12/5171/28709/5f192924Ebef87b62/c2a9ca608b4cc2df.jpg', '2019-05-14 15:18:06');
INSERT INTO `goods` VALUES (48, 'Apple EarPods 苹果耳机原装正品', NULL, 108, 0, 1, 1, 0, 26, 'https://img14.360buyimg.com/n7/jfs/t1/148535/1/7464/78151/5f4f7c8aEbae1c581/0cf65a83a4c96450.jpg', '2019-04-02 15:20:44');
INSERT INTO `goods` VALUES (49, 'Beats Powerbeats2  3魔音苹果耳机', NULL, 268, 0, 1, 1, 0, 26, 'https://img11.360buyimg.com/n7/jfs/t1/120579/31/8490/76490/5f262debEa560d019/66dcb8273e389f07.jpg', '2011-11-24 15:29:54');
INSERT INTO `goods` VALUES (50, '雷蛇(RAZER)北海巨妖X', NULL, 138, 0, 1, 1, 0, 26, 'https://img12.360buyimg.com/n7/jfs/t1/140543/40/4307/145928/5f23e0e7E814e8dc6/66ce93b29608f08c.jpg', '2014-07-18 15:34:53');
INSERT INTO `goods` VALUES (51, '索尼（SONY）WH-1000XM3', NULL, 1368, 1, 1, 1, 0, 26, '\"https://img12.360buyimg.com/n7/jfs/t1/122740/14/6795/104588/5f0981e7E8af62fbd/e5d1d29936ae7716.jpg', '2016-07-24 15:36:05');
INSERT INTO `goods` VALUES (52, 'vivo蓝牙耳机双耳无线耳机5.0', NULL, 98, 1, 1, 1, 0, 26, 'https://img13.360buyimg.com/n7/jfs/t1/134435/28/5080/340815/5f181210E41643c3a/201b97cc5c8bfcf5.png', '2014-07-18 15:38:03');
INSERT INTO `goods` VALUES (53, '华为mate30/pro无线蓝牙耳机', NULL, 88, 5, 1, 1, 0, 26, 'https://img14.360buyimg.com/n7/jfs/t1/140039/17/2308/33885/5f0302f7E16ba4a6a/2768b3f5bf356edc.jpg', '2017-07-26 20:38:58');
INSERT INTO `goods` VALUES (54, 'Apple蓝牙耳机AirPods', NULL, 1269, 3, 1, 1, 0, 26, 'https://img11.360buyimg.com/n7/jfs/t1/132488/38/9139/146069/5f533b44Edfe3d2ed/f1b0859a9583a1f2.jpg', '2015-06-05 23:38:43');
INSERT INTO `goods` VALUES (55, '小米无线蓝牙耳机耳塞挂耳式开车超长待机', NULL, 89, 0, 1, 1, 0, 26, 'https://img11.360buyimg.com/n7/jfs/t27238/255/344549927/288387/624aef9a/5b8edc72N4094efc2.jpg', '2014-12-07 01:02:36');
INSERT INTO `goods` VALUES (56, '雷蛇(RAZER)北海巨妖X 7.1V2幻彩版耳机', NULL, 168, 0, 1, 1, 0, 26, 'https://img11.360buyimg.com/n7/jfs/t1/58817/1/15343/125398/5dcd8a4bE98ae9059/62ec1857913585ec.jpg', '2017-04-14 07:21:46');
INSERT INTO `goods` VALUES (57, '索尼（SONY）WH-1000XM3', NULL, 1358, 0, 1, 1, 0, 26, 'https://img12.360buyimg.com/n7/jfs/t1/117650/36/12108/93242/5f0958c4E54f982dd/2878695e53a64237.jpg', '2013-01-24 14:21:59');
INSERT INTO `goods` VALUES (58, 'Apple蓝牙耳机AirPods', NULL, 699, 7, 1, 1, 0, 26, 'https://img11.360buyimg.com/n7/jfs/t1/143456/7/7697/120759/5f533b45E3b8721f6/244588ffba65b926.jpg', '2019-06-13 19:56:13');
INSERT INTO `goods` VALUES (59, '赛睿（SteelSeries）耳机', NULL, 148, 4, 1, 1, 0, 26, 'https://img11.360buyimg.com/n7/jfs/t1/85765/21/7147/78911/5df7cfd7Ea41bd988/8008249b242abda9.jpg', '2018-07-05 15:48:48');
INSERT INTO `goods` VALUES (60, 'Beats studio2.0  魔音录音师2', NULL, 299, 1, 1, 1, 0, 26, 'https://img10.360buyimg.com/n7/jfs/t1/114470/7/17114/136958/5f573832E92f49036/cc80acea492cb5f5.jpg', '2016-12-08 03:01:34');
INSERT INTO `goods` VALUES (61, '小米Redmi K30', NULL, 1499, 2, 1, 1, 1, 2, 'https://img13.360buyimg.com/n7/jfs/t1/106560/26/5537/102152/5dee4905Eca36b22a/04419fee92afd68c.jpg', '2020-03-05 16:00:32');
INSERT INTO `goods` VALUES (62, '小米Redmi 9A', NULL, 599, 3, 1, 1, 1, 2, 'https://img12.360buyimg.com/n7/jfs/t1/118064/27/12885/59959/5f17b7efE453f688d/5b33ac76b2aaea9b.jpg', '2014-01-09 16:19:05');
INSERT INTO `goods` VALUES (63, 'Redmi 10X 4G Helio G85游戏芯', NULL, 999, 0, 1, 1, 0, 2, 'https://img13.360buyimg.com/n7/jfs/t1/129887/36/392/108566/5eccc3e5E1c5fb0d7/c00a373623f3eb2e.jpg', '2018-05-17 16:20:57');
INSERT INTO `goods` VALUES (64, '小米 红米Redmi Note8 ', NULL, 899, 0, 1, 1, 0, 2, 'https://img14.360buyimg.com/n7/jfs/t1/65786/38/8555/351173/5d674913E0a3b51f6/8d2e3fadc4cfac3c.jpg', '2016-10-06 10:33:14');
INSERT INTO `goods` VALUES (65, '小米10', NULL, 3949, 0, 1, 1, 0, 2, 'https://img12.360buyimg.com/n7/jfs/t1/91087/36/12227/66469/5e44f450E4a424f4e/7d23ad95ca25f0b4.jpg', '2016-02-11 16:34:09');
INSERT INTO `goods` VALUES (66, 'Redmi Note8Pro', NULL, 1099, 5, 1, 1, 1, 2, 'https://img13.360buyimg.com/n7/jfs/t1/39922/24/15447/189604/5d67a603Ebdb5c6c4/09ddd17f500d721e.jpg', '2019-03-15 11:20:58');
INSERT INTO `goods` VALUES (67, '小米红米9A ', NULL, 628, 0, 1, 1, 0, 2, 'https://img13.360buyimg.com/n7/jfs/t1/110760/27/19042/109209/5f508dbbE885aa0fb/b3019dc8445ddffd.jpg', '2017-12-03 16:36:04');
INSERT INTO `goods` VALUES (68, '小米红米8A ', NULL, 682, 30, 1, 1, 0, 2, 'https://img14.360buyimg.com/n7/jfs/t1/130586/8/2371/89281/5ee879a9Ebdd8a8b5/8fd0d2e7bc79662e.jpg', '2018-06-13 16:36:52');
INSERT INTO `goods` VALUES (69, '小米Redmi红米K30pro 5G手机', NULL, 2658, 1, 1, 1, 0, 2, 'https://img12.360buyimg.com/n7/jfs/t1/132313/12/1892/633794/5ee0955fEd9be0fa5/d894f3733b67db7b.png', '2020-09-15 16:37:50');
INSERT INTO `goods` VALUES (70, 'Redmi 10X Pro 天玑820', NULL, 2099, 1, 1, 1, 0, 2, 'https://img14.360buyimg.com/n7/jfs/t1/132854/40/308/80278/5ecbafd9Efa0864db/4bf83e80de2c6bba.jpg', '2019-03-16 16:38:24');
INSERT INTO `goods` VALUES (71, '小米 红米K30pro', NULL, 2658, 0, 1, 1, 0, 2, 'https://img14.360buyimg.com/n7/jfs/t1/127848/40/12273/145334/5f588136Ef6416759/501b8e8ffaa7e26c.jpg', '2017-06-24 16:39:14');
INSERT INTO `goods` VALUES (72, '小米红米10X ', NULL, 958, 8, 1, 1, 0, 2, 'https://img14.360buyimg.com/n7/jfs/t1/111375/5/17515/135292/5f59bcfaEa1c53426/c804e94f5dcb44fc.jpg', '2020-07-16 16:40:12');
INSERT INTO `goods` VALUES (73, '小米10青春版', NULL, 2099, 0, 1, 1, 0, 2, 'https://img11.360buyimg.com/n7/jfs/t1/134583/1/9089/126284/5f522facE6d1cc236/c78546f9745a6190.jpg', '2018-09-20 06:22:01');
INSERT INTO `goods` VALUES (74, '小米 红米9A Redmi 9A', NULL, 629, 3, 1, 1, 0, 2, 'https://img14.360buyimg.com/n7/jfs/t1/138548/30/7528/87414/5f520f22E76ce8dc1/dea790944d186166.jpg', '2019-07-19 16:41:59');
INSERT INTO `goods` VALUES (75, '小米10pro', NULL, 5039, 2, 1, 1, 1, 2, 'https://img12.360buyimg.com/n7/jfs/t1/120608/20/11985/649263/5f54ad27E1e76341d/a30fe834db492eb7.png', '2020-09-05 21:10:57');
INSERT INTO `goods` VALUES (76, '三星（SAMSUNG）Galaxy三星S8+', NULL, 1379, 4, 1, 1, 1, 4, 'https://img12.360buyimg.com/n7/jfs/t1/142453/26/8408/159707/5f5ec991E3cd62f36/9adbd036b8d8ca60.jpg', '2018-03-14 16:50:06');
INSERT INTO `goods` VALUES (77, '三星（SAMSUNG）Galaxy', NULL, 1279, 0, 1, 1, 0, 4, 'https://img12.360buyimg.com/n7/jfs/t1/148225/2/8416/201114/5f5ec993E10c16b9e/5c91119eae3732c7.jpg', '2017-10-25 20:18:19');
INSERT INTO `goods` VALUES (78, '三星（SAMSUNG）Galaxy Note8', NULL, 1799, 1, -1, 1, 0, 4, 'https://img10.360buyimg.com/n7/jfs/t1/149688/18/8123/227218/5f5ec991E7958eacb/8b66d4be8a586168.jpg', '2018-05-23 14:32:30');
INSERT INTO `goods` VALUES (79, '三星（SAMSUNG）Galaxy三星S9+', NULL, 2299, 10, 1, 1, 0, 4, 'https://img12.360buyimg.com/n7/jfs/t1/118104/30/17652/177211/5f5ec992Ee6bd8c97/a7b9cacbf75b63a8.jpg', '2019-10-16 16:53:35');
INSERT INTO `goods` VALUES (80, '三星（SAMSUNG） W2018（SM-W2018）', NULL, 3950, 3, 1, 1, 0, 4, 'https://img12.360buyimg.com/n7/jfs/t1/29970/21/12640/86147/5c999f11Edd7df56e/a54183ed5655f7c2.jpg', '2018-08-26 16:54:41');
INSERT INTO `goods` VALUES (81, '三星 Galaxy S20 Ultra ', NULL, 6899, 0, 1, 1, 0, 4, 'https://img11.360buyimg.com/n7/jfs/t1/127476/30/12348/165623/5f5ec978E6717b877/dccb3141f9523cd2.jpg', '2019-03-22 16:55:34');
INSERT INTO `goods` VALUES (82, 'Galaxy Note10+（5G版）', NULL, 4599, 0, 1, 1, 0, 4, 'https://img12.360buyimg.com/n7/jfs/t1/143161/8/8534/235657/5f5f7e3dE05afd19c/723a67bdcb99f6a4.jpg', '2019-12-05 16:56:45');
INSERT INTO `goods` VALUES (83, '三星S9+SM-G9650/DS', NULL, 1998, 2, 1, 1, 0, 4, 'https://img11.360buyimg.com/n7/jfs/t1/113599/12/6047/33498/5eb78992Eff6e256d/8e48920851ed013b.jpg', '2019-03-21 16:57:41');
INSERT INTO `goods` VALUES (84, '三星 Galaxy A90 (A9080)5G骁龙855', NULL, 2158, 4, 1, 1, 0, 4, 'https://img13.360buyimg.com/n7/jfs/t1/125380/16/10284/151874/5f408dc2E972ba716/6bd9822b973bc006.jpg', '2019-11-27 03:12:24');
INSERT INTO `goods` VALUES (85, '三星 Galaxy A90（A9080）5G ', NULL, 2188, 1, 1, 1, 0, 4, 'https://img10.360buyimg.com/n7/jfs/t1/92000/15/2927/122587/5dd90d46E2c7887bf/d0b4d32dd2c03d68.jpg', '2016-01-21 03:23:26');
INSERT INTO `goods` VALUES (86, 'OPPO R9', NULL, 488, 3, 1, 1, 0, 5, 'https://img11.360buyimg.com/n7/jfs/t1/132114/23/9964/230894/5f5f8354E00043286/5efd1696198e0f9a.jpg', '2017-11-21 18:18:52');
INSERT INTO `goods` VALUES (87, 'OPPO A37', NULL, 268, 42, 1, 1, 0, 5, 'https://img11.360buyimg.com/n7/jfs/t1/124845/36/12534/375797/5f5f8355Edf1f13c1/61bd782411e20383.png', '2018-07-26 18:19:41');
INSERT INTO `goods` VALUES (88, ' OPPO 1107', NULL, 159, 26, 1, 1, 0, 5, 'https://img13.360buyimg.com/n7/jfs/t1/124714/24/6059/227092/5efc5ab5E5d9d201e/b628ce4965dee84d.jpg', '2008-11-21 18:20:44');
INSERT INTO `goods` VALUES (89, 'oppo A57 ', NULL, 336, 1, 1, 1, 0, 5, 'https://img10.360buyimg.com/n7/jfs/t1/143901/31/4562/835782/5f28fddbE96b7ecc1/cb4d31e92d4861e2.png', '2017-03-17 18:21:34');
INSERT INTO `goods` VALUES (90, 'OPPO A59S 手机', NULL, 388, 6, 1, 1, 0, 5, 'https://img12.360buyimg.com/n7/jfs/t24700/159/1752080257/325957/6fd4ae72/5bbb0b99N79723116.jpg', '2017-07-29 22:22:49');
INSERT INTO `goods` VALUES (91, 'OPPO R15X r15x', NULL, 980, 3, 1, 1, 0, 5, 'https://img10.360buyimg.com/n7/jfs/t29269/302/953717587/212445/fd5049b2/5c02a340Nf853995a.jpg', '2019-06-02 09:00:48');
INSERT INTO `goods` VALUES (92, 'OPPO Reno3 Pro 5G', NULL, 2398, 1, 1, 1, 0, 5, 'https://img11.360buyimg.com/n7/jfs/t1/124382/16/8804/162945/5f2939ecEfd00e60e/c0c2fea021f643f0.jpg', '2018-11-15 05:34:49');
INSERT INTO `goods` VALUES (93, 'OPPOR9S手机 OPPO R9s', NULL, 553, 0, 1, 1, 0, 5, 'https://img12.360buyimg.com/n7/jfs/t1/108841/40/2044/54273/5e0337f1E902fa21f/80ab6d53291144ce.jpg', '2018-10-18 09:20:31');
INSERT INTO `goods` VALUES (94, 'OPPO Find X 安卓二手手机', NULL, 1768, 0, 1, 1, 0, 5, 'https://img10.360buyimg.com/n7/jfs/t1/116581/26/10752/229434/5eef4918Ec820a046/2d73293ddd88f3eb.jpg', '2016-10-21 06:28:23');
INSERT INTO `goods` VALUES (95, 'oppor9手机 OPPO R9', NULL, 498, 0, 1, 1, 0, 5, 'https://img13.360buyimg.com/n7/jfs/t26968/96/274128552/247954/1cfe9d94/5b8ca4b7N5c18d719.jpg', '2018-02-27 18:27:28');
INSERT INTO `goods` VALUES (96, 'OPPO Reno 十倍变焦版', NULL, 1799, 5, 1, 1, 0, 5, 'https://img12.360buyimg.com/n7/jfs/t1/149719/10/6130/277540/5f3f396aEc07c4e3e/c91fa4906a1ece3f.png', '2018-02-02 01:28:16');
INSERT INTO `goods` VALUES (97, 'OPPO A57 安卓手机', NULL, 348, 52, 1, 1, 0, 5, 'https://img11.360buyimg.com/n7/jfs/t1/129175/8/12464/233116/5f5f8358Eb80a9b7d/894acda63e7799e9.jpg', '2017-11-07 08:12:18');
INSERT INTO `goods` VALUES (98, 'OPPO Find X2 Pro', NULL, 4799, 2, 1, 1, 0, 5, 'https://img14.360buyimg.com/n7/jfs/t1/113164/33/17857/286689/5f5ee67cE2a1742fa/332fb98ad3fd8ce1.jpg', '2017-07-20 04:59:30');
INSERT INTO `goods` VALUES (99, 'OPPO Find X', NULL, 1768, 9, 1, 1, 0, 5, 'https://img13.360buyimg.com/n7/jfs/t1/150078/39/1216/225548/5eef4923Ecc406072/a52f04244cf2e2a2.jpg', '2018-08-06 05:02:35');
INSERT INTO `goods` VALUES (100, 'OPPO Reno4 Pro 5G', NULL, 2879, 0, 1, 1, 0, 5, 'https://img11.360buyimg.com/n7/jfs/t1/116899/28/12645/403510/5f0bec9bE93476ef9/f5f051ca0fbb2e08.jpg', '2017-08-31 01:01:20');
INSERT INTO `goods` VALUES (101, 'vivo X27', NULL, 1449, 1, 1, 1, 0, 6, 'https://img13.360buyimg.com/n7/jfs/t1/129125/14/12562/344871/5f5f84c5E9a4877ef/bc8cc2f43781c5db.jpg', '2017-12-13 04:32:10');
INSERT INTO `goods` VALUES (102, 'vivo Y83 ', NULL, 555, 4, 1, 1, 0, 6, 'https://img13.360buyimg.com/n7/jfs/t1/135693/11/7891/157640/5f432006E84c16e9a/be22429a6c5c097b.jpg', '2019-08-13 06:23:59');
INSERT INTO `goods` VALUES (103, 'vivo Y66', NULL, 336, 2, 1, 1, 0, 6, 'https://img13.360buyimg.com/n7/jfs/t1/112128/5/14362/820910/5f28fde1E2aeffcca/983d43d47b302c3a.png', '2015-08-19 20:12:49');
INSERT INTO `goods` VALUES (104, 'vivo X20', NULL, 688, 9, 1, 1, 0, 6, 'https://img12.360buyimg.com/n7/jfs/t1/140834/25/8350/211598/5f5f835bE0d941df0/2b2e9be256cb97c2.jpg', '2017-08-05 04:02:56');
INSERT INTO `goods` VALUES (105, 'vivo Y67', NULL, 389, 0, 1, 1, 0, 6, 'https://img12.360buyimg.com/n7/jfs/t1/128001/1/12663/181172/5f5f8357Ef7e668d9/a684ad54746f5a88.jpg', '2017-09-20 21:40:54');
INSERT INTO `goods` VALUES (106, 'vivo Y66 安卓手机', NULL, 359, 0, 1, 1, 0, 6, 'https://img14.360buyimg.com/n7/jfs/t1/132213/26/9886/417840/5f5f8355Ed37132a7/36895a30affe3454.png', '2015-12-15 04:34:01');
INSERT INTO `goods` VALUES (107, 'vivo NEX 双屏版手机', NULL, 1939, 8, 1, 1, 0, 6, 'https://img11.360buyimg.com/n7/jfs/t1/125737/30/12467/319694/5f5f2d0cE1fc2d4e4/a92ec86b856f06dd.png', '2016-12-11 23:42:50');
INSERT INTO `goods` VALUES (108, 'vivo X27 Pro', NULL, 1858, 1, 1, 1, 0, 6, 'https://img13.360buyimg.com/n7/jfs/t1/47183/40/13438/249734/5da3c724Ece3fe824/1b573309a7ca307c.jpg', '2019-01-11 08:29:48');
INSERT INTO `goods` VALUES (109, 'vivo iQOO', NULL, 1808, 2, 1, 1, 0, 6, 'https://img11.360buyimg.com/n7/jfs/t1/127224/11/5828/114232/5ef95a80E240cf9f1/ffc6822ae95d823a.jp', '2016-09-22 07:11:44');
INSERT INTO `goods` VALUES (110, 'vivo Y67智能手机', NULL, 380, 0, 1, 1, 0, 6, 'https://img10.360buyimg.com/n7/jfs/t1/139546/13/1884/223401/5efc5ab5E7d03598c/06f50da923f9f3f9.jpg', '2015-07-31 06:43:35');
INSERT INTO `goods` VALUES (111, 'Apple iPad pro 二手iPad 平板电脑', NULL, 5099, 4, 1, 1, 0, 8, 'https://img10.360buyimg.com/n7/jfs/t1/123612/13/12481/237890/5f5f569aE1462d7e0/5bf6d4ad01cf1bc7.png', '2018-05-06 12:51:35');
INSERT INTO `goods` VALUES (112, 'Apple iPad mini5 二手iPad', NULL, 2259, 6, 1, 1, 0, 8, 'https://img14.360buyimg.com/n7/jfs/t1/127095/33/12420/209971/5f5f5665E715ceada/71ab643a32aaa113.png', '2020-05-07 18:52:35');
INSERT INTO `goods` VALUES (113, 'Apple/苹果 iPad 2017 ', NULL, 1465, 2, 1, 1, 0, 8, 'https://img13.360buyimg.com/n7/jfs/t1/127778/6/11359/476644/5f504506Ec1077d02/47647bd3fa2f5492.png', '2017-06-04 09:53:23');
INSERT INTO `goods` VALUES (114, '苹果APPLE iPadPro 12.9英寸2018', NULL, 4899, 0, 1, 1, 0, 8, 'https://img11.360buyimg.com/n7/jfs/t1/149794/1/8532/270195/5f607512E2ed97313/dd03afa86b72d2c4.jpg', '2018-12-15 09:54:20');
INSERT INTO `goods` VALUES (115, 'Apple iPad mini2/1/4 苹果平板电脑 ', NULL, 869, 1, 1, 1, 0, 8, 'https://img13.360buyimg.com/n7/jfs/t1/114383/6/10664/180130/5eee2e59E538abeea/97783b06dbd271d8.jpg', '2020-03-12 08:11:27');
INSERT INTO `goods` VALUES (116, 'Apple iPad5/6 9.7英寸', NULL, 898, 1, 1, 1, 0, 8, 'https://img13.360buyimg.com/n7/jfs/t1/110982/21/10663/170248/5ef173e1E9c261d8b/41f645b017323800.jpg', '2018-05-08 18:56:15');
INSERT INTO `goods` VALUES (117, 'APPLE苹果 iPad mini5', NULL, 2299, 5, 1, 1, 0, 8, 'https://img13.360buyimg.com/n7/jfs/t1/128628/13/12729/338986/5f6035e0E7ea2d1d9/e98449468accf8d3.jpg', '2018-09-10 18:57:07');
INSERT INTO `goods` VALUES (118, '苹果平板电脑 iPad迷你', NULL, 418, 6, 1, 1, 0, 8, 'https://img10.360buyimg.com/n7/jfs/t1/126126/1/5339/180130/5eee2e59E53dcc5be/56bef2903f80fa00.jpg', '2017-08-24 23:58:01');
INSERT INTO `goods` VALUES (119, '苹果APPLE iPad 2019/18年款升级版平板电脑', NULL, 1938, 0, 1, 1, 0, 8, 'https://img11.360buyimg.com/n7/jfs/t1/129863/28/10088/218526/5f6024f2E40f997d9/033ef4cf70f23e7f.jpg', '2019-08-12 15:23:23');
INSERT INTO `goods` VALUES (120, 'iPad Pro 2018/2020款 ', NULL, 6656, 2, 1, 1, 0, 8, 'https://img10.360buyimg.com/n7/jfs/t1/127479/22/12483/476087/5f5e442dEcbdff76d/d20da39094ed2e51.png', '2018-04-03 19:01:02');
INSERT INTO `goods` VALUES (121, '新款APPLE苹果平板Pad Pro', NULL, 2599, 1, 1, 1, 0, 8, 'https://img14.360buyimg.com/n7/jfs/t1/146436/36/4188/165967/5f23d782Edb9cdc38/8c4ada42e66828a2.jpg', '2017-12-27 23:04:23');
INSERT INTO `goods` VALUES (122, 'Apple苹果iPadpro10.5/12.9寸', NULL, 3499, 1, 1, 1, 0, 8, 'https://img10.360buyimg.com/n7/jfs/t1/129550/37/6016/130276/5efc52dfEf5b6dd97/e8c33775f2755ed4.jpg', '2018-10-29 19:05:31');
INSERT INTO `goods` VALUES (123, ' Apple/苹果 iPad 2018款', NULL, 1818, 1, 1, 1, 0, 8, 'https://img12.360buyimg.com/n7/jfs/t1/148768/27/7487/140355/5f50431fE8d4b968a/c07bcadb96f1812e.jpg', '2018-10-18 19:07:34');
INSERT INTO `goods` VALUES (124, '苹果平板电脑Apple iPad mini5 ', NULL, 2249, 8, 1, 1, 0, 8, 'https://img11.360buyimg.com/n7/jfs/t1/144970/8/8270/252705/5f5e447aE48666464/d49c65fc44828500.jpg', '2018-12-26 09:45:47');
INSERT INTO `goods` VALUES (125, 'Apple iPad pro ', NULL, 5999, 5, 1, 1, 0, 8, 'https://img12.360buyimg.com/n7/jfs/t1/148077/7/8366/178367/5f60876dE18ccebef/f58bd27f586ea1b4.jpg', '2017-12-13 19:10:25');
INSERT INTO `goods` VALUES (126, '戴尔/DELL 14.0', NULL, 1699, 3, 1, 1, 0, 12, 'https://img13.360buyimg.com/n7/jfs/t1/89374/38/17671/162035/5e8a9e05E8ec7ff3f/1681f4c121eb6262.jpg', '2018-09-21 19:14:19');
INSERT INTO `goods` VALUES (127, '戴尔（DELL）i7', NULL, 2188, 2, 1, 1, 0, 12, 'https://img12.360buyimg.com/n7/jfs/t1/126005/9/12496/146501/5f603b6eE24d8a6e4/8c2777e82d682792.jpg', '2017-05-11 09:31:15');
INSERT INTO `goods` VALUES (128, '戴尔（DELL）游匣G3 G5 G7', NULL, 2499, 2, 1, 1, 0, 12, 'https://img13.360buyimg.com/n7/jfs/t1/130645/16/75/110767/5ec8830dE7d8eb8a5/d0ea007303024137.jpg', '2009-06-20 08:44:27');
INSERT INTO `goods` VALUES (129, '戴尔DELL E7240/E7250', NULL, 1699, 1, 1, 1, 0, 12, 'https://img12.360buyimg.com/n7/jfs/t1/129272/11/12285/82112/5f59d596E26e4c674/a4b5a1b740e493a8.jpg', '2016-11-22 19:03:39');
INSERT INTO `goods` VALUES (130, '戴尔DELL E系列', NULL, 838, 8, 1, 1, 0, 12, 'https://img10.360buyimg.com/n7/jfs/t1/136482/3/9604/110867/5f598065E3e5b6676/2cab8d876397b7ae.jpg', '2017-07-17 19:18:43');
INSERT INTO `goods` VALUES (131, '戴尔DELL Precision7510', NULL, 5299, 5, 1, 1, 0, 12, 'https://img13.360buyimg.com/n7/jfs/t1/149892/27/767/89963/5ee73db4Ed22d3c18/b0df7eb1420f30f3.jpg', '2016-10-26 06:32:36');
INSERT INTO `goods` VALUES (132, '戴尔DELL Precision7510', NULL, 6199, 0, 1, 1, 0, 12, 'https://img14.360buyimg.com/n7/jfs/t1/125664/17/5674/81913/5ef46c2aE22d20ac6/7b1b0911c7646909.jpg', '2019-06-13 19:20:32');
INSERT INTO `goods` VALUES (133, '戴尔（DELL）灵越3000', NULL, 1399, 3, 1, 1, 0, 12, 'https://img10.360buyimg.com/n7/jfs/t1/126287/20/2471/122873/5ec655f2Eec722ec3/6a53f47f2e5acf9e.jpg', '2017-09-12 19:21:33');
INSERT INTO `goods` VALUES (134, 'DELL HP 酷睿i3', NULL, 488, 52, 1, 1, 0, 12, 'https://img14.360buyimg.com/n7/jfs/t1/34506/39/1209/75958/5cb0194bEf07d0cec/dcc49ad22d230f1a.jpg', '2018-04-12 04:22:47');
INSERT INTO `goods` VALUES (135, '戴尔DELL/E6230', NULL, 1088, 6, 1, 1, 0, 12, 'https://img10.360buyimg.com/n7/jfs/t1/119454/27/11453/303427/5f156024Edfdd03da/89f6692e7302dc84.jpg', '2018-06-27 08:23:48');
INSERT INTO `goods` VALUES (136, '华硕笔记本二手电脑本16G内存', NULL, 969, 0, 1, 1, 0, 14, 'https://img11.360buyimg.com/n7/jfs/t1/106530/34/18890/140339/5e96d8beEbae65117/f3b1fb70251ee941.jpg', '2018-03-29 05:34:58');
INSERT INTO `goods` VALUES (137, '华硕（ASUS）15寸', NULL, 1698, 5, 1, 1, 0, 14, 'https://img14.360buyimg.com/n7/jfs/t1/125492/22/9112/391643/5f2e89e3E246cafbe/740a11fb92a8732a.png', '2019-01-10 03:32:51');
INSERT INTO `goods` VALUES (138, '华硕 （ASUS)14英寸', NULL, 1788, 2, 1, 1, 0, 14, 'https://img12.360buyimg.com/n7/jfs/t1/17688/40/12929/216708/5c9b9026E6ac3e625/a79ea52a4c9f0a51.jpg', '2018-04-18 07:57:38');
INSERT INTO `goods` VALUES (139, 'Asus/华硕 飞行堡垒', NULL, 2399, 1, 1, 1, 0, 14, 'https://img14.360buyimg.com/n7/jfs/t1/134610/12/1385/165848/5ed8aa79E5474b139/a9b3721f326c9a55.jpg', '2017-02-14 20:07:33');
INSERT INTO `goods` VALUES (140, '微软 Surface go', NULL, 1938, 4, 1, 1, 0, 10, 'https://img10.360buyimg.com/n7/jfs/t1/110978/26/17788/204773/5f5f0af6E435293cc/a61121bb0b41e9a2.jpg', '2018-10-16 20:13:04');
INSERT INTO `goods` VALUES (141, '微软（Microsoft）', NULL, 3248, 4, 1, 1, 0, 10, 'https://img14.360buyimg.com/n7/jfs/t1/136941/6/5872/152637/5f252507Eda3382c3/b34b861465ad1a6d.jpg', '2017-08-16 20:21:12');
INSERT INTO `goods` VALUES (142, '微软Surface Pro 6', NULL, 4399, 12, 1, 1, 0, 10, 'https://img14.360buyimg.com/n7/jfs/t1/149122/7/6076/109760/5f3f393bE0cf9ebb8/e719d95465ee214c.jpg', '2018-12-19 20:22:12');
INSERT INTO `goods` VALUES (143, '微软 Microsoft Surface Go', NULL, 2258, 0, 1, 1, 0, 10, 'https://img10.360buyimg.com/n7/jfs/t1/115202/25/17957/191972/5f5f0af6Eb8909910/af25e6dcc2f335a8.jpg', '2018-07-05 09:23:01');
INSERT INTO `goods` VALUES (144, '惠普（HP）战66', NULL, 4499, 2, 1, 1, 0, 20, 'https://img13.360buyimg.com/n7/jfs/t1/114944/31/7186/173600/5ec12e31E330ca944/1b66344dfec44416.jpg', '2018-07-11 01:29:26');
INSERT INTO `goods` VALUES (145, '惠普（HP星14进阶版', NULL, 6299, 3, 1, 1, 0, 20, 'https://img13.360buyimg.com/n7/jfs/t1/126917/9/12466/137209/5f5f84ecEfc36b9fd/73049e501ec14df4.jpg', '2017-03-09 09:12:42');
INSERT INTO `goods` VALUES (146, '惠普（HP）星15青春版【10代新品】', NULL, 4332, 5, 1, 1, 0, 20, 'https://img13.360buyimg.com/n7/jfs/t1/145598/9/2424/180142/5f06da3eEd67d2590/8a83d907045d5c4a.jpg', '2019-08-10 05:12:09');
INSERT INTO `goods` VALUES (147, '惠普（HP）战66 三代 14英寸', NULL, 5399, 6, 1, 1, 0, 20, 'https://img11.360buyimg.com/n7/jfs/t1/119442/37/6971/313753/5ecf18dcE4500bd74/83ab61afb969d980.jpg', '2019-03-06 08:37:27');
INSERT INTO `goods` VALUES (148, '英菲克（INPHIC）PW1h 有线鼠标', NULL, 24, 2, 1, 1, 0, 24, 'https://img12.360buyimg.com/n7/jfs/t1/136308/30/530/96866/5ece3c7bEbfd46be2/62f0bb51d040a379.jpg', '2018-08-29 21:45:31');
INSERT INTO `goods` VALUES (149, '雷蛇(Razer) 蝰蛇标准版 鼠标', NULL, 109, 3, 1, 1, 0, 24, 'https://img14.360buyimg.com/n7/jfs/t1/90018/6/473/131717/5daeb302E122b23b8/223a09102836f773.jpg', '2018-07-20 05:12:15');
INSERT INTO `goods` VALUES (150, '罗技（G）G102 游戏鼠标', NULL, 105, 4, 1, 1, 0, 24, 'https://img14.360buyimg.com/n7/jfs/t1/112899/19/2367/62121/5ea2465dE305976e9/3d53c25636558585.jpg', '2017-10-05 03:12:11');
INSERT INTO `goods` VALUES (151, '戴尔（DELL）MS116 有线鼠标', NULL, 19, 7, 1, 1, 0, 24, 'https://img13.360buyimg.com/n7/jfs/t1/139361/30/916/136696/5eea0f3eEb26b7119/c769df36529f4dba.jpg', '2019-10-31 13:48:08');
INSERT INTO `goods` VALUES (152, '小米无线鼠标 Lite 2.4GHz无线传输', NULL, 39, 0, 1, 1, 0, 24, 'https://img10.360buyimg.com/n7/jfs/t1/121303/37/11117/39795/5f48b5d8E4ca51264/db1331ad737ca0aa.jpg', '2015-11-09 14:48:55');
INSERT INTO `goods` VALUES (153, '达尔优（dareu）牧马人EM915', NULL, 128, 1, 1, 1, 0, 24, 'https://img10.360buyimg.com/n7/jfs/t1/112495/23/11984/219060/5f07cb72E78cb1308/92d644e71ac0d614.jpg', '2016-08-15 16:02:47');
INSERT INTO `goods` VALUES (154, '联想（Lenovo）鼠标', NULL, 38, 0, 1, 1, 0, 24, 'https://img14.360buyimg.com/n7/jfs/t1/145207/7/3561/49805/5f17e6f2E5632f5db/d9b85674a1e802a5.jpg', '2014-06-27 11:06:42');
INSERT INTO `goods` VALUES (155, '雷柏（Rapoo） M300G 无线蓝牙鼠标', NULL, 69, 2, 1, 1, 0, 24, 'https://img13.360buyimg.com/n7/jfs/t1/93511/24/14738/135828/5e69d338Eef913f0e/77c789ed1955a94b.jpg', '2016-03-04 15:31:43');
INSERT INTO `goods` VALUES (156, '沃野发光静音游戏鼠标有线笔记本台式机电脑家用办公', NULL, 39, 8, 1, 1, 0, 24, 'https://img11.360buyimg.com/n7/jfs/t1/101849/3/12723/113067/5e4d4c32E6f1a1f89/45f9647e8bc9dab4.jpg', '2015-01-14 18:07:28');
INSERT INTO `goods` VALUES (157, 'ikbc C87 机械键盘', NULL, 328, 3, 1, 1, 0, 25, 'https://img13.360buyimg.com/n7/jfs/t1/127387/36/12093/59980/5f59cd84Ef3295fe3/2c2c782103e4f704.jpg', '2019-04-18 12:56:06');
INSERT INTO `goods` VALUES (158, '戴尔（DELL）KB216 有线商务办公键盘（黑色）', NULL, 39, 4, 1, 1, 0, 25, 'https://img11.360buyimg.com/n7/jfs/t1/135552/24/4966/90115/5f154485Ea6595dce/6ae74c0ade87b6f1.jpg', '2017-08-24 17:12:32');
INSERT INTO `goods` VALUES (159, '雷柏（Rapoo） V500PRO 机械键盘', NULL, 119, 0, 1, 1, 0, 25, 'https://img10.360buyimg.com/n7/jfs/t1/98999/33/9924/222815/5e152d72E465e5869/b808818a8d79c468.jpg', '2018-01-11 17:33:20');
INSERT INTO `goods` VALUES (160, '灵蛇（LINGSHE)机械键盘青轴', NULL, 119, 0, 1, 1, 0, 25, 'https://img12.360buyimg.com/n7/jfs/t1/97384/16/8303/318061/5e0458c1E24a7147a/0eeb1fdbe8e7d5b8.jpg', '2017-08-23 01:00:19');
INSERT INTO `goods` VALUES (161, '前行者游戏背光发光真机械手感键盘', NULL, 58, 1, 1, 1, 0, 25, 'https://img13.360buyimg.com/n7/jfs/t1/137680/29/8537/274879/5f6031d4E374b23e5/ea819d721dd9e740.jpg', '2015-09-11 21:00:08');
INSERT INTO `goods` VALUES (162, '双飞燕（A4TECH) WK-100 键盘', NULL, 39, 1, 1, 1, 0, 25, 'https://img13.360buyimg.com/n7/jfs/t1/107457/5/13138/98562/5e9d4355E585c447b/2b56cd6bd6d3034e.jpg', '2014-08-04 13:00:51');
INSERT INTO `goods` VALUES (163, '英菲克（INPHIC）V680B真机械手感键盘', NULL, 69, 2, 1, 1, 0, 25, 'https://img13.360buyimg.com/n7/jfs/t1/90737/15/11049/153587/5e255657E8ae8f169/127d70c4dc714a1c.jpg', '2020-05-17 04:01:47');
INSERT INTO `goods` VALUES (164, '小米 无线键鼠套装', NULL, 89, 5, 1, 1, 0, 25, 'https://img14.360buyimg.com/n7/jfs/t1/126308/20/11004/61050/5f48a4f8Ebf432b31/12a755e0ff18a68b.jpg', '2017-02-28 14:02:25');
INSERT INTO `goods` VALUES (165, '罗技（Logitech）K845 机械键盘', NULL, 299, 15, 1, 1, 0, 25, 'https://img14.360buyimg.com/n7/jfs/t1/43691/2/8222/74458/5d1ac3d9Ec46518f6/451ba775d4f11b3f.jpg', '2016-07-14 22:03:42');
INSERT INTO `goods` VALUES (166, '英菲克（INPHIC）V780 ', NULL, 99, 32, 1, 1, 0, 25, 'https://img12.360buyimg.com/n7/jfs/t1/141360/4/3948/123287/5f1ea5adEcf4789f5/63b9f4ee265089b2.jpg', '2018-10-03 21:04:43');
INSERT INTO `goods` VALUES (167, '电脑显示器19', NULL, 429, 3, 1, 1, 0, 27, 'https://img11.360buyimg.com/n7/jfs/t1/62922/39/9794/129750/5d7605b8E29105407/1a8038764af8aebb.jpg', '2017-01-11 23:08:43');
INSERT INTO `goods` VALUES (168, '三星（SAMSUNG）27寸', NULL, 388, 0, 1, 1, 0, 27, 'https://img10.360buyimg.com/n7/jfs/t1/112943/1/8362/609123/5ece31c3E6a8a5707/3e00058652cf92a8.png', '2020-09-20 03:09:34');
INSERT INTO `goods` VALUES (169, '电脑显示器曲面2K', NULL, 399, 1, 1, 1, 0, 27, 'https://img10.360buyimg.com/n7/jfs/t1/129872/4/4162/183486/5f092f23E23486c78/383b648246f3503b.jpg', '2018-07-05 12:10:26');
INSERT INTO `goods` VALUES (170, '联想 22英寸', NULL, 299, 2, 1, 1, 0, 27, 'https://img14.360buyimg.com/n7/jfs/t1/109341/34/13590/207012/5ea28ae9E83fde1bc/8722be5438f2a91b.jpg', '2016-03-16 10:11:10');
INSERT INTO `goods` VALUES (171, 'HKC H220 21.5英寸', NULL, 375, 5, 1, 1, 0, 27, 'https://img13.360buyimg.com/n7/jfs/t1/21098/38/12748/116388/5c99eb07E6b541a7c/0b585e09b5161ebf.jpg', '2017-08-19 05:12:10');
INSERT INTO `goods` VALUES (172, '铭速T190显示器19英寸', NULL, 235, 0, 1, 1, 0, 27, 'https://img14.360buyimg.com/n7/jfs/t1/66833/26/5278/105797/5d367c28Eaa7ee959/4adf788f40e48c36.jpg', '2020-09-15 21:13:16');
INSERT INTO `goods` VALUES (173, '联想Lenovo17寸 19寸', NULL, 148, 3, 1, 1, 0, 27, 'https://img12.360buyimg.com/n7/jfs/t1/93235/2/7899/97705/5e018746Ed5a65af3/ff2ff8d373e11230.jpg', '2017-08-23 13:14:26');
INSERT INTO `goods` VALUES (174, '三星（SAMSUNG）27寸', NULL, 779, 4, 1, 1, 0, 27, 'https://img13.360buyimg.com/n7/jfs/t1/141879/17/374/101758/5ee08ffdE0f522cc5/f232dbf710a3a0d8.jpg', '2015-09-19 14:15:14');
INSERT INTO `goods` VALUES (175, '技嘉GA-B85M-D2V全固态游戏主板', NULL, 179, 2, 1, 1, 0, 29, 'https://img10.360buyimg.com/n7/jfs/t1/56234/30/11299/195769/5d832599Efab432b2/703ad624478859d4.jpg', '2020-09-29 21:20:16');
INSERT INTO `goods` VALUES (176, '技嘉华硕H61/B75+CPU主板', NULL, 259, 11, 1, 1, 0, 29, 'https://img10.360buyimg.com/n7/jfs/t1/122424/30/6451/441701/5f01fd89Ea973e4f1/c6e9f76c92f9d452.jpg', '2018-08-15 21:21:04');
INSERT INTO `goods` VALUES (177, '铭速H110M D3 4终幻版', NULL, 155, 5, 1, 1, 0, 29, 'https://img12.360buyimg.com/n7/jfs/t1/91937/10/13963/222205/5e5fff92E53e87755/11823995b73f4805.jpg', '2020-02-18 12:21:46');
INSERT INTO `goods` VALUES (178, '华硕技嘉微星 H61', NULL, 99, 0, 1, 1, 0, 29, 'https://img12.360buyimg.com/n7/jfs/t1/117160/5/11061/134591/5ef76158E7b699885/35fe32409559b724.jpg', '2018-04-17 09:22:41');
INSERT INTO `goods` VALUES (179, '七彩虹Colorful H110M  DDR3', NULL, 138, 1, 1, 1, 0, 29, 'https://img10.360buyimg.com/n7/jfs/t1/127937/23/8361/147034/5f224b21E97017690/99d823ce01674184.jpg', '2016-11-01 21:23:22');
INSERT INTO `goods` VALUES (180, 'Gigabyte/技嘉 B85-HD3固态集成大板', NULL, 298, 2, 1, 1, 0, 29, 'https://img10.360buyimg.com/n7/jfs/t1/135286/2/9754/322762/5f5c2954E76c62a10/eb206c5b10760835.jpg', '2018-11-14 21:24:03');
INSERT INTO `goods` VALUES (199, '华为', NULL, 3000, 0, 20, 3, 1, 3, 'upload_2326f575275576d785c32a87b4f2e312.jpg', '2020-09-21 18:20:24');
INSERT INTO `goods` VALUES (200, '华为', NULL, 3000, 0, 20, 3, 1, 3, 'upload_4275412b341918d9b0a9dbd523db7b7c.jpg', '2020-09-21 18:20:28');
INSERT INTO `goods` VALUES (201, '苹果11', NULL, 5000, 0, 1, 3, 1, 7, 'upload_fa118cb8c9f094e94199f7f47db31542.jpg', '2020-10-19 09:41:39');
INSERT INTO `goods` VALUES (202, '123', NULL, 12312, 0, 1, 3, 1, 3, 'http://localhost:3000/upload/upload_319e380ce1794c5a1df5f9a3a3ddcc86.jpg', '2020-10-23 09:28:10');
INSERT INTO `goods` VALUES (203, '华为', NULL, 244, 0, 1, 3, 1, 3, 'http://localhost:3000/upload/upload_217ab3569b074779a067b33e4fb6ee7d.jpg', '2020-10-23 09:41:35');
INSERT INTO `goods` VALUES (204, '华为', NULL, 414, 0, 5, 3, 1, 3, 'http://localhost:3000/upload/upload_b39977680b779eedcd1def984fde90ae.jpg', '2020-10-23 09:57:38');

-- ----------------------------
-- Table structure for myfootprint
-- ----------------------------
DROP TABLE IF EXISTS `myfootprint`;
CREATE TABLE `myfootprint`  (
  `myFootId` int(11) NOT NULL AUTO_INCREMENT,
  `userInfos_uId` int(11) NOT NULL,
  `myFootTime` datetime(0) NOT NULL,
  `goods_gId` int(11) NOT NULL,
  PRIMARY KEY (`myFootId`) USING BTREE,
  INDEX `fk_myFootprint_userInfos1_idx`(`userInfos_uId`) USING BTREE,
  INDEX `fk_myFootprint_goods1_idx`(`goods_gId`) USING BTREE,
  CONSTRAINT `fk_myFootprint_goods1` FOREIGN KEY (`goods_gId`) REFERENCES `goods` (`gId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_myFootprint_userInfos1` FOREIGN KEY (`userInfos_uId`) REFERENCES `userinfos` (`uId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `oId` int(11) NOT NULL AUTO_INCREMENT,
  `oTPrice` int(11) NOT NULL,
  `userInfos_uId` int(11) NOT NULL,
  `oState` int(11) NOT NULL,
  `oTime` datetime(0) NOT NULL,
  `oGoodsNum` int(11) NOT NULL,
  `goods_gId` int(11) NOT NULL,
  PRIMARY KEY (`oId`) USING BTREE,
  INDEX `fk_order_userInfos1_idx`(`userInfos_uId`) USING BTREE,
  INDEX `fk_order_goods1_idx`(`goods_gId`) USING BTREE,
  CONSTRAINT `fk_order_goods1` FOREIGN KEY (`goods_gId`) REFERENCES `goods` (`gId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_order_userInfos1` FOREIGN KEY (`userInfos_uId`) REFERENCES `userinfos` (`uId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (1, 200, 1, 1, '2020-09-11 01:00:00', 1, 1);
INSERT INTO `order` VALUES (2, 200, 1, 1, '2020-09-12 12:00:00', 1, 2);
INSERT INTO `order` VALUES (4, 1799, 3, 3, '2020-10-16 19:10:28', 1, 78);
INSERT INTO `order` VALUES (5, 1799, 3, 2, '2020-10-16 19:10:44', 1, 78);
INSERT INTO `order` VALUES (6, 348, 3, 3, '2020-10-19 09:20:19', 1, 97);
INSERT INTO `order` VALUES (7, 268, 3, 1, '2020-10-19 09:20:40', 1, 87);
INSERT INTO `order` VALUES (8, 348, 3, 0, '2020-10-19 09:20:40', 1, 97);
INSERT INTO `order` VALUES (9, 488, 3, 0, '2020-10-19 09:28:28', 1, 134);
INSERT INTO `order` VALUES (10, 268, 3, 0, '2020-10-19 09:28:28', 1, 87);
INSERT INTO `order` VALUES (11, 348, 3, 0, '2020-10-19 09:28:28', 1, 97);
INSERT INTO `order` VALUES (12, 348, 3, 0, '2020-10-19 09:45:57', 1, 97);
INSERT INTO `order` VALUES (13, 268, 3, 0, '2020-10-19 10:01:42', 1, 87);
INSERT INTO `order` VALUES (14, 8042, 3, 1, '2020-10-19 19:32:13', 1, 16);

-- ----------------------------
-- Table structure for pricelevel
-- ----------------------------
DROP TABLE IF EXISTS `pricelevel`;
CREATE TABLE `pricelevel`  (
  `PriceId` int(11) NOT NULL AUTO_INCREMENT,
  `maxPrice` int(11) NOT NULL,
  `minPrice` int(11) NOT NULL,
  PRIMARY KEY (`PriceId`) USING BTREE,
  UNIQUE INDEX `maxPrice_UNIQUE`(`maxPrice`) USING BTREE,
  UNIQUE INDEX `minPrice_UNIQUE`(`minPrice`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pricelevel
-- ----------------------------
INSERT INTO `pricelevel` VALUES (1, 500, 0);
INSERT INTO `pricelevel` VALUES (2, 2000, 501);
INSERT INTO `pricelevel` VALUES (3, 3500, 2001);
INSERT INTO `pricelevel` VALUES (4, 5000, 3501);
INSERT INTO `pricelevel` VALUES (5, 99999, 5001);

-- ----------------------------
-- Table structure for school
-- ----------------------------
DROP TABLE IF EXISTS `school`;
CREATE TABLE `school`  (
  `schoolId` int(11) NOT NULL AUTO_INCREMENT,
  `schoolName` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`schoolId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 61 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of school
-- ----------------------------
INSERT INTO `school` VALUES (1, '哈尔滨医科大学');
INSERT INTO `school` VALUES (2, '黑龙江科技大学');
INSERT INTO `school` VALUES (3, '黑龙江大学');
INSERT INTO `school` VALUES (4, '哈尔滨工业大学');
INSERT INTO `school` VALUES (5, '哈尔滨理工大学');
INSERT INTO `school` VALUES (6, '哈尔滨工程大学');
INSERT INTO `school` VALUES (7, '东北农业大学');
INSERT INTO `school` VALUES (8, '东北林业大学');
INSERT INTO `school` VALUES (10, '黑龙江八一农垦大学');
INSERT INTO `school` VALUES (11, '东北石油大学');
INSERT INTO `school` VALUES (12, '大庆职业学院');
INSERT INTO `school` VALUES (13, '大庆医学高等专科学校');
INSERT INTO `school` VALUES (15, '大连理工大学');
INSERT INTO `school` VALUES (16, '沈阳工业大学');
INSERT INTO `school` VALUES (17, '沈阳航空航天大学');
INSERT INTO `school` VALUES (18, '沈阳理工大学');
INSERT INTO `school` VALUES (19, '东北大学');
INSERT INTO `school` VALUES (20, '辽宁科技大学');
INSERT INTO `school` VALUES (21, '辽宁工程技术大学');
INSERT INTO `school` VALUES (22, '辽宁石油化工大学');
INSERT INTO `school` VALUES (24, '东北电力大学');
INSERT INTO `school` VALUES (25, '吉林化工学院');
INSERT INTO `school` VALUES (26, '北华大学');
INSERT INTO `school` VALUES (27, '吉林农业科技学院');
INSERT INTO `school` VALUES (28, '油吉林医药学院');
INSERT INTO `school` VALUES (29, '吉林电子信息职业技术学院');
INSERT INTO `school` VALUES (31, '江苏科技大学');
INSERT INTO `school` VALUES (32, '江苏科技大学苏州理工学院');
INSERT INTO `school` VALUES (33, '常熟理工学院');
INSERT INTO `school` VALUES (34, '苏州工艺美术职业技术学院');
INSERT INTO `school` VALUES (35, '沙洲职业工学院');
INSERT INTO `school` VALUES (37, '复旦大学');
INSERT INTO `school` VALUES (38, '同济大学');
INSERT INTO `school` VALUES (39, '华东理工大学');
INSERT INTO `school` VALUES (40, '上海理工大学');
INSERT INTO `school` VALUES (41, '东华大学');
INSERT INTO `school` VALUES (42, '上海电力大学');
INSERT INTO `school` VALUES (43, '华东师范大学');
INSERT INTO `school` VALUES (44, '华东政法大学');
INSERT INTO `school` VALUES (46, '齐齐哈尔高等师范专科学校');
INSERT INTO `school` VALUES (47, '齐齐哈尔医学院');
INSERT INTO `school` VALUES (48, '黑龙江交通职业技术学院');
INSERT INTO `school` VALUES (50, '牡丹江师范学院');
INSERT INTO `school` VALUES (51, '牡丹江大学');
INSERT INTO `school` VALUES (52, '黑龙江林业职业技术学院');
INSERT INTO `school` VALUES (54, '清华大学');
INSERT INTO `school` VALUES (55, '北京交通大学');
INSERT INTO `school` VALUES (56, '北京工业大学');
INSERT INTO `school` VALUES (57, '北京理工大学');
INSERT INTO `school` VALUES (58, '北京科技大学');
INSERT INTO `school` VALUES (59, '北京化工大学');
INSERT INTO `school` VALUES (61, '其他');

-- ----------------------------
-- Table structure for shoppingcart
-- ----------------------------
DROP TABLE IF EXISTS `shoppingcart`;
CREATE TABLE `shoppingcart`  (
  `goods_gId` int(11) NOT NULL,
  `SCRId` int(11) NOT NULL AUTO_INCREMENT,
  `SCRGoodsNum` int(11) NOT NULL,
  `userInfos_uId` int(11) NOT NULL,
  PRIMARY KEY (`SCRId`) USING BTREE,
  INDEX `fk_shoppingCarts_has_goods_goods1_idx`(`goods_gId`) USING BTREE,
  INDEX `fk_shoppingCartRelationship_userInfos1_idx`(`userInfos_uId`) USING BTREE,
  CONSTRAINT `fk_shoppingCartRelationship_userInfos1` FOREIGN KEY (`userInfos_uId`) REFERENCES `userinfos` (`uId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_shoppingCarts_has_goods_goods1` FOREIGN KEY (`goods_gId`) REFERENCES `goods` (`gId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shoppingcart
-- ----------------------------
INSERT INTO `shoppingcart` VALUES (1, 1, 1, 1);
INSERT INTO `shoppingcart` VALUES (1, 2, 1, 1);
INSERT INTO `shoppingcart` VALUES (134, 14, 1, 3);
INSERT INTO `shoppingcart` VALUES (129, 15, 1, 3);
INSERT INTO `shoppingcart` VALUES (128, 16, 1, 3);
INSERT INTO `shoppingcart` VALUES (127, 17, 1, 3);
INSERT INTO `shoppingcart` VALUES (87, 18, 1, 3);
INSERT INTO `shoppingcart` VALUES (89, 19, 1, 3);
INSERT INTO `shoppingcart` VALUES (88, 20, 1, 3);
INSERT INTO `shoppingcart` VALUES (86, 21, 1, 3);
INSERT INTO `shoppingcart` VALUES (97, 22, 1, 3);

-- ----------------------------
-- Table structure for userinfos
-- ----------------------------
DROP TABLE IF EXISTS `userinfos`;
CREATE TABLE `userinfos`  (
  `uId` int(11) NOT NULL AUTO_INCREMENT,
  `uName` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uPhone` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uPwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uSchool` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uHead` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userRecId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`uId`) USING BTREE,
  UNIQUE INDEX `uId_UNIQUE`(`uId`) USING BTREE,
  UNIQUE INDEX `uName_UNIQUE`(`uName`) USING BTREE,
  UNIQUE INDEX `uPhone_UNIQUE`(`uPhone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfos
-- ----------------------------
INSERT INTO `userinfos` VALUES (1, 'test001', '13000000000', '123456', '1', '1', NULL);
INSERT INTO `userinfos` VALUES (2, 'test002', '13000000001', '123456', '2', '2', NULL);
INSERT INTO `userinfos` VALUES (3, 'test', '345245246', '$2b$10$pOF0SFUu63I7wkHY7sABaOY.vGmR7xaqndfvY/Mfzy/kEZhigkIpG', NULL, 'upload_93844615c3ff8387a2d854dbe9113a4d.jpg', 42);

-- ----------------------------
-- Table structure for userrec
-- ----------------------------
DROP TABLE IF EXISTS `userrec`;
CREATE TABLE `userrec`  (
  `recId` int(11) NOT NULL AUTO_INCREMENT,
  `userInfos_uId` int(11) NOT NULL,
  `recName` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `recAddress` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `recPhone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`recId`) USING BTREE,
  UNIQUE INDEX `recId_UNIQUE`(`recId`) USING BTREE,
  UNIQUE INDEX `rName_UNIQUE`(`recName`) USING BTREE,
  INDEX `fk_userRec_userInfos_idx`(`userInfos_uId`) USING BTREE,
  CONSTRAINT `fk_userRec_userInfos` FOREIGN KEY (`userInfos_uId`) REFERENCES `userinfos` (`uId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userrec
-- ----------------------------
INSERT INTO `userrec` VALUES (1, 1, 'testRec01', '01', '13000000003');
INSERT INTO `userrec` VALUES (2, 1, 'testRec02', '02', '13000000004');
INSERT INTO `userrec` VALUES (3, 2, 'testRec03', '03', '13000000005');
INSERT INTO `userrec` VALUES (42, 3, '张友国', '张家大院', '13988888888');
INSERT INTO `userrec` VALUES (44, 3, '阿斯蒂芬', '111111', '1234');

-- ----------------------------
-- Table structure for userwant
-- ----------------------------
DROP TABLE IF EXISTS `userwant`;
CREATE TABLE `userwant`  (
  `wantId` int(11) NOT NULL AUTO_INCREMENT,
  `userInfos_uId` int(11) NOT NULL,
  `wantName` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `wantMes` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `wantTime` datetime(0) NOT NULL,
  `wantPrice` int(11) NOT NULL,
  `wantPhone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`wantId`) USING BTREE,
  INDEX `fk_userWant_userInfos1_idx`(`userInfos_uId`) USING BTREE,
  CONSTRAINT `fk_userWant_userInfos1` FOREIGN KEY (`userInfos_uId`) REFERENCES `userinfos` (`uId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userwant
-- ----------------------------
INSERT INTO `userwant` VALUES (12, 3, '234234', '234234234', '2020-10-19 21:19:45', 234234, '1112441345');
INSERT INTO `userwant` VALUES (13, 3, 'sdhgfjds', '23yu4u2342ju3', '2020-10-19 21:20:27', 5734672, '1256357781');
INSERT INTO `userwant` VALUES (14, 3, '24r243', '234234234', '2020-10-19 21:22:33', 234234, 'ertegtxse');

SET FOREIGN_KEY_CHECKS = 1;
