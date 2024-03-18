import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
});
