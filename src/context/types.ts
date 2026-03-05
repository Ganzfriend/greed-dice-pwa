export type Player = {
  id: number;
  name: string;
  score: number;
};

export type GameState = {
  players: Player[];
  currentPlayer: number;
  dice: number[];
  winner: Player | null;
};

export type GameContextType = {
  state: GameState;
  rollDice: () => void;
  savePoints: (points: number) => void;
  nextPlayer: () => void;
  resetGame: () => void;
};
