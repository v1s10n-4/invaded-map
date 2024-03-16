import invaders from "./awaz.json";
import { parse } from "node-html-parser";
const rootUrl = "https://www.awazleon.space";

type Invader = (typeof invaders)[0];
const getImages = async (inv: Invader) => {
  console.log(`fetching ${inv.name}`);
  const res = await fetch("https://www.awazleon.space/A_buildmodal.php", {
    headers: {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": '"Not(A:Brand";v="24", "Chromium";v="122"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "PHPSESSID=ec1f069708d464a5e31f2ee2daae6567",
      "Referer": "https://www.awazleon.space/bySI.php",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `p_ref=${inv.name}&cityInv=${inv.cityName}`,
    method: "POST",
  });

  const body = await res.text();

  const root = parse(body);
  const elements = root.querySelectorAll(".carousel-item");
  const comment =
    root.querySelector(".d-flex .justify-content-center .mt-1")?.innerText ||
    null;
  const images = elements.map((el) => {
    return {
      url: rootUrl + el.querySelector("img")?.attrs.src,
      author: el.querySelector(".bottom-left")?.innerText.split(" ")[1],
    };
  });
  return {
    images,
    comment,
  };
};

// @ts-ignore
const newInvadersList = await Promise.all(
  invaders.map(async (i) => ({ ...i, ...(await getImages(i)) }))
);
console.log(newInvadersList);
// @ts-ignore
const bytes = await Bun.write(
  "./fesse.json",
  JSON.stringify(newInvadersList, null, 2)
);
console.log(`finished! 🔥 \nwrited ${bytes} bytes`);
