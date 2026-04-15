/*
  Warnings:

  - You are about to drop the column `record` on the `ModuleTab` table. All the data in the column will be lost.
  - Added the required column `records` to the `ModuleTab` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModuleTab" DROP COLUMN "record",
ADD COLUMN     "records" JSONB NOT NULL;
