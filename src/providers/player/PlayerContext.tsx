import { createContext } from "react";
import { Player } from "@/types";

type PlayerContextType = {
  player: Player | null;
};

const PlayerContext = createContext<PlayerContextType>({
  player: null,
});

export default PlayerContext;
