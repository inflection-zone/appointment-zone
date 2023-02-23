/*
  Warnings:

  - You are about to alter the column `ValidFrom` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ValidTill` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[UserId]` on the table `file_resource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UserId]` on the table `user_login_session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UserId]` on the table `user_otp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UserId]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[RoleId]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[RoleId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `api_clients` MODIFY `ValidFrom` DATETIME NULL,
    MODIFY `ValidTill` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `file_resource_UserId_key` ON `file_resource`(`UserId`);

-- CreateIndex
CREATE UNIQUE INDEX `user_login_session_UserId_key` ON `user_login_session`(`UserId`);

-- CreateIndex
CREATE UNIQUE INDEX `user_otp_UserId_key` ON `user_otp`(`UserId`);

-- CreateIndex
CREATE UNIQUE INDEX `user_roles_UserId_key` ON `user_roles`(`UserId`);

-- CreateIndex
CREATE UNIQUE INDEX `user_roles_RoleId_key` ON `user_roles`(`RoleId`);

-- CreateIndex
CREATE UNIQUE INDEX `users_RoleId_key` ON `users`(`RoleId`);
