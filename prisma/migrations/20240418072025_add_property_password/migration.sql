/*
  Warnings:

  - Added the required column `password` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin', 'guest');

-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
