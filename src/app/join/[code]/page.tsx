"use client";

import { joinGame } from "@/server/actions/joinGame";
import { usePlayer } from "@/context/PlayerContext";

export default function JoinPage({ params }) {
  const { player } = usePlayer();

  async function join() {
    await joinGame(player.id, params.code);
  }

  return <button onClick={join}>Join Game {params.code}</button>;
}
