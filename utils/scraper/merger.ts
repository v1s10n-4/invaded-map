import invaders from "./fesse.json";
import locations from "./../../components/Map/utils/locations.json";

const newInvadersList = invaders.map(inv => {
  const found = locations.find(loc => inv.name === loc.name);
  const location = found ? {lat: found.lat, lng: found.lng} : null
  return ({
    ...inv,
    location
  })
})
const bytes = await Bun.write(
  "./fesse2.json",
  JSON.stringify(newInvadersList, null, 2)
);
console.log(`finished! 🔥 \nwrited ${bytes} bytes`);
