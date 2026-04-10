"use client";

import { useEffect, useRef } from "react";

import { createClient } from "@/lib/supabase/client";

export function useGameRealtime(
  gameId: string,
  handleGameEvent: (event: unknown) => void,
) {
  const supabase = createClient();
  const handlerRef = useRef(handleGameEvent);

  handlerRef.current = handleGameEvent;

  useEffect(() => {
    const channel = supabase
      .channel(`game-${gameId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "game_events",
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          handlerRef.current(payload.new);
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
  }, [gameId]);
}
