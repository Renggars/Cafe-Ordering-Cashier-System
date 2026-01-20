/*
  Warnings:

  - You are about to drop the column `orderNumber` on the `order` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Order_orderNumber_key` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `orderNumber`;
