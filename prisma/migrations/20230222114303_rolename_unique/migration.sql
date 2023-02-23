/*
  Warnings:

  - You are about to alter the column `ValidFrom` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ValidTill` on the `api_clients` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[RoleName]` on the table `role_privileges` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[RoleName]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `api_clients` MODIFY `ValidFrom` DATETIME NULL,
    MODIFY `ValidTill` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `role_privileges_RoleName_key` ON `role_privileges`(`RoleName`);

-- CreateIndex
CREATE UNIQUE INDEX `roles_RoleName_key` ON `roles`(`RoleName`);
