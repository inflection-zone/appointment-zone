/*
  Warnings:

  - You are about to alter the column `ValidFrom` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ValidTill` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `UpdatedAt` to the `user_login_session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `api_clients` MODIFY `ValidFrom` DATETIME NULL,
    MODIFY `ValidTill` DATETIME NULL;

-- AlterTable
ALTER TABLE `user_login_session` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `UpdatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `user_otp` (
    `id` VARCHAR(191) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,
    `Otp` CHAR(10) NOT NULL,
    `Purpose` ENUM('Login', 'Verification') NOT NULL DEFAULT 'Login',
    `Channel` ENUM('Email', 'Mobile') NOT NULL DEFAULT 'Mobile',
    `Validated` BOOLEAN NOT NULL DEFAULT false,
    `ValidFrom` DATE NOT NULL,
    `ValidTill` DATE NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file_resource` (
    `id` VARCHAR(191) NOT NULL,
    `StorageKey` TEXT NULL,
    `OriginalFilename` VARCHAR(512) NOT NULL,
    `MimeType` VARCHAR(255) NOT NULL,
    `Public` BOOLEAN NOT NULL DEFAULT false,
    `Size` INTEGER NULL,
    `Tags` TEXT,
    `DownloadCount` INTEGER NOT NULL DEFAULT 0,
    `UserId` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_otp` ADD CONSTRAINT `user_otp_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file_resource` ADD CONSTRAINT `file_resource_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
