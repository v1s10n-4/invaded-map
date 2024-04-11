// expressed as CRT bulb color at different wavelength
export const Colors = {
  primary: "#ff2100", // 640 nm
  secondary: "#b50000", // 740 nm
  accent: "#8d0000", // 760 nm
} as const;

export const BoxClasses =
  "border border-primary ring-primary ring-offset-black ring-1 ring-offset-2";
export const BoxHoverClasses =
  "hover:ring-offset-1 focus-within:ring-offset-1 hover:bg-black focus:bg-black";
export const BoxActiveClasses = "active:ring-offset-0";

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const tooltipClass =
  "tooltip before:rounded-none before:border before:border-primary before:bg-black before:text-xs before:text-base-content after:border-t-primary";
