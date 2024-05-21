-- AlterTable
ALTER TABLE "Claim" ADD COLUMN     "lostItemId" TEXT;

-- AlterTable
ALTER TABLE "found_items" ADD COLUMN     "foundDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT DEFAULT '';

-- CreateTable
CREATE TABLE "lost_items" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "lostItemName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "lostDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lost_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lost_items" ADD CONSTRAINT "lost_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lost_items" ADD CONSTRAINT "lost_items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "found_item_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_lostItemId_fkey" FOREIGN KEY ("lostItemId") REFERENCES "lost_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
