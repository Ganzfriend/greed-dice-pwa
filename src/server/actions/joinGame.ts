"use server";

import { createClient } from "@/lib/supabase/server";

export async function joinGame({
  code,
  playerId,
}: {
  code: string;
  playerId: string;
}) {
  const supabase = await createClient();

  const { data: game } = await supabase
    .from("games")
    .select("*")
    .eq("join_code", code)
    .single();

  await supabase.from("game_players").insert({
    game_id: game.id,
    player_id: playerId,
  });

  // TODO: decide if i want to keep the player limit to 6 per game
  //   const { data: players } = await supabase
  //     .from("game_players")
  //     .select("*")
  //     .eq("game_id", game.id);

  //   if ((players?.length || 0) >= 6) {
  //     throw new Error("Game full");
  //   }

  //   await supabase.from("game_players").insert({
  //     game_id: game.id,
  //     player_id: playerId,
  //     seat_order: players?.length,
  //   });

  return game;
}
