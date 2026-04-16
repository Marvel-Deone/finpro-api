-- AlterTable
ALTER TABLE "History" ADD COLUMN     "subsidiaryId" TEXT,
ALTER COLUMN "subsidiaryCategoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_subsidiaryId_fkey" FOREIGN KEY ("subsidiaryId") REFERENCES "Subsidiary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
