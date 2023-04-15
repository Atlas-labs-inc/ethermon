import create from "zustand";
import { Ethermon, Battle } from "./types";

type Store = {
  selectedCreature: Ethermon;
  setSelectedCreature: (creature: Ethermon) => void;
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  // chainId: number;
  treasuryAmount: number;
  setTreasuryAmount: (amount: number) => void;
  currentMonster: Ethermon;
  setCurrentMonster: (monster: Ethermon) => void;
  collection: Ethermon[];
  setCollection: (collection: Ethermon[]) => void;
  currentBattle: Battle;
  setCurrentBattle: (battle: Battle) => void;
  metamaskProvider: any;
  setMetamaskProvider: (provider: any) => void;
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
  treasuryAmount: 69,
  setTreasuryAmount: (amount) => set({ treasuryAmount: amount }),
  currentMonster: null,
  setCurrentMonster: (monster) => set({ currentMonster: monster }),
  collection: [],
  setCollection: (collection) => set({ collection: collection }),
  currentBattle: null,
  setCurrentBattle: (battle) => set({ currentBattle: battle }),
  metamaskProvider: null,
  setMetamaskProvider: (provider) => set({ metamaskProvider: provider }),
}));

export default useStore;
