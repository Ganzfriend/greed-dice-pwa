export type Player = {
  id: number;
  name: string;
  score: number;
};

export type GameState = {
  players: Player[];
  currentPlayer: number;
  dice: [number, boolean][];
  winner: Player | null;
  tempPoints: number;
  isABust: boolean;
};

export type GameContextType = {
  state: GameState;
  rollDice: () => void;
  saveDice: (dice: Set<number>) => void;
  savePoints: (points: number) => void;
  nextPlayer: () => void;
  resetGame: () => void;
};
