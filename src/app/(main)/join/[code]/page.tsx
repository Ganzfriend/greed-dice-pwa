"use client";

import { joinGame } from "@/server/actions/joinGame";
import { usePlayer } from "@/providers/player/usePlayer";

export default function JoinPage({ params }: { params: { code: string } }) {
  const { player } = usePlayer();

  async function join() {
    if (player?.id) {
      await joinGame({ playerId: player.id, code: params.code });
    } else {
      throw new Error("Player not found");
    }
  }

  return <button onClick={join}>Join Game {params.code}</button>;
}
