CREATE TABLE `category` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`desc` text,
	`image` text,
	`tags` json DEFAULT ('null'),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `category_id` PRIMARY KEY(`id`)
);
