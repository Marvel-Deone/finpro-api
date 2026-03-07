-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('business', 'personal');

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "Personnel" (
    "id" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "Personnel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonnelSubsidiary" (
    "personnelId" TEXT NOT NULL,
    "subsidiaryId" TEXT NOT NULL,

    CONSTRAINT "PersonnelSubsidiary_pkey" PRIMARY KEY ("personnelId","subsidiaryId")
);

-- CreateTable
CREATE TABLE "Subsidiary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subsidiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubsidiaryCategory" (
    "id" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL,
    "seat_throughput" TEXT,
    "project_inflow" TEXT,
    "inventory" TEXT,
    "monthly_dept" TEXT,
    "net_capital" TEXT,
    "compliance_audit" TEXT,
    "asset" INTEGER,
    "subsidiaryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubsidiaryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "session_name" TEXT NOT NULL,
    "total_candidates" INTEGER NOT NULL,
    "document_proof" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'JAMB',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subsidiaryCategoryId" TEXT NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "asset_identity" TEXT NOT NULL,
    "operational_narrative" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "purchase_value" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "asset_proof" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subsidiaryCategoryId" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,
    "ledger_identity" TEXT NOT NULL,
    "operational_narrative" TEXT NOT NULL,
    "principal" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "liability_proof" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subsidiaryCategoryId" TEXT NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subsidiaryCategoryId" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Personnel_identity_key" ON "Personnel"("identity");

-- CreateIndex
CREATE UNIQUE INDEX "SubsidiaryCategory_subsidiaryId_type_key" ON "SubsidiaryCategory"("subsidiaryId", "type");

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonnelSubsidiary" ADD CONSTRAINT "PersonnelSubsidiary_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonnelSubsidiary" ADD CONSTRAINT "PersonnelSubsidiary_subsidiaryId_fkey" FOREIGN KEY ("subsidiaryId") REFERENCES "Subsidiary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubsidiaryCategory" ADD CONSTRAINT "SubsidiaryCategory_subsidiaryId_fkey" FOREIGN KEY ("subsidiaryId") REFERENCES "Subsidiary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_subsidiaryCategoryId_fkey" FOREIGN KEY ("subsidiaryCategoryId") REFERENCES "SubsidiaryCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_subsidiaryCategoryId_fkey" FOREIGN KEY ("subsidiaryCategoryId") REFERENCES "SubsidiaryCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_subsidiaryCategoryId_fkey" FOREIGN KEY ("subsidiaryCategoryId") REFERENCES "SubsidiaryCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_subsidiaryCategoryId_fkey" FOREIGN KEY ("subsidiaryCategoryId") REFERENCES "SubsidiaryCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
