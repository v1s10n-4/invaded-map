import {
  date,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
  customType,
} from "drizzle-orm/pg-core";

// Define a custom type for the point data type
const location = customType<{
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

export const invaders = pgTable("invader", {
  id: serial("id").primaryKey(),
  url: text("url"),
  name: varchar("name", { length: 8 }),
  points: smallint("points"),
  lastUpdate: timestamp("lastUpdate"),
  city: text("city"),
  state: text("state"),
  location: location("location"),
});
