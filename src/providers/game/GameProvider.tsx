"use client";

import { useState } from "react";

import GameContext from "./GameContext";
import { useGameRealtime } from "@/hooks/useGameRealtime";
import { GameContextType, GameState } from "@/types";

const GameProvider = ({
  gameId,
  children,
}: {
  gameId: string;
  children: React.ReactNode;
}) => {
  const [game] = useState<GameState | null>(null);

  const refreshGame = async () => {};

  useGameRealtime(gameId, refreshGame);

  const players = game?.players ?? [];
  const currentPlayerId = game?.current_player_id ?? null;

  const value: GameContextType = {
    game,
    players,
    currentPlayerId,
    isMyTurn: false,
    refreshGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
