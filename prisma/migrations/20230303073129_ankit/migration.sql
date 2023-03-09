/*
  Warnings:

  - A unique constraint covering the columns `[Mobile]` on the table `business_nodes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Mobile]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `business_nodes_Mobile_key` ON `business_nodes`(`Mobile`);

-- CreateIndex
CREATE UNIQUE INDEX `customers_Email_key` ON `customers`(`Email`);

-- CreateIndex
CREATE UNIQUE INDEX `customers_Mobile_key` ON `customers`(`Mobile`);
