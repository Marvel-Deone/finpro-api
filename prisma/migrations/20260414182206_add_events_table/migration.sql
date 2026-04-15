-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "event_datetime" TIMESTAMP(3) NOT NULL,
    "location_type" TEXT NOT NULL,
    "address" TEXT,
    "google_meet_link" TEXT,
    "subsidiaryCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_subsidiaryCategoryId_fkey" FOREIGN KEY ("subsidiaryCategoryId") REFERENCES "SubsidiaryCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
