import "./globals.css";
import { GtmInit } from "@/app/GtmInit";
import RootDrawer from "@/app/RootDrawer";
import RootNav from "@/app/RootNav";
import { AuthButton } from "@/components/AuthButton";
import {
  Card,
  Flex,
  ScrollArea,
  Skeleton,
  Text,
  Theme,
} from "@v1s10n_4/radix-ui-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { clsx } from "clsx";
import { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import Script from "next/script";
import React, { ReactNode, Suspense } from "react";
import Notifications from "@/app/Notifications";

export const runtime = "edge";
export const fetchCache = "default-cache";

const sixtyfour = localFont({
  // src: "../public/assets/fonts/Sixtyfour[BLED,SCAN].woff2",
  src: "../public/assets/fonts/Sixtyfour-Normal.woff2",
  // src: "../public/assets/fonts/Glass_TTY_VT220.ttf",
  variable: "--font-sixtyfour",
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
      content="width=device-width, initial-scale=1, maximum-scale=1"
    >
      <body className={clsx("bg-[--color-background]", sixtyfour.className)}>
        {process.env.LOCAL === "true" && (
          <Script src={"/polyfill.js"} strategy="beforeInteractive" />
        )}
        <Theme
          appearance="dark"
          radius="none"
          accentColor="red"
          grayColor="slate"
        >
          <SessionProvider basePath="/auth">
            <Flex
              position="relative"
              direction="column"
              minHeight="100dvh"
              maxHeight="100dvh"
              vaul-drawer-wrapper=""
            >
              <RootNav />
              <ScrollArea
                scrollbars="vertical"
                // prevent horizontal-scrolling
                className="[&>div>div]:w-[initial]"
                asChild
              >
                <Flex
                  direction="column"
                  pl={{ initial: "0", sm: "96px" }}
                  minHeight="100dvh"
                  maxHeight="100dvh"
                  id="content"
                >
                  <Card
                    className="sticky top-2 z-[1] rounded-[max(var(--radius-5),var(--radius-full))] [box-shadow:--shadow-5] after:rounded-[max(var(--radius-5),var(--radius-full))] has-[+#map,+#root-loader]:mb-16 pwa:!top-[calc(env(safe-area-inset-top)+var(--space-2))] pwa:mt-[calc(env(safe-area-inset-top)+var(--space-2))]"
                    my="2"
                    mr="4"
                    ml={{ initial: "4", sm: "2" }}
                    asChild
                  >
                    <header>
                      <Flex
                        align="center"
                        gap="2"
                        px={{ initial: "2", sm: "3" }}
                      >
                        <RootDrawer />
                        <Flex
                          flexGrow="1"
                          justify={{ initial: "center", sm: "start" }}
                        >
                          <Text
                            size={{ initial: "4", sm: "6", lg: "5" }}
                            className="uppercase"
                            align="center"
                          >
                            Invaded Map
                          </Text>
                        </Flex>

                        <Suspense
                          fallback={
                            <Skeleton
                              minWidth="var(--space-8)"
                              minHeight="var(--space-8)"
                              style={{
                                borderRadius:
                                  "max(var(--radius-4), var(--radius-full))",
                              }}
                            />
                          }
                        >
                          <Notifications />
                        </Suspense>
                        <Suspense
                          fallback={
                            <Skeleton
                              minWidth="var(--space-8)"
                              minHeight="var(--space-8)"
                              style={{
                                borderRadius:
                                  "max(var(--radius-4), var(--radius-full))",
                              }}
                            />
                          }
                        >
                          <AuthButton />
                        </Suspense>
                      </Flex>
                    </header>
                  </Card>
                  {children}
                </Flex>
              </ScrollArea>
            </Flex>
          </SessionProvider>
        </Theme>
        <SpeedInsights />
      </body>
      <Analytics />
      <GtmInit />
      <Script
        src={"/stats/script.js"}
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        strategy="afterInteractive"
      />
    </html>
  );
}
