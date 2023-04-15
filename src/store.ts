import create from "zustand";
import { Ethermon, Battle } from "./types";

type Store = {
  selectedCreature: Ethermon;
  setSelectedCreature: (creature: Ethermon) => void;
  opponent: Ethermon;
  setOpponent: (opponent: Ethermon) => void;
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  // chainId: number;
  treasuryAmount: number;
  setTreasuryAmount: (amount: number) => void;
  collection: Ethermon[];
  setCollection: (collection: Ethermon[]) => void;
  currentBattle: Battle;
  setCurrentBattle: (battle: Battle) => void;
  metamaskProvider: any;
  setMetamaskProvider: (provider: any) => void;
  monsterCurrentlyViewing: Ethermon;
  setMonsterCurrentlyViewing: (monster: Ethermon) => void;
  isBattleOver: boolean;
  setIsBattleOver: (isOver: boolean) => void;
  didUserWin: boolean;
  setDidUserWin: (didWin: boolean) => void;
};

const useStore = create<Store>((set) => ({
  selectedCreature: null,
  setSelectedCreature: (creature) => set({ selectedCreature: creature }),
  opponent: {
    name: "Grizzlark",
    type: "Fire",
    image: "https://d6hckkykh246u.cloudfront.net/Aquasonic.svg",
  },
  setOpponent: (opponent) => set({ opponent: opponent }),
  walletAddress: "",
  setWalletAddress: (address) => set({ walletAddress: address }),
  treasuryAmount: 0.0,
  setTreasuryAmount: (amount) => set({ treasuryAmount: amount }),
  collection: [],
  setCollection: (collection) => set({ collection: collection }),
  currentBattle: {
    npc: {
      hp: 200,
      mana: 10,
      attack: 100,
      defense: 100,
    },
    player: {
      hp: 200,
      mana: 10,
      attack: 100,
      defense: 100,
    },
  },
  setCurrentBattle: (battle) => set({ currentBattle: battle }),
  metamaskProvider: null,
  setMetamaskProvider: (provider) => set({ metamaskProvider: provider }),
  monsterCurrentlyViewing: null,
  setMonsterCurrentlyViewing: (monster) =>
    set({ monsterCurrentlyViewing: monster }),
  isBattleOver: false,
  setIsBattleOver: (isOver) => set({ isBattleOver: isOver }),
  didUserWin: false,
  setDidUserWin: (didWin) => set({ didUserWin: didWin }),
}));

export default useStore;
