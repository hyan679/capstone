/*
 Navicat Premium Data Transfer

 Source Server         : masterdb_group2
 Source Server Type    : MySQL
 Source Server Version : 50568
 Source Host           : ec2-3-26-74-1.ap-southeast-2.compute.amazonaws.com:3306
 Source Schema         : masterdb

 Target Server Type    : MySQL
 Target Server Version : 50568
 File Encoding         : 65001

 Date: 20/11/2021 23:42:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
USE masterdb
-- ----------------------------
-- Table structure for agreement
-- ----------------------------
DROP TABLE IF EXISTS `agreement`;
CREATE TABLE `agreement` (
  `agreement_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `grantor_name` varchar(255) DEFAULT NULL,
  `content` mediumtext,
  `version` int(11) NOT NULL,
  `created_time` datetime DEFAULT NULL,
  `agr_state` int(11) DEFAULT NULL,
  `content_html` varchar(100) DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `altered_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`agreement_id`,`version`) USING BTREE,
  KEY `Agree_Foreign1` (`project_id`),
  KEY `agreement_id` (`agreement_id`),
  CONSTRAINT `Agree_Foreign1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of agreement
-- ----------------------------
BEGIN;
INSERT INTO `agreement` VALUES (1, 1, NULL, 'this is agreement 1', 1, '2021-11-10 00:00:00', 0, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, 'This is a sample 2 for agreement table', 1, '2021-10-09 14:00:00', 3, NULL, NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, 'This is a test', 2, '2021-10-09 14:00:00', 3, '', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, 'This is a test', 3, '2021-10-09 14:00:00', 3, '', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, 'This is a test', 4, '2021-10-09 14:00:00', 3, '', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is a testss</p>', 5, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is a testssssa</p>', 6, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is a testssssaakdjkajef</p>', 7, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, 'This is a test', 8, '2021-10-09 14:00:00', 3, '', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, 'This is another test', 9, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is a sample 2 for agreement tabledddddddddddd</p>', 10, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is a sample 2 for agreement tableddddddddd</p>', 11, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is a sample 2 for agreement tablexxxx</p>', 12, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is a sample 2 for agreement table edit edit</p>', 13, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is a sample 2 for agreement table2222222</p>', 14, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is a sample 2 for agreement table2222222</p>', 15, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, 'This is another test', 16, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is another test</p>', 17, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is another test  by test_user (11/11)</p>', 18, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>3d Animation rigging for 2d sprites__This is another test by test_user (11/11)</p>', 19, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>a3d Animation rigging for 2d sprites__This is another test by test_user (11/11)</p>', 20, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 14:38:45');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>a3d Animation rigging for 2d sprites__This is another test by test_user (11/11)</p>', 21, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 14:55:07');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>a3d Animation rigging for 2d sprites__This is another test by test_user (11/11)111</p>', 22, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 14:55:30');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is another test</p>', 23, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-14 16:22:52');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is another test </p><p>black-box 11/15</p>', 24, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-15 14:02:47');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<p>This is another test </p><p>black-box 11/15</p><p>black-box 11/15-2</p>', 25, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-15 14:03:15');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<h1>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2019</h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100000</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 26, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-16 02:49:21');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<h1>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2019</h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100000</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 27, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-16 02:49:40');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<h1><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2019</strong></h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100000</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 28, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-16 02:49:57');
INSERT INTO `agreement` VALUES (2, 2, NULL, '<h1><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2019</strong></h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100000</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 29, '2021-10-09 14:00:00', 3, 'None', NULL, '2021-11-17 11:05:25');
INSERT INTO `agreement` VALUES (6, 6, NULL, '<p> aaaaaaaa </p>', 1, '2021-11-09 14:00:00', 0, NULL, NULL, '2021-11-14 07:23:36');
INSERT INTO `agreement` VALUES (10, 10, NULL, '', 1, NULL, 0, NULL, NULL, '2021-11-16 04:20:56');
INSERT INTO `agreement` VALUES (11, 11, 'grantor11', 'contract 11', 1, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-16 02:56:07');
INSERT INTO `agreement` VALUES (11, 11, 'grantor11', 'contract 11 revision', 2, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-16 03:02:21');
INSERT INTO `agreement` VALUES (11, 11, 'grantor11', 'contract 11 revised again', 3, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-16 03:03:10');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<p><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2019</strong></p><p><br></p><p><strong>PROJECT ID:</strong> LP190100000</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 4, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-16 03:55:42');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<p><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2019</strong></p><p><br></p><p><strong>PROJECT ID:</strong> LP190100000</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 5, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-16 03:58:23');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<p><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2021</strong></p><p><br></p><p><strong>PROJECT ID:</strong> LP190100</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p><p><br></p><p><br></p>', 6, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-16 04:01:35');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<h1><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2021</strong></h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p><p><br></p>', 7, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-17 05:10:16');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<h1><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2021</strong></h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 8, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-17 05:13:28');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<h1><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2021</strong></h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 9, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-17 05:13:40');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<h1><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2021</strong></h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 10, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-17 05:13:56');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<h1><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2021</strong></h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 11, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-17 05:14:42');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<h1><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2021</strong></h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 12, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-17 08:19:08');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<h1><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2021</strong></h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p>', 13, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-17 10:32:17');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<h1><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing in 2021</strong></h1><p><br></p><p><strong>PROJECT ID:</strong> LP190100</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p><p><br></p><p>I make some changes.</p><p><br></p>', 14, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-17 10:35:39');
INSERT INTO `agreement` VALUES (11, 11, NULL, '<p><strong>AUSTRALIAN RESEARCH COUNCILLinkage ProjectsProposal for Funding Commencing</strong></p><p><br></p><p><strong>PROJECT ID:</strong> LP190100</p><p><strong>First Investigator: </strong>Dr Example Example</p><p><strong>Admin Org: </strong>Example Organisation</p><p><br></p><p>Information on this form and its attachments is collected in order to make recommendations to the Minister on theallocation of financial assistance under the Australian Research Council Act 2001 and for post award reporting. Theinformation collected may be passed to third parties, including being sent to overseas parties for assessmentpurposes. It may also be passed to any other Australian Government Department or Agency where required, andnoting information contained in this application can be disclosed without your consent where authorised or requiredby law.</p><p><br></p><p>I make some changes.</p>', 15, '2021-11-16 10:55:35', 4, 'None', NULL, '2021-11-17 12:01:25');
INSERT INTO `agreement` VALUES (12, 12, NULL, '', 1, '2021-11-16 04:16:17', 4, NULL, NULL, '2021-11-16 04:16:17');
INSERT INTO `agreement` VALUES (12, 12, NULL, '<p>I create tye contract </p>', 2, '2021-11-16 04:16:17', 4, 'None', NULL, '2021-11-16 04:16:50');
INSERT INTO `agreement` VALUES (12, 12, NULL, '<p>I create tye contract</p>', 3, '2021-11-16 04:16:17', 4, 'None', NULL, '2021-11-16 04:18:24');
INSERT INTO `agreement` VALUES (28, 28, NULL, '', 1, '2021-11-14 17:09:58', 4, NULL, NULL, '2021-11-14 17:09:58');
INSERT INTO `agreement` VALUES (28, 28, NULL, '<p>aaaa</p>', 2, '2021-11-14 17:09:58', 4, 'None', NULL, '2021-11-14 17:10:11');
INSERT INTO `agreement` VALUES (28, 28, NULL, '<p>aaaa</p><p>black-box testing 11/15</p>', 3, '2021-11-14 17:09:58', 4, 'None', NULL, '2021-11-15 14:19:31');
INSERT INTO `agreement` VALUES (28, 28, NULL, '<p>aaaa</p><p>black-box testing 11/15</p>', 4, '2021-11-14 17:09:58', 4, 'None', NULL, '2021-11-17 08:41:42');
INSERT INTO `agreement` VALUES (28, 28, NULL, '<p>aaaa</p><p>black-box testing 11/15</p>', 5, '2021-11-14 17:09:58', 4, 'None', NULL, '2021-11-17 08:49:57');
INSERT INTO `agreement` VALUES (28, 28, NULL, '<p>aaaaa</p><p>black-box testing 11/15</p>', 6, '2021-11-14 17:09:58', 4, 'None', NULL, '2021-11-17 09:01:19');
INSERT INTO `agreement` VALUES (28, 28, NULL, '<p>aaaaa</p><p>black-box testing 11/15</p>', 7, '2021-11-14 17:09:58', 4, 'None', NULL, '2021-11-17 09:08:13');
INSERT INTO `agreement` VALUES (28, 28, NULL, '<p>aaaaa</p><p>black-box testing 11/15</p>', 8, '2021-11-14 17:09:58', 4, 'None', NULL, '2021-11-17 09:33:30');
COMMIT;

-- ----------------------------
-- Table structure for application
-- ----------------------------
DROP TABLE IF EXISTS `application`;
CREATE TABLE `application` (
  `application_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `grantor_name` varchar(255) DEFAULT NULL,
  `grant_id` int(11) NOT NULL,
  `cost_url` varchar(100) NOT NULL,
  `cost_json` varchar(1500) NOT NULL,
  `answer_json` varchar(1500) NOT NULL,
  `app_state` int(11) NOT NULL,
  `legal_agreement` varchar(5000) NOT NULL,
  `lead_researcher_id` int(11) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `altered_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` longtext,
  `content_html` varchar(100) DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  PRIMARY KEY (`application_id`),
  KEY `application_ibfk_1` (`project_id`),
  KEY `application_ibfk_2` (`grant_id`),
  CONSTRAINT `application_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of application
-- ----------------------------
BEGIN;
INSERT INTO `application` VALUES (1, 1, 'Australian Research Council', 2, '', '', '', 1, '', 2, '2021-10-28 14:25:03', '2021-11-20 15:40:24', '<p>This is another test</p><p>I make some changes</p>', 'None', '2022-10-20 08:25:03');
INSERT INTO `application` VALUES (2, 2, 'Australian Research Council', 2, '', '', '', 4, '', 2, '2021-10-02 11:00:00', '2021-10-20 10:14:03', '<p>We were mainly inspired to start the club because some of our children often get into trouble at school, and don’t find it very easy to make friends.</p><p>hhhhhh</p>', 'None', '2022-10-20 10:14:03');
INSERT INTO `application` VALUES (6, 6, 'Australian Research Council', 6, '', '', '', 2, '', 2, '2021-10-02 11:00:00', '2021-10-20 10:14:03', 'this is project 6', 'None', '2022-10-20 10:14:03');
INSERT INTO `application` VALUES (10, 10, 'grantor10', 10, '', '', '', 4, '', 2, '2021-11-16 10:52:57', '2021-11-16 02:53:56', '<p><em style=\"background-color: initial;\">As the name itself says&nbsp;</em><strong style=\"background-color: initial;\"><em>Solar Car&nbsp;</em></strong><em style=\"background-color: initial;\">is nothing but an electric car which run on solar power from the sun.</em></p><p><span style=\"background-color: initial;\">It is not like solar thermal energy what you have studied that converts solar energy into heat for household purpose or to be converted into electricity. These cars depends on&nbsp;</span><strong style=\"background-color: initial;\">Solar arrays</strong><span style=\"background-color: initial;\">&nbsp;that uses&nbsp;</span><strong style=\"background-color: initial;\">photo-voltaic cells</strong><span style=\"background-color: initial;\">&nbsp;to convert sunlight into electricity.</span></p><p><br></p><p><span style=\"background-color: initial;\">End</span></p>', 'None', '2022-01-10 00:00:00');
INSERT INTO `application` VALUES (11, 11, 'grantor11', 11, '', '', '', 4, '', 2, '2021-11-15 10:54:23', '2021-11-16 02:54:55', 'Application 11 ', 'None', NULL);
INSERT INTO `application` VALUES (12, 12, 'grantor12', 12, '', '', '', 4, '', 2, '2021-11-16 12:12:33', '2021-11-16 04:12:36', 'Application completed', 'None', '2022-11-11 00:00:00');
INSERT INTO `application` VALUES (14, 14, 'grantor14', 14, '', '', '', 1, '', 2, '2021-11-20 22:48:54', '2021-11-20 14:49:29', 'Application 14', 'None', '2022-11-20 22:49:22');
INSERT INTO `application` VALUES (15, 15, 'grantor15', 15, '', '', '', 4, '', 2, '2021-11-20 22:50:00', '2021-11-20 14:50:22', 'Application 15', 'None', '2022-11-20 22:50:15');
INSERT INTO `application` VALUES (28, 28, 'grantor1', 28, '', '', '', 4, '', 2, '2021-11-12 00:00:00', '2021-11-17 09:37:09', '<p>hi this is 28</p>', 'None', '2022-11-20 00:00:00');
COMMIT;

-- ----------------------------
-- Table structure for approver_agreement
-- ----------------------------
DROP TABLE IF EXISTS `approver_agreement`;
CREATE TABLE `approver_agreement` (
  `agreement_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission` int(11) DEFAULT '0',
  `agr_status` int(11) DEFAULT '0',
  `comments` varchar(255) DEFAULT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`agreement_id`,`user_id`) USING BTREE,
  KEY `approver_agreement_ibfk_1` (`user_id`),
  CONSTRAINT `approver_agreement_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `AAgree_Foreign1` FOREIGN KEY (`agreement_id`) REFERENCES `agreement` (`agreement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of approver_agreement
-- ----------------------------
BEGIN;
INSERT INTO `approver_agreement` VALUES (2, 3, 0, 0, NULL, '2021-11-14 14:56:15');
INSERT INTO `approver_agreement` VALUES (2, 5, 0, 2, 'None', '2021-11-17 10:58:53');
INSERT INTO `approver_agreement` VALUES (2, 7, 0, 0, 'None', '2021-11-06 11:46:04');
INSERT INTO `approver_agreement` VALUES (2, 19, 0, 0, 'None', '2021-11-14 15:28:35');
INSERT INTO `approver_agreement` VALUES (2, 20, 0, 0, 'None', '2021-11-17 10:49:01');
INSERT INTO `approver_agreement` VALUES (11, 4, 1, 3, 'None', '2021-11-16 02:59:40');
INSERT INTO `approver_agreement` VALUES (11, 9, 0, 3, 'None', '2021-11-17 11:26:54');
INSERT INTO `approver_agreement` VALUES (11, 16, 0, 3, 'None', '2021-11-17 11:21:50');
INSERT INTO `approver_agreement` VALUES (11, 23, 0, 3, 'None', '2021-11-16 04:06:48');
INSERT INTO `approver_agreement` VALUES (12, 23, 0, 3, 'None', '2021-11-17 05:17:07');
INSERT INTO `approver_agreement` VALUES (28, 4, 0, 3, 'None', '2021-11-17 09:24:34');
INSERT INTO `approver_agreement` VALUES (28, 5, 0, 3, 'None', '2021-11-14 17:10:31');
INSERT INTO `approver_agreement` VALUES (28, 9, 0, 3, 'None', '2021-11-17 09:24:01');
COMMIT;

-- ----------------------------
-- Table structure for approver_application
-- ----------------------------
DROP TABLE IF EXISTS `approver_application`;
CREATE TABLE `approver_application` (
  `application_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `app_status` int(11) DEFAULT '0',
  `permission` int(11) DEFAULT '0',
  PRIMARY KEY (`application_id`,`user_id`),
  KEY `AA_Foreign2` (`user_id`),
  CONSTRAINT `AA_Foreign1` FOREIGN KEY (`application_id`) REFERENCES `application` (`application_id`) ON DELETE CASCADE,
  CONSTRAINT `AA_Foreign2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of approver_application
-- ----------------------------
BEGIN;
INSERT INTO `approver_application` VALUES (1, 4, 'Please complete the application', 0, 0);
INSERT INTO `approver_application` VALUES (1, 5, 'None', 0, 0);
INSERT INTO `approver_application` VALUES (1, 9, 'None', 0, 0);
INSERT INTO `approver_application` VALUES (1, 13, 'None', 0, 0);
INSERT INTO `approver_application` VALUES (1, 16, 'None', 0, 0);
INSERT INTO `approver_application` VALUES (1, 18, 'None', 0, 0);
INSERT INTO `approver_application` VALUES (1, 19, 'None', 0, 0);
INSERT INTO `approver_application` VALUES (1, 20, 'None', 0, 0);
INSERT INTO `approver_application` VALUES (1, 23, 'None', 0, 0);
INSERT INTO `approver_application` VALUES (2, 5, 'None', 3, 0);
INSERT INTO `approver_application` VALUES (6, 7, NULL, 0, 0);
INSERT INTO `approver_application` VALUES (6, 22, NULL, 0, 0);
INSERT INTO `approver_application` VALUES (10, 4, 'None', 3, 0);
INSERT INTO `approver_application` VALUES (11, 4, 'None', 3, 0);
INSERT INTO `approver_application` VALUES (11, 9, 'pass', 3, 0);
INSERT INTO `approver_application` VALUES (12, 23, 'pass', 3, 1);
INSERT INTO `approver_application` VALUES (15, 4, 'yes', 3, 1);
INSERT INTO `approver_application` VALUES (15, 5, 'ok', 3, 0);
INSERT INTO `approver_application` VALUES (15, 9, 'pass', 3, 0);
INSERT INTO `approver_application` VALUES (15, 13, 'great', 3, 0);
INSERT INTO `approver_application` VALUES (15, 16, 'pass', 3, 0);
INSERT INTO `approver_application` VALUES (28, 4, 'None', 3, 0);
COMMIT;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `agreement_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `Agr_id` (`agreement_id`),
  KEY `Usr_id` (`user_id`),
  CONSTRAINT `Agr_id` FOREIGN KEY (`agreement_id`) REFERENCES `agreement` (`agreement_id`),
  CONSTRAINT `Usr_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of comments
-- ----------------------------
BEGIN;
INSERT INTO `comments` VALUES (11, 2, 2, 'COMMENT FROM MARK', '2021-11-14 15:47:24');
INSERT INTO `comments` VALUES (12, 2, 2, 'TEST COMMENT', '2021-11-14 15:47:35');
INSERT INTO `comments` VALUES (13, 2, 2, 'GOOD JOB', '2021-11-14 15:48:36');
INSERT INTO `comments` VALUES (14, 2, 1, 'TEST', '2021-11-15 14:06:41');
INSERT INTO `comments` VALUES (15, 28, 2, 'test', '2021-11-15 14:21:42');
INSERT INTO `comments` VALUES (16, 11, 2, 'Well done', '2021-11-16 03:00:50');
INSERT INTO `comments` VALUES (17, 11, 1, 'Great', '2021-11-16 03:01:05');
INSERT INTO `comments` VALUES (18, 11, 4, 'Could be better', '2021-11-16 03:01:21');
INSERT INTO `comments` VALUES (19, 11, 2, 'I change the year of the title', '2021-11-16 04:02:14');
INSERT INTO `comments` VALUES (20, 11, 1, 'I change the title again', '2021-11-17 12:01:37');
INSERT INTO `comments` VALUES (21, 11, 2, 'looks good ', '2021-11-17 12:02:31');
COMMIT;

-- ----------------------------
-- Table structure for director_agreement
-- ----------------------------
DROP TABLE IF EXISTS `director_agreement`;
CREATE TABLE `director_agreement` (
  `agreement_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rank` int(11) DEFAULT NULL,
  PRIMARY KEY (`agreement_id`,`user_id`) USING BTREE,
  KEY `DA_Foreign2` (`user_id`),
  CONSTRAINT `k2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `k1` FOREIGN KEY (`agreement_id`) REFERENCES `agreement` (`agreement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of director_agreement
-- ----------------------------
BEGIN;
INSERT INTO `director_agreement` VALUES (1, 1, -600);
INSERT INTO `director_agreement` VALUES (2, 1, 400);
INSERT INTO `director_agreement` VALUES (6, 1, 500);
INSERT INTO `director_agreement` VALUES (11, 1, 3000);
INSERT INTO `director_agreement` VALUES (11, 8, 3000);
INSERT INTO `director_agreement` VALUES (12, 1, 2500);
INSERT INTO `director_agreement` VALUES (28, 1, 1200);
INSERT INTO `director_agreement` VALUES (28, 8, 2000);
INSERT INTO `director_agreement` VALUES (28, 21, 2000);
COMMIT;

-- ----------------------------
-- Table structure for director_application
-- ----------------------------
DROP TABLE IF EXISTS `director_application`;
CREATE TABLE `director_application` (
  `application_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rank` int(11) DEFAULT NULL,
  PRIMARY KEY (`application_id`,`user_id`),
  KEY `DA_Foreign2` (`user_id`),
  CONSTRAINT `DA_Foreign1` FOREIGN KEY (`application_id`) REFERENCES `application` (`application_id`),
  CONSTRAINT `DA_Foreign2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of director_application
-- ----------------------------
BEGIN;
INSERT INTO `director_application` VALUES (1, 1, 4200);
INSERT INTO `director_application` VALUES (1, 8, 1000);
INSERT INTO `director_application` VALUES (1, 21, 1000);
INSERT INTO `director_application` VALUES (2, 1, 1200);
INSERT INTO `director_application` VALUES (2, 8, 3000);
INSERT INTO `director_application` VALUES (2, 21, 3000);
INSERT INTO `director_application` VALUES (6, 1, 1800);
INSERT INTO `director_application` VALUES (10, 1, 4100);
INSERT INTO `director_application` VALUES (10, 8, 4000);
INSERT INTO `director_application` VALUES (10, 21, 4000);
INSERT INTO `director_application` VALUES (11, 1, 4000);
INSERT INTO `director_application` VALUES (11, 8, 5000);
INSERT INTO `director_application` VALUES (11, 21, 5000);
INSERT INTO `director_application` VALUES (12, 1, 2500);
INSERT INTO `director_application` VALUES (14, 1, 8000);
INSERT INTO `director_application` VALUES (14, 8, 8000);
INSERT INTO `director_application` VALUES (14, 21, 8000);
INSERT INTO `director_application` VALUES (15, 1, 9000);
INSERT INTO `director_application` VALUES (15, 8, 9000);
INSERT INTO `director_application` VALUES (15, 21, 9000);
INSERT INTO `director_application` VALUES (28, 1, 1200);
INSERT INTO `director_application` VALUES (28, 8, 2000);
INSERT INTO `director_application` VALUES (28, 21, 2000);
COMMIT;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `division_name` varchar(100) NOT NULL,
  `group_name` varchar(100) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `short_description` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `funded` int(11) DEFAULT '0',
  `actual_budget` int(11) NOT NULL,
  `estimated_budget` int(11) NOT NULL,
  `visible` tinyint(4) DEFAULT '1',
  `outcomes` varchar(2000) NOT NULL,
  `creator_user_id` int(11) NOT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  KEY `fk_user_project` (`creator_user_id`),
  CONSTRAINT `fk_user_project` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
BEGIN;
INSERT INTO `project` VALUES (1, 'test bio project', 'Biological sciences', 'Zoology', 'i like zoos', 'i like zoos', '2021-05-11', '2026-05-11', 21900, 0, 23000, 1, 'visit a zoo', 1, NULL);
INSERT INTO `project` VALUES (2, '3d Animation rigging for 2d sprites', 'Information and computing sciences', 'Graphics, augmented reality and games', 'We need to come up with a better way to animate 2d sprites without dropping frames', '2d animation is kind of terrible', '2021-10-20', '2021-12-31', 6999, 0, 30000, 1, '2D animation that is seamless and easy to create', 3, NULL);
INSERT INTO `project` VALUES (6, 'Problem X - TEST', 'Commerce, management, tourism and services', 'Human resources and industrial relations', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam massa magna, lobortis eget massa a, venenatis cursus magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris felis orci, volutpat ac porttitor ut, faucibus vel neque. Vivamus nec quam sit amet arcu consectetur tristique. Sed vel auctor augue. Nulla pulvinar diam eget justo pellentesque, accumsan tincidunt ipsum auctor. Cras eu auctor ligula, eu interdum est. Vestibulum viverra iaculis molestie. In in lacinia velit. Maecenas dapibus urna eu ullamcorper porttitor. Nunc iaculis porta nisi, sit amet vulputate dui blandit non. Donec vehicula elit sit amet mi hendrerit, a eleifend augue ultricies.', 'Outcomes field empty', '2021-09-29', '2021-11-20', 200, 0, 2000, 1, '', 5, NULL);
INSERT INTO `project` VALUES (9, 'too many \'\'', 'Information and computing sciences', 'Data management and data science', 'I\'\'ll need support', 'the quotes don\'\'t wanna cooperate', '2021-10-20', '2021-11-18', 0, 0, 0, 1, 'I\'\'ll be happy if this test works', 3, NULL);
INSERT INTO `project` VALUES (10, 'Solar car', '', '', '', '', '2021-09-30', '2021-09-30', 0, 0, 0, 1, '', 5, NULL);
INSERT INTO `project` VALUES (11, 'Heat conductivity', 'History, heritage and archaeology', 'Heritage, archive and museum studies', 'sdf', 'sdf', '2021-09-30', '2021-09-30', 0, 0, 0, 1, 'sdf', 5, NULL);
INSERT INTO `project` VALUES (12, 'DNA model', 'History, heritage and archaeology', 'Other history, heritage and archaeology', 'long', 'Send help', '2021-09-30', '2021-11-19', 2000, 0, 2000, 0, 'ourcomes', 5, NULL);
INSERT INTO `project` VALUES (14, 'How dry rainforests respond to wildfires', 'Biological sciences', 'Ecology', 'How does humidity affect the spread of wildfires in rainforests?', 'How does humidity affect the spread of wildfires in rainforests?', '2021-09-30', '2021-10-13', 10000, 0, 400000, 1, 'Test plan, data, cleaned data and final report', 1, NULL);
INSERT INTO `project` VALUES (15, 'Covid Tracker', 'Education', 'Education systems', 'Please scan ur qr code when checking in.', 'pls scan ur qr code', '2021-09-30', '2021-12-02', 0, 0, 1000000, 1, 'An app', 1, NULL);
INSERT INTO `project` VALUES (18, 'Insufficient funds to finish USYD Degree', 'Education', 'Curriculum and pedagogy', 'Can someone help me by paying my tuition fees?', 'Im out of money', '2021-09-30', '2021-10-07', 10, 0, 30000, 1, 'Graduation', 11, NULL);
INSERT INTO `project` VALUES (20, '~`!@#$%^&*()_-+={}[]|:;<,>.?/', 'Human society', 'Demography', '~`!@#$%^&*()_-+={}[]|:;<,>.?/', '~`!@#$%^&*()_-+={}[]|:;<,>.?/', '2021-09-30', '2021-09-30', 0, 0, 0, 1, '~`!@#$%^&*()_-+={}[]|:;<,>.?/', 11, NULL);
INSERT INTO `project` VALUES (21, 'a', 'Creative arts and writing', 'Music', 'd', 's', '2021-09-30', '2021-09-30', 0, 0, 0, 1, 'f', 11, NULL);
INSERT INTO `project` VALUES (22, 'name is name', 'Engineering', 'Fluid mechanics and thermal engineering', 's', 'a', '2021-09-30', '2021-09-30', 0, 0, 0, 1, 'd', 11, NULL);
INSERT INTO `project` VALUES (23, 'a', 'Economics', 'Applied economics', 'd', 's', '2021-09-30', '2021-09-30', 0, 0, 0, 1, 'f', 11, NULL);
INSERT INTO `project` VALUES (24, 'Test', 'History, heritage and archaeology', 'Heritage, archive and museum studies', 'testestest', 'testest', '2021-09-30', '2021-10-13', 3, 0, 300, 1, 'testewstset', 11, NULL);
INSERT INTO `project` VALUES (25, 'a', 'Chemical sciences', 'Inorganic chemistry', 'd', 's', '2021-10-12', '2021-10-14', 0, 0, 1, 1, 'f', 11, NULL);
INSERT INTO `project` VALUES (26, 'qwer', 'Information and computing sciences', 'Graphics, augmented reality and games', 'r', 'qwer', '2021-09-30', '2021-11-19', 0, 0, 0, 1, 'r', 20, NULL);
INSERT INTO `project` VALUES (27, 'a', 'Education', 'Curriculum and pedagogy', 'd', 's', '2021-10-06', '2021-10-20', 1, 0, 12123, 1, 'f', 11, NULL);
INSERT INTO `project` VALUES (28, 'Bitconnect', 'Economics', 'Economic theory', 'Pls buy. Big stonks', 'Not scam', '2021-09-30', '2022-02-03', 0, 0, 0, 1, '$', 1, NULL);
INSERT INTO `project` VALUES (30, 'a', 'Education', 'Education systems', 'd', 's', '2021-09-30', '2021-09-30', 0, 0, 0, 1, 'f', 11, NULL);
INSERT INTO `project` VALUES (31, 'BMT Cancer Treatment', 'Biological sciences', 'Biochemistry and cell biology', 'How effective are bone marrow transplants when trying to treat cancer? This study will look to compare bone marrow transplants to other forms of cancer treatments.', 'How effective are bone marrow transplants when trying to treat cancer?', '2021-09-30', '2025-10-31', 2000, 0, 1000000, 1, 'A test plan, list of participants, data, scientific report', 1, NULL);
INSERT INTO `project` VALUES (32, 'A trip to the zoo', 'Biological sciences', 'Zoology', 'I really like long trips to the zoo.', 'I LOVE ZOOS', '2021-09-30', '2021-09-30', 717, 0, 20, 1, 'A trip to the zoo.', 1, NULL);
INSERT INTO `project` VALUES (33, 'Clean Water', 'Engineering', 'Environmental engineering', 'I really want everyone to have access to clean water by making a revolutionary water purifier.', 'Fund me to solve dirty water', '2021-10-01', '2022-02-24', 0, 0, 20000, 1, 'Sure thing', 21, NULL);
INSERT INTO `project` VALUES (34, 'not_a_scam', 'Economics', 'Economic theory', 'yes', 'Defos not a pyramid scheme', '2021-10-20', '2021-10-30', 50, 0, 50000, 1, 'yes', 3, NULL);
INSERT INTO `project` VALUES (35, 'Build a prototype', 'Law and legal studies', 'Legal systems', 'Build a prototype', 'Build a prototype', '2021-10-01', '2021-10-31', 5, 0, 2000, 1, 'Build a prototype', 22, NULL);
INSERT INTO `project` VALUES (40, 'Problems with no images?', 'Earth sciences', 'Geology', 'Just hoping there\'s no breaking', 'Can you make a problem with no image?', '2021-10-16', '2021-10-16', 0, 0, 30, 1, '- Problems can be posted without the need of a profile image', 3, NULL);
INSERT INTO `project` VALUES (41, 'With Images', 'Information and computing sciences', 'Graphics, augmented reality and games', 'please say it\'s there', 'can you post an image?', '2021-10-16', '2021-10-16', 0, 0, 5000, 1, 'images, need I say more?', 3, NULL);
INSERT INTO `project` VALUES (47, 'Save the Koalas pls', 'Environmental sciences', 'Ecological applications', 'Koalas are my favourite animal yes', 'I love koalas so much', '2021-10-19', '2022-03-23', 3000, 0, 20000, 1, 'Stop koalas dying PLEASE', 2, NULL);
COMMIT;

-- ----------------------------
-- Table structure for researcher_agreement
-- ----------------------------
DROP TABLE IF EXISTS `researcher_agreement`;
CREATE TABLE `researcher_agreement` (
  `agreement_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_lead_researcher` tinyint(4) DEFAULT NULL,
  `permission` int(11) DEFAULT '0',
  PRIMARY KEY (`agreement_id`,`user_id`),
  KEY `RAG_Foreign2` (`user_id`),
  CONSTRAINT `RAG_Foreign2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `RAG_Foreign1` FOREIGN KEY (`agreement_id`) REFERENCES `agreement` (`agreement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of researcher_agreement
-- ----------------------------
BEGIN;
INSERT INTO `researcher_agreement` VALUES (2, 1, NULL, 1);
INSERT INTO `researcher_agreement` VALUES (2, 2, 1, 2);
INSERT INTO `researcher_agreement` VALUES (2, 5, 0, 1);
INSERT INTO `researcher_agreement` VALUES (2, 18, NULL, 1);
INSERT INTO `researcher_agreement` VALUES (6, 2, 1, 2);
INSERT INTO `researcher_agreement` VALUES (6, 3, NULL, 1);
INSERT INTO `researcher_agreement` VALUES (10, 2, 1, 2);
INSERT INTO `researcher_agreement` VALUES (11, 2, 1, 2);
INSERT INTO `researcher_agreement` VALUES (11, 7, 0, 1);
INSERT INTO `researcher_agreement` VALUES (11, 10, 0, 0);
INSERT INTO `researcher_agreement` VALUES (12, 2, 1, 2);
INSERT INTO `researcher_agreement` VALUES (28, 2, 1, 2);
COMMIT;

-- ----------------------------
-- Table structure for researcher_application
-- ----------------------------
DROP TABLE IF EXISTS `researcher_application`;
CREATE TABLE `researcher_application` (
  `application_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_lead_researcher` tinyint(4) DEFAULT '0',
  `permission` int(11) DEFAULT '0',
  PRIMARY KEY (`application_id`,`user_id`),
  KEY `RA_Foreign2` (`user_id`),
  CONSTRAINT `RA_Foreign1` FOREIGN KEY (`application_id`) REFERENCES `application` (`application_id`),
  CONSTRAINT `RA_Foreign2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of researcher_application
-- ----------------------------
BEGIN;
INSERT INTO `researcher_application` VALUES (1, 1, NULL, 2);
INSERT INTO `researcher_application` VALUES (1, 2, 1, 2);
INSERT INTO `researcher_application` VALUES (1, 7, 0, 1);
INSERT INTO `researcher_application` VALUES (1, 11, NULL, 0);
INSERT INTO `researcher_application` VALUES (1, 12, 0, 0);
INSERT INTO `researcher_application` VALUES (2, 1, NULL, 0);
INSERT INTO `researcher_application` VALUES (2, 2, 1, 2);
INSERT INTO `researcher_application` VALUES (2, 4, NULL, 1);
INSERT INTO `researcher_application` VALUES (2, 5, 0, 1);
INSERT INTO `researcher_application` VALUES (6, 2, 1, 2);
INSERT INTO `researcher_application` VALUES (10, 2, 1, 2);
INSERT INTO `researcher_application` VALUES (10, 7, NULL, 2);
INSERT INTO `researcher_application` VALUES (10, 10, NULL, 1);
INSERT INTO `researcher_application` VALUES (10, 11, 0, 0);
INSERT INTO `researcher_application` VALUES (11, 2, 1, 2);
INSERT INTO `researcher_application` VALUES (11, 7, 0, 1);
INSERT INTO `researcher_application` VALUES (11, 10, 0, 0);
INSERT INTO `researcher_application` VALUES (12, 2, 1, 2);
INSERT INTO `researcher_application` VALUES (12, 5, 0, 1);
INSERT INTO `researcher_application` VALUES (14, 2, 1, 2);
INSERT INTO `researcher_application` VALUES (14, 7, 0, 1);
INSERT INTO `researcher_application` VALUES (14, 10, 0, 0);
INSERT INTO `researcher_application` VALUES (14, 11, 0, 0);
INSERT INTO `researcher_application` VALUES (15, 2, 1, 2);
INSERT INTO `researcher_application` VALUES (15, 7, 0, 1);
INSERT INTO `researcher_application` VALUES (15, 10, 0, 0);
INSERT INTO `researcher_application` VALUES (15, 11, 0, 0);
INSERT INTO `researcher_application` VALUES (28, 2, 1, 2);
INSERT INTO `researcher_application` VALUES (28, 7, 0, 0);
INSERT INTO `researcher_application` VALUES (28, 10, 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `pass_word` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `is_grantor` tinyint(4) DEFAULT '0',
  `is_researcher` tinyint(4) DEFAULT '0',
  `is_reviewer` tinyint(4) DEFAULT '0',
  `is_admin` tinyint(4) DEFAULT '0',
  `organization` varchar(50) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'DJim', '123456', 'asdf@gmail.com', 0, 0, 0, 1, 'USYD', NULL);
INSERT INTO `user` VALUES (2, 'RMark Zuc', '123456', 'markuszuccus@gmail.com', 0, 1, 0, 0, 'USYD', NULL);
INSERT INTO `user` VALUES (3, 'ARon the Omnipotent', '123456', 'ron@email.com', 0, 0, 1, 0, 'UNSW', NULL);
INSERT INTO `user` VALUES (4, 'ATim Bobby', '123456', 'tim_bobby@aol.com', 0, 0, 1, 0, 'USYD', NULL);
INSERT INTO `user` VALUES (5, 'Karen Koveed', '123456', 'kkk@gmail.com', 0, 0, 1, 0, 'USYD', NULL);
INSERT INTO `user` VALUES (6, 'name', '123456', 'email', 0, 0, 1, 0, NULL, NULL);
INSERT INTO `user` VALUES (7, 'CEdgar Allan Poe', '123456', 'edgyEdgar@email.com', 0, 1, 0, 0, 'USYD', NULL);
INSERT INTO `user` VALUES (8, 'DRu', '123456', 'daGronk@email.com', 0, 0, 0, 1, 'UTS', NULL);
INSERT INTO `user` VALUES (9, 'Bill Nye', '123456', 'theScienceGuy@email.com', 0, 0, 1, 0, 'UTS', NULL);
INSERT INTO `user` VALUES (10, 'CKieran', '123456', 'kieran@gmail.com', 0, 1, 0, 0, 'UTS', NULL);
INSERT INTO `user` VALUES (11, 'CHan', '123456', 'testResearcher', 0, 1, 0, 0, 'UNSW', NULL);
INSERT INTO `user` VALUES (12, 'RZhoujie', '123456', 'testGrantor', 0, 1, 0, 0, 'UNSW', NULL);
INSERT INTO `user` VALUES (13, 'testReviewer', '123456', 'testReviewer', 0, 0, 1, 0, 'UNSW', NULL);
INSERT INTO `user` VALUES (16, 'Mike', '123456', 'mike@email', 0, 0, 1, 0, 'UTS', NULL);
INSERT INTO `user` VALUES (18, 'Conan O\'Brien', '123456', 'thistimeitreallywont@work', 0, 0, 1, 0, 'UTS', NULL);
INSERT INTO `user` VALUES (19, 'ACheng yan', '123456', 'grantor@gmail.com', 0, 0, 1, 0, 'USYD', NULL);
INSERT INTO `user` VALUES (20, 'Not a Grantor', '123456', 'notagrantor@gmail.com', 0, 0, 1, 0, 'USYD', NULL);
INSERT INTO `user` VALUES (21, 'DEmily', '123456', 'emily@gmail.com', 0, 0, 0, 1, 'UNSW', NULL);
INSERT INTO `user` VALUES (22, 'Parker', '123456', 'info@searten.com', 0, 0, 1, 0, 'UTS', NULL);
INSERT INTO `user` VALUES (23, 'Jeff', '123456', 'Jeff@gmail.com', 0, 0, 1, 0, 'USYD', NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_project
-- ----------------------------
DROP TABLE IF EXISTS `user_project`;
CREATE TABLE `user_project` (
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `is_researcher` tinyint(4) DEFAULT NULL,
  `is_director` tinyint(4) DEFAULT NULL,
  `is_approver` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`project_id`),
  KEY `UP_Foreign2` (`project_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `UP_Foreign1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `UP_Foreign2` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_project
-- ----------------------------
BEGIN;
INSERT INTO `user_project` VALUES (1, 1, 0, 1, 0);
INSERT INTO `user_project` VALUES (1, 2, 0, 1, 0);
INSERT INTO `user_project` VALUES (1, 6, 0, 1, 0);
INSERT INTO `user_project` VALUES (1, 10, 0, 1, 0);
INSERT INTO `user_project` VALUES (1, 11, 0, 1, 0);
INSERT INTO `user_project` VALUES (1, 12, 0, 1, 0);
INSERT INTO `user_project` VALUES (1, 14, 0, 1, 0);
INSERT INTO `user_project` VALUES (1, 15, 0, 1, 0);
INSERT INTO `user_project` VALUES (1, 28, 0, 1, 0);
INSERT INTO `user_project` VALUES (2, 1, 1, 0, 0);
INSERT INTO `user_project` VALUES (2, 2, 1, 0, 0);
INSERT INTO `user_project` VALUES (2, 6, 1, 0, 0);
INSERT INTO `user_project` VALUES (2, 10, 1, 0, 0);
INSERT INTO `user_project` VALUES (2, 11, 1, 0, 0);
INSERT INTO `user_project` VALUES (2, 12, 1, 0, 0);
INSERT INTO `user_project` VALUES (2, 14, 1, 0, 0);
INSERT INTO `user_project` VALUES (2, 15, 1, 0, 0);
INSERT INTO `user_project` VALUES (2, 28, 1, 0, 0);
INSERT INTO `user_project` VALUES (3, 1, 0, 0, 1);
INSERT INTO `user_project` VALUES (3, 2, 0, 0, 1);
INSERT INTO `user_project` VALUES (3, 6, 1, 0, 0);
INSERT INTO `user_project` VALUES (3, 28, 0, 0, 1);
INSERT INTO `user_project` VALUES (4, 1, 0, 0, 1);
INSERT INTO `user_project` VALUES (4, 2, 1, 0, 0);
INSERT INTO `user_project` VALUES (4, 11, 0, 0, 1);
INSERT INTO `user_project` VALUES (4, 15, 0, 0, 1);
INSERT INTO `user_project` VALUES (4, 28, 0, 0, 1);
INSERT INTO `user_project` VALUES (5, 1, 0, 0, 1);
INSERT INTO `user_project` VALUES (5, 2, 0, 0, 1);
INSERT INTO `user_project` VALUES (5, 12, 1, 0, 0);
INSERT INTO `user_project` VALUES (5, 15, 0, 0, 1);
INSERT INTO `user_project` VALUES (7, 1, 1, 0, 0);
INSERT INTO `user_project` VALUES (7, 2, 0, 0, 0);
INSERT INTO `user_project` VALUES (7, 10, 1, 0, 0);
INSERT INTO `user_project` VALUES (7, 11, 1, 0, 0);
INSERT INTO `user_project` VALUES (7, 14, 1, 0, 0);
INSERT INTO `user_project` VALUES (7, 15, 1, 0, 0);
INSERT INTO `user_project` VALUES (7, 28, 1, 0, 0);
INSERT INTO `user_project` VALUES (8, 10, 0, 1, 0);
INSERT INTO `user_project` VALUES (8, 11, 0, 1, 0);
INSERT INTO `user_project` VALUES (8, 12, 0, 1, 0);
INSERT INTO `user_project` VALUES (8, 14, 0, 1, 0);
INSERT INTO `user_project` VALUES (8, 15, 0, 1, 0);
INSERT INTO `user_project` VALUES (8, 28, 0, 1, 0);
INSERT INTO `user_project` VALUES (9, 1, 0, 0, 1);
INSERT INTO `user_project` VALUES (9, 11, 0, 0, 1);
INSERT INTO `user_project` VALUES (9, 15, 0, 0, 1);
INSERT INTO `user_project` VALUES (9, 28, 0, 0, 1);
INSERT INTO `user_project` VALUES (10, 10, 1, 0, 0);
INSERT INTO `user_project` VALUES (10, 11, 1, 0, 0);
INSERT INTO `user_project` VALUES (10, 14, 1, 0, 0);
INSERT INTO `user_project` VALUES (10, 15, 1, 0, 0);
INSERT INTO `user_project` VALUES (10, 28, 1, 0, 0);
INSERT INTO `user_project` VALUES (11, 1, 1, 0, 0);
INSERT INTO `user_project` VALUES (11, 10, 1, 0, 0);
INSERT INTO `user_project` VALUES (11, 14, 1, 0, 0);
INSERT INTO `user_project` VALUES (11, 15, 1, 0, 0);
INSERT INTO `user_project` VALUES (12, 1, 1, 0, 0);
INSERT INTO `user_project` VALUES (13, 1, 0, 0, 1);
INSERT INTO `user_project` VALUES (13, 15, 0, 0, 1);
INSERT INTO `user_project` VALUES (16, 1, 0, 0, 1);
INSERT INTO `user_project` VALUES (16, 15, 0, 0, 1);
INSERT INTO `user_project` VALUES (16, 28, 0, 0, 1);
INSERT INTO `user_project` VALUES (18, 1, 0, 0, 1);
INSERT INTO `user_project` VALUES (18, 2, 1, 0, 0);
INSERT INTO `user_project` VALUES (18, 28, 0, 0, 1);
INSERT INTO `user_project` VALUES (19, 1, 0, 0, 1);
INSERT INTO `user_project` VALUES (19, 28, 0, 0, 1);
INSERT INTO `user_project` VALUES (20, 1, 0, 0, 1);
INSERT INTO `user_project` VALUES (20, 28, 0, 0, 1);
INSERT INTO `user_project` VALUES (21, 10, 0, 1, 0);
INSERT INTO `user_project` VALUES (21, 11, 0, 1, 0);
INSERT INTO `user_project` VALUES (21, 12, 0, 1, 0);
INSERT INTO `user_project` VALUES (21, 14, 0, 1, 0);
INSERT INTO `user_project` VALUES (21, 15, 0, 1, 0);
INSERT INTO `user_project` VALUES (21, 28, 0, 1, 0);
INSERT INTO `user_project` VALUES (23, 12, 0, 0, 1);
INSERT INTO `user_project` VALUES (23, 28, 0, 0, 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
