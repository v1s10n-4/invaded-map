import { customType } from "drizzle-orm/pg-core";

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
  // @ts-ignore TODO fix this
  fromDriver(point: { x: number; y: number }) {
    return { lat: point.x, lng: point.y };
  },
});
