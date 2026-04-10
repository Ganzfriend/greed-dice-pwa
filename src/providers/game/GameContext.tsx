import { createContext } from "react";
import { GameState } from "@/types";

type GameContextType = {
  game: Partial<GameState> | null;
  refreshGame: () => Promise<void>;
};

const GameContext = createContext<GameContextType>({
  game: null,
  refreshGame: async () => {},
});

export default GameContext;
