import "@/db/envConfig";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: true,
});
