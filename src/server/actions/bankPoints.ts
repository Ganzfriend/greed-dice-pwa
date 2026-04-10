"use server";

import { createClient } from "@/lib/supabase/server";

export async function bankPoints(gameId: string) {
  const supabase = await createClient();

  const { data: game } = await supabase
    .from("games")
    .select("*")
    .eq("id", gameId)
    .single();

  const { data: player } = await supabase
    .from("game_players")
    .select("*")
    .eq("player_id", game.current_player_id)
    .eq("game_id", gameId)
    .single();

  await supabase
    .from("game_players")
    .update({
      score: player.score + game.turn_points,
    })
    .eq("id", player.id);

  await supabase
    .from("games")
    .update({
      turn_points: 0,
      saved_dice: [],
      dice: null,
    })
    .eq("id", gameId);
}
