"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { PlayerContext } from "@/contexts";

const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    initPlayer();
  }, []);

  async function initPlayer() {
    const id = localStorage.getItem("playerId");

    if (!id) {
      const { data } = await supabase
        .from("players")
        .insert({
          name: "Guest" + Math.floor(Math.random() * 9999),
        })
        .select()
        .single();

      localStorage.setItem("playerId", data.id);
      setPlayer(data);
    } else {
      const { data } = await supabase
        .from("players")
        .select("*")
        .eq("id", id)
        .single();

      setPlayer(data);
    }
  }

  return (
    <PlayerContext.Provider value={{ player }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
