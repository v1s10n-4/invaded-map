"use client";
import {
  Flex,
  Heading,
  IconButton,
  Text,
  Theme,
} from "@v1s10n_4/radix-ui-themes";
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
import Close from "pixelarticons/svg/close.svg";
import ChevronDown from "pixelarticons/svg/chevron-down.svg";
import ChevronUp from "pixelarticons/svg/chevron-up.svg";
import ArrowLeft from "pixelarticons/svg/arrow-left.svg";

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
      className="!z-20"
      style={{
        position: "absolute",
      }}
    >
      <Theme>
        <Sheet.Container
          className="!md:inset-x-4 !md:bottom-4 rt-reset rt-BaseCard rt-Card rt-r-size-1 rt-variant-surface rt-Card-accent !inset-x-2 !bottom-2 !w-auto !overflow-hidden"
          style={{
            backgroundColor: "inherit",
            borderTopRightRadius: "initial",
            borderTopLeftRadius: "initial",
            boxShadow: "initial",
          }}
        >
          <Sheet.Header>
            <Flex justify="between" px="3" pb="3" align="center">
              <IconButton variant="ghost" size="3" onClick={onLeftActionClick}>
                {invaderName ? (
                  <ArrowLeft className="h-8 w-8" />
                ) : currentSnapPoint === MapSheetState.FULL ? (
                  <ChevronDown className="h-8 w-8" />
                ) : (
                  <ChevronUp className="h-8 w-8" />
                )}
              </IconButton>
              {invaderName ? (
                <Heading
                  onClick={() =>
                    sheetRef.current?.snapTo(
                      currentSnapPoint === MapSheetState.CLOSED
                        ? MapSheetState.FULL
                        : MapSheetState.MID
                    )
                  }
                >
                  {invaderName}
                </Heading>
              ) : (
                <Text
                  onClick={() =>
                    sheetRef.current?.snapTo(
                      currentSnapPoint === MapSheetState.MID
                        ? MapSheetState.MIN
                        : MapSheetState.MID
                    )
                  }
                >
                  {invadersAmount} found
                </Text>
              )}
              <IconButton
                variant="ghost"
                size="3"
                onClick={() => sheetRef.current?.snapTo(MapSheetState.CLOSED)}
                className={
                  currentSnapPoint === MapSheetState.CLOSED ? "opacity-0" : ""
                }
              >
                <Close className="h-8 w-8" />
              </IconButton>
            </Flex>
          </Sheet.Header>
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
      </Theme>
    </Sheet>
  ) : (
    <div className="sr-only">{children}</div>
  );
};
export default MapSheet;
