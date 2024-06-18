-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2024 at 06:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `bienbans`
--

CREATE TABLE `bienbans` (
  `mabienban` varchar(255) NOT NULL,
  `masv` varchar(255) NOT NULL,
  `masach` varchar(255) NOT NULL,
  `loivipham` varchar(255) NOT NULL,
  `bienphapxuly` varchar(255) NOT NULL,
  `ngay` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(7, '2019_12_14_000001_create_personal_access_tokens_table', 2),
(10, '2024_04_19_150807_create_nhanviens_table', 4),
(11, '2024_04_19_151757_create_sinhviens_table', 5),
(12, '2024_04_19_161010_create_sachs_table', 6),
(13, '2024_04_19_161158_create_phieumuons_table', 7),
(14, '2024_04_19_162429_create_bienbans_table', 8),
(17, '2024_04_20_044039_create_taikhoan_table', 10),
(18, '2024_04_20_050748_create_taikhoans_table', 11),
(20, '2024_04_19_163326_create_thethuviens_table', 12),
(21, '2024_04_20_051114_create_taikhoans_table', 12),
(22, '2024_04_20_163127_add_id_to_sachs_table', 13);

-- --------------------------------------------------------

--
-- Table structure for table `nhanviens`
--

CREATE TABLE `nhanviens` (
  `manv` varchar(255) NOT NULL,
  `hoten` varchar(255) NOT NULL,
  `diachi` varchar(255) DEFAULT NULL,
  `sodt` varchar(255) DEFAULT NULL,
  `cmnd` varchar(255) DEFAULT NULL,
  `gioitinh` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nhanviens`
--

INSERT INTO `nhanviens` (`manv`, `hoten`, `diachi`, `sodt`, `cmnd`, `gioitinh`, `created_at`, `updated_at`) VALUES
('MN1', 'Leon', 'HaNoi', '0808089808', '32423423432', 'Male', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phieumuons`
--

CREATE TABLE `phieumuons` (
  `maphieumuon` varchar(255) NOT NULL,
  `ngaymuon` date DEFAULT NULL,
  `ngaytra` date DEFAULT NULL,
  `soluong` varchar(255) DEFAULT NULL,
  `tinhtrangsach` varchar(255) DEFAULT NULL,
  `masach` varchar(255) DEFAULT NULL,
  `masv` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `phieumuons`
--

INSERT INTO `phieumuons` (`maphieumuon`, `ngaymuon`, `ngaytra`, `soluong`, `tinhtrangsach`, `masach`, `masv`, `created_at`, `updated_at`) VALUES
('MP1', '2024-04-11', '2024-04-06', '50', 'Nguyên Vẹn', '213', 'wesker', NULL, NULL),
('MP2', '2024-04-11', '2024-04-12', '400', 'Nguyên Vẹn', 'MP1', 'wesker', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sachs`
--

CREATE TABLE `sachs` (
  `masach` varchar(255) NOT NULL,
  `tensach` varchar(255) NOT NULL,
  `sotrang` varchar(255) NOT NULL,
  `gia` varchar(255) NOT NULL,
  `namxb` varchar(255) NOT NULL,
  `tinhtrangsach` varchar(255) NOT NULL,
  `tentg` varchar(255) NOT NULL,
  `tennxb` varchar(255) NOT NULL,
  `soluong` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sachs`
--

INSERT INTO `sachs` (`masach`, `tensach`, `sotrang`, `gia`, `namxb`, `tinhtrangsach`, `tentg`, `tennxb`, `soluong`, `created_at`, `updated_at`) VALUES
('213', 'Ngu Người', '500', '700.000đ', '2017', 'Nguyên Vẹn', '32423', 'Kim Đồng', '324', NULL, NULL),
('214', 'Sách Thân Thiện', '123', '200.000đ', '2017', 'Nguyên Vẹn', '123', '123', '123123', NULL, NULL),
('MP1', 'Sách Nguyên Tố', '500', '300.000đ', '2009', 'Nguyên Vẹn', 'Nam Cao', 'Kim Đồng', '50', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sinhviens`
--

CREATE TABLE `sinhviens` (
  `masv` varchar(255) NOT NULL,
  `hoten` varchar(255) NOT NULL,
  `gioitinh` varchar(255) NOT NULL,
  `lop` varchar(255) NOT NULL,
  `ngaysinh` date NOT NULL,
  `diachi` varchar(255) DEFAULT NULL,
  `khoa` varchar(255) NOT NULL,
  `manv` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sinhviens`
--

INSERT INTO `sinhviens` (`masv`, `hoten`, `gioitinh`, `lop`, `ngaysinh`, `diachi`, `khoa`, `manv`, `image`, `created_at`, `updated_at`) VALUES
('wesker', 'wesker', 'nam', 'CCT21.3', '2024-04-04', 'New York 1', '23', 'MN1', 'images/1714053929_wesker.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `taikhoans`
--

CREATE TABLE `taikhoans` (
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `taikhoans`
--

INSERT INTO `taikhoans` (`user`, `password`, `email`, `created_at`, `updated_at`) VALUES
('admin', '$2y$10$hUt6Nly/P.G09rAeDs8KrOM08flpe8mdco8z9Sy2of4cu1Xa7gD0K', 'admin@gmail.com', NULL, NULL),
('dũng', '$2y$10$rMY67GiuwxiLH9LXXRvqu.4THFGi/7qjI5JI4j08kQov/XxA5rfN2', 'lcaokhanh2711@gmail.com', NULL, NULL),
('duong', '$2y$10$b.z0QEv8Y8/sEj.gDb2qI.Rma00VtOGNesE4dksNxgoJUH/Vh4xKa', 'duong@gmail.com', NULL, NULL),
('nam', '$2y$10$vD9OaHh3WF7uNrtr4ktJUeaR0T.uEwfVqQBnUHoTQduI7qTL.7Mmu', 'nguyencuong@gmail.com', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `thethuviens`
--

CREATE TABLE `thethuviens` (
  `mathe` varchar(255) NOT NULL,
  `thoigiancap` varchar(255) NOT NULL,
  `hsd` varchar(255) NOT NULL,
  `masv` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `thethuviens`
--

INSERT INTO `thethuviens` (`mathe`, `thoigiancap`, `hsd`, `masv`, `created_at`, `updated_at`) VALUES
('MT1', '2024-04-01', '2024-04-03', 'wesker', '2024-04-27 03:14:43', '2024-04-27 03:14:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bienbans`
--
ALTER TABLE `bienbans`
  ADD PRIMARY KEY (`mabienban`),
  ADD KEY `bienbans_masv_foreign` (`masv`),
  ADD KEY `bienbans_masach_foreign` (`masach`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nhanviens`
--
ALTER TABLE `nhanviens`
  ADD PRIMARY KEY (`manv`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `phieumuons`
--
ALTER TABLE `phieumuons`
  ADD PRIMARY KEY (`maphieumuon`),
  ADD KEY `phieumuons_masach_foreign` (`masach`),
  ADD KEY `phieumuons_masv_foreign` (`masv`);

--
-- Indexes for table `sachs`
--
ALTER TABLE `sachs`
  ADD PRIMARY KEY (`masach`);

--
-- Indexes for table `sinhviens`
--
ALTER TABLE `sinhviens`
  ADD PRIMARY KEY (`masv`),
  ADD KEY `sinhviens_manv_foreign` (`manv`);

--
-- Indexes for table `taikhoans`
--
ALTER TABLE `taikhoans`
  ADD PRIMARY KEY (`user`);

--
-- Indexes for table `thethuviens`
--
ALTER TABLE `thethuviens`
  ADD PRIMARY KEY (`mathe`),
  ADD KEY `thethuviens_masv_foreign` (`masv`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bienbans`
--
ALTER TABLE `bienbans`
  ADD CONSTRAINT `bienbans_masach_foreign` FOREIGN KEY (`masach`) REFERENCES `sachs` (`masach`) ON DELETE CASCADE,
  ADD CONSTRAINT `bienbans_masv_foreign` FOREIGN KEY (`masv`) REFERENCES `sinhviens` (`masv`) ON DELETE CASCADE;

--
-- Constraints for table `phieumuons`
--
ALTER TABLE `phieumuons`
  ADD CONSTRAINT `phieumuons_masach_foreign` FOREIGN KEY (`masach`) REFERENCES `sachs` (`masach`) ON DELETE CASCADE,
  ADD CONSTRAINT `phieumuons_masv_foreign` FOREIGN KEY (`masv`) REFERENCES `sinhviens` (`masv`) ON DELETE CASCADE;

--
-- Constraints for table `sinhviens`
--
ALTER TABLE `sinhviens`
  ADD CONSTRAINT `sinhviens_manv_foreign` FOREIGN KEY (`manv`) REFERENCES `nhanviens` (`manv`);

--
-- Constraints for table `thethuviens`
--
ALTER TABLE `thethuviens`
  ADD CONSTRAINT `thethuviens_masv_foreign` FOREIGN KEY (`masv`) REFERENCES `sinhviens` (`masv`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
