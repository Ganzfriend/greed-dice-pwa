"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import { createGuestPlayer } from "@/lib/auth";
import { usePlayer } from "@/providers/player/usePlayer";
import { joinGame } from "@/server/actions/joinGame";

export default function HomePage() {
  const { player } = usePlayer();
  const router = useRouter();

  const [gameCode, setGameCode] = useState<string>("");

  async function join() {
    if (player?.id) {
      await joinGame({ playerId: player.id, code: gameCode });
    } else {
      throw new Error("Player not found");
    }
  }

  const isDisabled = useMemo(
    () => !gameCode || gameCode.length < 6,
    [gameCode],
  );

  const handleGuest = async () => {
    const player = await createGuestPlayer();
    console.log("Guest player created:", player);
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center gap-6 mt-20">
      <h1 className="text-4xl font-bold">Greed 🎲</h1>

      <Link href="/login" className="px-6 py-3 bg-black text-white rounded">
        Login
      </Link>

      <Button
        className="px-6 py-3 bg-black text-white rounded"
        onClick={handleGuest}
      >
        Continue as Guest
      </Button>

      <div className="flex flex-col gap-2 items-center">
        <label id="game-code-ref">Join Existing Game</label>
        <input
          type="text"
          placeholder="Code (e.g. XXXXXX)"
          id="game-code-ref"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)}
          minLength={6}
          maxLength={6}
          className="border border-black p-3"
        />
      </div>

      <Button
        disabled={isDisabled}
        aria-disabled={isDisabled}
        style={
          isDisabled
            ? {
                pointerEvents: "none",
                color: "gray",
                backgroundColor: "lightgray",
              }
            : {}
        }
        className="px-6 py-3 border border-blue rounded"
        onClick={join}
      >
        Join Game
      </Button>
    </main>
  );
}

// "use client";

// import { GameProvider } from "@/providers";
// import { Scoreboard } from "@/components";
// import { Controls } from "@/components";
// import { useState } from "react";

// export default function Page() {
//   // TODO: get this gameId
//   const [
//     gameId,
//     // setGameId
//   ] = useState<string>("");

//   return (
//     <GameProvider gameId={gameId}>
//       <main className="p-6 max-w-md mx-auto">
//         <h1 className="text-2xl font-bold mb-4">🎲 Greed Game</h1>
//         <Scoreboard />
//         <Controls />
//       </main>
//     </GameProvider>
//   );
// }
