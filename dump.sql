-- CreateTable
CREATE TABLE `Referral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refererEmail` VARCHAR(255) NOT NULL,
    `refererName` VARCHAR(255) NOT NULL,
    `refereeEmail` VARCHAR(255) NOT NULL,
    `message` VARCHAR(255) NULL,

    UNIQUE INDEX `Referral_refererEmail_key`(`refererEmail`),
    UNIQUE INDEX `Referral_refereeEmail_key`(`refereeEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
/*
  Warnings:

  - A unique constraint covering the columns `[refererEmail,refereeEmail]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Referral_refereeEmail_key` ON `Referral`;

-- DropIndex
DROP INDEX `Referral_refererEmail_key` ON `Referral`;

-- CreateIndex
CREATE UNIQUE INDEX `Referral_refererEmail_refereeEmail_key` ON `Referral`(`refererEmail`, `refereeEmail`);
