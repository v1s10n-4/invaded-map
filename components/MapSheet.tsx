"use client";
import Sheet, { SheetRef } from "react-modal-sheet";
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useIVDMapStore, { MapSheetState } from "@/app/store";
import { useParams, useRouter } from "next/navigation";
import CloseBox from "pixelarticons/svg/close.svg";
import ChevronDown from "pixelarticons/svg/chevron-down.svg";
import ChevronUp from "pixelarticons/svg/chevron-up.svg";
import ArrowLeft from "pixelarticons/svg/arrow-left.svg";
import { clsx } from "clsx";

const SheetActionClassNames = clsx(
  "h-full w-10 bg-base-100 p-1 box-border",
  "hover:text-primary hover:ring-1 hover:ring-primary",
  "focus-visible:text-primary focus-visible:ring-1 focus-visible:ring-primary"
);

const SheetHeaderTextClassNames = "px-4 py-2 md:px-8";

export const MapSheet: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [mountPoint, setMountPoint] = useState<Element>();
  const [currentSnapPoint, setCurrentSnapPoint] = useState<MapSheetState>();
  const { invaderName } = useParams();
  const sheetRef = useRef<SheetRef>();

  const { isOpen, invadersAmount } = useIVDMapStore((state) => ({
    invadersAmount: state.invadersInView.length,
    mapSheetState: state.mapSheetState,
    setSheetState: state.setMapSheetState,
    isOpen: state.isMapSheetOpen,
    onClose: state.closeMapSheet,
  }));

  const onLeftActionClick = useCallback(() => {
    if (invaderName) {
      router.push("/map");
      sheetRef.current?.snapTo(MapSheetState.MIN);
    } else if (currentSnapPoint === MapSheetState.FULL) {
      sheetRef.current?.snapTo(MapSheetState.MIN);
    } else {
      sheetRef.current?.snapTo(MapSheetState.FULL);
    }
  }, [invaderName, currentSnapPoint, router]);

  useEffect(() => {
    if (invaderName) sheetRef.current?.snapTo(MapSheetState.FULL);
  }, [invaderName]);

  useEffect(() => {
    setMountPoint(document.querySelector("#content") || undefined);
  }, []);

  return mountPoint ? (
    <Sheet
      ref={sheetRef}
      mountPoint={mountPoint}
      isOpen
      onClose={() => sheetRef.current?.snapTo(MapSheetState.CLOSED)}
      snapPoints={[0.85, 0.5, 0.25, 42]}
      onSnap={setCurrentSnapPoint}
      initialSnap={invaderName ? MapSheetState.FULL : MapSheetState.CLOSED}
      detent={invaderName ? "content-height" : "full-height"}
      style={{
        position: "absolute",
      }}
    >
      <Sheet.Container className="!md:inset-x-4 !md:bottom-4 !inset-x-2 !bottom-2 !w-auto !overflow-hidden !rounded-none border-4 border-double border-primary !bg-base-100">
        <Sheet.Header className="relative mb-0.5 flex h-12 items-center justify-between border-b border-primary bg-black p-[3px]">
          <button onClick={onLeftActionClick} className={SheetActionClassNames}>
            {invaderName ? (
              <ArrowLeft className="h-full w-full" />
            ) : currentSnapPoint === MapSheetState.FULL ? (
              <ChevronDown className="h-full w-full" />
            ) : (
              <ChevronUp className="h-full w-full" />
            )}
          </button>
          {invaderName ? (
            <h1
              onClick={() =>
                sheetRef.current?.snapTo(
                  currentSnapPoint === MapSheetState.CLOSED
                    ? MapSheetState.FULL
                    : MapSheetState.MID
                )
              }
              className={clsx(SheetHeaderTextClassNames, "text-2xl")}
            >
              {invaderName}
            </h1>
          ) : (
            <p
              className={SheetHeaderTextClassNames}
              onClick={() =>
                sheetRef.current?.snapTo(
                  currentSnapPoint === MapSheetState.MID
                    ? MapSheetState.MIN
                    : MapSheetState.MID
                )
              }
            >
              {invadersAmount} found
            </p>
          )}
          <button
            onClick={() => sheetRef.current?.snapTo(MapSheetState.CLOSED)}
            className={SheetActionClassNames}
          >
            <CloseBox className="h-full w-full" />
          </button>
        </Sheet.Header>
        <Sheet.Content
          className="border-t border-primary scrollbar"
          disableDrag={
            !!invaderName ||
            currentSnapPoint === MapSheetState.MIN ||
            currentSnapPoint === MapSheetState.MID
          }
        >
          {children}
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  ) : (
    <div className="sr-only">{children}</div>
  );
};
export default MapSheet;
