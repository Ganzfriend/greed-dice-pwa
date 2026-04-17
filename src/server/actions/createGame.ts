"use server";

import { createClient } from "@/lib/supabase/server";
import { generateJoinCode } from "@/lib/joinCode";

export async function createGame({ playerId }: { playerId: string }) {
  const joinCode = generateJoinCode();
  const supabase = await createClient();

  const { data: game, error } = await supabase
    .from("games")
    .insert({
      join_code: joinCode,
      current_player_id: playerId,
    })
    .select()
    .single();

  if (error) throw error;

  await supabase.from("game_players").insert({
    game_id: game.id,
    player_id: playerId,
  });

  return game;
}
