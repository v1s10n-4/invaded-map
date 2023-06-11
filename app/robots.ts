import { MetadataRoute } from "next";

const host =
  process.env.VERCEL_URL ?? process.env.URL ?? "http://localhost:3000";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
