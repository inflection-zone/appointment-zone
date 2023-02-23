/*
  Warnings:

  - You are about to alter the column `ValidFrom` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ValidTill` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `Tags` on table `file_resource` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `api_clients` MODIFY `ValidFrom` DATETIME NULL,
    MODIFY `ValidTill` DATETIME NULL;

-- AlterTable
ALTER TABLE `file_resource` MODIFY `Tags` TEXT NOT NULL;
