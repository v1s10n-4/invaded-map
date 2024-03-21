// @ts-nocheck
import invaders from "./data.json";
import { parse } from "node-html-parser";

type Invader = (typeof invaders)[0];

const rootUrl = "https://www.awazleon.space";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const randomInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const getImages = async (inv: Invader) => {
  console.log(`fetching ${inv.name}`);
  const res = await fetch("https://www.awazleon.space/A_buildmodal.php", {
    headers: {
      "accept": "*/*",
      "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "pragma": "no-cache",
      "sec-ch-ua":
        '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "PHPSESSID=ae40a01cc1ad26216705c565bca50932",
      "Referer": "https://www.awazleon.space/bySI.php",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `p_ref=${inv.name}&cityInv=${inv.cityName}`,
    method: "POST",
  });

  if (res.status !== 200)
    throw Error(`fesse! [${res.status}] ${res.statusText}`);

  const body = await res.text();

  const root = parse(body);
  const elements = root.querySelectorAll(".carousel-item");
  const comment =
    root.querySelector(".d-flex .justify-content-center .mt-1")?.innerText ||
    null;
  const images = elements.map((el) => ({
    url: rootUrl + el.querySelector("img")?.attrs.src,
    author: el.querySelector(".bottom-left")?.innerText.split(" ")[1],
  }));
  return {
    images,
    comment,
  };
};

const newInvadersList = [];

for (let inv of invaders) {
  // @ts-ignore
  newInvadersList.push({ ...inv, ...(await getImages(inv)) });
  // @ts-ignore
  await sleep(randomInRange(150, 250));
}

console.log(newInvadersList);
// @ts-ignore
const bytes = await Bun.write(
  "./fesse.json",
  JSON.stringify(newInvadersList, null, 2)
);
console.log(`finished! 🔥 \nwrited ${bytes} bytes`);
