import QRCodeIcon from "@/app/account/qr-code.svg";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/Drawer";
import Icon from "@/components/Icon/Icon";
import { cn } from "@/lib/utils";
import { Colors, tooltipClass } from "@/utils";
import { clsx } from "clsx";
import { wait } from "next/dist/lib/wait";
import Close from "pixelarticons/svg/close.svg";
import { toString } from "qrcode";
import React, { ButtonHTMLAttributes, FC } from "react";

export const ShowQRCodeButton: FC<
  { tooltipText?: string } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ tooltipText = "show qrcode", className, ...props }) => (
  <button
    className={cn(
      "btn btn-ghost h-[2.3em] min-h-[2.3em] w-[2.3em] p-[3px]",
      tooltipClass,
      className
    )}
    data-tip={tooltipText}
    {...props}
  >
    <QRCodeIcon className="h-6 w-6" />
    <span className="sr-only">View QR code</span>
  </button>
);

export const QRCode: FC<{ link: string }> = async ({ link }) => {
  let qrcode;
  try {
    qrcode = await toString(link, {
      type: "svg",
      color: {
        dark: Colors.primary,
        light: "#000000",
      },
      margin: 0,
      scale: 1,
      errorCorrectionLevel: "high",
    });
  } catch (err) {
    console.warn(err);
    return null;
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ShowQRCodeButton />
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/10" />
        <DrawerContent className="md:1/3 fixed h-1/2 rounded-none border-x-0 border-b-0 border-t-4 border-double border-primary bg-base-100 p-16 outline-none">
          <DrawerClose className="btn btn-square btn-ghost absolute right-4 top-4">
            <Close className="h-full w-full" />
          </DrawerClose>
          <div className="relative mx-auto h-full">
            <Icon
              icon="invadedMap"
              className="absolute left-[36.5%] top-[36.5%] h-[27%] w-[27%] bg-black text-primary"
            />
            <img
              className="aspect-square h-full"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(qrcode)}`}
            />
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default QRCode;
