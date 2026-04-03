"use client";

import { GameProvider } from "@/context";
import { Dice } from "@/components";
// import { RollButton } from "@/components";
// import { PlayerList } from "@/components";

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
