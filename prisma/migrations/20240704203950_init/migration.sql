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
