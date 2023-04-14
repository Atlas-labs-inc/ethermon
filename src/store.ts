import create from "zustand";
import { Ethermon } from "./types";

type Store = {
  selectedCreature: Ethermon;
  setSelectedCreature: (creature: Ethermon) => void;
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  // chainId: number;
};

const useStore = create<Store>((set) => ({
  selectedCreature: {
    id: 0,
    name: "",
    image: "",
  },
  setSelectedCreature: (creature) => set({ selectedCreature: creature }),
  walletAddress: "",
  setWalletAddress: (address) => set({ walletAddress: address }),
}));

export default useStore;
