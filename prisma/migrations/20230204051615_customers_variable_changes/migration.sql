/*
  Warnings:

  - The primary key for the `customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `display_picture` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `in_app_user` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `prefix` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `customers` table. All the data in the column will be lost.
  - Added the required column `CreatedAt` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Mobile` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customers` DROP PRIMARY KEY,
    DROP COLUMN `address`,
    DROP COLUMN `created_at`,
    DROP COLUMN `display_picture`,
    DROP COLUMN `dob`,
    DROP COLUMN `email`,
    DROP COLUMN `first_name`,
    DROP COLUMN `gender`,
    DROP COLUMN `in_app_user`,
    DROP COLUMN `is_active`,
    DROP COLUMN `last_name`,
    DROP COLUMN `mobile`,
    DROP COLUMN `prefix`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `Address` TEXT NULL,
    ADD COLUMN `BirthDate` DATETIME(0) NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `DisplayPicture` TEXT NULL,
    ADD COLUMN `Email` VARCHAR(255) NULL,
    ADD COLUMN `FirstName` VARCHAR(255) NULL,
    ADD COLUMN `Gender` VARCHAR(255) NULL,
    ADD COLUMN `InAppUser` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `LastName` VARCHAR(255) NULL,
    ADD COLUMN `Mobile` VARCHAR(255) NOT NULL,
    ADD COLUMN `Prefix` VARCHAR(255) NULL,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
