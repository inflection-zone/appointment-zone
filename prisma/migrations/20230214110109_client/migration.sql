-- CreateTable
CREATE TABLE `api_clients` (
    `id` VARCHAR(191) NOT NULL,
    `ClientName` VARCHAR(255) NOT NULL,
    `ClientCode` CHAR(36) NOT NULL,
    `Phone` VARCHAR(255) NULL,
    `Email` VARCHAR(255) NULL,
    `Password` VARCHAR(255) NULL,
    `IsPrivileged` BOOLEAN NOT NULL DEFAULT false,
    `ApiKey` VARCHAR(255) NOT NULL,
    `ValidFrom` DATETIME NULL,
    `ValidTill` DATETIME NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,
    `DeletedAt` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
