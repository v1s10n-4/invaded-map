import { db } from "@/db";
import { invaders } from "@/db/schema/invaders";
import { eq } from "drizzle-orm";

const name = "NY_103";
const location = { lng: -73.963079, lat: 40.711305 };
const res = await db
  .update(invaders)
  .set({ location })
  .where(eq(invaders.name, name));

if (res.rowCount)
  console.log(
    `successfully updated ${name} (${location.lng}, ${location.lat})!`
  );
process.exit(0);
