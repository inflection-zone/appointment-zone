/*
  Warnings:

  - You are about to drop the column `DeletedAt` on the `api_clients` table. All the data in the column will be lost.
  - You are about to alter the column `ValidFrom` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ValidTill` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[ClientCode]` on the table `api_clients` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `api_clients` DROP COLUMN `DeletedAt`,
    ADD COLUMN `DeletedOn` DATETIME(0) NULL,
    ADD COLUMN `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `ValidFrom` DATETIME NULL,
    MODIFY `ValidTill` DATETIME NULL;

-- AlterTable
ALTER TABLE `businesses` ADD COLUMN `DeletedOn` DATETIME(0) NULL,
    ADD COLUMN `IsDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `DeletedOn` DATETIME(0) NULL,
    ADD COLUMN `IsDeleted` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `api_clients_ClientCode_key` ON `api_clients`(`ClientCode`);
