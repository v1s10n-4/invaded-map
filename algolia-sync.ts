import { db } from "@/db";
import { invaders } from "@/db/schema/invaders";
import { getState } from "@/utils/data";
import algoliasearch from "algoliasearch";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);
const index = algoliaClient.initIndex("invaders");

const list = await db
  .select()
  .from(invaders)
  .catch((error) => {
    console.error("Error getting records from db:", error);
    process.exit(0);
  });

if (!list.length) {
  console.error("there's no items return form db...");
  process.exit(0);
}

const newData = list.map((inv) => ({ ...inv, state: getState(inv.state) }));

const res = await index.saveObjects(newData).catch((error) => {
  console.error("Error updating records in Algolia:", error);
  process.exit(0);
});

console.log(`${res.objectIDs.length} object saved`);
