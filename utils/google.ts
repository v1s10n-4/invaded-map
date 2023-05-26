export const Paris: google.maps.LatLngLiteral = {
  lat: 48.861071,
  lng: 2.350494,
};
export const baseGoogleStaticMapUrl =
  "https://maps.googleapis.com/maps/api/staticmap";
export const gmapUrlParams = {
  size: "1200x1200",
  scale: "2",
  zoom: "12",
  center: `${Paris.lat},${Paris.lng}`,
  key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
};

export function getStaticMapStyle(styles: google.maps.MapTypeStyle[]) {
  const result: string[] = [];
  styles.forEach(function (v) {
    let style = "";
    if (v.stylers) {
      // only if there is a styler object
      if (v.stylers.length > 0) {
        // Needs to have a style rule to be valid.
        style +=
          (v.hasOwnProperty("featureType")
            ? "feature:" + v.featureType
            : "feature:all") + "|";
        style +=
          (v.hasOwnProperty("elementType")
            ? "element:" + v.elementType
            : "element:all") + "|";
        v.stylers.forEach((val) => {
          const propertyname = Object.keys(val)[0];
          // @ts-ignore
          const propertyval = val[propertyname].toString().replace("#", "0x");
          style += propertyname + ":" + propertyval + "|";
        });
      }
    }
    result.push("style=" + encodeURIComponent(style));
  });

  return result.join("&");
}
