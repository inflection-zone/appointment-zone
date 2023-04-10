-- AlterTable
ALTER TABLE `business_user_hours` MODIFY `EndTime` VARCHAR(191) NOT NULL DEFAULT '21:00:00',
    MODIFY `StartTime` VARCHAR(191) NOT NULL DEFAULT '10:00:00';

-- AddForeignKey
ALTER TABLE `business_skills` ADD CONSTRAINT `business_skills_BusinessNodeId_fkey` FOREIGN KEY (`BusinessNodeId`) REFERENCES `business_nodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_user_skills` ADD CONSTRAINT `business_user_skills_BusinessSkillId_fkey` FOREIGN KEY (`BusinessSkillId`) REFERENCES `business_skills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_user_skills` ADD CONSTRAINT `business_user_skills_BusinessUserId_fkey` FOREIGN KEY (`BusinessUserId`) REFERENCES `business_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
