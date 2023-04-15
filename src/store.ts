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
  selectedCreature: {
    id: 1,
    name: "Grizzlark",
    type: "Fire",
    moveList: [
      {
        name: "headbutt",
        type: "Normal",
        damage: 40,
        manaCost: 10,
        buffType: "",
        buffAmount: 0,
        debuffType: "",
        debuffAmount: 0,
        heal: 0,
      },
      {
        name: "ember",
        type: "Fire",
        damage: 60,
        manaCost: 20,
        buffType: "",
        buffAmount: 0,
        debuffType: "Burn",
        debuffAmount: 10,
        heal: 0,
      },
      {
        name: "solar beam",
        type: "Fire",
        damage: 80,
        manaCost: 30,
        buffType: "",
        buffAmount: 0,
        debuffType: "Burn",
        debuffAmount: 20,
        heal: 0,
      },
      {
        name: "splash",
        type: "Fire",
        damage: 120,
        manaCost: 50,
        buffType: "",
        buffAmount: 0,
        debuffType: "Burn",
        debuffAmount: 30,
        heal: 0,
      },
    ],
    image: "https://d6hckkykh246u.cloudfront.net/Aquasonic.svg",
  },
  setSelectedCreature: (creature) => set({ selectedCreature: creature }),
  opponent: {
    name: "Grizzlark",
    type: "Fire",
    image: "https://d6hckkykh246u.cloudfront.net/Aquasonic.svg",
  },
  setOpponent: (opponent) => set({ opponent: opponent }),
  walletAddress: "",
  setWalletAddress: (address) => set({ walletAddress: address }),
  treasuryAmount: 69.392312,
  setTreasuryAmount: (amount) => set({ treasuryAmount: amount }),
  collection: [
    // {
    {
      id: 1,
      name: "Grizzlark",
      type: "Fire",
      moveList: [
        {
          name: "Headbutt",
          type: "Normal",
          damage: 40,
          manaCost: 10,
          buffType: "",
          buffAmount: 0,
          debuffType: "",
          debuffAmount: 0,
          heal: 0,
        },
        {
          name: "Ember",
          type: "Fire",
          damage: 60,
          manaCost: 20,
          buffType: "",
          buffAmount: 0,
          debuffType: "Burn",
          debuffAmount: 10,
          heal: 0,
        },
        {
          name: "Fire Fang",
          type: "Fire",
          damage: 80,
          manaCost: 30,
          buffType: "",
          buffAmount: 0,
          debuffType: "Burn",
          debuffAmount: 20,
          heal: 0,
        },
        {
          name: "Flamethrower",
          type: "Fire",
          damage: 120,
          manaCost: 50,
          buffType: "",
          buffAmount: 0,
          debuffType: "Burn",
          debuffAmount: 30,
          heal: 0,
        },
      ],
      image: "https://d6hckkykh246u.cloudfront.net/Aquasonic.svg",
    },

    // }
    // {
    //   id: 2,
    //   name: "Bulbasaur",
    //   type: "Water",
    //   moveList: ["Tackle", "Vine Whip", "Razor Leaf", "Solar Beam"],
    //   image: "https://d6hckkykh246u.cloudfront.net/Coastscreech.svg",
    // },
    // {
    //   id: 3,
    //   name: "Squirtle",
    //   type: "Electric",
    //   moveList: ["Tackle", "Bubble", "Water Gun", "Hydro Pump"],
    //   image: "https://d6hckkykh246u.cloudfront.net/Croakasaur.svg",
    // },
    // {
    //   id: 4,
    //   name: "Pikachu",
    //   type: "Electric",
    //   moveList: ["Thunder Shock", "Thunderbolt", "Thunder", "Thunder Punch"],
    //   image: "https://d6hckkykh246u.cloudfront.net/Desertwisp.svg",
    // },
    // {
    //   id: 5,
    //   name: "Eevee",
    //   type: "Ground",
    //   moveList: ["Tackle", "Quick Attack", "Bite", "Body Slam"],
    //   image: "https://d6hckkykh246u.cloudfront.net/Flamescalex.svg",
    // },
    // {
    //   id: 6,
    //   name: "Snorlax",
    //   type: "Water",
    //   moveList: ["Tackle", "Body Slam", "Hyper Beam", "Earthquake"],
    //   image: "https://d6hckkykh246u.cloudfront.net/Forestfoot.svg",
    // },
    // {
    //   id: 7,
    //   name: "Chromeleon",
    //   type: "Grass",
    //   moveList: ["Pound", "Psybeam", "Psychic", "Shadow Ball"],
    //   image: "https://d6hckkykh246u.cloudfront.net/Gigalizard.svg",
    // },
    //     {
    //   id: 4,
    //   name: "Pikachu",
    //   type: "Electric",
    //   moveList: ["Thunder Shock", "Thunderbolt", "Thunder", "Thunder Punch"],
    //   image: "https://d6hckkykh246u.cloudfront.net/Grizzlark.svg",
    // },
    // {
    //   id: 5,
    //   name: "Eevee",
    //   type: "Ground",
    //   moveList: ["Tackle", "Quick Attack", "Bite", "Body Slam"],
    //   image: "https://d6hckkykh246u.cloudfront.net/Tentawrath.svg",
    // },
    // {
    //   id: 6,
    //   name: "Snorlax",
    //   type: "Water",
    //   moveList: ["Tackle", "Body Slam", "Hyper Beam", "Earthquake"],
    //   image: "https://d6hckkykh246u.cloudfront.net/Seacowze.svg",
    // },
    // {
    //   id: 7,
    //   name: "Chromeleon",
    //   type: "Grass",
    //   moveList: ["Pound", "Psybeam", "Psychic", "Shadow Ball"],
    //   image: "https://d6hckkykh246u.cloudfront.net/Desertwisp.svg",
    // },
  ],
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
