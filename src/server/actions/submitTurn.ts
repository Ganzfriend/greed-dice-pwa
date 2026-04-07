import { createClient } from "@/lib";

export async function submitTurn(
  gameId: string,
  playerId: string,
  points: number,
) {
  const supabase = createClient();

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
