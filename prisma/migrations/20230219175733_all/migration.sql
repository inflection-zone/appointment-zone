/*
  Warnings:

  - You are about to drop the column `DeletedAt` on the `api_clients` table. All the data in the column will be lost.
  - You are about to alter the column `ValidFrom` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ValidTill` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `DeletedAt` on the `role_privileges` table. All the data in the column will be lost.
  - You are about to drop the column `DeletedAt` on the `roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `api_clients` DROP COLUMN `DeletedAt`,
    MODIFY `ValidFrom` DATETIME NULL,
    MODIFY `ValidTill` DATETIME NULL;

-- AlterTable
ALTER TABLE `appointment_statuses` MODIFY `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `appointments` MODIFY `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `business_node_customers` MODIFY `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `business_node_hours` MODIFY `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `business_nodes` MODIFY `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `business_services` MODIFY `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `business_skills` MODIFY `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `business_user_hours` MODIFY `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `business_user_services` MODIFY `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `business_user_skills` MODIFY `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `business_users` MODIFY `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `UpdatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `role_privileges` DROP COLUMN `DeletedAt`,
    MODIFY `RoleName` CHAR(36) NULL,
    MODIFY `Privilege` CHAR(36) NULL;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `DeletedAt`;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `UserName` CHAR(36) NOT NULL,
    `Prefix` CHAR(36) NOT NULL,
    `FirstName` VARCHAR(255) NOT NULL,
    `LastName` VARCHAR(255) NOT NULL,
    `CountryCode` CHAR(36) NOT NULL,
    `Phone` VARCHAR(255) NULL,
    `Email` VARCHAR(255) NULL,
    `Gender` ENUM('Male', 'Female', 'Other') NOT NULL DEFAULT 'Male',
    `BirthDate` DATE NULL,
    `Password` VARCHAR(512) NULL,
    `RoleId` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `id` VARCHAR(191) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,
    `RoleId` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_login_session` (
    `id` VARCHAR(191) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `StartedAt` DATE NOT NULL,
    `ValidTill` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_RoleId_fkey` FOREIGN KEY (`RoleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_RoleId_fkey` FOREIGN KEY (`RoleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_login_session` ADD CONSTRAINT `user_login_session_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
