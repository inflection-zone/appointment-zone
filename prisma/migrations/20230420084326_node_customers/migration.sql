-- AlterTable
ALTER TABLE `business_user_hours` MODIFY `EndTime` VARCHAR(191) NOT NULL DEFAULT '21:00:00',
    MODIFY `StartTime` VARCHAR(191) NOT NULL DEFAULT '10:00:00';

-- AddForeignKey
ALTER TABLE `business_node_customers` ADD CONSTRAINT `business_node_customers_BusinessNodeId_fkey` FOREIGN KEY (`BusinessNodeId`) REFERENCES `business_nodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_node_customers` ADD CONSTRAINT `business_node_customers_CustomerId_fkey` FOREIGN KEY (`CustomerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
