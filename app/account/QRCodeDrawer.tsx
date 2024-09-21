import QRCodeIcon from "@/app/account/qr-code.svg";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/Drawer";
import Icon from "@/components/Icon/Icon";
import {
  Button,
  Card,
  IconButton,
  Inset,
  Separator,
  Spinner,
  Tooltip,
  VisuallyHidden,
} from "@v1s10n_4/radix-ui-themes";
import { toString } from "qrcode";
import React, { FC, Suspense } from "react";

export const QRCodeDrawer: FC<{ link: string }> = ({ link }) => {
  return (
    <Drawer>
      <Tooltip content="show QR code">
        <DrawerTrigger asChild>
          <IconButton type="button" variant="ghost">
            <QRCodeIcon className="h-6 w-6" />
            <VisuallyHidden>
              <span>View QR code</span>
            </VisuallyHidden>
          </IconButton>
        </DrawerTrigger>
      </Tooltip>
      <DrawerContent
        className="fixed inset-x-0 bottom-0 focus-visible:outline-0"
        asChild
      >
        <Card className="mx-2 flex w-auto flex-col rounded-b-none pb-[env(safe-area-inset-bottom)] [box-shadow:--shadow-5] before:rounded-b-none after:!inset-[--base-card-border-width] after:rounded-b-none sm:mx-auto sm:w-fit">
          <DrawerHeader pt="2">
            <DrawerTitle align="center" size="1" mb="0">
              Your invite QR code
            </DrawerTitle>
          </DrawerHeader>
          <Inset side="x">
            <Separator size="4" mb="3" />
          </Inset>

          <Card className="relative text-[--accent-9]">
            <Suspense
              fallback={
                <Spinner className="m-[42%] aspect-square h-[inherit] w-auto" />
              }
            >
              <QRCodeImage link={link} />
            </Suspense>
          </Card>
          <Inset side="x">
            <Separator size="4" mt="3" />
          </Inset>
          <DrawerFooter px="0" py="3">
            <DrawerClose asChild>
              <Button variant="surface" color="gray">
                Close
              </Button>
              {/*<IconButton variant="ghost">*/}
              {/*  <Close />*/}
              {/*</IconButton>*/}
            </DrawerClose>
          </DrawerFooter>
        </Card>
      </DrawerContent>
    </Drawer>
  );
};

export const QRCodeImage: FC<{ link: string }> = async ({ link }) => {
  let qrcode;
  try {
    qrcode = await toString(link, {
      type: "svg",
      color: {
        dark: "#123456",
        light: "#654321",
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
    <>
      <Icon
        icon="invadedMap"
        className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 bg-[--color-background]"
      />
      <div
        dangerouslySetInnerHTML={{
          __html: qrcode
            // throws error on generation if not an hex value
            .replace("#123456", "currentColor")
            .replace(`fill="#654321"`, `class="fill-[--color-background]"`),
        }}
      />
    </>
  );
};

export default QRCodeDrawer;
