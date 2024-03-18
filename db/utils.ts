// Define a custom type for the point data type
import { customType, pgEnum } from "drizzle-orm/pg-core";

export type Image = {
  url: string;
  author: string;
};

export const location = customType<{
  data: { lat: number; lng: number };
  driverData: string;
}>({
  dataType() {
    return "point";
  },
  toDriver(value) {
    return `(${value.lat},${value.lng})`;
  },
  fromDriver(value: string) {
    const [lat, lng] = value.slice(1, -1).split(",");
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  },
});

// {
//   "A": "Actifs",
//   "DG": "Dégradés",
//   "H": "Non visibles",
//   "D": "Détruits",
//   "DD": "Def. détruits",
//   "U": "Inconnu"
// }
