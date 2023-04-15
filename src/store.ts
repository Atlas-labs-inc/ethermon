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
    type: "",
    moveList: [],
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
      name: "Grizzlark",
      type: "Fire",
      moveList: ["Scratch", "Ember", "Fire Fang", "Flamethrower"],
      image: "https://svgshare.com/i/s9F.svg",
    },
    {
      id: 2,
      name: "Bulbasaur",
      type: "Grass",
      moveList: ["Tackle", "Vine Whip", "Razor Leaf", "Solar Beam"],
      image: "https://svgur.com/i/s80.svg",
    },
    {
      id: 3,
      name: "Squirtle",
      type: "Water",
      moveList: ["Tackle", "Bubble", "Water Gun", "Hydro Pump"],
      image: "https://svgshare.com/i/s9v.svg",
    },
    {
      id: 4,
      name: "Pikachu",
      type: "Electric",
      moveList: ["Thunder Shock", "Thunderbolt", "Thunder", "Thunder Punch"],
      image: "https://svgshare.com/i/s8s.svg",
    },
    {
      id: 5,
      name: "Eevee",
      type: "Normal",
      moveList: ["Tackle", "Quick Attack", "Bite", "Body Slam"],
      image: "https://svgshare.com/i/s8t.svg",
    },
    {
      id: 6,
      name: "Snorlax",
      type: "Normal",
      moveList: ["Tackle", "Body Slam", "Hyper Beam", "Earthquake"],
      image: "https://svgshare.com/i/s9b.svg",
    },
    {
      id: 7,
      name: "Chromeleon",
      type: "Psychic",
      moveList: ["Pound", "Psybeam", "Psychic", "Shadow Ball"],
      image: "https://svgshare.com/i/s9G.svg",
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
