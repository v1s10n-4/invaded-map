import scraperData from "@/utils/scraper/data.json";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const randomInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const storeImage = async (url: string, name) => {
  console.log(`getting ${name}`);
  const thumbnailFile = Bun.file(url);
  const thumbnailBlob = await fetch(thumbnailFile.name);
  if (thumbnailBlob.status === 404) {
    console.log(`Error 404 fetching ${url} :(`);
    return;
  } else if (thumbnailBlob.status !== 200)
    throw Error(`fesse! [${thumbnailBlob.status}] ${thumbnailBlob.statusText}`);
  const extension = thumbnailFile.name.split(".").reverse()[0];
  await Bun.write(`${name}.${extension}`, thumbnailBlob);
  await sleep(randomInRange(150, 250));
};

const resumeIndex = 0; // scraperData.findIndex((x) => x.name === "GNV_20");

for (const inv of scraperData.slice(resumeIndex)) {
  await storeImage(inv.thumbnail, inv.name);
  for (const i in inv.images) {
    await storeImage(inv.images[i].url, `${inv.name}-${i}`);
  }
}

console.log(`🔥 Awesome! We've crawled ${scraperData.length} images! 🔥`);
// $ bun x sharp-cli resize 900 --withoutEnlargement -i fesse/* -o q40/{name}.avif -f avif --chromaSubsampling 4:4:4 -q 35 --effort 6
