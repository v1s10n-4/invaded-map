import "./globals.css";
import { GtmInit } from "@/app/GtmInit";
import { HitPlaceholder } from "@/components/Placeholder";
import { Sheet, SheetContent, SheetTrigger } from "@/components/Sheet";
import {
  Box,
  Button,
  DropdownMenu,
  Flex,
  IconButton,
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
            <Flex direction="column" minHeight="100dvh">
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
              <Flex
                direction="column"
                gap="4"
                py={{ sm: "4" }}
                className="sm:pl-14"
              >
                <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                  <Sheet>
                    <SheetTrigger asChild>
                      <IconButton variant="outline" className="sm:hidden">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                      </IconButton>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <nav className="grid gap-6 text-lg font-medium">
                        <Link
                          href="#"
                          className="text-primary-foreground group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold md:text-base"
                        >
                          <Search className="h-5 w-5 transition-all group-hover:scale-110" />
                          <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                          href="#"
                          className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                        >
                          <Search className="h-5 w-5" />
                          Dashboard
                        </Link>
                        <Link
                          href="#"
                          className="text-foreground flex items-center gap-4 px-2.5"
                        >
                          <Search className="h-5 w-5" />
                          Orders
                        </Link>
                        <Link
                          href="#"
                          className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                        >
                          <Search className="h-5 w-5" />
                          Products
                        </Link>
                        <Link
                          href="#"
                          className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                        >
                          <Search className="h-5 w-5" />
                          Customers
                        </Link>
                        <Link
                          href="#"
                          className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                        >
                          <Search className="h-5 w-5" />
                          Settings
                        </Link>
                      </nav>
                    </SheetContent>
                  </Sheet>
                  <Box className="hidden md:flex">Fesse</Box>
                  <div className="relative ml-auto flex-1 md:grow-0">
                    <TextField.Root
                      name="search"
                      type="search"
                      placeholder="Search Invader"
                      size="3"
                      required
                      // className="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
                      className="w-full"
                    >
                      <TextField.Slot>
                        <Search width={16} height={16} />
                      </TextField.Slot>
                    </TextField.Root>
                  </div>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <IconButton
                        variant="outline"
                        // size="icon"
                        // className="overflow-hidden rounded-full"
                      >
                        <Image
                          src={HitPlaceholder(36, 36)}
                          width={36}
                          height={36}
                          alt="Avatar"
                          // className="overflow-hidden rounded-full"
                        />
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
                </header>
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
