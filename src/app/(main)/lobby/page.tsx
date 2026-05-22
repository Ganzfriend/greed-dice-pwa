"use client";

import { useMemo, useState } from "react";

import { joinGame } from "@/server/actions/joinGame";
import { usePlayer } from "@/providers/player/usePlayer";
import { Button } from "@/components/ui";
import { createGame } from "@/server/actions/createGame";
import { useRouter } from "next/navigation";

export default function LobbyPage() {
  const { player } = usePlayer();
  const router = useRouter();

  const [gameCode, setGameCode] = useState<string>("");
  const [isLoadingCreateGame, setIsLoadingCreateGame] = useState(false);
  const disabledJoinGame = useMemo(
    () => !gameCode || gameCode.length < 6,
    [gameCode],
  );

  const handleCreateGame = async () => {
    setIsLoadingCreateGame(true);

    if (player?.id) {
      const game = await createGame({ playerId: player.id });
      setIsLoadingCreateGame(false);
      router.push(`/game/${game.id}`);
    } else {
      setIsLoadingCreateGame(false);
      throw new Error("Player not found");
    }
  };

  const handleJoinGame = async () => {
    if (player?.id && gameCode?.length === 6) {
      await joinGame({ playerId: player.id, code: gameCode });
    } else {
      throw new Error("Player not found");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-20 items-center">
        <Button
          className="border p-4"
          onClick={handleCreateGame}
          disabled={isLoadingCreateGame}
        >
          Create Game
        </Button>

        <div className="flex flex-col gap-2 items-center">
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

          <Button
            disabled={disabledJoinGame}
            aria-disabled={disabledJoinGame}
            style={
              disabledJoinGame
                ? {
                    pointerEvents: "none",
                    color: "gray",
                    backgroundColor: "lightgray",
                  }
                : {}
            }
            className="px-6 py-3 border border-blue rounded"
            onClick={handleJoinGame}
          >
            Join Existing Game
          </Button>
        </div>
      </div>
    </div>
  );
}
