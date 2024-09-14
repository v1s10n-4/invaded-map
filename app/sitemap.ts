import { MetadataRoute } from "next";
import { db } from "@/db";
import { invaders as invadersTable } from "@/db/schema/invaders";

const host = process.env.URL!;

const baseSitemap = [
  {
    url: `${host}`,
    lastModified: new Date(),
  },
  {
    url: `${host}/map`,
    lastModified: new Date(),
  },
  {
    url: `${host}/list`,
    lastModified: new Date(),
  },
  {
    url: `${host}/help`,
    lastModified: new Date(),
  },
  {
    url: `${host}/highscores`,
    lastModified: new Date(),
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const invaders = await db.select().from(invadersTable);
    return [
      ...invaders.map((invader) => ({
        url: `${host}/map/${invader.name}`,
        lastModified: new Date(),
      })),
    ];
  } catch (err) {
    console.error("error while generating sitemap", err);
    return baseSitemap;
  }
}
