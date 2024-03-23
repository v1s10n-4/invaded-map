import { getInvaders } from "@/utils/data";
import { MetadataRoute } from "next";

const host = process.env.URL!;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const invaders = await getInvaders();
  return [
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
    ...invaders.map((invader) => ({
      url: `${host}/map/${invader.name}`,
      lastModified: new Date(),
    })),
  ];
}
