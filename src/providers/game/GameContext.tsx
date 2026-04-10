import { createContext } from "react";

import { GameContextType } from "@/types";

const GameContext = createContext<GameContextType>({
  game: null,
  players: [],
  currentPlayerId: null,
  isMyTurn: false,
  refreshGame: async () => {},
});

export default GameContext;
