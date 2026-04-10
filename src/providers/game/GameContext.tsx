import { createContext } from "react";
import { Player, GameState } from "@/types";

export type GameContextType = {
  game: GameState | null;
  players: Player[];
  currentPlayerId: string | null;
  isMyTurn: boolean;
  refreshGame: () => Promise<void>;
};

const GameContext = createContext<GameContextType>({
  game: null,
  players: [],
  currentPlayerId: null,
  isMyTurn: false,
  refreshGame: async () => {},
});

export default GameContext;
