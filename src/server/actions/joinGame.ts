import { createClient } from "@/lib/supabase/client";

export async function joinGame(playerId: string, code: string) {
  const supabase = createClient();

  const { data: game } = await supabase
    .from("games")
    .select("*")
    .eq("join_code", code)
    .single();

  const { data: players } = await supabase
    .from("game_players")
    .select("*")
    .eq("game_id", game.id);

  if ((players?.length || 0) >= 6) {
    throw new Error("Game full");
  }

  await supabase.from("game_players").insert({
    game_id: game.id,
    player_id: playerId,
    seat_order: players?.length,
  });

  return game;
}
