"use client";

import { GameProvider } from "@/providers";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth/useAuth";
import { GameBoard } from "@/components";

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
      <GameBoard />
    </GameProvider>
  );
}
