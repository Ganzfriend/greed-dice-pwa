"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGame } from "@/providers/game/useGame";

export function Scoreboard() {
  const { players, currentPlayerId } = useGame();

  return (
    <div className="grid gap-2">
      {players.map((p) => (
        <Card
          key={p.playerId}
          className={p.playerId === currentPlayerId ? "border-blue-500" : ""}
        >
          <CardContent>
            <p className="font-bold">{p.name}</p>
            <p>Score: {p.score}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
