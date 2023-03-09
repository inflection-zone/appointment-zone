/*
  Warnings:

  - A unique constraint covering the columns `[Name]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Mobile]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[IsActive]` on the table `businesses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `businesses_Name_key` ON `businesses`(`Name`);

-- CreateIndex
CREATE UNIQUE INDEX `businesses_Mobile_key` ON `businesses`(`Mobile`);

-- CreateIndex
CREATE UNIQUE INDEX `businesses_Email_key` ON `businesses`(`Email`);

-- CreateIndex
CREATE UNIQUE INDEX `businesses_IsActive_key` ON `businesses`(`IsActive`);
