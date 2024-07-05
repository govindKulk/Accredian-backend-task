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
