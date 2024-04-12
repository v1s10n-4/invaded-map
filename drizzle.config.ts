import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
  verbose: true,
});
