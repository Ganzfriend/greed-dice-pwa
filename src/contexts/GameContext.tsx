import { createContext } from "react";

import type { GameContextType } from "@/types";

const GameContext = createContext<GameContextType | undefined>(undefined);

export default GameContext;
