import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { GameContext } from "@/contexts";
import { ActivePlayer, GameState } from "@/types";
// import { calculatePoints } from "./helpers";
// import type {
//    GameContextType,
//   GameState,
// } from "@/types";

// const defaultDice: GameState["dice"] = new Array(6).fill(1);

// const initialState: GameState = {
//   players: [],
//   currentPlayerId: 0,
//   dice: defaultDice,
//   savedDice: [],
//   turnPoints: 0,
//   winnerPlayerId: null,
//   isBust: false,
// };

const GameProvider: React.FC<{
  gameId: string;
  children: React.ReactNode;
}> = ({ gameId, children }) => {
  const [game, setGame] = useState<Partial<GameState> | null>(null);
  const supabase = createClient();

  const refreshGame = useCallback(
    async function () {
      const { data } = await supabase
        .from("game_players")
        .select("*, players(*)")
        .eq("game_id", gameId);

      setGame({ players: data as ActivePlayer[] });
    },
    [gameId, supabase],
  );

  useEffect(() => {
    const channel = supabase
      .channel("game-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_players",
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          console.log({ payload });
          refreshGame();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, refreshGame, supabase]);

  return (
    <GameContext.Provider value={{ game }}>{children}</GameContext.Provider>
  );
};

// const GameProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [state, setState] = useState<GameState>(initialState);

//   const rollDice: GameContextType["rollDice"] = () => {
//     console.log("## calling rollDice");
//     setState((prev) => {
//       const newDice = prev.dice.map(() => Math.floor(Math.random() * 6) + 1);
//       const isBust = calculatePoints(newDice) === 0;

//       return {
//         ...prev,
//         dice: newDice,
//         isBust,
//         savedDice: [],
//       };
//     });
//   };

//   const saveSelectedDice: GameContextType["saveSelectedDice"] = (
//     newDice: number[],
//   ) => {
//     const newPoints = calculatePoints(newDice);

//     const updatedDice = [...state.dice];

//     newDice.forEach((v) => {
//       const idx = updatedDice.indexOf(v);
//       updatedDice.splice(idx, 1);
//     });

//     setState((prev) => {
//       return {
//         ...prev,
//         dice: updatedDice,
//         savedDice: [...prev.savedDice, ...newDice],
//         turnPoints: prev.turnPoints + newPoints,
//       };
//     });
//   };

//   const savePoints: GameContextType["savePoints"] = () => {
//     setState((prev) => ({
//       ...prev,
//       players: prev.players.map((p, i) =>
//         i === prev.currentPlayerId
//           ? { ...p, score: p.score + prev.turnPoints }
//           : p,
//       ),
//     }));

//     if (
//       state.players[state.currentPlayerId].score + state.turnPoints >=
//       10000
//     ) {
//       setState((prev) => ({ ...prev, winnerPlayerId: state.currentPlayerId }));
//     }
//   };

//   const nextPlayer: GameContextType["nextPlayer"] = () => {
//     setState((prev) => ({
//       ...prev,
//       currentPlayerId: (prev.currentPlayerId + 1) % prev.players.length,
//     }));
//   };

//   const resetGame: GameContextType["resetGame"] = () => {
//     setState(initialState);
//   };

//   const value: GameContextType = {
//     state,
//     rollDice,
//     saveSelectedDice,
//     savePoints,
//     nextPlayer,
//     resetGame,
//   };

//   return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
// };

export default GameProvider;
