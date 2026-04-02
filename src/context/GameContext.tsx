import { createContext } from "react";

import type { GameContextType } from "./types.ts";

const GameContext = createContext<GameContextType | undefined>(undefined);

export default GameContext;
