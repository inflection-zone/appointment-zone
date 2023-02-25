/*
  Warnings:

  - You are about to alter the column `ValidFrom` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ValidTill` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[UserName]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CountryCode]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `api_clients` MODIFY `ValidFrom` DATETIME NULL,
    MODIFY `ValidTill` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `CountryCode` CHAR(36) NOT NULL DEFAULT '+91';

-- CreateIndex
CREATE UNIQUE INDEX `users_UserName_key` ON `users`(`UserName`);

-- CreateIndex
CREATE UNIQUE INDEX `users_CountryCode_key` ON `users`(`CountryCode`);

-- CreateIndex
CREATE UNIQUE INDEX `users_Phone_key` ON `users`(`Phone`);

-- CreateIndex
CREATE UNIQUE INDEX `users_Email_key` ON `users`(`Email`);
