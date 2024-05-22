/*
  Warnings:

  - You are about to drop the column `lostItemId` on the `Claim` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Claim" DROP CONSTRAINT "Claim_lostItemId_fkey";

-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "lostItemId";
