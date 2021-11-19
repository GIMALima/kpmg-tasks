CREATE DATABASE `kpmgtasks` CHARACTER SET = 'utf8' COLLATE = 'utf8_general_ci';

USE `kpmgtasks`;

-- kpmgtasks.user definition

CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `profile` VARCHAR(3) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- kpmgtasks.task definition

CREATE TABLE `task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `deadline` VARCHAR(255) NOT NULL,
  `creator` INT NOT NULL,
  `assignee` INT DEFAULT NULL,
  `state` VARCHAR(255) NOT NULL,
  `solution` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `task_creator_fk` (`creator`),
  KEY `task_assignee_fk` (`assignee`),
  CONSTRAINT `task_creator_fk` FOREIGN KEY (`creator`) REFERENCES `user` (`id`),
  CONSTRAINT `task_assignee_fk` FOREIGN KEY (`assignee`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- kpmgtasks.note definition

CREATE TABLE `note` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `creator` INT NOT NULL,
  `task` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `note_creator_fk` (`creator`),
  KEY `note_task_fk` (`task`),
  CONSTRAINT `note_creator_fk` FOREIGN KEY (`creator`) REFERENCES `user` (`id`),
  CONSTRAINT `note_task_fk` FOREIGN KEY (`task`) REFERENCES `task` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;