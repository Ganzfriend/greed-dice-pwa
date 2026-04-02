"use client";

import GameProvider from "@/context/GameProvider.tsx";
import { Dice } from "@/components/index.ts";
// import { RollButton } from "@/components/index.ts";
// import { PlayerList } from "@/components/index.ts";

type ParamsType = {
  params: {
    gameId: string;
  };
};

export default function GamePage({ params }: ParamsType) {
  console.log("## ", { params });

  return (
    <GameProvider
    // gameId={params.gameId}
    >
      {/* <PlayerList /> */}
      <Dice />
      {/* <RollButton /> */}
    </GameProvider>
  );
}
