"use client";

import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { GameState } from "@/types";

const supabase = createClient();

export function useGameRealtime(
  gameId: string,
  setGame: (game: GameState) => void,
) {
  useEffect(() => {
    async function loadGame() {
      const { data } = await supabase
        .from("games")
        .select("*")
        .eq("id", gameId)
        .single();

      if (data) setGame(data);
    }

    loadGame();

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
        (payload) => {
          setGame(payload.new as GameState);
        },
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
  }, [gameId, setGame]);
}
