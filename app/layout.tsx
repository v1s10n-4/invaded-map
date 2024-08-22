import "./globals.css";
import { GtmInit } from "@/app/GtmInit";
import { HitPlaceholder } from "@/components/Placeholder";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/Drawer";
import {
  Box,
  Button,
  Card,
  DropdownMenu,
  Flex,
  IconButton,
  Spinner,
  Text,
  TextField,
  Theme,
  ThemePanel,
  Tooltip,
} from "@radix-ui/themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { clsx } from "clsx";
import { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "pixelarticons/svg/menu.svg";
import Search from "pixelarticons/svg/search.svg";
import React, { ReactNode } from "react";

export const runtime = "edge";

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
      data-theme="black"
      className="text-base"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    >
      <body className={clsx("bg-black", sixtyfour.className)}>
        <Theme appearance="dark" radius="none" accentColor="red">
          <SessionProvider basePath="/auth">
            <Flex
              position="relative"
              direction="column"
              minHeight="100dvh"
              vaul-drawer-wrapper=""
            >
              <aside className="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                  <Link
                    href="#"
                    className="text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold md:h-8 md:w-8 md:text-base"
                  >
                    <Search className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Map</span>
                  </Link>
                  <Tooltip content="List" side="right">
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
                    >
                      <Search className="h-5 w-5" />
                      <span className="sr-only">List</span>
                    </Link>
                  </Tooltip>
                  <Tooltip content="Highscores" side="right">
                    <Link
                      href="#"
                      className="text-accent-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg bg-accent transition-colors md:h-8 md:w-8"
                    >
                      <Search className="h-5 w-5" />
                      <span className="sr-only">Highscores</span>
                    </Link>
                  </Tooltip>
                  <Tooltip content="Products" side="right">
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
                    >
                      <Search className="h-5 w-5" />
                      <span className="sr-only">Products</span>
                    </Link>
                  </Tooltip>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                  <Tooltip content="Settings" side="right">
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
                    >
                      <Search className="h-5 w-5" />
                      <span className="sr-only">Settings</span>
                    </Link>
                  </Tooltip>
                </nav>
              </aside>
              <Flex direction="column" pl={{ initial: "0", sm: "56px" }}>
                <Card asChild className="sticky top-2 z-[1]" m="2">
                  <header>
                    <Flex align="center" gap="2" px={{ initial: "2", sm: "3" }}>
                      <Drawer direction="left">
                        <DrawerTrigger asChild>
                          <IconButton
                            size="4"
                            variant="ghost"
                            className="sm:hidden"
                          >
                            <MenuIcon className="h-8 w-8" />
                            <span className="sr-only">Toggle Menu</span>
                          </IconButton>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>Invaded map</DrawerHeader>
                          <Flex direction="column" gap="2"></Flex>
                          <DrawerFooter>Settings</DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                      <Flex
                        flexGrow="1"
                        justify={{ initial: "center", sm: "start" }}
                      >
                        <Text size="5" className="uppercase">
                          Invaded Map
                        </Text>
                      </Flex>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <IconButton size="3" variant="outline">
                            <Spinner />
                          </IconButton>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="end">
                          <DropdownMenu.Label>My Account</DropdownMenu.Label>
                          <DropdownMenu.Separator />
                          <DropdownMenu.Item>Settings</DropdownMenu.Item>
                          <DropdownMenu.Item>Support</DropdownMenu.Item>
                          <DropdownMenu.Separator />
                          <DropdownMenu.Item>Logout</DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </Flex>
                  </header>
                </Card>
                {children}
              </Flex>
            </Flex>
          </SessionProvider>
          <ThemePanel defaultOpen={false} />
        </Theme>
        <SpeedInsights />
      </body>
      <Analytics />
      <GtmInit />
    </html>
  );
}
