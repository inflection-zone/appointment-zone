/*
  Warnings:

  - You are about to alter the column `ValidFrom` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ValidTill` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `RoleId` on the `role_privileges` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `RoleId` on the `user_roles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `RoleId` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `role_privileges` DROP FOREIGN KEY `role_privileges_RoleId_fkey`;

-- DropForeignKey
ALTER TABLE `user_roles` DROP FOREIGN KEY `user_roles_RoleId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_RoleId_fkey`;

-- AlterTable
ALTER TABLE `api_clients` MODIFY `ValidFrom` DATETIME NULL,
    MODIFY `ValidTill` DATETIME NULL;

-- AlterTable
ALTER TABLE `role_privileges` MODIFY `RoleId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `roles` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user_roles` MODIFY `RoleId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `RoleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `role_privileges` ADD CONSTRAINT `role_privileges_RoleId_fkey` FOREIGN KEY (`RoleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_RoleId_fkey` FOREIGN KEY (`RoleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_RoleId_fkey` FOREIGN KEY (`RoleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
