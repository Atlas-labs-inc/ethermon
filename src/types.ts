export type Ethermon = {
  id: number;
  name: string;
  type: string;
  moveList: string[];
  image: string;
};

export type Battle = {
  id: number;
  challenger: Ethermon;
};
