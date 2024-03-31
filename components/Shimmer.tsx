import { toBase64 } from "@/utils";
import { FC, HTMLProps } from "react";

export const Shimmer = (w: number, h: number) =>
  toBase64(`
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>
`);

/* duplicated from Shimmer because we also need it as string and we don't want react to render it */
export const ShimmerBase64: FC<HTMLProps<SVGElement>> = ({
  width: w,
  height: h,
}) => (
  <svg
    width={w}
    height={h}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <linearGradient id="g">
        <stop stopColor="#333" offset="20%" />
        <stop stopColor="#222" offset="50%" />
        <stop stopColor="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width={w} height={h} fill="#333" />
    <rect id="r" width={w} height={h} fill="url(#g)" />
    <animate
      xlinkHref="#r"
      attributeName="x"
      from={`-${w}`}
      to={w}
      dur="1s"
      repeatCount="indefinite"
    />
  </svg>
);
