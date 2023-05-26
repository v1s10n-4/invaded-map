import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import MenuIcon from "pixelarticons/svg/menu.svg";
import Link from "next/link";
import localFont from "next/font/local";
import { BoxActiveClasses, BoxClasses, BoxHoverClasses } from "@/utils";
import { clsx } from "clsx";
import { ReactNode } from "react";
import { Metadata } from "next";

export const runtime = "edge";

const sixtyfour = localFont({
  // src: "../public/assets/fonts/Sixtyfour[BLED,SCAN].woff2",
  src: "../public/assets/fonts/Sixtyfour-Normal.woff2",
  // src: "../public/assets/fonts/Glass_TTY_VT220.ttf",
});

const appName = "Invaded Map";
const appDescription =
  "Locate all space invaders for Flash Invaders app & more!";
const appUrl = "https://invaded-map.com";
export const metadata: Metadata = {
  title: appName,
  description: appDescription,
  applicationName: appName,
  keywords: ["invaded-map", "space-invaders", "invader"],
  openGraph: {
    title: appName,
    description: appDescription,
    images: "/icons/ios/256.png",
    siteName: appName,
    url: appUrl,
    type: "website",
  },
  twitter: {
    title: appName,
    description: appDescription,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: appName,
  },
  formatDetection: {
    email: false,
    telephone: false,
    url: false,
    date: false,
    address: false,
  },
  themeColor: "#000000",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: {
    shortcut: ["/favicon.ico", "/icons/ios/16.png"],
    icon: [
      {
        url: "/icons/ios/64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        url: "/icons/ios/32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/ios/16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/ios/16.png",
        sizes: "16x16",
      },
      {
        url: "/icons/ios/20.png",
        sizes: "20x20",
      },
      {
        url: "/icons/ios/29.png",
        sizes: "29x29",
      },
      {
        url: "/icons/ios/32.png",
        sizes: "32x32",
      },
      {
        url: "/icons/ios/40.png",
        sizes: "40x40",
      },
      {
        url: "/icons/ios/50.png",
        sizes: "50x50",
      },
      {
        url: "/icons/ios/57.png",
        sizes: "57x57",
      },
      {
        url: "/icons/ios/58.png",
        sizes: "58x58",
      },
      {
        url: "/icons/ios/60.png",
        sizes: "60x60",
      },
      {
        url: "/icons/ios/64.png",
        sizes: "64x64",
      },
      {
        url: "/icons/ios/72.png",
        sizes: "72x72",
      },
      {
        url: "/icons/ios/76.png",
        sizes: "76x76",
      },
      {
        url: "/icons/ios/80.png",
        sizes: "80x80",
      },
      {
        url: "/icons/ios/87.png",
        sizes: "87x87",
      },
      {
        url: "/icons/ios/100.png",
        sizes: "100x100",
      },
      {
        url: "/icons/ios/114.png",
        sizes: "114x114",
      },
      {
        url: "/icons/ios/120.png",
        sizes: "120x120",
      },
      {
        url: "/icons/ios/128.png",
        sizes: "128x128",
      },
      {
        url: "/icons/ios/144.png",
        sizes: "144x144",
      },
      {
        url: "/icons/ios/152.png",
        sizes: "152x152",
      },
      {
        url: "/icons/ios/167.png",
        sizes: "167x167",
      },
      {
        url: "/icons/ios/180.png",
        sizes: "180x180",
      },
      {
        url: "/icons/ios/192.png",
        sizes: "192x192",
      },
      {
        url: "/icons/ios/256.png",
        sizes: "256x256",
      },
      {
        url: "/icons/ios/512.png",
        sizes: "512x512",
      },
      {
        url: "/icons/ios/1024.png",
        sizes: "1024x1024",
      },
    ],
    // { rel: "apple-touch-icon", url: "/icons/apple-touch-icon.png" },
    // { rel: "shortcut icon", url: "/favicon.ico" },
  },
  colorScheme: "dark",
  manifest: "manifest.json",
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="black"
      className="text-base"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    >
      <body className={sixtyfour.className}>
        <div className="drawer-mobile drawer">
          <input
            id="drawer-toggle"
            type="checkbox"
            className="drawer-toggle"
            tabIndex={-1}
          />
          <div className="drawer-content relative flex flex-col p-2  scrollbar scrollbar-thumb-current scrollbar-track-black">
            <div className="sticky top-2 z-10 w-full place-self-center md:inset-x-6 md:top-5 md:w-fit">
              <div className={clsx("navbar bg-base-100", BoxClasses)}>
                <div className="navbar-start">
                  <label
                    htmlFor="drawer-toggle"
                    className="btn-ghost btn-square btn lg:hidden"
                  >
                    <MenuIcon className="h-full w-full text-primary" />
                  </label>
                </div>
                <div className="navbar-center">
                  <Link
                    href="/"
                    className="box-border border-y-2 border-transparent pt-1 text-2xl uppercase text-primary outline-none hover:border-y-2 hover:border-primary hover:font-bold focus-visible:border-y-2 focus-visible:border-primary focus-visible:font-bold active:border-dashed sm:text-4xl lg:text-5xl"
                  >
                    <h1>Invaded map</h1>
                  </Link>
                </div>
                <div className="navbar-end"></div>
              </div>
            </div>
            <div id="content" className="absolute inset-0">
              {children}
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
            <ul className="menu w-80 gap-3 border-r-4 border-double border-primary bg-base-100 p-4">
              <li>
                <Link
                  href="/map"
                  className={clsx(
                    "text-xl text-primary",
                    BoxClasses,
                    BoxHoverClasses,
                    BoxActiveClasses
                  )}
                >
                  Map
                </Link>
              </li>
              <li>
                <Link
                  href="/list"
                  className={clsx(
                    "text-xl text-primary",
                    BoxClasses,
                    BoxHoverClasses,
                    BoxActiveClasses
                  )}
                >
                  All invaders
                </Link>
              </li>
              <li>
                <Link
                  href="/highscores"
                  className={clsx(
                    "text-xl text-primary",
                    BoxClasses,
                    BoxHoverClasses,
                    BoxActiveClasses
                  )}
                >
                  Highscores
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </body>
      <Analytics />
    </html>
  );
}
