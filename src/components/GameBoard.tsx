"use client";

import { useGame } from "@/providers/game/useGame";

import { Scoreboard } from "./Scoreboard";
import { Dice } from "./Dice";
import { Controls } from "./Controls";

export default function GameBoard() {
  const { game } = useGame();

  if (!game) return <div>Loading game...</div>;

  return (
    <div className="flex flex-col gap-6">
      <Scoreboard />
      <Dice />
      <Controls />
    </div>
  );
}
