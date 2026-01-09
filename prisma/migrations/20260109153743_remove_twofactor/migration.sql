/*
  Warnings:

  - You are about to drop the column `otpCode` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `otpExpiresAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `twoFactorEnabled` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "otpCode",
DROP COLUMN "otpExpiresAt",
DROP COLUMN "twoFactorEnabled";
