import { mapStyles } from "@/components/Map";
import { Invader } from "@/db";
import {
  baseGoogleStaticMapUrl,
  Colors,
  getStaticMapStyle,
  gmapUrlParams,
} from "@/utils";

export const InvaderImage = ({
  name,
  thumbnail,
  location,
}: Partial<Pick<Invader, "name" | "thumbnail" | "location">>) => {
  const searchParams = new URLSearchParams(gmapUrlParams);

  if (location) {
    searchParams.set("center", `${location.lat},${location.lng}`);
    searchParams.set("zoom", "16");
  }
  const mapStaticImageUrl = `${baseGoogleStaticMapUrl}?${searchParams.toString()}&${getStaticMapStyle(
    mapStyles.sixtyfour
  )}`;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: Colors.primary,
        fontFamily: "'sixtyfour'",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img src={mapStaticImageUrl} width={1200} height={1200} />
      <div
        style={{
          display: "flex",
          position: "absolute",
          flexDirection: "column",
          backgroundColor: "black",
          alignItems: "center",
          boxShadow: `0px 0px 16px 2px ${Colors.secondary}, 0 0 0 6px black, 0 0 0 10px ${Colors.primary}`,
          gap: 5,
        }}
      >
        {thumbnail && (
          <img
            src={thumbnail}
            width={256}
            height={256}
            style={{
              overflowX: "hidden",
              borderColor: Colors.primary,
              borderWidth: 4,
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            borderColor: Colors.primary,
            borderWidth: 4,
            padding: thumbnail ? 0 : "4px 20px 4px 8px",
          }}
        >
          {!name && (
            <p
              style={{
                fontSize: 128,
                textShadow: `${Colors.accent} 0px 0px 0.08em`,
              }}
            >
              404
            </p>
          )}
          {!name && (
            <p
              style={{
                fontSize: 56,
                textShadow: `${Colors.accent} 0px 0px 0.2em`,
              }}
            >
              INVADER
            </p>
          )}
          <p
            style={{
              fontSize: name ? 32 : 40,
              textShadow: `${Colors.accent} 0px 0px 0.2em`,
            }}
          >
            {name || "NOT FOUND"}
          </p>
        </div>
      </div>
    </div>
  );
};
