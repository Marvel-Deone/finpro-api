/*
  Warnings:

  - Added the required column `description` to the `Subsidiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industrial_sector` to the `Subsidiary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subsidiary" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "industrial_sector" TEXT NOT NULL;
