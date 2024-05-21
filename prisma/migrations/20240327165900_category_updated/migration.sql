/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `found_item_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "found_item_categories_name_key" ON "found_item_categories"("name");
