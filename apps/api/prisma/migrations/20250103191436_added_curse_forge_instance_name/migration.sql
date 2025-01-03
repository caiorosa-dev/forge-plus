/*
  Warnings:

  - Added the required column `curseForgeInstanceName` to the `Modpack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Modpack" ADD COLUMN     "curseForgeInstanceName" TEXT NOT NULL;
