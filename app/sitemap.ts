import { MetadataRoute } from "next";
import invaders from "@/invaders.json";

const host = process.env.URL!;
export default function sitemap(): MetadataRoute.Sitemap {
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
      url: `${host}/highscores`,
      lastModified: new Date(),
    },
    ...invaders.map((invader) => ({
      url: `${host}/map/${invader.name}`,
      lastModified: new Date(),
    })),
  ];
}
