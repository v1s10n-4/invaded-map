import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { InvaderWithLocation } from "@/components/Map";

interface IVDMapStoreState {
  invadersInView: InvaderWithLocation[];
  setInvadersInView: (invaders: InvaderWithLocation[]) => void;
  isMapSheetOpen: boolean;
  closeMapSheet: () => void;
  openMapSheet: () => void;
}

export const useIVDMapStore = create<IVDMapStoreState>()(
  devtools(
    persist(
      (set) => ({
        invadersInView: [],
        setInvadersInView: (by) => set((state) => ({ invadersInView: by })),
        isMapSheetOpen: false,
        closeMapSheet: () => set((state) => ({ isMapSheetOpen: false })),
        openMapSheet: () => set((state) => ({ isMapSheetOpen: true })),
      }),
      {
        name: "invaded-map",
      }
    )
  )
);

export default useIVDMapStore;
