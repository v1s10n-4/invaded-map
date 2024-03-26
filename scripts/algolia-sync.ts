import { getInvaders, getState } from "@/utils/data";
import { ObjectWithObjectID } from "@algolia/client-search";
import algoliasearch from "algoliasearch";

if (process.env.LOCAL === "true") {
  console.warn("you're trying to update algolia data with local db data...");
  process.exit(1);
}
const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  "0287ad07d49e83fb11f554a7e10469b3"
);
const index = algoliaClient.initIndex("invaders");

const list = await getInvaders().catch((error) => {
  console.error("Error getting records from api:", error);
  process.exit(1);
});

if (!list.length) {
  console.error("there's no items return from api...");
  process.exit(1);
}

let backupData: ObjectWithObjectID[] = [];
await index.browseObjects({
  batch: (b) => {
    backupData = backupData.concat(b);
  },
});

Bun.write(
  `algoliasearch_backup-${new Date().toLocaleString().replace(/(\ |,|\/)/g, "-")}.json`,
  JSON.stringify(backupData)
);

const newData = list.map(
  ({ images, state, create_date, location, ...rest }) => ({
    ...rest,
    state: getState(state),
    create_date: create_date.getTime(),
    location: Boolean(location),
    // @ts-ignore
    objectID: backupData.find((hit) => hit.name === rest.name)?.objectID,
  })
);

await index.clearObjects().catch((err) => {
  console.error("there was an error while deleting old data...", err);
  process.exit(0);
});

const res = await index
  .saveObjects(newData, { autoGenerateObjectIDIfNotExist: true })
  .catch((error) => {
    console.error("Error updating records in Algolia:", error);
    process.exit(0);
  });

console.log(`${res.objectIDs.length} object saved`);
process.exit(0);
