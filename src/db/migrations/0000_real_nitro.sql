CREATE TABLE `prediction` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`userId` text,
	`matchId` text,
	`winningTeamId` text);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`clerkId` text,
	`username` varchar(255),
	`points` int);
