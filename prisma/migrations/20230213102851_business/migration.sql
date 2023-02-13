/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `customers` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `businesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `businesses` DROP COLUMN `CreatedAt`,
    DROP COLUMN `UpdatedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `customers` DROP COLUMN `CreatedAt`,
    DROP COLUMN `UpdatedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
