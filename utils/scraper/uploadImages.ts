// @ts-nocheck
import { db } from "@/db";
import { invaders } from "@/db/schema/invaders";
import { put } from "@vercel/blob";
import scraperData from "@/utils/scraper/data.json";
import { eq } from "drizzle-orm";
import path from "path";

const fs = require("fs");

const directoryPath = path.join(__dirname, "./q35");

fs.readdir(directoryPath, async (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const imageListByInvader = scraperData.reduce(
    (acc, inv) => ({
      ...acc,
      [inv.name]: files
        .filter((file) => file.startsWith(inv.name))
        .sort((a, b) => {
          const getSortValue = (filename) => {
            const match = filename.match(/-(\d+)\./);
            if (match) {
              return parseInt(match[1]);
            } else {
              return -1;
            }
          };

          return getSortValue(a) - getSortValue(b);
        }),
    }),
    {}
  );

  const uploadFile = async (file: string) => {
    const filePath = path.join(directoryPath, file);
    const data = fs.readFileSync(filePath);
    const { url } = await put(`invaders/${file}`, data, {
      access: "public",
    });
    console.log(`⬆️ 🌆 ✅ ${file}`);
    return url;
  };

  const assets = Object.entries(imageListByInvader).slice(1);

  let left = assets.length;
  for (const [name, [thumbnailFile, ...imagesFiles]] of assets) {
    console.log(`👾 ${name} (${left--} left)`);

    const [thumbnail, ...images] = await Promise.all(
      [thumbnailFile, ...imagesFiles].map(uploadFile)
    );

    const newInvader = {
      thumbnail,
      images: scraperData
        .find((inv) => inv.name === name)
        .images.map((x, i) => ({ ...x, url: images[i] })),
    };

    try {
      await db.update(invaders).set(newInvader).where(eq(invaders.name, name));
      console.log(`⬆️ 💾 ✅ ${name}`);
    } catch (error) {
      console.error(`⬆️ 💾 🚫 ${name}:`, error);
    }
  }
});
