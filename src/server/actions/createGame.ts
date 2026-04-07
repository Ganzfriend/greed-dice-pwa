import { createClient } from "@/lib/supabase/client";
import { generateJoinCode } from "@/lib/joinCode";

export async function createGame(playerId: string) {
  const joinCode = generateJoinCode();
  const supabase = createClient();

  const { data: game } = await supabase
    .from("games")
    .insert({
      join_code: joinCode,
      status: "waiting",
      current_player_id: playerId,
    })
    .select()
    .single();

  await supabase.from("game_players").insert({
    game_id: game.id,
    player_id: playerId,
    seat_order: 0,
  });

  return game;
}
