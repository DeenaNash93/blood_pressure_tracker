-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: מרץ 03, 2025 בזמן 08:55 AM
-- גרסת שרת: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `blood_prs_track`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `blood_pressure_values`
--

CREATE TABLE `blood_pressure_values` (
                                         `id` int(11) NOT NULL,
                                         `id_user` int(11) NOT NULL,
                                         `high_val` int(11) NOT NULL,
                                         `low_val` int(11) NOT NULL,
                                         `pulse` int(11) NOT NULL,
                                         `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `blood_pressure_values`
--

INSERT INTO `blood_pressure_values` (`id`, `id_user`, `high_val`, `low_val`, `pulse`, `date`) VALUES
                                                                                                  (135, 5, 120, 80, 70, '2025-02-26 00:00:00'),
                                                                                                  (136, 5, 180, 70, 75, '2025-02-23 00:00:00'),
                                                                                                  (137, 5, 140, 99, 89, '2025-03-03 00:00:00'),
                                                                                                  (138, 5, 188, 60, 50, '2025-03-01 00:00:00'),
                                                                                                  (140, 1, 133, 120, 86, '2025-03-02 00:00:00'),
                                                                                                  (141, 1, 169, 123, 100, '2025-02-24 00:00:00'),
                                                                                                  (142, 1, 120, 90, 80, '2025-03-03 00:00:00'),
                                                                                                  (143, 2, 123, 85, 79, '2025-03-03 00:00:00'),
                                                                                                  (144, 2, 126, 89, 79, '2025-02-27 00:00:00'),
                                                                                                  (145, 4, 123, 88, 98, '2025-02-23 00:00:00'),
                                                                                                  (146, 4, 150, 120, 102, '2025-02-12 00:00:00');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
                         `id` int(11) NOT NULL,
                         `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`id`, `name`) VALUES
                                       (1, 'אמא'),
                                       (2, 'אבא'),
                                       (4, 'אחות'),
                                       (5, 'אחיין');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `blood_pressure_values`
--
ALTER TABLE `blood_pressure_values`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `blood_pressure_vlaues_fk1` (`id_user`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blood_pressure_values`
--
ALTER TABLE `blood_pressure_values`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `blood_pressure_values`
--
ALTER TABLE `blood_pressure_values`
    ADD CONSTRAINT `blood_pressure_vlaues_fk1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;
