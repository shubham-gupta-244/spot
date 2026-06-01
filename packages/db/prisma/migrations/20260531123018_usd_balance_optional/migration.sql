-- AlterTable
ALTER TABLE "Market" ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "usdBalacne" SET DEFAULT 0;
