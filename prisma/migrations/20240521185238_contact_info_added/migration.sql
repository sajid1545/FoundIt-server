-- AlterTable
ALTER TABLE "found_items" ADD COLUMN     "email" TEXT DEFAULT '',
ADD COLUMN     "name" TEXT DEFAULT '',
ADD COLUMN     "phone" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "lost_items" ADD COLUMN     "email" TEXT DEFAULT '',
ADD COLUMN     "name" TEXT DEFAULT '',
ADD COLUMN     "phone" TEXT DEFAULT '';
