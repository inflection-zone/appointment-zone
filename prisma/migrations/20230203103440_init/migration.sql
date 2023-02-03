-- CreateTable
CREATE TABLE `appointment_statuses` (
    `id` CHAR(36) NOT NULL,
    `business_node_id` CHAR(36) NOT NULL,
    `status` VARCHAR(255) NULL DEFAULT '',
    `status_code` VARCHAR(255) NULL DEFAULT '',
    `status_color` VARCHAR(255) NULL DEFAULT '',
    `sequence` INTEGER NOT NULL DEFAULT 0,
    `send_notification` BOOLEAN NOT NULL DEFAULT true,
    `notification_text` TEXT NULL,
    `send_sms` BOOLEAN NOT NULL DEFAULT true,
    `sms_text` TEXT NULL,
    `is_dashboard_status` BOOLEAN NOT NULL DEFAULT true,
    `is_completed_status` BOOLEAN NOT NULL DEFAULT false,
    `is_confirmed_status` BOOLEAN NOT NULL DEFAULT false,
    `is_cancellation_status` BOOLEAN NOT NULL DEFAULT false,
    `is_walkin_entry_status` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` CHAR(36) NOT NULL,
    `display_id` VARCHAR(255) NOT NULL DEFAULT '',
    `business_node_id` CHAR(36) NOT NULL,
    `customer_id` CHAR(36) NOT NULL,
    `business_user_id` CHAR(36) NOT NULL,
    `business_service_id` CHAR(36) NOT NULL,
    `type` VARCHAR(255) NOT NULL DEFAULT 'IN-PERSON',
    `note` TEXT NULL,
    `start_time` DATETIME(0) NULL,
    `end_time` DATETIME(0) NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT '',
    `status_code` VARCHAR(255) NOT NULL DEFAULT '',
    `fees` FLOAT NOT NULL DEFAULT 0,
    `tax` FLOAT NOT NULL DEFAULT 0,
    `tip` FLOAT NOT NULL DEFAULT 0,
    `discount` FLOAT NOT NULL DEFAULT 0,
    `coupon_code` VARCHAR(255) NULL,
    `total` FLOAT NOT NULL DEFAULT 0,
    `is_paid` BOOLEAN NOT NULL DEFAULT false,
    `transaction_id` CHAR(36) NULL,
    `is_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `confirmed_on` DATETIME(0) NULL,
    `is_cancelled` BOOLEAN NOT NULL DEFAULT false,
    `cancelled_on` DATETIME(0) NULL,
    `is_completed` BOOLEAN NOT NULL DEFAULT false,
    `completed_on` DATETIME(0) NULL,
    `is_rescheduled` BOOLEAN NOT NULL DEFAULT false,
    `rescheduled_on` DATETIME(0) NULL,
    `rescheduled_appointment_id` INTEGER NULL DEFAULT 1,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_node_customers` (
    `id` CHAR(36) NOT NULL,
    `business_node_id` CHAR(36) NOT NULL,
    `customer_id` CHAR(36) NOT NULL,
    `sms_consent` VARCHAR(255) NOT NULL DEFAULT 'NOT_REPLIED',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_node_hours` (
    `id` CHAR(36) NOT NULL,
    `business_node_id` CHAR(36) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `day` INTEGER NOT NULL,
    `date` DATETIME(0) NULL,
    `is_open` BOOLEAN NOT NULL DEFAULT true,
    `message` VARCHAR(255) NULL,
    `start_time` TIME(0) NOT NULL DEFAULT '10:00:00',
    `end_time` TIME(0) NOT NULL DEFAULT '21:00:00',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_nodes` (
    `id` CHAR(36) NOT NULL,
    `business_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `mobile` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `display_picture` TEXT NULL,
    `address` TEXT NULL,
    `longitude` VARCHAR(255) NULL,
    `lattitude` VARCHAR(255) NULL,
    `overall_rating` FLOAT NULL,
    `time_zone` VARCHAR(255) NOT NULL DEFAULT '+05:30',
    `allow_walkin_appointments` BOOLEAN NOT NULL DEFAULT true,
    `allow_future_booking_for` VARCHAR(255) NOT NULL DEFAULT '30d',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_services` (
    `id` CHAR(36) NOT NULL,
    `business_node_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `service_duration` VARCHAR(255) NOT NULL DEFAULT '30m',
    `fees` FLOAT NOT NULL DEFAULT 0,
    `is_taxable` BOOLEAN NOT NULL DEFAULT false,
    `tax_rate` FLOAT NOT NULL DEFAULT 0,
    `payment_required` BOOLEAN NOT NULL DEFAULT false,
    `payment_percent` FLOAT NOT NULL DEFAULT 0,
    `prior_booking_window` VARCHAR(255) NOT NULL DEFAULT '1h',
    `send_reminder` BOOLEAN NOT NULL DEFAULT false,
    `reminder_window` VARCHAR(255) NULL,
    `reminder_type` VARCHAR(255) NULL,
    `allow_cancellation` BOOLEAN NOT NULL DEFAULT false,
    `cancellation_window` VARCHAR(255) NOT NULL DEFAULT '1h',
    `cancellation_charges` FLOAT NOT NULL DEFAULT 0,
    `enable_loyalty` BOOLEAN NOT NULL DEFAULT true,
    `display_service_picture` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_skills` (
    `id` CHAR(36) NOT NULL,
    `business_node_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `display_picture` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_user_hours` (
    `id` CHAR(36) NOT NULL,
    `business_user_id` CHAR(36) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `day` INTEGER NOT NULL,
    `date` DATETIME(0) NULL,
    `is_open` BOOLEAN NOT NULL DEFAULT true,
    `message` VARCHAR(255) NULL,
    `start_time` TIME(0) NOT NULL DEFAULT '10:00:00',
    `end_time` TIME(0) NOT NULL DEFAULT '21:00:00',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_user_services` (
    `id` CHAR(36) NOT NULL,
    `business_user_id` CHAR(36) NOT NULL,
    `business_service_id` CHAR(36) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_user_skills` (
    `id` CHAR(36) NOT NULL,
    `business_user_id` CHAR(36) NOT NULL,
    `business_skill_id` CHAR(36) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_users` (
    `id` CHAR(36) NOT NULL,
    `business_node_id` CHAR(36) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `prefix` VARCHAR(255) NOT NULL,
    `mobile` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `display_picture` TEXT NULL,
    `about_me` TEXT NULL,
    `qualification` TEXT NULL,
    `experience` VARCHAR(255) NULL,
    `overall_rating` FLOAT NULL,
    `dob` DATETIME(0) NULL,
    `gender` VARCHAR(255) NULL,
    `is_available_for_emergency` BOOLEAN NULL DEFAULT true,
    `facebook` VARCHAR(255) NULL,
    `linkedin` VARCHAR(255) NULL,
    `twitter` VARCHAR(255) NULL,
    `instagram` VARCHAR(255) NULL,
    `yelp` VARCHAR(255) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `businesses` (
    `id` CHAR(36) NOT NULL,
    `external_id` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `mobile` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `about_us` TEXT NULL,
    `logo` TEXT NULL,
    `display_picture` TEXT NULL,
    `overall_rating` FLOAT NULL,
    `address` TEXT NULL,
    `api_key` VARCHAR(255) NOT NULL,
    `facebook` VARCHAR(255) NULL,
    `linkedin` VARCHAR(255) NULL,
    `twitter` VARCHAR(255) NULL,
    `instagram` VARCHAR(255) NULL,
    `yelp` VARCHAR(255) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` CHAR(36) NOT NULL,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `prefix` VARCHAR(255) NULL,
    `mobile` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `dob` DATETIME(0) NULL,
    `gender` VARCHAR(255) NULL,
    `display_picture` TEXT NULL,
    `address` TEXT NULL,
    `in_app_user` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` CHAR(36) NOT NULL,
    `business_node_id` CHAR(36) NOT NULL,
    `customer_id` CHAR(36) NOT NULL,
    `title` VARCHAR(255) NULL DEFAULT '',
    `body` TEXT NULL,
    `type` VARCHAR(255) NULL DEFAULT '',
    `type_id` INTEGER NOT NULL,
    `message` TEXT NULL,
    `is_sent` BOOLEAN NOT NULL DEFAULT true,
    `sent_on` DATETIME(0) NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `read_on` DATETIME(0) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `deleted_on` DATETIME(0) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_transactions` (
    `id` CHAR(36) NOT NULL,
    `appointment_id` CHAR(36) NULL,
    `business_node_id` CHAR(36) NOT NULL,
    `customer_id` CHAR(36) NOT NULL,
    `external_id` VARCHAR(255) NULL,
    `total_amount` FLOAT NOT NULL DEFAULT 0,
    `currency` VARCHAR(255) NULL DEFAULT '',
    `status` VARCHAR(255) NULL DEFAULT '',
    `is_complete` BOOLEAN NOT NULL DEFAULT false,
    `initiated_on` DATETIME(0) NULL,
    `completed_on` DATETIME(0) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_messages` (
    `id` CHAR(36) NOT NULL,
    `business_node_id` CHAR(36) NOT NULL,
    `customer_id` CHAR(36) NOT NULL,
    `body` TEXT NULL,
    `type` VARCHAR(255) NULL DEFAULT '',
    `type_id` INTEGER NOT NULL,
    `message_id` VARCHAR(255) NULL,
    `error` TEXT NULL,
    `is_sent` BOOLEAN NOT NULL DEFAULT true,
    `sent_on` DATETIME(0) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `deleted_on` DATETIME(0) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
