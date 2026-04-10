// export type Die = {
//   value: number;
//   saved: boolean;
// };

// export type Dice = Die[];

export type Player = {
  playerId: string;
  name: string;
  score: number;
};

export type GameState = {
  players: Player[];
  currentPlayerId: number;
  dice: number[];
  savedDice: number[];
  turnPoints: number;
  isBust: boolean;
  winnerPlayerId: number | null;
};

export type GameContextType = {
  game: GameState;
  rollDice: () => void;
  saveSelectedDice: (dice: number[]) => void;
  savePoints: () => void;
  nextPlayer: () => void;
  resetGame: () => void;
};

// back end models
/*
export type Player = {
  id: number;
  name: string;
};

export type Game = {
  id: number;
  name?: string;
  currentPlayerId: number | null;
  winnerPlayerId?: number;
  createdAt: string;
  finishedAt?: string;
};

export type GamePlayer = {
  id: number;
  gameId: number;
  playerId: number;
  name?: string;
  score: number;
};

export type GameWithPlayers = {
  id: number;
  name?: string;
  currentPlayerId: number;
  players: {
    playerId: number;
    name: string;
    score: number;
  }[];
};
*/
