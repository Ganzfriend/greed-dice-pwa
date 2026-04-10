import { createContext } from "react";
import { Player } from "@/types";

type PlayerContextType = {
  player: Player | null;
  loading: boolean;
};

const PlayerContext = createContext<PlayerContextType>({
  player: null,
  loading: true,
});

export default PlayerContext;
