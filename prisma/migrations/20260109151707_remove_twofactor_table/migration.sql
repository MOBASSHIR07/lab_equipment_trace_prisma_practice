/*
  Warnings:

  - You are about to drop the `TwoFactor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TwoFactor" DROP CONSTRAINT "TwoFactor_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "otpCode" TEXT,
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "TwoFactor";
