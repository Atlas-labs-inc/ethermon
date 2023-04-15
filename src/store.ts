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
  monsterCurrentlyViewing: Ethermon;
  setMonsterCurrentlyViewing: (monster: Ethermon) => void;
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
  treasuryAmount: 69.392312,
  setTreasuryAmount: (amount) => set({ treasuryAmount: amount }),
  currentMonster: null,
  setCurrentMonster: (monster) => set({ currentMonster: monster }),
  collection: [
    {
      id: 1,
      name: "Charmander",
      image: "https://svgur.com/i/s80.svg",
    },
    {
      id: 2,
      name: "Bulbasaur",
      image: "https://svgur.com/i/s80.svg",
    },
    {
      id: 3,
      name: "Squirtle",
      image: "https://svgur.com/i/s80.svg",
    },
    {
      id: 4,
      name: "Pikachu",
      image: "https://svgur.com/i/s80.svg",
    },
    {
      id: 5,
      name: "Eevee",
      image: "https://svgur.com/i/s80.svg",
    },
    {
      id: 6,
      name: "Snorlax",
      image: "https://svgur.com/i/s80.svg",
    },
  ],
  setCollection: (collection) => set({ collection: collection }),
  currentBattle: null,
  setCurrentBattle: (battle) => set({ currentBattle: battle }),
  metamaskProvider: null,
  setMetamaskProvider: (provider) => set({ metamaskProvider: provider }),
  monsterCurrentlyViewing: null,
  setMonsterCurrentlyViewing: (monster) =>
    set({ monsterCurrentlyViewing: monster }),
}));

export default useStore;
