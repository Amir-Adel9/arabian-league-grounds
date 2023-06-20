ALTER TABLE `prediction` ADD `losingTeamId` text;--> statement-breakpoint
ALTER TABLE `prediction` ADD `createdAt` timestamp DEFAULT (now());