import { useContext } from "react";

import { PlayerContext } from "@/contexts";

export function usePlayer() {
  return useContext(PlayerContext);
}
