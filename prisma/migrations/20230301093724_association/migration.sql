/*
  Warnings:

  - You are about to drop the column `RoleId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_RoleId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `RoleId`;
