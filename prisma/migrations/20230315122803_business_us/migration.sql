/*
  Warnings:

  - The primary key for the `appointment_statuses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `appointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `business_node_customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `business_node_hours` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `business_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `business_user_hours` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `business_user_services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `business_user_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `payment_transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_messages` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `appointment_statuses` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `appointments` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `business_node_customers` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `business_node_hours` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `business_skills` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `business_user_hours` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `business_user_services` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `business_user_skills` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `notifications` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `payment_transactions` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user_messages` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `business_user_services` ADD CONSTRAINT `business_user_services_BusinessServiceId_fkey` FOREIGN KEY (`BusinessServiceId`) REFERENCES `business_services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_user_services` ADD CONSTRAINT `business_user_services_BusinessUserId_fkey` FOREIGN KEY (`BusinessUserId`) REFERENCES `business_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
