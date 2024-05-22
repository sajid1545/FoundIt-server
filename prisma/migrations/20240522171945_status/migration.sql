/*
  Warnings:

  - The `status` column on the `found_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "found_items" DROP COLUMN "status",
ADD COLUMN     "status" "ClaimStatus" NOT NULL DEFAULT 'PENDING';
