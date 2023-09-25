CREATE TABLE `Logs` (
	`CreatedAt` text DEFAULT current_timestamp NOT NULL,
	`Level` text NOT NULL,
	`Message` text NOT NULL,
	`Error` text
);
