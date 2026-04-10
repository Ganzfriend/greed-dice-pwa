"use server";

import { createClient } from "@/lib/supabase/server";

export async function bankPoints(gameId: string, points: number) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("games")
    .select("current_player_id")
    .eq("id", gameId)
    .single();

  await supabase
    .from("game_players")
    .update({
      score: points,
    })
    .eq("player_id", data?.current_player_id);
}
