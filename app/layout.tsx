import "./globals.css";
import { GtmInit } from "@/app/GtmInit";
import { Header } from "@/components/Header";
import { SideMenuContent } from "@/components/SideMenuContent";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { clsx } from "clsx";
import { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import React, { ReactNode } from "react";

export const runtime = "edge";

const sixtyfour = localFont({
  // src: "../public/assets/fonts/Sixtyfour[BLED,SCAN].woff2",
  src: "../public/assets/fonts/Sixtyfour-Normal.woff2",
  // src: "../public/assets/fonts/Glass_TTY_VT220.ttf",
});

const appName = "Invaded Map";
const appDescription =
  "Locate all space invaders for Flash Invaders app & more!";
const appUrl = new URL(
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://invaded-map.com"
    : "https://staging.invaded-map.com"
);

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};
export const metadata: Metadata = {
  metadataBase: appUrl,
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
  manifest: "/manifest.json",
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
      <body className={clsx("bg-black", sixtyfour.className)}>
        <div className="drawer h-screen lg:drawer-open">
          <input
            id="drawer-toggle"
            type="checkbox"
            className="drawer-toggle"
            tabIndex={-1}
          />
          <div className="scrollbar drawer-content relative flex flex-col  p-2 scrollbar-thumb-current scrollbar-track-black">
            <Header />
            <div
              id="content"
              vaul-drawer-wrapper=""
              className="absolute inset-0"
            >
              {children}
            </div>
          </div>
          <div className="drawer-side z-40 hidden lg:block">
            <nav className="flex h-full w-80 flex-col gap-3 border-y-0 border-r-4 border-double border-primary bg-base-100 p-4">
              <SideMenuContent />
            </nav>
          </div>
        </div>
        <SpeedInsights />
      </body>
      <Analytics />
      <GtmInit />
    </html>
  );
}
