"use client";

import { GameProvider } from "@/providers";
import { Scoreboard } from "@/components";
import { Controls } from "@/components";
import { useState } from "react";

export default function Page() {
  // TODO: get this gameId
  const [
    gameId,
    // setGameId
  ] = useState<string>("");

  return (
    <GameProvider gameId={gameId}>
      <main className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">🎲 Greed Game</h1>
        <Scoreboard />
        <Controls />
      </main>
    </GameProvider>
  );
}
