"use client";

import { GameProvider } from "@/context/index.js";
import { Scoreboard } from "@/components/index.js";
import { Controls } from "@/components/index.js";

export default function Page() {
  return (
    <GameProvider>
      <main className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">🎲 Greed Game</h1>
        <Scoreboard />
        <Controls />
      </main>
    </GameProvider>
  );
}
