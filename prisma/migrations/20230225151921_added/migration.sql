-- AlterTable
ALTER TABLE `businesses` ADD COLUMN `DeletedOn` DATETIME(0) NULL,
    ADD COLUMN `IsDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `DeletedAt` DATETIME(0) NULL,
    ADD COLUMN `IsDeleted` BOOLEAN NOT NULL DEFAULT false;
