"use client";

import { useCallback, useState } from "react";

import GameContext from "./GameContext";
import { useGameRealtime } from "@/hooks/useGameRealtime";
import { GameContextType, GameState } from "@/types";

import { createClient } from "@/lib/supabase/client";
import { usePlayer } from "@/providers/player/usePlayer";

const supabase = createClient();

const GameProvider = ({
  gameId,
  children,
}: {
  gameId: string;
  children: React.ReactNode;
}) => {
  const [game, setGame] = useState<GameState | null>(null);

  const { player } = usePlayer();

  const refreshGame = useCallback(async () => {
    // fetch game
    const { data: gameData, error: gameError } = await supabase
      .from("games")
      .select("*")
      .eq("id", gameId)
      .single();

    if (gameError || !gameData) {
      console.error(gameError);
      return;
    }

    // fetch players
    const { data: playerData, error: playerError } = await supabase
      .from("game_players")
      .select("*, players(*)")
      .eq("game_id", gameId)
      .order("turn_order");

    if (playerError) {
      console.error(playerError);
      return;
    }

    setGame({
      ...gameData,
      players: playerData,
    });
  }, [gameId]);

  useGameRealtime(gameId, refreshGame);

  const players = game?.players ?? [];

  const currentPlayerId = game?.current_player_id ?? null;

  const isMyTurn =
    !!player && !!currentPlayerId && player.id === currentPlayerId;

  const value: GameContextType = {
    game,
    players,
    currentPlayerId,
    isMyTurn,
    refreshGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
