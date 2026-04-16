-- CreateTable
CREATE TABLE "ExpenseIncome" (
    "id" TEXT NOT NULL,
    "record_type" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "narrative" DOUBLE PRECISION NOT NULL,
    "principal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subsidiaryCategoryId" TEXT NOT NULL,

    CONSTRAINT "ExpenseIncome_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpenseIncome" ADD CONSTRAINT "ExpenseIncome_subsidiaryCategoryId_fkey" FOREIGN KEY ("subsidiaryCategoryId") REFERENCES "SubsidiaryCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
