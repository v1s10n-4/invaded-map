import {
  baseGoogleStaticMapUrl,
  Colors,
  getStaticMapStyle,
  gmapUrlParams,
} from "@/utils";
import Image from "next/image";
import mapStyles from "@/utils/mapStyles.json";

export const runtime = "edge";

const searchParams = new URLSearchParams({
  ...gmapUrlParams,
  size: "2000x2000",
});
export function ErrorPage() {
  return (
    <div className="flex h-full w-full items-center justify-center text-primary">
      <Image
        src={`${baseGoogleStaticMapUrl}?${searchParams.toString()}&${getStaticMapStyle(
          mapStyles.sixtyfour
        )}`}
        width={1200}
        height={1200}
        alt="404 page background image"
        className="h-full w-full object-cover"
      />
      <div
        className="absolute flex flex-col items-center gap-5 bg-base-100"
        style={{
          // TODO migrate to tw
          boxShadow: `0px 0px 16px 2px ${Colors.secondary}, 0 0 0 6px black, 0 0 0 10px ${Colors.primary}`,
        }}
      >
        <div className="flex w-full flex-col items-center justify-center gap-4 border-4 border-primary p-4 lg:gap-6 lg:p-6 lg:pt-8">
          <h1
            className="text-5xl lg:text-9xl"
            style={{
              textShadow: `${Colors.accent} 0px 0px 0.08em`,
            }}
          >
            404
          </h1>
          <p
            className="text-3xl lg:text-5xl"
            style={{
              textShadow: `${Colors.accent} 0px 0px 0.2em`,
            }}
          >
            INVADER
          </p>
          <p
            className="text-2xl lg:text-4xl"
            style={{
              textShadow: `${Colors.accent} 0px 0px 0.2em`,
            }}
          >
            NOT FOUND
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
