"use server";

import { createClient } from "@/lib/supabase/server";

export async function saveDice(
  gameId: string,
  savedDice: number[],
  turnPoints: number,
) {
  const supabase = await createClient();

  await supabase
    .from("games")
    .update({
      saved_dice: savedDice,
      turn_points: turnPoints,
    })
    .eq("id", gameId);
}
