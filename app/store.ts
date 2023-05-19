import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { InvaderWithLocation } from "@/components/Map";

export enum MapSheetState {
  FULL,
  MID,
  MIN,
  CLOSED,
}
interface IVDMapStoreState {
  invadersInView: InvaderWithLocation[];
  setInvadersInView: (invaders: InvaderWithLocation[]) => void;
  isMapSheetOpen: boolean;
  mapSheetState: MapSheetState;
  closeMapSheet: () => void;
  openMapSheet: () => void;
  setMapSheetState: (index: MapSheetState) => void;
}

export const useIVDMapStore = create<IVDMapStoreState>()(
  devtools(
    persist(
      (set) => ({
        invadersInView: [],
        setInvadersInView: (by) => set((state) => ({ invadersInView: by })),
        isMapSheetOpen: false,
        mapSheetState: 1,
        closeMapSheet: () => set(() => ({ isMapSheetOpen: false })),
        openMapSheet: () => set(() => ({ isMapSheetOpen: true })),
        setMapSheetState: (index) => set(() => ({ mapSheetState: index })),
      }),
      {
        name: "invaded-map",
      }
    )
  )
);

export default useIVDMapStore;
