"use client";
import Sheet, { SheetRef } from "react-modal-sheet";
import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import useIVDMapStore from "@/app/store";
import { useParams, useRouter } from "next/navigation";
import CloseBox from "pixelarticons/svg/close.svg";

export const revalidate = 0;

export const MapSheet: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [mountPoint, setMountPoint] = useState<Element>();
  const { invaderName } = useParams();
  const sheetRef = useRef<SheetRef>();

  const SheetProps = useIVDMapStore((state) => ({
    isOpen: state.isMapSheetOpen,
    onClose: state.closeMapSheet,
  }));
  useEffect(() => {
    sheetRef.current?.snapTo(invaderName ? 0 : 1);
  }, [invaderName]);
  useEffect(() => {
    setMountPoint(document.querySelector("#content") || undefined);
  }, []);
  return mountPoint ? (
    <Sheet
      mountPoint={mountPoint}
      {...SheetProps}
      snapPoints={[0.5, 0.25]}
      initialSnap={1}
      // detent="content-height"
      className="!absolute"
    >
      <Sheet.Container
        className="!md:inset-x-4 !md:bottom-4 !inset-x-2 !bottom-2 !w-auto !overflow-hidden !rounded-none border border-4 border-primary !bg-base-100"
        style={{ borderStyle: "double" }}
      >
        <Sheet.Header className="!absolute z-10" />
        <Sheet.Content>
          <button
            onClick={() => {
              SheetProps.onClose();
              router.push("/map");
            }}
            className="absolute right-2 top-2 z-10 h-8 w-8 p-1 backdrop-blur-lg"
          >
            <CloseBox className="h-full w-full" />
          </button>
          {children}
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  ) : (
    <div className="sr-only">{children}</div>
  );
};
export default MapSheet;
