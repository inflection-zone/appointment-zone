/*
  Warnings:

  - The primary key for the `business_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[Email]` on the table `business_users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Mobile]` on the table `business_users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `business_users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `business_users_Email_key` ON `business_users`(`Email`);

-- CreateIndex
CREATE UNIQUE INDEX `business_users_Mobile_key` ON `business_users`(`Mobile`);

-- AddForeignKey
ALTER TABLE `business_users` ADD CONSTRAINT `business_users_BusinessNodeId_fkey` FOREIGN KEY (`BusinessNodeId`) REFERENCES `business_nodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
