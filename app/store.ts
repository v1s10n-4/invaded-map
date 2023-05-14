import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { InvaderWithLocation } from "@/components/Map";

interface IVDMapStoreState {
  invadersInView: InvaderWithLocation[];
  setInvadersInView: (invaders: InvaderWithLocation[]) => void;
}

export const useIVDMapStore = create<IVDMapStoreState>()(
  devtools(
    persist(
      (set) => ({
        invadersInView: [],
        setInvadersInView: (by) => set((state) => ({ invadersInView: by })),
      }),
      {
        name: "invaded-map",
      }
    )
  )
);

export default useIVDMapStore;