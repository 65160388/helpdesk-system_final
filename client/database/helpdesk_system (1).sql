-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2024 at 04:01 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `helpdesk_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `knowledge`
--

CREATE TABLE `knowledge` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `queues`
--

CREATE TABLE `queues` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff_queues`
--

CREATE TABLE `staff_queues` (
  `staff_id` int(11) NOT NULL,
  `queue_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff_tickets`
--

CREATE TABLE `staff_tickets` (
  `staff_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `queue_id` int(11) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('New','Assigned','In Progress','Pending','Resolved','Closed') NOT NULL DEFAULT 'New',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_history`
--

CREATE TABLE `ticket_history` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `changed_by` int(11) NOT NULL,
  `old_status` enum('New','Assigned','In Progress','Pending','Resolved','Closed','Reopened','Escalated') DEFAULT NULL,
  `new_status` enum('New','Assigned','In Progress','Pending','Resolved','Closed','Reopened','Escalated') NOT NULL,
  `changed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','staff','admin') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(3, 'test', 'test', 'test@gmail.com', '$2a$10$TvB45imV2DxI5lq0PqrU9OuRpKfsr9VorlcMVbNZD72dMCx.75xUG', 'user', '2024-10-04 18:06:32', NULL),
(5, 'test', 'test', 'test1@gmail.com', '$2a$10$9HD4tZjHDot310bJUVkJ5upXSlk0gXsAyYttNMAt36RT00zbpnnwG', 'user', '2024-10-04 18:20:11', NULL),
(6, 'Admin', 'Nic', 'admin@gmail.com', '$2a$10$RtwR4ZrcdueoZvK1fBhCOuk9aR7pgC/CZceUdd6RywyzKBFJZsoUe', 'admin', '2024-10-05 19:36:17', NULL),
(7, 'test', 'test', 'test123@gmail.com', '$2a$10$tZAly/RmqECai0lFTVBeK.PCkJuUmPpa.57N2pIpWfnGmu2TOA096', 'user', '2024-10-06 16:58:12', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `knowledge`
--
ALTER TABLE `knowledge`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `queues`
--
ALTER TABLE `queues`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `staff_queues`
--
ALTER TABLE `staff_queues`
  ADD PRIMARY KEY (`staff_id`,`queue_id`),
  ADD KEY `queue_id` (`queue_id`);

--
-- Indexes for table `staff_tickets`
--
ALTER TABLE `staff_tickets`
  ADD PRIMARY KEY (`staff_id`,`ticket_id`),
  ADD KEY `ticket_id` (`ticket_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_queue_id` (`queue_id`);

--
-- Indexes for table `ticket_history`
--
ALTER TABLE `ticket_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ticket_history_tickets` (`ticket_id`),
  ADD KEY `fk_ticket_history_users` (`changed_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `knowledge`
--
ALTER TABLE `knowledge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `queues`
--
ALTER TABLE `queues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_history`
--
ALTER TABLE `ticket_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `staff_queues`
--
ALTER TABLE `staff_queues`
  ADD CONSTRAINT `staff_queues_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `staff_queues_ibfk_2` FOREIGN KEY (`queue_id`) REFERENCES `queues` (`id`);

--
-- Constraints for table `staff_tickets`
--
ALTER TABLE `staff_tickets`
  ADD CONSTRAINT `staff_tickets_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `staff_tickets_ibfk_2` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `fk_tickets_queues` FOREIGN KEY (`queue_id`) REFERENCES `queues` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_tickets_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`queue_id`) REFERENCES `queues` (`id`);

--
-- Constraints for table `ticket_history`
--
ALTER TABLE `ticket_history`
  ADD CONSTRAINT `fk_ticket_history_tickets` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ticket_history_users` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ticket_history_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  ADD CONSTRAINT `ticket_history_ibfk_2` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
