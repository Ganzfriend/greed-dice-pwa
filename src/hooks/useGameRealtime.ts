"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export function useGameRealtime(gameId: string, refreshGame: () => void) {
  useEffect(() => {
    refreshGame();

    const channel = supabase
      .channel(`game-${gameId}`)

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "games",
          filter: `id=eq.${gameId}`,
        },
        refreshGame,
      )

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_players",
          filter: `game_id=eq.${gameId}`,
        },
        refreshGame,
      )

      .subscribe((status) => {
        console.log("Realtime status:", status);
        if (status === "SUBSCRIBED") {
          console.log("Connected to game channel");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, refreshGame]);
}
