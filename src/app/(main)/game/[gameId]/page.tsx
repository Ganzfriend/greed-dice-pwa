"use client";

import { GameProvider } from "@/providers";
import { Dice } from "@/components";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
// import { RollButton } from "@/components";
// import { PlayerList } from "@/components";

type ParamsType = {
  params: {
    gameId: string;
  };
};

export default function GamePage({ params }: ParamsType) {
  console.log("## ", { params });
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push("/login");
  }

  return (
    <GameProvider gameId={params.gameId}>
      {/* <PlayerList /> */}
      <Dice />
      {/* <RollButton /> */}
    </GameProvider>
  );
}
