import { supabase } from "@/lib/supabaseClient";

export async function submitTurn(
  gameId: string,
  playerId: string,
  points: number,
) {
  await supabase.from("game_turns").insert({
    game_id: gameId,
    player_id: playerId,
    points_scored: points,
  });

  await supabase.rpc("add_score", {
    p_game_id: gameId,
    p_player_id: playerId,
    p_points: points,
  });
}
