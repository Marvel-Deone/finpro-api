/*
  Warnings:

  - Added the required column `record` to the `ModuleTab` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `input_fields` on the `ModuleTab` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ModuleTab" ADD COLUMN     "record" JSONB NOT NULL,
DROP COLUMN "input_fields",
ADD COLUMN     "input_fields" JSONB NOT NULL;
