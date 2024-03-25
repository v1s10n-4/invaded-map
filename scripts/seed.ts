import { db, Invader } from "@/db";
import { invaders } from "@/db/schema/invaders";
import seed from "@/utils/seed.json";

if (process.env.LOCAL !== "true") {
  console.error("you're trying to seed the production database...");
  process.exit(1);
}

const newValues = seed.map((inv) => ({
  ...inv,
  create_date: new Date(inv.create_date),
  thumbnail: `https://picsum.photos/seed/${inv.name}/600/600`,
  images: [
    {
      url: `https://picsum.photos/seed/${inv.name}-0/600/600`,
      author: "fesse",
    },
  ],
})) as Invader[];

const res = await db.insert(invaders).values(newValues);
if (res.rowCount) console.log(`successfully updated ${seed.length} invaders!`);
else console.log("something strange happened", res);
process.exit(0);
