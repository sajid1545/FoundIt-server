/*
  Warnings:

  - The `status` column on the `Claim` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FoundItemStatus" AS ENUM ('APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ClaimStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "status",
ADD COLUMN     "status" "ClaimStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "found_items" ADD COLUMN     "status" "FoundItemStatus" NOT NULL DEFAULT 'REJECTED';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "image" TEXT DEFAULT '';

-- DropEnum
DROP TYPE "Status";
