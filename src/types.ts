export type Ethermon = {
  id: number;
  name: string;
  type: string;
  moveList: Move[];
  image: string;
};

export type Battle = {
  id: number;
  challenger: Ethermon;
};

export type Move = {
  name: string;
  type: string;
  damage: number;
  manaCost: number;
  buffType: string;
  buffAmount: number;
  debuffType: string;
  debuffAmount: number;
  heal: number;
};
