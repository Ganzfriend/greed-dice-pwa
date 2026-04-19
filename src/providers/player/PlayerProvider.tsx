"use client";

import { useCallback, useEffect, useState } from "react";

import PlayerContext from "./PlayerContext";
import { createClient } from "@/lib/supabase/client";
import { Player } from "@/types";

const supabase = createClient();

const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  const initPlayer = useCallback(async () => {
    const storedId = localStorage.getItem("playerId");

    if (!storedId) {
      const { data } = await supabase
        .from("players")
        .insert({
          name: `Guest${Math.floor(Math.random() * 9999)}`,
        })
        .select()
        .single();

      if (!data) return;

      localStorage.setItem("playerId", data.id);
      setPlayer(data);
    } else {
      const { data } = await supabase
        .from("players")
        .select("*")
        .eq("id", storedId)
        .single();

      setPlayer(data);
    }
  }, []);

  useEffect(() => {
    initPlayer();
    setLoading(false);
  }, [initPlayer]);

  return (
    <PlayerContext.Provider value={{ player, loading }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
