"use server";

import { createClient } from "@/lib/supabase/server";

export async function createGame({ playerId }: { playerId: string }) {
  const supabase = await createClient();

  const { data, error: joinCodeError } =
    await supabase.rpc("generate_join_code");

  if (joinCodeError)
    throw new Error(`Error creating join code: ${joinCodeError}`);

  const joinCode = data;

  console.log("##", { joinCode });

  const { data: game, error } = await supabase
    .from("games")
    .insert({
      join_code: joinCode,
      current_player_id: playerId,
      host_id: playerId,
    })
    .select()
    .single();

  if (error)
    throw new Error(`Error inserting into games table: ${error.message}`);

  try {
    await supabase.from("game_players").insert({
      game_id: game.id,
      player_id: playerId,
    });
  } catch (e) {
    if (e instanceof Error)
      throw new Error(`Error inserting into game_players table: ${e.message}`);
  }

  return game;
}
