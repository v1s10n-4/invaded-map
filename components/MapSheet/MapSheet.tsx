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
  "h-8 w-8 bg-base-100 p-1",
  "hover:text-primary hover:ring-1 hover:ring-primary",
  "focus-visible:text-primary focus-visible:ring-1 focus-visible:ring-primary"
);

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
      isOpen={isOpen}
      onClose={() => sheetRef.current?.snapTo(MapSheetState.CLOSED)}
      snapPoints={[0.85, 0.5, 0.25, 40]}
      onSnap={setCurrentSnapPoint}
      initialSnap={MapSheetState.MIN}
      detent={invaderName ? "content-height" : "full-height"}
      style={{
        position: "absolute",
      }}
    >
      <Sheet.Container className="!md:inset-x-4 !md:bottom-4 !inset-x-2 !bottom-2 !w-auto !overflow-hidden !rounded-none border-4 border-double border-primary !bg-base-100">
        <Sheet.Header className="relative flex h-12 items-center justify-between bg-black p-2">
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
            <p>{invaderName}</p>
          ) : (
            <p
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
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
    </Sheet>
  ) : (
    <div className="sr-only">{children}</div>
  );
};
export default MapSheet;
