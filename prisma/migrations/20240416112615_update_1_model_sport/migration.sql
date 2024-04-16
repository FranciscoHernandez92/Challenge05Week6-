/*
  Warnings:

  - Added the required column `updateAd` to the `Sport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sport" ADD COLUMN     "createAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAd" TIMESTAMP(3) NOT NULL;
