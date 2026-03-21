"use client";

import { GameProvider } from "@/context/GameContext";
import Dice from "@/components/Dice.tsx";
import RollButton from "@/components/RollButton";
import PlayerList from "@/components/PlayerList";

export default function GamePage({ params }) {
  return (
    <GameProvider gameId={params.gameId}>
      <PlayerList />
      <Dice />
      <RollButton />
    </GameProvider>
  );
}
