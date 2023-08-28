/*
  Warnings:

  - Added the required column `userId` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "resumes" ADD COLUMN     "profileId" UUID;

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
