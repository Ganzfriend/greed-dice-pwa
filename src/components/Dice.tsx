"use client";

import { useGame } from "@/providers/game/useGame";

export function Dice() {
  const { game } = useGame();

  if (!game?.dice) return null;

  return (
    <div>
      {game.dice.map((value, i) => (
        <div key={i} className="text-2xl">
          🎲 {value}
        </div>
      ))}
      {/* {game.players?.map(({ playerId, name, score }) => (
        <div key={playerId}>
          {name} — {score}
        </div>
      ))} */}
    </div>
  );
}
