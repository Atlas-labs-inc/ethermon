export type Ethermon = {
  id?: number;
  name: string;
  type: string;
  moveList?: Move[];
  image: string;
};

export type BattleState = {
  attack: number;
  defense: number;
  hp: number;
  mana: number;
};

export type Battle = {
  npc: BattleState;
  player: BattleState;
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
