/*
  Warnings:

  - You are about to drop the `discount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servicecharge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tax` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `discount`;

-- DropTable
DROP TABLE `servicecharge`;

-- DropTable
DROP TABLE `tax`;

-- CreateTable
CREATE TABLE `GlobalSetting` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `taxPercentage` DOUBLE NOT NULL DEFAULT 0,
    `isTaxActive` BOOLEAN NOT NULL DEFAULT false,
    `servicePercentage` DOUBLE NOT NULL DEFAULT 0,
    `isServiceActive` BOOLEAN NOT NULL DEFAULT false,
    `discountPercentage` DOUBLE NOT NULL DEFAULT 0,
    `isDiscountActive` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
