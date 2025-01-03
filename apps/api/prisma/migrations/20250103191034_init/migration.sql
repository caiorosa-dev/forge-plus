-- CreateTable
CREATE TABLE "Modpack" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://placehold.jp/4f46e5/ffffff/150x150.png',
    "description" TEXT NOT NULL DEFAULT '',
    "modCount" INTEGER NOT NULL DEFAULT 0,
    "minecraftVersion" TEXT NOT NULL,
    "forgeVersion" TEXT NOT NULL,
    "currentVersionTag" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Modpack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModpackVersion" (
    "id" TEXT NOT NULL,
    "modpackId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "files" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModpackVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModpackVersion_modpackId_tag_key" ON "ModpackVersion"("modpackId", "tag");

-- AddForeignKey
ALTER TABLE "ModpackVersion" ADD CONSTRAINT "ModpackVersion_modpackId_fkey" FOREIGN KEY ("modpackId") REFERENCES "Modpack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
