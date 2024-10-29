-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2024 at 10:18 AM
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
-- Database: `helpdesk_system2`
--

-- --------------------------------------------------------

--
-- Table structure for table `queues`
--

CREATE TABLE `queues` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `queues`
--

INSERT INTO `queues` (`id`, `user_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(13, 1, 'คิวใหม่', 'รายละเอียดของคิว', '2024-10-14 10:08:25', NULL),
(14, 3, 'คิวใหม่', 'รายละเอียดของคิว', '2024-10-14 10:30:44', NULL),
(15, 3, 'คิวใหม่', 'รายละเอียดของคิว', '2024-10-14 10:34:29', NULL),
(16, 3, 'คิวของ ', 'รายละเอียดของคิว', '2024-10-14 10:50:02', NULL),
(17, 3, 'คิวของ Puripat Lakornthai', 'รายละเอียดของคิว', '2024-10-14 10:55:10', NULL),
(18, 3, 'คิวของ Puripat Lakornthai', 'รายละเอียดของคิว', '2024-10-14 10:56:06', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `queue_id` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('New','Assigned','In Progress','Pending','Resolved','Closed','Reopened','Escalated') NOT NULL DEFAULT 'New',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `user_id`, `queue_id`, `subject`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 13, 'Hardware Issue', 'ฏฤฆฏฤฆฏฤฆฏฤฆ', 'New', '2024-10-14 10:08:25', NULL),
(2, 1, 13, 'Hardware Issue', 'ฤฆฏฤฆฏฤฆฏฤฆ', 'New', '2024-10-14 10:08:25', NULL),
(3, 3, 14, 'Network Issue', 'ASDASDAS', 'New', '2024-10-14 10:30:44', NULL),
(4, 3, 14, 'Other', 'DASDASDASDAS', 'New', '2024-10-14 10:30:44', NULL),
(5, 3, 15, 'Network Issue', 'DASDAS', 'New', '2024-10-14 10:34:29', NULL),
(6, 3, 15, 'Network Issue', 'DASDASDASDAS', 'New', '2024-10-14 10:34:29', NULL),
(7, 3, 16, 'Network Issue', 'dsadasd', 'New', '2024-10-14 10:50:02', NULL),
(8, 3, 17, 'Other', 'กไๆกๆไกไๆกๆไ', 'New', '2024-10-14 10:55:11', NULL),
(9, 3, 17, 'Hardware Issue', 'กไๆกๆไกไๆ', 'New', '2024-10-14 10:55:11', NULL),
(10, 3, 18, 'Network Issue', 'ไกๆๆไกๆไแแแแแแแแแ', 'New', '2024-10-14 10:56:06', NULL),
(11, 3, 18, 'Hardware Issue', 'แแแแแแแแแแแแ', 'New', '2024-10-14 10:56:06', NULL);

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
(1, 'Admin', 'Nic', 'admin@gmail.com', '$2a$10$3SYgvY4YXIThp51DywKHEuB/Llbxb8E10hlA856z4yGuTjjbr7RVO', 'admin', '2024-10-13 19:39:34', NULL),
(2, 'Puripat', 'Lakornthai', 'test11@gmail.com', '$2a$10$YOTxr4nHLXWqBBYzFbJ6xeKnOZp0DIToF6Ph3mLiO41TgkMd9zM4W', 'user', '2024-10-13 19:41:15', NULL),
(3, 'Puripat', 'Lakornthai', 'test22@gmail.com', '$2a$10$z.DEWBY83K6Oc6uNMftpZOVYKT9Bgft2MoHwo2T8saDIy0KwOqkbO', 'user', '2024-10-14 10:30:19', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `queues`
--
ALTER TABLE `queues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `queue_id` (`queue_id`);

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
-- AUTO_INCREMENT for table `queues`
--
ALTER TABLE `queues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `queues`
--
ALTER TABLE `queues`
  ADD CONSTRAINT `queues_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`queue_id`) REFERENCES `queues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
