ALTER TABLE `prediction` ADD `username` varchar(255);--> statement-breakpoint
ALTER TABLE `prediction` ADD `fulfilled` boolean DEFAULT false;