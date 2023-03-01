/*
  Warnings:

  - You are about to drop the column `DeletedAt` on the `customers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customers` DROP COLUMN `DeletedAt`,
    ADD COLUMN `DeletedOn` DATETIME(0) NULL;
