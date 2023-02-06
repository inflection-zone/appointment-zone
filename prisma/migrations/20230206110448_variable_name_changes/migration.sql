/*
  Warnings:

  - You are about to drop the column `business_node_id` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `is_cancellation_status` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed_status` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `is_confirmed_status` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `is_dashboard_status` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `is_walkin_entry_status` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `notification_text` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `send_notification` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `send_sms` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `sequence` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `sms_text` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `status_code` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `status_color` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `appointment_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `business_node_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `business_service_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `business_user_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `cancelled_on` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `completed_on` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `confirmed_on` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `coupon_code` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `display_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `fees` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `is_cancelled` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `is_confirmed` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `is_paid` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `is_rescheduled` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `rescheduled_appointment_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `rescheduled_on` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `status_code` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `tip` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `business_node_id` on the `business_node_customers` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `business_node_customers` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `business_node_customers` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `business_node_customers` table. All the data in the column will be lost.
  - You are about to drop the column `sms_consent` on the `business_node_customers` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `business_node_customers` table. All the data in the column will be lost.
  - You are about to drop the column `business_node_id` on the `business_node_hours` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `business_node_hours` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `business_node_hours` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `business_node_hours` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `business_node_hours` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `business_node_hours` table. All the data in the column will be lost.
  - You are about to drop the column `is_open` on the `business_node_hours` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `business_node_hours` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `business_node_hours` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `business_node_hours` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `business_node_hours` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `allow_future_booking_for` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `allow_walkin_appointments` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `business_id` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `display_picture` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `lattitude` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `overall_rating` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `time_zone` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `business_nodes` table. All the data in the column will be lost.
  - You are about to drop the column `allow_cancellation` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `business_node_id` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `cancellation_charges` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `cancellation_window` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `display_service_picture` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `enable_loyalty` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `fees` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `is_taxable` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `payment_percent` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `payment_required` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `prior_booking_window` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `reminder_type` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `reminder_window` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `send_reminder` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `service_duration` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `tax_rate` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `business_services` table. All the data in the column will be lost.
  - You are about to drop the column `business_node_id` on the `business_skills` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `business_skills` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `business_skills` table. All the data in the column will be lost.
  - You are about to drop the column `display_picture` on the `business_skills` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `business_skills` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `business_skills` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `business_skills` table. All the data in the column will be lost.
  - You are about to drop the column `business_user_id` on the `business_user_hours` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `business_user_hours` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `business_user_hours` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `business_user_hours` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `business_user_hours` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `business_user_hours` table. All the data in the column will be lost.
  - You are about to drop the column `is_open` on the `business_user_hours` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `business_user_hours` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `business_user_hours` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `business_user_hours` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `business_user_hours` table. All the data in the column will be lost.
  - You are about to drop the column `business_service_id` on the `business_user_services` table. All the data in the column will be lost.
  - You are about to drop the column `business_user_id` on the `business_user_services` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `business_user_services` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `business_user_services` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `business_user_services` table. All the data in the column will be lost.
  - You are about to drop the column `business_skill_id` on the `business_user_skills` table. All the data in the column will be lost.
  - You are about to drop the column `business_user_id` on the `business_user_skills` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `business_user_skills` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `business_user_skills` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `business_user_skills` table. All the data in the column will be lost.
  - You are about to drop the column `about_me` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `business_node_id` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `display_picture` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `is_available_for_emergency` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `overall_rating` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `prefix` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `qualification` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `yelp` on the `business_users` table. All the data in the column will be lost.
  - You are about to drop the column `about_us` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `api_key` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `display_picture` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `external_id` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `overall_rating` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `yelp` on the `businesses` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `business_node_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_on` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `is_read` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `is_sent` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `read_on` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `sent_on` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `appointment_id` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `business_node_id` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `completed_on` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `external_id` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `initiated_on` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `is_complete` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `business_node_id` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_on` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `error` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `is_sent` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `message_id` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `sent_on` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `user_messages` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user_messages` table. All the data in the column will be lost.
  - Added the required column `BusinessNodeId` to the `appointment_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `appointment_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `appointment_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessNodeId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessServiceId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessUserId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessNodeId` to the `business_node_customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `business_node_customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerId` to the `business_node_customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `business_node_customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessNodeId` to the `business_node_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `business_node_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Day` to the `business_node_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Type` to the `business_node_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `business_node_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessId` to the `business_nodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `business_nodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `business_nodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Mobile` to the `business_nodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `business_nodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `business_nodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessNodeId` to the `business_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `business_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `business_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `business_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessNodeId` to the `business_skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `business_skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `business_skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `business_skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessUserId` to the `business_user_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `business_user_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Day` to the `business_user_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Type` to the `business_user_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `business_user_hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessServiceId` to the `business_user_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessUserId` to the `business_user_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `business_user_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `business_user_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessSkillId` to the `business_user_skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessUserId` to the `business_user_skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `business_user_skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `business_user_skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessNodeId` to the `business_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `business_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FirstName` to the `business_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `business_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Mobile` to the `business_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Prefix` to the `business_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `business_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ApiKey` to the `businesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `businesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `businesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Mobile` to the `businesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `businesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `businesses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessNodeId` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerId` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TypeId` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessNodeId` to the `payment_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `payment_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerId` to the `payment_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `payment_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BusinessNodeId` to the `user_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `user_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerId` to the `user_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TypeId` to the `user_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `user_messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment_statuses` DROP COLUMN `business_node_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `is_active`,
    DROP COLUMN `is_cancellation_status`,
    DROP COLUMN `is_completed_status`,
    DROP COLUMN `is_confirmed_status`,
    DROP COLUMN `is_dashboard_status`,
    DROP COLUMN `is_walkin_entry_status`,
    DROP COLUMN `notification_text`,
    DROP COLUMN `send_notification`,
    DROP COLUMN `send_sms`,
    DROP COLUMN `sequence`,
    DROP COLUMN `sms_text`,
    DROP COLUMN `status`,
    DROP COLUMN `status_code`,
    DROP COLUMN `status_color`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `BusinessNodeId` CHAR(36) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `IsCancellationStatus` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `IsCompletedStatus` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `IsConfirmedStatus` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `IsDashboardStatus` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `IsWalkinEntryStatus` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `NotificationText` TEXT NULL,
    ADD COLUMN `SendNotification` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `SendSms` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Sequence` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `SmsText` TEXT NULL,
    ADD COLUMN `Status` VARCHAR(255) NULL DEFAULT '',
    ADD COLUMN `StatusCode` VARCHAR(255) NULL DEFAULT '',
    ADD COLUMN `StatusColor` VARCHAR(255) NULL DEFAULT '',
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `appointments` DROP COLUMN `business_node_id`,
    DROP COLUMN `business_service_id`,
    DROP COLUMN `business_user_id`,
    DROP COLUMN `cancelled_on`,
    DROP COLUMN `completed_on`,
    DROP COLUMN `confirmed_on`,
    DROP COLUMN `coupon_code`,
    DROP COLUMN `created_at`,
    DROP COLUMN `customer_id`,
    DROP COLUMN `discount`,
    DROP COLUMN `display_id`,
    DROP COLUMN `end_time`,
    DROP COLUMN `fees`,
    DROP COLUMN `is_active`,
    DROP COLUMN `is_cancelled`,
    DROP COLUMN `is_completed`,
    DROP COLUMN `is_confirmed`,
    DROP COLUMN `is_paid`,
    DROP COLUMN `is_rescheduled`,
    DROP COLUMN `note`,
    DROP COLUMN `rescheduled_appointment_id`,
    DROP COLUMN `rescheduled_on`,
    DROP COLUMN `start_time`,
    DROP COLUMN `status`,
    DROP COLUMN `status_code`,
    DROP COLUMN `tax`,
    DROP COLUMN `tip`,
    DROP COLUMN `total`,
    DROP COLUMN `transaction_id`,
    DROP COLUMN `type`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `BusinessNodeId` CHAR(36) NOT NULL,
    ADD COLUMN `BusinessServiceId` CHAR(36) NOT NULL,
    ADD COLUMN `BusinessUserId` CHAR(36) NOT NULL,
    ADD COLUMN `CancelledOn` DATETIME(0) NULL,
    ADD COLUMN `CompletedOn` DATETIME(0) NULL,
    ADD COLUMN `ConfirmedOn` DATETIME(0) NULL,
    ADD COLUMN `CouponCode` VARCHAR(255) NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `CustomerId` CHAR(36) NOT NULL,
    ADD COLUMN `Discount` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `DisplayId` VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN `EndTime` DATETIME(0) NULL,
    ADD COLUMN `Fees` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `IsCancelled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `IsCompleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `IsConfirmed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `IsPaid` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `IsRescheduled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `Note` TEXT NULL,
    ADD COLUMN `RescheduledAppointmentId` INTEGER NULL DEFAULT 1,
    ADD COLUMN `RescheduledOn` DATETIME(0) NULL,
    ADD COLUMN `StartTime` DATETIME(0) NULL,
    ADD COLUMN `Status` VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN `StatusCode` VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN `Tax` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `Tip` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `Total` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `TransactionId` CHAR(36) NULL,
    ADD COLUMN `Type` VARCHAR(255) NOT NULL DEFAULT 'IN-PERSON',
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `business_node_customers` DROP COLUMN `business_node_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `customer_id`,
    DROP COLUMN `is_active`,
    DROP COLUMN `sms_consent`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `BusinessNodeId` CHAR(36) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `CustomerId` CHAR(36) NOT NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `SmsConsent` VARCHAR(255) NOT NULL DEFAULT 'NOT_REPLIED',
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `business_node_hours` DROP COLUMN `business_node_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `date`,
    DROP COLUMN `day`,
    DROP COLUMN `end_time`,
    DROP COLUMN `is_active`,
    DROP COLUMN `is_open`,
    DROP COLUMN `message`,
    DROP COLUMN `start_time`,
    DROP COLUMN `type`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `BusinessNodeId` CHAR(36) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `Date` DATETIME(0) NULL,
    ADD COLUMN `Day` INTEGER NOT NULL,
    ADD COLUMN `EndTime` TIME(0) NOT NULL DEFAULT '21:00:00',
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `IsOpen` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Message` VARCHAR(255) NULL,
    ADD COLUMN `StartTime` TIME(0) NOT NULL DEFAULT '10:00:00',
    ADD COLUMN `Type` VARCHAR(255) NOT NULL,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `business_nodes` DROP COLUMN `address`,
    DROP COLUMN `allow_future_booking_for`,
    DROP COLUMN `allow_walkin_appointments`,
    DROP COLUMN `business_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `display_picture`,
    DROP COLUMN `email`,
    DROP COLUMN `is_active`,
    DROP COLUMN `lattitude`,
    DROP COLUMN `longitude`,
    DROP COLUMN `mobile`,
    DROP COLUMN `name`,
    DROP COLUMN `overall_rating`,
    DROP COLUMN `time_zone`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `Address` TEXT NULL,
    ADD COLUMN `AllowFutureBookingFor` VARCHAR(255) NOT NULL DEFAULT '30d',
    ADD COLUMN `AllowWalkinAppointments` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `BusinessId` CHAR(36) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `DisplayPicture` TEXT NULL,
    ADD COLUMN `Email` VARCHAR(255) NOT NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Lattitude` VARCHAR(255) NULL,
    ADD COLUMN `Longitude` VARCHAR(255) NULL,
    ADD COLUMN `Mobile` VARCHAR(255) NOT NULL,
    ADD COLUMN `Name` VARCHAR(255) NOT NULL,
    ADD COLUMN `OverallRating` FLOAT NULL,
    ADD COLUMN `TimeZone` VARCHAR(255) NOT NULL DEFAULT '+05:30',
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `business_services` DROP COLUMN `allow_cancellation`,
    DROP COLUMN `business_node_id`,
    DROP COLUMN `cancellation_charges`,
    DROP COLUMN `cancellation_window`,
    DROP COLUMN `created_at`,
    DROP COLUMN `description`,
    DROP COLUMN `display_service_picture`,
    DROP COLUMN `enable_loyalty`,
    DROP COLUMN `fees`,
    DROP COLUMN `is_active`,
    DROP COLUMN `is_taxable`,
    DROP COLUMN `name`,
    DROP COLUMN `payment_percent`,
    DROP COLUMN `payment_required`,
    DROP COLUMN `prior_booking_window`,
    DROP COLUMN `reminder_type`,
    DROP COLUMN `reminder_window`,
    DROP COLUMN `send_reminder`,
    DROP COLUMN `service_duration`,
    DROP COLUMN `tax_rate`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `AllowCancellation` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `BusinessNodeId` CHAR(36) NOT NULL,
    ADD COLUMN `CancellationCharges` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `CancellationWindow` VARCHAR(255) NOT NULL DEFAULT '1h',
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `Description` TEXT NULL,
    ADD COLUMN `DisplayServicePicture` TEXT NULL,
    ADD COLUMN `EnableLoyalty` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Fees` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `IsTaxable` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `Name` VARCHAR(255) NOT NULL,
    ADD COLUMN `PaymentPercent` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `PaymentRequired` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `PriorBookingWindow` VARCHAR(255) NOT NULL DEFAULT '1h',
    ADD COLUMN `ReminderType` VARCHAR(255) NULL,
    ADD COLUMN `ReminderWindow` VARCHAR(255) NULL,
    ADD COLUMN `SendReminder` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ServiceDuration` VARCHAR(255) NOT NULL DEFAULT '30m',
    ADD COLUMN `TaxRate` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `business_skills` DROP COLUMN `business_node_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `description`,
    DROP COLUMN `display_picture`,
    DROP COLUMN `is_active`,
    DROP COLUMN `name`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `BusinessNodeId` CHAR(36) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `Description` TEXT NULL,
    ADD COLUMN `DisplayPicture` TEXT NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Name` VARCHAR(255) NOT NULL,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `business_user_hours` DROP COLUMN `business_user_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `date`,
    DROP COLUMN `day`,
    DROP COLUMN `end_time`,
    DROP COLUMN `is_active`,
    DROP COLUMN `is_open`,
    DROP COLUMN `message`,
    DROP COLUMN `start_time`,
    DROP COLUMN `type`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `BusinessUserId` CHAR(36) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `Date` DATETIME(0) NULL,
    ADD COLUMN `Day` INTEGER NOT NULL,
    ADD COLUMN `EndTime` TIME(0) NOT NULL DEFAULT '21:00:00',
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `IsOpen` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Message` VARCHAR(255) NULL,
    ADD COLUMN `StartTime` TIME(0) NOT NULL DEFAULT '10:00:00',
    ADD COLUMN `Type` VARCHAR(255) NOT NULL,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `business_user_services` DROP COLUMN `business_service_id`,
    DROP COLUMN `business_user_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `is_active`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `BusinessServiceId` CHAR(36) NOT NULL,
    ADD COLUMN `BusinessUserId` CHAR(36) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `business_user_skills` DROP COLUMN `business_skill_id`,
    DROP COLUMN `business_user_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `is_active`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `BusinessSkillId` CHAR(36) NOT NULL,
    ADD COLUMN `BusinessUserId` CHAR(36) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `business_users` DROP COLUMN `about_me`,
    DROP COLUMN `business_node_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `display_picture`,
    DROP COLUMN `dob`,
    DROP COLUMN `email`,
    DROP COLUMN `experience`,
    DROP COLUMN `facebook`,
    DROP COLUMN `first_name`,
    DROP COLUMN `gender`,
    DROP COLUMN `instagram`,
    DROP COLUMN `is_active`,
    DROP COLUMN `is_available_for_emergency`,
    DROP COLUMN `last_name`,
    DROP COLUMN `linkedin`,
    DROP COLUMN `mobile`,
    DROP COLUMN `overall_rating`,
    DROP COLUMN `prefix`,
    DROP COLUMN `qualification`,
    DROP COLUMN `twitter`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `yelp`,
    ADD COLUMN `AboutMe` TEXT NULL,
    ADD COLUMN `BusinessNodeId` CHAR(36) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `DisplayPicture` TEXT NULL,
    ADD COLUMN `Dob` DATETIME(0) NULL,
    ADD COLUMN `Email` VARCHAR(255) NULL,
    ADD COLUMN `Experience` VARCHAR(255) NULL,
    ADD COLUMN `Facebook` VARCHAR(255) NULL,
    ADD COLUMN `FirstName` VARCHAR(255) NOT NULL,
    ADD COLUMN `Gender` VARCHAR(255) NULL,
    ADD COLUMN `Instagram` VARCHAR(255) NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `IsAvailableForEmergency` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `LastName` VARCHAR(255) NOT NULL,
    ADD COLUMN `Linkedin` VARCHAR(255) NULL,
    ADD COLUMN `Mobile` VARCHAR(255) NOT NULL,
    ADD COLUMN `OverallRating` FLOAT NULL,
    ADD COLUMN `Prefix` VARCHAR(255) NOT NULL,
    ADD COLUMN `Qualification` TEXT NULL,
    ADD COLUMN `Twitter` VARCHAR(255) NULL,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `Yelp` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `businesses` DROP COLUMN `about_us`,
    DROP COLUMN `address`,
    DROP COLUMN `api_key`,
    DROP COLUMN `created_at`,
    DROP COLUMN `display_picture`,
    DROP COLUMN `email`,
    DROP COLUMN `external_id`,
    DROP COLUMN `facebook`,
    DROP COLUMN `instagram`,
    DROP COLUMN `is_active`,
    DROP COLUMN `linkedin`,
    DROP COLUMN `logo`,
    DROP COLUMN `mobile`,
    DROP COLUMN `name`,
    DROP COLUMN `overall_rating`,
    DROP COLUMN `twitter`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `yelp`,
    ADD COLUMN `AboutUs` TEXT NULL,
    ADD COLUMN `Address` TEXT NULL,
    ADD COLUMN `ApiKey` VARCHAR(255) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `DisplayPicture` TEXT NULL,
    ADD COLUMN `Email` VARCHAR(255) NOT NULL,
    ADD COLUMN `ExternalId` VARCHAR(255) NULL,
    ADD COLUMN `Facebook` VARCHAR(255) NULL,
    ADD COLUMN `Instagram` VARCHAR(255) NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Linkedin` VARCHAR(255) NULL,
    ADD COLUMN `Logo` TEXT NULL,
    ADD COLUMN `Mobile` VARCHAR(255) NOT NULL,
    ADD COLUMN `Name` VARCHAR(255) NOT NULL,
    ADD COLUMN `OverallRating` FLOAT NULL,
    ADD COLUMN `Twitter` VARCHAR(255) NULL,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `Yelp` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `body`,
    DROP COLUMN `business_node_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `customer_id`,
    DROP COLUMN `deleted_on`,
    DROP COLUMN `is_active`,
    DROP COLUMN `is_deleted`,
    DROP COLUMN `is_read`,
    DROP COLUMN `is_sent`,
    DROP COLUMN `message`,
    DROP COLUMN `read_on`,
    DROP COLUMN `sent_on`,
    DROP COLUMN `title`,
    DROP COLUMN `type`,
    DROP COLUMN `type_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `Body` TEXT NULL,
    ADD COLUMN `BusinessNodeId` CHAR(36) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `CustomerId` CHAR(36) NOT NULL,
    ADD COLUMN `DeletedOn` DATETIME(0) NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `IsRead` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `IsSent` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Message` TEXT NULL,
    ADD COLUMN `ReadOn` DATETIME(0) NULL,
    ADD COLUMN `SentOn` DATETIME(0) NULL,
    ADD COLUMN `Title` VARCHAR(255) NULL DEFAULT '',
    ADD COLUMN `Type` VARCHAR(255) NULL DEFAULT '',
    ADD COLUMN `TypeId` INTEGER NOT NULL,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `payment_transactions` DROP COLUMN `appointment_id`,
    DROP COLUMN `business_node_id`,
    DROP COLUMN `completed_on`,
    DROP COLUMN `created_at`,
    DROP COLUMN `currency`,
    DROP COLUMN `customer_id`,
    DROP COLUMN `external_id`,
    DROP COLUMN `initiated_on`,
    DROP COLUMN `is_active`,
    DROP COLUMN `is_complete`,
    DROP COLUMN `status`,
    DROP COLUMN `total_amount`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `AppointmentId` CHAR(36) NULL,
    ADD COLUMN `BusinessNodeId` CHAR(36) NOT NULL,
    ADD COLUMN `CompletedOn` DATETIME(0) NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `Currency` VARCHAR(255) NULL DEFAULT '',
    ADD COLUMN `CustomerId` CHAR(36) NOT NULL,
    ADD COLUMN `ExternalId` VARCHAR(255) NULL,
    ADD COLUMN `InitiatedOn` DATETIME(0) NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `IsComplete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `Status` VARCHAR(255) NULL DEFAULT '',
    ADD COLUMN `TotalAmount` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `user_messages` DROP COLUMN `body`,
    DROP COLUMN `business_node_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `customer_id`,
    DROP COLUMN `deleted_on`,
    DROP COLUMN `error`,
    DROP COLUMN `is_active`,
    DROP COLUMN `is_deleted`,
    DROP COLUMN `is_sent`,
    DROP COLUMN `message_id`,
    DROP COLUMN `sent_on`,
    DROP COLUMN `type`,
    DROP COLUMN `type_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `Body` TEXT NULL,
    ADD COLUMN `BusinessNodeId` CHAR(36) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(0) NOT NULL,
    ADD COLUMN `CustomerId` CHAR(36) NOT NULL,
    ADD COLUMN `DeletedOn` DATETIME(0) NULL,
    ADD COLUMN `Error` TEXT NULL,
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `IsSent` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `MessageId` VARCHAR(255) NULL,
    ADD COLUMN `SentOn` DATETIME(0) NULL,
    ADD COLUMN `Type` VARCHAR(255) NULL DEFAULT '',
    ADD COLUMN `TypeId` INTEGER NOT NULL,
    ADD COLUMN `UpdatedAt` DATETIME(0) NOT NULL;
