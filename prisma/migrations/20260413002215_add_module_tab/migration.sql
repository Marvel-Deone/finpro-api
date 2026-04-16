-- CreateTable
CREATE TABLE "ModuleTab" (
    "id" TEXT NOT NULL,
    "module_name" TEXT NOT NULL,
    "module_desc" TEXT NOT NULL,
    "no_input" INTEGER NOT NULL,
    "input_fields" TEXT[],
    "btn_text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subsidiaryId" TEXT NOT NULL,

    CONSTRAINT "ModuleTab_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModuleTab_module_name_key" ON "ModuleTab"("module_name");

-- AddForeignKey
ALTER TABLE "ModuleTab" ADD CONSTRAINT "ModuleTab_subsidiaryId_fkey" FOREIGN KEY ("subsidiaryId") REFERENCES "Subsidiary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
