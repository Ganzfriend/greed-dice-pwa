"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { Player, GameState } from "@/types";
import GameContext from "./GameContext";

const supabase = createClient();

const GameProvider: React.FC<{
  gameId: string;
  children: React.ReactNode;
}> = ({ gameId, children }) => {
  const [game, setGame] = useState<Partial<GameState> | null>(null);

  const refreshGame = useCallback(async () => {
    const { data } = await supabase
      .from("game_players")
      .select("*, players(*)")
      .eq("game_id", gameId);

    setGame({
      players: data as Player[],
    });
  }, [gameId]);

  useEffect(() => {
    refreshGame();
  }, [refreshGame]);

  useEffect(() => {
    const channel = supabase
      .channel(`game-${gameId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_players",
          filter: `game_id=eq.${gameId}`,
        },
        () => {
          refreshGame();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, refreshGame]);

  return (
    <GameContext.Provider value={{ game, refreshGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
