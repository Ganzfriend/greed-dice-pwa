"use client";

import { GameProvider } from "@/providers";
import {
  useParams,
  // useRouter
} from "next/navigation";
// import { useAuth } from "@/providers/auth/useAuth";
import { GameBoard } from "@/components";

export default function GamePage() {
  const params = useParams<{ gameId: string }>();
  console.log("## ", { params });
  // const router = useRouter();
  // const { user } = useAuth();

  // if (!user) {
  //   router.push("/");
  // }

  // if (!params.gameId) {
  //   router.push("/");
  // }

  return (
    <GameProvider gameId={params.gameId}>
      <GameBoard />
    </GameProvider>
  );
}
